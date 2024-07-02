﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\sqlDataConnection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IModelSerializer } from '../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { ConnectionOptions } from './connectionOptions';
export declare class SqlDataConnection {
    static from(model: any, serializer?: IModelSerializer): SqlDataConnection;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    name: ko.Observable<string>;
    parameteres: ko.Observable<string>;
    fromAppConfig: ko.Observable<boolean>;
    options: ConnectionOptions;
}