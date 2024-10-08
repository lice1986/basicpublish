﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\metadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Point, Size } from '@devexpress/analytics-core/analytics-elements';
import { extend, nameValidationRules } from '@devexpress/analytics-core/analytics-internal';
import { floatFromModel, fromEnum, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { fontName, fontSize, fontSizeUnit } from '@devexpress/analytics-core/analytics-widgets-metadata';
import { previewBackColor, previewBorderColor, previewBorderDashStyle, previewFont, previewForeColor, previewTextAlignment } from '../../../../common/metadata';
import { DataBindingMode } from '../../../utils/settings';
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
import { LinesEditor } from '../../../widgets/linesEditor';
export const textAlignmentValues = [
    { value: 'TopLeft', displayValue: 'Top Left', localizationId: 'DevExpress.XtraPrinting.TextAlignment.TopLeft' },
    { value: 'MiddleLeft', displayValue: 'Middle Left', localizationId: 'DevExpress.XtraPrinting.TextAlignment.MiddleLeft' },
    { value: 'BottomLeft', displayValue: 'Bottom Left', localizationId: 'DevExpress.XtraPrinting.TextAlignment.BottomLeft' },
    { value: 'TopCenter', displayValue: 'Top Center', localizationId: 'DevExpress.XtraPrinting.TextAlignment.TopCenter' },
    { value: 'MiddleCenter', displayValue: 'Middle Center', localizationId: 'DevExpress.XtraPrinting.TextAlignment.MiddleCenter' },
    { value: 'BottomCenter', displayValue: 'Bottom Center', localizationId: 'DevExpress.XtraPrinting.TextAlignment.BottomCenter' },
    { value: 'TopJustify', displayValue: 'Top Justify', localizationId: 'DevExpress.XtraPrinting.TextAlignment.TopJustify' },
    { value: 'MiddleJustify', displayValue: 'Middle Justify', localizationId: 'DevExpress.XtraPrinting.TextAlignment.MiddleJustify' },
    { value: 'BottomJustify', displayValue: 'Bottom Justify', localizationId: 'DevExpress.XtraPrinting.TextAlignment.BottomJustify' },
    { value: 'TopRight', displayValue: 'Top Right', localizationId: 'DevExpress.XtraPrinting.TextAlignment.TopRight' },
    { value: 'MiddleRight', displayValue: 'Middle Right', localizationId: 'DevExpress.XtraPrinting.TextAlignment.MiddleRight' },
    { value: 'BottomRight', displayValue: 'Bottom Right', localizationId: 'DevExpress.XtraPrinting.TextAlignment.BottomRight' },
];
export const borderDashStyleValues = [
    { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.Solid' },
    { value: 'Dash', displayValue: 'Dash', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.Dash' },
    { value: 'Dot', displayValue: 'Dot', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.Dot' },
    { value: 'DashDot', displayValue: 'Dash-Dot', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.DashDot' },
    { value: 'DashDotDot', displayValue: 'Dash-Dot-Dot', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.DashDotDot' }
];
export const stylePrioritySerializationInfo = [
    { propertyName: 'useBackColor', modelName: '@UseBackColor', defaultVal: true, from: parseBool },
    { propertyName: 'useBorderColor', modelName: '@UseBorderColor', defaultVal: true, from: parseBool },
    { propertyName: 'useBorderDashStyle', modelName: '@UseBorderDashStyle', defaultVal: true, from: parseBool },
    { propertyName: 'useBorders', modelName: '@UseBorders', defaultVal: true, from: parseBool },
    { propertyName: 'useBorderWidth', modelName: '@UseBorderWidth', defaultVal: true, from: parseBool },
    { propertyName: 'useFont', modelName: '@UseFont', defaultVal: true, from: parseBool },
    { propertyName: 'useForeColor', modelName: '@UseForeColor', defaultVal: true, from: parseBool },
    { propertyName: 'usePadding', modelName: '@UsePadding', defaultVal: true, from: parseBool },
    { propertyName: 'useTextAlignment', modelName: '@UseTextAlignment', defaultVal: true, from: parseBool }
];
export const xlsxFormatString = { propertyName: 'xlsxFormatString', modelName: '@XlsxFormatString', defaultVal: '', editor: editorTemplates.getEditor('text'), displayName: 'Xlsx Format String', localizationId: 'DevExpress.XtraReports.UI.XRControl.XlsxFormatString' };
export const name = { propertyName: 'name', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.XtraReports.UI.XRControl.Name', editor: designerEditorTemplates.getEditor('name'), validationRules: nameValidationRules };
export const displayName = { propertyName: 'displayNameObject', localizable: true, modelName: '@DisplayName', editor: editorTemplates.getEditor('text'), defaultVal: '', displayName: 'Display Name', localizationId: 'DevExpress.XtraReports.UI.XtraReport.DisplayName' };
export const text = { propertyName: 'text', modelName: '@Text', defaultVal: '', displayName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRControl.Text', editor: editorTemplates.getEditor('text'), localizable: true };
export const textArea = { propertyName: 'textArea', displayName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRControl.Text', defaultVal: '', localizable: true, editor: extend({}, editorTemplates.getEditor('stringArray'), { editorType: LinesEditor }) };
export const textTrimmingValues = [
    { value: 'None', displayValue: 'None', localizationId: 'DevExpress.Utils.Trimming.None' },
    { value: 'Character', displayValue: 'Character', localizationId: 'DevExpress.Utils.Trimming.Character' },
    { value: 'Word', displayValue: 'Word', localizationId: 'DevExpress.Utils.Trimming.Word' },
    { value: 'EllipsisCharacter', displayValue: 'Ellipsis Character', localizationId: 'DevExpress.Utils.Trimming.EllipsisCharacter' },
    { value: 'EllipsisWord', displayValue: 'Ellipsis Word', localizationId: 'DevExpress.Utils.Trimming.EllipsisWord' },
    { value: 'EllipsisPath', displayValue: 'Ellipsis Path', localizationId: 'DevExpress.Utils.Trimming.EllipsisPath' }
];
export const textTrimming = {
    propertyName: 'textTrimming', modelName: '@TextTrimming', displayName: 'Text Trimming', localizationId: 'DevExpress.XtraReports.UI.XRControl.TextTrimming', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRLabel.TextTrimming.Description', defaultVal: 'Character', editor: editorTemplates.getEditor('combobox'),
    valuesArray: textTrimmingValues
};
export const size = { propertyName: 'size', modelName: '@SizeF', from: Size.fromString, displayName: 'Size', localizationId: 'DevExpress.XtraReports.UI.XRControl.Size', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRControl.SizeF.Description', editor: editorTemplates.getEditor('objecteditor'), localizable: true };
export const location = { propertyName: 'location', modelName: '@LocationFloat', from: Point.fromString, displayName: 'Location', localizationId: 'DevExpress.XtraReports.UI.XRControl.Location', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRControl.LocationF.Description', editor: editorTemplates.getEditor('objecteditor'), localizable: true };
export const defaultBooleanValuesArray = [
    { value: 'True', displayValue: 'True', localizationId: 'DevExpress.Utils.DefaultBoolean.True' },
    { value: 'False', displayValue: 'False', localizationId: 'DevExpress.Utils.DefaultBoolean.False' },
    { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.Utils.DefaultBoolean.Default' }
];
export const tag = { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', localizationId: 'DevExpress.XtraReports.UI.XRControl.Tag', editor: editorTemplates.getEditor('text'), defaultVal: '' };
export const lockedInUserDesigner = { propertyName: '_lockedInUserDesigner', modelName: '@LockedInUserDesigner', defaultVal: false, from: parseBool };
export const visible = { propertyName: 'visible', modelName: '@Visible', localizable: true, defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('bool'), displayName: 'Visible', localizationId: 'DevExpress.XtraReports.UI.XRControl.Visible' };
export const backColor = extend({ displayName: 'Background Color', editor: editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControl.BackColor' }, previewBackColor);
export const foreColor = extend({ displayName: 'Foreground Color', editor: editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControlStyle.ForeColor' }, previewForeColor);
export const font = extend({ displayName: 'Font', editor: editorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRControl.Font.Description', localizable: true }, previewFont);
export const expressionableFont = extend({}, font, { editor: designerEditorTemplates.getEditor('expressionableFont') });
export const expressionableFontInfo = [
    fontName,
    fontSize,
    fontSizeUnit,
    {
        propertyName: 'modificators', editor: designerEditorTemplates.getEditor('fontModificatorsHighlightable')
    },
];
export const borderColor = extend({ displayName: 'Border Color', editor: editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderColor' }, previewBorderColor);
export const borders = { propertyName: 'borders', modelName: '@Borders', displayName: 'Borders', localizationId: 'DevExpress.XtraReports.UI.XRControl.Borders', editor: editorTemplates.getEditor('borders') };
export const borderWidth = { propertyName: 'borderWidth', modelName: '@BorderWidth', displayName: 'Border Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderWidth', from: floatFromModel, editor: editorTemplates.getEditor('numeric') };
export const borderDashStyle = extend({
    editor: editorTemplates.getEditor('combobox'), displayName: 'Border Dash Style', localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderDashStyle',
    valuesArray: [].concat(borderDashStyleValues, [{ value: 'Double', displayValue: 'Double', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.Double' }])
}, previewBorderDashStyle);
export const paddingString = { propertyName: 'padding', modelName: '@Padding' };
export const padding = { displayName: 'Padding', editor: editorTemplates.getEditor('objecteditor'), propertyName: 'paddingObj', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.PaddingInfo', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRControl.Padding.Description' };
export const defaultTextPadding = '2,2,0,0,96';
export const textAlignment = extend({
    displayName: 'Text Alignment',
    modelName: '@TextAlignment',
    editor: editorTemplates.getEditor('textAlignment'),
    localizationId: 'DevExpress.XtraReports.UI.XRControl.TextAlignment'
}, previewTextAlignment);
export const textFitMode = {
    propertyName: 'textFitMode',
    modelName: '@TextFitMode', displayName: 'Text Fit Mode', localizationId: 'DevExpress.XtraReports.UI.XRLabel.TextFitMode', defaultVal: 'None',
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.TextFitMode.None' },
        { value: 'GrowOnly', displayValue: 'Grow Only', localizationId: 'DevExpress.XtraReports.UI.TextFitMode.GrowOnly' },
        { value: 'ShrinkOnly', displayValue: 'Shrink Only', localizationId: 'DevExpress.XtraReports.UI.TextFitMode.ShrinkOnly' },
        { value: 'ShrinkAndGrow', displayValue: 'Shrink And Grow', localizationId: 'DevExpress.XtraReports.UI.TextFitMode.ShrinkAndGrow' }
    ]
};
export const angle = { propertyName: 'angle', modelName: '@Angle', defaultVal: 0, from: floatFromModel, displayName: 'Angle', localizationId: 'DevExpress.XtraReports.UI.XRLabel.Angle', editor: editorTemplates.getEditor('numeric') };
export const canGrow = { propertyName: 'canGrow', modelName: '@CanGrow', defaultVal: true, from: parseBool, displayName: 'Can Grow', localizationId: 'DevExpress.XtraReports.UI.XRControl.CanGrow', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRLabel.CanGrow.Description', editor: editorTemplates.getEditor('bool') };
export const canShrink = { propertyName: 'canShrink', modelName: '@CanShrink', defaultVal: false, from: parseBool, displayName: 'Can Shrink', localizationId: 'DevExpress.XtraReports.UI.XRControl.CanShrink', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRLabel.CanShrink.Description', editor: editorTemplates.getEditor('bool') };
export const multiline = { propertyName: 'multiline', modelName: '@Multiline', defaultVal: false, from: parseBool, displayName: 'Multiline', localizationId: 'DevExpress.XtraReports.UI.XRLabel.Multiline', editor: editorTemplates.getEditor('bool') };
export const wordWrap = { propertyName: 'wordWrap', modelName: '@WordWrap', defaultVal: true, from: parseBool, displayName: 'Word Wrap', localizationId: 'DevExpress.XtraReports.UI.XRControl.WordWrap', editor: editorTemplates.getEditor('bool') };
export const allowMarkupText = { propertyName: 'allowMarkupText', modelName: '@AllowMarkupText', defaultVal: false, from: parseBool, displayName: 'Allow Markup Text', localizationId: 'DevExpress.XtraReports.UI.XRLabel.AllowMarkupText', editor: editorTemplates.getEditor('bool') };
export const autoWidth = { propertyName: 'autoWidth', modelName: '@AutoWidth', defaultVal: false, from: parseBool, displayName: 'Auto Width', localizationId: 'DevExpress.XtraReports.UI.XRLabel.AutoWidth', editor: editorTemplates.getEditor('bool') };
export const keepTogether = { propertyName: 'keepTogether', modelName: '@KeepTogether', defaultVal: true, from: parseBool, displayName: 'Keep Together', localizationId: 'DevExpress.XtraReports.UI.XRControl.KeepTogether', editor: editorTemplates.getEditor('bool') };
export const keepTogetherDefaultValueFalse = { propertyName: 'keepTogether', modelName: '@KeepTogether', defaultVal: false, from: parseBool, displayName: 'Keep Together', localizationId: 'DevExpress.XtraReports.UI.XRControl.KeepTogether', editor: editorTemplates.getEditor('bool') };
export const processDuplicatesTarget = {
    propertyName: 'processDuplicatesTarget', modelName: '@ProcessDuplicatesTarget', displayName: 'Process Duplicates Target', localizationId: 'DevExpress.XtraReports.UI.XRLabel.ProcessDuplicatesTarget',
    editor: editorTemplates.getEditor('combobox'), defaultVal: 'Value', from: fromEnum,
    valuesArray: [
        { value: 'Value', displayValue: 'Value', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesTarget.Value' },
        { value: 'Tag', displayValue: 'Tag', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesTarget.Tag' }
    ]
};
export const processDuplicatesMode = {
    propertyName: 'processDuplicatesMode', modelName: '@ProcessDuplicatesMode', displayName: 'Process Duplicates Mode', localizationId: 'DevExpress.XtraReports.UI.XRLabel.ProcessDuplicatesMode',
    editor: editorTemplates.getEditor('combobox'), defaultVal: 'Leave', from: fromEnum,
    valuesArray: [
        { value: 'Leave', displayValue: 'Leave', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.Leave' },
        { value: 'Merge', displayValue: 'Merge', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.Merge' },
        { value: 'Suppress', displayValue: 'Suppress', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.Suppress' },
        { value: 'SuppressAndShrink', displayValue: 'Suppress and Shrink', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.SuppressAndShrink' }
    ]
};
export const processNullValues = {
    propertyName: 'processNullValues',
    modelName: '@ProcessNullValues', displayName: 'Process Null Values', localizationId: 'DevExpress.XtraReports.UI.XRLabel.ProcessNullValues',
    editor: editorTemplates.getEditor('combobox'), defaultVal: 'Leave', from: fromEnum,
    valuesArray: [
        { value: 'Leave', displayValue: 'Leave', localizationId: 'DevExpress.XtraReports.UI.ValueSuppressType.Leave' },
        { value: 'Suppress', displayValue: 'Suppress', localizationId: 'DevExpress.XtraReports.UI.ValueSuppressType.Suppress' },
        { value: 'SuppressAndShrink', displayValue: 'Suppress and Shrink', localizationId: 'DevExpress.XtraReports.UI.ValueSuppressType.SuppressAndShrink' },
    ]
};
export const reportPrintOptionsSerializationInfo = [
    { propertyName: 'printOnEmptyDataSource', defaultVal: true, from: parseBool, modelName: '@PrintOnEmptyDataSource', displayName: 'Print when Data Source is Empty', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.PrintOnEmptyDataSource', editor: editorTemplates.getEditor('bool') },
    { propertyName: 'detailCountAtDesignTime', defaultVal: 0, from: floatFromModel, modelName: '@DetailCountAtDesignTime', displayName: 'Detail Count at Design Time', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCountAtDesignTime', editor: editorTemplates.getEditor('numeric') },
    { propertyName: 'detailCountOnEmptyDataSource', defaultVal: 1, from: floatFromModel, modelName: '@DetailCountOnEmptyDataSource', displayName: 'Detail Count when Data Source is Empty', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCountOnEmptyDataSource', editor: editorTemplates.getEditor('numeric') },
    { propertyName: 'blankDetailCount', defaultVal: 0, from: floatFromModel, modelName: '@BlankDetailCount', displayName: 'Blank Detail Count', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.BlankDetailCount', editor: editorTemplates.getEditor('numeric') },
    { propertyName: 'detailCount', defaultVal: 0, from: floatFromModel, modelName: '@DetailCount', displayName: 'Detail Count', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCount', editor: editorTemplates.getEditor('numeric') }
];
export const dataAdapter = { propertyName: 'dataAdapter', modelName: '@DataAdapter', link: true, editor: null };
export const dataSource = { propertyName: 'dataSource', modelName: '@DataSource', displayName: 'Data Source', localizationId: 'DevExpress.XtraReports.UI.XtraReportBase.DataSource', link: true, editor: designerEditorTemplates.getEditor('dataSource') };
export const dataMember = { propertyName: 'dataMember', modelName: '@DataMember', displayName: 'Data Member', localizationId: 'DevExpress.XtraReports.UI.XtraReportBase.DataMember', defaultVal: '', editor: editorTemplates.getEditor('dataMember') };
export const filterString = { propertyName: '_filterString', modelName: '@FilterString' };
export const filterStringEditable = { propertyName: 'filterString', displayName: 'Filter String', localizationId: 'DevExpress.XtraReports.UI.XtraReportBase.FilterString', defaultVal: '', editor: editorTemplates.getEditor('filterEditor') };
export const bookmark = { propertyName: 'bookmark', localizable: true, modelName: '@Bookmark', displayName: 'Bookmark', localizationId: 'DevExpress.XtraReports.UI.XRControl.Bookmark', editor: editorTemplates.getEditor('text') };
export const bookmarkParent = { propertyName: 'bookmarkParent', modelName: '@BookmarkParent', link: true, displayName: 'Parent Bookmark', localizationId: 'DevExpress.XtraReports.UI.XRControl.BookmarkParent', defaultVal: null, editor: designerEditorTemplates.getEditor('reportExplorer') };
export const navigateUrl = { propertyName: 'navigateUrl', modelName: '@NavigateUrl', displayName: 'Navigation URL', localizationId: 'DevExpress.XtraReports.UI.XRControl.NavigateUrl', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const target = { propertyName: 'target', modelName: '@Target', displayName: 'Navigation Target', localizationId: 'DevExpress.XtraReports.UI.XRControl.Target', editor: editorTemplates.getEditor('text'), defaultVal: '' };
export const nullValueText = { propertyName: 'nullValueText', modelName: '@NullValueText', localizable: true, displayName: 'Null Value Text', localizationId: 'DevExpress.XtraReports.UI.XRControl.NullValueText', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRLabel.NullValueText.Description', defaultVal: '', editor: editorTemplates.getEditor('text') };
export function getSummaryFunctionValues() {
    if (DataBindingMode() === 'Bindings') {
        const values = summaryFunctionValues.concat([]);
        values.push({ value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Custom' });
        return values;
    }
    return summaryFunctionValues;
}
export const summaryFunctionValues = [
    { value: 'Avg', displayValue: 'Average', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Avg' },
    { value: 'Count', displayValue: 'Count', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Count' },
    { value: 'Sum', displayValue: 'Sum', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Sum' },
    { value: 'RunningSum', displayValue: 'Running Summary', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.RunningSum' },
    { value: 'CarryoverSum', displayValue: 'Carryover Summary', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.CarryoverSum' },
    { value: 'Percentage', displayValue: 'Percentage', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Percentage' },
    { value: 'Max', displayValue: 'Max', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Max' },
    { value: 'Min', displayValue: 'Min', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Min' },
    { value: 'Median', displayValue: 'Median', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Median' },
    { value: 'Var', displayValue: 'Variance', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Var' },
    { value: 'VarP', displayValue: 'Population Variance', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.VarP' },
    { value: 'StdDev', displayValue: 'Standard Deviation', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.StdDev' },
    { value: 'StdDevP', displayValue: 'Standard Population Deviation', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.StdDevP' },
    { value: 'DAvg', displayValue: 'Average (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DAvg' },
    { value: 'DCount', displayValue: 'Count (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DCount' },
    { value: 'DSum', displayValue: 'Summary (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DSum' },
    { value: 'DVar', displayValue: 'Variance (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DVar' },
    { value: 'DVarP', displayValue: 'Population Variance (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DVarP' },
    { value: 'DStdDev', displayValue: 'Standard Deviation (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DStdDev' },
    { value: 'DStdDevP', displayValue: 'Standard Population Deviation (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DStdDevP' },
    { value: 'RecordNumber', displayValue: 'Record Number', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.RecordNumber' }
];
export const textFormatString = { propertyName: 'textFormatString', localizable: true, modelName: '@TextFormatString', defaultVal: '', editor: designerEditorTemplates.getEditor('formatEditor'), displayName: 'Text Format String', localizationId: 'DevExpress.XtraReports.UI.XRControl.TextFormatString', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRLabel.TextFormatString.Description' };
export function createSummarySerializationInfo(summaryFunctions) {
    return [
        {
            propertyName: 'Running', modelName: '@Running', defaultVal: 'None',
            editor: editorTemplates.getEditor('combobox'), displayName: 'Running', localizationId: 'DevExpress.XtraReports.UI.XRSummary.Running',
            valuesArray: [
                { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.SummaryRunning.None' },
                { value: 'Group', displayValue: 'Group', localizationId: 'DevExpress.XtraReports.UI.SummaryRunning.Group' },
                { value: 'Report', displayValue: 'Report', localizationId: 'DevExpress.XtraReports.UI.SummaryRunning.Report' },
                { value: 'Page', displayValue: 'Page', localizationId: 'DevExpress.XtraReports.UI.SummaryRunning.Page' }
            ]
        },
        {
            propertyName: 'Func', modelName: '@Func', defaultVal: 'Sum',
            editor: editorTemplates.getEditor('combobox'), displayName: 'Function', localizationId: 'DevExpress.XtraReports.UI.XRSummary.Func',
            get valuesArray() {
                return summaryFunctions || getSummaryFunctionValues();
            }
        },
        { propertyName: 'formatString', visible: false, modelName: '@FormatString', defaultVal: '', editor: designerEditorTemplates.getEditor('formatEditor'), displayName: 'Format String', localizationId: 'DevExpress.XtraReports.UI.XRSummary.FormatString' },
        { propertyName: 'ignoreNullValues', modelName: '@IgnoreNullValues', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool'), displayName: 'Ignore Null Values', localizationId: 'DevExpress.XtraReports.UI.XRSummary.IgnoreNullValues', },
        { propertyName: 'treatStringsAsNumerics', modelName: '@TreatStringsAsNumerics', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('bool'), displayName: 'Treat Strings As Numerics', localizationId: 'DevExpress.XtraReports.UI.XRSummary.TreatStringsAsNumerics' }
    ];
}
export const summarySerializationInfo = createSummarySerializationInfo();
export const summary = { propertyName: 'Summary', modelName: 'Summary', info: summarySerializationInfo, editor: designerEditorTemplates.getEditor('summaryEditor'), displayName: 'Summary', localizationId: 'DevExpress.XtraReports.UI.XRLabel.Summary' };
export const reportPrintOptions = { propertyName: 'reportPrintOptions', modelName: 'ReportPrintOptions', info: reportPrintOptionsSerializationInfo, editor: editorTemplates.getEditor('objecteditor'), displayName: 'Report Print Options', localizationId: 'DevExpress.XtraReports.UI.XtraReport.ReportPrintOptions', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XtraReportBase.ReportPrintOptions.Description' };
export const lineWidth = { propertyName: 'lineWidth', modelName: '@LineWidth', defaultVal: 1, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Line Width', localizationId: 'DevExpress.XtraReports.UI.XRLine.LineWidth' };
export const lineStyle = {
    propertyName: 'lineStyle',
    modelName: '@LineStyle', defaultVal: 'Solid', editor: editorTemplates.getEditor('combobox'), displayName: 'Line Style', localizationId: 'DevExpress.XtraReports.UI.XRLine.LineStyle',
    valuesArray: [
        { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.DashStyle.Solid' },
        { value: 'Dash', displayValue: 'Dash', localizationId: 'DevExpress.XtraCharts.DashStyle.Dash' },
        { value: 'Dot', displayValue: 'Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.Dot' },
        { value: 'DashDot', displayValue: 'Dash-Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.DashDot' },
        { value: 'DashDotDot', displayValue: 'Dash-Dot-Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.DashDotDot' }
    ]
};
export const dpi = { propertyName: 'dpi', modelName: '@Dpi', defaultVal: 100, from: floatFromModel };
export const canPublish = { propertyName: 'canPublish', modelName: '@CanPublish', displayName: 'Can Publish', localizationId: 'DevExpress.XtraReports.UI.XRControl.CanPublish', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('bool') };
export const rtlValues = [
    { value: 'No', displayValue: 'No', localizationId: 'DevExpress.XtraReports.UI.RightToLeft.No' },
    { value: 'Yes', displayValue: 'Yes', localizationId: 'DevExpress.XtraReports.UI.RightToLeft.Yes' },
];
const rtlValuesWithInherit = rtlValues.concat([
    { value: 'Inherit', displayValue: 'Inherit', localizationId: 'DevExpress.XtraReports.UI.RightToLeft.Inherit' }
]);
export const rtl = {
    propertyName: 'rightToLeft', modelName: '@RightToLeft', displayName: 'Right To Left', localizationId: 'DevExpress.XtraReports.UI.XRControl.RightToLeft', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XtraReport.RightToLeft.Description', defaultVal: 'Inherit', editor: editorTemplates.getEditor('combobox'),
    valuesArray: rtlValuesWithInherit
};
export const imageType = {
    propertyName: 'imageType', displayName: 'Image Type', localizationId: 'DevExpress.XtraReports.UI.XRChart.ImageType', modelName: '@ImageType', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Metafile', valuesArray: [
        { value: 'Metafile', displayValue: 'Metafile', localizationId: 'DevExpress.XtraReports.UI.ChartImageType.Metafile' },
        { value: 'Bitmap', displayValue: 'Bitmap', localizationId: 'DevExpress.XtraReports.UI.ChartImageType.Bitmap' }
    ]
};
export const paddingGroup = [paddingString, padding];
export const defaultAccessibleRole = { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.Default' };
export const accessibleRoleValues = [
    defaultAccessibleRole,
    { value: 'Heading1', displayValue: 'Heading 1', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.Heading1' },
    { value: 'Heading2', displayValue: 'Heading 2', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.Heading2' },
    { value: 'Heading3', displayValue: 'Heading 3', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.Heading3' },
    { value: 'Heading4', displayValue: 'Heading 4', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.Heading4' },
    { value: 'Heading5', displayValue: 'Heading 5', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.Heading5' },
    { value: 'Heading6', displayValue: 'Heading 6', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.Heading6' },
];
export const accessibleRole = {
    propertyName: 'accessibleRole', modelName: '@AccessibleRole', displayName: 'Accessible Role', localizationId: 'DevExpress.XtraReports.UI.XRControl.AccessibleRole', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRLabel.AccessibleRole.Description', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'),
    valuesArray: accessibleRoleValues
};
export const accessibleDescription = {
    propertyName: 'accessibleDescription', displayName: 'Accessible Description', localizationId: 'DevExpress.XtraReports.UI.XRControl.AccessibleDescription', localizable: true, modelName: '@AccessibleDescription', editor: editorTemplates.getEditor('text')
};
export const cells = { propertyName: 'cells', modelName: 'Cells', array: true };
export const sortOrder = {
    propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'Sort Order', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.SortOrder', defaultVal: 'None', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        {
            value: 'None', displayValue: 'None', localizationId: 'DevExpress.Data.ColumnSortOrder.None'
        }, {
            value: 'Ascending', displayValue: 'Ascending', localizationId: 'DevExpress.Data.ColumnSortOrder.Ascending'
        }, {
            value: 'Descending', displayValue: 'Descending', localizationId: 'DevExpress.Data.ColumnSortOrder.Descending'
        }
    ]
};
