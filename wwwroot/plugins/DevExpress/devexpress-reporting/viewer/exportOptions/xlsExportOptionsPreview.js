﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\xlsExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { xlsExportOptionsSerializationInfoBase, xlsExportOptionsSerializationInfoCommon } from '../../common/exportOptions/xlsMetaData';
import { XlsExportOptions } from '../../common/exportOptions/xlsExportOptions';
import { xlsExportModePreview, xlsExportModeMergedPreview, excludeModesForMergedDocuments } from './metadata';
const xlsExportOptionsSerializationInfoPreview = [].concat(xlsExportOptionsSerializationInfoBase, xlsExportOptionsSerializationInfoCommon);
export class XlsExportOptionsPreview extends XlsExportOptions {
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    getInfo() {
        const variableInfo = this._getVariableInfo();
        return variableInfo.concat(xlsExportOptionsSerializationInfoPreview);
    }
    _getVariableInfo() {
        return [xlsExportModePreview];
    }
}
export class XlsExportOptionsMergedPreview extends XlsExportOptionsPreview {
    _getVariableInfo() {
        return [xlsExportModeMergedPreview];
    }
    isPropertyDisabled(name) {
        return super.isPropertyDisabled(name) || name === xlsExportModeMergedPreview.propertyName;
    }
    constructor(model, serializer) {
        super(model, serializer);
        this._set('xlsExportMode', excludeModesForMergedDocuments);
    }
}
