﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfPasswordSecurityOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { BaseRenderingMultiplatformModel, IViewModel, MultiPlatformObservable } from '@devexpress/analytics-core/analytics-serializer-native';
export declare class PdfPasswordSecurityOptions extends BaseRenderingMultiplatformModel<IViewModel> {
    static from(model: any, serializer?: IModelSerializer): PdfPasswordSecurityOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    isPropertyDisabled(name: string): boolean;
    hasSensitiveData(): boolean;
    openPassword: MultiPlatformObservable<string>;
    permissionsPassword: MultiPlatformObservable<string>;
}
export declare const pdfEncryptionLevel: ISerializationInfo;
export declare const pdfExportPasswordSecurityOptionsSerializationInfo: ISerializationInfoArray;
