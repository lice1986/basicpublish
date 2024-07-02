﻿/**
* DevExpress Analytics (query-builder\dataSource\dataSourceParameterMeta.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
import { ExpressionType, IsDataAccessExpression } from '../../core/internal/_editorTypeMapper';
import { extend } from '../../serializer/_utils';
export function validateName(nameCandidate) {
    return nameCandidate && !nameCandidate.match(/[~`!"№;%\^:\?*\(\)&\-\+={}\[\]\|\\\/,\.<>'\s]/);
}
export const dsParameterNameValidationRules = [{
        type: 'custom',
        validationCallback: (options) => { return validateName(options.value); },
        get message() {
            return getLocalization('Name is required and should be a valid identifier.', 'AnalyticsCoreStringId.NameIsRequired_Error');
        }
    }];
export const parameterValueSerializationsInfo = { propertyName: 'value', displayName: 'Value', localizationId: 'DevExpress.DataAccess.Parameter.Value', editor: editorTemplates.getEditor('text') };
const dsParameterName = { propertyName: 'name', displayName: 'Name', localizationId: 'DevExpress.DataAccess.Parameter.Name', validationRules: dsParameterNameValidationRules, editor: editorTemplates.getEditor('text') };
const dsParameterType = {
    propertyName: 'type', displayName: 'Type', localizationId: 'DevExpress.DataAccess.Parameter.Type', modelName: '@Type', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'System.String', displayValue: 'String', localizationId: 'AnalyticsCoreStringId.Parameter_Type_String' },
        { value: 'System.DateTime', displayValue: 'Date', localizationId: 'AnalyticsCoreStringId.Parameter_Type_DateTime' },
        { value: 'System.Int16', displayValue: 'Number (16 bit integer)', localizationId: 'AnalyticsCoreStringId.Parameter_Type_Int16' },
        { value: 'System.Int32', displayValue: 'Number (32 bit integer)', localizationId: 'AnalyticsCoreStringId.Parameter_Type_Int32' },
        { value: 'System.Int64', displayValue: 'Number (64 bit integer)', localizationId: 'AnalyticsCoreStringId.Parameter_Type_Int64' },
        { value: 'System.Single', displayValue: 'Number (floating-point)', localizationId: 'AnalyticsCoreStringId.Parameter_Type_Float' },
        { value: 'System.Double', displayValue: 'Number (double-precision floating-point)', localizationId: 'AnalyticsCoreStringId.Parameter_Type_Double' },
        { value: 'System.Decimal', displayValue: 'Number (decimal)', localizationId: 'AnalyticsCoreStringId.Parameter_Type_Decimal' },
        { value: 'System.Boolean', displayValue: 'Boolean', localizationId: 'AnalyticsCoreStringId.Parameter_Type_Boolean' },
        { value: 'System.Guid', displayValue: 'Guid', localizationId: 'AnalyticsCoreStringId.Parameter_Type_Guid' },
        { value: ExpressionType, displayValue: 'Expression', localizationId: 'DataAccessUIStringId.ParametersColumn_Expression' }
    ]
};
const dsExpressionResultType = {
    propertyName: 'resultType',
    displayName: 'Result Type',
    localizationId: 'DataAccessWebStringId.QueryBuilder_ResultType',
    modelName: '@ResultType',
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: dsParameterType.valuesArray.filter(x => !IsDataAccessExpression(x.value))
};
const baseDSParamterSerializationsInfo = [
    { propertyName: '_name', modelName: '@Name' },
    { propertyName: '_value', modelName: '#text' },
    parameterValueSerializationsInfo,
    { propertyName: 'itemType', modelName: '@ItemType' }
];
export const dsParameterSerializationInfo = [dsParameterName, dsParameterType, dsExpressionResultType].concat(baseDSParamterSerializationsInfo);
const storedProcAdditionValuesArray = [
    { value: 'System.Byte', displayValue: 'Non-negative number (8 bit integer)', localizationId: 'DataAccessStringId.Type_Byte' },
    { value: 'System.SByte', displayValue: 'Number (8 bit integer)', localizationId: 'DataAccessStringId.Type_SByte' },
    { value: 'System.UInt32', displayValue: 'Non-negative number (32 bit integer)', localizationId: 'DataAccessStringId.Type_UInt' },
    { value: 'System.UInt16', displayValue: 'Non-negative number (16 bit integer)', localizationId: 'DataAccessStringId.Type_UShort' },
    { value: 'System.UInt64', displayValue: 'Non-negative number (64 bit integer)', localizationId: 'DataAccessStringId.Type_ULong' },
    { value: 'System.Char', displayValue: 'Char', localizationId: 'DataAccessStringId.Type_Char' },
    { value: 'System.Object', displayValue: 'Object', localizationId: 'DataAccessStringId.Type_Object' },
    { value: 'System.Byte[]', displayValue: 'Byte array', localizationId: 'DataAccessStringId.Type_ByteArray' },
    { value: 'System.TimeSpan', displayValue: 'Time interval', localizationId: 'DataAccessStringId.Type_TimeSpan' },
];
export function storedProcParameterSerializationsInfo(type) {
    const copyParamType = extend(true, {}, dsParameterType);
    const newValuesArray = [];
    newValuesArray.push(dsParameterType.valuesArray.filter(item => item.value === type)[0] || storedProcAdditionValuesArray.filter(item => item.value === type)[0]);
    newValuesArray.push(dsParameterType.valuesArray.filter(item => IsDataAccessExpression(item.value))[0]);
    copyParamType.valuesArray = newValuesArray;
    const copyResultType = extend(true, {}, dsExpressionResultType);
    copyResultType.valuesArray = newValuesArray.slice(0, 0);
    copyResultType.disabled = true;
    return [
        extend({ disabled: true }, dsParameterName),
        copyParamType,
        copyResultType
    ].concat(baseDSParamterSerializationsInfo);
}