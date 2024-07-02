﻿/**
* DevExpress Analytics (query-builder\elements\_federationQueryModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { findFirstItemMatchesCondition } from '../../core/utils/_arrayutils';
import { ModelSerializer } from '../../serializer/serializer';
import { deserializeArray } from '../../serializer/utils';
import { extend } from '../../serializer/_utils';
import { sourceQuerySerializationsInfo } from '../dataSource/federation/federatedQueries/sourceQuery';
import { SubNode } from '../dataSource/federation/federatedQueries/subNode';
import { FederatedQueryExpression } from '../dataSource/federation/federatedQueryExpression';
import { FederationQueryType } from '../dataSource/utils';
import { ColumnExpressionCollectionHelper } from '../utils/_columnExpressionCollectionHelper';
import { ColumnExpression } from './columnExpression';
import { ParametersMode } from './parameterModelMeta';
import { QueryViewModelBase } from './queryModel';
import { QuerySurface } from './querySurface';
import { TableViewModel } from './tableModel';
import { TableSurface } from './tableSurface';
import { FederationAllColumnsViewModel, FederationColumnViewModel } from './_federationColumnModel';
export const federationQuerySerializationsInfo = [
    { propertyName: 'name', modelName: '@Alias' },
    { propertyName: 'type', modelName: '@Type' },
    { propertyName: 'itemType', modelName: '@ItemType' },
    { propertyName: 'queryType', modelName: '@QueryType' },
    { propertyName: 'rootModel', modelName: 'Root' },
    { propertyName: 'expressions', modelName: 'Expressions', array: true },
    { propertyName: 'subNodes', modelName: 'SubNodes', array: true },
];
export class FederationQueryViewModel extends QueryViewModelBase {
    constructor(querySource, dataSource, _dbSchemaProvider, parametersMode = ParametersMode.ReadWrite, serializer) {
        super(extend(true, querySource, FederationQueryViewModel.emptyModel, querySource), _dbSchemaProvider, parametersMode, (data) => data, serializer);
        this._dbSchemaProvider = _dbSchemaProvider;
        this.serializer = serializer;
        this.expressions = ko.observableArray();
        this.subNodes = ko.observableArray();
        this.controlType = 'FQuery';
        this.defaultPageHeight = 300;
        this.topOffset = 20;
        this.dataSource = dataSource;
        const _relations = [];
        this.tables = ko.observableArray();
        if (querySource['Root']) {
            this.tables.push(this._createTableViewModel(querySource['Root']));
        }
        this.tables.push(...Object.keys(querySource['SubNodes']).map(key => this._createTableViewModel(querySource['SubNodes'][key]['Query'])));
        _relations.push(...Object.keys(querySource['SubNodes']).map(key => new SubNode(querySource['SubNodes'][key], serializer).createRelationModel(this)));
        this.columns = deserializeArray(querySource['Expressions'], item => new ColumnExpression({ '@Name': item['@Name'], '@Alias': item['@Alias'], '@Table': item['@NodeAlias'], '#text': item['@ColumnExpression'], '@ItemType': ColumnExpressionCollectionHelper.federatedTypeToColumn(item['@ExpressionType']) }, this, serializer));
        this.relations = ko.observableArray(_relations);
        this.init();
    }
    _initializeTable(table) {
        this._dbSchemaProvider.getDbTable(table.name(), table.path)
            .done((dbTable) => {
            table.createColumns(dbTable);
        });
    }
    _createTableViewModel(model) {
        const path = this.dataSource.getPathFromQueryName(model['@SourceName']);
        return new FederationTableViewModel(model, this, path, this.serializer);
    }
    dispose() {
        super.dispose();
        this.dataSource = null;
    }
    serialize(includeRootTag) {
        const serializer = this.serializer || new ModelSerializer();
        this.expressions(this.columns().map(column => {
            const model = {
                '@Alias': column.alias(),
                '@ColumnExpression': column.expression(),
                '@Name': column.column(),
                '@NodeAlias': column.table()
            };
            model['@ExpressionType'] = ColumnExpressionCollectionHelper.columnTypeToFederated(column.itemType());
            return new FederatedQueryExpression(model, serializer);
        }));
        this.rootModel(this.tables()[0]);
        const _tables = this.tables();
        _tables.shift();
        const _relations = this.relations();
        this.subNodes(_tables.map(table => {
            let relation = findFirstItemMatchesCondition(_relations, relation => relation.nestedTable() === table);
            if (!relation)
                relation = findFirstItemMatchesCondition(_relations, relation => relation.parentTable() === table);
            _relations.splice(_relations.indexOf(relation), 1);
            return SubNode.deserializeRelationModel(table, relation);
        }));
        return super.serialize(includeRootTag);
    }
    createChild(info, model, path) {
        return super.createChild(info, info['@ControlType'] === 'FTable' ? new FederationTableViewModel(info, this, path) : undefined);
    }
    cerateJoinCondition(parentColumn, nestedColumn) {
        const parentTable = parentColumn.parentModel();
        const nestedTable = nestedColumn.parentModel();
        if (this.tables().indexOf(parentTable) > this.tables.indexOf(nestedTable))
            return null;
        return super.cerateJoinCondition(parentColumn, nestedColumn);
    }
    getInfo() {
        return federationQuerySerializationsInfo;
    }
}
FederationQueryViewModel.emptyModel = { '@ItemType': 'Query', 'SubNodes': {}, 'Expressions': {} };
export class FederationQuerySurface extends QuerySurface {
}
export class FederationTableViewModel extends TableViewModel {
    constructor(model, parent, path, serializer) {
        super(model, parent, serializer);
        this.controlType = 'FTable';
        if (path && !model['@SourceName'])
            this.sourceName(parent.dataSource.getQueryNameFromPath(path));
        if (!this.name()) {
            this.name(this.sourceName());
        }
        !this.alias() && this.alias(this.name());
        this._disposables.push(this.queryType = ko.pureComputed(() => { return FederationQueryType[FederationQueryType.SourceNode]; }));
        this.tableOffset(12);
        const pathParts = path.split('.');
        const dataSource = parent.dataSource.dataSources().filter(x => {
            return x.id === pathParts[0] || x.ref === pathParts[0] || x.name === pathParts[0];
        })[0];
        this.path = (dataSource.id || dataSource.ref) + (pathParts.length > 1 ? '.' + pathParts.slice(1).join('.') : '');
        this.displaySourceName = ko.observable(dataSource.name);
        this.asterisk = new FederationAllColumnsViewModel(this, this.serializer);
    }
    getInfo() {
        return sourceQuerySerializationsInfo;
    }
    getPath() {
        return this.path;
    }
    createChildColumn(item) {
        return new FederationColumnViewModel({ '@Name': item.name }, item, this, this.serializer);
    }
}
export class FederationTableSurface extends TableSurface {
    constructor() {
        super(...arguments);
        this.titletemplate = 'dxqb-federation-table-title';
    }
}
