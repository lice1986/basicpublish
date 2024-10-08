﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\xlsxExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { xlsxExportMode } from './metadata';
import { xlsxExportOptionsSerializationInfo } from './xlsxMetaData';
import { BaseRenderingMultiplatformModel, currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
export class XlsxExportOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new XlsxExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, xlsxExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return xlsxExportOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        return name === 'pageRange' && (this.xlsxExportMode ? this._get('xlsxExportMode') : xlsxExportMode.defaultVal) === 'SingleFile';
    }
    hasSensitiveData() {
        return !!(this.encryptionOptions && this.unwrap(currentMultiPlatformEngine.getPropertyValue(this.encryptionOptions, 'password')));
    }
}
