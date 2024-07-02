﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_designerErrorProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { HandlerUri } from '../../utils/settings';
export class DesignerErrorProvider extends Disposable {
    constructor(_report) {
        super();
        this._report = _report;
        this.errors = ko.observableArray([]);
    }
    collectErrors() {
        return sendRequest(HandlerUri(), 'getDesignErrors', JSON.stringify({
            'XtraReportsLayoutSerializer': this._report.serialize()
        })).done((result) => {
            this.errors(result);
        });
    }
}
