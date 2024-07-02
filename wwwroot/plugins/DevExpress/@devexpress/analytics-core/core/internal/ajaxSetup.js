﻿/**
* DevExpress Analytics (core\internal\ajaxSetup.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from 'jquery';
import { _isFetchConfigured, requestManager } from './requestManager';
export const ajaxSetup = {
    ajaxSettings: {},
    sendRequest: function (settings) {
        if (!_isFetchConfigured())
            return requestManager.getInstance().sendRequest(extend({}, this.ajaxSettings, settings));
        const errorMessage = 'The request manager is currently configured as Fetch. Use either ajaxSetup or fetchSetup for configuration, but not both.';
        throw new Error(errorMessage);
    }
};