﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfExportDocumentOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
export declare class PdfExportDocumentOptions {
    static from(model: any, serializer?: IModelSerializer): PdfExportDocumentOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
}
export declare const author: ISerializationInfo;
export declare const application: ISerializationInfo;
export declare const title: ISerializationInfo;
export declare const subject: ISerializationInfo;
export declare const pdfExportDocumentOptionsSerializationInfo: ISerializationInfoArray;
