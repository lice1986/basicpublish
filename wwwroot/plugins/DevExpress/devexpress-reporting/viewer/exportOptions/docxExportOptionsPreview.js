﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\docxExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { pageRange, docxTableLayout, rasterizeImages, rasterizationResolution, exportPageBreaks, exportWatermarks, docxExportMode } from '../../common/exportOptions/metadata';
import { keepRowHeight } from '../../common/exportOptions/rtfMetaData';
import { docxDocumentOptions } from '../../common/exportOptions/docxMetaData';
import { DocxExportOptions } from '../../common/exportOptions/docxExportOptions';
import { docxExportModeMergedPreview, excludeModesForMergedDocuments } from './metadata';
const docxExportOptionsSerializationInfoPreview = [
    pageRange,
    docxTableLayout,
    keepRowHeight,
    rasterizeImages,
    rasterizationResolution,
    exportPageBreaks,
    exportWatermarks,
    docxDocumentOptions,
];
export class DocxExportOptionsPreview extends DocxExportOptions {
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    getInfo() {
        const variableInfo = this._getVariableInfo();
        return variableInfo.concat(docxExportOptionsSerializationInfoPreview);
    }
    _getVariableInfo() {
        return [docxExportMode];
    }
}
export class DocxExportOptionsMergedPreview extends DocxExportOptionsPreview {
    _getVariableInfo() {
        return [docxExportModeMergedPreview];
    }
    isPropertyDisabled(name) {
        return super.isPropertyDisabled(name) || name === docxExportModeMergedPreview.propertyName;
    }
    constructor(model, serializer) {
        super(model, serializer);
        this._set('docxExportMode', excludeModesForMergedDocuments);
    }
}
