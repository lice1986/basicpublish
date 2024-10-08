﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\docxExportOptionsPreview.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DocxExportOptions } from '../../common/exportOptions/docxExportOptions';
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
export declare class DocxExportOptionsPreview extends DocxExportOptions {
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    _getVariableInfo(): ISerializationInfoArray;
}
export declare class DocxExportOptionsMergedPreview extends DocxExportOptionsPreview {
    _getVariableInfo(): ISerializationInfoArray;
    isPropertyDisabled(name: string): boolean;
    constructor(model: any, serializer: any);
}
