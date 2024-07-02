﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { deserializeArray } from '../../../serializer/utils';
import { Disposable } from '../../../serializer/disposable';
import { ModelSerializer } from '../../../serializer/serializer';
import { JsonParameter, JsonParameterType } from './jsonParameter';
import { JsonAuthenticationInfo } from './jsonAuthenticationInfo';
export class JsonSource extends Disposable {
    constructor(model = {}, serializer) {
        super();
        this.sourceType = ko.observable();
        this.uri = ko.observable();
        this.json = ko.observable();
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this._disposables.push(this.uri.subscribe((newUri) => {
            newUri && this.sourceType(JsonSource._URIJSONSOURCE_TYPE);
        }));
        this._disposables.push(this.json.subscribe((newJsonString) => {
            newJsonString && this.sourceType(JsonSource._CUSTOMJSONSOURCE_TYPE);
        }));
        function _getJsonParametersModelDeserialized(parameterModels, itemType) {
            if (parameterModels && Array.isArray(parameterModels[JsonParameterType[itemType]]) && parameterModels[JsonParameterType[itemType]])
                parameterModels = parameterModels[JsonParameterType[itemType]];
            return deserializeArray(parameterModels, (item) => {
                if (!item['@ItemType'])
                    item['@ItemType'] = JsonParameterType[itemType];
                return new JsonParameter(item, serializer);
            });
        }
        this.queryParameters = _getJsonParametersModelDeserialized(model['QueryParameters'], JsonParameterType.QueryParameter);
        this.headers = _getJsonParametersModelDeserialized(model['Headers'], JsonParameterType.Header);
        this.pathParameters = _getJsonParametersModelDeserialized(model['PathParameters'], JsonParameterType.PathParameter);
    }
    static from(model, serializer) {
        return new JsonSource(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, jsonSourceSerializationInfo, refs);
    }
    getInfo() {
        return jsonSourceSerializationInfo;
    }
    serialize(includeRootTag = false) {
        return includeRootTag ? { 'Source': this.serialize() } : (new ModelSerializer()).serialize(this);
    }
    resetSource() {
        this.sourceType('');
        this.json('');
        this.uri('');
    }
}
JsonSource._URIJSONSOURCE_TYPE = 'DevExpress.DataAccess.Json.UriJsonSource';
JsonSource._CUSTOMJSONSOURCE_TYPE = 'DevExpress.DataAccess.Json.CustomJsonSource';
const jsonSourceSerializationInfo = [
    { propertyName: 'sourceType', modelName: '@SourceType', defaultVal: '' },
    { propertyName: 'json', modelName: '@Json', defaultVal: '' },
    { propertyName: 'uri', modelName: '@Uri', defaultVal: '' },
    { propertyName: 'authenticationInfo', modelName: 'AuthenticationInfo', from: JsonAuthenticationInfo.from, toJsonObject: JsonAuthenticationInfo.toJson },
    { propertyName: 'headers', modelName: 'Headers', array: true },
    { propertyName: 'queryParameters', modelName: 'QueryParameters', array: true },
    { propertyName: 'pathParameters', modelName: 'PathParameters', array: true }
];
