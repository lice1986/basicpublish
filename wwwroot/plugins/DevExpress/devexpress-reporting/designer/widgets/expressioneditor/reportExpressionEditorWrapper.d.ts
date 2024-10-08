﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditorWrapper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ExpressionEditor } from '@devexpress/analytics-core/analytics-widgets';
import { PopupEditorBase, ResizeHelper } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { IExpressionObject, WrappedExpressionOptions } from '../../dataObjects/expressions/_wrappedExpressionOptions';
import { ReportExpressionEditorAdapter } from './reportExpressionEditorAdapter';
export interface IExpressionEditorProperty {
    propertyName: string;
    displayName: string;
    isSelected?: ko.Observable<boolean> | ko.Computed<boolean>;
    isBinded?: () => boolean;
    collapsed?: ko.Observable<boolean> | ko.Computed<boolean>;
    content?: WrappedExpressionOptions;
    items?: IExpressionEditorProperty[];
    templateName?: string;
    value?: ko.Observable<any>;
    click?: () => void;
}
export declare class ReportExpressionEditorWrapper extends PopupEditorBase {
    control: ko.Observable;
    value: ko.Observable<WrappedExpressionOptions> | ko.Computed<WrappedExpressionOptions>;
    _allProperties: IExpressionEditorProperty[];
    _undoEngine: UndoEngine;
    constructor(control: ko.Observable, value: ko.Observable<WrappedExpressionOptions> | ko.Computed<WrappedExpressionOptions>);
    save(sender: any): void;
    apply(sender: any): boolean;
    onShowing(e: any): void;
    resizeAceEditor(): void;
    onHiding(e: any): void;
    createExpressionEditorProperties(expressionObj: IExpressionObject, properties: any, selected: any): any;
    switchExpression(property: IExpressionEditorProperty): void;
    updateExpression(expression: any): void;
    resizeHelper: ResizeHelper;
    title: () => string;
    getPopupContainer: typeof getParentContainer;
    adapter: ko.Observable<ReportExpressionEditorAdapter>;
    editor: ko.Observable<ExpressionEditor>;
    properties: ko.Observable<IExpressionEditorProperty[]>;
    currentProperty: IExpressionEditorProperty;
}
