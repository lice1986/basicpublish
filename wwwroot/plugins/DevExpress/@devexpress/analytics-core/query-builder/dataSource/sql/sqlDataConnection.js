﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\sqlDataConnection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ModelSerializer } from '../../../serializer/serializer';
import { parseBool } from '../../../core/utils/parsers';
export class SqlDataConnection {
    constructor(model, serializer) {
        this.name = ko.observable();
        this.parameteres = ko.observable();
        this.fromAppConfig = ko.observable(true);
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
    }
    static from(model, serializer) {
        return new SqlDataConnection(model, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, sqlDataConnectionSerializationInfo, refs);
    }
    getInfo() {
        return sqlDataConnectionSerializationInfo;
    }
}
const sqlDataConnectionSerializationInfo = [
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'parameteres', modelName: 'Parameters' },
    { propertyName: 'fromAppConfig', modelName: '@FromAppConfig', defaultVal: false, from: parseBool }
];
