﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonAuthenticationInfo.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IModelSerializer } from '../../../serializer/serializer';
export declare class JsonAuthenticationInfo {
    static from(model: any, serializer?: IModelSerializer): JsonAuthenticationInfo;
    static toJson(value: JsonAuthenticationInfo, serializer: any, refs: any): any;
    getInfo(): {
        propertyName: string;
        modelName: string;
        defaultVal: string;
    }[];
    constructor(model: any, serializer?: IModelSerializer);
    password: ko.Observable<string> | ko.Computed<string>;
    userName: ko.Observable<string> | ko.Computed<string>;
}
