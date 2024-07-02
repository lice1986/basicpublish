﻿/**
* DevExpress Analytics (core\utils\_utils.ajax.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { extend } from '../../serializer/_utils';
import { dxversions } from '../internal/dx-versions';
import { _errorProcessor, _processError } from '../internal/_processError';
import { getErrorMessage as igetErrorMessage } from './_infoMessageHelpers';
import { requestManager } from '../internal/requestManager';
import { fetchSetup } from '../internal/fetchSetup';
import { ajaxSetup } from '../internal/ajaxSetup';
export function setAjax(newFunc) {
    sendRequest = newFunc;
}
export function _ajax(uri, action, arg, processErrorCallback, ignoreError, customOptions, isError = (data) => !data.success, getErrorMessage = igetErrorMessage, method = 'POST') {
    const deferred = $.Deferred();
    let requestData;
    if (action !== undefined && arg !== undefined) {
        requestData = {
            actionKey: action,
            arg: encodeURIExtended(arg),
            dxversions: JSON.stringify(dxversions)
        };
    }
    const requestManagerSetup = {
        ajaxSetup,
        fetchSetup
    };
    requestManager.getInstance(requestManagerSetup).sendRequest(extend({}, {
        type: method,
        data: requestData,
        url: uri
    }, customOptions)).fail((jqXHR, textStatus, errorThrown) => {
        if (ignoreError && ignoreError()) {
            deferred.reject();
            return;
        }
        _errorProcessor.call({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown, getRequestDetails: () => requestData || uri });
        _processError(errorThrown, deferred, jqXHR, textStatus, processErrorCallback);
    })
        .done((data, textStatus, jqXHR) => {
        if (!data) {
            deferred.reject();
            return;
        }
        if (!isError(data)) {
            deferred.resolve(data.result);
        }
        else {
            if (ignoreError && ignoreError()) {
                deferred.reject();
                return;
            }
            _errorProcessor.call({ jqXHR: jqXHR, textStatus: textStatus, data: data, errorThrown: getErrorMessage(jqXHR), getRequestDetails: () => requestData || uri });
            _processError('Internal Server Error', deferred, jqXHR, textStatus, processErrorCallback);
        }
    });
    return deferred.promise();
}
export function _ajaxWithOptions(options) {
    return _ajax(options.uri, options.action, options.arg, options.processErrorCallback, options.ignoreError, options.customOptions, options.isError, options.getErrorMessage, options.method);
}
export function encodeURIExtended(str) {
    const replaceRegs = [
        { reg: new RegExp(/\(/g), value: '%28' },
        { reg: new RegExp(/\)/g), value: '%29' }
    ];
    let encoded = encodeURIComponent(str);
    replaceRegs.forEach(replaceRule => encoded = encoded.replace(replaceRule.reg, replaceRule.value));
    return encoded;
}
export let sendRequest = (...params) => {
    if (params.length > 1) {
        return _ajax.apply(this, params);
    }
    else {
        return _ajaxWithOptions(params[0]);
    }
};
