﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\csvMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { csvTextSeparator, textEncodingType, textExportMode, useCustomSeparator } from './metadata';
export const csvExportOptionsSerializationInfo = [
    textEncodingType,
    textExportMode,
    { propertyName: 'quoteStringsWithSeparators', modelName: '@QuoteStringsWithSeparators', displayName: 'Quote Strings with Separators', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.QuoteStringsWithSeparators', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool },
    useCustomSeparator, csvTextSeparator,
    { propertyName: 'skipEmptyRows', modelName: '@SkipEmptyRows', displayName: 'Skip Empty Rows', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions.SkipEmptyRows', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool },
    { propertyName: 'skipEmptyColumns', modelName: '@SkipEmptyColumns', displayName: 'Skip Empty Columns', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions.SkipEmptyColumns', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool }
];
