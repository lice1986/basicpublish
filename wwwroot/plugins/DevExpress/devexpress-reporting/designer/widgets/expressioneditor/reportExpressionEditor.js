﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ReportExpressionEditorAdapter } from './reportExpressionEditorAdapter';
export class ReportExpressionEditor extends Editor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this.popupVisible = ko.observable(false);
    }
    patchOptions(reportExplorerProvider, editableObject) {
        if (!this._adapter) {
            this._adapter = new ReportExpressionEditorAdapter(this._get('values', 'wrapped'), this.value);
            this._disposables.push(this._adapter);
        }
        return this._adapter.patchOptions(reportExplorerProvider, editableObject);
    }
}
