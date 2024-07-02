﻿/**
* DevExpress Analytics (core\internal\requestManager.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AjaxRequestManager } from './_ajaxRequestManager';
import { FetchRequestManager } from './_fetchRequestManager';
import { isDefined } from './_isDefined';
let _requestManagerInstance = null;
export const requestManager = {
    getInstance: function (requestManagerSetup) {
        if (!_requestManagerInstance) {
            this._initialize(requestManagerSetup);
        }
        return _requestManagerInstance;
    },
    _initialize: function (requestManagerSetup) {
        const { ajaxSetup, fetchSetup } = requestManagerSetup !== null && requestManagerSetup !== void 0 ? requestManagerSetup : {};
        if (isDefined(ajaxSetup === null || ajaxSetup === void 0 ? void 0 : ajaxSetup.ajaxSettings) && isDefined(fetchSetup === null || fetchSetup === void 0 ? void 0 : fetchSetup.fetchSettings)) {
            throw new Error('You cannot configure more than one type of request manager. Use either ajaxSetup or fetchSetup for configuration, but not both.');
        }
        if (isDefined(ajaxSetup === null || ajaxSetup === void 0 ? void 0 : ajaxSetup.ajaxSettings)) {
            requestManager.initialize(new AjaxRequestManager(() => ajaxSetup.ajaxSettings));
            return;
        }
        requestManager.initialize(new FetchRequestManager(() => fetchSetup === null || fetchSetup === void 0 ? void 0 : fetchSetup.fetchSettings));
    },
    initialize: function (requestManagerInstance) {
        _requestManagerInstance = requestManagerInstance;
    }
};
export function _isFetchConfigured() {
    return _requestManagerInstance.useFetch;
}