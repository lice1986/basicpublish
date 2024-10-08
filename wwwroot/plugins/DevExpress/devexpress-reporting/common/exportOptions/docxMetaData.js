﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\docxMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { docxExportMode, docxTableLayout, exportPageBreaks, exportWatermarks, pageRange, rasterizationResolution, rasterizeImages } from './metadata';
import { DocxExportDocumentOptions } from './options/docxExportDocumentOptions';
import { emptyFirstPageHeaderFooter, keepRowHeight } from './rtfMetaData';
export const docxDocumentOptions = { propertyName: 'documentOptions', modelName: 'DocumentOptions', displayName: 'Document Options', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions.DocumentOptions', from: DocxExportDocumentOptions.from, toJsonObject: DocxExportDocumentOptions.toJson, editor: editorTemplates.getEditor('objecteditor') };
export const docxExportOptionsSerializationInfo = [
    docxExportMode,
    exportWatermarks,
    pageRange,
    rasterizeImages,
    rasterizationResolution,
    emptyFirstPageHeaderFooter,
    keepRowHeight,
    exportPageBreaks,
    docxTableLayout,
    { propertyName: 'allowFloatingPictures', modelName: '@AllowFloatingPictures', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions.AllowFloatingPictures', displayName: 'Allow Floating Pictures', editor: editorTemplates.getEditor('bool'), from: parseBool, defaultVal: false },
    docxDocumentOptions,
];
