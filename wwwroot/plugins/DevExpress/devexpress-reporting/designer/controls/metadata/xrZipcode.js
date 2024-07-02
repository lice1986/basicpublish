﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrZipcode.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { createSinglePopularBindingInfos } from '../utils/_metaUtils';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { foreColor, keepTogether, text, textFormatString } from './properties/metadata';
import { commonControlProperties, navigationGroup, sizeLocation } from './properties/metadataGroups';
import { textControlScripts } from './properties/scriptMetadata';
export const segmentWidth = { propertyName: 'segmentWidth', modelName: '@SegmentWidth', defaultVal: 4, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Segment Width', localizationId: 'DevExpress.XtraReports.UI.XRZipCode.SegmentWidth' };
export const zipCodeSerializationInfo = [
    foreColor, segmentWidth, keepTogether, anchorVertical, anchorHorizontal, textControlScripts,
    $.extend({}, text, { defaultVal: '0' }), textFormatString,
    dataBindings(['Bookmark', 'NavigateUrl', 'Tag', 'Text'])
].concat(createSinglePopularBindingInfos('Text'), sizeLocation, commonControlProperties, navigationGroup);
export const popularPropertiesZipCode = ['text', 'popularDataBinding', 'segmentWidth', 'bookmark', 'bookmarkParent'];
