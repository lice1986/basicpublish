﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_commonValue.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataMemberBase } from './_dataMemberBase';
export declare class CommonValueDataMembers extends DataMemberBase {
    static from(value: any): CommonValueDataMembers;
    static toJson(value: any): any;
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    get arrayValueDataMemberNames(): string[];
}
