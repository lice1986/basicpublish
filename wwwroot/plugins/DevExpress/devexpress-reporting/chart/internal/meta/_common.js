﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_common.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { colorFromString, colorToString, floatFromModel, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates as analyticEditorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { ChartComponentModelWithText } from '../_localizableElementCollection';
export const defaultBooleanValues = [
    { value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' },
    { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' },
    { value: 'Default', displayValue: 'Default', localizationId: 'StringId.DefaultBooleanDefault' }
];
export const scaleTypeValues = [
    { value: 'Qualitative', displayValue: 'Qualitative', localizationId: 'DevExpress.XtraCharts.ScaleType.Qualitative' },
    { value: 'Numerical', displayValue: 'Numerical', localizationId: 'DevExpress.XtraCharts.ScaleType.Numerical' },
    { value: 'DateTime', displayValue: 'DateTime', localizationId: 'DevExpress.XtraCharts.ScaleType.DateTime' },
    { value: 'Auto', displayValue: 'Auto', localizationId: 'DevExpress.XtraCharts.ScaleType.Auto' }
];
export const stringAlignmentValues = [
    { value: 'Near', displayValue: 'Near', localizationId: 'ChartStringId.WizStringAlignmentNear' },
    { value: 'Center', displayValue: 'Center', localizationId: 'ChartStringId.WizStringAlignmentCenter' },
    { value: 'Far', displayValue: 'Far', localizationId: 'ChartStringId.WizStringAlignmentFar' }
];
export const angle = { propertyName: 'angle', modelName: '@Angle', defaultVal: 0, from: floatFromModel, displayName: 'Angle', editor: analyticEditorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraReports.UI.XRLabel.Angle' };
export const borderColor = { propertyName: 'borderColor', modelName: '@BorderColor', from: colorFromString, toJsonObject: colorToString, displayName: 'Border Color', editor: analyticEditorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderColor' };
export const backColor = { propertyName: 'backColor', modelName: '@BackColor', from: colorFromString, toJsonObject: colorToString, displayName: 'Background Color', editor: analyticEditorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControl.BackColor' };
export const dataMember = { propertyName: 'dataMember', modelName: '@DataMember' };
export const text = { propertyName: 'text', modelName: '@Text', defaultVal: '', displayName: 'Text', editor: analyticEditorTemplates.getEditor('text'), localizable: true, localizationId: 'ASPxReportsStringId.ExportName_txt' };
export const visible = { propertyName: 'visible', modelName: '@Visible', defaultVal: true, from: parseBool, editor: analyticEditorTemplates.getEditor('bool'), displayName: 'Visible', localizationId: 'DevExpress.XtraReports.UI.XRControl.Visible' };
export const name = { propertyName: 'name', modelName: '@Name', displayName: 'Name', editor: analyticEditorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraReports.UI.XRControl.Name' };
export const tag = { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', editor: analyticEditorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraReports.UI.XRControl.Tag' };
export const legendText = { propertyName: 'legendText', modelName: '@LegendText', displayName: 'Legend Text', localizable: true, editor: analyticEditorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraCharts.Strip.LegendText' };
export const showInLegend = { propertyName: 'showInLegend', modelName: '@ShowInLegend', displayName: 'Show In Legend', defaultVal: true, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, localizationId: 'DevExpress.XtraCharts.Indicator.ShowInLegend' };
export const thickness = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', defaultVal: 1, editor: analyticEditorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.TickmarksBase.Thickness' };
export const visibility = { propertyName: 'visibility', modelName: '@Visibility', displayName: 'Visibility', defaultVal: 'Default', editor: analyticEditorTemplates.getEditor('combobox'), valuesArray: defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.BorderBase.Visibility' };
export const color = { propertyName: 'color', modelName: '@Color', displayName: 'Color', from: colorFromString, toJsonObject: colorToString, editor: analyticEditorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraCharts.SeriesViewBase.Color' };
export const titleAlignment = { propertyName: 'titleAlignment', modelName: '@Alignment', displayName: 'Alignment', defaultVal: 'Center', editor: analyticEditorTemplates.getEditor('combobox'), valuesArray: stringAlignmentValues, localizationId: 'DevExpress.XtraReports.UI.XRBarCode.Alignment' };
export const textPattern = { propertyName: 'textPattern', modelName: '@TextPattern', displayName: 'Text Pattern', editor: analyticEditorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraCharts.TotalLabel.TextPattern' };
export const textAlignment = { propertyName: 'textAlignment', modelName: '@TextAlignment', displayName: 'Text Alignment', editor: analyticEditorTemplates.getEditor('combobox'), valuesArray: stringAlignmentValues, localizationId: 'DevExpress.XtraReports.UI.XRControl.TextAlignment' };
export const maxLineCount = { propertyName: 'maxLineCount', modelName: '@MaxLineCount', displayName: 'Max Line Count', editor: analyticEditorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.SeriesLabelBase.MaxLineCount' };
export const maxWidth = { propertyName: 'maxWidth', modelName: '@MaxWidth', displayName: 'Max Width', editor: analyticEditorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraPivotGrid.PivotGridOptionsSelection.MaxWidth' };
export const textColor = { propertyName: 'textColor', modelName: '@TextColor', displayName: 'Text Color', from: colorFromString, toJsonObject: colorToString, editor: analyticEditorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraCharts.TotalLabel.TextColor' };
export const antialiasing = { propertyName: 'antialiasing', modelName: '@Antialiasing', displayName: 'Antialiasing', editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, localizationId: 'DevExpress.XtraCharts.SwiftPlotSeriesView.Antialiasing' };
export const font = { propertyName: 'font', modelName: '@Font', displayName: 'Font', defaultVal: 'Tahoma, 8pt', editor: analyticEditorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font' };
export const titleSerializationsInfo = [text, titleAlignment, textColor];
export const title = { propertyName: 'title', modelName: 'Title', displayName: 'Title', defaultVal: {}, editor: analyticEditorTemplates.getEditor('objecteditor'), localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Title', type: ChartComponentModelWithText };
export const enableAxisXZooming = { propertyName: 'enableAxisXZooming', modelName: '@EnableAxisXZooming', displayName: 'Enable Axis X Zooming' };
export const enableAxisXScrolling = { propertyName: 'enableAxisXScrolling', modelName: '@EnableAxisXScrolling', displayName: 'Enable Axis X Scrolling' };
export const enableAxisYZooming = { propertyName: 'enableAxisYZooming', modelName: '@EnableAxisYZooming', displayName: 'Enable Axis Y Zooming' };
export const enableAxisYScrolling = { propertyName: 'enableAxisYScrolling', modelName: '@EnableAxisYScrolling', displayName: 'Enable Axis Y Scrolling' };
export const rotated = { propertyName: 'rotated', modelName: '@Rotated', displayName: 'Rotated', defaultVal: false, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, localizationId: 'DevExpress.XtraCharts.XYDiagram.Rotated' };
export const typeNameNotShow = { propertyName: 'typeNameSerializable', modelName: '@TypeNameSerializable' };
export const left = { propertyName: 'left', modelName: '@Left', displayName: 'Left', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Left', editor: analyticEditorTemplates.getEditor('numeric') };
export const right = { propertyName: 'right', modelName: '@Top', displayName: 'Top', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Top', editor: analyticEditorTemplates.getEditor('numeric') };
export const top = { propertyName: 'top', modelName: '@Right', displayName: 'Right', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Right', editor: analyticEditorTemplates.getEditor('numeric') };
export const bottom = { propertyName: 'bottom', modelName: '@Bottom', displayName: 'Bottom', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Bottom', editor: analyticEditorTemplates.getEditor('numeric') };
export const margin = { propertyName: 'chartMargins', modelName: 'Margins', displayName: 'Margins', info: [left, right, top, bottom], editor: analyticEditorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XtraReport.Margins' };
export const font18 = { propertyName: 'font18', modelName: '@Font', displayName: 'Font', defaultVal: 'Tahoma, 18pt', editor: analyticEditorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font' };
export const font12 = { propertyName: 'font12', modelName: '@Font', displayName: 'Font', defaultVal: 'Tahoma, 12pt', editor: analyticEditorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font' };
export const font8 = { propertyName: 'font8', modelName: '@Font', displayName: 'Font', defaultVal: 'Tahoma, 8pt', editor: analyticEditorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font' };
const paneTitleSerializationsInfo = [antialiasing, font12, visibility].concat(titleSerializationsInfo), paneTitle = extend(true, {}, title, { info: paneTitleSerializationsInfo });
export const paneSerializationsInfo = [enableAxisXScrolling, enableAxisYScrolling, enableAxisYZooming, enableAxisXZooming, backColor, borderColor, paneTitle];
export const defaultPane = { propertyName: 'defaultPane', modelName: 'DefaultPane', displayName: 'Default Pane', localizationId: 'ChartStringId.DefaultPaneName', info: paneSerializationsInfo, defaultVal: {}, editor: analyticEditorTemplates.getEditor('objecteditor') };
export const additionalPaneSerializationsInfo = [name].concat(paneSerializationsInfo);
export const filterString = { propertyName: '_filterString', modelName: '@FilterString' };
export const filterStringEditable = { propertyName: 'filterString', displayName: 'Filter String', localizationId: 'DevExpress.XtraReports.UI.XtraReportBase.FilterString', defaultVal: '', editor: analyticEditorTemplates.getEditor('filterEditor') };
export const argumentSerializable = { propertyName: 'argumentSerializable', modelName: '@ArgumentSerializable', displayName: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesPoint.Argument', editor: analyticEditorTemplates.getEditor('text') };
