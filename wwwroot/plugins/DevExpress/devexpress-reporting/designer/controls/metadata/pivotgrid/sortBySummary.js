﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\pivotgrid\sortBySummary.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
export const summaryTypeValues = [
    { value: 'Count', displayValue: 'Count', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Count' },
    { value: 'Sum', displayValue: 'Sum', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Sum' },
    { value: 'Min', displayValue: 'Min', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Min' },
    { value: 'Max', displayValue: 'Max', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Max' },
    { value: 'Average', displayValue: 'Average', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Average' },
    { value: 'StdDev', displayValue: 'Standard Deviation', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.StdDev' },
    { value: 'StdDevp', displayValue: 'Standard Deviation for Entire Population', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.StdDevp' },
    { value: 'Var', displayValue: 'Variation', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Var' },
    { value: 'Varp', displayValue: 'Variation for Entire Population', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Varp' },
    { value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Custom' }
];
export const summaryType = {
    propertyName: 'summaryType', modelName: '@SummaryType', displayName: 'Summary Type', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SummaryType',
    defaultVal: 'Sum', editor: editorTemplates.getEditor('combobox'), valuesArray: summaryTypeValues
};
export const fieldComponentName = {
    propertyName: 'fieldComponentName', modelName: '@FieldComponentName', displayName: 'Field', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.Field',
    defaultVal: '', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: '', displayValue: '(none)', localizationId: 'ChartStringId.WizNoBackImage' }]
};
export const conditions = {
    propertyName: 'conditions', modelName: 'Conditions', displayName: 'Conditions', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.Conditions', array: true,
    template: '#dxrd-commonCollectionItem',
    editor: { custom: 'dxrd-pivot-sortBySummaryInfo-conditions' }
};
export const field = { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.FieldName', defaultVal: null, editor: editorTemplates.getEditor('text') };
export const customTotalSummaryType = {
    propertyName: 'customTotalSummaryType', modelName: '@CustomTotalSummaryType', displayName: 'Custom Total Summary Type', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.CustomTotalSummaryType',
    defaultVal: '', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: '', displayValue: '(none)', localizationId: 'ChartStringId.WizNoBackImage' }].concat(summaryTypeValues)
};
export const sortBySummaryInfo = [conditions, customTotalSummaryType, fieldComponentName, field, summaryType];
export const sortBySummaryConditionInfo = [
    fieldComponentName,
    { modelName: '@Value', propertyName: 'value', displayName: 'Value', editor: editorTemplates.getEditor('text'), localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' },
    {
        modelName: '@Value_type', propertyName: 'valueType', displayName: 'Type', editor: editorTemplates.getEditor('combobox'), defaultVal: '<Null>', valuesArray: [
            { value: 'System.String', displayValue: 'String', localizationId: 'UtilsUIStringId.Parameter_Type_String' },
            { value: 'System.Byte', displayValue: 'Number (8 bit integer)', localizationId: 'DataAccessStringId.Type_SByte' },
            { value: 'System.Int16', displayValue: 'Number (16 bit integer)', localizationId: 'UtilsUIStringId.Parameter_Type_Int16' },
            { value: 'System.Int32', displayValue: 'Number (32 bit integer)', localizationId: 'UtilsUIStringId.Parameter_Type_Int32' },
            { value: 'System.Int64', displayValue: 'Number (64 bit integer)', localizationId: 'UtilsUIStringId.Parameter_Type_Int64' },
            { value: 'System.Single', displayValue: 'Number (floating-point)', localizationId: 'UtilsUIStringId.Parameter_Type_Float' },
            { value: 'System.Double', displayValue: 'Number (double-precision floating-point)', localizationId: 'UtilsUIStringId.Parameter_Type_Double' },
            { value: 'System.Decimal', displayValue: 'Number (decimal)', localizationId: 'UtilsUIStringId.Parameter_Type_Decimal' },
            { value: 'System.Boolean', displayValue: 'Boolean', localizationId: 'UtilsUIStringId.Parameter_Type_Boolean' },
            { value: 'System.Char', displayValue: 'Char', localizationId: 'DataAccessStringId.Type_Char' },
            { value: 'System.DateTime', displayValue: 'Date', localizationId: 'UtilsUIStringId.Parameter_Type_DateTime' },
            { value: '<Null>', displayValue: '<Null>' }
        ],
        localizationId: 'DevExpress.XtraPrinting.XlEncryptionOptions.Type'
    }
];
