﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\mhtMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { allowURLsWithJSContent, characterSet, exportWatermarks, expotOptionsTitle, htmlExportMode, htmlTableLayout, inlineCss, pageBorderColor, pageBorderWidth, pageRange, rasterizationResolution, removeSecondarySymbols, useHRefHyperlinks } from './metadata';
export const mhtExportOptionsSerializationInfoBase = [
    pageBorderColor,
    pageBorderWidth,
    pageRange,
    rasterizationResolution,
    expotOptionsTitle,
    characterSet,
    htmlTableLayout,
    useHRefHyperlinks,
    allowURLsWithJSContent,
    removeSecondarySymbols,
    exportWatermarks
];
export const mhtExportOptionsSerializationInfo = [htmlExportMode, inlineCss].concat(mhtExportOptionsSerializationInfoBase);
