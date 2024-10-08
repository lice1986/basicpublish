﻿/**
* DevExpress Analytics (query-builder\utils\_dataConnection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../serializer/serializer';
import { extend } from '../../serializer/_utils';
export function serializeDataConnection(connection) {
    const serializer = new ModelSerializer();
    const data = { 'DataConnection': serializer.serialize(connection) };
    if (!!connection.options)
        extend(data, { 'ConnectionOptions': serializer.serialize(connection.options) });
    return JSON.stringify(data);
}
