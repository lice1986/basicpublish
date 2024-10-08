﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\rtfExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { rtfExportOptionsSerializationInfoBase } from '../../common/exportOptions/rtfMetaData';
import { RtfExportOptions } from '../../common/exportOptions/rtfExportOptions';
import { rtfExportMode } from '../../common/exportOptions/metadata';
import { rtfExportModeMergedPreview, excludeModesForMergedDocuments } from './metadata';
const rtfExportOptionsSerializationInfoPreview = [].concat(rtfExportOptionsSerializationInfoBase);
export class RtfExportOptionsPreview extends RtfExportOptions {
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    getInfo() {
        const variableInfo = this._getVariableInfo();
        return variableInfo.concat(rtfExportOptionsSerializationInfoPreview);
    }
    _getVariableInfo() {
        return [rtfExportMode];
    }
}
export class RtfExportOptionsMergedPreview extends RtfExportOptionsPreview {
    _getVariableInfo() {
        return [rtfExportModeMergedPreview];
    }
    isPropertyDisabled(name) {
        return super.isPropertyDisabled(name) || name === rtfExportModeMergedPreview.propertyName;
    }
    constructor(model, serializer) {
        super(model, serializer);
        this._set('rtfExportMode', excludeModesForMergedDocuments);
    }
}
