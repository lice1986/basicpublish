﻿/**
* DevExpress Analytics (property-grid\localization\localization_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '../../serializer/_utils';
import { custom_localization_values, getLocalization as _getLocalization, messages, removeWinSymbols } from './_localization';
export function addCultureInfo(json) {
    extend(messages, json.messages);
}
export function getLocalization(text, id, _removeWinSymblols) {
    return _getLocalization(text, id, removeWinSymbols);
}
export function _stringEndsWith(value, searchString) {
    return value.indexOf(searchString, value.length - searchString.length) !== -1;
}
export function updateLocalization(object) {
    extend(custom_localization_values, object);
    const messages = {};
    Object.keys(object).forEach(name => {
        messages[name] = object[name];
    });
    addCultureInfo({
        messages: messages
    });
}
