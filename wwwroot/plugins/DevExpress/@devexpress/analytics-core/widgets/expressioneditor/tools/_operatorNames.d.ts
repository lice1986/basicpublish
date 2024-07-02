﻿/**
* DevExpress Analytics (widgets\expressioneditor\tools\_operatorNames.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IExpressionEditorItem {
    text: string;
    description?: string;
    descriptionStringId?: string;
}
export interface IExpressionEditorOperatorItem extends IExpressionEditorItem {
    image?: string;
    hasSeparator?: boolean;
}
export declare const operatorNames: Array<IExpressionEditorOperatorItem>;
