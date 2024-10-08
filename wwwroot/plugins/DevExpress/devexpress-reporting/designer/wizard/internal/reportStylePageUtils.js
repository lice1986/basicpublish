﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\reportStylePageUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
export var ReportStyle;
(function (ReportStyle) {
    ReportStyle[ReportStyle["Bold"] = 0] = "Bold";
    ReportStyle[ReportStyle["Casual"] = 1] = "Casual";
    ReportStyle[ReportStyle["Compact"] = 2] = "Compact";
    ReportStyle[ReportStyle["Corporate"] = 3] = "Corporate";
    ReportStyle[ReportStyle["Formal"] = 4] = "Formal";
})(ReportStyle || (ReportStyle = {}));
export class ReportStyleItem {
    constructor(textDefault, textID, reportStyle) {
        this.reportStyle = reportStyle;
        this.text = getLocalization(textDefault, textID);
    }
    get className() {
        return 'dxrd-wizard-report-style-image ' + ReportStyle[this.reportStyle].toLowerCase();
    }
}
