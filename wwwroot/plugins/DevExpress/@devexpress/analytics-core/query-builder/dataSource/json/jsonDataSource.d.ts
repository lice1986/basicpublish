﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonDataSource.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IDataSourceBase } from '../sql/sqlDataSource';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { IModelSerializer } from '../../../serializer/serializer';
import { RequestWrapper } from '../../utils/requestwrapper';
import { JsonSchemaProvider } from './jsonSchemaProvider';
import { IParameter } from '../../wizard/internal/_utils';
import { JsonSchemaRootNode } from './jsonSchemaNode';
import { JsonSource } from './jsonSource';
export declare class JsonDataSource extends Disposable implements IDataSourceBase {
    getInfo(): ISerializationInfoArray;
    clone(_serializer?: IModelSerializer): JsonDataSource;
    static from(model: any, serializer?: IModelSerializer): JsonDataSource;
    static toJson(value: any, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer, requestWrapper?: RequestWrapper);
    getSchema(parameters?: IParameter[]): JQueryPromise<JsonSchemaRootNode>;
    name: ko.Observable<string> | ko.Computed<string>;
    id: string;
    connectionName: ko.Observable<string> | ko.Computed<string>;
    jsonSchemaProvider: JsonSchemaProvider;
    schema: JsonSchemaRootNode;
    rootElement: ko.Observable<string> | ko.Computed<string>;
    source: JsonSource;
}