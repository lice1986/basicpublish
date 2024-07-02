﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_dataMemberBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export declare class DataMemberBase extends Disposable {
    private _separator;
    private _assignValueDataMembers;
    private _valueDataMembersToString;
    toString(): string;
    constructor(value: any, valueScaleType?: any);
    valueScaleType: any;
    get arrayValueDataMemberNames(): string[];
}