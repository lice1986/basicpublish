﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\customFunctions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { combineFunctionDisplay } from '@devexpress/analytics-core/analytics-widgets-internal';
export const reportFunctionDisplay = ((addins) => combineFunctionDisplay(addins))([{
        display: 'String',
        items: {
            'NewLine': [{ paramCount: 0, text: 'NewLine()', descriptionStringId: 'ExpressionEditorStringId.Function_NewLine' }],
            'FormatString': [{ paramCount: 1, text: "FormatString('')", descriptionStringId: 'ExpressionEditorStringId.Function_FormatString' }]
        },
    }, {
        display: 'Reporting',
        localizationId: 'ReportStringId.ExpressionEditor_ItemInfo_FunctionReporting',
        items: {
            'Rgb': [{ paramCount: 3, text: 'Rgb(, , )', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_Rgb' }],
            'Argb': [{ paramCount: 4, text: 'Argb(, , , )', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_Argb' }],
            'GetDisplayText': [{ paramCount: 1, text: 'GetDisplayText(?parameter)', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_GetDisplayText' }],
            'ConvertDataToEPC': [{ paramCount: 8, text: 'ConvertDataToEPC()', displayName: 'ConvertDataToEPC()', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_EPC' }]
        }
    }, {
        display: 'Aggregate',
        localizationId: 'DataAccessStringId.ExpressionEditor_FunctionCategory_Aggregate',
        items: {
            Join: [{ paramCount: 1, text: '[].Join()', displayName: 'Join()', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_Join' }],
        },
    }
]);