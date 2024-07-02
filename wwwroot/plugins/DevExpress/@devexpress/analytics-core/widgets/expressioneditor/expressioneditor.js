﻿/**
* DevExpress Analytics (widgets\expressioneditor\expressioneditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { StringId } from '../../property-grid/localization/_localizationStringIds';
import { Disposable } from '../../serializer/disposable';
import { aceAvailable } from '../ace/_ace-available';
import { CodeCompletor } from '../common/_codeCompletor';
import { DisplayExpressionConverter } from '../common/_displayNameProvider';
import { CriteriaOperatorStateMachine } from '../criteria/utils/criteriaOperatorStateMachine';
import { ResizeHelper } from '../internal/_resizeHelper';
import { getParentContainer, isList, setCursorInFunctionParameter } from '../_utils';
import { Tools } from './tools/_tools';
import { ExpressionEditorParametersTreeListController, ExpressionEditorTreeListController } from './tools/_treeListControllers';
import { RangeSpecific, wrapExpressionValue } from './_expressioneditor';
export function getNotValidRange(value, errorMessage) {
    let start = 0;
    let end = 0;
    const parts = errorMessage.split('\n');
    let errorText = parts[1];
    const errorLength = parts[2].length;
    if (errorText.indexOf('...') === 0) {
        errorText = errorText.split('...')[1];
    }
    start = value.indexOf(errorText);
    end = start + errorLength;
    return { start: start, end: end };
}
function createExpressionEditorFieldListProvider(originalProvider, fieldName) {
    return ko.computed(() => {
        const provider = ko.unwrap(originalProvider);
        const unwrappedFieldName = ko.unwrap(fieldName);
        return !unwrappedFieldName ? provider : {
            getItems: (path) => {
                const $deferred = $.Deferred();
                provider.getItems(path)
                    .done((data) => {
                    $deferred.resolve(data.filter(field => field.name !== unwrappedFieldName));
                })
                    .fail(() => $deferred.reject());
                return $deferred.promise();
            },
            getValues: (path) => {
                return provider.getValues(path);
            }
        };
    });
}
export class ExpressionEditor extends Disposable {
    constructor(options, fieldListProvider, disabled = ko.observable(false), rtl = false, _displayNameProvider, popupVisible = ko.observable(false), editorInputId) {
        super();
        this.options = options;
        this._displayNameProvider = _displayNameProvider;
        this.popupVisible = popupVisible;
        this._updateTextAreaValue = (item, element) => {
            const textArea = this._getTextArea(element), textAreaValue = this.textAreaValue().toString(), cursorPosition = textArea && textArea.selectionStart || textAreaValue.length, newAddedText = textAreaValue[cursorPosition - 1] == ' ' ? (item.val || item.text || item) + ' ' : ' ' + (item.val || item.text || item) + ' ';
            this.textAreaValue([textAreaValue.slice(0, cursorPosition), newAddedText, textAreaValue.slice(cursorPosition)].join(''));
            if (textArea && textArea.setSelectionRange) {
                textArea.focus();
                const posisition = cursorPosition + (newAddedText.indexOf('(') !== -1 ? newAddedText.indexOf('(') + 1 : newAddedText.length);
                textArea.setSelectionRange(posisition, posisition);
            }
        };
        this._updateAceValue = (item, element) => {
            const editor = this.editorContainer(), { row, column: col } = editor.getCursorPosition();
            let insertion = (item.val || item.text || item) + ' ';
            if (col && editor.getSession().getValue().split('\n')[row][col - 1] !== ' ')
                insertion = ' ' + insertion;
            editor.insert(insertion);
            editor.focus();
            setCursorInFunctionParameter(item.paramCount, editor, insertion);
        };
        this._updateValue = (item, element) => {
            this.aceAvailable ? this._updateAceValue(item, $.fn.constructor(element)) : this._updateTextAreaValue(item, $.fn.constructor(element));
        };
        this.patchFieldName = (fieldName) => fieldName;
        this._parametersPutSelectionHandler = (selectedItemPath, element) => {
            const pathParts = selectedItemPath.split('.');
            const newAddedString = '?' + this.patchFieldName(pathParts[pathParts.length - 1]);
            this._updateValue(newAddedString, element);
        };
        this._fieldsPutSelectionHandler = (selectedItemPath, element) => {
            const path = this.koOptions.peek().path.peek();
            const proposedFieldName = selectedItemPath.substring(path.length + 1);
            const newAddedString = '[' + this.patchFieldName(proposedFieldName) + ']';
            if (this._displayNameProvider) {
                this.displayExpressionConverter.toDisplayExpression(path, newAddedString)
                    .done((result) => { this._updateValue(result, element); })
                    .fail(() => { this._updateValue(newAddedString, element); });
            }
            else {
                this._updateValue(newAddedString, element);
            }
        };
        this.aceAvailable = aceAvailable();
        this.title = () => getLocalization('Expression Editor', 'AnalyticsCoreStringId.ExpressionEditor_ExpressionCaption');
        this.value = ko.observable('');
        this.textAreaValue = ko.observable('');
        this.languageHelper = {
            getLanguageMode: () => 'ace/mode/criteria',
            createCompleters: (editor, bindingContext, viewModel) => {
                const path = ko.computed(() => { return viewModel.koOptions() && ko.unwrap(viewModel.koOptions().path) || ''; }), functions = ko.computed(() => { return viewModel.koOptions() && ko.unwrap(viewModel.koOptions().functions) || []; }), completor = new CodeCompletor({
                    editor,
                    bindingContext,
                    fieldListProvider: viewModel.fieldListProvider,
                    path,
                    functions,
                    rootItems: viewModel.options.rootItems,
                    getRealExpression: (path, member) => {
                        return this.displayExpressionConverter && this.displayExpressionConverter.toRealExpression(path, member) || $.Deferred().resolve(member).promise();
                    }
                });
                [path, functions].forEach(x => completor._disposables.push(x));
                return [completor];
            }
        };
        this.aceOptions = {
            showLineNumbers: false,
            showPrintMargin: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showFoldWidgets: false,
            highlightActiveLine: false
        };
        this.additionalOptions = {
            onChange: (session) => {
                const value = session.getValue();
                try {
                    const operator = CriteriaOperatorStateMachine.parse(value);
                    if (this.koOptions().validate) {
                        this.isValid(this.koOptions().validate(operator));
                    }
                    session.clearAnnotations();
                }
                catch (exception) {
                    const row = exception.hash && exception.hash.line || 0;
                    const column = 0;
                    const lines = exception.message.split('\n');
                    const text = lines[1] + '\n' + lines[2];
                    session.setAnnotations([{ row, column, text, 'type': 'error' }]);
                }
            }
        };
        this.callbacks = {
            focus: $.noop
        };
        this.koOptions = ko.observable(null);
        this.editorContainer = ko.observable();
        this.isValid = ko.observable(true);
        this.buttonItems = [];
        this.rtl = false;
        this.modelValueValid = ko.computed(() => {
            const options = this.koOptions();
            return options && ko.isObservable(options.isValid) ? options.isValid() : true;
        });
        this.modelValueWarning = ko.computed(() => {
            const options = this.koOptions();
            return options && ko.unwrap(options.warningMessage) || '';
        });
        this.getPopupContainer = getParentContainer;
        this.koOptions(options);
        this.patchFieldName = (fieldName) => {
            return this.koOptions().patchFieldName && this.koOptions().patchFieldName(fieldName) || fieldName;
        };
        this.theme = this.koOptions() && this.koOptions().theme;
        this._disposables.push(this.value = ko.computed({
            read: () => {
                const value = this.koOptions() && ko.unwrap(this.koOptions().value);
                return (value && value.toString()) || '';
            },
            write: (newVal) => this.koOptions() && this.koOptions().value(newVal)
        }));
        if (_displayNameProvider && options.path) {
            this.displayExpressionConverter = new DisplayExpressionConverter(_displayNameProvider);
            const pathFunc = ko.pureComputed(() => this.koOptions() && this.koOptions().path && this.koOptions().path());
            this.displayValue = wrapExpressionValue(pathFunc, this.value, this.displayExpressionConverter, this._disposables);
            this._disposables.push(pathFunc);
        }
        else {
            this.displayValue = this.value;
        }
        this.rtl = rtl;
        this.validate = (value, sender) => {
            try {
                CriteriaOperatorStateMachine.parse(value);
                this.isValid(true);
                return true;
            }
            catch (exception) {
                const result = getNotValidRange(value, exception.message);
                const textArea = this._getTextArea(sender && sender.element);
                textArea && textArea.setSelectionRange(result.start, result.end);
                this.isValid(false);
            }
        };
        this._disposables.push(this.popupVisible.subscribe((newVal) => {
            if (!newVal) {
                this.editorContainer(null);
                return;
            }
            this.initDisplayValue();
        }));
        const fieldName = ko.computed(() => { return this.koOptions() && this.koOptions().fieldName && this.koOptions().fieldName(); });
        this._disposables.push(this.fieldListProvider = createExpressionEditorFieldListProvider(fieldListProvider, fieldName));
        this.disabled = disabled;
        const self = this;
        this.save = (sender) => {
            const value = this.getValue();
            if (this.validate(value, sender)) {
                this.displayValue(value);
                this.popupVisible(false);
            }
        };
        let selectedItem = null;
        const selectionHandler = (item) => {
            const selectedItemType = ko.unwrap(item.data['type']);
            if (selectedItem)
                selectedItem.isSelected = false;
            selectedItem = item;
            item.isSelected = true;
        };
        const fieldsTreeListOptions = ko.pureComputed(() => {
            return this.koOptions() && this.koOptions().path && this.koOptions().path() && this._createToolsOptions(this.koOptions().path(), this.fieldListProvider(), new ExpressionEditorTreeListController(fieldName, (data, element) => { this._fieldsPutSelectionHandler(data.path, element); }, selectionHandler));
        });
        this.parametersTreeListController = new ExpressionEditorParametersTreeListController(this._parametersCustomFilter, this._parametersPutSelectionHandler, selectionHandler);
        const parametersTreeListOptions = ko.pureComputed(() => {
            return this._createToolsOptions('', this.fieldListProvider(), this.parametersTreeListController);
        });
        this._disposables.push(this.tools = new Tools(this._updateValue, parametersTreeListOptions, this.koOptions, fieldsTreeListOptions));
        this._disposables.push(this.modelValueValid, this.modelValueWarning);
        this._createMainPopupButtons();
        [fieldName, fieldsTreeListOptions, parametersTreeListOptions].forEach(x => this._disposables.push(x));
        this.resizeHelper = new ResizeHelper({
            onResize: () => this.resizeAceEditor()
        });
        this.editorInputId = editorInputId;
    }
    dispose() {
        super.dispose();
        this.koOptions(null);
        this.editorContainer(null);
        this.options = null;
    }
    _createMainPopupButtons() {
        const self = this;
        this.buttonItems = [
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: getLocalization('OK', StringId.DataAccessBtnOK), type: 'default', stylingMode: 'contained', onClick: function (sender) { self.save(sender); } } },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: getLocalization('Cancel', StringId.DataAccessBtnCancel), type: 'normal', stylingMode: 'contained', onClick: function () { self.popupVisible(false); } } }
        ];
    }
    _getTextArea(element) {
        const $el = $.fn.constructor(element);
        return ($el && $el.parents('.dx-expressioneditor').find(':input')[0]);
    }
    _createToolsOptions(path, fieldListProvider, treeListController) {
        return {
            itemsProvider: fieldListProvider,
            selectedPath: ko.observable(''),
            path: ko.observable(path),
            templateName: 'dx-ee-treelist-item',
            treeListController: treeListController,
            rtl: this.rtl
        };
    }
    _parametersCustomFilter(item) {
        return item.specifics === 'parameters' || item.specifics === RangeSpecific || !isList(item);
    }
    onShown() {
        this.callbacks.focus();
    }
    onHiding(e) {
        const options = this.koOptions();
        return options && options.onHiding && options.onHiding(e);
    }
    onShowing(e) {
        const options = this.koOptions();
        return options && options.onShowing && options.onShowing(e);
    }
    onContentReady(e) {
        const options = this.koOptions();
        return options && options.onContentReady && options.onContentReady(e);
    }
    resizeAceEditor() {
        if (this.aceAvailable && this.editorContainer()) {
            this.editorContainer().resize();
        }
    }
    initDisplayValue() {
        this.tools.resetCategoriesSelection && this.tools.resetCategoriesSelection();
        this.textAreaValue(this.displayValue());
        if (!this.aceAvailable) {
            this.validate(this.value());
        }
        else {
            const editor = this.editorContainer();
            const session = editor && editor.getSession();
            session && session.setValue(this.textAreaValue());
        }
    }
    getValue() {
        let value = this.textAreaValue();
        if (this.aceAvailable) {
            const editor = this.editorContainer();
            const session = editor && editor.getSession();
            value = session && session.getValue();
        }
        return value;
    }
}
