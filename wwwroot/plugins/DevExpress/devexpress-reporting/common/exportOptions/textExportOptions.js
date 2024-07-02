﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\textExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { currentModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { textExportOptionsSerializationInfo } from './textMetaData';
export class TextExportOptions {
    static from(model, serializer) {
        return new TextExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, textExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return textExportOptionsSerializationInfo;
    }
    constructor(model, serializer) {
        serializer = serializer || currentModelSerializer();
        serializer.deserialize(this, model);
    }
}
