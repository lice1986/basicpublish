﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_value1Value2.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { value1Value2SerializationsInfo } from '../meta/_value';
import { DataMemberBase } from './_dataMemberBase';
export class Value1Value2DataMembers extends DataMemberBase {
    getInfo() {
        return value1Value2SerializationsInfo;
    }
    get arrayValueDataMemberNames() { return ['value1', 'value2']; }
}
