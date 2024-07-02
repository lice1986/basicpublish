﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\imageExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { imageExportOptionsSerializationInfo } from './imageMetaData';
import { imageExportMode } from './metadata';
import { BaseRenderingMultiplatformModel } from '@devexpress/analytics-core/analytics-serializer-native';
export class ImageExportOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new ImageExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, imageExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return imageExportOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        return ((name === 'pageRange') || (name === 'pageBorderWidth')) && ((this.imageExportMode ? this._get('imageExportMode') : imageExportMode.defaultVal) === 'SingleFile');
    }
}