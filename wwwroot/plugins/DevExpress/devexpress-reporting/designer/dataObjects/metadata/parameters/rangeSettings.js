﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\rangeSettings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates, PropertyGridEditorFlat } from '@devexpress/analytics-core/analytics-widgets';
import { parameterExpressionSerializationInfo, parameterNameSerializationInfo, parameterValueSerializationInfo } from './parameter';
import { parameterExpressionBindings } from './parameterExpressionBinding';
export const rangeEditor = {
    custom: 'dxrd-parameters-range-grid', editorType: PropertyGridEditorFlat
};
export const rangeBoundaryParameterInfos = [
    parameterNameSerializationInfo, parameterValueSerializationInfo,
    parameterExpressionBindings, parameterExpressionSerializationInfo,
];
const startParameter = {
    propertyName: 'startParameter', modelName: '@StartParameter', displayName: 'Start Parameter', localizationId: 'DevExpress.XtraReports.Parameters.RangeSettings.StartParameter',
    editor: editorTemplates.getEditor('objecteditor'), link: true
};
const endParameter = {
    propertyName: 'endParameter', modelName: '@EndParameter', displayName: 'End Parameter', localizationId: 'DevExpress.XtraReports.Parameters.RangeSettings.EndParameter',
    editor: editorTemplates.getEditor('objecteditor'), link: true
};
export const rangeSettingsInfos = [startParameter, endParameter];
