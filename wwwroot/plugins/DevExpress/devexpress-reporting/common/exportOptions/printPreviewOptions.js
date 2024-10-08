﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\printPreviewOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { currentModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { printPreviewOptionsSerializationInfo } from './printPreviewMetaData';
export class PrintPreviewOptions {
    static from(model, serializer) {
        return new PrintPreviewOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, printPreviewOptionsSerializationInfo, refs);
    }
    getInfo() {
        return printPreviewOptionsSerializationInfo;
    }
    constructor(model, serializer) {
        serializer = serializer || currentModelSerializer();
        serializer.deserialize(this, model);
    }
}
