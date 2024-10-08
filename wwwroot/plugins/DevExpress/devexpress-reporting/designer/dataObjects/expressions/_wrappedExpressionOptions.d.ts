﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\expressions\_wrappedExpressionOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, IDisposable, IItemsProvider, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { IExpressionOptions } from '@devexpress/analytics-core/analytics-widgets';
import { IExpressionEditorFunction } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { IExpressionBinding } from '../../controls/properties/expressionBinding';
import { IControlPropertyDescription } from './_expressionWrapper';
export interface IExpressionObject extends IDisposable {
    getInfo(): ISerializationInfoArray;
    getExpression(propertyName: string, eventName: string): IExpressionOptions;
    getExpressionsTreeItems(propertyName: string): IExpressionTreeItem[];
    validateExpression(): boolean;
    hasWarning(): boolean;
    updateExpressionObjectProperties: (newInfo?: IControlPropertyDescription[]) => void;
}
export interface IExpressionTreeItem {
    expressionName: string;
    eventName?: string;
    displayName?: string;
    localizationId?: string;
    expressionObj?: IExpressionOptions;
    innerItems?: IExpressionTreeItem[];
}
export declare class WrappedExpressionOptions extends Disposable implements IExpressionOptions {
    eventName?: string;
    constructor(options: IExpressionOptions, handlers?: {
        addExpression: (newVal: string) => void;
        removeExpression: (expression: IExpressionBinding) => void;
    }, fieldListProvider?: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>, eventName?: string);
    onHiding(e: {
        component: any;
        element: HTMLElement;
    }): void;
    onShowing(e: {
        component: any;
        element: HTMLElement;
    }): void;
    onContentReady(e: {
        component: any;
        element: HTMLElement;
    }): void;
    isValid: ko.Observable<boolean> | ko.Computed<boolean>;
    warningMessage: ko.Observable<string>;
    expression: ko.Observable<IExpressionBinding> | ko.Computed<IExpressionBinding>;
    value: ko.Observable<string> | ko.Computed<string>;
    path: ko.Observable<string> | ko.Computed<string>;
    functions: Array<IExpressionEditorFunction>;
    customizeCategories?: (sender: any, categories: any, dblclick?: any) => void;
    rootItems: ({
        name: string;
        needPrefix: boolean;
        rootPath?: undefined;
    } | {
        name: string;
        needPrefix: boolean;
        rootPath: string;
    })[];
}
