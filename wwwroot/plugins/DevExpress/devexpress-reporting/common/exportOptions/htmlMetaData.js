﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\htmlMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { allowURLsWithJSContent, characterSet, embedImagesInHTML, exportWatermarks, expotOptionsTitle, htmlExportMode, htmlTableLayout, inlineCss, pageBorderColor, pageBorderWidth, pageRange, rasterizationResolution, removeSecondarySymbols, useHRefHyperlinks } from './metadata';
export const htmlExportOptionsSerializationInfoBase = [
    pageBorderColor,
    pageBorderWidth,
    pageRange,
    rasterizationResolution,
    expotOptionsTitle,
    htmlTableLayout,
    useHRefHyperlinks,
    allowURLsWithJSContent,
    removeSecondarySymbols,
    exportWatermarks,
    characterSet
];
export const htmlExportOptionsSerializationInfo = [htmlExportMode, embedImagesInHTML, inlineCss].concat(htmlExportOptionsSerializationInfoBase);
