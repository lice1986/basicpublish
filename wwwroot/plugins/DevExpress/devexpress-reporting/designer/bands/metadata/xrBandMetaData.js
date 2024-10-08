﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrBandMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { keepTogetherDefaultValueFalse, textAlignment } from '../../controls/metadata/properties/metadata';
import { commonBandProperties, fontGroup } from '../../controls/metadata/properties/metadataGroups';
import { commonBandScripts } from '../../controls/metadata/properties/scriptMetadata';
import { styleName, stylePriority, stylesObj } from '../../controls/metadata/properties/style';
import { height, pageBreak, printAcrossBands, printAtBottom } from './bandsMetadata';
export const expanded = { propertyName: 'expanded', modelName: '@Expanded', from: parseBool, defaultVal: true };
export const commonBandSerializationInfo = [
    textAlignment, expanded,
    { propertyName: 'controls', modelName: 'Controls', array: true },
    { propertyName: 'bands', modelName: 'SubBands', array: true },
].concat(commonBandProperties, fontGroup);
export const bandSerializationInfo = [
    styleName, stylesObj, stylePriority, height, printAcrossBands
].concat(commonBandSerializationInfo);
export const reportHeaderBandSerializationInfo = [keepTogetherDefaultValueFalse, pageBreak, commonBandScripts].concat(bandSerializationInfo);
export const reportFooterBandSerializationInfo = [printAtBottom].concat(reportHeaderBandSerializationInfo);
export const popularPropertiesReportHeader = [pageBreak.propertyName, 'keepTogether'];
export const popularPropertiesReportFooter = [pageBreak.propertyName, 'keepTogether', 'printAtBottom'];
