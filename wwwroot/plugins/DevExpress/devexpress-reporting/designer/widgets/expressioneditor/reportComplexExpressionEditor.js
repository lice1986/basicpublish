﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportComplexExpressionEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ReportExpressionEditor } from './reportExpressionEditor';
import { ReportExpressionEditorWrapper } from './reportExpressionEditorWrapper';
export class ReportComplexExpressionEditor extends ReportExpressionEditor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this.editorTemplateName = 'dxrd-reportexpression-ellipsis';
        this.wrapper = new ReportExpressionEditorWrapper(ko.observable(), this.value);
        this.popupVisible = this.wrapper.popupVisible;
        this._disposables.push(this.wrapper);
    }
    showPopup(editableObject) {
        this.wrapper.control(editableObject);
        this.popupVisible(true);
    }
}
