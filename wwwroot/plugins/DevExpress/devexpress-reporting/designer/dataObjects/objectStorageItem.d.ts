﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectStorageItem.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { Disposable, IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
export declare class ObjectItem extends Disposable {
    dsHelperProvider?: () => DataSourceHelper;
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    afterDeserialization(model: any, serializer: any): void;
    preInitProperties(model: any, dsHelperProvider?: () => DataSourceHelper, serializer?: IModelSerializer): void;
    constructor(model: any, dsHelperProvider?: () => DataSourceHelper, serializer?: IModelSerializer);
    objectType: ko.Observable<string> | ko.Computed<string>;
}
export declare class ObjectStorageItem extends ObjectItem {
    _getInfo(): ISerializationInfoArray;
    preInitProperties(model: any): void;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    isEmpty(): boolean;
    content: ko.Observable<string> | ko.Computed<string>;
    type: ko.Observable<string> | ko.Computed<string>;
    name: ko.Observable<string> | ko.Computed<string>;
}
export declare class ObjectStorageParameter extends SerializableModel {
    constructor(model: any, serializer?: IModelSerializer);
}