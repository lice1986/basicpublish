﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\xlsMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createPasswordSerializationInfo } from '@devexpress/analytics-core/analytics-internal-native';
import { fromEnum, parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { pageRange, rasterizationResolution, rasterizeImages, xlsExportHyperlinks, xlsExportMode, xlsExportOptionsSheetName, xlsRawDataMode, xlsShowGridLines, xlsTextExportMode } from './metadata';
import { application, author, subject, title } from './options/pdfExportDocumentOptions';
const documentOptionsSerializationsInfo = [
    author, application, title, subject,
    { propertyName: 'tags', modelName: '@Tags', displayName: 'Tags', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Tags', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'category', modelName: '@Category', displayName: 'Category', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Category', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'comments', modelName: '@Comments', displayName: 'Comments', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Comments', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'company', modelName: '@Company', displayName: 'Company', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Company', defaultVal: '', editor: editorTemplates.getEditor('text') }
];
const documentOptions = { propertyName: 'documentOptions', modelName: 'DocumentOptions', displayName: 'Document Options', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.DocumentOptions', info: documentOptionsSerializationsInfo, editor: editorTemplates.getEditor('objecteditor') };
const encryptionOptionsSerializationsInfo = [
    {
        propertyName: 'type', modelName: '@Type', displayName: 'Type', localizationId: 'DevExpress.XtraPrinting.XlEncryptionOptions.Type', defaultVal: 'Strong', editor: editorTemplates.getEditor('combobox'), from: fromEnum,
        valuesArray: [
            { value: 'Strong', displayValue: 'Strong', localizationId: 'DevExpress.XtraPrinting.XlEncryptionType.Strong' },
            { value: 'Compatible', displayValue: 'Compatible', localizationId: 'DevExpress.XtraPrinting.XlEncryptionType.Compatible' }
        ]
    },
    createPasswordSerializationInfo({ propertyName: 'password', modelName: '@Password', displayName: 'Password', localizationId: 'DevExpress.XtraPrinting.XlEncryptionOptions.Password', defaultVal: '' })
];
const encryptionOptions = { propertyName: 'encryptionOptions', modelName: 'EncryptionOptions', displayName: 'Encryption Options', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.EncryptionOptions', info: encryptionOptionsSerializationsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const xlsExportOptionsSerializationInfoCommon = [
    xlsExportHyperlinks,
    pageRange,
    xlsRawDataMode,
    xlsExportOptionsSheetName,
    xlsShowGridLines,
    xlsTextExportMode,
    rasterizeImages,
    rasterizationResolution,
    { propertyName: 'fitToPrintedPageWidth', modelName: '@FitToPrintedPageWidth', displayName: 'Fit To Printed Page Width', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.FitToPrintedPageWidth', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    { propertyName: 'fitToPrintedPageHeight', modelName: '@FitToPrintedPageHeight', displayName: 'Fit To Printed Page Height', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.FitToPrintedPageHeight', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    {
        propertyName: 'ignoreErrors', modelName: '@IgnoreErrors', displayName: 'Ignore Errors', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.IgnoreErrors', editor: editorTemplates.getEditor('combobox'), defaultVal: 'None', from: fromEnum, valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.XlIgnoreErrors.None' },
            { value: 'NumberStoredAsText', displayValue: 'Number Stored As Text', localizationId: 'DevExpress.XtraPrinting.XlIgnoreErrors.NumberStoredAsText' }
        ]
    },
    {
        propertyName: 'rightToLeftDocument', modelName: '@RightToLeftDocument', displayName: 'Right To Left Document', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.RightToLeftDocument', defaultVal: 'Default', from: fromEnum, editor: editorTemplates.getEditor('combobox'), valuesArray: [
            { value: 'True', displayValue: 'True', localizationId: 'DevExpress.Utils.DefaultBoolean.True' },
            { value: 'False', displayValue: 'False', localizationId: 'DevExpress.Utils.DefaultBoolean.False' },
            { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.Utils.DefaultBoolean.Default' }
        ]
    },
    documentOptions,
    encryptionOptions
];
export const xlsExportOptionsSerializationInfoBase = [
    { propertyName: 'suppress256ColumnsWarning', modelName: '@Suppress256ColumnsWarning', displayName: 'Suppress 256 Columns Warning', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.Suppress256ColumnsWarning', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    { propertyName: 'suppress65536RowsWarning', modelName: '@Suppress65536RowsWarning', displayName: 'Suppress 65536 Rows Warning', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.Suppress65536RowsWarning', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    {
        propertyName: 'workbookColorPaletteCompliance', modelName: '@WorkbookColorPaletteCompliance', displayName: 'Workbook Color Palette Compliance', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.WorkbookColorPaletteCompliance', editor: editorTemplates.getEditor('combobox'), defaultVal: 'ReducePaletteForExactColors', from: fromEnum,
        valuesArray: [
            { value: 'ReducePaletteForExactColors', displayValue: 'ReducePaletteForExactColors', localizationId: 'DevExpress.XtraPrinting.WorkbookColorPaletteCompliance.ReducePaletteForExactColors' },
            { value: 'AdjustColorsToDefaultPalette', displayValue: 'AdjustColorsToDefaultPalette', localizationId: 'DevExpress.XtraPrinting.WorkbookColorPaletteCompliance.AdjustColorsToDefaultPalette' }
        ]
    }
];
export const xlsExportOptionsSerializationInfo = [xlsExportMode].concat(xlsExportOptionsSerializationInfoCommon, xlsExportOptionsSerializationInfoBase);
