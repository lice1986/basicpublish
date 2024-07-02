﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportComplexExpressionEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ReportExpressionEditor } from './reportExpressionEditor';
import { ReportExpressionEditorWrapper } from './reportExpressionEditorWrapper';
export declare class ReportComplexExpressionEditor extends ReportExpressionEditor {
    wrapper: ReportExpressionEditorWrapper;
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    showPopup(editableObject: any): void;
    editorTemplateName: string;
}