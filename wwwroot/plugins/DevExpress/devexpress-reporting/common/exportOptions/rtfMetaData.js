﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\rtfMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { exportPageBreaks, exportWatermarks, pageRange, rasterizationResolution, rtfExportMode } from './metadata';
export const rtfExportOptionsSerializationInfoBase = [
    pageRange,
    rasterizationResolution,
    exportPageBreaks,
    exportWatermarks
];
export const emptyFirstPageHeaderFooter = { propertyName: 'emptyFirstPageHeaderFooter', modelName: '@EmptyFirstPageHeaderFooter', displayName: 'Empty First Page Header/Footer', localizationId: 'DevExpress.XtraPrinting.FormattedTextExportOptions.EmptyFirstPageHeaderFooter', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const keepRowHeight = { propertyName: 'keepRowHeight', modelName: '@KeepRowHeight', displayName: 'Keep Row Height', localizationId: 'DevExpress.XtraPrinting.FormattedTextExportOptions.KeepRowHeight', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool };
export const rtfExportOptionsSerializationInfo = [
    emptyFirstPageHeaderFooter,
    keepRowHeight,
    rtfExportMode
].concat(rtfExportOptionsSerializationInfoBase);
