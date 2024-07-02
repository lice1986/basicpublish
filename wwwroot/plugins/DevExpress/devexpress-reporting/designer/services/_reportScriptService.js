﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportScriptService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import { HandlerUri } from '../utils/settings';
export class ReportScriptService {
    static validateScripts(report) {
        return sendRequest(HandlerUri(), 'validateScripts', JSON.stringify({
            report: JSON.stringify({
                'XtraReportsLayoutSerializer': report.serialize()
            })
        }));
    }
    static getCompletions(editor, session, pos, prefix, callback, report, editorInstance, guid) {
        if (guid) {
            return sendRequest(HandlerUri(), 'getCompletions', JSON.stringify({
                Line: pos.row,
                Column: pos.column,
                Guid: guid,
                Script: editorInstance.getValue()
            }));
        }
        else {
            return $.Deferred().resolve().promise();
        }
    }
    static setCodeDom(key, reportLayout) {
        return sendRequest(HandlerUri(), 'setReportLayout', JSON.stringify({
            ReportLayout: reportLayout,
            Key: key
        }));
    }
}
