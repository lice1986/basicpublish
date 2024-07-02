﻿/**
* DevExpress HTML/JS Reporting (designer\utils\_registerCustomExpressions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { functionDisplay, insertOrUpdateFunctions } from '@devexpress/analytics-core/analytics-widgets-internal';
import { expressionFunctions } from '@devexpress/analytics-core/queryBuilder-widgets-internal';
import { reportFunctionDisplay } from '../widgets/customFunctions';
import { extend } from '@devexpress/analytics-core/analytics-internal';
export function registerCustomGlobalExpressions(expressions) {
    if (!(expressions === null || expressions === void 0 ? void 0 : expressions.length)) {
        return;
    }
    expressions.forEach((expressionInfo) => {
        const expression = translateExpression(expressionInfo);
        insertOrUpdateFunctions(functionDisplay(), [extend(true, {}, expression)]);
        insertOrUpdateFunctions(expressionFunctions, [extend(true, {}, expression)]);
        insertOrUpdateFunctions(reportFunctionDisplay, [extend(true, {}, expression)]);
    });
}
export function registerCustomReportExpressions(expressions) {
    if (!(expressions === null || expressions === void 0 ? void 0 : expressions.length)) {
        return;
    }
    expressions.forEach((expressionInfo) => {
        const expression = translateExpression(expressionInfo);
        insertOrUpdateFunctions(reportFunctionDisplay, [expression]);
    });
}
const translateExpression = (expression) => {
    var _a;
    const editorText = `${expression.name}(${Array.from({ length: expression.maxOperandCount }, () => '').join(', ')})`;
    const editorPrefix = expression.category === 'Aggregate' ? '[].' : '';
    const categoryName = (_a = expression.category) !== null && _a !== void 0 ? _a : 'Custom';
    return {
        display: categoryName,
        items: {
            [expression.name]: [{
                    paramCount: Math.max(expression.maxOperandCount, 0),
                    text: `${editorPrefix}${editorText}`,
                    displayName: editorText,
                    description: expression.description
                }],
        }
    };
};