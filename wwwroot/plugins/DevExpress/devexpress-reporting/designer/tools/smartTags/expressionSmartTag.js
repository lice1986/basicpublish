﻿/**
* DevExpress HTML/JS Reporting (designer\tools\smartTags\expressionSmartTag.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportExpressionEditorWrapper } from '../../widgets/expressioneditor/reportExpressionEditorWrapper';
import { BooleanEditor } from '@devexpress/analytics-core/analytics-widgets';
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
export class ExpressionSmartTag extends Disposable {
    constructor(reportElement, _expressionEditor) {
        super();
        this.reportElement = reportElement;
        this._expressionEditor = _expressionEditor;
        this.imageTemplateName = 'dxrd-svg-properties-propertyexpression';
        this.visible = ko.observable(true);
    }
    onClick() {
        const expressionEditor = new ReportExpressionEditorWrapper(ko.observable(this.reportElement), ko.observable(null));
        this._expressionEditor(expressionEditor);
        this._expressionEditor().popupVisible(true);
        this.subscription = expressionEditor.popupVisible.subscribe((newVal) => {
            if (!newVal) {
                setTimeout(() => {
                    expressionEditor.dispose();
                    this._expressionEditor(null);
                    this.subscription.dispose();
                }, 10);
            }
        });
    }
    dispose() {
        var _a, _b;
        (_a = this._expressionEditor()) === null || _a === void 0 ? void 0 : _a.dispose();
        this._expressionEditor(null);
        (_b = this.subscription) === null || _b === void 0 ? void 0 : _b.dispose();
    }
}
export class TasksSmartTag extends Disposable {
    constructor(reportElement, popularProperties) {
        super();
        this.reportElement = reportElement;
        this.popularProperties = popularProperties;
        this._booleanEditors = ko.observableArray([]);
        this._nonBooleanEditors = ko.observableArray([]);
        this.visible = ko.observable(true);
        this.popoverVisible = ko.observable(false);
        this.imageTemplateName = 'dxrd-svg-properties-tasksmarttag';
        this.templateName = 'dxrd-smart-tag';
        this.editorsAvailableSubscriptions = [];
        this.getPopupContainer = getParentContainer;
        this.separatorVisible = ko.observable(false);
        const updateStatus = () => {
            const condition = (editor) => editor._get('visible');
            const hasBooleanEditor = this._booleanEditors().some(condition);
            const hasNonBooleanEditor = this._nonBooleanEditors().some(condition);
            this.visible(hasBooleanEditor || hasNonBooleanEditor);
            this.separatorVisible(hasBooleanEditor && hasNonBooleanEditor);
        };
        const fillAndSubscribeEditors = () => {
            var _a, _b, _c;
            const popularPropertyNames = (_b = this.getPopularPropertyNames((_a = this.reportElement) === null || _a === void 0 ? void 0 : _a.controlType)) === null || _b === void 0 ? void 0 : _b.popularProperties;
            const booleanEditors = [];
            const nonBooleanEditors = [];
            const editors = (_c = this.popularProperties) === null || _c === void 0 ? void 0 : _c.getEditors();
            editors && editors.forEach(editor => {
                const pushAndSubscribeEditors = (editors) => {
                    editors.forEach(editor => {
                        this.editorsAvailableSubscriptions.push(editor.subscribeProperty('visible', () => { updateStatus(); }));
                        if (editor instanceof BooleanEditor)
                            booleanEditors.push(editor);
                        else
                            nonBooleanEditors.push(editor);
                    });
                };
                if (editor.isComplexEditor) {
                    const editorsFromComplex = this.collectEditorsFromComplex(editor, popularPropertyNames, [], editor._get('displayName'));
                    editorsFromComplex.length && pushAndSubscribeEditors(editorsFromComplex);
                }
                else {
                    pushAndSubscribeEditors([editor]);
                }
            });
            this._booleanEditors(booleanEditors);
            this._nonBooleanEditors(nonBooleanEditors);
        };
        fillAndSubscribeEditors();
        updateStatus();
        const dispose = () => {
            this.editorsAvailableSubscriptions.forEach(subsription => subsription());
            this.editorsAvailableSubscriptions = [];
        };
        this.addDisposable({ dispose: dispose });
        this.addDisposable(this.popularProperties.subscribeProperty('_editors', (newValue) => {
            dispose();
            fillAndSubscribeEditors();
            updateStatus();
        }));
    }
    collectEditorsFromComplex(complexEditor, propertyNames, editorsFound = [], parentEditorName) {
        var _a;
        const checkAndPushEditor = (editor) => {
            if (propertyNames && propertyNames.length && propertyNames.some(pName => pName === editor.name)
                && !editor.templateName.toLowerCase().includes('header')) {
                if (editor._get('displayName') !== parentEditorName)
                    editor.parentName = ' (' + parentEditorName + ')';
                editorsFound.push(editor);
            }
        };
        checkAndPushEditor(complexEditor);
        const editors = (_a = complexEditor.viewmodel) === null || _a === void 0 ? void 0 : _a.editors;
        if (editors && editors.length) {
            editors.forEach(editor => {
                if (editor.isComplexEditor) {
                    this.collectEditorsFromComplex(editor, propertyNames, editorsFound, (parentEditorName && parentEditorName.length) ? parentEditorName + ' > ' + editor._get('displayName') : editor._get('displayName'));
                }
                checkAndPushEditor(editor);
            });
        }
        return editorsFound;
    }
    getPopularPropertyNames(controlType) {
        var _a, _b;
        return (_b = (_a = this.reportElement.root) === null || _a === void 0 ? void 0 : _a.getControlFactory()) === null || _b === void 0 ? void 0 : _b.getControlInfo(controlType);
    }
    onClick() {
        this.popoverVisible(!this.popoverVisible());
    }
    getEditors(booleanEditors) {
        if (booleanEditors)
            return this._booleanEditors();
        else
            return this._nonBooleanEditors();
    }
}