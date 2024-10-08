﻿/**
* DevExpress Analytics (widgets\expressioneditor\tools\_functions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExpressionEditorItem } from './_operatorNames';
export interface IExpressionEditorFunctionItem extends IExpressionEditorItem {
    paramCount: number;
    displayName?: string;
}
export interface IExpressionEditorFunction {
    display: string;
    localizationId?: string;
    items?: {
        [key: string]: Array<IExpressionEditorFunctionItem>;
    };
    category?: string;
}
export declare const insertOrUpdateFunctions: (functions: any | Array<IExpressionEditorFunction>, addins: any | Array<IExpressionEditorFunction>) => any;
export declare const functionDisplay: import("../../../serializer/_internal").IGlobalSubscribableValue<IExpressionEditorFunction[]>;
export declare const resetFunctionDisplay: () => IExpressionEditorFunction[];
export declare function combineFunctionDisplay(addins: any | Array<IExpressionEditorFunction>): Array<IExpressionEditorFunction>;
