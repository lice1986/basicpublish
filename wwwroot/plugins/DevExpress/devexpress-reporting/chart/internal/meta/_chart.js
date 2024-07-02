﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_chart.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { limitation } from '../../../designer/internal/_settings';
import { DateTimeSummaryOptionsModel, NumericSummaryOptionsModel, QualitativeSummaryOptionsModel } from '../../components/series/_summaryOptions';
import { dateTimeSummaryOptionsSerializationInfoArray, numericSummaryOptionsSerializationInfoArray, summaryOptionsSerializationInfoArray } from '../../components/series/_summaryOptionsMetaData';
import { editorTemplates as chartEditorTemplates } from '../_editorTemplates';
import { ChartComponentModelWithText } from '../_localizableElementCollection';
import { backColor, bottom, color, defaultBooleanValues, font12, font18, font8, left, margin, name, right, tag, textColor, title, titleSerializationsInfo, top, visibility } from './_common';
import { border, colorEach } from './_series';
export const sideBySideEqualBarWidth = { propertyName: 'equalBarWidth', modelName: '@SideBySideEqualBarWidth', displayName: 'Side By Side Equal Bar Width', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool }, sideBySideBarDistanceFixed = { propertyName: 'barDistanceFixed', modelName: '@SideBySideBarDistanceFixed', defaultVal: 1 }, sideBySideBarDistance = { propertyName: 'barDistance', modelName: '@SideBySideBarDistance', defaultVal: 0.0 };
export const commonSeriesPointsSortingKeys = [{ value: 'Argument', displayValue: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesSelectionMode.Argument' }, { value: 'Value_1', displayValue: 'Value', localizationId: 'ChartStringId.WizValueLevelValue' }], bubbleSeriesPointsSortingKeys = [{ value: 'Argument', displayValue: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesSelectionMode.Argument' }, { value: 'Value_1', displayValue: 'Value', localizationId: 'ChartStringId.WizValueLevelValue' }, { value: 'Value_2', displayValue: 'Weight', localizationId: 'ChartStringId.WizValueLevelWeight' }], rangeSeriesPointsSortingKeys = [{ value: 'Argument', displayValue: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesSelectionMode.Argument' }, { value: 'Value_1', displayValue: 'Value_1', localizationId: 'ChartStringId.WizValueLevelValue_1' }, { value: 'Value_2', displayValue: 'Value_2', localizationId: 'ChartStringId.WizValueLevelValue_2' }], stockSeriesPointsSortingKeys = [{ value: 'Argument', displayValue: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesSelectionMode.Argument' }, { value: 'Value_1', displayValue: 'Low', localizationId: 'ChartStringId.WizValueLevelLow' }, { value: 'Value_2', displayValue: 'High', localizationId: 'ChartStringId.WizValueLevelHigh' }, { value: 'Value_3', displayValue: 'Open', localizationId: 'ChartStringId.WizValueLevelOpen' }, { value: 'Value_4', displayValue: 'Close', localizationId: 'ChartStringId.WizValueLevelClose' }];
const enabled = { propertyName: 'enabled', modelName: '@Enabled', displayName: 'Enabled', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool, localizationId: 'DevExpress.XtraReports.UI.EditOptions.Enabled' }, mode = {
    propertyName: 'mode', modelName: '@Mode', displayName: 'Mode', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Count', valuesArray: [{ value: 'Count', displayValue: 'Count', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, { value: 'ThresholdValue', displayValue: 'Threshold Value', localizationId: 'DevExpress.XtraCharts.TopNMode.ThresholdValue' }, { value: 'ThresholdPercent', displayValue: 'Threshold Percent', localizationId: 'DevExpress.XtraCharts.TopNOptions.ThresholdPercent' }],
    localizationId: 'DevExpress.XtraReports.UI.MultiColumn.Mode'
}, count = { propertyName: 'count', modelName: '@Count', displayName: 'Count', defaultVal: 5, editor: editorTemplates.getEditor('numeric'), localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, showOthers = { propertyName: 'showOthers', modelName: '@ShowOthers', displayName: 'Show Others', editor: editorTemplates.getEditor('bool'), from: parseBool, localizationId: 'DevExpress.XtraCharts.TopNOptions.ShowOthers' }, othersArgument = { propertyName: 'othersArgument', modelName: '@OthersArgument', displayName: 'Others Argument', editor: editorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraCharts.TopNOptions.OthersArgument' }, thresholdValue = { propertyName: 'thresholdValue', modelName: '@ThresholdValue', displayName: 'Threshold Value', editor: editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.TopNMode.ThresholdValue' }, thresholdPercent = { propertyName: 'thresholdPercent', modelName: '@ThresholdPercent', displayName: 'Threshold Percent', editor: editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.TopNOptions.ThresholdPercent' };
export const barPositionValues = [
    { value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Top' },
    { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.Center' },
    { value: 'TopInside', displayValue: 'Top Inside', localizationId: 'DevExpress.XtraCharts.BarSeriesLabelPosition.TopInside' },
    { value: 'BottomInside', displayValue: 'Bottom Inside', localizationId: 'DevExpress.XtraCharts.BarSeriesLabelPosition.BottomInside' }
];
export const piePositionValues = [
    { value: 'Inside', displayValue: 'Inside', localizationId: 'ChartStringId.WizPieSeriesLabelPositionInside' },
    { value: 'Outside', displayValue: 'Outside', localizationId: 'ChartStringId.WizPieSeriesLabelPositionOutside' },
    { value: 'Radial', displayValue: 'Radial', localizationId: 'ChartStringId.WizPieSeriesLabelPositionRadial' },
    { value: 'Tangent', displayValue: 'Tangent', localizationId: 'ChartStringId.WizPieSeriesLabelPositionTangent' },
    { value: 'TwoColumns', displayValue: 'Two Columns', localizationId: 'ChartStringId.WizPieSeriesLabelPositionTwoColumns' }
];
export const funnelPositionValues = [
    { value: 'LeftColumn', displayValue: 'Left Column', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionLeftColumn' },
    { value: 'Left', displayValue: 'Left', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionLeft' },
    { value: 'Center', displayValue: 'Center', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionCenter' },
    { value: 'Right', displayValue: 'Right', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionRight' },
    { value: 'RightColumn', displayValue: 'Right Column', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionRightColumn' }
];
export const waterfallPositionValues = [
    { value: 'Auto', displayValue: 'Auto', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesLabelPosition.Auto' },
    { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesLabelPosition.Center' },
    { value: 'InsideEnd', displayValue: 'Insid End', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesLabelPosition.InsideEnd' },
    { value: 'InsideStart', displayValue: 'Inside Start', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesLabelPosition.InsideStart' },
];
const markerVisibility = { propertyName: 'markerVisibility', modelName: '@MarkerVisibility', displayName: 'Marker Visibility', editor: editorTemplates.getEditor('combobox'), valuesArray: defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.MarkerVisibility' }, markerKind = {
    propertyName: 'kind', modelName: '@Kind', displayName: 'Kind', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Square', displayValue: 'Square', localizationId: 'DevExpress.XtraCharts.MarkerKind.Square' }, { value: 'Diamond', displayValue: 'Diamond', localizationId: 'DevExpress.XtraCharts.MarkerKind.Diamond' }, { value: 'Triangle', displayValue: 'Triangle', localizationId: 'DevExpress.XtraCharts.MarkerKind.Triangle' }, { value: 'InvertedTriangle', displayValue: 'Inverted Triangle', localizationId: 'DevExpress.XtraCharts.MarkerKind.InvertedTriangle' }, { value: 'Circle', displayValue: 'Circle', localizationId: 'DevExpress.XtraCharts.CircleEasingFunction' }, { value: 'Plus', displayValue: 'Plus', localizationId: 'DevExpress.XtraCharts.MarkerKind.Plus' }, { value: 'Cross', displayValue: 'Cross', localizationId: 'DevExpress.XtraCharts.MarkerKind.Cross' }, { value: 'Star', displayValue: 'Star', localizationId: 'DevExpress.XtraCharts.MarkerKind.Star' }, { value: 'Pentagon', displayValue: 'Pentagon', localizationId: 'DevExpress.XtraCharts.MarkerKind.Pentagon' }, { value: 'Hexagon', displayValue: 'Hexagon', localizationId: 'DevExpress.XtraCharts.MarkerKind.Hexagon' }],
    localizationId: 'DevExpress.XtraCharts.MarkerBase.Kind'
}, borderVisible = { propertyName: 'borderVisible', modelName: '@BorderVisible', displayName: 'Border Visible', editor: editorTemplates.getEditor('bool'), from: parseBool, localizationId: 'DevExpress.XtraCharts.MarkerBase.BorderVisible' };
const direction = {
    propertyName: 'direction', modelName: '@Direction', displayName: 'Direction', defaultVal: 'TopToBottom', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'TopToBottom', displayValue: 'Top To Bottom', localizationId: 'DevExpress.XtraCharts.TextOrientation.TopToBottom' }, { value: 'BottomToTop', displayValue: 'Bottom To Top', localizationId: 'DevExpress.XtraCharts.TextOrientation.BottomToTop' }, { value: 'LeftToRight', displayValue: 'Left To Right' }, { value: 'RightToLeft', displayValue: 'Right To Left' }],
    localizationId: 'DevExpress.XtraReports.UI.MultiColumn.Direction'
}, alignmentVertical = {
    propertyName: 'alignmentVertical', modelName: '@AlignmentVertical', displayName: 'Vertical Alignment', defaultVal: 'Top', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Top' }, { value: 'TopOutside', displayValue: 'Top Outside', localizationId: 'DevExpress.XtraCharts.LegendAlignmentVertical.TopOutside' }, { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.Center' }, { value: 'Bottom', displayValue: 'Bottom', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Bottom' }, { value: 'BottomOutside', displayValue: 'Bottom Outside', localizationId: 'DevExpress.XtraCharts.LegendAlignmentVertical.BottomOutside' }],
    localizationId: 'DevExpress.XtraCharts.Legend.AlignmentVertical'
}, alignmentHorizontal = {
    propertyName: 'alignmentHorizontal', modelName: '@AlignmentHorizontal', displayName: 'Horizontal Alignment', defaultVal: 'RightOutside', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Left', displayValue: 'Left', localizationId: 'DevExpress.XtraReports.UI.XRControl.Left' }, { value: 'LeftOutside', displayValue: 'Left Outside', localizationId: 'DevExpress.XtraCharts.LegendAlignmentHorizontal.LeftOutside' }, { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.Center' }, { value: 'Right', displayValue: 'Right', localizationId: 'DevExpress.XtraCharts.RectangleIndents.Right' }, { value: 'RightOutside', displayValue: 'Right Outside', localizationId: 'DevExpress.XtraCharts.LegendAlignmentHorizontal.RightOutside' }],
    localizationId: 'DevExpress.XtraCharts.Legend.AlignmentHorizontal'
};
export const padding = { propertyName: 'chartPadding', modelName: 'Padding', displayName: 'Padding', info: [left, right, top, bottom], editor: editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XRBarCode.PaddingInfo' };
export const lineMarkerOptionsSerializationsInfo = [color, colorEach, markerVisibility], lineMarker = { propertyName: 'lineMarker', modelName: 'LineMarker', displayName: 'Line Marker', info: lineMarkerOptionsSerializationsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const topNOptionsSerializationsInfo = [enabled, mode, count, thresholdPercent, thresholdValue, showOthers, othersArgument], topNOptions = { propertyName: 'topNOptions', modelName: 'TopNOptions', displayName: 'Top N Options', info: topNOptionsSerializationsInfo, defaultVal: {}, editor: editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraCharts.SeriesBase.TopNOptions' };
export const autoBindingSettingsEnabled = { propertyName: 'autoBindingSettingsEnabled', modelName: '@AutoBindingSettingsEnabled', displayName: 'Auto Binding Settings Enabled', localizationId: 'DevExpress.XtraCharts.PivotGridDataSourceOptions.AutoBindingSettingsEnabled', defaultVal: true, editor: editorTemplates.getEditor('bool') }, autoLayoutSettingsEnabled = { propertyName: 'autoLayoutSettingsEnabled', modelName: '@AutoLayoutSettingsEnabled', displayName: 'Auto Layout Settings Enabled', localizationId: 'DevExpress.XtraCharts.PivotGridDataSourceOptions.AutoLayoutSettingsEnabled', defaultVal: true, editor: editorTemplates.getEditor('bool') };
export const pivotGridDataSourceOptions = { propertyName: 'pivotGridDataSourceOptions', modelName: 'PivotGridDataSourceOptions', displayName: 'Pivot Grid Data Source Options', localizationId: 'DevExpress.XtraReports.UI.XRChart.PivotGridDataSourceOptions', info: [autoBindingSettingsEnabled, autoLayoutSettingsEnabled], editor: editorTemplates.getEditor('objecteditor') };
export const dataFiltersConjunctionMode = {
    modelName: '@DataFiltersConjunctionMode', defaultVal: 'And', displayName: 'Conjunction Mode', propertyName: 'dataFiltersConjunctionMode', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [{ value: 'And', displayValue: 'And', localizationId: 'DevExpress.XtraCharts.ConjunctionTypes.And' }, { value: 'Or', displayValue: 'Or', localizationId: 'DevExpress.XtraCharts.ConjunctionTypes.Or' }],
    localizationId: 'DevExpress.XtraCharts.DataFilterCollection.ConjunctionMode'
};
export const colorDataMember = { propertyName: 'colorDataMember', displayName: 'Color Data Member', defaultVal: '', modelName: '@ColorDataMember', editor: ko.bindingHandlers['displayNameExtender'] ? editorTemplates.getEditor('field') : chartEditorTemplates.getEditor('fieldChart'), localizationId: 'DevExpress.XtraCharts.SeriesBase.ColorDataMember' };
export const points = {
    propertyName: 'points', modelName: 'Points', displayName: 'Points', localizationId: 'DevExpress.XtraCharts.Series.Points',
    editor: chartEditorTemplates.getEditor('points'), array: true
};
export const createViewsArray = function (limitation) {
    const array = [];
    array.push({ value: 'SideBySideBarSeriesView', displayValue: 'Bar', localizationId: 'DevExpress.Sparkline.SparklineViewType.Bar' });
    array.push({ value: 'StackedBarSeriesView', displayValue: 'Bar Stacked', localizationId: 'ChartStringId.SvnStackedBar' });
    array.push({ value: 'FullStackedBarSeriesView', displayValue: 'Bar Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedBar' });
    array.push({ value: 'SideBySideStackedBarSeriesView', displayValue: 'Side By Side Bar Stacked', localizationId: 'ChartStringId.SvnSideBySideStackedBar' });
    array.push({ value: 'SideBySideFullStackedBarSeriesView', displayValue: 'Side By Side Bar Stacked 100%', localizationId: 'ChartStringId.SvnSideBySideFullStackedBar' });
    array.push({ value: 'WaterfallSeriesView', displayValue: 'Waterfall', localizationId: 'ChartStringId.SvnWaterfall' });
    if (!limitation) {
        array.push({ value: 'SideBySideBar3DSeriesView', displayValue: 'Bar 3D', localizationId: 'ChartStringId.SvnSideBySideBar3D' });
        array.push({ value: 'StackedBar3DSeriesView', displayValue: 'Bar 3D Stacked', localizationId: 'ChartStringId.SvnStackedBar3D' });
        array.push({ value: 'FullStackedBar3DSeriesView', displayValue: 'Bar 3D Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedBar3D' });
        array.push({ value: 'SideBySideStackedBar3DSeriesView', displayValue: 'Side By Side Bar 3D Stacked ' });
        array.push({ value: 'SideBySideFullStackedBar3DSeriesView', displayValue: 'Side By Side Bar 3D Stacked 100%', localizationId: 'ChartStringId.SvnSideBySideFullStackedBar3D' });
        array.push({ value: 'ManhattanBarSeriesView', displayValue: 'Manhattan Bar', localizationId: 'ChartStringId.SvnManhattanBar' });
    }
    array.push({ value: 'PointSeriesView', displayValue: 'Point', localizationId: 'ASPxReportsStringId.ReportDesigner_FontOptions_Unit_Point' });
    array.push({ value: 'BubbleSeriesView', displayValue: 'Bubble', localizationId: 'ChartStringId.SvnBubble' });
    array.push({ value: 'LineSeriesView', displayValue: 'Line', localizationId: 'DevExpress.XtraReports.UI.XRLine' });
    array.push({ value: 'StackedLineSeriesView', displayValue: 'Line Stacked', localizationId: 'ChartStringId.SvnStackedLine' });
    array.push({ value: 'FullStackedLineSeriesView', displayValue: 'Line Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedLine' });
    array.push({ value: 'StepLineSeriesView', displayValue: 'Step Line', localizationId: 'ChartStringId.SvnStepLine' });
    array.push({ value: 'SplineSeriesView', displayValue: 'Spline', localizationId: 'ChartStringId.SvnSpline' });
    array.push({ value: 'ScatterLineSeriesView', displayValue: 'Scatter Line', localizationId: 'ChartStringId.CmdCreateScatterLineChartMenuCaption' });
    array.push({ value: 'SwiftPlotSeriesView', displayValue: 'Swift Plot', localizationId: 'ChartStringId.SvnSwiftPlot' });
    if (!limitation) {
        array.push({ value: 'Line3DSeriesView', displayValue: 'Line 3D', localizationId: 'ChartStringId.SvnLine3D' });
        array.push({ value: 'StackedLine3DSeriesView', displayValue: 'Line 3D Stacked', localizationId: 'ChartStringId.SvnStackedLine3D' });
        array.push({ value: 'FullStackedLine3DSeriesView', displayValue: 'Line 3D Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedLine3D' });
        array.push({ value: 'StepLine3DSeriesView', displayValue: 'Step Line 3D', localizationId: 'ChartStringId.SvnStepLine3D' });
        array.push({ value: 'Spline3DSeriesView', displayValue: 'Spline 3D', localizationId: 'ChartStringId.SvnSpline3D' });
    }
    array.push({ value: 'PieSeriesView', displayValue: 'Pie', localizationId: 'ChartStringId.CmdCreatePieChartMenuCaption' });
    array.push({ value: 'DoughnutSeriesView', displayValue: 'Doughnut', localizationId: 'ChartStringId.CmdCreateDoughnutChartMenuCaption' });
    array.push({ value: 'NestedDoughnutSeriesView', displayValue: 'Nested Doughnut', localizationId: 'ChartStringId.CmdCreateNestedDoughnutChartMenuCaption' });
    if (!limitation) {
        array.push({ value: 'Pie3DSeriesView', displayValue: 'Pie 3D', localizationId: 'ChartStringId.SvnPie3D' });
        array.push({ value: 'Doughnut3DSeriesView', displayValue: 'Doughnut 3D', localizationId: 'ChartStringId.SvnDoughnut3D' });
    }
    array.push({ value: 'FunnelSeriesView', displayValue: 'Funnel', localizationId: 'ChartStringId.SvnFunnel' });
    if (!limitation) {
        array.push({ value: 'Funnel3DSeriesView', displayValue: 'Funnel 3D', localizationId: 'ChartStringId.SvnFunnel3D' });
    }
    array.push({ value: 'AreaSeriesView', displayValue: 'Area', localizationId: 'DevExpress.XtraPivotGrid.PivotGridOptionsDataField.Area' });
    array.push({ value: 'StackedAreaSeriesView', displayValue: 'Area Stacked', localizationId: 'ChartStringId.SvnStackedArea' });
    array.push({ value: 'FullStackedAreaSeriesView', displayValue: 'Area Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedArea' });
    array.push({ value: 'StepAreaSeriesView', displayValue: 'Step Area', localizationId: 'ChartStringId.SvnStepArea' });
    array.push({ value: 'SplineAreaSeriesView', displayValue: 'Spline Area', localizationId: 'ChartStringId.SvnSplineArea' });
    array.push({ value: 'StackedSplineAreaSeriesView', displayValue: 'Spline Area Stacked', localizationId: 'ChartStringId.SvnSplineStackedArea' });
    array.push({ value: 'FullStackedSplineAreaSeriesView', displayValue: 'Spline Area Stacked 100%', localizationId: 'ChartStringId.SvnSplineFullStackedArea' });
    if (!limitation) {
        array.push({ value: 'Area3DSeriesView', displayValue: 'Area 3D', localizationId: 'ChartStringId.SvnArea3D' });
        array.push({ value: 'StackedArea3DSeriesView', displayValue: 'Area 3D Stacked', localizationId: 'ChartStringId.SvnStackedArea3D' });
        array.push({ value: 'FullStackedArea3DSeriesView', displayValue: 'Area 3D Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedArea3D' });
        array.push({ value: 'StepArea3DSeriesView', displayValue: 'Step 3D Area' });
        array.push({ value: 'SplineArea3DSeriesView', displayValue: 'Spline 3D Area' });
        array.push({ value: 'StackedSplineArea3DSeriesView', displayValue: 'Spline Area 3D Stacked', localizationId: 'ChartStringId.SvnSplineAreaStacked3D' });
        array.push({ value: 'FullStackedSplineArea3DSeriesView', displayValue: 'Spline Area 3D Stacked 100%', localizationId: 'ChartStringId.SvnSplineAreaFullStacked3D' });
    }
    array.push({ value: 'OverlappedRangeBarSeriesView', displayValue: 'Range Bar', localizationId: 'ChartStringId.SvnOverlappedRangeBar' });
    array.push({ value: 'SideBySideRangeBarSeriesView', displayValue: 'Side By Side Range Bar', localizationId: 'ChartStringId.SvnSideBySideRangeBar' });
    array.push({ value: 'RangeAreaSeriesView', displayValue: 'Range Area', localizationId: 'ChartStringId.SvnRangeArea' });
    if (!limitation) {
        array.push({ value: 'RangeArea3DSeriesView', displayValue: 'Range Area 3D', localizationId: 'ChartStringId.SvnRangeArea3D' });
    }
    array.push({ value: 'RadarPointSeriesView', displayValue: 'Radar Point', localizationId: 'ChartStringId.SvnRadarPoint' });
    array.push({ value: 'RadarLineSeriesView', displayValue: 'Radar Line', localizationId: 'ChartStringId.SvnRadarLine' });
    array.push({ value: 'RadarAreaSeriesView', displayValue: 'Radar Area', localizationId: 'ChartStringId.CmdCreateRadarAreaChartMenuCaption' });
    array.push({ value: 'PolarPointSeriesView', displayValue: 'Polar Point', localizationId: 'ChartStringId.SvnPolarPoint' });
    array.push({ value: 'PolarLineSeriesView', displayValue: 'Polar Line', localizationId: 'ChartStringId.CmdCreatePolarLineChartMenuCaption' });
    array.push({ value: 'PolarAreaSeriesView', displayValue: 'Polar Area', localizationId: 'ChartStringId.SvnPolarArea' });
    array.push({ value: 'StockSeriesView', displayValue: 'Stock Series' });
    array.push({ value: 'CandleStickSeriesView', displayValue: 'Candle Stick', localizationId: 'ChartStringId.CmdCreateCandleStickChartMenuCaption' });
    array.push({ value: 'OverlappedGanttSeriesView', displayValue: 'Gantt', localizationId: 'ChartStringId.CmdGanttGroupPlaceHolderMenuCaption' });
    array.push({ value: 'SideBySideGanttSeriesView', displayValue: 'Side By Side Gantt', localizationId: 'ChartStringId.SvnSideBySideGantt' });
    return array;
};
export const viewBindableSerializationInfo = {
    propertyName: 'viewBindable', displayName: 'View', editor: chartEditorTemplates.getEditor('views'), valuesArray: createViewsArray(limitation()),
    localizationId: 'DevExpress.XtraReports.UI.XRSparkline.View'
};
export const qualitativeSummaryOptions = { propertyName: 'qualitativeSummaryOptions', modelName: 'QualitativeSummaryOptions', displayName: 'Qualitative Summary Options', localizationId: 'DevExpress.XtraCharts.SeriesBase.QualitativeSummaryOptions', info: summaryOptionsSerializationInfoArray, from: QualitativeSummaryOptionsModel.from, toJsonObject: QualitativeSummaryOptionsModel.toJson, editor: editorTemplates.getEditor('objecteditor') };
export const numericSummaryOptions = { propertyName: 'numericSummaryOptions', modelName: 'NumericSummaryOptions', displayName: 'Numeric Summary Options', localizationId: 'DevExpress.XtraCharts.SeriesBase.NumericSummaryOptions', info: numericSummaryOptionsSerializationInfoArray, from: NumericSummaryOptionsModel.from, toJsonObject: NumericSummaryOptionsModel.toJson, editor: editorTemplates.getEditor('objecteditor') };
export const dateTimeSumaryOptions = { propertyName: 'dateTimeSummaryOptions', modelName: 'DateTimeSummaryOptions', displayName: 'Date-Time Summary Options', localizationId: 'DevExpress.XtraCharts.SeriesBase.DateTimeSummaryOptions', info: dateTimeSummaryOptionsSerializationInfoArray, from: DateTimeSummaryOptionsModel.from, toJsonObject: DateTimeSummaryOptionsModel.toJson, editor: editorTemplates.getEditor('objecteditor') };
export const seriesSerializable = { propertyName: 'series', modelName: 'SeriesSerializable', displayName: 'Series', array: true, editor: chartEditorTemplates.getEditor('collection'), localizationId: 'DevExpress.XtraReports.UI.XRChart.Series' };
export const seriesDataMember = { propertyName: 'seriesDataMember', modelName: '@SeriesDataMember', displayName: 'Series Data Member', editor: ko.bindingHandlers['displayNameExtender'] ? editorTemplates.getEditor('field') : chartEditorTemplates.getEditor('fieldChart'), localizationId: 'DevExpress.XtraReports.UI.XRChart.SeriesDataMember' };
const textArea = { propertyName: 'text', modelName: '@Text', displayName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRControl.Text', localizable: true, defaultVal: '', editor: editorTemplates.getEditor('stringArray') };
export const enableAntialiasing = { propertyName: 'enableAntialiasing', modelName: '@EnableAntialiasing', displayName: 'Enable Antialiasing', editor: editorTemplates.getEditor('combobox'), valuesArray: defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.TitleBase.EnableAntialiasing', defaultVal: 'Default' };
export const emptyChartTextSerializationsInfo = [textArea, font12, textColor, enableAntialiasing, tag];
export const emptyChartText = { propertyName: 'emptyChartText', modelName: 'EmptyChartText', displayName: 'Empty Chart Text', info: emptyChartTextSerializationsInfo, editor: editorTemplates.getEditor('objecteditor'), type: ChartComponentModelWithText };
export const smallChartText = { propertyName: 'smallChartText', modelName: 'SmallChartText', displayName: 'Small Chart Text', info: emptyChartTextSerializationsInfo, editor: editorTemplates.getEditor('objecteditor'), type: ChartComponentModelWithText };
export const titles = { propertyName: 'titles', modelName: 'Titles', displayName: 'Titles', localizationId: 'DevExpress.XtraReports.UI.XRChart.Titles', array: true, editor: chartEditorTemplates.getEditor('collection') };
const markerMode = {
    propertyName: 'markerMode', modelName: '@MarkerMode', displayName: 'Marker Mode', localizationId: 'DevExpress.XtraCharts.Legend.MarkerMode', defaultVal: 'Marker', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Marker', displayValue: getLocalization('Marker', 'DevExpress.XtraCharts.LegendMarkerMode.Marker') }, { value: 'CheckBox', displayValue: getLocalization('Check Box', 'DevExpress.XtraCharts.LegendMarkerMode.CheckBox') }, { value: 'CheckBoxAndMarker', displayValue: getLocalization('Check Box and Marker', 'DevExpress.XtraCharts.LegendMarkerMode.CheckBoxAndMarker') }, { value: 'MarkerAndCheckBox', displayValue: getLocalization('Marker and Check Box', 'DevExpress.XtraCharts.LegendMarkerMode.MarkerAndCheckBox') }, { value: 'None', displayValue: getLocalization('None', 'DevExpress.XtraCharts.LegendMarkerMode.None') }]
}, markerOffset = { propertyName: 'markerOffset', modelName: '@MarkerOffset', displayName: 'Marker Offset', localizationId: 'DevExpress.XtraCharts.Legend.MarkerOffset', defaultVal: 2, editor: editorTemplates.getEditor('numeric') };
const legendTitleSerializationsInfo = [font18, margin, tag, visibility].concat(titleSerializationsInfo);
const legendTitle = extend(true, {}, title, { info: legendTitleSerializationsInfo });
export const legendSerializationsInfo = [textColor, backColor, direction, alignmentVertical, alignmentHorizontal, visibility, markerMode, markerOffset, legendTitle, border, margin, padding, font8];
export const additionalLegendSerializationsInfo = [name].concat(legendSerializationsInfo);
export const legends = { propertyName: 'legends', modelName: 'Legends', displayName: 'Legends', localizationId: 'DevExpress.XtraReports.UI.XRChart.Legends', array: true, editor: chartEditorTemplates.getEditor('collection') };
export const appearanceName = {
    propertyName: 'appearanceName', modelName: '@AppearanceNameSerializable', displayName: 'Appearance Name', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Nature Colors', displayValue: 'Nature Colors', localizationId: 'ChartStringId.AppNatureColors' }, { value: 'Pastel Kit', displayValue: 'Pastel Kit', localizationId: 'ChartStringId.AppPastelKit' }, { value: 'In A Fog', displayValue: 'In A Fog', localizationId: 'ChartStringId.AppInAFog' }, { value: 'Terracotta Pie', displayValue: 'Terracotta Pie', localizationId: 'ChartStringId.PltTerracottaPie' }, { value: 'Northern Lights', displayValue: 'Northern Lights', localizationId: 'ChartStringId.PltNorthernLights' }, { value: 'Chameleon', displayValue: 'Chameleon', localizationId: 'ChartStringId.AppChameleon' }, { value: 'The Trees', displayValue: 'The Trees', localizationId: 'ChartStringId.PltTheTrees' }, { value: 'Light', displayValue: 'Light', localizationId: 'ChartStringId.AppLight' }, { value: 'Gray', displayValue: 'Gray', localizationId: 'ChartStringId.AppGray' }, { value: 'Dark', displayValue: 'Dark', localizationId: 'ChartStringId.AppDark' }, { value: 'Dark Flat', displayValue: 'Dark Flat', localizationId: 'ChartStringId.AppDarkFlat' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }],
    localizationId: 'DevExpress.XtraReports.UI.XRChart.AppearanceName'
};
export const paletteName = {
    propertyName: 'paletteName', modelName: '@PaletteName', displayName: 'Palette Name', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }, { value: 'Nature Colors', displayValue: 'Nature Colors', localizationId: 'ChartStringId.AppNatureColors' }, { value: 'Pastel Kit', displayValue: 'Pastel Kit', localizationId: 'ChartStringId.AppPastelKit' }, { value: 'In A Fog', displayValue: 'In A Fog', localizationId: 'ChartStringId.AppInAFog' }, { value: 'Terracotta Pie', displayValue: 'Terracotta Pie', localizationId: 'ChartStringId.PltTerracottaPie' }, { value: 'Northern Lights', displayValue: 'Northern Lights', localizationId: 'ChartStringId.PltNorthernLights' }, { value: 'Chameleon', displayValue: 'Chameleon', localizationId: 'ChartStringId.AppChameleon' }, { value: 'The Trees', displayValue: 'The Trees', localizationId: 'ChartStringId.PltTheTrees' }, { value: 'Mixed', displayValue: 'Mixed', localizationId: 'ChartStringId.PltMixed' }, { value: 'Office', displayValue: 'Office', localizationId: 'ChartStringId.PltOffice' }, { value: 'Black and White', displayValue: 'Black and White', localizationId: 'ChartStringId.PltBlackAndWhite' }, { value: 'Grayscale', displayValue: 'Grayscale', localizationId: 'ChartStringId.PltGrayscale' }, { value: 'Apex', displayValue: 'Apex', localizationId: 'ChartStringId.PltApex' }, { value: 'Aspect', displayValue: 'Aspect', localizationId: 'ChartStringId.PltAspect' }, { value: 'Civic', displayValue: 'Civic', localizationId: 'ChartStringId.PltCivic' }, { value: 'Concourse', displayValue: 'Concourse', localizationId: 'ChartStringId.PltConcourse' }, { value: 'Equity', displayValue: 'Equity', localizationId: 'ChartStringId.PltEquity' }, { value: 'Flow', displayValue: 'Flow', localizationId: 'ChartStringId.PltFlow' }, { value: 'Foundry', displayValue: 'Foundry', localizationId: 'ChartStringId.PltFoundry' }, { value: 'Median', displayValue: 'Median', localizationId: 'DevExpress.XtraReports.UI.SortingSummaryFunction.Median' }, { value: 'Metro', displayValue: 'Metro', localizationId: 'ChartStringId.PltMetro' }, { value: 'Module', displayValue: 'Module', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.Module' }, { value: 'Opulent', displayValue: 'Opulent', localizationId: 'ChartStringId.PltOpulent' }, { value: 'Oriel', displayValue: 'Oriel', localizationId: 'ChartStringId.PltOriel' }, { value: 'Origin', displayValue: 'Origin', localizationId: 'ChartStringId.PltOrigin' }, { value: 'Paper', displayValue: 'Paper', localizationId: 'ChartStringId.PltPaper' }, { value: 'Solstice', displayValue: 'Solstice', localizationId: 'ChartStringId.PltSolstice' }, { value: 'Technic', displayValue: 'Technic', localizationId: 'ChartStringId.PltTechnic' }, { value: 'Trek', displayValue: 'Trek', localizationId: 'ChartStringId.PltTrek' }, { value: 'Urban', displayValue: 'Urban', localizationId: 'ChartStringId.PltUrban' }, { value: 'Verve', displayValue: 'Verve', localizationId: 'ChartStringId.PltVerve' }, { value: 'Office 2013', displayValue: 'Office 2013', localizationId: 'ChartStringId.PltOffice2013' }, { value: 'Blue Warm', displayValue: 'Blue Warm', localizationId: 'ChartStringId.PltBlueWarm' }, { value: 'Blue', displayValue: 'Blue', localizationId: 'ChartStringId.PltBlue' }, { value: 'Blue II', displayValue: 'Blue II', localizationId: 'ChartStringId.PltBlueII' }, { value: 'Blue Green', displayValue: 'Blue Green', localizationId: 'ChartStringId.PltBlueGreen' }, { value: 'Green', displayValue: 'Green', localizationId: 'ChartStringId.PltGreen' }, { value: 'Green Yellow', displayValue: 'Green Yellow', localizationId: 'ChartStringId.PltGreenYellow' }, { value: 'Yellow', displayValue: 'Yellow', localizationId: 'ChartStringId.PltYellow' }, { value: 'Yellow Orange', displayValue: 'Yellow Orange', localizationId: 'ChartStringId.PltYellowOrange' }, { value: 'Orange', displayValue: 'Orange', localizationId: 'ChartStringId.PltOrange' }, { value: 'Orange Red', displayValue: 'Orange Red', localizationId: 'ChartStringId.PltOrangeRed' }, { value: 'Red Orange', displayValue: 'Red Orange', localizationId: 'ChartStringId.PltRedOrange' }, { value: 'Red', displayValue: 'Red', localizationId: 'ChartStringId.PltRed' }, { value: 'Red Violet', displayValue: 'Red Violet', localizationId: 'ChartStringId.PltRedViolet' }, { value: 'Violet', displayValue: 'Violet', localizationId: 'ChartStringId.PltViolet' }, { value: 'Violet II', displayValue: 'Violet II', localizationId: 'ChartStringId.PltVioletII' }, { value: 'Marquee', displayValue: 'Marquee', localizationId: 'ChartStringId.PltMarquee' }, { value: 'Slipstream', displayValue: 'Slipstream', localizationId: 'ChartStringId.PltSlipstream' }],
    localizationId: 'DevExpress.XtraReports.UI.XRChart.PaletteName'
};
export const backImage = {
    propertyName: 'backImage', modelName: 'BackImage', displayName: 'Background Image', localizationId: 'DevExpress.XtraCharts.BackgroundImage', editor: editorTemplates.getEditor('objecteditor'), info: [
        { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', localizationId: 'DevExpress.XtraCharts.ChartElement.Tag', editor: editorTemplates.getEditor('text') },
        { propertyName: 'stretch', modelName: '@Stretch', displayName: 'Stretch', localizationId: 'DevExpress.XtraCharts.BackgroundImage.Stretch', editor: editorTemplates.getEditor('bool'), defaultVal: 'false', from: parseBool },
        { propertyName: 'image', modelName: '@Image', displayName: 'Image', localizationId: 'DevExpress.XtraCharts.ChartImage.Image', editor: editorTemplates.getEditor('image') }
    ]
};
