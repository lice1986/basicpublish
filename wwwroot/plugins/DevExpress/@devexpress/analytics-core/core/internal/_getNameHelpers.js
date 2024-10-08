﻿/**
* DevExpress Analytics (core\internal\_getNameHelpers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { koUtils } from '../utils/_koUtils';
export function getTypeNameFromFullName(controlType) {
    return controlType.split(',')[0].trim();
}
export function getShortTypeName(controlType) {
    const fullTypeName = getTypeNameFromFullName(controlType), typeNameParts = fullTypeName.split('.');
    return typeNameParts[typeNameParts.length - 1];
}
export function getControlTypeName(value) {
    let controlType = value.displayType && value.displayType() || value.controlType;
    if (value.getControlFactory) {
        const info = value.getControlFactory().getControlInfo(controlType);
        if (info.displayName)
            controlType = info.displayName;
    }
    return controlType && getLocalization(getShortTypeName(controlType));
}
export function getControlFullName(value) {
    if (!value)
        return '';
    const displayName = koUtils.unwrap(value.name) || koUtils.unwrap(value.displayName), controlType = getControlTypeName(value);
    return displayName + (controlType ? (' (' + controlType + ')') : '');
}
export function getImageClassName(_controlType, isTemplate = false) {
    const controlType = getTypeNameFromFullName(_controlType || '').split('.').join('_');
    let name;
    if (controlType.indexOf('XR') === 0) {
        name = controlType.slice(2).toLowerCase();
    }
    else if (controlType === 'DevExpress_XtraReports_UI_XtraReport') {
        name = 'master_report';
    }
    return (isTemplate ? 'dxrd-svg-toolbox-' : 'dxrd-image-') + (name ? name : controlType.toLowerCase());
}
export function getUniqueNameForNamedObjectsArray(objects, prefix, names) {
    if (prefix.indexOf('XR') === 0) {
        prefix = prefix[2].toLowerCase() + prefix.slice(3);
    }
    else {
        const indexBand = prefix.indexOf('Band');
        if (indexBand !== -1 && prefix !== 'SubBand') {
            prefix = prefix.slice(0, indexBand) + prefix.slice(indexBand + 4);
        }
    }
    return getUniqueName(names || objects.map((item) => { return koUtils.unwrap(item.name); }), prefix);
}
export function getUniqueName(names, prefix, inculdeFirst = true) {
    let i = inculdeFirst ? 1 : 0, result = inculdeFirst ? (prefix + i) : prefix;
    while (names.filter((item) => { return item === result; }).length > 0) {
        i++;
        result = prefix + i;
    }
    return result;
}
