﻿/**
* DevExpress Analytics (query-builder\dataSource\utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const SqlQueryType = {
    customSqlQuery: 'CustomSqlQuery',
    tableQuery: 'SelectQuery',
    storedProcQuery: 'StoredProcQuery'
};
export const JsonSourceType = {
    fileJsonSource: 'FileJsonSource',
    customJsonSource: 'CustomJsonSource',
    uriJsonSource: 'UriJsonSource'
};
export var FederationQueryType;
(function (FederationQueryType) {
    FederationQueryType[FederationQueryType["SelectNode"] = 0] = "SelectNode";
    FederationQueryType[FederationQueryType["UnionNode"] = 1] = "UnionNode";
    FederationQueryType[FederationQueryType["SourceNode"] = 2] = "SourceNode";
    FederationQueryType[FederationQueryType["TransformationNode"] = 3] = "TransformationNode";
})(FederationQueryType || (FederationQueryType = {}));
