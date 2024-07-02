﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\metadataGroups.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { expressionBindings } from './expressionBinding';
import { formattingRuleLinks } from './formattingRulesLink';
import { accessibleDescription, angle, backColor, bookmark, bookmarkParent, borderColor, borderDashStyle, borders, borderWidth, canGrow, canPublish, canShrink, dataAdapter, dataMember, dataSource, dpi, expressionableFont, filterString, filterStringEditable, foreColor, keepTogetherDefaultValueFalse, location, lockedInUserDesigner, multiline, name, navigateUrl, nullValueText, paddingGroup, processDuplicatesMode, processDuplicatesTarget, processNullValues, reportPrintOptions, rtl, size, summary, tag, target, text, textAlignment, textArea, textFitMode, textFormatString, visible, wordWrap, xlsxFormatString } from './metadata';
import { interactiveSorting } from './sortingOptions';
import { evenStyleName, oddStyleName, styleName, stylePriority, stylesObj } from './style';
export const sizeLocation = [size, location];
export const bordersProperties = [borders, borderWidth, borderDashStyle, borderColor];
export const baseControlProperties = [name, visible, dpi, lockedInUserDesigner, tag, expressionBindings];
export const commonBandProperties = [backColor, formattingRuleLinks].concat(baseControlProperties, bordersProperties, paddingGroup);
export const commonControlProperties = [styleName, evenStyleName, accessibleDescription, oddStyleName, stylesObj, stylePriority, canPublish].concat(commonBandProperties);
export const fontGroup = [expressionableFont, foreColor];
export const bookmarkGroup = [bookmark, bookmarkParent];
export const navigationGroup = [navigateUrl, target].concat(bookmarkGroup);
export const datasourcePrintOptionsGroup = [dataSource, dataMember, dataAdapter, filterString, filterStringEditable, reportPrintOptions];
export const processGroup = [processDuplicatesMode, processDuplicatesTarget, processNullValues];
export const canGrowShrinkGroup = [canGrow, canShrink];
export const labelGroup = [textAlignment, text, textArea, textFormatString, textFitMode, nullValueText,
    keepTogetherDefaultValueFalse, summary, multiline, angle, wordWrap, xlsxFormatString, rtl, interactiveSorting
].concat(commonControlProperties, fontGroup, navigationGroup, canGrowShrinkGroup, processGroup);
export const unknownSerializationsInfo = [].concat(baseControlProperties, sizeLocation);