﻿/**
* DevExpress Analytics (property-grid\localization\_localization.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as localization from 'devextreme/localization';
import * as $ from 'jquery';
import { deserializeDate } from '../../serializer/_date.utiles';
import { extend } from '../../serializer/_utils';
export function loadMessages(_messages) {
    extend(messages, _messages);
}
function _processLocalization(id, _removeWinSymbols = removeWinSymbols) {
    const text = localize(id);
    if (text && _removeWinSymbols) {
        if (text.indexOf('&') !== -1 ||
            text.indexOf('<u>') !== -1 ||
            text.indexOf('</u>') !== -1) {
            const obj = {};
            obj[id] = text.replace('&', '').replace('<u>', '').replace('</u>', '');
            loadMessages(obj);
            return obj[id];
        }
    }
}
function _getLocalization(text) {
    return localize(text) || text;
}
export function getLocalization(text, id = null, _removeWinSymbols = removeWinSymbols) {
    let _localizedText = id && localize(id) || _getLocalization(text);
    _localizedText = id && _processLocalization(id, _removeWinSymbols) || _localizedText;
    if (isCustomizedWithUpdateLocalizationMethod(_localizedText)) {
        text = _localizedText;
    }
    if (!isCustomizedWithUpdateLocalizationMethod(text)) {
        return _localizedText;
    }
    return _getLocalization(text);
}
export const removeWinSymbols = true;
export const Globalize = window['Globalize'];
export const messages = {};
export const custom_localization_values = {};
export function selectPlaceholder() {
    return getLocalization('Select...', 'AnalyticsCoreStringId.PropertyGrid_Editor_EmptyText');
}
export function noDataText() {
    return getLocalization('No data to display', 'AnalyticsCoreStringId.DataPreview_Empty');
}
export function searchPlaceholder() {
    return getLocalization('Enter text to search...', 'AnalyticsCoreStringId.QueryBuilder_SearchBox_EmptyText');
}
export function resolveFromPromises(promises, createModel) {
    const deferred = $.Deferred();
    if (promises.length > 0) {
        $.when(...promises).done((...messages) => {
            messages.forEach(x => loadMessages(x[0]));
        }).always(() => deferred.resolve(createModel()));
    }
    else {
        deferred.resolve(createModel());
    }
    return deferred;
}
export function isCustomizedWithUpdateLocalizationMethod(text) {
    return !!custom_localization_values[text];
}
export function localizeWithUpdateLocalizationMethod(oldText) {
    return isCustomizedWithUpdateLocalizationMethod(oldText) ? getLocalization(oldText) : false;
}
export function localize(val) {
    return messages[val];
}
export function formatDate(val) {
    return localization.formatDate(val, 'shortDate');
}
export function parseDate(val, useDefault = true, format) {
    if (!useDefault)
        return format ? localization.parseDate(val, format) : localization.parseDate(val, undefined);
    if (val) {
        if (val instanceof Date)
            return val;
        return deserializeDate(val);
    }
    return null;
}
