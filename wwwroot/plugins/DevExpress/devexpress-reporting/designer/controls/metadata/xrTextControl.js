﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTextControl.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { createSinglePopularBindingInfos } from '../utils/_metaUtils';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { textEditOptions } from './properties/editOptions';
import { accessibleRole, allowMarkupText, autoWidth, textTrimming } from './properties/metadata';
import { labelGroup, sizeLocation } from './properties/metadataGroups';
import { labelScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
export const labelSerializationsInfo = [
    accessibleRole,
    textEditOptions,
    allowMarkupText, autoWidth, anchorVertical, anchorHorizontal, labelScripts, textTrimming,
    action, dataBindings(['Text', 'NavigateUrl', 'Tag', 'Bookmark'])
].concat(createSinglePopularBindingInfos('Text'), sizeLocation, labelGroup);
export const popularPropertiesLabel = ['text', 'textArea', 'popularDataBinding', 'textFormatString', 'Summary', 'angle', 'bookmark', 'bookmarkParent', 'allowMarkupText', 'autoWidth', 'canGrow', 'canShrink', 'multiline', 'wordWrap'];