﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\rtfExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { rtfExportMode } from './metadata';
import { rtfExportOptionsSerializationInfo } from './rtfMetaData';
import { BaseRenderingMultiplatformModel } from '@devexpress/analytics-core/analytics-serializer-native';
export class RtfExportOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new RtfExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, rtfExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return rtfExportOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        const exportMode = this.rtfExportMode ? this._get('rtfExportMode') : rtfExportMode.defaultVal;
        if (name === 'pageRange')
            return exportMode === 'SingleFile';
        else if (name === 'emptyFirstPageHeaderFooter' || name === 'exportPageBreaks' || name === 'keepRowHeight') {
            return exportMode === 'SingleFilePageByPage';
        }
    }
}
