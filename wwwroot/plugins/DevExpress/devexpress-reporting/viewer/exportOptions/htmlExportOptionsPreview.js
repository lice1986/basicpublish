﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\htmlExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { htmlExportOptionsSerializationInfoBase } from '../../common/exportOptions/htmlMetaData';
import { HtmlExportOptions } from '../../common/exportOptions/htmlExportOptions';
import { htmlExportModePreview, htmlExportModeMergedPreview, excludeModesForMergedDocuments } from './metadata';
const htmlExportOptionsSerializationInfoPreview = [].concat(htmlExportOptionsSerializationInfoBase);
export class HtmlExportOptionsPreview extends HtmlExportOptions {
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    getInfo() {
        const variableInfo = this._getVariableInfo();
        return variableInfo.concat(htmlExportOptionsSerializationInfoPreview);
    }
    _getVariableInfo() {
        return [htmlExportModePreview];
    }
}
export class HtmlExportOptionsMergedPreview extends HtmlExportOptionsPreview {
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