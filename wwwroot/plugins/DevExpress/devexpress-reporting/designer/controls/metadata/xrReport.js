﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrReport.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Margins } from '@devexpress/analytics-core/analytics-elements';
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { colorFromString, colorToString, floatFromModel, fromEnum, parseBool, saveAsInt } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { defaultFontSerialization } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ExportOptions } from '../../../common/exportOptions/exportOptions';
import { availableCultures, defaultCulture } from '../../../common/defaultCulture';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { formattingRuleLinks } from './properties/formattingRulesLink';
import { backColor, bookmark, borderColor, borderDashStyle, borders, borderWidth, displayName, expressionableFont, foreColor, paddingGroup, rtl, rtlValues, textAlignment } from './properties/metadata';
import { baseControlProperties, datasourcePrintOptionsGroup } from './properties/metadataGroups';
import { reportScripts } from './properties/scriptMetadata';
import { watermarkSerializationsInfo } from './properties/watermark';
export const paperKind = {
    propertyName: 'paperKind', modelName: '@PaperKind', localizable: true, defaultVal: 'Letter', displayName: 'Paper Kind', localizationId: 'DevExpress.XtraReports.UI.XtraReport.PaperKind',
    editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'A2', displayValue: 'A2', localizationId: 'System.Drawing.Printing.PaperKind.A2' },
        { value: 'A3', displayValue: 'A3', localizationId: 'System.Drawing.Printing.PaperKind.A3' },
        { value: 'A3Extra', displayValue: 'A3Extra', localizationId: 'System.Drawing.Printing.PaperKind.A3Extra' },
        { value: 'A3ExtraTransverse', displayValue: 'A3ExtraTransverse', localizationId: 'System.Drawing.Printing.PaperKind.A3ExtraTransverse' },
        { value: 'A3Rotated', displayValue: 'A3Rotated', localizationId: 'System.Drawing.Printing.PaperKind.A3Rotated' },
        { value: 'A3Transverse', displayValue: 'A3Transverse', localizationId: 'System.Drawing.Printing.PaperKind.A3Transverse' },
        { value: 'A4', displayValue: 'A4', localizationId: 'System.Drawing.Printing.PaperKind.A4' },
        { value: 'A4Extra', displayValue: 'A4Extra', localizationId: 'System.Drawing.Printing.PaperKind.A4Extra' },
        { value: 'A4Plus', displayValue: 'A4Plus', localizationId: 'System.Drawing.Printing.PaperKind.A4Plus' },
        { value: 'A4Rotated', displayValue: 'A4Rotated', localizationId: 'System.Drawing.Printing.PaperKind.A4Rotated' },
        { value: 'A4Small', displayValue: 'A4Small', localizationId: 'System.Drawing.Printing.PaperKind.A4Small' },
        { value: 'A4Transverse', displayValue: 'A4Transverse', localizationId: 'System.Drawing.Printing.PaperKind.A4Transverse' },
        { value: 'A5', displayValue: 'A5', localizationId: 'System.Drawing.Printing.PaperKind.A5' },
        { value: 'A5Extra', displayValue: 'A5Extra', localizationId: 'System.Drawing.Printing.PaperKind.A5Extra' },
        { value: 'A5Rotated', displayValue: 'A5Rotated', localizationId: 'System.Drawing.Printing.PaperKind.A5Rotated' },
        { value: 'A5Transverse', displayValue: 'A5Transverse', localizationId: 'System.Drawing.Printing.PaperKind.A5Transverse' },
        { value: 'A6', displayValue: 'A6', localizationId: 'System.Drawing.Printing.PaperKind.A6' },
        { value: 'A6Rotated', displayValue: 'A6Rotated', localizationId: 'System.Drawing.Printing.PaperKind.A6Rotated' },
        { value: 'APlus', displayValue: 'APlus', localizationId: 'System.Drawing.Printing.PaperKind.APlus' },
        { value: 'B4', displayValue: 'B4', localizationId: 'System.Drawing.Printing.PaperKind.B4' },
        { value: 'B4Envelope', displayValue: 'B4Envelope', localizationId: 'System.Drawing.Printing.PaperKind.B4Envelope' },
        { value: 'B4JisRotated', displayValue: 'B4JisRotated', localizationId: 'System.Drawing.Printing.PaperKind.B4JisRotated' },
        { value: 'B5', displayValue: 'B5', localizationId: 'System.Drawing.Printing.PaperKind.B5' },
        { value: 'B5Envelope', displayValue: 'B5Envelope', localizationId: 'System.Drawing.Printing.PaperKind.B5Envelope' },
        { value: 'B5Extra', displayValue: 'B5Extra', localizationId: 'System.Drawing.Printing.PaperKind.B5Extra' },
        { value: 'B5JisRotated', displayValue: 'B5JisRotated', localizationId: 'System.Drawing.Printing.PaperKind.B5JisRotated' },
        { value: 'B5Transverse', displayValue: 'B5Transverse', localizationId: 'System.Drawing.Printing.PaperKind.B5Transverse' },
        { value: 'B6Envelope', displayValue: 'B6Envelope', localizationId: 'System.Drawing.Printing.PaperKind.B6Envelope' },
        { value: 'B6Jis', displayValue: 'B6Jis', localizationId: 'System.Drawing.Printing.PaperKind.B6Jis' },
        { value: 'B6JisRotated', displayValue: 'B6JisRotated', localizationId: 'System.Drawing.Printing.PaperKind.B6JisRotated' },
        { value: 'BPlus', displayValue: 'BPlus', localizationId: 'System.Drawing.Printing.PaperKind.BPlus' },
        { value: 'C3Envelope', displayValue: 'C3Envelope', localizationId: 'System.Drawing.Printing.PaperKind.C3Envelope' },
        { value: 'C4Envelope', displayValue: 'C4Envelope', localizationId: 'System.Drawing.Printing.PaperKind.C4Envelope' },
        { value: 'C5Envelope', displayValue: 'C5Envelope', localizationId: 'System.Drawing.Printing.PaperKind.C5Envelope' },
        { value: 'C65Envelope', displayValue: 'C65Envelope', localizationId: 'System.Drawing.Printing.PaperKind.C65Envelope' },
        { value: 'C6Envelope', displayValue: 'C6Envelope', localizationId: 'System.Drawing.Printing.PaperKind.C6Envelope' },
        { value: 'CSheet', displayValue: 'CSheet', localizationId: 'System.Drawing.Printing.PaperKind.CSheet' },
        { value: 'Custom', displayValue: 'Custom', localizationId: 'System.Drawing.Printing.PaperKind.Custom' },
        { value: 'DLEnvelope', displayValue: 'DLEnvelope', localizationId: 'System.Drawing.Printing.PaperKind.DLEnvelope' },
        { value: 'DSheet', displayValue: 'DSheet', localizationId: 'System.Drawing.Printing.PaperKind.DSheet' },
        { value: 'ESheet', displayValue: 'ESheet', localizationId: 'System.Drawing.Printing.PaperKind.ESheet' },
        { value: 'Executive', displayValue: 'Executive', localizationId: 'System.Drawing.Printing.PaperKind.Executive' },
        { value: 'Folio', displayValue: 'Folio', localizationId: 'System.Drawing.Printing.PaperKind.Folio' },
        { value: 'GermanLegalFanfold', displayValue: 'GermanLegalFanfold', localizationId: 'System.Drawing.Printing.PaperKind.GermanLegalFanfold' },
        { value: 'GermanStandardFanfold', displayValue: 'GermanStandardFanfold', localizationId: 'System.Drawing.Printing.PaperKind.GermanStandardFanfold' },
        { value: 'InviteEnvelope', displayValue: 'InviteEnvelope', localizationId: 'System.Drawing.Printing.PaperKind.InviteEnvelope' },
        { value: 'IsoB4', displayValue: 'IsoB4', localizationId: 'System.Drawing.Printing.PaperKind.IsoB4' },
        { value: 'ItalyEnvelope', displayValue: 'ItalyEnvelope', localizationId: 'System.Drawing.Printing.PaperKind.ItalyEnvelope' },
        { value: 'JapaneseDoublePostcard', displayValue: 'JapaneseDoublePostcard', localizationId: 'System.Drawing.Printing.PaperKind.JapaneseDoublePostcard' },
        { value: 'JapaneseDoublePostcardRotated', displayValue: 'JapaneseDoublePostcardRotated', localizationId: 'System.Drawing.Printing.PaperKind.JapaneseDoublePostcardRotated' },
        { value: 'JapanesePostcard', displayValue: 'JapanesePostcard', localizationId: 'System.Drawing.Printing.PaperKind.JapanesePostcard' },
        { value: 'Ledger', displayValue: 'Ledger', localizationId: 'System.Drawing.Printing.PaperKind.Ledger' },
        { value: 'Legal', displayValue: 'Legal', localizationId: 'System.Drawing.Printing.PaperKind.Legal' },
        { value: 'LegalExtra', displayValue: 'LegalExtra', localizationId: 'System.Drawing.Printing.PaperKind.LegalExtra' },
        { value: 'Letter', displayValue: 'Letter', localizationId: 'System.Drawing.Printing.PaperKind.Letter' },
        { value: 'LetterExtra', displayValue: 'LetterExtra', localizationId: 'System.Drawing.Printing.PaperKind.LetterExtra' },
        { value: 'LetterExtraTransverse', displayValue: 'LetterExtraTransverse', localizationId: 'System.Drawing.Printing.PaperKind.LetterExtraTransverse' },
        { value: 'LetterPlus', displayValue: 'LetterPlus', localizationId: 'System.Drawing.Printing.PaperKind.LetterPlus' },
        { value: 'LetterRotated', displayValue: 'LetterRotated', localizationId: 'System.Drawing.Printing.PaperKind.LetterRotated' },
        { value: 'LetterSmall', displayValue: 'LetterSmall', localizationId: 'System.Drawing.Printing.PaperKind.LetterSmall' },
        { value: 'LetterTransverse', displayValue: 'LetterTransverse', localizationId: 'System.Drawing.Printing.PaperKind.LetterTransverse' },
        { value: 'MonarchEnvelope', displayValue: 'MonarchEnvelope', localizationId: 'System.Drawing.Printing.PaperKind.MonarchEnvelope' },
        { value: 'Note', displayValue: 'Note', localizationId: 'System.Drawing.Printing.PaperKind.Note' },
        { value: 'Number10Envelope', displayValue: 'Number10Envelope', localizationId: 'System.Drawing.Printing.PaperKind.Number10Envelope' },
        { value: 'Number11Envelope', displayValue: 'Number11Envelope', localizationId: 'System.Drawing.Printing.PaperKind.Number11Envelope' },
        { value: 'Number12Envelope', displayValue: 'Number12Envelope', localizationId: 'System.Drawing.Printing.PaperKind.Number12Envelope' },
        { value: 'Number14Envelope', displayValue: 'Number14Envelope', localizationId: 'System.Drawing.Printing.PaperKind.Number14Envelope' },
        { value: 'Number9Envelope', displayValue: 'Number9Envelope', localizationId: 'System.Drawing.Printing.PaperKind.Number9Envelope' },
        { value: 'PersonalEnvelope', displayValue: 'PersonalEnvelope', localizationId: 'System.Drawing.Printing.PaperKind.PersonalEnvelope' },
        { value: 'Prc16K', displayValue: 'Prc16K', localizationId: 'System.Drawing.Printing.PaperKind.Prc16K' },
        { value: 'Prc16KRotated', displayValue: 'Prc16KRotated', localizationId: 'System.Drawing.Printing.PaperKind.Prc16KRotated' },
        { value: 'Prc32K', displayValue: 'Prc32K', localizationId: 'System.Drawing.Printing.PaperKind.Prc32K' },
        { value: 'Prc32KBig', displayValue: 'Prc32KBig', localizationId: 'System.Drawing.Printing.PaperKind.Prc32KBig' },
        { value: 'Prc32KBigRotated', displayValue: 'Prc32KBigRotated', localizationId: 'System.Drawing.Printing.PaperKind.Prc32KBigRotated' },
        { value: 'Prc32KRotated', displayValue: 'Prc32KRotated', localizationId: 'System.Drawing.Printing.PaperKind.Prc32KRotated' },
        { value: 'PrcEnvelopeNumber1', displayValue: 'PrcEnvelopeNumber1', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber1' },
        { value: 'PrcEnvelopeNumber10', displayValue: 'PrcEnvelopeNumber10', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber10' },
        { value: 'PrcEnvelopeNumber10Rotated', displayValue: 'PrcEnvelopeNumber10Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber10Rotated' },
        { value: 'PrcEnvelopeNumber1Rotated', displayValue: 'PrcEnvelopeNumber1Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber1Rotated' },
        { value: 'PrcEnvelopeNumber2', displayValue: 'PrcEnvelopeNumber2', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber2' },
        { value: 'PrcEnvelopeNumber2Rotated', displayValue: 'PrcEnvelopeNumber2Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber2Rotated' },
        { value: 'PrcEnvelopeNumber3', displayValue: 'PrcEnvelopeNumber3', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber3' },
        { value: 'PrcEnvelopeNumber3Rotated', displayValue: 'PrcEnvelopeNumber3Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber3Rotated' },
        { value: 'PrcEnvelopeNumber4', displayValue: 'PrcEnvelopeNumber4', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber4' },
        { value: 'PrcEnvelopeNumber4Rotated', displayValue: 'PrcEnvelopeNumber4Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber4Rotated' },
        { value: 'PrcEnvelopeNumber5', displayValue: 'PrcEnvelopeNumber5', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber5' },
        { value: 'PrcEnvelopeNumber5Rotated', displayValue: 'PrcEnvelopeNumber5Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber5Rotated' },
        { value: 'PrcEnvelopeNumber6', displayValue: 'PrcEnvelopeNumber6', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber6' },
        { value: 'PrcEnvelopeNumber6Rotated', displayValue: 'PrcEnvelopeNumber6Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber6Rotated' },
        { value: 'PrcEnvelopeNumber7', displayValue: 'PrcEnvelopeNumber7', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber7' },
        { value: 'PrcEnvelopeNumber7Rotated', displayValue: 'PrcEnvelopeNumber7Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber7Rotated' },
        { value: 'PrcEnvelopeNumber8', displayValue: 'PrcEnvelopeNumber8', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber8' },
        { value: 'PrcEnvelopeNumber8Rotated', displayValue: 'PrcEnvelopeNumber8Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber8Rotated' },
        { value: 'PrcEnvelopeNumber9', displayValue: 'PrcEnvelopeNumber9', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber9' },
        { value: 'PrcEnvelopeNumber9Rotated', displayValue: 'PrcEnvelopeNumber9Rotated', localizationId: 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber9Rotated' },
        { value: 'Quarto', displayValue: 'Quarto', localizationId: 'System.Drawing.Printing.PaperKind.Quarto' },
        { value: 'Standard10x11', displayValue: 'Standard10x11', localizationId: 'System.Drawing.Printing.PaperKind.Standard10x11' },
        { value: 'Standard10x14', displayValue: 'Standard10x14', localizationId: 'System.Drawing.Printing.PaperKind.Standard10x14' },
        { value: 'Standard11x17', displayValue: 'Standard11x17', localizationId: 'System.Drawing.Printing.PaperKind.Standard11x17' },
        { value: 'Standard12x11', displayValue: 'Standard12x11', localizationId: 'System.Drawing.Printing.PaperKind.Standard12x11' },
        { value: 'Standard15x11', displayValue: 'Standard15x11', localizationId: 'System.Drawing.Printing.PaperKind.Standard15x11' },
        { value: 'Standard9x11', displayValue: 'Standard9x11', localizationId: 'System.Drawing.Printing.PaperKind.Standard9x11' },
        { value: 'Statement', displayValue: 'Statement', localizationId: 'System.Drawing.Printing.PaperKind.Statement' },
        { value: 'Tabloid', displayValue: 'Tabloid', localizationId: 'System.Drawing.Printing.PaperKind.Tabloid' },
        { value: 'TabloidExtra', displayValue: 'TabloidExtra', localizationId: 'System.Drawing.Printing.PaperKind.TabloidExtra' },
        { value: 'USStandardFanfold', displayValue: 'USStandardFanfold', localizationId: 'System.Drawing.Printing.PaperKind.USStandardFanfold' }
    ]
};
export const landscape = { propertyName: 'landscape', modelName: '@Landscape', displayName: 'Landscape', localizationId: 'DevExpress.XtraReports.UI.XtraReport.Landscape', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') };
export const margins = { propertyName: 'margins', modelName: '@Margins', localizable: true, from: Margins.fromString, displayName: 'Margins', localizationId: 'DevExpress.XtraReports.UI.XtraReport.Margins', editor: editorTemplates.getEditor('objecteditor') };
export const pageColor = { propertyName: 'pageColor', modelName: '@PageColor', defaultVal: 'White', from: colorFromString, toJsonObject: colorToString, displayName: 'Page Color', localizationId: 'DevExpress.XtraReports.UI.XtraReport.PageColor', editor: editorTemplates.getEditor('customColorEditor') };
export const measureUnit = {
    propertyName: 'measureUnit',
    modelName: '@ReportUnit', defaultVal: 'HundredthsOfAnInch', editor: editorTemplates.getEditor('combobox'), displayName: 'Measure Units', localizationId: 'DevExpress.XtraReports.UI.XtraReport.ReportUnit', from: fromEnum,
    valuesArray: [
        { value: 'HundredthsOfAnInch', displayValue: 'Hundredths of an Inch', localizationId: 'DevExpress.XtraReports.UI.ReportUnit.HundredthsOfAnInch' },
        { value: 'TenthsOfAMillimeter', displayValue: 'Tenths of a Millimeter', localizationId: 'DevExpress.XtraReports.UI.ReportUnit.TenthsOfAMillimeter' },
        { value: 'Pixels', displayValue: 'Pixels', localizationId: 'DevExpress.XtraReports.UI.ReportUnit.Pixels' }
    ]
};
export const snapGridSize = { propertyName: 'snapGridSize', modelName: '@SnapGridSize', defaultVal: 12.5, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), editorOptions: { min: 0.1 }, displayName: 'Snap Grid Size', localizationId: 'DevExpress.XtraReports.UI.XtraReport.SnapGridSize' };
export const drawWatermark = { propertyName: 'drawWatermark', modelName: '@DrawWatermark', displayName: 'Draw the Watermark', localizationId: 'DevExpress.XtraReports.UI.XtraReport.DrawWatermark', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') };
export const showPreviewMarginLines = { propertyName: 'showPreviewMarginLines', modelName: '@ShowPreviewMarginLines', displayName: 'Show Margin Lines in Preview', localizationId: 'DevExpress.XtraReports.UI.XtraReport.ShowPreviewMarginLines', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('bool') };
export const verticalContentSplitting = {
    propertyName: 'verticalContentSplitting',
    modelName: '@VerticalContentSplitting', displayName: 'Vertical Content Splitting', localizationId: 'DevExpress.XtraReports.UI.XtraReport.VerticalContentSplitting', defaultVal: 'Exact', from: fromEnum,
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'Exact', displayValue: 'Exact', localizationId: 'DevExpress.XtraPrinting.VerticalContentSplitting.Exact' },
        { value: 'Smart', displayValue: 'Smart', localizationId: 'DevExpress.XtraPrinting.VerticalContentSplitting.Smart' }
    ]
};
export const reportExportOptionsSerializationInfo = { propertyName: 'exportOptions', modelName: 'ExportOptions', displayName: 'Export Options', localizationId: 'DevExpress.XtraReports.UI.XtraReport.ExportOptions', from: ExportOptions.from, toJsonObject: ExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') };
export const watermarks = {
    propertyName: 'watermarks', modelName: 'Watermarks', displayName: 'Watermarks', localizationId: 'DevExpress.XtraReports.UI.XtraReport.Watermarks', array: true,
    info: watermarkSerializationsInfo,
    template: '#dxrd-collectionItemWithAccordion',
    editor: designerEditorTemplates.getEditor('watermarks'),
};
export const watermarkId = { propertyName: 'watermarkId', modelName: '@WatermarkId', displayName: 'WatermarkId', localizationId: 'DevExpress.XtraReports.UI.XtraReport.WatermarkId', editor: editorTemplates.getEditor('text') };
export const rollPaper = { propertyName: 'rollPaper', modelName: '@RollPaper', displayName: 'Roll Paper', localizationId: 'DevExpress.XtraReports.UI.XtraReport.RollPaper', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const requestParameters = { propertyName: 'requestParameters', modelName: '@RequestParameters', displayName: 'Request Parameters', localizationId: 'DevExpress.XtraReports.UI.XtraReport.RequestParameters', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const formattingRuleSheet = { propertyName: 'formattingRuleSheet', modelName: 'FormattingRuleSheet', displayName: 'Formatting Rule Sheet', localizationId: 'DevExpress.XtraReports.UI.XtraReport.FormattingRuleSheet', array: true };
export const pageWidth = { propertyName: 'pageWidth', modelName: '@PageWidth', displayName: 'Page Width', localizationId: 'DevExpress.XtraReports.UI.XtraReport.PageWidth', defaultVal: -1, from: floatFromModel, toJsonObject: saveAsInt, editor: editorTemplates.getEditor('numeric') };
export const pageHeight = { propertyName: 'pageHeight', modelName: '@PageHeight', displayName: 'Page Height', localizationId: 'DevExpress.XtraReports.UI.XtraReport.PageHeight', defaultVal: -1, from: floatFromModel, toJsonObject: saveAsInt, editor: editorTemplates.getEditor('numeric') };
export const localizationItems = { propertyName: '_localizationItems', modelName: 'LocalizationItems', array: true };
export const language = {
    propertyName: 'language', displayName: 'Language', defaultVal: defaultCulture, localizationId: 'DevExpress.XtraReports.UI.XtraReport.XRLanguage', localizable: true, editor: designerEditorTemplates.getEditor('localizationSelectBox'), values: availableCultures()
};
const disposableFunc = availableCultures.subscribe((newVal) => {
    language.values = newVal;
    disposableFunc();
});
export const scriptLanguage = {
    propertyName: 'scriptLanguage', modelName: '@ScriptLanguage', displayName: 'Script Language', localizationId: 'DevExpress.XtraReports.UI.XtraReport.ScriptLanguage', defaultVal: 'CSharp', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'CSharp', displayValue: 'C#', localizationId: 'DevExpress.XtraReports.ScriptLanguage.CSharp' },
        { value: 'VisualBasic', displayValue: 'Visual Basic', localizationId: 'DevExpress.XtraReports.ScriptLanguage.VisualBasic' },
        { value: 'JScript', displayValue: 'JScript', localizationId: 'DevExpress.XtraReports.ScriptLanguage.JScript' }
    ]
};
export const scriptReferencesString = { propertyName: 'scriptReferencesString', modelName: '@ScriptReferencesString', defaultVal: '', displayName: 'Script References', localizationId: 'DevExpress.XtraReports.UI.XtraReport.ScriptReferences', editor: editorTemplates.getEditor('stringArray') };
export const calculatedFields = {
    propertyName: 'calculatedFields', modelName: 'CalculatedFields', displayName: 'Calculated Fields', localizationId: 'DevExpress.XtraReports.UI.XtraReport.CalculatedFields', array: true,
    template: '#dxrd-collectionItemWithAccordion',
    editor: designerEditorTemplates.getEditor('calculatedFields')
};
export const parametersInfo = {
    propertyName: 'parameters', modelName: 'Parameters', displayName: 'Parameters', localizationId: 'DevExpress.XtraReports.UI.XtraReport.Parameters', array: true,
    template: '#dxrd-collectionItemWithAccordion',
    editor: designerEditorTemplates.getEditor('parameters')
};
export const bookmarkDuplicateSuppress = { propertyName: 'bookmarkDuplicateSuppress', modelName: '@BookmarkDuplicateSuppress', displayName: 'Bookmark Duplicate Suppress', localizationId: 'DevExpress.XtraReports.UI.XtraReport.BookmarkDuplicateSuppress', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const horizontalContentSplitting = {
    propertyName: 'horizontalContentSplitting', modelName: '@HorizontalContentSplitting', displayName: 'Horizontal Content Splitting', localizationId: 'DevExpress.XtraReports.UI.XtraReport.HorizontalContentSplitting', defaultVal: 'Exact', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'Exact', displayValue: 'Exact', localizationId: 'DevExpress.XtraPrinting.HorizontalContentSplitting.Exact' },
        { value: 'Smart', displayValue: 'Smart', localizationId: 'DevExpress.XtraPrinting.HorizontalContentSplitting.Smart' }
    ]
};
export const rtlLayout = {
    propertyName: 'rtlLayout', modelName: '@RightToLeftLayout', displayName: 'Right To Left Layout', localizationId: 'DevExpress.XtraReports.UI.XtraReport.RightToLeftLayout', defaultVal: 'No', editor: designerEditorTemplates.getEditor('reportRtlProperty'),
    valuesArray: rtlValues
};
export const rtlReport = extend({}, rtl, {
    defaultVal: 'No',
    editor: designerEditorTemplates.getEditor('reportRtlProperty'),
    valuesArray: rtlValues
});
export const useLandscape = { propertyName: 'useLandscape', modelName: '@UseLandscape', displayName: 'Use Landscape', localizationId: 'DevExpress.XtraPrinting.PrinterSettingsUsing.UseLandscape', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') };
export const usePaperKind = { propertyName: 'usePaperKind', modelName: '@UsePaperKind', displayName: 'Use Paper Kind', localizationId: 'DevExpress.XtraPrinting.PrinterSettingsUsing.UsePaperKind', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') };
export const defaultPrinterSettingsUsingInfo = {
    propertyName: 'defaultPrinterSettingsUsing', modelName: 'DefaultPrinterSettingsUsing', displayName: 'Using Settings of the Default Printer', localizationId: 'DevExpress.XtraReports.UI.XtraReport.DefaultPrinterSettingsUsing', editor: editorTemplates.getEditor('objecteditor'),
    info: [useLandscape, usePaperKind]
};
export const reportSerializationInfo = [
    extend({}, backColor, { defaultVal: 'transparent' }),
    extend({}, foreColor, { defaultVal: 'Black' }),
    extend({}, borderColor, { defaultVal: 'Black' }),
    extend({}, expressionableFont, { defaultVal: defaultFontSerialization() }),
    extend({}, textAlignment, { defaultVal: 'TopLeft' }),
    extend({}, borderWidth, { defaultVal: 1 }),
    extend({}, borderDashStyle, { defaultVal: 'Solid' }),
    extend({}, borders, { defaultVal: 'None' }),
    { propertyName: 'size', visible: false },
    landscape,
    paperKind,
    defaultPrinterSettingsUsingInfo,
    pageColor,
    bookmark,
    margins, rollPaper, requestParameters,
    measureUnit,
    snapGridSize,
    drawWatermark,
    watermarkId,
    watermarks,
    displayName, verticalContentSplitting, showPreviewMarginLines,
    calculatedFields,
    { propertyName: 'scriptsSource', modelName: '@ScriptsSource' },
    pageWidth,
    pageHeight,
    language,
    localizationItems,
    {
        propertyName: 'bands',
        modelName: 'Bands',
        array: true
    },
    { propertyName: 'crossBandControls', modelName: 'CrossBandControls', array: true },
    { propertyName: 'styles', modelName: 'StyleSheet', array: true },
    { propertyName: '_objectStorage', modelName: 'ObjectStorage', array: true },
    { propertyName: '_componentStorage', modelName: 'ComponentStorage', array: true },
    { propertyName: 'objectStorage' },
    { propertyName: 'extensions', modelName: 'Extensions', array: true },
    { propertyName: 'parameterPanelLayoutItems', modelName: 'ParameterPanelLayoutItems', array: true },
    formattingRuleSheet,
    formattingRuleLinks,
    parametersInfo,
    { propertyName: 'version', modelName: '@Version' },
    reportExportOptionsSerializationInfo, reportScripts, scriptLanguage, scriptReferencesString,
    rtlReport, rtlLayout, bookmarkDuplicateSuppress, horizontalContentSplitting
].concat(baseControlProperties, datasourcePrintOptionsGroup, paddingGroup);
export const popularPropertiesReport = ['dataSource', 'dataMember', 'filterString', 'measureUnit', language.propertyName];