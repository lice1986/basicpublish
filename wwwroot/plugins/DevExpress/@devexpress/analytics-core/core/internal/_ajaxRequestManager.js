﻿/**
* DevExpress Analytics (core\internal\_ajaxRequestManager.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { extend } from '../../serializer/_utils';
export class AjaxRequestManager {
    constructor(ajaxSttingsFn) {
        this.getAjaxSettings = ajaxSttingsFn;
    }
    sendRequest(settings) {
        const requestSettings = this._prepareRequestSettings(settings);
        return $.ajax(requestSettings);
    }
    _prepareRequestSettings(settings) {
        return extend({}, this.getAjaxSettings(), settings);
    }
}