﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\pdfExportOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { PdfPasswordSecurityOptions } from './options/pdfPasswordSecurityOptions';
import { BaseRenderingMultiplatformModel, IViewModel, MultiPlatformObservable } from '@devexpress/analytics-core/analytics-serializer-native';
export declare class PdfExportOptions extends BaseRenderingMultiplatformModel<IViewModel> {
    static from(model: any, serializer?: IModelSerializer): PdfExportOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    isPropertyDisabled(propertyName: string): boolean;
    getInfo(): ISerializationInfoArray;
    hasSensitiveData(): boolean;
    pdfACompatibility: MultiPlatformObservable<string>;
    pdfUACompatibility: MultiPlatformObservable<string>;
    showPrintDialogOnOpen: MultiPlatformObservable<boolean>;
    pdfPasswordSecurityOptions: PdfPasswordSecurityOptions;
}