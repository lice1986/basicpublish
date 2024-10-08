﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\imageMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { fromEnum, parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { imageExportMode, pageBorderColor, pageBorderWidth, pageRange } from './metadata';
export const imageExportOptionsSerializationInfoBase = [
    pageBorderColor,
    pageBorderWidth,
    pageRange,
    { propertyName: 'resolution', modelName: '@Resolution', displayName: 'Resolution', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.Resolution', editor: editorTemplates.getEditor('numeric'), defaultVal: 96 },
    {
        propertyName: 'format', modelName: '@Format', displayName: 'Format', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.Format', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Png', from: fromEnum,
        valuesArray: [
            { value: 'Bmp', displayValue: 'BMP' },
            { value: 'Gif', displayValue: 'GIF' },
            { value: 'Jpeg', displayValue: 'JPEG' },
            { value: 'Png', displayValue: 'PNG' },
            { value: 'Emf', displayValue: 'EMF' },
            { value: 'Wmf', displayValue: 'WMF' },
            { value: 'Tiff', displayValue: 'TIFF' }
        ]
    }
];
export const imageExportOptionsSerializationInfo = [imageExportMode,
    { propertyName: 'retainBackgroundTransparency', modelName: '@RetainBackgroundTransparency', displayName: 'Retain Background Transparency', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.RetainBackgroundTransparency', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    {
        propertyName: 'textRenderingMode', modelName: '@TextRenderingMode', displayName: 'Text Rendering Mode', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.TextRenderingMode', editor: editorTemplates.getEditor('combobox'), defaultVal: 'SystemDefault', from: fromEnum,
        valuesArray: [
            { value: 'SystemDefault', displayValue: 'SystemDefault', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.SystemDefault' },
            { value: 'SingleBitPerPixelGridFit', displayValue: 'SingleBitPerPixelGridFit', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.SingleBitPerPixelGridFit' },
            { value: 'SingleBitPerPixel', displayValue: 'SingleBitPerPixel', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.SingleBitPerPixel' },
            { value: 'AntiAliasGridFit', displayValue: 'AntiAliasGridFit', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.AntiAliasGridFit' },
            { value: 'AntiAlias', displayValue: 'AntiAlias', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.AntiAlias' },
            { value: 'ClearTypeGridFit', displayValue: 'ClearTypeGridFit', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.ClearTypeGridFit' }
        ]
    }
].concat(imageExportOptionsSerializationInfoBase);
