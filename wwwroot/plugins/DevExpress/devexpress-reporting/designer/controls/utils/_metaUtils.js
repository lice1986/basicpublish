﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_metaUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
export const createSinglePopularBindingInfos = (propertyName) => {
    return [createPopularBindingInfo({ bindingName: propertyName, propertyName: '' }, false), createPopularBindingInfo({ bindingName: propertyName, propertyName: '' })];
};
export const createPopularBindingInfos = (options) => {
    const dataBindingOptions = {
        propertyName: 'popularDataBinding' + options.propertyName,
        displayName: options.propertyName,
        localizationId: options.localizationId,
        bindingName: options.propertyName,
    };
    const expressionOptions = {
        propertyName: 'popularExpression' + options.propertyName,
        displayName: options.propertyName,
        localizationId: options.localizationId,
        bindingName: options.propertyName,
    };
    return [createPopularBindingInfo(dataBindingOptions, false), createPopularBindingInfo(expressionOptions)];
};
export const createPopularBindingInfo = (options, isExpression = true) => {
    const newInfo = {
        propertyName: options.propertyName || (isExpression ? 'popularExpression' : 'popularDataBinding'),
        displayName: options.displayName || (isExpression ? 'Expression' : 'Data Binding'),
        localizationId: options.localizationId || (isExpression ? 'DevExpress.XtraReports.UI.CalculatedField.Expression' : 'ReportStringId.STag_Name_DataBinding'),
        editor: isExpression ? designerEditorTemplates.getEditor('reportexpressionComplex') : designerEditorTemplates.getEditor('dataBinding'),
    };
    if (isExpression)
        newInfo['expressionName'] = options.bindingName;
    else
        newInfo['bindingName'] = options.bindingName;
    return newInfo;
};
export function valuesArrayAsEnumWithLocalizationId(info, prefix) {
    return info.valuesArray.map(item => {
        const subName = item.localizationId && item.localizationId.split('.').pop() || item.value;
        return extend({}, item, { localizationId: prefix + subName });
    });
}