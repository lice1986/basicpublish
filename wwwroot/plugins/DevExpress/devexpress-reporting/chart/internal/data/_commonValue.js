﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_commonValue.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { commonValueSerializationsInfo } from '../meta/_value';
import { DataMemberBase } from './_dataMemberBase';
export class CommonValueDataMembers extends DataMemberBase {
    static from(value) {
        return new CommonValueDataMembers(value, null);
    }
    static toJson(value) {
        return value.toString() || {};
    }
    getInfo() {
        return commonValueSerializationsInfo;
    }
    get arrayValueDataMemberNames() { return ['value']; }
}
