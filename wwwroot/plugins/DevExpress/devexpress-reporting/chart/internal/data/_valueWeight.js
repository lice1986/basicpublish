﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_valueWeight.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { valueWeightSerializationsInfo } from '../meta/_value';
import { DataMemberBase } from './_dataMemberBase';
export class ValueWeightDataMembers extends DataMemberBase {
    getInfo() {
        return valueWeightSerializationsInfo;
    }
    get arrayValueDataMemberNames() { return ['value', 'weight']; }
}