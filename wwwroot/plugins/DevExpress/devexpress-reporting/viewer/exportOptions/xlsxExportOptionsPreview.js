﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\xlsxExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { xlsExportOptionsSerializationInfoCommon } from '../../common/exportOptions/xlsMetaData';
import { XlsxExportOptions } from '../../common/exportOptions/xlsxExportOptions';
import { xlsxExportModePreview, xlsxExportModeMergedPreview, excludeModesForMergedDocuments } from './metadata';
const xlsxExportOptionsSerializationInfoPreview = [].concat(xlsExportOptionsSerializationInfoCommon);
export class XlsxExportOptionsPreview extends XlsxExportOptions {
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    getInfo() {
        const variableInfo = this._getVariableInfo();
        return variableInfo.concat(xlsxExportOptionsSerializationInfoPreview);
    }
    _getVariableInfo() {
        return [xlsxExportModePreview];
    }
}
export class XlsxExportOptionsMergedPreview extends XlsxExportOptionsPreview {
    _getVariableInfo() {
        return [xlsxExportModeMergedPreview];
    }
    isPropertyDisabled(name) {
        return super.isPropertyDisabled(name) || name === xlsxExportModeMergedPreview.propertyName;
    }
    constructor(model, serializer) {
        super(model, serializer);
        this._set('xlsxExportMode', excludeModesForMergedDocuments);
    }
}
