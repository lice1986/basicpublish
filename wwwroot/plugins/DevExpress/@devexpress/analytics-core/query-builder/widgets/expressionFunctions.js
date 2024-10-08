﻿/**
* DevExpress Analytics (query-builder\widgets\expressionFunctions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { combineFunctionDisplay } from '../../widgets/expressioneditor/tools/_functions';
export const expressionFunctions = ((addins) => combineFunctionDisplay(addins))({
    'String': {
        'CreateTable': [{ paramCount: 1, text: 'CreateTable(, )', displayName: 'CreateTable(Column1, ..., ColumnN)', descriptionStringId: 'ExpressionEditorStringId.Function_CreateTable' }],
        'FormatString': [{ paramCount: 1, text: 'FormatString(, )', displayName: 'FormatString(Format, Value1, ... , ValueN)', descriptionStringId: 'ExpressionEditorStringId.Function_FormatString' }]
    }
});
