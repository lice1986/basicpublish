﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrPageinfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { pageInfoValuesMap } from '../xrPageinfo';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { accessibleDescription, rtl, textAlignment, textFormatString, wordWrap } from './properties/metadata';
import { commonControlProperties, fontGroup, navigationGroup, sizeLocation } from './properties/metadataGroups';
import { textControlScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
export const pageInfo = {
    propertyName: 'pageInfo',
    modelName: '@PageInfo', defaultVal: 'NumberOfTotal', displayName: 'Page Information', localizationId: 'DevExpress.XtraReports.UI.XRPageInfo.PageInfo',
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: pageInfoValuesMap
};
export const startPageNumber = {
    propertyName: 'startPageNumber',
    modelName: '@StartPageNumber', displayName: 'Start Page Number', localizationId: 'DevExpress.XtraReports.UI.XRPageInfo.StartPageNumber', defaultVal: 1, from: floatFromModel, editor: editorTemplates.getEditor('numeric')
};
export const runningBand = {
    propertyName: 'runningBand', modelName: '@RunningBand', link: true, displayName: 'Running Band', localizationId: 'DevExpress.XtraReports.UI.XRPageInfo.RunningBand', editor: designerEditorTemplates.getEditor('runningBand')
};
export const pageInfoSerializationsInfo = [
    anchorVertical, anchorHorizontal, textAlignment, wordWrap, textFormatString, pageInfo, startPageNumber, runningBand,
    textControlScripts, rtl, action,
    dataBindings(['Bookmark', 'NavigateUrl', 'Tag']),
].concat(sizeLocation, commonControlProperties, fontGroup, navigationGroup).filter(x => x != accessibleDescription);
export const popularPropertiesPageInfo = ['pageInfo', 'startPageNumber', 'textFormatString', 'runningBand', 'anchorVertical'];
