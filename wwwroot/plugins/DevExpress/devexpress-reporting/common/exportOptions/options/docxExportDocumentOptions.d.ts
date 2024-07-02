﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\docxExportDocumentOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
export declare class DocxExportDocumentOptions {
    static from(model: any, serializer?: IModelSerializer): DocxExportDocumentOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
}
export declare const docxExportDocumentOptionsSerializationInfo: ISerializationInfoArray;
