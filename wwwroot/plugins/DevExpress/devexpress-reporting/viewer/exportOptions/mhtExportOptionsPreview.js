﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\mhtExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { mhtExportOptionsSerializationInfoBase } from '../../common/exportOptions/mhtMetaData';
import { MhtExportOptions } from '../../common/exportOptions/mhtExportOptions';
import { htmlExportModePreview, htmlExportModeMergedPreview, excludeModesForMergedDocuments } from './metadata';
const mhtExportOptionsSerializationInfoPreview = [].concat(mhtExportOptionsSerializationInfoBase);
export class MhtExportOptionsPreview extends MhtExportOptions {
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    getInfo() {
        const variableInfo = this._getVariableInfo();
        return variableInfo.concat(mhtExportOptionsSerializationInfoPreview);
    }
    _getVariableInfo() {
        return [htmlExportModePreview];
    }
}
export class MhtExportOptionsMergedPreview extends MhtExportOptionsPreview {
    _getVariableInfo() {
        return [htmlExportModeMergedPreview];
    }
    isPropertyDisabled(name) {
        return super.isPropertyDisabled(name) || name === htmlExportModeMergedPreview.propertyName;
    }
    constructor(model, serializer) {
        super(model, serializer);
        this._set('htmlExportMode', excludeModesForMergedDocuments);
    }
}
