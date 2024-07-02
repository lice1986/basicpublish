﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonSource.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IModelSerializer } from '../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { JsonParameter } from './jsonParameter';
import { JsonAuthenticationInfo } from './jsonAuthenticationInfo';
export declare class JsonSource extends Disposable {
    private static _URIJSONSOURCE_TYPE;
    private static _CUSTOMJSONSOURCE_TYPE;
    static from(model: any, serializer?: IModelSerializer): JsonSource;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model?: any, serializer?: IModelSerializer);
    sourceType: ko.Observable<string>;
    uri: ko.Observable<string>;
    json: ko.Observable<string>;
    authenticationInfo: JsonAuthenticationInfo;
    headers: ko.ObservableArray<JsonParameter>;
    queryParameters: ko.ObservableArray<JsonParameter>;
    pathParameters: ko.ObservableArray<JsonParameter>;
    serialize(includeRootTag?: boolean): any;
    resetSource(): void;
}
