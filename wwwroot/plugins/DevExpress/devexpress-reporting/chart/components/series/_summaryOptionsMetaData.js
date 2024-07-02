﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_summaryOptionsMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { fromEnum, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { tag } from '../../internal/meta/_common';
import { editorTemplates as chartEditorTemplates } from '../../internal/_editorTemplates';
import { SummaryFunctionModel } from '../../widgets/_summaryFunctionEditor';
export const summaryFunctionSerializationInfo = {
    propertyName: 'summaryFunction', displayName: 'Summary Function', modelName: '@SummaryFunction', from: SummaryFunctionModel.from, toJsonObject: SummaryFunctionModel.toJson,
    editor: chartEditorTemplates.getEditor('summaryFunction'), localizationId: 'DevExpress.XtraCharts.SummaryOptionsBase.SummaryFunction'
};
export const summaryOptionsSerializationInfoArray = [
    summaryFunctionSerializationInfo, tag
];
export const numericSummaryOptionsSerializationInfoArray = summaryOptionsSerializationInfoArray.concat([
    { propertyName: 'measureUnit', modelName: '@MeasureUnit', displayName: 'Measure Unit', localizationId: 'DevExpress.XtraCharts.NumericSummaryOptions.MeasureUnit', defaultVal: 1, editor: editorTemplates.getEditor('numeric') },
    { propertyName: 'useAxisMeasureUnit', modelName: '@UseAxisMeasureUnit', displayName: 'Use Axis Measure Unit', localizationId: 'DevExpress.XtraCharts.NumericSummaryOptions.UseAxisMeasureUnit', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('bool') },
]);
export const dateTimeSummaryOptionsSerializationInfoArray = summaryOptionsSerializationInfoArray.concat([
    {
        propertyName: 'measureUnit', modelName: '@MeasureUnit', displayName: 'Measure Unit', localizationId: 'DevExpress.XtraCharts.DateTimeSummaryOptions.MeasureUnit', defaultVal: 'Day', from: fromEnum, editor: editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'Millisecond', displayValue: 'Millisecond', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Millisecond' },
            { value: 'Second', displayValue: 'Second', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Second' },
            { value: 'Minute', displayValue: 'Minute', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Minute' },
            { value: 'Hour', displayValue: 'Hour', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Hour' },
            { value: 'Day', displayValue: 'Day', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Day' },
            { value: 'Week', displayValue: 'Week', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Week' },
            { value: 'Month', displayValue: 'Month', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Month' },
            { value: 'Quarter', displayValue: 'Quarter', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Quarter' },
            { value: 'Year', displayValue: 'Year', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Year' },
        ]
    },
    { propertyName: 'measureUnitMultiplier', modelName: '@MeasureUnitMultiplier', displayName: 'Measure Unit Multiplier', localizationId: 'DevExpress.XtraCharts.DateTimeSummaryOptions.MeasureUnitMultiplier', defaultVal: 1, editor: editorTemplates.getEditor('numeric') },
    { propertyName: 'useAxisMeasureUnit', modelName: '@UseAxisMeasureUnit', displayName: 'Use Axis Measure Unit', localizationId: 'DevExpress.XtraCharts.DateTimeSummaryOptions.UseAxisMeasureUnit', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('bool') }
]);