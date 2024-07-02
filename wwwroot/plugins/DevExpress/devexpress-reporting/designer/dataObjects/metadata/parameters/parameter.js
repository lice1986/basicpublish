﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\parameter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, nameValidationRules } from '@devexpress/analytics-core/analytics-internal';
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
import { parameterTypeValues } from '../../parameters/parameterSettings';
import { parameterValueToJsonObject } from '../_parameterUtils';
import { parameterExpressionBindings } from './parameterExpressionBinding';
export const valueSourceSettingsTypes = [
    { value: 'None', displayValue: '(none)', localizationId: 'PreviewStringId.ParameterLookUpSettingsNoLookUp' },
    { value: 'StaticListLookUpSettings', displayValue: 'Static List', localizationId: 'DevExpress.XtraReports.Parameters.StaticListLookUpSettings' },
    { value: 'DynamicListLookUpSettings', displayValue: 'Dynamic List', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings' }
];
export const extendValueSourceSettingsTypes = extend(true, [], [].concat(valueSourceSettingsTypes, [
    { value: 'RangeParametersSettings', displayValue: 'Range Parameters', localizationId: 'DevExpress.XtraReports.Parameters.RangeParametersSettings' }
]));
export const parameterValueSerializationInfo = { propertyName: 'value', displayName: 'Value', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.Value', modelName: '@ValueInfo', from: (val) => { return ko.observable(val); }, toJsonObject: parameterValueToJsonObject };
export const parameterExpressionSerializationInfo = { propertyName: 'ValueExpressionObj', displayName: 'Expression', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.Expression', editor: editorTemplates.getEditor('expressionEditor') };
export const parameterLookUpSettingsSerializationInfo = { propertyName: 'lookUpSettings', displayName: 'Look-Up Settings', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.LookUpSettings', modelName: '@LookUpSettings', link: true, editor: editorTemplates.getEditor('objecteditor') };
export const valueSourceSettingsSerializationInfo = { propertyName: 'valueSourceSettings', displayName: 'Value Source Settings', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.ValueSourceSettings', modelName: '@ValueSourceSettings', link: true, editor: editorTemplates.getEditor('objecteditor') };
export const parameterNameSerializationInfo = { propertyName: 'parameterName', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.XtraReports.UI.XRControl.Name', defaultVal: '', validationRules: nameValidationRules, editor: designerEditorTemplates.getEditor('name') };
export const parameterSerializationInfo = [
    parameterNameSerializationInfo,
    { propertyName: 'description', localizable: true, modelName: '@Description', displayName: 'Description', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.Description', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'type', displayName: 'Type', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.Type', editor: editorTemplates.getEditor('combobox'), valuesArray: (parameterTypeValues) },
    { propertyName: 'visible', modelName: '@Visible', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('boolSelect'), displayName: 'Visible', localizationId: 'DevExpress.XtraReports.UI.XRControl.Visible' },
    { propertyName: 'enabled', modelName: '@Enabled', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('boolSelect'), displayName: 'Enabled', localizationId: 'DevExpress.XtraReports.UI.EditOptions.Enabled' },
    { propertyName: 'allowNull', modelName: '@AllowNull', displayName: 'Allow Null', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.AllowNull', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') },
    { propertyName: 'isMultiValue', modelName: '@MultiValue', displayName: 'MultiValue', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.MultiValue', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') },
    { propertyName: 'selectAllValues', modelName: '@SelectAllValues', displayName: 'Select All Values', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.SelectAllValues', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') },
    { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', localizationId: 'DevExpress.XtraReports.UI.XRControl.Tag', editor: editorTemplates.getEditor('text'), defaultVal: '' },
    parameterExpressionSerializationInfo,
    parameterValueSerializationInfo,
    parameterExpressionBindings,
    { propertyName: '_obsoleteValue', modelName: '@Value', link: true },
    { propertyName: '_type', modelName: '@Type', link: true },
    {
        propertyName: 'valueSourceSettingsType', displayName: 'Value Source Settings', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.ValueSourceSettings', editor: editorTemplates.getEditor('combobox'),
        valuesArray: valueSourceSettingsTypes
    },
    valueSourceSettingsSerializationInfo
];