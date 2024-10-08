﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\metadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { formatUnicorn } from '@devexpress/analytics-core/analytics-internal-native';
import { colorFromString, colorToString, floatFromModel, fromEnum, parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates as analyticEditorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { editorTemplates } from '../widgets/_editorTemplates';
export const pageBorderColor = { propertyName: 'pageBorderColor', modelName: '@PageBorderColor', from: colorFromString, toJsonObject: colorToString, displayName: 'Page Border Color', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageBorderColor', editor: analyticEditorTemplates.getEditor('customColorEditor'), defaultVal: 'Black' };
export const pageBorderWidth = { propertyName: 'pageBorderWidth', modelName: '@PageBorderWidth', displayName: 'Page Border Width', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageBorderWidth', from: floatFromModel, editor: analyticEditorTemplates.getEditor('numeric'), defaultVal: 1 };
export const pageRange = { propertyName: 'pageRange', modelName: '@PageRange', displayName: 'Page Range', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageRange', editor: analyticEditorTemplates.getEditor('text'), defaultVal: '' };
export const expotOptionsTitle = { propertyName: 'title', modelName: '@Title', displayName: 'Title', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.Title', editor: analyticEditorTemplates.getEditor('text'), defaultVal: 'Document' };
export const htmlTableLayout = { propertyName: 'tableLayout', modelName: '@TableLayout', displayName: 'Table Layout', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.TableLayout', editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, defaultVal: true };
export const docxTableLayout = { propertyName: 'tableLayout', modelName: '@TableLayout', displayName: 'Table Layout', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions.TableLayout', editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, defaultVal: false };
export const allowURLsWithJSContent = { propertyName: 'allowURLsWithJSContent', modelName: '@AllowURLsWithJSContent', displayName: 'Allow URLs with JS Content', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.AllowURLsWithJSContent', editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, defaultVal: false };
export const rasterizationResolution = { propertyName: 'rasterizationResolution', modelName: '@RasterizationResolution', displayName: 'Rasterization Resolution', localizationId: 'DevExpress.XtraPrinting.PageByPageExportOptionsBase.RasterizationResolution', editor: analyticEditorTemplates.getEditor('numeric'), defaultVal: 96 };
export const rasterizeImages = { propertyName: 'rasterizeImages', modelName: '@RasterizeImages', displayName: 'Rasterize Images', localizationId: 'DevExpress.XtraPrinting.PageByPageExportOptionsBase.RasterizeImages', defaultVal: false, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool };
export const useHRefHyperlinks = { propertyName: 'useHRefHyperlinks', modelName: '@UseHRefHyperlinks', displayName: 'Use HRef Hyperlinks', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.UseHRefHyperlinks', editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, defaultVal: false };
export const exportWatermarks = { propertyName: 'exportWatermarks', modelName: '@ExportWatermarks', displayName: 'Export Watermarks', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.ExportWatermarks', defaultVal: true, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool };
export const inlineCss = { propertyName: 'inlineCss', modelName: '@InlineCss', displayName: 'Inline CSS', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.InlineCss', defaultVal: false, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool };
export const removeSecondarySymbols = { propertyName: 'removeSecondarySymbols', modelName: '@RemoveSecondarySymbols', displayName: 'Remove Secondary Symbols', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.RemoveSecondarySymbols', editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, defaultVal: false };
export const characterSet = {
    propertyName: 'characterSet', modelName: '@CharacterSet', displayName: 'Character Set', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.CharacterSet', editor: analyticEditorTemplates.getEditor('combobox'), defaultVal: 'utf-8',
    valuesArray: [{ value: 'windows-1256', displayValue: 'Arabic (Windows)' }, { value: 'iso-8859-4', displayValue: 'Baltic (ISO)' }, { value: 'windows-1257', displayValue: 'Baltic (Windows)' }, { value: 'iso-8859-2', displayValue: 'Central European (ISO)' }, { value: 'windows-1250', displayValue: 'Central European (Windows)' }, { value: 'iso-8859-5', displayValue: 'Cyrillic (ISO)' }, { value: 'koi8-r', displayValue: 'Cyrillic (KOI8-r)' }, { value: 'windows-1251', displayValue: 'Cyrillic (Windows)' }, { value: 'iso-8859-15', displayValue: 'Latin 9 (ISO)' }, { value: 'utf-7', displayValue: 'Unicode (UTF-7)' }, { value: 'utf-8', displayValue: 'Unicode (UTF-8)' }, { value: 'iso-8859-1', displayValue: 'Western European (ISO)' }, { value: 'windows-1252', displayValue: 'Western European (Windows)' }]
};
export function getExportModeValues(format = 'Html', preview, merged) {
    const singleFile = { value: 'SingleFile', displayValue: 'Single File', localizationId: formatUnicorn('DevExpress.XtraPrinting.{0}ExportMode.SingleFile', format) };
    const singleFilePageByPage = { value: 'SingleFilePageByPage', displayValue: 'Single File (Page-by-Page)', localizationId: formatUnicorn('DevExpress.XtraPrinting.{0}ExportMode.SingleFilePageByPage', format) };
    const differentFiles = { value: 'DifferentFiles', displayValue: 'Different Files', localizationId: formatUnicorn('DevExpress.XtraPrinting.{0}ExportMode.DifferentFiles', format) };
    if (merged) {
        return [singleFilePageByPage];
    }
    else if (preview) {
        return [singleFile, singleFilePageByPage];
    }
    else {
        return [singleFile, singleFilePageByPage, differentFiles];
    }
}
export const exportPageBreaks = { propertyName: 'exportPageBreaks', modelName: '@ExportPageBreaks', displayName: 'Export Page Breaks', localizationId: 'DevExpress.XtraPrinting.FormattedTextExportOptions.ExportPageBreaks', defaultVal: true, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool };
export const rtfExportMode = {
    propertyName: 'rtfExportMode', modelName: '@ExportMode', defaultVal: 'SingleFilePageByPage',
    editor: analyticEditorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.RtfExportOptions.ExportMode',
    valuesArray: getExportModeValues('Rtf', true)
};
export const docxExportMode = {
    propertyName: 'docxExportMode', modelName: '@ExportMode', defaultVal: 'SingleFilePageByPage',
    editor: analyticEditorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions.ExportMode',
    valuesArray: getExportModeValues('Docx', true)
};
export const htmlExportMode = {
    propertyName: 'htmlExportMode', modelName: '@ExportMode', defaultVal: 'SingleFile',
    editor: analyticEditorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.ExportMode',
    valuesArray: getExportModeValues('Html')
};
export const embedImagesInHTML = {
    propertyName: 'embedImagesInHTML', modelName: '@EmbedImagesInHTML', defaultVal: false,
    editor: analyticEditorTemplates.getEditor('bool'), from: parseBool, displayName: 'Embed Images In HTML', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptions.EmbedImagesInHTML', descriptionLocalizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.EmbedImagesInHTML.Description'
};
export const imageExportMode = {
    propertyName: 'imageExportMode', modelName: '@ExportMode', defaultVal: 'SingleFile',
    editor: analyticEditorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.ExportMode',
    valuesArray: getExportModeValues('Image')
};
export const xlsExportMode = {
    propertyName: 'xlsExportMode', modelName: '@ExportMode', defaultVal: 'SingleFile',
    editor: analyticEditorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.ExportMode',
    valuesArray: getExportModeValues('Xls')
};
export const xlsxExportMode = {
    propertyName: 'xlsxExportMode', modelName: '@ExportMode', defaultVal: 'SingleFile',
    editor: analyticEditorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.XlsxExportOptions.ExportMode',
    valuesArray: getExportModeValues('Xlsx')
};
function getTextExportModeValues() {
    return [
        { value: 'Text', displayValue: 'Text', localizationId: 'DevExpress.XtraPrinting.TextExportMode.Text' },
        { value: 'Value', displayValue: 'Value', localizationId: 'DevExpress.XtraPrinting.TextExportMode.Value' }
    ];
}
export const textExportMode = {
    propertyName: 'textExportMode', modelName: '@TextExportMode', displayName: 'Text Export Mode', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.TextExportMode', defaultVal: 'Text', editor: analyticEditorTemplates.getEditor('combobox'),
    valuesArray: getTextExportModeValues()
};
export const xlsTextExportMode = {
    propertyName: 'textExportMode', modelName: '@TextExportMode', displayName: 'Text Export Mode', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.TextExportMode', defaultVal: 'Value', editor: analyticEditorTemplates.getEditor('combobox'),
    valuesArray: getTextExportModeValues()
};
export const csvTextSeparator = { propertyName: 'separator', modelName: '@Separator', defaultVal: '', displayName: 'Separator', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.Separator', descriptionLocalizationId: 'DevExpress.XtraPrinting.CsvExportOptions.Separator.Description', editor: editorTemplates.csvSeparator };
export const useCustomSeparator = { propertyName: 'useCustomSeparator', displayName: 'Use Custom Separator', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions.UseCustomSeparator', editor: analyticEditorTemplates.getEditor('bool') };
export const textEncodingType = {
    propertyName: 'encodingType', modelName: '@EncodingType', displayName: 'Encoding', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.Encoding', editor: analyticEditorTemplates.getEditor('combobox'), defaultVal: 'Default', from: fromEnum,
    valuesArray: [
        { value: 'Default', displayValue: 'Windows-1252', localizationId: 'DevExpress.XtraPrinting.EncodingType.Default' },
        { value: 'ASCII', displayValue: 'us-ascii', localizationId: 'DevExpress.XtraPrinting.EncodingType.ASCII' },
        { value: 'Unicode', displayValue: 'utf-16', localizationId: 'DevExpress.XtraPrinting.EncodingType.Unicode' },
        { value: 'BigEndianUnicode', displayValue: 'utf-16BE', localizationId: 'DevExpress.XtraPrinting.EncodingType.BigEndianUnicode' },
        { value: 'UTF7', displayValue: 'utf-7', localizationId: 'DevExpress.XtraPrinting.EncodingType.UTF7' },
        { value: 'UTF8', displayValue: 'utf-8', localizationId: 'DevExpress.XtraPrinting.EncodingType.UTF8' },
        { value: 'UTF32', displayValue: 'utf-32', localizationId: 'DevExpress.XtraPrinting.EncodingType.UTF32' }
    ]
};
export const xlsExportHyperlinks = {
    propertyName: 'exportHyperlinks', modelName: '@ExportHyperlinks', displayName: 'Export Hyperlinks', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.ExportHyperlinks', descriptionLocalizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.ExportHyperlinks.Description', defaultVal: true, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool
};
export const xlsRawDataMode = {
    propertyName: 'rawDataMode', modelName: '@RawDataMode', displayName: 'Raw Data Mode', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.RawDataMode', descriptionLocalizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.RawDataMode.Description', defaultVal: false, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool
};
export const xlsShowGridLines = {
    propertyName: 'showGridLines', modelName: '@ShowGridLines', displayName: 'Show Grid Lines', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.ShowGridLines', descriptionLocalizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.ShowGridLines.Description', defaultVal: false, editor: analyticEditorTemplates.getEditor('bool'), from: parseBool
};
export const xlsExportOptionsSheetName = {
    propertyName: 'sheetName', modelName: '@SheetName', displayName: 'Sheet Name', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.SheetName', descriptionLocalizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.SheetName.Description', defaultVal: 'Sheet', editor: analyticEditorTemplates.getEditor('text')
};
