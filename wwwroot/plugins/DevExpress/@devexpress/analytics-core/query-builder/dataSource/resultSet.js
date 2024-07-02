﻿/**
* DevExpress Analytics (query-builder\dataSource\resultSet.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../serializer/serializer';
import { deserializeArray } from '../../serializer/utils';
import { ResultTable } from './resultTable';
const resultSetSerializationInfo = [
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'tables', modelName: 'Views', array: true }
];
export class ResultSet {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this.tables = deserializeArray(model && model['Views'] || [], (item) => {
            return new ResultTable(item, serializer);
        });
    }
    getInfo() {
        return resultSetSerializationInfo;
    }
    static from(model, serializer) {
        return model && new ResultSet(model['DataSet'], serializer) || null;
    }
    static toJson(value, serializer, refs) {
        return { 'DataSet': serializer.serialize(value, resultSetSerializationInfo, refs) };
    }
}
