﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonDataSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { Disposable } from '../../../serializer/disposable';
import { ModelSerializer } from '../../../serializer/serializer';
import { RequestWrapper } from '../../utils/requestwrapper';
import { JsonSchemaProvider } from './jsonSchemaProvider';
import { JsonSchemaRootNode } from './jsonSchemaNode';
import { JsonSource } from './jsonSource';
export class JsonDataSource extends Disposable {
    constructor(model, serializer, requestWrapper = new RequestWrapper()) {
        super();
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this.jsonSchemaProvider = new JsonSchemaProvider(this, requestWrapper);
        this.source && this._disposables.push(this.source);
        this._disposables.push(this.connectionName.subscribe(() => {
            this.source.resetSource();
        }));
    }
    getInfo() {
        return jsonDataSourceSerializationInfo;
    }
    clone(_serializer) {
        const serializer = _serializer || new ModelSerializer();
        const serialized = serializer.serialize(this);
        return new JsonDataSource(serialized);
    }
    static from(model, serializer) {
        return new JsonDataSource(model, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, jsonDataSourceSerializationInfo, refs);
    }
    getSchema(parameters = []) {
        const deferred = $.Deferred();
        this.jsonSchemaProvider.getJsonSchema(parameters)
            .done((schema) => {
            this.schema = schema;
            deferred.resolve(schema);
        })
            .fail(() => {
            this.schema = null;
            deferred.reject();
        });
        return deferred.promise();
    }
}
const jsonDataSourceSerializationInfo = [
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'connectionName', modelName: '@ConnectionName' },
    { propertyName: 'rootElement', modelName: '@RootElement', defaultVal: 'root' },
    { propertyName: 'schema', modelName: 'Schema', from: JsonSchemaRootNode.from, toJsonObject: JsonSchemaRootNode.toJson },
    { propertyName: 'source', modelName: 'Source', from: JsonSource.from, toJsonObject: JsonSource.toJson }
];
