﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\textMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { textEncodingType, textExportMode } from './metadata';
export const textExportOptionsSerializationInfo = [
    textEncodingType,
    { propertyName: 'quoteStringsWithSeparators', modelName: '@QuoteStringsWithSeparators', displayName: 'Quote Strings with Separators', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.QuoteStringsWithSeparators', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    { propertyName: 'separator', modelName: '@Separator', displayName: 'Separator', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.Separator', defaultVal: 'TAB', editor: editorTemplates.getEditor('text') },
    textExportMode
];
