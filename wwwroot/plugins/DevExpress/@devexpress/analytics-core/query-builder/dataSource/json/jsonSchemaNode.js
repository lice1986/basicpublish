﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonSchemaNode.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ModelSerializer } from '../../../serializer/serializer';
import { deserializeToCollection } from '../_dbSchema';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { parseBool } from '../../../core/utils/parsers';
export var JsonNodeType;
(function (JsonNodeType) {
    JsonNodeType[JsonNodeType["Object"] = 0] = "Object";
    JsonNodeType[JsonNodeType["Array"] = 1] = "Array";
    JsonNodeType[JsonNodeType["Property"] = 2] = "Property";
})(JsonNodeType || (JsonNodeType = {}));
export class JsonNode {
    constructor(model, serializer) {
        this.nodes = [];
        if (!model)
            return;
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        const innerNodes = model['Node'];
        const currentNodes = innerNodes instanceof Array ?
            deserializeToCollection(innerNodes, (nodeModel) => new JsonNode(nodeModel)).sort((a, b) => { return a.name().localeCompare(b.name()); })
            : !innerNodes ? [] : [new JsonNode(innerNodes)];
        this.nodes = currentNodes;
    }
    static from(model, serializer) {
        return new JsonNode(model, serializer);
    }
    static toJsonNodes(value, serializer, refs) {
        return (value || []).map(item => JsonNode.toJsonNode(item, serializer, refs));
    }
    static toJsonNode(value, serializer, refs, recoursive = true) {
        const obj = serializer.serialize(value, jsonSchemaNodeSerializationInfo, refs);
        const nodes = recoursive ? JsonNode.toJsonNodes(value.nodes, serializer, refs) : [];
        if (nodes.length > 0)
            obj['Node'] = nodes;
        return obj;
    }
    getInfo() {
        return jsonSchemaNodeSerializationInfo;
    }
}
export class JsonSchemaNode extends JsonNode {
    constructor(model, serializer) {
        super(model['Node'], serializer);
        this.nodeType = JsonNodeType[JsonNodeType.Object];
        this.valueType = 'Unknown';
        this.displayName = getLocalization('root');
        this.selected = ko.observable(false);
    }
    static from(model, serializer) {
        return new JsonSchemaNode(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        if (!value)
            return {};
        const obj = { Node: JsonNode.toJsonNode(value, serializer, refs, false) };
        obj.Node['Node'] = JsonNode.toJsonNodes(value.nodes, serializer, refs);
        return obj;
    }
    getInfo() {
        return jsonSchemaNodeSerializationInfo;
    }
}
export class JsonSchemaRootNode extends JsonNode {
    constructor(model, serializer) {
        super(model);
        this._rootElementList = null;
    }
    static from(model, serializer) {
        return new JsonSchemaRootNode(model, serializer);
    }
    static toJson(value, serializer, refs) {
        return JsonSchemaNode.toJson(value.nodes[0], serializer, refs);
    }
    getInfo() {
        return jsonSchemaRootNodeSerializationInfo;
    }
    getRootElementPartList(allowObjectRootElements = true) {
        if (this._rootElementList)
            return this._rootElementList;
        if (this.nodes.length === 0)
            return [];
        this._rootElementList = [];
        const node = this.nodes[0];
        const currentPath = {
            fullPath: ko.unwrap(node.name),
            path: '',
            pathParts: [ko.unwrap(node.name)]
        };
        this._fillRootElementList(node, currentPath, allowObjectRootElements);
        this._rootElementList.sort((a, b) => { return a.fullPath.localeCompare(b.fullPath); });
        return this._rootElementList;
    }
    _fillRootElementList(node = this.nodes[0], currentPath = { fullPath: 'root', path: '', pathParts: ['root'] }, allowObjectRootElements) {
        if (!node)
            return this._rootElementList;
        const nodeType = ko.unwrap(node.nodeType);
        if (nodeType == JsonNodeType[JsonNodeType.Property])
            return;
        if (nodeType === JsonNodeType[JsonNodeType.Array]) {
            this._rootElementList.push(currentPath);
            return;
        }
        if ((allowObjectRootElements && nodeType === JsonNodeType[JsonNodeType.Object])) {
            this._rootElementList.push(currentPath);
        }
        (node.nodes || []).forEach(x => {
            const nextPath = this._getNextPath(currentPath, x.name());
            this._fillRootElementList(x, nextPath, allowObjectRootElements);
        });
        return this._rootElementList;
    }
    _getNextPath(currentPath, nodeName) {
        const _nodeName = !currentPath.fullPath ? nodeName : [currentPath.fullPath, nodeName].join('.');
        return {
            pathParts: currentPath.pathParts.concat(nodeName),
            fullPath: _nodeName,
            path: nodeName
        };
    }
}
const jsonSchemaNodeSerializationInfo = [
    { propertyName: 'nodes', modelName: 'Node', from: JsonNode.from, toJsonObject: JsonNode.toJsonNodes },
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'selected', modelName: '@Selected', from: parseBool },
    { propertyName: 'nodeType', modelName: '@NodeType' },
    { propertyName: 'type', modelName: '@Type' }
];
const jsonSchemaRootNodeSerializationInfo = [
    { propertyName: 'nodes', modelName: 'Node', from: JsonSchemaRootNode.from, toJsonObject: JsonSchemaRootNode.toJsonNodes }
];
