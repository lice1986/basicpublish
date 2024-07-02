﻿/**
* DevExpress Analytics (widgets\common\_displayNameProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import { IDisplayExpressionConverter, IDisplayNameProvider } from './displayNameProvider';
export declare class DisplayExpressionConverter implements IDisplayExpressionConverter {
    private displayNameProvider;
    private _replaceNames;
    constructor(displayNameProvider: IDisplayNameProvider);
    toDisplayExpression(path: string, expression: string): JQueryPromise<string>;
    toRealExpression(path: string, expression: string): JQuery.Promise<any, any, any>;
}