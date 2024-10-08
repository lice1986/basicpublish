﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\rtfExportOptionsPreview.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { RtfExportOptions } from '../../common/exportOptions/rtfExportOptions';
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
export declare class RtfExportOptionsPreview extends RtfExportOptions {
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    _getVariableInfo(): ISerializationInfoArray;
}
export declare class RtfExportOptionsMergedPreview extends RtfExportOptionsPreview {
    _getVariableInfo(): ISerializationInfoArray;
    isPropertyDisabled(name: string): boolean;
    constructor(model: any, serializer: any);
}
