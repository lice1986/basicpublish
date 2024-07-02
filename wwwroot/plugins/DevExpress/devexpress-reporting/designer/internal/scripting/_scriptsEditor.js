﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_scriptsEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ActionListsBase, getControlFullName, getParentContainer, getUniqueName, replaceInvalidSymbols, ShowMessage } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ReportScriptService } from '../../services/_reportScriptService';
import { eventArgsTypes } from './_eventArgsTypes';
import { LanguageHelper } from './_languageHelper';
import { ReportDummyCreator } from './_reportDummyCreator';
export class ScriptsEditor extends ActionListsBase {
    constructor(report, allControls) {
        super();
        this._selectionNotEmpty = ko.observable(false);
        this._canUndo = ko.observable(false);
        this._canRedo = ko.observable(false);
        this._cursorPosition = ko.observable().extend({ throttle: 100 });
        this.guid = ko.observable(null);
        this.editorContainer = ko.observable();
        this.editorVisible = ko.observable(false);
        this.toolbarItems = [];
        this.controls = ko.observableArray([]);
        this.selectedControl = ko.observable();
        this.eventsCollection = ko.observable([]);
        this.selectedEvent = ko.observable();
        this.validateDisabled = ko.observable(false);
        this.aceOptions = {
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false
        };
        const self = this;
        let cursorPositionChanging = false;
        this.languageHelper = new LanguageHelper(report);
        this._updateEditorState = () => {
            if (this.editorContainer() && this.editorContainer().getSession()) {
                this._canUndo(this.editorContainer().getSession().getUndoManager().hasUndo());
                this._canRedo(this.editorContainer().getSession().getUndoManager().hasRedo());
            }
        };
        this.selectionChanged = (editor) => {
            this._selectionNotEmpty(!editor.getSelection().isEmpty());
            this._updateEditorState();
            editor.focus();
        };
        this.report = report;
        this.scriptsText = ko.pureComputed({
            read: () => { return this.report() && this.report().scriptsSource(); },
            write: (newText) => { this.report() && this.report().scriptsSource(newText); }
        });
        this._initializeToolbar();
        this.editorContainer.subscribe(editor => {
            if (editor.getSession()) {
                editor.getSession().getSelection().on('changeSelection', () => {
                    this.selectionChanged(editor);
                });
                editor.getSession().getSelection().on('changeCursor', () => {
                    self._cursorPosition(editor.getCursorPosition());
                });
            }
        });
        this._cursorPosition.subscribe((currentCursorPosition) => {
            const currentFunctionName = this._getFunctionName(currentCursorPosition.row);
            let control, event;
            this.controls().some((ctrl) => {
                control = ctrl;
                event = this._getEventByFunction(ctrl, currentFunctionName);
                return !!event;
            });
            if (control && event) {
                try {
                    cursorPositionChanging = true;
                    this.selectedControl(control);
                    this.selectedEvent(event);
                }
                finally {
                    cursorPositionChanging = false;
                }
            }
        });
        this._disposables.push(ko.computed(() => {
            this.controls(allControls().filter((control) => { return !!control.scripts && !control.lockedInUserDesigner(); }));
        }));
        this.selectedControl.subscribe((newSelectedControl) => {
            let eventsList = [];
            if (newSelectedControl) {
                const info = newSelectedControl.getInfo();
                const scripts = info.filter(x => x.propertyName === 'scripts')[0];
                eventsList = scripts && scripts.info.filter((x) => ko.unwrap(x.visible) !== false && !ko.unwrap(x.disabled)).map((item) => {
                    return item.propertyName.indexOf('on') === 0 ? item.propertyName.substring(2) : item.propertyName;
                });
            }
            this.selectedEvent('');
            this.eventsCollection(eventsList);
        });
        this._ensureFunction = (functionName, eventArgsType) => {
            const editorContainer = this.editorContainer();
            if (editorContainer) {
                const editorContent = editorContainer.getValue();
                if (editorContent.indexOf(functionName) === -1) {
                    const newEventHandler = this.languageHelper.createNewHandler(functionName, eventArgsType);
                    const resultScripts = editorContent.concat(newEventHandler);
                    this.report().scriptsSource(resultScripts);
                    editorContainer.setValue(resultScripts);
                }
            }
        };
        this.ensureEvent = (eventName, functionName, model) => {
            let selectedControl = model;
            if (!selectedControl) {
                selectedControl = this.selectedControl();
            }
            functionName = ScriptsEditor.generateFunctionName(selectedControl, eventName, functionName, this.allFunctionNames);
            const eventArgsType = ScriptsEditor.getEventArgsType(eventName);
            this._ensureFunction(functionName, eventArgsType);
            this._changeSelection(functionName);
            selectedControl.scripts['on' + eventName](functionName);
            this.selectedControl(selectedControl);
            if (this.controls.indexOf(selectedControl) === -1) {
                this.controls.push($.extend({ displayExpr: selectedControl.name }, selectedControl));
            }
            this.selectedEvent(eventName);
        };
        this.selectedEvent.subscribe((newEvent) => {
            if (!cursorPositionChanging && newEvent) {
                const selectedControl = this.selectedControl();
                const selectedControlNewEvent = selectedControl && selectedControl.scripts['on' + newEvent];
                const newEventFunction = selectedControlNewEvent && selectedControlNewEvent();
                if (!newEventFunction || this.allFunctionNames.indexOf(newEventFunction) === -1) {
                    this.ensureEvent(newEvent);
                }
                else {
                    this._changeSelection(newEventFunction);
                }
            }
        });
    }
    _changeSelection(textToSelect) {
        const editorContainer = this.editorContainer();
        if (editorContainer) {
            editorContainer.find(textToSelect, {
                backwards: false,
                wrap: false,
                caseSensitive: false,
                wholeWord: true,
                regExp: false
            }, true);
            editorContainer.findNext();
            editorContainer.findPrevious();
        }
    }
    createActionViewModel(action, index) {
        const viewModel = super.createActionViewModel(action, index);
        if ('controls' in action) {
            const selectBoxActionViewModel = createViewModelGenerator(viewModel)
                .generateProperty('getPopupContainer', getParentContainer)
                .generateProperty('widget', createViewModelGenerator()
                .generateProperty('dataSource', ko.unwrap(action.controls))
                .generateProperty('value', ko.unwrap(action['control']))
                .generateProperty('width', '300px')
                .generateProperty('onValueChanged', (e) => {
                action['control'](e.value);
            })
                .generateProperty('displayExpr', action.displayExpr)
                .generateProperty('placeholder', getLocalization('Select control...', 'ASPxReportsStringId.ReportDesigner_ScriptEditor_Toolbar_SelectControl'))
                .getViewModel())
                .getViewModel();
            this.subscribe(action, 'controls', () => selectBoxActionViewModel.widget.dataSource = ko.unwrap(action.controls));
            this.subscribe(action, 'control', () => selectBoxActionViewModel.widget.value = ko.unwrap(action['control']));
            return selectBoxActionViewModel;
        }
        if ('events' in action) {
            const selectBoxActionViewModel = createViewModelGenerator(viewModel)
                .generateProperty('getPopupContainer', getParentContainer)
                .generateProperty('widget', createViewModelGenerator()
                .generateProperty('dataSource', ko.unwrap(action.events))
                .generateProperty('width', '200px')
                .generateProperty('value', ko.unwrap(action['event']))
                .generateProperty('onValueChanged', (e) => {
                action['event'](e.value);
            })
                .generateProperty('displayExpr', action.displayExpr)
                .generateProperty('placeholder', getLocalization('Select event...', 'ASPxReportsStringId.ReportDesigner_ScriptEditor_Toolbar_SelectEvent'))
                .getViewModel())
                .getViewModel();
            this.subscribe(action, 'events', () => selectBoxActionViewModel.widget.dataSource = ko.unwrap(action.events));
            this.subscribe(action, 'event', () => selectBoxActionViewModel.widget.value = ko.unwrap(action['event']));
            return selectBoxActionViewModel;
        }
        return viewModel;
    }
    _initializeToolbar() {
        const self = this, copyText = ko.observable('');
        this.toolbarItems.push({
            text: 'Cut',
            displayText: () => getLocalization('Cut', 'AnalyticsCoreStringId.EditCut'),
            imageClassName: 'dxrd-image-cut',
            imageTemplateName: 'dxrd-svg-toolbar-cut',
            disabled: ko.pureComputed(() => { return !self.report() || !self._selectionNotEmpty(); }),
            visible: true,
            clickAction: () => {
                copyText(self.editorContainer().getCopyText());
                self.editorContainer().execCommand('cut');
            },
            hotKey: { ctrlKey: true, keyCode: 'X'.charCodeAt(0) }
        });
        this.toolbarItems.push({
            text: 'Copy',
            displayText: () => getLocalization('Copy', 'AnalyticsCoreStringId.Cmd_Copy'),
            imageClassName: 'dxrd-image-copy',
            imageTemplateName: 'dxrd-svg-toolbar-copy',
            disabled: ko.pureComputed(() => { return !self.report() || !self._selectionNotEmpty(); }),
            visible: true,
            clickAction: () => {
                copyText(self.editorContainer().getCopyText());
            },
            hotKey: { ctrlKey: true, keyCode: 'C'.charCodeAt(0) }
        });
        this.toolbarItems.push({
            text: 'Paste',
            displayText: () => getLocalization('Paste', 'AnalyticsCoreStringId.Cmd_Paste'),
            imageClassName: 'dxrd-image-paste',
            imageTemplateName: 'dxrd-svg-toolbar-paste',
            disabled: ko.pureComputed(() => { return !self.report() || !copyText(); }),
            visible: true,
            clickAction: () => {
                self.editorContainer().onPaste(copyText());
            },
            hotKey: { ctrlKey: true, keyCode: 'V'.charCodeAt(0) }
        });
        this.toolbarItems.push({
            text: 'Delete',
            displayText: () => getLocalization('Delete', 'AnalyticsCoreStringId.Cmd_Delete'),
            imageClassName: 'dxrd-image-delete',
            imageTemplateName: 'dxrd-svg-toolbar-delete',
            disabled: ko.pureComputed(() => { return !self.report() || !self._selectionNotEmpty(); }),
            visible: true,
            clickAction: () => {
                self.editorContainer().execCommand('del');
            }
        });
        this.toolbarItems.push({
            text: 'Undo',
            displayText: () => getLocalization('Undo', 'AnalyticsCoreStringId.Undo'),
            imageClassName: 'dxrd-image-undo',
            imageTemplateName: 'dxrd-svg-toolbar-undo',
            disabled: ko.pureComputed(() => { return !self.report() || !self._canUndo(); }),
            visible: true,
            clickAction: () => {
                self.editorContainer().undo(false);
                self._updateEditorState();
            },
            hotKey: { ctrlKey: true, keyCode: 'Z'.charCodeAt(0) },
            hasSeparator: true
        });
        this.toolbarItems.push({
            text: 'Redo',
            displayText: () => getLocalization('Redo', 'AnalyticsCoreStringId.Redo'),
            imageClassName: 'dxrd-image-redo',
            imageTemplateName: 'dxrd-svg-toolbar-redo',
            disabled: ko.pureComputed(() => { return !self.report() || !self._canRedo(); }),
            visible: true,
            clickAction: () => {
                self.editorContainer().redo(false);
                self._updateEditorState();
            },
            hotKey: { ctrlKey: true, keyCode: 'Y'.charCodeAt(0) },
        });
        this.toolbarItems.push({
            text: 'Controls',
            disabled: ko.pureComputed(() => { return !this.report(); }),
            visible: this.editorVisible,
            control: self.selectedControl,
            controls: self.controls,
            displayExpr: (value) => getControlFullName(value),
            templateName: 'dxrd-scripting-selectboxaction',
            hasSeparator: true
        });
        this.toolbarItems.push({
            text: 'Events',
            disabled: ko.pureComputed(() => { return !this.report(); }),
            visible: this.editorVisible,
            events: self.eventsCollection,
            event: self.selectedEvent,
            templateName: 'dxrd-scripting-selectboxaction'
        });
        this.toolbarItems.push({
            text: 'Validate',
            displayText: () => getLocalization('Validate', 'ReportStringId.ScriptEditor_Validate'),
            imageClassName: 'dxrd-image-validate',
            imageTemplateName: 'dxrd-svg-toolbar-validate',
            disabled: ko.pureComputed(() => {
                return !self.report() || self.validateDisabled() || !self.editorContainer();
            }),
            visible: this.editorVisible,
            hotKey: { ctrlKey: true, keyCode: 'L'.charCodeAt(0) },
            clickAction: () => {
                self.validateDisabled(true);
                self._setScriptsText();
                ReportScriptService.validateScripts(self.report()).done(function (result) {
                    if (!self.editorContainer())
                        return;
                    const errors = [];
                    result.forEach((error) => {
                        const linesCount = self.editorContainer().getSession().getLength();
                        errors.push({
                            row: self._getValidIndex(error.Line, linesCount),
                            column: self._getValidIndex(error.Column, linesCount),
                            text: error.ErrorNumber + ' - ' + error.ErrorText,
                            type: error.IsWarning ? 'warning' : 'error'
                        });
                    });
                    self.editorContainer().getSession().setAnnotations(errors);
                    self.validateDisabled(false);
                    if (errors.length > 0) {
                        ShowMessage(getLocalization('The script contains error(s).', 'ASPxReportsStringId.ReportDesigner_ScriptValidation_Message_ContainsErrors'));
                    }
                    else {
                        ShowMessage(getLocalization('The script is valid.', 'ASPxReportsStringId.ReportDesigner_ScriptValidation_Message_ValidScript'), 'success');
                    }
                })
                    .fail(function (result) {
                    ShowMessage(getLocalization('Impossible to validate the script.', 'ASPxReportsStringId.ReportDesigner_ScriptValidation_Error'));
                    self.validateDisabled(false);
                });
            },
            hasSeparator: true
        });
        this.toolbarItems.push({
            text: 'Design',
            displayText: () => getLocalization('Design', 'ReportStringId.RepTabCtl_Designer'),
            imageClassName: 'dxrd-image-design',
            imageTemplateName: 'dxrd-svg-preview-report_designer',
            disabled: ko.pureComputed(() => { return !this.report(); }),
            visible: this.editorVisible,
            hotKey: { ctrlKey: true, keyCode: 'P'.charCodeAt(0) },
            clickAction: () => {
                self._setScriptsText();
                self.editorVisible(false);
            },
            hasSeparator: true
        });
    }
    _getValidIndex(errorPosition, linesCount) {
        const position = errorPosition <= linesCount ? Math.max(1, errorPosition) : 1;
        return Math.max(0, position - 1);
    }
    _setScriptsText() {
        const editorContainer = this.editorContainer();
        if (editorContainer) {
            this.scriptsText(editorContainer.getValue());
        }
    }
    _getFunctionName(row) {
        let name = '';
        const allLines = this.editorContainer().getSession().getDocument().getAllLines();
        for (let rowIndex = row; rowIndex >= 0; rowIndex--) {
            if (name) {
                break;
            }
            for (let index = 0; index < this.allFunctionNames.length; index++) {
                if (allLines[rowIndex].indexOf(this.allFunctionNames[index]) !== -1) {
                    name = this.allFunctionNames[index];
                    break;
                }
            }
        }
        return name;
    }
    _getEventByFunction(control, currentFunctionName) {
        let result = '';
        Object.keys(control.scripts).some((propertyName) => {
            if (result) {
                return true;
            }
            const eventName = propertyName;
            if (ko.unwrap(control.scripts[eventName]) === currentFunctionName && eventName.indexOf('on') === 0) {
                result = eventName.substring(2);
            }
            return false;
        });
        return result;
    }
    static generateFunctionName(control, eventName, functionName, allFunctionNames = []) {
        if (functionName || ko.unwrap(control.name)) {
            return replaceInvalidSymbols(functionName || (ko.unwrap(control.name) + '_' + eventName));
        }
        else {
            return getUniqueName(allFunctionNames, eventName);
        }
    }
    static getEventArgsType(eventName) {
        return eventArgsTypes[eventName] || 'System.EventArgs';
    }
    initialize() {
        const self = this;
        ReportScriptService.setCodeDom('', JSON.stringify({
            'XtraReportsLayoutSerializer': ReportDummyCreator._createDummy(this.report().serialize())
        })).done((result) => {
            this.guid(result.Guid);
        });
    }
    get allFunctionNames() {
        return this.scriptsText() ? this.languageHelper.getFunctionNamesFromScript(this.scriptsText()) : [];
    }
}