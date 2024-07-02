﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueriesContainer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { findFirstItemMatchesCondition } from '../../../core/utils/_arrayutils';
import { ModelSerializer } from '../../../serializer/serializer';
import { Disposable } from '../../../serializer/disposable';
import { FederationQueryType } from '../utils';
import { SelectQuery } from './federatedQueries/selectQuery';
import { FederatedQueryExpression, FederatedQueryExpressionType } from './federatedQueryExpression';
import { FederationSource } from './federationSource';
export class FederatedQueriesContainer extends Disposable {
    constructor(model, dataSources, _serializer) {
        super();
        this.dataSources = dataSources;
        this._serializer = _serializer;
        this.sources = ko.observableArray();
        this._serializer = _serializer || new ModelSerializer();
    }
    _dataSourceName(dataSource) {
        var _a;
        return ((_a = dataSource === null || dataSource === void 0 ? void 0 : dataSource.data) === null || _a === void 0 ? void 0 : _a.name()) || (dataSource === null || dataSource === void 0 ? void 0 : dataSource.name);
    }
    getQueryNameFromPath(path) {
        const pathParts = path.split('.');
        const dataSource = this.dataSources().filter(x => x.ref == pathParts[0] || x.id == pathParts[0])[0];
        pathParts[0] = this._dataSourceName(dataSource) || pathParts[0];
        return pathParts.join('_');
    }
    getPathFromQueryName(sourceName) {
        for (const source of this.sources()) {
            if (source.sourceName() === sourceName) {
                const path = source.getPath();
                const pathParts = path.split('.');
                let dataSourceId = pathParts.shift();
                const dataSource = this.dataSources().filter(x => this._dataSourceName(x) == dataSourceId)[0];
                dataSourceId = dataSource && (dataSource.ref || dataSource.id) || dataSourceId;
                return dataSourceId + (pathParts.length > 0 ? '.' + pathParts.join('.') : '');
            }
        }
    }
    createQuery(item, dataSource) {
        if (item['@QueryType'] === FederationQueryType[FederationQueryType.SelectNode]) {
            return new SelectQuery(item, this._serializer, (dataSource || this).getPathFromQueryName(item['Root'] && item['Root']['@SourceName']));
        }
        return null;
    }
    addSource(source, queryPath) {
        if (source instanceof FederationSource) {
            const existedSource = this.sources().filter(x => x.sourceName() == source.sourceName())[0];
            !existedSource && this.sources.push(source);
            return;
        }
        const existedSource = this.sources().filter(x => x.sourceName() == source)[0];
        !existedSource && this.sources.push(new FederationSource({}, this._serializer, queryPath, source));
    }
    removeSource(sourceName) {
        const source = findFirstItemMatchesCondition(this.sources(), source => source.sourceName() === sourceName);
        if (!this.queries().some(query => query.expressions().some(exp => exp.table() === sourceName)))
            this.sources.remove(source);
    }
    addSelectQuery(queryPath, columnName) {
        const queryName = this.getQueryNameFromPath(queryPath);
        let query = this.queries().filter(query => query.alias() === queryName)[0];
        if (!query) {
            query = new SelectQuery({
                '@Alias': queryName,
                'Root': {},
            }, this._serializer, queryPath);
            this.queries.push(query);
            this.addSource(queryName, queryPath);
        }
        if (!columnName || query.expressions().filter(expression => expression.name() == columnName)[0]) {
            return;
        }
        const expression = new FederatedQueryExpression({
            '@NodeAlias': queryName,
            '@Name': columnName,
            '@ExpressionType': FederatedQueryExpressionType[FederatedQueryExpressionType.SelectColumnExpression]
        }, this._serializer);
        query.expressions.push(expression);
    }
    removeQuery(queryName) {
        const query = this.queries().filter(query => query.alias() === queryName)[0];
        this.queries.remove(query);
        const source = this.sources().filter(x => x.sourceName() == queryName)[0];
        source && this.sources.remove(source);
    }
    removeExpression(columnName, queryPath) {
        const queryName = this.getQueryNameFromPath(queryPath);
        const query = this.queries().filter(query => query.alias() === queryName)[0];
        const expression = query.expressions().filter(x => x.name() == columnName)[0];
        query.expressions.remove(expression);
        if (query.expressions().length == 0) {
            this.removeQuery(queryName);
        }
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.sources);
        this.disposeObservableArray(this.queries);
    }
}
