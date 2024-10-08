﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_summaryOptionsPageUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export class SummaryOptionsWrapper {
    constructor(name, displayName) {
        this.avg = ko.observable(false);
        this.count = ko.observable(false);
        this.max = ko.observable(false);
        this.min = ko.observable(false);
        this.sum = ko.observable(false);
        this._name = name;
        this.columnName = displayName;
    }
    static _getNumber(value) {
        return value ? 1 : 0;
    }
    getOptions() {
        return {
            columnName: this._name,
            flags: SummaryOptionsWrapper._getNumber(this.sum()) << 0 |
                SummaryOptionsWrapper._getNumber(this.avg()) << 1 |
                SummaryOptionsWrapper._getNumber(this.min()) << 2 |
                SummaryOptionsWrapper._getNumber(this.max()) << 3 |
                SummaryOptionsWrapper._getNumber(this.count()) << 4
        };
    }
}
