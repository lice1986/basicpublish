﻿/**
* DevExpress Analytics (query-builder\dataSource\resultTable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../serializer/serializer';
const resultTableSerializationInfo = [
    { propertyName: 'tableName', modelName: '@Name' },
    {
        propertyName: 'columns', modelName: 'Fields', array: true, info: [
            { propertyName: 'name', modelName: '@Name' },
            { propertyName: 'propertyType', modelName: '@Type' }
        ]
    }
];
export class ResultTable {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
    }
    getInfo() {
        return resultTableSerializationInfo;
    }
}
