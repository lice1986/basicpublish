﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\htmlExportOptionsPreview.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { HtmlExportOptions } from '../../common/exportOptions/htmlExportOptions';
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
export declare class HtmlExportOptionsPreview extends HtmlExportOptions {
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    _getVariableInfo(): ISerializationInfoArray;
}
export declare class HtmlExportOptionsMergedPreview extends HtmlExportOptionsPreview {
    _getVariableInfo(): ISerializationInfoArray;
    isPropertyDisabled(name: string): boolean;
    constructor(model: any, serializer: any);
}
