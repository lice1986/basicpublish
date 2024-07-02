﻿/**
* DevExpress Analytics (widgets\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo, IItemsProvider } from './utils';
export declare function integerValueConverter(val: any, defaultValue: any, type?: any): any;
export declare function enumValueConverter(val: any, defaultValue: any, valuesList: any): any;
export interface IValidateExpressionOptions {
    fieldListProvider: IItemsProvider;
    expression: string;
    path: string;
    rootItems?: string[];
}
export declare function validateExpression(options: IValidateExpressionOptions): JQuery.Promise<any, any, any>;
export declare function floatValueConverter(val: any, defaultValue: any, type?: any): any;
export declare let isDarkTheme: (theme?: string) => boolean;
export declare function _setIsDarkTheme(callback: any): void;
export declare function setCursorInFunctionParameter(paramCount: any, editor: any, insertValue: any): void;
export declare function isList(data: IDataMemberInfo): boolean;
export declare function getParentContainer(el: HTMLElement, container?: string): any;
export declare function isNullOrEmptyString(str: string): boolean;
