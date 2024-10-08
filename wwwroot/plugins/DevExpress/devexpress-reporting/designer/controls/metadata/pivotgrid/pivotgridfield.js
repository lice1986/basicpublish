﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\pivotgrid\pivotgridfield.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
import { SortBySummaryInfo } from '../../pivotgrid/sortBySummary';
import { backColor, borderColor, defaultBooleanValuesArray, font, foreColor, textTrimmingValues } from '../properties/metadata';
import { baseControlProperties } from '../properties/metadataGroups';
import { summaryType } from './sortBySummary';
export const caption = { displayName: 'Caption', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Caption', propertyName: 'caption', modelName: '@Caption', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const index = { displayName: 'Index', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridField.Index', propertyName: 'index', modelName: '@Index', defaultVal: 0, editor: editorTemplates.getEditor('numeric') };
export const fieldName = { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Data Column Name', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.FieldName', editor: editorTemplates.getEditor('field') };
export const minWidth = { displayName: 'Min Width', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.MinWidth', propertyName: 'minWidth', modelName: '@MinWidth', defaultVal: 20, editor: editorTemplates.getEditor('numeric') };
export const width = { displayName: 'Width', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Width', propertyName: 'width', modelName: '@Width', defaultVal: 100, editor: editorTemplates.getEditor('numeric') };
export const area = {
    displayName: 'Area', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Area', propertyName: 'area', modelName: '@Area', editor: editorTemplates.getEditor('combobox'), defaultVal: 'FilterArea',
    valuesArray: [
        { value: 'RowArea', displayValue: 'Row Area', localizationId: 'DevExpress.XtraPivotGrid.PivotArea.RowArea' },
        { value: 'ColumnArea', displayValue: 'Column Area', localizationId: 'DevExpress.XtraPivotGrid.PivotArea.ColumnArea' },
        { value: 'FilterArea', displayValue: 'Filter Area', localizationId: 'DevExpress.XtraPivotGrid.PivotArea.FilterArea' },
        { value: 'DataArea', displayValue: 'Data Area', localizationId: 'DevExpress.XtraPivotGrid.PivotArea.DataArea' },
    ]
};
export const allowedAreas = {
    propertyName: 'allowedAreas', modelName: '@AllowedAreas', displayName: 'Allowed Areas', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.AllowedAreas', defaultVal: 'All', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'All', displayValue: 'All', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAllowedAreas.All' },
        { value: 'RowArea', displayValue: 'Row Area', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAllowedAreas.RowArea' },
        { value: 'ColumnArea', displayValue: 'Column Area', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAllowedAreas.ColumnArea' },
        { value: 'FilterArea', displayValue: 'Filter Area', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAllowedAreas.FilterArea' },
        { value: 'DataArea', displayValue: 'Data Area', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAllowedAreas.DataArea' }
    ]
};
export const areaIndex = { propertyName: 'areaIndex', modelName: '@AreaIndex', defaultVal: -1 };
export const areaIndexEditable = { propertyName: 'areaIndexEditable', displayName: 'Area Index', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.AreaIndex', editor: editorTemplates.getEditor('numeric') };
export const unboundType = {
    propertyName: 'unboundType', modelName: '@UnboundType', displayName: 'Unbound Type', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UnboundType', defaultVal: 'Bound', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Bound', displayValue: 'Bound', localizationId: 'DevExpress.Data.UnboundColumnType.Bound' },
        { value: 'Integer', displayValue: 'Integer', localizationId: 'DevExpress.Data.UnboundColumnType.Integer' },
        { value: 'Decimal', displayValue: 'Decimal', localizationId: 'DevExpress.Data.UnboundColumnType.Decimal' },
        { value: 'DateTime', displayValue: 'DateTime', localizationId: 'DevExpress.XtraTreeList.Data.UnboundColumnType.DateTime' },
        { value: 'String', displayValue: 'String', localizationId: 'DevExpress.Data.UnboundColumnType.String' },
        { value: 'Boolean', displayValue: 'Boolean', localizationId: 'DevExpress.Data.UnboundColumnType.Boolean' },
        { value: 'Object', displayValue: 'Object', localizationId: 'DevExpress.Data.UnboundColumnType.Object' }
    ]
};
export const unboundFieldName = { propertyName: 'unboundFieldName', modelName: '@UnboundFieldName', displayName: 'Unbound Field Name', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UnboundFieldName', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const unboundExpression = { propertyName: 'unboundExpression', modelName: '@UnboundExpression', displayName: 'Unbound Expression', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UnboundExpression', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const topValueType = {
    propertyName: 'topValueType', modelName: '@TopValueType', displayName: 'Top Value Type', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TopValueType', defaultVal: 'Absolute', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Absolute', displayValue: 'Absolute', localizationId: 'DevExpress.XtraPivotGrid.PivotTopValueType.Absolute' },
        { value: 'Percent', displayValue: 'Percent', localizationId: 'DevExpress.XtraPivotGrid.PivotTopValueType.Percent' },
        { value: 'Sum', displayValue: 'Sum', localizationId: 'DevExpress.XtraPivotGrid.PivotTopValueType.Sum' }
    ]
};
export const topValueShowOthers = { propertyName: 'topValueShowOthers', modelName: '@TopValueShowOthers', displayName: 'Top Value Show Others', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TopValueShowOthers', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const topValueCount = { propertyName: 'topValueCount', modelName: '@TopValueCount', displayName: 'Top Value Count', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TopValueCount', defaultVal: 0, editor: editorTemplates.getEditor('numeric') };
export const summaryDisplayType = {
    propertyName: 'summaryDisplayType', modelName: '@SummaryDisplayType', displayName: 'Summary Display Type', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SummaryDisplayType', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.Default' },
        { value: 'AbsoluteVariation', displayValue: 'Absolute Variation', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.AbsoluteVariation' },
        { value: 'PercentVariation', displayValue: 'Percent Variation', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentVariation' },
        { value: 'PercentOfColumn', displayValue: 'Percent Of Column', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfColumn' },
        { value: 'PercentOfRow', displayValue: 'Percent Of Row', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfRow' },
        { value: 'PercentOfColumnGrandTotal', displayValue: 'Percent Of Column Grand Total', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfColumnGrandTotal' },
        { value: 'PercentOfRowGrandTotal', displayValue: 'Percent Of Row Grand Total', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfRowGrandTotal' },
        { value: 'PercentOfGrandTotal', displayValue: 'Percent Of Grand Total', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfGrandTotal' },
        { value: 'RankInColumnSmallestToLargest', displayValue: 'Rank In Column Smallest To Largest', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.RankInColumnSmallestToLargest' },
        { value: 'RankInRowSmallestToLargest', displayValue: 'Rank In Row Smallest To Largest', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.RankInRowSmallestToLargest' },
        { value: 'RankInColumnLargestToSmallest', displayValue: 'Rank In Column Largest To Smallest', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.RankInColumnLargestToSmallest' },
        { value: 'RankInRowLargestToSmallest', displayValue: 'Rank In Row Largest To Smallest', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.RankInRowLargestToSmallest' },
        { value: 'Index', displayValue: 'Index', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.Index' }
    ]
};
export const sortOrder = {
    propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'Sort Order', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SortOrder', defaultVal: 'Ascending', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Ascending', displayValue: 'Ascending', localizationId: 'DevExpress.XtraPivotGrid.PivotSortOrder.Ascending' }, { value: 'Descending', displayValue: 'Descending', localizationId: 'DevExpress.XtraPivotGrid.PivotSortOrder.Descending' }
    ]
};
export const sortMode = {
    propertyName: 'sortMode', modelName: '@SortMode', displayName: 'Sort Mode', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SortMode', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraPivotGrid.PivotSortMode.Default' },
        { value: 'Value', displayValue: 'Value', localizationId: 'DevExpress.XtraPivotGrid.PivotSortMode.Value' },
        { value: 'DisplayText', displayValue: 'DisplayText', localizationId: 'DevExpress.XtraPivotGrid.PivotSortMode.DisplayText' },
        { value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.XtraPivotGrid.PivotSortMode.Custom' },
        { value: 'Key', displayValue: 'Key', localizationId: 'DevExpress.XtraPivotGrid.PivotSortMode.Key' },
        { value: 'ID', displayValue: 'ID', localizationId: 'DevExpress.XtraPivotGrid.PivotSortMode.ID' },
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPivotGrid.PivotSortMode.None' }
    ]
};
export const showNewValues = { propertyName: 'showNewValues', modelName: '@ShowNewValues', displayName: 'Show New Values', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.ShowNewValues', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const runningTotal = { propertyName: 'runningTotal', modelName: '@RunningTotal', displayName: 'Running Total', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.RunningTotal', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const rowValueLineCount = { propertyName: 'rowValueLineCount', modelName: '@RowValueLineCount', displayName: 'Row Value Line Count', localizationId: 'DevExpress.XtraPivotGrid.PivotGridField.RowValueLineCount', defaultVal: 1, editor: editorTemplates.getEditor('numeric') };
export const groupIntervalNumericRange = { propertyName: 'groupIntervalNumericRange', modelName: '@GroupIntervalNumericRange', displayName: 'Group Interval Numeric Range', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.GroupIntervalNumericRange', defaultVal: 10, editor: editorTemplates.getEditor('numeric') };
export const groupInterval = {
    propertyName: 'groupInterval', modelName: '@GroupInterval', displayName: 'Group Interval', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridField.GroupInterval', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.Default' },
        { value: 'Date', displayValue: 'Date', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.Date' },
        { value: 'DateDay', displayValue: 'DateDay', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateDay' },
        { value: 'DateDayOfWeek', displayValue: 'Day Of Week', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateDayOfWeek' },
        { value: 'DateDayOfYear', displayValue: 'Day Of Year', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateDayOfYear' },
        { value: 'DateWeekOfMonth', displayValue: 'Week Of Month', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateWeekOfMonth' },
        { value: 'DateWeekOfYear', displayValue: 'Week Of Year', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateWeekOfYear' },
        { value: 'DateMonth', displayValue: 'Month', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateMonth' },
        { value: 'DateQuarter', displayValue: 'Quarter', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateQuarter' },
        { value: 'DateYear', displayValue: 'Year', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateYear' },
        { value: 'YearAge', displayValue: 'Year Age', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.YearAge' },
        { value: 'MonthAge', displayValue: 'Month Age', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.MonthAge' },
        { value: 'WeekAge', displayValue: 'Week Age', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.WeekAge' },
        { value: 'DayAge', displayValue: 'Day Age', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DayAge' },
        { value: 'Alphabetical', displayValue: 'Alphabetical', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.Alphabetical' },
        { value: 'Numeric', displayValue: 'Numeric', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.Numeric' },
        { value: 'Hour', displayValue: 'Hour', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.Hour' },
        { value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.Custom' },
        { value: 'Minute', displayValue: 'Minute', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.Minute' },
        { value: 'Second', displayValue: 'Second', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.Second' },
        { value: 'DateMonthYear', displayValue: 'Month-Year', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateMonthYear' },
        { value: 'DateQuarterYear', displayValue: 'Quarter-Year', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateQuarterYear' },
        { value: 'DateHour', displayValue: 'Date-Hour', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateHour' },
        { value: 'DateHourMinute', displayValue: 'Date-Hour-Minute', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateHourMinute' },
        { value: 'DateHourMinuteSecond', displayValue: 'Date-Hour-Minute-Second', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateHourMinuteSecond' }
    ]
};
export const grandTotalText = { propertyName: 'grandTotalText', modelName: '@GrandTotalText', displayName: 'Grand Total Text', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.GrandTotalText', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const expandedInFieldsGroup = { propertyName: 'expandedInFieldsGroup', modelName: '@ExpandedInFieldsGroup', displayName: 'Expanded In Fields Group', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.ExpandedInFieldsGroup', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const emptyValueText = { propertyName: 'emptyValueText', modelName: '@EmptyValueText', displayName: 'Empty Value Text', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.EmptyValueText', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const emptyCellText = { propertyName: 'emptyCellText', modelName: '@EmptyCellText', displayName: 'Empty Cell Text', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.EmptyCellText', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const displayFolder = { propertyName: 'displayFolder', modelName: '@DisplayFolder', displayName: 'Display Folder', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.DisplayFolder', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const columnValueLineCount = { propertyName: 'columnValueLineCount', modelName: '@ColumnValueLineCount', displayName: 'Column Value Line Count', localizationId: 'DevExpress.XtraPivotGrid.PivotGridField.ColumnValueLineCount', defaultVal: 1, editor: editorTemplates.getEditor('numeric') };
export const totalsVisibility = {
    propertyName: 'totalsVisibility', modelName: '@TotalsVisibility', displayName: 'Totals Visibility', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TotalsVisibility', defaultVal: 'AutomaticTotals', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'AutomaticTotals', displayValue: 'Automatic Totals', localizationId: 'DevExpress.XtraPivotGrid.PivotTotalsVisibility.AutomaticTotals' },
        { value: 'CustomTotals', displayValue: 'Custom Totals', localizationId: 'DevExpress.XtraPivotGrid.PivotTotalsVisibility.CustomTotals' },
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPivotGrid.PivotTotalsVisibility.None' }
    ]
};
export const useNativeFormat = { propertyName: 'useNativeFormat', modelName: '@UseNativeFormat', displayName: 'Export As Numbers To Excel', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UseNativeFormat', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: defaultBooleanValuesArray };
export const KPIGraphic = {
    propertyName: 'KPIGraphic', modelName: '@KPIGraphic', displayName: 'KPI Graphic', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.KPIGraphic', defaultVal: 'ServerDefined', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.None' },
        { value: 'ServerDefined', displayValue: 'Server Defined', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ServerDefined' },
        { value: 'Shapes', displayValue: 'Shapes', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Shapes' },
        { value: 'TrafficLights', displayValue: 'Traffic Lights', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.TrafficLights' },
        { value: 'RoadSigns', displayValue: 'Road Signs', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.RoadSigns' },
        { value: 'Gauge', displayValue: 'Gauge', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Gauge' },
        { value: 'ReversedGauge', displayValue: 'Reversed Gauge', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ReversedGauge' },
        { value: 'Thermometer', displayValue: 'Thermometer', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Thermometer' },
        { value: 'ReversedThermometer', displayValue: 'Reversed Thermometer', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ReversedThermometer' },
        { value: 'Cylinder', displayValue: 'Cylinder', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Cylinder' },
        { value: 'ReversedCylinder', displayValue: 'Reversed Cylinder', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ReversedCylinder' },
        { value: 'Faces', displayValue: 'Faces', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Faces' },
        { value: 'VarianceArrow', displayValue: 'Variance Arrow', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.VarianceArrow' },
        { value: 'StandardArrow', displayValue: 'Standard Arrow', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.StandardArrow' },
        { value: 'StatusArrow', displayValue: 'Status Arrow', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.StatusArrow' },
        { value: 'ReversedStatusArrow', displayValue: 'Reversed Status Arrow', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ReversedStatusArrow' }
    ]
};
const formatType = {
    propertyName: 'formatType', modelName: '@FormatType', displayName: 'Format Type', localizationId: 'DevExpress.Utils.FormatInfo.FormatType', defaultVal: 'None', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.Utils.FormatType.None' },
        { value: 'Numeric', displayValue: 'Numeric', localizationId: 'DevExpress.Utils.FormatType.Numeric' },
        { value: 'DateTime', displayValue: 'DateTime', localizationId: 'DevExpress.Utils.FormatType.DateTime' },
        { value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.Utils.FormatType.Custom' }
    ]
}, formatString = { propertyName: 'formatString', modelName: '@FormatString', displayName: 'Format String', localizationId: 'DevExpress.Utils.FormatInfo.FormatString', defaultVal: '', editor: designerEditorTemplates.getEditor('formatEditor') };
const formatInfo = [formatType, formatString];
export const cellFormat = { propertyName: 'cellFormat', modelName: 'CellFormat', displayName: 'Cell Format', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.CellFormat', info: formatInfo, editor: editorTemplates.getEditor('objecteditor') };
export const totalCellFormat = { propertyName: 'totalCellFormat', modelName: 'TotalCellFormat', displayName: 'Total Cell Format', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TotalCellFormat', info: formatInfo, editor: editorTemplates.getEditor('objecteditor') };
export const grandTotalCellFormat = { propertyName: 'grandTotalCellFormat', modelName: 'GrandTotalCellFormat', displayName: 'Grand Total Cell Format', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.GrandTotalCellFormat', info: formatInfo, editor: editorTemplates.getEditor('objecteditor') };
export const valueFormat = { propertyName: 'valueFormat', modelName: 'ValueFormat', displayName: 'Value Format', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.ValueFormat', info: formatInfo, editor: editorTemplates.getEditor('objecteditor') };
export const totalValueFormat = { propertyName: 'totalValueFormat', modelName: 'TotalValueFormat', displayName: 'Total Value Format', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TotalValueFormat', info: formatInfo, editor: editorTemplates.getEditor('objecteditor') };
const textHorizontalAlignment = {
    propertyName: 'textHorizontalAlignment', modelName: '@HAlignment', displayName: 'Text Horizontal Alignment', localizationId: 'DevExpress.PivotGrid.Printing.PrintTextOptions.HAlignment', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.Utils.HorzAlignment.Default' },
        { value: 'Near', displayValue: 'Near', localizationId: 'DevExpress.Utils.HorzAlignment.Near' },
        { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.Utils.HorzAlignment.Center' },
        { value: 'Far', displayValue: 'Far', localizationId: 'DevExpress.Utils.HorzAlignment.Far' }
    ]
}, textVerticalAlignment = {
    propertyName: 'textVerticalAlignment', modelName: '@VAlignment', displayName: 'Text Vertical Alignment', localizationId: 'DevExpress.PivotGrid.Printing.PrintTextOptions.VAlignment', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.Utils.VertAlignment.Default' },
        { value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.Utils.VertAlignment.Top' },
        { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.Utils.VertAlignment.Center' },
        { value: 'Bottom', displayValue: 'Bottom', localizationId: 'DevExpress.Utils.VertAlignment.Bottom' }
    ]
}, trimming = {
    propertyName: 'trimming', modelName: '@Trimming', displayName: 'Trimming', localizationId: 'DevExpress.PivotGrid.Printing.PrintTextOptions.Trimming', defaultVal: 'None', editor: editorTemplates.getEditor('combobox'),
    valuesArray: textTrimmingValues
}, appearanceWordWrap = {
    propertyName: 'wordWrap', modelName: '@WordWrap', displayName: 'Word Wrap', localizationId: 'DevExpress.PivotGrid.Printing.PrintTextOptions.WordWrap', defaultVal: 'NoWrap', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'NoWrap', displayValue: 'No Wrap', localizationId: 'DevExpress.Utils.WordWrap.NoWrap' },
        { value: 'Wrap', displayValue: 'Wrap', localizationId: 'DevExpress.Utils.WordWrap.Wrap' }
    ]
};
const textOptionsInfo = [textHorizontalAlignment, textVerticalAlignment, trimming, appearanceWordWrap], textOptions = { propertyName: 'textOptions', modelName: 'TextOptions', displayName: 'Text Options', localizationId: 'DevExpress.XtraReports.UI.XRAppearanceObject.TextOptions', info: textOptionsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const appearanceInfo = [backColor, borderColor, foreColor, font, textOptions];
const cellAppearance = { propertyName: 'cellAppearance', modelName: 'Cell', displayName: 'Cell', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.Cell', info: appearanceInfo, editor: editorTemplates.getEditor('objecteditor') }, totalCellAppearance = { propertyName: 'totalCellAppearance', modelName: 'TotalCell', displayName: 'Total Cell', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.TotalCell', info: appearanceInfo, editor: editorTemplates.getEditor('objecteditor') }, customTotalCellAppearance = { propertyName: 'customTotalCellAppearance', modelName: 'CustomTotalCell', displayName: 'Custom Total Cell', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.CustomTotalCell', info: appearanceInfo, editor: editorTemplates.getEditor('objecteditor') }, grandTotalCellAppearance = { propertyName: 'grandTotalCellAppearance', modelName: 'GrandTotalCell', displayName: 'Grand Total Cell', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.GrandTotalCell', info: appearanceInfo, editor: editorTemplates.getEditor('objecteditor') }, fieldValueAppearance = { propertyName: 'fieldValueAppearance', modelName: 'FieldValue', displayName: 'Field Value', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldValue', info: appearanceInfo, editor: editorTemplates.getEditor('objecteditor') }, fieldValueTotalAppearance = { propertyName: 'fieldValueTotalAppearance', modelName: 'FieldValueTotal', displayName: 'Field Value Total', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldValueTotal', info: appearanceInfo, editor: editorTemplates.getEditor('objecteditor') }, fieldValueGrandTotalAppearance = { propertyName: 'fieldValueGrandTotalAppearance', modelName: 'FieldValueGrandTotal', displayName: 'Field Value Grand Total', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearancesBase.FieldValueGrandTotal', info: appearanceInfo, editor: editorTemplates.getEditor('objecteditor') }, fieldHeaderAppearance = { propertyName: 'fieldHeaderAppearance', modelName: 'FieldHeader', displayName: 'Field Header', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldHeader', info: appearanceInfo, editor: editorTemplates.getEditor('objecteditor') };
export const appearancesInfo = [cellAppearance, totalCellAppearance, customTotalCellAppearance, grandTotalCellAppearance, fieldHeaderAppearance, fieldValueAppearance, fieldValueGrandTotalAppearance, fieldValueTotalAppearance];
const appearances = { propertyName: 'appearances', modelName: 'Appearance', displayName: 'Appearance', localizationId: 'DevExpress.XtraPivotGrid.PivotGridField.Appearance', info: appearancesInfo, editor: editorTemplates.getEditor('objecteditor') };
const allowRunTimeSummaryChange = { propertyName: 'allowRunTimeSummaryChange', modelName: '@AllowRunTimeSummaryChange', displayName: 'Allow Run Time Summary Change', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.AllowRunTimeSummaryChange', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool }, groupFilterMode = { propertyName: 'groupFilterMode', modelName: '@GroupFilterMode', displayName: 'Group Filter Mode', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.GroupFilterMode', defaultVal: null, editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'List', displayValue: 'List', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupFilterMode.List' }, { value: 'Tree', displayValue: 'Tree', localizationId: 'DevExpress.XtraPivotGrid.PivotGroupFilterMode.Tree' }] }, hideEmptyVariationItems = { propertyName: 'hideEmptyVariationItems', modelName: '@HideEmptyVariationItems', displayName: 'Hide Empty Variation Items', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.HideEmptyVariationItems', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool }, showCustomTotals = { propertyName: 'showCustomTotals', modelName: '@ShowCustomTotals', displayName: 'Show Custom Totals', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowCustomTotals', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool }, showGrandTotal = { propertyName: 'showGrandTotal', modelName: '@ShowGrandTotal', displayName: 'Show Grand Total', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowGrandTotal', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool }, showSummaryTypeName = { propertyName: 'showSummaryTypeName', modelName: '@ShowSummaryTypeName', displayName: 'Show Summary Type Name', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowSummaryTypeName', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool }, showTotals = { propertyName: 'showTotals', modelName: '@ShowTotals', displayName: 'Show Totals', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowTotals', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool }, showValues = { propertyName: 'showValues', modelName: '@ShowValues', displayName: 'Show Values', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowValues', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const unboundExpressionMode = {
    propertyName: 'unboundExpressionMode', modelName: '@UnboundExpressionMode', displayName: 'Unbound Expression Mode', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UnboundExpressionMode', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'UseSummaryValues', displayValue: 'Use Summary Values', localizationId: 'DevExpress.XtraPivotGrid.UnboundExpressionMode.UseSummaryValues' },
        { value: 'DataSource', displayValue: 'Data Source', localizationId: 'DevExpress.XtraPivotGrid.UnboundExpressionMode.DataSource' },
        { value: 'UseAggregateFunctions', displayValue: 'Use Aggregate Functions', localizationId: 'DevExpress.XtraPivotGrid.UnboundExpressionMode.UseAggregateFunctions' },
        { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraPivotGrid.UnboundExpressionMode.Default' }
    ]
};
const optionsInfo = [allowRunTimeSummaryChange, groupFilterMode,
    hideEmptyVariationItems, showCustomTotals, showGrandTotal, showSummaryTypeName, showTotals, showValues];
export const options = { propertyName: 'options', modelName: 'Options', displayName: 'Options', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Options', info: optionsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const sortBySummary = { propertyName: 'sortBySummaryInfo', modelName: 'SortBySummaryInfo', displayName: 'Sort By Summary Info', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SortBySummaryInfo', from: SortBySummaryInfo.from, toJsonObject: SortBySummaryInfo.toJSON, editor: editorTemplates.getEditor('objecteditor') };
export const pivotGridFieldSerializationsInfo = [
    appearances,
    allowedAreas, area, areaIndex, areaIndexEditable,
    caption, cellFormat, columnValueLineCount,
    displayFolder, emptyCellText, emptyValueText, expandedInFieldsGroup,
    fieldName, summaryType, topValueCount, topValueShowOthers,
    grandTotalCellFormat, grandTotalText, groupInterval, groupIntervalNumericRange,
    index, KPIGraphic, minWidth, width, rowValueLineCount, runningTotal,
    showNewValues, sortMode, sortOrder, summaryDisplayType,
    topValueType, totalCellFormat, totalValueFormat, totalsVisibility,
    unboundExpression, unboundExpressionMode, unboundFieldName, unboundType, useNativeFormat,
    valueFormat, options, sortBySummary
].concat(baseControlProperties);
export const popularPropertiesPivotGridField = ['area', 'areaIndexEditable', 'fieldName', 'caption', 'groupInterval', 'summaryType', 'summaryDisplayType', 'unboundType', 'unboundExpression'];
export const pivotGridFieldsSerializable = { displayName: 'Fields', localizationId: 'DevExpress.XtraReports.UI.XRPivotGrid.Fields', propertyName: 'fields', modelName: 'Fields', array: true, template: '#dxrd-collectionItemWithAccordion' };
