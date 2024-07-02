﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\connectionOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { parseBool } from '../../../core/utils/parsers';
import { ModelSerializer } from '../../../serializer/serializer';
const connectionOptionsSerializationInfo = [
    { propertyName: 'closeConnection', modelName: '@CloseConnection', from: parseBool },
    { propertyName: 'commandTimeout', modelName: '@DbCommandTimeout', from: s => { let val = parseInt(s); if (isNaN(val))
            val = null; return ko.observable(val); }, defaultVal: null },
];
export class ConnectionOptions {
    constructor(model, serializer) {
        this.closeConnection = ko.observable(true);
        this.commandTimeout = ko.observable(null);
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
    }
    getInfo() {
        return connectionOptionsSerializationInfo;
    }
}
