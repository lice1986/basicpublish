﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\unionQuery.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FederationQueryType } from '../../utils';
import { ModelSerializer } from '../../../../serializer/serializer';
import { deserializeArray } from '../../../../serializer/utils';
import { FederatedQueriesContainer } from '../federatedQueriesContainer';
import { extend } from '../../../../serializer/_utils';
export const unionQuerySerializationsInfo = [
    { propertyName: 'queryType', modelName: '@QueryType' },
    { propertyName: 'unionType', modelName: '@UnionType' },
    { propertyName: 'alias', modelName: '@Alias' },
    { propertyName: 'queries', modelName: 'UnionElements', array: true }
];
export var UnionTypes;
(function (UnionTypes) {
    UnionTypes[UnionTypes["Union"] = 0] = "Union";
    UnionTypes[UnionTypes["UnionAll"] = 1] = "UnionAll";
})(UnionTypes || (UnionTypes = {}));
export class UnionQuery extends FederatedQueriesContainer {
    constructor(model, dataSources, serializer) {
        super(model, dataSources, serializer);
        (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'Query' }));
        this._disposables.push(this.queryType = ko.pureComputed(() => { return FederationQueryType[FederationQueryType.UnionNode]; }));
        this.queries = deserializeArray(model['UnionElements'], (item) => this.createQuery(item));
    }
    getInfo() {
        return unionQuerySerializationsInfo;
    }
    generateName() {
        return this.queries()[0] && this.queries()[0].alias().split('_').pop();
    }
}
