﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonSchemaNode.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IModelSerializer } from '../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { IPathRequest } from '../../../widgets/common/pathRequest';
export declare enum JsonNodeType {
    Object = 0,
    Array = 1,
    Property = 2
}
export declare class JsonNode {
    static from(model: any, serializer?: IModelSerializer): JsonNode;
    static toJsonNodes(value: JsonNode[], serializer: any, refs: any): any[];
    static toJsonNode(value: JsonNode, serializer: any, refs: any, recoursive?: boolean): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    name: ko.Observable<string> | ko.Computed<string>;
    nodes: JsonNode[];
    selected: ko.Observable<boolean> | ko.Computed<boolean>;
    value: any;
    nodeType: string;
    valueType: string;
    displayName: string;
}
export declare class JsonSchemaNode extends JsonNode {
    static from(model: any, serializer?: IModelSerializer): JsonSchemaNode;
    static toJson(value: JsonSchemaNode, serializer: any, refs: any): {};
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    nodeType: string;
    valueType: string;
    displayName: any;
    selected: ko.Observable<boolean>;
}
export declare class JsonSchemaRootNode extends JsonNode {
    private _rootElementList;
    static from(model: any, serializer?: IModelSerializer): JsonSchemaRootNode;
    static toJson(value: JsonSchemaRootNode, serializer: any, refs: any): {};
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    getRootElementPartList(allowObjectRootElements?: boolean): IPathRequest[];
    private _fillRootElementList;
    private _getNextPath;
}
