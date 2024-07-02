﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_summaryOptionsPageUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface ISummaryOptions {
    columnName: string;
    flags: number;
}
export declare class SummaryOptionsWrapper {
    private _name;
    private static _getNumber;
    constructor(name: string, displayName: string);
    columnName: string;
    avg: ko.Observable<boolean>;
    count: ko.Observable<boolean>;
    max: ko.Observable<boolean>;
    min: ko.Observable<boolean>;
    sum: ko.Observable<boolean>;
    getOptions(): ISummaryOptions;
}
