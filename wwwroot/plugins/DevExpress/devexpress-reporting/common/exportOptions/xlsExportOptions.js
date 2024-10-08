﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\xlsExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { xlsExportMode } from './metadata';
import { xlsExportOptionsSerializationInfo } from './xlsMetaData';
import { BaseRenderingMultiplatformModel, currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
export class XlsExportOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new XlsExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, xlsExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return xlsExportOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        return name === 'pageRange' && (this.xlsExportMode ? this._get('xlsExportMode') : xlsExportMode.defaultVal) === 'SingleFile';
    }
    hasSensitiveData() {
        return !!(this.encryptionOptions && this.unwrap(currentMultiPlatformEngine.getPropertyValue(this.encryptionOptions, 'password')));
    }
}
