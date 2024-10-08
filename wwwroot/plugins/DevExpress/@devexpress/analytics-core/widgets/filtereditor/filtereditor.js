﻿/**
* DevExpress Analytics (widgets\filtereditor\filtereditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { UnaryOperator } from '../criteria/operators/unary';
import { UnaryOperandSurface } from './operators/unaryOperandSurface';
import { PopupService } from '../../property-grid/internal/_popupService';
import { DisplayExpressionConverter } from '../common/_displayNameProvider';
import { wrapExpressionValue } from '../expressioneditor/_expressioneditor';
import { FilterEditorCodeCompletor } from './helpers/_codeCompletor';
import { getParentContainer } from '../_utils';
import { addDisposeCallback } from '../../serializer/_internal';
import dxTextArea from 'devextreme/ui/text_area';
import { aceAvailable } from '../ace/_ace-available';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
import { GroupOperator } from '../criteria/operators/group';
import { PopupEditorBase } from '../../core/widgets/_popupEditorBase';
import { GroupOperatorType } from '../criteria/operators/options/group';
import { criteriaCreator } from '../criteria/utils/criteriaOperatorPreprocessor';
export class FilterEditor extends PopupEditorBase {
    constructor(options, fieldListProvider, rtl = false, _displayNameProvider, editorInputId) {
        super();
        this.options = options;
        this._displayNameProvider = _displayNameProvider;
        this._advancedMode = ko.observable(false);
        this.textFocused = ko.observable(false);
        this.aceAvailable = aceAvailable();
        this.languageHelper = {
            getLanguageMode: () => 'ace/mode/criteria',
            createCompleters: (editor, bindingContext, viewModel) => {
                const path = ko.computed(() => { return this.path && this.path(); }), completor = new FilterEditorCodeCompletor({
                    editor,
                    bindingContext,
                    fieldListProvider: viewModel.fieldListProvider(),
                    path,
                    getRealExpression: (path, expression) => {
                        return this.displayExpressionConverter && this.displayExpressionConverter.toRealExpression(path, expression) || $.Deferred().resolve(expression).promise();
                    }
                });
                completor._disposables.push(path);
                return [completor];
            }
        };
        this.aceOptions = {
            showLineNumbers: false,
            showPrintMargin: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showGutter: false
        };
        this.additionalOptions = {
            onChange: session => this.onValueChange(session.getValue()),
            changeTimeout: 200,
            onFocus: _ => this.onFocus(),
            onBlur: _ => this.onBlur()
        };
        this.editorContainer = ko.observable();
        this.textVisible = ko.observable(false);
        this.getPopupContainer = (el) => {
            return getParentContainer(el, this.options()['popupContainer']);
        };
        this.timeout = null;
        this.animationTimeout = null;
        this.advancedMode = ko.computed({
            read: () => {
                return this._advancedMode();
            },
            write: (newVal) => {
                this.timeout && clearTimeout(this.timeout);
                this.animationTimeout && clearTimeout(this.animationTimeout);
                if (newVal) {
                    this.textVisible(true);
                    this.timeout = setTimeout(() => {
                        this._advancedMode(true);
                        if (!this.options().disabled())
                            this.focusText();
                    }, 1);
                    this.animationTimeout = setTimeout(() => {
                        this.editorContainer() && this.editorContainer().resize && this.editorContainer().resize();
                    }, 210);
                }
                else {
                    this._advancedMode(false);
                    this.timeout = setTimeout(() => {
                        this.textVisible(false);
                    }, 200);
                }
            },
        });
        this.invalidMessage = () => getLocalization('Cannot create a tree for this expression', 'AnalyticsCoreStringId.FilterEditor_TreeCreationError');
        this.advancedModeText = ko.observable(getLocalization('Advanced Mode', 'AnalyticsCoreStringId.FilterEditor_AdvancedMode'));
        this.operandSurface = ko.observable(null);
        this.operand = null;
        this.popupService = new PopupService();
        this.rtl = rtl;
        this.initializeInnerValue();
        options() && options().helper && (options().helper.rtl = rtl);
        this._disposables.push(this.disabled = ko.computed(() => {
            return ko.unwrap(this.options() && this.options().disabled());
        }));
        this.displayExpressionConverter = _displayNameProvider && new DisplayExpressionConverter(_displayNameProvider);
        this.save = () => {
            this.helper.onSave(this.value());
            if (this.operandSurface() && this.isSurfaceValid()) {
                const value = options().helper.serializer.serialize(this.operand, false);
                this.options().value(value);
            }
            else {
                this.options().value(this.value());
            }
            this.popupVisible(false);
        };
        this.displayValue = wrapExpressionValue(this.path, this.value, this.displayExpressionConverter, this._disposables);
        const modelValue = ko.computed({
            read: () => {
                const options = this.options();
                return options && options.value();
            },
            write: (newVal) => {
                const options = this.options();
                options && options.value(newVal);
            }
        });
        this.modelDisplayValue = wrapExpressionValue(this.path, modelValue, this.displayExpressionConverter, this._disposables);
        this.fieldListProvider = fieldListProvider;
        this.modelValueIsValid = ko.computed(() => {
            return options() && this._validateValue(options().value());
        });
        this.isValid = ko.computed(() => {
            return this._validateValue(this.value());
        });
        this.isSurfaceValid = ko.computed(() => {
            try {
                return this.options() && this.isValid() && this.options().helper.criteriaTreeValidator.validateModel(this.options().helper.serializer.deserialize(this.value()));
            }
            catch (e) {
                return false;
            }
        });
        this._disposables.push(modelValue);
        this._disposables.push(this.modelValueIsValid);
        this._disposables.push(this.isValid);
        this._disposables.push(this.isSurfaceValid);
        this._disposables.push(this.popupVisible.subscribe((newVal) => {
            if (newVal) {
                this.value(this.options().value());
                if (this.isSurfaceValid()) {
                    this.operand = this._generateOperand(this.value());
                    this.operandSurface(this._generateSurface(this.operand));
                }
                else {
                    this.textVisible(true);
                    this._advancedMode(true);
                    this.editorContainer() && this.focusText();
                }
                options().helper.onChange = () => {
                    this.value(options().helper.serializer.serialize(this.operand, false));
                };
            }
            else {
                this.helper.onClosing();
                this.value(null);
                this.operandSurface() && this.operandSurface().dispose();
                this.operandSurface(null);
                this.operand = null;
            }
        }));
        this.createAddButton = (criteria) => { return options().helper.handlers.create(criteria, this.popupService); };
        this.createChangeType = (criteria) => { return options().helper.handlers.change(criteria, this.popupService); };
        this.createChangeProperty = (criteria) => { return options().helper.handlers.changeProperty(criteria, this.popupService); };
        this.createChangeParameter = (criteria) => { return options().helper.handlers.changeParameter(criteria, this.popupService); };
        this.createChangeValueType = (criteria) => { return options().helper.handlers.changeValueType(criteria, this.popupService); };
        this._disposables.push(this.advancedMode);
        this.buttonItems.push({ toolbar: 'bottom', location: 'before', widget: 'dxCheckBox', options: { value: this.advancedMode, text: this.advancedModeText() } });
        this.editorInputId = editorInputId;
    }
    _generateOperand(value) {
        return this.options().helper.serializer.deserialize(value);
    }
    _generateSurface(operand) {
        let type = null;
        if (operand instanceof UnaryOperator) {
            type = this.options().helper.mapper.unary;
        }
        else {
            type = this.options().helper.mapper.group;
        }
        const surface = new type(operand, this, this.fieldListProvider, this.path);
        if (surface instanceof UnaryOperandSurface) {
            if (!(surface.model.operand instanceof GroupOperator)) {
                this.operand = new GroupOperator(GroupOperatorType.And, [this.operand]);
                surface.dispose();
                return this._generateSurface(this.operand);
            }
            surface.operand().canRemove = false;
        }
        surface.canRemove = false;
        return surface;
    }
    _validateValue(value) {
        try {
            if (this.options() && this.options().helper) {
                this.options().helper.serializer.deserialize(value);
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    canSave() {
        return this.isValid();
    }
    initializeInnerValue() {
        this.value = ko.observable('');
    }
    change(type, surface) {
        this.operand = criteriaCreator.changeByType(type);
        this.operand.assignFrom(surface.model);
        let newType = null;
        if (this.operand instanceof UnaryOperator) {
            newType = this.options().helper.mapper.unary;
        }
        else {
            newType = this.options().helper.mapper.group;
        }
        const newSurface = new newType(this.operand, this, this.fieldListProvider, this.path);
        newSurface.canRemove = false;
        if (newSurface instanceof UnaryOperandSurface) {
            newSurface.operand().canRemove = false;
        }
        this.operandSurface(newSurface);
    }
    get helper() {
        return this.options() && this.options().helper;
    }
    get path() {
        return this.options() && this.options().path;
    }
    dispose() {
        super.dispose();
        this.editorContainer(null);
        this.operandSurface() && this.operandSurface().dispose();
    }
    onInput(s, e) {
        const self = this;
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            self.onValueChange(s.component.option('text'));
        }, 200);
    }
    onFocus() {
        this.textFocused(true);
    }
    onBlur() {
        this.textFocused(false);
        this.helper.onEditorFocusOut(this.operand);
    }
    cacheElement($element) {
        this.editorContainer(dxTextArea.getInstance($element.get(0)));
    }
    updateCriteria() {
        if (this.isSurfaceValid()) {
            const currentValue = this.operand && this.options().helper.serializer.serialize(this.operand, false);
            if (currentValue !== this.value()) {
                this.operand = this._generateOperand(this.value());
                this.operandSurface() && this.operandSurface().dispose();
                this.operandSurface(this._generateSurface(this.operand));
            }
        }
    }
    onValueChange(value) {
        if (this.displayValue() === value.trim())
            return;
        this.displayValue(value);
        if (this.displayExpressionConverter) {
            this.displayExpressionConverter.toRealExpression(this.path(), value).done((result) => {
                this.value(result);
                this.updateCriteria();
            }).fail(() => {
                this.value(value);
                this.updateCriteria();
            });
        }
        else {
            this.updateCriteria();
        }
    }
    focusText() {
        const focusFn = (editor) => {
            setTimeout(_ => {
                if (editor.renderer)
                    editor.renderer.updateText();
                editor.focus();
            }, 1);
        };
        if (!this.editorContainer()) {
            const subscription = this.editorContainer.subscribe((editor) => {
                subscription.dispose();
                focusFn(editor);
            });
        }
        else
            focusFn(this.editorContainer());
    }
    resizeAceEditor() {
        if (this.aceAvailable && this.editorContainer()) {
            this.editorContainer().resize();
        }
    }
    get cancelLocalization() {
        return getLocalization('Cancel', 'StringId.Cancel');
    }
    get saveLocalization() {
        return getLocalization('OK', 'StringId.OK');
    }
}
ko.bindingHandlers['dxFilterEditor'] = {
    init: function (element, valueAccessor, bindings, viewModel) {
        $.fn.constructor(element).children().remove();
        $.fn.constructor(element).addClass('dx-popup-general');
        const templateHtml = getTemplate('dx-filtereditor'), $element = $.fn.constructor(element).append(templateHtml), values = valueAccessor();
        const itemsProvider = ko.observable(ko.unwrap(values.fieldListProvider));
        const computedFunctions = [];
        const options = ko.computed(() => ko.unwrap(values.options));
        computedFunctions.push(ko.computed(() => {
            if (options() && options().itemsProvider) {
                itemsProvider(ko.unwrap(options().itemsProvider));
            }
            else {
                itemsProvider(ko.unwrap(values.fieldListProvider));
            }
        }));
        computedFunctions.push(ko.computed(() => {
            if (values.getDisplayNameByPath && options() && options().helper && !options().helper.getDisplayPropertyName) {
                options().helper.getDisplayPropertyName = values.getDisplayNameByPath;
            }
        }));
        const editor = new FilterEditor(options, itemsProvider, $.fn.constructor(element).closest('.dx-rtl').length > 0, values.displayNameProvider, viewModel.editorInputId);
        ko.applyBindingsToDescendants(editor, $element.children()[0]);
        addDisposeCallback($element.children()[0], () => {
            computedFunctions.forEach(x => x.dispose());
            options.dispose();
            editor.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
export class FilterEditorPlain extends FilterEditor {
    constructor(element, options, fieldListProvider, rtl = false, _displayNameProvider) {
        super(options, fieldListProvider, rtl, _displayNameProvider);
        this.element = element;
        this.advancedModeTop = () => this.advancedModePosition.indexOf('Top') !== -1;
        this.advancedModeLeft = () => this.advancedModePosition.indexOf('Left') !== -1;
        this.advancedModePosition = 'TopRight';
        this.advancedModePosition = options().advancedModePosition;
    }
    initializeInnerValue() {
        if (this.options().realTimeUpdate) {
            this.value = this.options().value;
            let valueUpdateTimeout = null;
            this._disposables.push(this.value.subscribe(() => {
                valueUpdateTimeout && clearTimeout(valueUpdateTimeout);
                valueUpdateTimeout = setTimeout(() => {
                    this.updateCriteria();
                }, 100);
            }));
        }
        else {
            super.initializeInnerValue();
        }
    }
    getCheckBoxStyles() {
        const position = {};
        if (this.advancedModeTop())
            position['top'] = '0px';
        else
            position['bottom'] = '0px';
        if (this.advancedModeLeft())
            position['left'] = '0px';
        else
            position['right'] = '0px';
        return position;
    }
    getContentStyles() {
        const styles = {
            pointerEvents: this.options().disabled() ? 'none' : ''
        };
        if (!this.advancedModeTop())
            styles['top'] = '0px';
        return styles;
    }
    getTextCssClasses() {
        return {
            'advanced': this.advancedMode(),
            'dx-filtereditor-text-container-bottom': !this.advancedModeTop(),
            'dx-filtereditor-text-container-top': this.advancedModeTop()
        };
    }
}
ko.components.register('dx-filtereditor-plain', {
    viewModel: {
        createViewModel: (params, componentInfo) => {
            const viewModel = new FilterEditorPlain(componentInfo.element, params.options, ko.observable(params.fieldListProvider), undefined, params.displayNameProvider);
            viewModel.popupVisible(true);
            return viewModel;
        }
    },
    template: getTemplate('dx-filtereditor-plain')
});
ko.components.register('dx-filtereditor-advanced', {
    viewModel: {
        createViewModel: (params, componentInfo) => {
            const viewModel = new FilterEditor(params.options, ko.observable(params.fieldListProvider), undefined, params.displayNameProvider);
            viewModel.advancedMode(true);
            viewModel.popupVisible(true);
            params.options().value.subscribe(() => {
                viewModel.popupVisible(false);
                viewModel.popupVisible(true);
            });
            return viewModel;
        }
    },
    template: getTemplate('dx-filtereditor-advanced')
});
ko.bindingHandlers['cacheElement'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const value = valueAccessor();
        value.action($.fn.constructor(element));
    }
};
