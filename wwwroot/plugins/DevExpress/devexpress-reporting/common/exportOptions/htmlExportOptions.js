﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\htmlExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { htmlExportOptionsSerializationInfo } from './htmlMetaData';
import { htmlExportMode } from './metadata';
import { BaseRenderingMultiplatformModel } from '@devexpress/analytics-core/analytics-serializer-native';
export class HtmlExportOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new HtmlExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, htmlExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return htmlExportOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        return ((name === 'pageRange') || (name === 'pageBorderWidth') || (name === 'exportWatermarks')) && ((this.htmlExportMode ? this._get('htmlExportMode') : htmlExportMode.defaultVal) === 'SingleFile');
    }
}
