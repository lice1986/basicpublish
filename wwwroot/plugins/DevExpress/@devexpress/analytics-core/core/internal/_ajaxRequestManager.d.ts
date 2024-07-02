﻿/**
* DevExpress Analytics (core\internal\_ajaxRequestManager.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IRequestManager } from './_requestManager';
export declare class AjaxRequestManager implements IRequestManager<JQueryAjaxSettings> {
    getAjaxSettings: () => JQueryAjaxSettings;
    constructor(ajaxSttingsFn: () => JQueryAjaxSettings);
    sendRequest(settings: JQueryAjaxSettings): JQueryXHR;
    _prepareRequestSettings(settings: JQueryAjaxSettings): JQueryAjaxSettings;
}