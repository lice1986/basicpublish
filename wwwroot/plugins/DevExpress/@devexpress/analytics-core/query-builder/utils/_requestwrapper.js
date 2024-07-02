﻿/**
* DevExpress Analytics (query-builder\utils\_requestwrapper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { RequestWrapper } from './requestwrapper';
export function wrapGetSelectStatement(callback) {
    return (connection, queryJSON) => {
        if (callback)
            return callback(connection, queryJSON);
        return new RequestWrapper().getSelectStatement(connection, queryJSON);
    };
}
export function wrapRebuildResultSchema(callback) {
    return (dataSource, queryName, relationsEditing) => {
        if (callback)
            return callback(dataSource, queryName, relationsEditing);
        return new RequestWrapper().rebuildResultSchema(dataSource, queryName, relationsEditing);
    };
}
export function wrapGetFederationdResultSchema(callback) {
    return (dataSource) => {
        if (callback)
            return callback(dataSource);
        return new RequestWrapper().getFederationResultSchema(dataSource);
    };
}
