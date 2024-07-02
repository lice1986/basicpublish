﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_fillStyle.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class FillStyle extends SerializableModel {
    static from(info: any, gradientTypeName: any): (model: any, serializer: any) => FillStyle;
    static toJson(model: FillStyle, serializer: IModelSerializer, refs: any): any;
    private _optionsTypeMap;
    constructor(model: any, info: ISerializationInfoArray, gradientTypeName: string, serializer?: IModelSerializer);
    isPropertyVisible(propertyName: any): any;
    updateOptions(fillMode: string, serializer: any, optionsObject: any): void;
    fillMode: ko.Observable<string> | ko.Computed<string>;
    options: ko.Observable<any>;
    gradientTypeName: string;
}
export declare const viewFillMode: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    valuesArray: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    defaultVal: string;
};
export declare const fillStyleInfo: (ISerializationInfo | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    valuesArray: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    defaultVal: string;
})[];
export declare const stripFillStyle: ISerializationInfo;
