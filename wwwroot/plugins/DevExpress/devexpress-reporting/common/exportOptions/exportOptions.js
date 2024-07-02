﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\exportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { exportOptionsSerializationInfo } from './exportOptionsMetaData';
import { currentModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
export class ExportOptions {
    static from(model, serializer) {
        return new ExportOptions().deserialize(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, exportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return exportOptionsSerializationInfo;
    }
    deserialize(model, serializer) {
        serializer = serializer || currentModelSerializer();
        serializer.deserialize(this, model);
        return this;
    }
}