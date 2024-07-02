﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationDataSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { deserializeArray } from '../../../serializer/utils';
import { extend } from '../../../serializer/_utils';
import { FederationQueryType } from '../utils';
import { TransformQuery } from './federatedQueries/transformQuery';
import { UnionQuery } from './federatedQueries/unionQuery';
import { FederatedQueriesContainer } from './federatedQueriesContainer';
import { federationDataSourceSerializationInfo } from './federationDataSourceMeta';
import { FederationMasterDetailRelation } from './federationMasterDetailRelation';
import { SerializableDataFederationDataSource } from './federationSerializableModel';
import { FederationSource } from './federationSource';
import { DBSchemaFederationDataSourceProvider } from './_dbSchemaFederationDataSourceProvider';
export class FederationDataSource extends FederatedQueriesContainer {
    constructor(model, dataSources, fielListProvider, serializer) {
        super(model, dataSources, serializer);
        this.dataSources = dataSources;
        this.fielListProvider = fielListProvider;
        this.serializableSourceMap = ko.observableArray();
        this._serializer.deserialize(this, extend(model, { '@ItemType': 'FederationDataSource' }));
        this.sources = deserializeArray(model['Sources'], (item) => {
            return new FederationSource(item, serializer);
        });
        this.queries = deserializeArray(model['Queries'], (item) => this.createQuery(item));
        this.relations = deserializeArray(model['Relations'], (item) => {
            return new FederationMasterDetailRelation(item, this._serializer);
        });
        if (fielListProvider)
            this._disposables.push(this.dbSchemaProvider = new DBSchemaFederationDataSourceProvider(this.fielListProvider));
        this.updateSerializableModel();
    }
    getInfo() {
        return federationDataSourceSerializationInfo;
    }
    getSerializableModel() {
        return this._serializableModel;
    }
    createQuery(item) {
        const query = super.createQuery(item);
        if (!query) {
            if (item['@QueryType'] === FederationQueryType[FederationQueryType.UnionNode]) {
                return new UnionQuery(item, this.dataSources, this._serializer);
            }
            else if (item['@QueryType'] === FederationQueryType[FederationQueryType.TransformationNode]) {
                return new TransformQuery(item, this._serializer);
            }
        }
        return query;
    }
    updateSerializableModel() {
        this.serializableSourceMap = ko.observableArray();
        this.sources().forEach(source => {
            const dataSourceName = source.getDataSourceName();
            dataSourceName && this.serializableSourceMap().push({
                name: ko.observable(source.sourceName()),
                dataSource: ko.observable(this.dataSources().filter(x => this._dataSourceName(x) === dataSourceName)[0].data)
            });
        });
        this._serializableModel = new SerializableDataFederationDataSource(this, this._serializer);
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.relations);
        this._serializableModel.dispose();
    }
    get dependentDataSources() {
        const serializableModel = this.getSerializableModel();
        return serializableModel.getSerializableFederationDataSourceInfo().dataSources;
    }
}
