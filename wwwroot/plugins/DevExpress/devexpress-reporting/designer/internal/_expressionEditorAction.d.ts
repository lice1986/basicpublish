﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_expressionEditorAction.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelAction } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { ReportExpressionEditorWrapper } from '../widgets/expressioneditor/reportExpressionEditorWrapper';
declare type Options = {
    expressionEditor: ReportExpressionEditorWrapper;
    hasInnerItems?: boolean;
    title: string;
    hint: ko.Computed;
};
export declare const expressionEditorActionId = "dxrd-expression";
export declare function createExpressionEditorAction({ expressionEditor, hasInnerItems, title, hint }: Options): IModelAction;
export {};
