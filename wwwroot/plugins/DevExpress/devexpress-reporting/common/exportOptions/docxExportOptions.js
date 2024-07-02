﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\docxExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { docxExportOptionsSerializationInfo } from './docxMetaData';
import { docxExportMode } from './metadata';
import { BaseRenderingMultiplatformModel } from '@devexpress/analytics-core/analytics-serializer-native';
export class DocxExportOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new DocxExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, docxExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return docxExportOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        const exportMode = this.docxExportMode ? this._get('docxExportMode') : docxExportMode.defaultVal;
        if (name === 'pageRange' || name === 'tableLayout')
            return exportMode === 'SingleFile';
        else if (name === 'emptyFirstPageHeaderFooter' || name === 'exportPageBreaks') {
            return exportMode === 'SingleFilePageByPage';
        }
        else if (name === 'keepRowHeight') {
            return exportMode === 'SingleFilePageByPage' && !this._get('tableLayout');
        }
    }
}