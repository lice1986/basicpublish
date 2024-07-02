﻿/**
* DevExpress HTML/JS Reporting (designer\services\reportStorageWeb.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest, getErrorMessage, NotifyAboutWarning } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { convertMapToKeyValuePair } from '../../common/types';
import { ReportViewModel } from '../controls/xrReport';
import { reportStorageWebIsRegister } from '../internal/_settings';
import { updateDataSourceRefs } from '../internal/_utils';
import { HandlerUri } from '../utils/settings';
export class ReportStorageWeb {
    static getErrorMessageHandler(defaultErrorMessage) {
        return function (message, jqXHR, textStatus) {
            const error = getErrorMessage(jqXHR);
            NotifyAboutWarning(error || defaultErrorMessage || message || 'Internal Server Error', true);
        };
    }
    static getReportByUrl(url) {
        const $deferred = $.Deferred();
        ReportStorageWeb.getData(url).done((result) => {
            if (result) {
                const model = new ReportViewModel(JSON.parse(result.reportLayout), undefined, result.knownEnums);
                updateDataSourceRefs(model, result.dataSourceRefInfo);
                $deferred.resolve(model);
            }
            else {
                $deferred.reject();
            }
        }).fail(() => $deferred.reject());
        return $deferred.promise();
    }
    static getData(url) {
        if (reportStorageWebIsRegister()) {
            return sendRequest(HandlerUri(), 'getData', JSON.stringify({
                reportUrl: url
            }), ReportStorageWeb.getErrorMessageHandler());
        }
        else {
            return $.Deferred().promise();
        }
    }
    static setData(layout, url) {
        if (reportStorageWebIsRegister()) {
            return sendRequest(HandlerUri(), 'setData', JSON.stringify({
                reportLayout: JSON.stringify({
                    'XtraReportsLayoutSerializer': layout
                }),
                reportUrl: url
            }), ReportStorageWeb.getErrorMessageHandler(getLocalization('Cannot save the report.', 'ASPxReportsStringId.ReportDesigner_SaveReport_Error')));
        }
        else {
            return $.Deferred().promise();
        }
    }
    static setNewData(layout, url) {
        if (reportStorageWebIsRegister()) {
            return sendRequest(HandlerUri(), 'setNewData', JSON.stringify({
                reportLayout: JSON.stringify({
                    'XtraReportsLayoutSerializer': layout
                }),
                reportUrl: url
            }), ReportStorageWeb.getErrorMessageHandler(getLocalization('Cannot save the report.', 'ASPxReportsStringId.ReportDesigner_SaveReport_Error')));
        }
        else {
            return $.Deferred().promise();
        }
    }
    static getUrls(subreports) {
        if (reportStorageWebIsRegister()) {
            return sendRequest(HandlerUri(), 'getUrls', 'true');
        }
        else {
            return $.Deferred().resolve(convertMapToKeyValuePair(subreports)).promise();
        }
    }
}
