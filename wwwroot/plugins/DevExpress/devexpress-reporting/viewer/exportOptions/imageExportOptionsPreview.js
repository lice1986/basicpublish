﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\imageExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { imageExportOptionsSerializationInfoBase } from '../../common/exportOptions/imageMetaData';
import { ImageExportOptions } from '../../common/exportOptions/imageExportOptions';
import { imageExportModePreview, imageExportModeMergedPreview, excludeModesForMergedDocuments } from './metadata';
const imageExportOptionsSerializationInfoPreview = [].concat(imageExportOptionsSerializationInfoBase);
export class ImageExportOptionsPreview extends ImageExportOptions {
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    getInfo() {
        const variableInfo = this._getVariableInfo();
        return variableInfo.concat(imageExportOptionsSerializationInfoPreview);
    }
    _getVariableInfo() {
        return [imageExportModePreview];
    }
}
export class ImageExportOptionsMergedPreview extends ImageExportOptionsPreview {
    _getVariableInfo() {
        return [imageExportModeMergedPreview];
    }
    isPropertyDisabled(name) {
        return super.isPropertyDisabled(name) || name === imageExportModeMergedPreview.propertyName;
    }
    constructor(model, serializer) {
        super(model, serializer);
        this._set('imageExportMode', excludeModesForMergedDocuments);
    }
}
