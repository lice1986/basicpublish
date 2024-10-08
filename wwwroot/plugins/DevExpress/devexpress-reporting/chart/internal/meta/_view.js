﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_view.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { colorFromString, colorToString, getLocalization, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { ChartViewTitleModel, TitleViewModel } from '../../components/models/_title';
import { FillStyle, fillStyleInfo } from '../../components/series/_fillStyle';
import { Indicator } from '../../components/series/_indicator';
import { deserializeModelArray } from '../../_utils';
import { editorTemplates as chartEditorTemplates } from '../_editorTemplates';
import { backColor, font12, maxLineCount, maxWidth, tag, textAlignment, textColor, textPattern } from './_common';
import { fillStyleOptionsSerialize } from './_series';
export const paneName = { propertyName: 'paneName', modelName: '@PaneName', displayName: 'Pane', localizationId: 'DevExpress.XtraCharts.XYDiagramPane', defaultVal: getLocalization('Default Pane', 'ChartStringId.DefaultPaneName'), editor: chartEditorTemplates.getEditor('panes') };
export const axisXName = { propertyName: 'axisXName', modelName: '@AxisXName', displayName: 'AxisX', localizationId: 'DevExpress.XtraCharts.GanttAxisX', defaultVal: getLocalization('Primary AxisX', 'ChartStringId.PrimaryAxisXName'), editor: chartEditorTemplates.getEditor('axisX') };
export const axisYName = { propertyName: 'axisYName', modelName: '@AxisYName', displayName: 'AxisY', localizationId: 'DevExpress.XtraCharts.SeparatePaneIndicator.AxisY', defaultVal: getLocalization('Primary AxisY', 'ChartStringId.PrimaryAxisYName'), editor: chartEditorTemplates.getEditor('axisY') };
const arrowWidthValidationRules = [{
        type: 'custom',
        validationCallback: (options) => {
            return options.value % 2 !== 0;
        },
        get message() {
            return getLocalization('The arrow width should be always odd and greater than 0', 'ChartStringId.MsgIncorrectArrowWidth');
        }
    }];
const invertedStep = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.FullStackedStepAreaSeriesView.InvertedStep', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const viewFillStyle = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.FillStyle', editor: editorTemplates.getEditor('objecteditor'), from: FillStyle.from(fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: FillStyle.toJson };
const transparency = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.Transparency', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const viewEnableAntialiasing = {
    propertyName: 'enableAntialiasing', modelName: '@EnableAntialiasing', displayName: 'Enable Antialiasing', localizationId: 'DevExpress.XtraCharts.LineSeriesView.EnableAntialiasing', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const size = { propertyName: 'size', modelName: '@Size', displayName: 'Size', localizationId: 'DevExpress.XtraCharts.Shadow.Size', editor: editorTemplates.getEditor('numeric'), defaultVal: 2, editorOptions: { min: 1 } };
const viewColor = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.Shadow.Color', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: '79,0,0,0' };
const viewVisible = { propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraCharts.Shadow.Visible', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const shadowInfo = [size, viewColor, viewVisible, tag];
const shadow = { propertyName: 'shadow', modelName: 'Shadow', displayName: 'Shadow', localizationId: 'DevExpress.XtraCharts.XYDiagramSeriesViewBase.Shadow', editor: editorTemplates.getEditor('objecteditor'), info: shadowInfo, };
const viewAggregateFunction = {
    propertyName: 'aggregateFunction', modelName: '@AggregateFunction', displayName: 'Aggregate Function', localizationId: 'DevExpress.XtraCharts.XYDiagram2DSeriesViewBase.AggregateFunction', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Average', displayValue: 'Average', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Average' }, { value: 'Minimum', displayValue: 'Minimum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum' }, { value: 'Maximum', displayValue: 'Maximum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum' }, { value: 'Sum', displayValue: 'Sum', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Sum' }, { value: 'Count', displayValue: 'Count', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, { value: 'Financial', displayValue: 'Financial', localizationId: 'DevExpress.XtraCharts.SeriesAggregateFunction.Financial' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const indicators = {
    propertyName: 'indicators',
    modelName: 'Indicators',
    displayName: 'Indicators',
    localizationId: 'DevExpress.XtraCharts.XYDiagram2DSeriesViewBase.Indicators',
    array: true,
    from(model, serializer) {
        return deserializeModelArray(model, (indicator, parent) => { return new Indicator(indicator, parent, serializer); }, Indicator.prefix);
    }
};
const color1 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.SeriesViewBase.Color', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
const fullStackedStepAreaSeriesViewinfo = [invertedStep, viewFillStyle, transparency, viewEnableAntialiasing, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const viewColor2 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.Marker.Color', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
const size1 = { propertyName: 'size', modelName: '@Size', displayName: 'Size', localizationId: 'DevExpress.XtraCharts.SimpleMarker.Size', editor: editorTemplates.getEditor('numeric'), defaultVal: 10, editorOptions: { min: 1 } };
const kind = {
    propertyName: 'kind', modelName: '@Kind', displayName: 'Kind', localizationId: 'DevExpress.XtraCharts.MarkerBase.Kind', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Square', displayValue: 'Square', localizationId: 'DevExpress.XtraCharts.MarkerKind.Square' }, { value: 'Diamond', displayValue: 'Diamond', localizationId: 'DevExpress.XtraCharts.MarkerKind.Diamond' }, { value: 'Triangle', displayValue: 'Triangle', localizationId: 'DevExpress.XtraCharts.MarkerKind.Triangle' }, { value: 'InvertedTriangle', displayValue: 'InvertedTriangle' }, { value: 'Circle', displayValue: 'Circle', localizationId: 'DevExpress.XtraCharts.CircleEasingFunction' }, { value: 'Plus', displayValue: 'Plus', localizationId: 'DevExpress.XtraCharts.MarkerKind.Plus' }, { value: 'Cross', displayValue: 'Cross', localizationId: 'DevExpress.XtraCharts.MarkerKind.Cross' }, { value: 'Star', displayValue: 'Star', localizationId: 'DevExpress.XtraCharts.MarkerKind.Star' }, { value: 'Pentagon', displayValue: 'Pentagon', localizationId: 'DevExpress.XtraCharts.MarkerKind.Pentagon' }, { value: 'Hexagon', displayValue: 'Hexagon', localizationId: 'DevExpress.XtraCharts.MarkerKind.Hexagon' }], defaultVal: 'Circle'
};
const starPointCount = { propertyName: 'starPointCount', modelName: '@StarPointCount', displayName: 'Star Point Count', localizationId: 'DevExpress.XtraCharts.MarkerBase.StarPointCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 5, editorOptions: { min: 3, max: 100 } };
const fillStyle1 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.MarkerBase.FillStyle', editor: editorTemplates.getEditor('objecteditor'), from: FillStyle.from(fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: FillStyle.toJson };
const viewBorderVisible = { propertyName: 'borderVisible', modelName: '@BorderVisible', displayName: 'Border Visible', localizationId: 'DevExpress.XtraCharts.MarkerBase.BorderVisible', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const viewBorderColor = { propertyName: 'borderColor', modelName: '@BorderColor', displayName: 'Border Color', localizationId: 'DevExpress.XtraCharts.MarkerBase.BorderColor', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
const marker1Info = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, tag];
const marker1 = { propertyName: 'marker1', modelName: 'Marker1', displayName: 'Marker 1', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Marker1', editor: editorTemplates.getEditor('objecteditor'), info: marker1Info, };
const marker2Info = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, tag];
const marker2 = { propertyName: 'marker2', modelName: 'Marker2', displayName: 'Marker 2', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Marker2', editor: editorTemplates.getEditor('objecteditor'), info: marker2Info, };
const color3 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.BorderBase.Color', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
const viewThickness = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', localizationId: 'DevExpress.XtraCharts.BorderBase.Thickness', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { min: 1 } };
const viewVisibility = {
    propertyName: 'visibility', modelName: '@Visibility', displayName: 'Visibility', localizationId: 'DevExpress.XtraCharts.BorderBase.Visibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const border1Info = [color3, viewThickness, viewVisibility, tag];
const border1 = { propertyName: 'border1', modelName: 'Border1', displayName: 'Border 1', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Border1', editor: editorTemplates.getEditor('objecteditor'), info: border1Info, };
const border2Info = [color3, viewThickness, viewVisibility, tag];
const border2 = { propertyName: 'border2', modelName: 'Border2', displayName: 'Border 2', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Border2', editor: editorTemplates.getEditor('objecteditor'), info: border2Info, };
const marker1Visibility = {
    propertyName: 'marker1Visibility', modelName: '@Marker1Visibility', displayName: 'Marker 1 Visibility', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Marker1Visibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const marker2Visibility = {
    propertyName: 'marker2Visibility', modelName: '@Marker2Visibility', displayName: 'Marker 2 Visibility', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Marker2Visibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const fillStyle2 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.RadarAreaSeriesView.FillStyle', editor: editorTemplates.getEditor('objecteditor'), from: FillStyle.from(fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: FillStyle.toJson };
const transparency1 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.RadarAreaSeriesView.Transparency', editor: editorTemplates.getEditor('numeric'), defaultVal: 135 };
const aggregateFunction1 = {
    propertyName: 'aggregateFunction', modelName: '@AggregateFunction', displayName: 'Aggregate Function', localizationId: 'DevExpress.XtraCharts.RadarSeriesViewBase.AggregateFunction', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Average', displayValue: 'Average', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Average' }, { value: 'Minimum', displayValue: 'Minimum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum' }, { value: 'Maximum', displayValue: 'Maximum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum' }, { value: 'Sum', displayValue: 'Sum', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Sum' }, { value: 'Count', displayValue: 'Count', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, { value: 'Financial', displayValue: 'Financial', localizationId: 'DevExpress.XtraCharts.SeriesAggregateFunction.Financial' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const shadow1 = { propertyName: 'shadow', modelName: 'Shadow', displayName: 'Shadow', localizationId: 'DevExpress.XtraCharts.RadarSeriesViewBase.Shadow', editor: editorTemplates.getEditor('objecteditor'), info: shadowInfo, };
const viewColorEach = { propertyName: 'colorEach', modelName: '@ColorEach', displayName: 'Color Each', localizationId: 'DevExpress.XtraCharts.RadarSeriesViewBase.ColorEach', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const polarRangeAreaSeriesViewinfo = [marker1, marker2, border1, border2, marker1Visibility, marker2Visibility, fillStyle2, transparency1, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const radarRangeAreaSeriesViewinfo = [marker1, marker2, border1, border2, marker1Visibility, marker2Visibility, fillStyle2, transparency1, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const areaWidth = { propertyName: 'areaWidth', modelName: '@AreaWidth', displayName: 'Area Width', localizationId: 'DevExpress.XtraCharts.Area3DSeriesView.AreaWidth', editor: editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 1 } };
const aggregateFunction2 = {
    propertyName: 'aggregateFunction', modelName: '@AggregateFunction', displayName: 'Aggregate Function', localizationId: 'DevExpress.XtraCharts.XYDiagram3DSeriesViewBase.AggregateFunction', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Average', displayValue: 'Average', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Average' }, { value: 'Minimum', displayValue: 'Minimum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum' }, { value: 'Maximum', displayValue: 'Maximum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum' }, { value: 'Sum', displayValue: 'Sum', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Sum' }, { value: 'Count', displayValue: 'Count', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, { value: 'Financial', displayValue: 'Financial', localizationId: 'DevExpress.XtraCharts.SeriesAggregateFunction.Financial' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const transparency2 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.XYDiagram3DSeriesViewBase.Transparency', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const rangeArea3DSeriesViewinfo = [areaWidth, aggregateFunction2, transparency2, color1, tag];
const marker11 = { propertyName: 'marker1', modelName: 'Marker1', displayName: 'Marker 1', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker1', editor: editorTemplates.getEditor('objecteditor'), info: marker1Info, };
const marker21 = { propertyName: 'marker2', modelName: 'Marker2', displayName: 'Marker 2', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker2', editor: editorTemplates.getEditor('objecteditor'), info: marker2Info, };
const border11 = { propertyName: 'border1', modelName: 'Border1', displayName: 'Border 1', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Border1', editor: editorTemplates.getEditor('objecteditor'), info: border1Info, };
const border21 = { propertyName: 'border2', modelName: 'Border2', displayName: 'Border 2', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Border2', editor: editorTemplates.getEditor('objecteditor'), info: border2Info, };
const marker1Visibility1 = {
    propertyName: 'marker1Visibility', modelName: '@Marker1Visibility', displayName: 'Marker 1 Visibility', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker1Visibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const marker2Visibility1 = {
    propertyName: 'marker2Visibility', modelName: '@Marker2Visibility', displayName: 'Marker 2 Visibility', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker2Visibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const transparency3 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.Transparency', editor: editorTemplates.getEditor('numeric'), defaultVal: 135 };
const colorEach1 = { propertyName: 'colorEach', modelName: '@ColorEach', displayName: 'Color Each', localizationId: 'DevExpress.XtraCharts.SeriesViewColorEachSupportBase.ColorEach', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const rangeAreaSeriesViewinfo = [marker11, marker21, border11, border21, marker1Visibility1, marker2Visibility1, viewFillStyle, transparency3, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const invertedStep1 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StackedStepAreaSeriesView.InvertedStep', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const borderInfo = [color3, viewThickness, viewVisibility, tag];
const viewBorder1 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.Border', editor: editorTemplates.getEditor('objecteditor'), info: borderInfo, };
const stackedStepAreaSeriesViewinfo = [invertedStep1, viewBorder1, viewFillStyle, transparency, viewEnableAntialiasing, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const invertedStep2 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StepArea3DSeriesView.InvertedStep', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const transparency4 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.XYDiagram3DSeriesViewBase.Transparency', editor: editorTemplates.getEditor('numeric'), defaultVal: 135 };
const stepArea3DSeriesViewinfo = [invertedStep2, areaWidth, aggregateFunction2, transparency4, color1, tag];
const invertedStep3 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StepAreaSeriesView.InvertedStep', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const markerOptionsInfo = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, tag];
const markerOptions = { propertyName: 'markerOptions', modelName: 'MarkerOptions', displayName: 'Marker Options', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.MarkerOptions', editor: editorTemplates.getEditor('objecteditor'), info: markerOptionsInfo, };
const viewMarkerVisibility = {
    propertyName: 'markerVisibility', modelName: '@MarkerVisibility', displayName: 'Marker Visibility', localizationId: 'DevExpress.XtraCharts.LineSeriesView.MarkerVisibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const stepAreaSeriesViewinfo = [invertedStep3, viewBorder1, viewFillStyle, markerOptions, transparency3, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const stackedGroup = { propertyName: 'stackedGroup', modelName: '@StackedGroupSerializable', displayName: 'Stacked Group', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.StackedGroup', editor: chartEditorTemplates.getEditor('group'), defaultVal: null };
const barDistance = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.BarDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const barDistanceFixed = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.BarDistanceFixed', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
const equalBarWidth = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.EqualBarWidth', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const viewBarWidth = { propertyName: 'barWidth', modelName: '@BarWidth', displayName: 'Bar Width', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.BarWidth', editor: editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 0, step: 0.1 } };
const barDepth = { propertyName: 'barDepth', modelName: '@BarDepth', displayName: 'Bar Depth', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.BarDepth', editor: editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 0, step: 0.1 } };
const barDepthAuto = { propertyName: 'barDepthAuto', modelName: '@BarDepthAuto', displayName: 'Bar Depth Auto', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.BarDepthAuto', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const fillMode1 = {
    propertyName: 'fillMode', modelName: '@FillMode', displayName: 'Fill Mode', localizationId: 'DevExpress.XtraCharts.FillStyle3D.FillMode', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Empty', displayValue: 'Empty', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearances.Empty' }, { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Gradient', displayValue: 'Gradient', localizationId: 'DevExpress.XtraCharts.FillMode3D.Gradient' }], defaultVal: 'Empty'
};
const fillStyleInfo1 = [fillMode1, fillStyleOptionsSerialize, tag];
const fillStyle3 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.FillStyle', editor: editorTemplates.getEditor('objecteditor'), from: FillStyle.from(fillStyleInfo1, 'RectangleGradientFillOptions'), toJsonObject: FillStyle.toJson };
const model = {
    propertyName: 'model', modelName: '@Model', displayName: 'Model', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.Model', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Box', displayValue: 'Box', localizationId: 'DevExpress.XtraCharts.Bar3DModel.Box' }, { value: 'Cylinder', displayValue: 'Cylinder', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Cylinder' }, { value: 'Cone', displayValue: 'Cone', localizationId: 'DevExpress.XtraCharts.Bar3DModel.Cone' }, { value: 'Pyramid', displayValue: 'Pyramid', localizationId: 'DevExpress.XtraCharts.Bar3DModel.Pyramid' }], defaultVal: 'Box'
};
const showFacet = { propertyName: 'showFacet', modelName: '@ShowFacet', displayName: 'Show Facet', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.ShowFacet', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const colorEach2 = { propertyName: 'colorEach', modelName: '@ColorEach', displayName: 'Color Each', localizationId: 'DevExpress.XtraCharts.SeriesView3DColorEachSupportBase.ColorEach', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const sideBySideFullStackedBar3DSeriesViewinfo = [stackedGroup, barDistance, barDistanceFixed, equalBarWidth, viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, tag];
const stackedGroup1 = { propertyName: 'stackedGroup', modelName: '@StackedGroupSerializable', displayName: 'Stacked Group', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBarSeriesView.StackedGroup', editor: chartEditorTemplates.getEditor('group'), defaultVal: null };
const barDistance1 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBarSeriesView.BarDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const barDistanceFixed1 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBarSeriesView.BarDistanceFixed', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
const equalBarWidth1 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBarSeriesView.EqualBarWidth', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const barWidth1 = { propertyName: 'barWidth', modelName: '@BarWidth', displayName: 'Bar Width', localizationId: 'DevExpress.XtraCharts.BarSeriesView.BarWidth', editor: editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 0, step: 0.1 } };
const border3 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.BarSeriesView.Border', editor: editorTemplates.getEditor('objecteditor'), info: borderInfo };
const fillStyle4 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.BarSeriesView.FillStyle', editor: editorTemplates.getEditor('objecteditor'), from: FillStyle.from(fillStyleInfo, 'RectangleGradientFillOptions'), toJsonObject: FillStyle.toJson };
const transparency5 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.BarSeriesView.Transparency', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const sideBySideFullStackedBarSeriesViewinfo = [stackedGroup1, barDistance1, barDistanceFixed1, equalBarWidth1, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const stackedGroup2 = { propertyName: 'stackedGroup', modelName: '@StackedGroupSerializable', displayName: 'Stacked Group', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.StackedGroup', editor: chartEditorTemplates.getEditor('group'), defaultVal: null };
const barDistance2 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.BarDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const barDistanceFixed2 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.BarDistanceFixed', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
const equalBarWidth2 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.EqualBarWidth', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const sideBySideStackedBar3DSeriesViewinfo = [stackedGroup2, barDistance2, barDistanceFixed2, equalBarWidth2, viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, tag];
const stackedGroup3 = { propertyName: 'stackedGroup', modelName: '@StackedGroupSerializable', displayName: 'Stacked Group', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.StackedGroup', editor: chartEditorTemplates.getEditor('group'), defaultVal: null };
const barDistance3 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.BarDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const barDistanceFixed3 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.BarDistanceFixed', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
const equalBarWidth3 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.EqualBarWidth', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const sideBySideStackedBarSeriesViewinfo = [stackedGroup3, barDistance3, barDistanceFixed3, equalBarWidth3, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const lineThickness = { propertyName: 'lineThickness', modelName: '@LineThickness', displayName: 'Line Thickness', localizationId: 'DevExpress.XtraCharts.Line3DSeriesView.LineThickness', editor: editorTemplates.getEditor('numeric'), defaultVal: 5, editorOptions: { min: 1 } };
const lineWidth = { propertyName: 'lineWidth', modelName: '@LineWidth', displayName: 'Line Width', localizationId: 'DevExpress.XtraCharts.Line3DSeriesView.LineWidth', editor: editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 1 } };
const fullStackedLine3DSeriesViewinfo = [lineThickness, lineWidth, aggregateFunction2, transparency2, color1, tag];
const thickness1 = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', localizationId: 'DevExpress.XtraCharts.LineStyle.Thickness', editor: editorTemplates.getEditor('numeric'), defaultVal: 2, editorOptions: { min: 1 } };
const viewDashStyle = {
    propertyName: 'dashStyle', modelName: '@DashStyle', displayName: 'Dash Style', localizationId: 'DevExpress.XtraCharts.LineStyle.DashStyle', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Dash', displayValue: 'Dash', localizationId: 'DevExpress.XtraCharts.DashStyle.Dash' }, { value: 'Dot', displayValue: 'Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.Dot' }, { value: 'DashDot', displayValue: 'DashDot' }, { value: 'DashDotDot', displayValue: 'DashDotDot' }], defaultVal: 'Solid'
};
const lineJoin = {
    propertyName: 'lineJoin', modelName: '@LineJoin', displayName: 'Line Join', localizationId: 'DevExpress.XtraCharts.LineStyle.LineJoin', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Miter', displayValue: 'Miter', localizationId: 'System.Drawing.Drawing2D.LineJoin.Miter' }, { value: 'Bevel', displayValue: 'Bevel', localizationId: 'System.Drawing.Drawing2D.LineJoin.Bevel' }, { value: 'Round', displayValue: 'Round', localizationId: 'System.Drawing.Drawing2D.LineJoin.Round' }, { value: 'MiterClipped', displayValue: 'MiterClipped', localizationId: 'System.Drawing.Drawing2D.LineJoin.MiterClipped' }], defaultVal: 'Miter'
};
const lineStyleInfo = [thickness1, viewDashStyle, lineJoin, tag];
const viewLineStyle = { propertyName: 'lineStyle', modelName: 'LineStyle', displayName: 'Line Style', localizationId: 'DevExpress.XtraCharts.LineSeriesView.LineStyle', editor: editorTemplates.getEditor('objecteditor'), info: lineStyleInfo, };
const lineMarkerOptionsInfo = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, tag];
const lineMarkerOptions = { propertyName: 'lineMarkerOptions', modelName: 'LineMarkerOptions', displayName: 'Line Marker Options', localizationId: 'DevExpress.XtraCharts.LineSeriesView.LineMarkerOptions', editor: editorTemplates.getEditor('objecteditor'), info: lineMarkerOptionsInfo, };
const fullStackedLineSeriesViewinfo = [viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const lineStyle1 = { propertyName: 'lineStyle', modelName: 'LineStyle', displayName: 'Line Style', localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.LineStyle', editor: editorTemplates.getEditor('objecteditor'), info: lineStyleInfo, };
const closed = { propertyName: 'closed', modelName: '@Closed', displayName: 'Closed', localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.Closed', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const lineMarkerOptions1 = { propertyName: 'lineMarkerOptions', modelName: 'LineMarkerOptions', displayName: 'Line Marker Options', localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.LineMarkerOptions', editor: editorTemplates.getEditor('objecteditor'), info: lineMarkerOptionsInfo, };
const markerVisibility1 = {
    propertyName: 'markerVisibility', modelName: '@MarkerVisibility', displayName: 'Marker Visibility', localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.MarkerVisibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const scatterPolarLineSeriesViewinfo = [lineStyle1, closed, lineMarkerOptions1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const scatterRadarLineSeriesViewinfo = [lineStyle1, closed, lineMarkerOptions1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const stackedLine3DSeriesViewinfo = [lineThickness, lineWidth, aggregateFunction2, transparency2, color1, tag];
const stackedLineSeriesViewinfo = [viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const weight = { propertyName: 'weight', modelName: '@Weight', displayName: 'Weight', localizationId: 'DevExpress.XtraCharts.NestedDoughnutSeriesView.Weight', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { min: 1 } };
const innerIndent = { propertyName: 'innerIndent', modelName: '@InnerIndent', displayName: 'Inner Indent', localizationId: 'DevExpress.XtraCharts.NestedDoughnutSeriesView.InnerIndent', editor: editorTemplates.getEditor('numeric'), defaultVal: 5, editorOptions: { min: 0 } };
const group = { propertyName: 'group', modelName: '@GroupSerializable', displayName: 'Group', localizationId: 'DevExpress.XtraCharts.NestedDoughnutSeriesView.Group', editor: chartEditorTemplates.getEditor('group'), defaultVal: null };
const holeRadiusPercent = { propertyName: 'holeRadiusPercent', modelName: '@HoleRadiusPercent', displayName: 'Hole Radius Percent', localizationId: 'DevExpress.XtraCharts.DoughnutSeriesView.HoleRadiusPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 40, editorOptions: { min: 0, max: 100 } };
const minAllowedSizePercentage = { propertyName: 'minAllowedSizePercentage', modelName: '@MinAllowedSizePercentage', displayName: 'Min Allowed Size Percentage', localizationId: 'DevExpress.XtraCharts.PieSeriesView.MinAllowedSizePercentage', editor: editorTemplates.getEditor('numeric'), defaultVal: 50, editorOptions: { min: 0, max: 100 } };
const rotation = { propertyName: 'rotation', modelName: '@Rotation', displayName: 'Rotation', localizationId: 'DevExpress.XtraCharts.PieSeriesView.Rotation', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const heightToWidthRatio = { propertyName: 'heightToWidthRatio', modelName: '@HeightToWidthRatio', displayName: 'Height to Width Ratio', localizationId: 'DevExpress.XtraCharts.PieSeriesView.HeightToWidthRatio', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { min: 0 } };
const border4 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.PieSeriesView.Border', editor: editorTemplates.getEditor('objecteditor'), info: borderInfo, };
const fillStyle5 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.PieSeriesView.FillStyle', editor: editorTemplates.getEditor('objecteditor'), from: FillStyle.from(fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: FillStyle.toJson };
const runtimeExploding = { propertyName: 'runtimeExploding', modelName: '@RuntimeExploding', displayName: 'Runtime Exploding', localizationId: 'DevExpress.XtraCharts.PieSeriesView.RuntimeExploding', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const explodedDistancePercentage = { propertyName: 'explodedDistancePercentage', modelName: '@ExplodedDistancePercentage', displayName: 'Exploded Distance Percentage', localizationId: 'DevExpress.XtraCharts.PieSeriesViewBase.ExplodedDistancePercentage', editor: editorTemplates.getEditor('numeric'), defaultVal: 10, editorOptions: { min: 1 } };
const explodeMode = {
    propertyName: 'explodeMode', modelName: '@ExplodeMode', displayName: 'Explode Mode', localizationId: 'DevExpress.XtraCharts.PieSeriesViewBase.ExplodeMode', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'All', displayValue: 'All', localizationId: 'DevExpress.XtraCharts.PieExplodeMode.All' }, { value: 'MinValue', displayValue: 'MinValue' }, { value: 'MaxValue', displayValue: 'MaxValue' }, { value: 'UsePoints', displayValue: 'UsePoints' }, { value: 'UseFilters', displayValue: 'UseFilters' }, { value: 'Others', displayValue: 'Others', localizationId: 'DevExpress.XtraCharts.PieExplodeMode.Others' }], defaultVal: 'None'
};
const sweepDirection = {
    propertyName: 'sweepDirection', modelName: '@SweepDirection', displayName: 'Sweep Direction', localizationId: 'DevExpress.XtraCharts.PieSeriesViewBase.SweepDirection', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Counterclockwise', displayValue: 'Counterclockwise', localizationId: 'DevExpress.XtraCharts.PieSweepDirection.Counterclockwise' }, { value: 'Clockwise', displayValue: 'Clockwise', localizationId: 'DevExpress.XtraCharts.PieSweepDirection.Clockwise' }], defaultVal: 'Counterclockwise'
};
const totalLabelInfo = [textColor, backColor, viewEnableAntialiasing, maxWidth, maxLineCount, textAlignment, textPattern, viewVisible, tag, font12, viewBorder1, viewFillStyle, shadow];
const totalLabel = { propertyName: 'totalLabel', modelName: 'TotalLabel', displayName: 'Total Label', localizationId: 'DevExpress.XtraCharts.PieSeriesView.TotalLabel', editor: editorTemplates.getEditor('objecteditor'), info: totalLabelInfo, };
const viewTitles = {
    propertyName: 'titles',
    modelName: 'Titles',
    array: true,
    from(model, serializer) {
        return deserializeModelArray(model, (title, parent) => { return new ChartViewTitleModel(title, parent, serializer); }, TitleViewModel.prefix);
    },
    displayName: 'Titles',
    localizationId: 'DevExpress.XtraCharts.SimpleDiagramSeriesViewBase.Titles'
};
const nestedDoughnutSeriesViewinfo = [weight, innerIndent, group, holeRadiusPercent, minAllowedSizePercentage, rotation, heightToWidthRatio, border4, fillStyle5, runtimeExploding, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, tag, totalLabel];
const thickness2 = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', localizationId: 'DevExpress.XtraCharts.LineStyle.Thickness', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { min: 1 } };
const lineStyleInfo1 = [thickness2, viewDashStyle, lineJoin, tag];
const lineStyle2 = { propertyName: 'lineStyle', modelName: 'LineStyle', displayName: 'Line Style', localizationId: 'DevExpress.XtraCharts.SwiftPlotSeriesView.LineStyle', editor: editorTemplates.getEditor('objecteditor'), info: lineStyleInfo1, };
const viewAntialiasing = { propertyName: 'antialiasing', modelName: '@Antialiasing', displayName: 'Antialiasing', localizationId: 'DevExpress.XtraCharts.SwiftPlotSeriesView.Antialiasing', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const swiftPlotSeriesViewinfo = [lineStyle2, viewAntialiasing, axisXName, axisYName, paneName, viewAggregateFunction, indicators, color1, tag];
const holeRadiusPercent1 = { propertyName: 'holeRadiusPercent', modelName: '@HoleRadiusPercent', displayName: 'Hole Radius Percent', localizationId: 'DevExpress.XtraCharts.Funnel3DSeriesView.HoleRadiusPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 90, editorOptions: { min: 0, max: 100 } };
const heightToWidthRatio1 = { propertyName: 'heightToWidthRatio', modelName: '@HeightToWidthRatio', displayName: 'Height to Width Ratio', localizationId: 'DevExpress.XtraCharts.FunnelSeriesViewBase.HeightToWidthRatio', editor: editorTemplates.getEditor('numeric'), defaultVal: 1 };
const pointDistance = { propertyName: 'pointDistance', modelName: '@PointDistance', displayName: 'Point Distance', localizationId: 'DevExpress.XtraCharts.FunnelSeriesViewBase.PointDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0, editorOptions: { min: 0 } };
const funnel3DSeriesViewinfo = [holeRadiusPercent1, heightToWidthRatio1, pointDistance, viewTitles, tag];
const border5 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.FunnelSeriesView.Border', editor: editorTemplates.getEditor('objecteditor'), info: borderInfo, };
const fillStyle6 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.FunnelSeriesView.FillStyle', editor: editorTemplates.getEditor('objecteditor'), from: FillStyle.from(fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: FillStyle.toJson };
const alignToCenter = { propertyName: 'alignToCenter', modelName: '@AlignToCenter', displayName: 'Align to Center', localizationId: 'DevExpress.XtraCharts.FunnelSeriesView.AlignToCenter', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const heightToWidthRatioAuto = { propertyName: 'heightToWidthRatioAuto', modelName: '@HeightToWidthRatioAuto', displayName: 'Height to Width Ratio Auto', localizationId: 'DevExpress.XtraCharts.FunnelSeriesView.HeightToWidthRatioAuto', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const funnelSeriesViewinfo = [border5, fillStyle6, alignToCenter, heightToWidthRatioAuto, heightToWidthRatio1, pointDistance, viewTitles, tag];
const scatterLineSeriesViewinfo = [viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const bubbleMarkerOptionsInfo = [kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, tag];
const bubbleMarkerOptions = { propertyName: 'bubbleMarkerOptions', modelName: 'BubbleMarkerOptions', displayName: 'Bubble Marker Options', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.BubbleMarkerOptions', editor: editorTemplates.getEditor('objecteditor'), info: bubbleMarkerOptionsInfo, };
const autoSize = { propertyName: 'autoSize', modelName: '@AutoSize', displayName: 'Automatic Size', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.AutoSize', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const maxSize = { propertyName: 'maxSize', modelName: '@MaxSize', displayName: 'Max Size', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.MaxSize', editor: chartEditorTemplates.getEditor('maxSize'), defaultVal: 0.9 };
const minSize = { propertyName: 'minSize', modelName: '@MinSize', displayName: 'Min Size', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.MinSize', editor: chartEditorTemplates.getEditor('minSize'), defaultVal: 0.3, editorOptions: { min: 0 } };
const transparency6 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.Transparency', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const bubbleSeriesViewinfo = [bubbleMarkerOptions, autoSize, maxSize, minSize, transparency6, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const lineTensionPercent = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.Spline3DSeriesView.LineTensionPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
const spline3DSeriesViewinfo = [lineTensionPercent, lineThickness, lineWidth, aggregateFunction2, transparency2, color1, tag];
const lineTensionPercent1 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.SplineArea3DSeriesView.LineTensionPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
const splineArea3DSeriesViewinfo = [lineTensionPercent1, areaWidth, aggregateFunction2, transparency4, color1, tag];
const lineTensionPercent2 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.FullStackedSplineArea3DSeriesView.LineTensionPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
const fullStackedSplineArea3DSeriesViewinfo = [lineTensionPercent2, areaWidth, aggregateFunction2, transparency4, color1, tag];
const lineTensionPercent3 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.SplineAreaSeriesView.LineTensionPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
const splineAreaSeriesViewinfo = [lineTensionPercent3, viewBorder1, viewFillStyle, markerOptions, transparency3, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const lineTensionPercent4 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.FullStackedSplineAreaSeriesView.LineTensionPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
const fullStackedSplineAreaSeriesViewinfo = [lineTensionPercent4, viewFillStyle, transparency, viewEnableAntialiasing, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const lineTensionPercent5 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.StackedSplineArea3DSeriesView.LineTensionPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
const stackedSplineArea3DSeriesViewinfo = [lineTensionPercent5, areaWidth, aggregateFunction2, transparency4, color1, tag];
const lineTensionPercent6 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.SplineSeriesView.LineTensionPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
const splineSeriesViewinfo = [lineTensionPercent6, viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const lineTensionPercent7 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.StackedSplineAreaSeriesView.LineTensionPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
const stackedSplineAreaSeriesViewinfo = [lineTensionPercent7, viewBorder1, viewFillStyle, transparency, viewEnableAntialiasing, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const area3DSeriesViewinfo = [areaWidth, aggregateFunction2, transparency4, color1, tag];
const fullStackedArea3DSeriesViewinfo = [areaWidth, aggregateFunction2, transparency4, color1, tag];
const border6 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.RadarAreaSeriesView.Border', editor: editorTemplates.getEditor('objecteditor'), info: borderInfo, };
const markerOptions1 = { propertyName: 'markerOptions', modelName: 'MarkerOptions', displayName: 'Marker Options', localizationId: 'DevExpress.XtraCharts.RadarAreaSeriesView.MarkerOptions', editor: editorTemplates.getEditor('objecteditor'), info: markerOptionsInfo, };
const polarAreaSeriesViewinfo = [border6, fillStyle2, markerOptions1, transparency1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const radarAreaSeriesViewinfo = [border6, fillStyle2, markerOptions1, transparency1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const stackedArea3DSeriesViewinfo = [areaWidth, aggregateFunction2, transparency4, color1, tag];
const fullStackedBar3DSeriesViewinfo = [viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, tag];
const barDistance4 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideBar3DSeriesView.BarDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const barDistanceFixed4 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideBar3DSeriesView.BarDistanceFixed', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
const equalBarWidth4 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideBar3DSeriesView.EqualBarWidth', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const sideBySideBar3DSeriesViewinfo = [barDistance4, barDistanceFixed4, equalBarWidth4, viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, tag];
const stackedBar3DSeriesViewinfo = [viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, tag];
const polarLineSeriesViewinfo = [lineStyle1, closed, lineMarkerOptions1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const radarLineSeriesViewinfo = [lineStyle1, closed, lineMarkerOptions1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const holeRadiusPercent2 = { propertyName: 'holeRadiusPercent', modelName: '@HoleRadiusPercent', displayName: 'Hole Radius Percent', localizationId: 'DevExpress.XtraCharts.Doughnut3DSeriesView.HoleRadiusPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 60, editorOptions: { min: 0, max: 100 } };
const depth = { propertyName: 'depth', modelName: '@Depth', displayName: 'Depth', localizationId: 'DevExpress.XtraCharts.Pie3DSeriesView.Depth', editor: editorTemplates.getEditor('numeric'), defaultVal: 15, editorOptions: { min: 1, max: 100 } };
const sizeAsPercentage = { propertyName: 'sizeAsPercentage', modelName: '@SizeAsPercentage', displayName: 'Size As Percentage', localizationId: 'DevExpress.XtraCharts.Pie3DSeriesView.SizeAsPercentage', editor: editorTemplates.getEditor('numeric'), defaultVal: 100, editorOptions: { min: 0, max: 100 } };
const pieFillStyleInfo = [fillMode1, fillStyleOptionsSerialize, tag];
const pieFillStyle = { propertyName: 'pieFillStyle', modelName: 'PieFillStyle', displayName: 'Pie Fill Style', localizationId: 'DevExpress.XtraCharts.Pie3DSeriesView.PieFillStyle', editor: editorTemplates.getEditor('objecteditor'), info: pieFillStyleInfo, };
const doughnut3DSeriesViewinfo = [holeRadiusPercent2, depth, sizeAsPercentage, pieFillStyle, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, tag];
const holeRadiusPercent3 = { propertyName: 'holeRadiusPercent', modelName: '@HoleRadiusPercent', displayName: 'Hole Radius Percent', localizationId: 'DevExpress.XtraCharts.DoughnutSeriesView.HoleRadiusPercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 60, editorOptions: { min: 0, max: 100 } };
const doughnutSeriesViewinfo = [holeRadiusPercent3, minAllowedSizePercentage, rotation, heightToWidthRatio, border4, fillStyle5, runtimeExploding, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, tag, totalLabel];
const size2 = { propertyName: 'size', modelName: '@Size', displayName: 'Size', localizationId: 'DevExpress.XtraCharts.SimpleMarker.Size', editor: editorTemplates.getEditor('numeric'), defaultVal: 8, editorOptions: { min: 1 } };
const pointMarkerOptionsInfo = [size2, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, tag];
const pointMarkerOptions = { propertyName: 'pointMarkerOptions', modelName: 'PointMarkerOptions', displayName: 'Point Marker Options', localizationId: 'DevExpress.XtraCharts.RadarPointSeriesView.PointMarkerOptions', editor: editorTemplates.getEditor('objecteditor'), info: pointMarkerOptionsInfo, };
const polarPointSeriesViewinfo = [pointMarkerOptions, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const arrowWidth = { propertyName: 'arrowWidth', modelName: '@ArrowWidth', displayName: 'Arrow Width', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.ArrowWidth', editor: editorTemplates.getEditor('numeric'), defaultVal: 7, editorOptions: { min: 1 }, validationRules: arrowWidthValidationRules };
const arrowHeight = { propertyName: 'arrowHeight', modelName: '@ArrowHeight', displayName: 'Arrow Height', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.ArrowHeight', editor: editorTemplates.getEditor('numeric'), defaultVal: 5, editorOptions: { min: 1 } };
const viewMinIndent = { propertyName: 'minIndent', modelName: '@MinIndent', displayName: 'Min Indent', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.MinIndent', editor: editorTemplates.getEditor('numeric'), defaultVal: 2, editorOptions: { min: 0 } };
const thickness3 = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.Thickness', editor: editorTemplates.getEditor('numeric'), defaultVal: 3, editorOptions: { min: 1 } };
const visible1 = { propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.Visible', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const colorSource = {
    propertyName: 'colorSource', modelName: '@ColorSource', displayName: 'Color Source', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.ColorSource', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'ParentColor', displayValue: 'ParentColor' }, { value: 'ParentBorderColor', displayValue: 'ParentBorderColor' }, { value: 'ChildColor', displayValue: 'ChildColor' }, { value: 'ChildBorderColor', displayValue: 'ChildBorderColor' }, { value: 'OwnColor', displayValue: 'OwnColor' }], defaultVal: 'ParentColor'
};
const color4 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.Color', from: colorFromString, toJsonObject: colorToString, editor: chartEditorTemplates.getEditor('undoCustomColorEditor'), defaultVal: 'transparent' };
const inFront = { propertyName: 'inFront', modelName: '@InFront', displayName: 'In Front', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.InFront', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const linkOptionsInfo = [arrowWidth, arrowHeight, viewMinIndent, thickness3, visible1, colorSource, color4, inFront, tag];
const linkOptions = { propertyName: 'linkOptions', modelName: 'LinkOptions', displayName: 'Link Options', localizationId: 'DevExpress.XtraCharts.GanttSeriesView.LinkOptions', editor: editorTemplates.getEditor('objecteditor'), info: linkOptionsInfo, };
const minValueMarkerInfo = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, tag];
const minValueMarker = { propertyName: 'minValueMarker', modelName: 'MinValueMarker', displayName: 'Min Value Marker', localizationId: 'DevExpress.XtraCharts.RangeBarSeriesView.MinValueMarker', editor: editorTemplates.getEditor('objecteditor'), info: minValueMarkerInfo, };
const maxValueMarkerInfo = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, tag];
const maxValueMarker = { propertyName: 'maxValueMarker', modelName: 'MaxValueMarker', displayName: 'Max Value Marker', localizationId: 'DevExpress.XtraCharts.RangeBarSeriesView.MaxValueMarker', editor: editorTemplates.getEditor('objecteditor'), info: maxValueMarkerInfo, };
const minValueMarkerVisibility = {
    propertyName: 'minValueMarkerVisibility', modelName: '@MinValueMarkerVisibility', displayName: 'Min Value Marker Visibility', localizationId: 'DevExpress.XtraCharts.RangeBarSeriesView.MinValueMarkerVisibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const maxValueMarkerVisibility = {
    propertyName: 'maxValueMarkerVisibility', modelName: '@MaxValueMarkerVisibility', displayName: 'Max Value Marker Visibility', localizationId: 'DevExpress.XtraCharts.RangeBarSeriesView.MaxValueMarkerVisibility', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
const overlappedGanttSeriesViewinfo = [linkOptions, minValueMarker, maxValueMarker, minValueMarkerVisibility, maxValueMarkerVisibility, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const radarPointSeriesViewinfo = [pointMarkerOptions, aggregateFunction1, shadow1, viewColorEach, color1, tag];
const barDistance5 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideGanttSeriesView.BarDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const barDistanceFixed5 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideGanttSeriesView.BarDistanceFixed', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
const equalBarWidth5 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideGanttSeriesView.EqualBarWidth', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const sideBySideGanttSeriesViewinfo = [barDistance5, barDistanceFixed5, equalBarWidth5, linkOptions, minValueMarker, maxValueMarker, minValueMarkerVisibility, maxValueMarkerVisibility, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const areaSeriesViewinfo = [viewBorder1, viewFillStyle, markerOptions, transparency3, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const fillMode2 = {
    propertyName: 'fillMode', modelName: '@FillMode', displayName: 'Fill Mode', localizationId: 'DevExpress.XtraCharts.CandleStickReductionOptions.FillMode', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'FilledOnReduction', displayValue: 'FilledOnReduction' }, { value: 'FilledOnIncrease', displayValue: 'FilledOnIncrease' }, { value: 'AlwaysEmpty', displayValue: 'AlwaysEmpty' }, { value: 'AlwaysFilled', displayValue: 'AlwaysFilled' }], defaultVal: 'FilledOnReduction'
};
const color5 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.ReductionStockOptions.Color', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: '255,255,0,0' };
const level = {
    propertyName: 'level', modelName: '@Level', displayName: 'Level', localizationId: 'DevExpress.XtraCharts.ReductionStockOptions.Level', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Low', displayValue: 'Low', localizationId: 'DevExpress.XtraCharts.StockLevel.Low' }, { value: 'High', displayValue: 'High', localizationId: 'DevExpress.XtraCharts.StockLevel.High' }, { value: 'Open', displayValue: 'Open', localizationId: 'DevExpress.XtraCharts.StockLevel.Open' }, { value: 'Close', displayValue: 'Close', localizationId: 'DevExpress.XtraCharts.StockLevel.Close' }], defaultVal: 'Close'
};
const visible2 = { propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraCharts.ReductionStockOptions.Visible', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const colorMode = {
    propertyName: 'colorMode', modelName: '@ColorMode', displayName: 'Color Mode', localizationId: 'DevExpress.XtraCharts.ReductionStockOptions.ColorMode', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'PreviousToCurrentPoint', displayValue: 'PreviousToCurrentPoint' }, { value: 'OpenToCloseValue', displayValue: 'OpenToCloseValue' }], defaultVal: 'PreviousToCurrentPoint'
};
const reductionOptionsInfo = [fillMode2, color5, level, visible2, colorMode, tag];
const reductionOptions = { propertyName: 'reductionOptions', modelName: 'ReductionOptions', displayName: 'Reduction Options', localizationId: 'DevExpress.XtraCharts.CandleStickSeriesView.ReductionOptions', editor: editorTemplates.getEditor('objecteditor'), info: reductionOptionsInfo, };
const levelLineLength = { propertyName: 'levelLineLength', modelName: '@LevelLineLength', displayName: 'Level Line Length', localizationId: 'DevExpress.XtraCharts.FinancialSeriesViewBase.LevelLineLength', editor: editorTemplates.getEditor('numeric'), defaultVal: 0.25, editorOptions: { min: 1 } };
const lineThickness1 = { propertyName: 'lineThickness', modelName: '@LineThickness', displayName: 'Line Thickness', localizationId: 'DevExpress.XtraCharts.FinancialSeriesViewBase.LineThickness', editor: editorTemplates.getEditor('numeric'), defaultVal: 2, editorOptions: { min: 1 } };
const reductionOptionsInfo1 = [color5, level, visible2, colorMode, tag];
const reductionOptions1 = { propertyName: 'reductionOptions', modelName: 'ReductionOptions', displayName: 'Reduction Options', localizationId: 'DevExpress.XtraCharts.FinancialSeriesViewBase.ReductionOptions', editor: editorTemplates.getEditor('objecteditor'), info: reductionOptionsInfo1, };
const candleStickSeriesViewinfo = [reductionOptions, levelLineLength, lineThickness1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const fullStackedAreaSeriesViewinfo = [viewFillStyle, transparency, viewEnableAntialiasing, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const fullStackedBarSeriesViewinfo = [barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const line3DSeriesViewinfo = [lineThickness, lineWidth, aggregateFunction2, transparency2, color1, tag];
const lineSeriesViewinfo = [viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const manhattanBarSeriesViewinfo = [viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, tag];
const overlappedRangeBarSeriesViewinfo = [minValueMarker, maxValueMarker, minValueMarkerVisibility, maxValueMarkerVisibility, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const pie3DSeriesViewinfo = [depth, sizeAsPercentage, pieFillStyle, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, tag];
const pieSeriesViewinfo = [minAllowedSizePercentage, rotation, heightToWidthRatio, border4, fillStyle5, runtimeExploding, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, tag, totalLabel];
const pointMarkerOptions1 = { propertyName: 'pointMarkerOptions', modelName: 'PointMarkerOptions', displayName: 'Point Marker Options', localizationId: 'DevExpress.XtraCharts.PointSeriesView.PointMarkerOptions', editor: editorTemplates.getEditor('objecteditor'), info: pointMarkerOptionsInfo, };
const pointSeriesViewinfo = [pointMarkerOptions1, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const barDistance6 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideBarSeriesView.BarDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const barDistanceFixed6 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideBarSeriesView.BarDistanceFixed', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
const equalBarWidth6 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideBarSeriesView.EqualBarWidth', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const sideBySideBarSeriesViewinfo = [barDistance6, barDistanceFixed6, equalBarWidth6, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const barDistance7 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideRangeBarSeriesView.BarDistance', editor: editorTemplates.getEditor('numeric'), defaultVal: 0 };
const barDistanceFixed7 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideRangeBarSeriesView.BarDistanceFixed', editor: editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
const equalBarWidth7 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideRangeBarSeriesView.EqualBarWidth', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: true };
const sideBySideRangeBarSeriesViewinfo = [barDistance7, barDistanceFixed7, equalBarWidth7, minValueMarker, maxValueMarker, minValueMarkerVisibility, maxValueMarkerVisibility, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const stackedAreaSeriesViewinfo = [viewBorder1, viewFillStyle, transparency, viewEnableAntialiasing, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const stackedBarSeriesViewinfo = [barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const invertedStep4 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StepLineSeriesView.InvertedStep', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const stepLineSeriesViewinfo = [invertedStep4, viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const showOpenClose = {
    propertyName: 'showOpenClose', modelName: '@ShowOpenClose', displayName: 'Show Open Close', localizationId: 'DevExpress.XtraCharts.StockSeriesView.ShowOpenClose', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Both', displayValue: 'Both', localizationId: 'DevExpress.XtraCharts.ErrorBarDirection.Both' }, { value: 'Open', displayValue: 'Open', localizationId: 'DevExpress.XtraCharts.StockLevel.Open' }, { value: 'Close', displayValue: 'Close', localizationId: 'DevExpress.XtraCharts.StockLevel.Close' }], defaultVal: 'Both'
};
const stockSeriesViewinfo = [showOpenClose, levelLineLength, lineThickness1, reductionOptions1, shadow, paneName, axisXName, axisYName, viewAggregateFunction, indicators, color1, tag];
const invertedStep5 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StepLine3DSeriesView.InvertedStep', from: parseBool, editor: editorTemplates.getEditor('bool'), defaultVal: false };
const stepLine3DSeriesViewinfo = [invertedStep5, lineThickness, lineWidth, aggregateFunction2, transparency2, color1, tag];
const risingbarcolor = { propertyName: 'risingBarColor', modelName: '@RisingBarColor', displayName: 'Rising Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.RisingBarColor', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
const fallingbarcolor = { propertyName: 'fallingBarColor', modelName: '@FallingBarColor', displayName: 'Falling Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.FallingBarColor', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
const startbarcolor = { propertyName: 'startBarColor', modelName: '@StartBarColor', displayName: 'Start Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.StartBarColor', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'Gray' };
const subtotalbarcolor = { propertyName: 'subtotalBarColor', modelName: '@SubtotalBarColor', displayName: 'Subtotal Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.SubtotalBarColor', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'Gray' };
const totalbarcolor = { propertyName: 'totalBarColor', modelName: '@TotalBarColor', displayName: 'Total Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.TotalBarColor', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'Gray' };
const connectorcolor = { propertyName: 'connectorColor', modelName: '@ConnectorColor', displayName: 'Connector Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.ConnectorColor', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor'), defaultVal: 'Gray' };
const waterfallSeriesView = stackedBarSeriesViewinfo.concat([risingbarcolor, fallingbarcolor, startbarcolor, subtotalbarcolor, totalbarcolor, connectorcolor]);
export const viewMapper = {
    FullStackedStepAreaSeriesView: fullStackedStepAreaSeriesViewinfo,
    PolarRangeAreaSeriesView: polarRangeAreaSeriesViewinfo,
    RadarRangeAreaSeriesView: radarRangeAreaSeriesViewinfo,
    RangeArea3DSeriesView: rangeArea3DSeriesViewinfo,
    RangeAreaSeriesView: rangeAreaSeriesViewinfo,
    StackedStepAreaSeriesView: stackedStepAreaSeriesViewinfo,
    StepArea3DSeriesView: stepArea3DSeriesViewinfo,
    StepAreaSeriesView: stepAreaSeriesViewinfo,
    SideBySideFullStackedBar3DSeriesView: sideBySideFullStackedBar3DSeriesViewinfo,
    SideBySideFullStackedBarSeriesView: sideBySideFullStackedBarSeriesViewinfo,
    SideBySideStackedBar3DSeriesView: sideBySideStackedBar3DSeriesViewinfo,
    SideBySideStackedBarSeriesView: sideBySideStackedBarSeriesViewinfo,
    FullStackedLine3DSeriesView: fullStackedLine3DSeriesViewinfo,
    FullStackedLineSeriesView: fullStackedLineSeriesViewinfo,
    WaterfallSeriesView: waterfallSeriesView,
    ScatterPolarLineSeriesView: scatterPolarLineSeriesViewinfo,
    ScatterRadarLineSeriesView: scatterRadarLineSeriesViewinfo,
    StackedLine3DSeriesView: stackedLine3DSeriesViewinfo,
    StackedLineSeriesView: stackedLineSeriesViewinfo,
    NestedDoughnutSeriesView: nestedDoughnutSeriesViewinfo,
    SwiftPlotSeriesView: swiftPlotSeriesViewinfo,
    Funnel3DSeriesView: funnel3DSeriesViewinfo,
    FunnelSeriesView: funnelSeriesViewinfo,
    ScatterLineSeriesView: scatterLineSeriesViewinfo,
    BubbleSeriesView: bubbleSeriesViewinfo,
    Spline3DSeriesView: spline3DSeriesViewinfo,
    SplineArea3DSeriesView: splineArea3DSeriesViewinfo,
    FullStackedSplineArea3DSeriesView: fullStackedSplineArea3DSeriesViewinfo,
    SplineAreaSeriesView: splineAreaSeriesViewinfo,
    FullStackedSplineAreaSeriesView: fullStackedSplineAreaSeriesViewinfo,
    StackedSplineArea3DSeriesView: stackedSplineArea3DSeriesViewinfo,
    SplineSeriesView: splineSeriesViewinfo,
    StackedSplineAreaSeriesView: stackedSplineAreaSeriesViewinfo,
    Area3DSeriesView: area3DSeriesViewinfo,
    FullStackedArea3DSeriesView: fullStackedArea3DSeriesViewinfo,
    PolarAreaSeriesView: polarAreaSeriesViewinfo,
    RadarAreaSeriesView: radarAreaSeriesViewinfo,
    StackedArea3DSeriesView: stackedArea3DSeriesViewinfo,
    FullStackedBar3DSeriesView: fullStackedBar3DSeriesViewinfo,
    SideBySideBar3DSeriesView: sideBySideBar3DSeriesViewinfo,
    StackedBar3DSeriesView: stackedBar3DSeriesViewinfo,
    PolarLineSeriesView: polarLineSeriesViewinfo,
    RadarLineSeriesView: radarLineSeriesViewinfo,
    Doughnut3DSeriesView: doughnut3DSeriesViewinfo,
    DoughnutSeriesView: doughnutSeriesViewinfo,
    PolarPointSeriesView: polarPointSeriesViewinfo,
    OverlappedGanttSeriesView: overlappedGanttSeriesViewinfo,
    RadarPointSeriesView: radarPointSeriesViewinfo,
    SideBySideGanttSeriesView: sideBySideGanttSeriesViewinfo,
    AreaSeriesView: areaSeriesViewinfo,
    CandleStickSeriesView: candleStickSeriesViewinfo,
    FullStackedAreaSeriesView: fullStackedAreaSeriesViewinfo,
    FullStackedBarSeriesView: fullStackedBarSeriesViewinfo,
    Line3DSeriesView: line3DSeriesViewinfo,
    LineSeriesView: lineSeriesViewinfo,
    ManhattanBarSeriesView: manhattanBarSeriesViewinfo,
    OverlappedRangeBarSeriesView: overlappedRangeBarSeriesViewinfo,
    Pie3DSeriesView: pie3DSeriesViewinfo,
    PieSeriesView: pieSeriesViewinfo,
    PointSeriesView: pointSeriesViewinfo,
    SideBySideBarSeriesView: sideBySideBarSeriesViewinfo,
    SideBySideRangeBarSeriesView: sideBySideRangeBarSeriesViewinfo,
    StackedAreaSeriesView: stackedAreaSeriesViewinfo,
    StackedBarSeriesView: stackedBarSeriesViewinfo,
    StepLineSeriesView: stepLineSeriesViewinfo,
    StockSeriesView: stockSeriesViewinfo,
    StepLine3DSeriesView: stepLine3DSeriesViewinfo,
};
