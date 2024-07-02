﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonSchemaProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IItemsProvider, IDataMemberInfo } from '../../../widgets/utils';
import { JsonSchemaRootNode, JsonSchemaNode, JsonNode } from './jsonSchemaNode';
import { Disposable } from '../../../serializer/disposable';
import { JsonDataSource } from './jsonDataSource';
import { RequestWrapper } from '../../utils/requestwrapper';
import { IPathRequest } from '../../../widgets/common/pathRequest';
import { IParameter } from '../../wizard/internal/_utils';
export interface IJsonSchemaProvider extends IItemsProvider {
    getJsonSchema: () => JQueryPromise<JsonSchemaRootNode>;
}
export declare class JsonSchemaProvider extends Disposable implements IJsonSchemaProvider {
    private _requestWrapper;
    private _jsonSchemaPromise;
    private _jsonDataSource;
    private _jsonSchema;
    constructor(jsonDataSource: JsonDataSource, _requestWrapper?: RequestWrapper);
    reset(): void;
    mapToDataMemberContract(nodes: JsonNode[]): IDataMemberInfo[];
    getSchemaByPath(pathRequest: IPathRequest, jsonSchema: JsonSchemaNode): IDataMemberInfo[];
    getItems: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    getJsonSchema(parameters?: IParameter[]): JQueryPromise<JsonSchemaRootNode>;
}