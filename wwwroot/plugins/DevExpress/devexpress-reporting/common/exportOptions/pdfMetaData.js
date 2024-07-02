﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\pdfMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { fromEnum, parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { pageRange, rasterizationResolution, rasterizeImages } from './metadata';
import { PdfExportDocumentOptions } from './options/pdfExportDocumentOptions';
import { PdfPasswordSecurityOptions } from './options/pdfPasswordSecurityOptions';
export const pdfACompatibilityValues = { None: 'None', PdfA1a: 'PdfA1a', PdfA1b: 'PdfA1b', PdfA2a: 'PdfA2a', PdfA2b: 'PdfA2b', PdfA3a: 'PdfA3a', PdfA3b: 'PdfA3b' };
export const pdfACompatibility = {
    propertyName: 'pdfACompatibility', modelName: '@PdfACompatibility', displayName: 'PDF A Compatibility', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.PdfACompatibility', editor: editorTemplates.getEditor('combobox'), defaultVal: pdfACompatibilityValues.None, from: fromEnum,
    valuesArray: [
        { value: pdfACompatibilityValues.None, displayValue: pdfACompatibilityValues.None, localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.None' },
        { value: pdfACompatibilityValues.PdfA1a, displayValue: 'PDF/A-1a', localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA1a' },
        { value: pdfACompatibilityValues.PdfA1b, displayValue: 'PDF/A-1b', localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA1b' },
        { value: pdfACompatibilityValues.PdfA2a, displayValue: 'PDF/A-2a', localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA2a' },
        { value: pdfACompatibilityValues.PdfA2b, displayValue: 'PDF/A-2b', localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA2b' },
        { value: pdfACompatibilityValues.PdfA3a, displayValue: 'PDF/A-3a', localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA3a' },
        { value: pdfACompatibilityValues.PdfA3b, displayValue: 'PDF/A-3b', localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA3b' }
    ]
};
export const pdfUACompatibilityValues = { None: 'None', PdfUA1: 'PdfUA1' };
export const pdfUACompatibility = {
    propertyName: 'pdfUACompatibility', modelName: '@PdfUACompatibility', displayName: 'PDF UA Compatibility', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.PdfUACompatibility', editor: editorTemplates.getEditor('combobox'), defaultVal: pdfUACompatibilityValues.None, from: fromEnum,
    valuesArray: [
        { value: pdfUACompatibilityValues.None, displayValue: pdfACompatibilityValues.None, localizationId: 'DevExpress.XtraPrinting.PdfUACompatibility.None' },
        { value: pdfUACompatibilityValues.PdfUA1, displayValue: pdfUACompatibilityValues.PdfUA1, localizationId: 'DevExpress.XtraPrinting.PdfUACompatibility.PdfUA1' }
    ]
};
export const showPrintDialogOnOpen = {
    propertyName: 'showPrintDialogOnOpen', modelName: '@ShowPrintDialogOnOpen', displayName: 'Show Print Dialog on Open', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.ShowPrintDialogOnOpen', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool
};
export const pdfExportOptionsSerializationInfo = [
    { propertyName: 'convertImagesToJpeg', modelName: '@ConvertImagesToJpeg', displayName: 'Convert Images to Jpeg', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.ConvertImagesToJpeg', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool },
    showPrintDialogOnOpen,
    { propertyName: 'neverEmbeddedFonts', modelName: '@NeverEmbeddedFonts', displayName: 'Never Embedded Fonts', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.NeverEmbeddedFonts', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'exportEditingFieldsToAcroForms', modelName: '@ExportEditingFieldsToAcroForms', displayName: 'Export Editing Fields To AcroForms', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.ExportEditingFieldsToAcroForms', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    {
        propertyName: 'imageQuality', modelName: '@ImageQuality', displayName: 'Image Quality', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.ImageQuality', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Highest', from: fromEnum,
        valuesArray: [
            { value: 'Lowest', displayValue: 'Lowest', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.Lowest' },
            { value: 'Low', displayValue: 'Low', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.Low' },
            { value: 'Medium', displayValue: 'Medium', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.Medium' },
            { value: 'High', displayValue: 'High', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.High' },
            { value: 'Highest', displayValue: 'Highest', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.Highest' }
        ]
    },
    pdfACompatibility,
    pdfUACompatibility,
    pageRange,
    rasterizationResolution,
    rasterizeImages,
    { propertyName: 'documentOptions', modelName: 'DocumentOptions', displayName: 'Document Options', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.DocumentOptions', from: PdfExportDocumentOptions.from, toJsonObject: PdfExportDocumentOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'pdfPasswordSecurityOptions', modelName: 'PasswordSecurityOptions', displayName: 'Pdf Password Security Options', localizationId: 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions', from: PdfPasswordSecurityOptions.from, toJsonObject: PdfPasswordSecurityOptions.toJson, editor: editorTemplates.getEditor('objecteditor') }
];
