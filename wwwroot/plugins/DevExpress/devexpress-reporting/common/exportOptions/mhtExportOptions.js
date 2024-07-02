﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\mhtExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { htmlExportMode } from './metadata';
import { mhtExportOptionsSerializationInfo } from './mhtMetaData';
import { BaseRenderingMultiplatformModel } from '@devexpress/analytics-core/analytics-serializer-native';
export class MhtExportOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new MhtExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, mhtExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return mhtExportOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        return ((name === 'pageRange') || (name === 'pageBorderWidth')) && ((this.htmlExportMode ? this._get('htmlExportMode') : htmlExportMode.defaultVal) === 'SingleFile');
    }
}