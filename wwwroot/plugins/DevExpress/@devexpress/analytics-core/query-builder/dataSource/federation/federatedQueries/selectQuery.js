﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\selectQuery.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ModelSerializer } from '../../../../serializer/serializer';
import { deserializeArray } from '../../../../serializer/utils';
import { Disposable } from '../../../../serializer/disposable';
import { extend } from '../../../../serializer/_utils';
import { FederationQueryType } from '../../utils';
import { FederatedQueryExpression } from '../federatedQueryExpression';
import { FederationSource } from '../federationSource';
import { SourceQuery } from './sourceQuery';
import { SubNode } from './subNode';
export const selectQuerySerializationsInfo = [
    { propertyName: 'queryType', modelName: '@QueryType' },
    { propertyName: 'alias', modelName: '@Alias' },
    { propertyName: 'expressions', modelName: 'Expressions', array: true },
    { propertyName: 'subNodes', modelName: 'SubNodes', array: true },
    { propertyName: 'root', modelName: 'Root' },
    { propertyName: 'itemType', modelName: '@ItemType' }
];
export class SelectQuery extends Disposable {
    constructor(model, serializer, _path) {
        super();
        this._path = _path;
        this.init(model, serializer, _path);
    }
    get sources() {
        return ko.observableArray([this.root()].concat(this.subNodes().map(node => node.query())).map(sourceQuery => new FederationSource({}, new ModelSerializer(), sourceQuery.getPath(), sourceQuery.sourceName())));
    }
    getInfo() {
        return selectQuerySerializationsInfo;
    }
    generateName() {
        return this.root() ? this.root().alias() : 'SelectQuery';
    }
    init(model, serializer, rootPath) {
        (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'Query' }));
        this._disposables.push(this.queryType = ko.pureComputed(() => { return FederationQueryType[FederationQueryType.SelectNode]; }));
        this.expressions = deserializeArray(model['Expressions'], (item) => {
            return new FederatedQueryExpression(item, serializer);
        });
        this.subNodes = deserializeArray(model['SubNodes'], (item) => {
            return new SubNode(item, serializer);
        });
        if (model['Root'])
            this.root = ko.observable(new SourceQuery(model['Root'], serializer, this.alias(), rootPath));
    }
}
