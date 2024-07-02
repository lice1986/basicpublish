﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\xlsxExportOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { BaseRenderingMultiplatformModel, IModel, IViewModel } from '@devexpress/analytics-core/analytics-serializer-native';
export declare class XlsxExportOptions extends BaseRenderingMultiplatformModel<IViewModel> {
    static from(model: any, serializer?: IModelSerializer): XlsxExportOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    isPropertyDisabled(name: string): boolean;
    hasSensitiveData(): boolean;
    xlsxExportMode: ko.Observable<string> | ko.Computed<string>;
    encryptionOptions: IModel & {
        password: ko.Observable<string>;
    };
}