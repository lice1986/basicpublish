﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\lookUpValue.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfo, ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ObjectStorageItem } from '../objectStorageItem';
export declare class LookUpValue {
    static createNew(): LookUpValue;
    static from(model: any, serializer: ModelSerializer): LookUpValue;
    static toJson(value: any, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    description: ko.Observable<string> | ko.Computed<string>;
    _value: ko.Observable<ObjectStorageItem> | ko.Computed<ObjectStorageItem>;
    value: ko.Computed<any>;
    valueInfo: ko.Observable<ISerializationInfo> | ko.Computed<ISerializationInfo>;
    get isEmpty(): boolean;
}
