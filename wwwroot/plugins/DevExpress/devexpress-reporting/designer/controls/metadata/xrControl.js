﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrControl.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { accessibleDescription, allowMarkupText, canGrow, canShrink, keepTogether, rtl } from './properties/metadata';
import { commonControlProperties, navigationGroup, sizeLocation } from './properties/metadataGroups';
import { controlScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
export const panelSerializationsInfo = [
    canGrow, canShrink, keepTogether, anchorVertical, anchorHorizontal, controlScripts, action,
    dataBindings(['Bookmark', 'NavigateUrl', 'Tag']),
    { propertyName: 'controls', modelName: 'Controls', array: true },
    rtl
].concat(sizeLocation, commonControlProperties, navigationGroup).filter(x => x != accessibleDescription);
export const xrControlSerializationsInfo = [
    allowMarkupText, anchorVertical, anchorHorizontal,
    dataBindings(['Tag'])
].concat(sizeLocation, commonControlProperties);
