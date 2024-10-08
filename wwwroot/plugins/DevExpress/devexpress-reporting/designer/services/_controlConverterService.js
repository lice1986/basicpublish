﻿/**
* DevExpress HTML/JS Reporting (designer\services\_controlConverterService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest, getErrorMessage, ShowMessage } from '@devexpress/analytics-core/analytics-internal';
import { HandlerUri } from '../utils/settings';
export class ControlConverterService {
    static getXmlStringFromJson(controlJsonLayout, doneCallback, errorCallback) {
        return sendRequest(HandlerUri(), 'jsonToXmlString', JSON.stringify({ 'XRControlSerializer': { 'Controls': { 'Item1': controlJsonLayout } } }))
            .done((result) => doneCallback(result))
            .fail((error) => {
            const message = getErrorMessage(error);
            message && ShowMessage(message);
            errorCallback(error);
        });
    }
    static getControlModelFromXmlString(controlXmlLayout, doneCallback, errorCallback) {
        return sendRequest(HandlerUri(), 'xmlStringToJson', controlXmlLayout)
            .done((result) => doneCallback(JSON.parse(result).XRControlSerializer.Controls.Item1))
            .fail((error) => {
            const message = getErrorMessage(error);
            message && ShowMessage(message);
            errorCallback(error);
        });
    }
}
