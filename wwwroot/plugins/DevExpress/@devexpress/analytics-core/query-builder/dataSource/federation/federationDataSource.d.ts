﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationDataSource.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDataSourceInfo } from '../../../core/utils/_fieldListProvider';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { IModelSerializer } from '../../../serializer/serializer';
import { IItemsProvider } from '../../../widgets/utils';
import { IDBSchemaProvider } from '../dbSchemaProvider';
import { ResultSet } from '../resultSet';
import { IDataSourceBase, IDataSourceDBSchema } from '../sql/sqlDataSource';
import { IFederationQuery } from '../utils';
import { FederatedQueriesContainer } from './federatedQueriesContainer';
import { FederationMasterDetailRelation } from './federationMasterDetailRelation';
import { SerializableDataFederationDataSource } from './federationSerializableModel';
export interface ISerializableSourceMapItem {
    dataSource: ko.Observable<any>;
    name: ko.Observable<string>;
}
export interface IFederationDataSource {
    name: ko.Observable<string> | ko.Computed<string>;
    serializableSourceMap: ko.ObservableArray<ISerializableSourceMapItem>;
    getSerializableModel: () => SerializableDataFederationDataSource;
}
export declare class FederationDataSource extends FederatedQueriesContainer implements IDataSourceBase, IFederationDataSource, IDataSourceDBSchema {
    dataSources: ko.ObservableArray<IDataSourceInfo> | ko.Computed<IDataSourceInfo[]>;
    fielListProvider?: IItemsProvider;
    private _serializableModel;
    getInfo(): ISerializationInfoArray;
    getSerializableModel(): SerializableDataFederationDataSource;
    createQuery(item: object): IFederationQuery;
    updateSerializableModel(): void;
    constructor(model: object, dataSources: ko.ObservableArray<IDataSourceInfo> | ko.Computed<IDataSourceInfo[]>, fielListProvider?: IItemsProvider, serializer?: IModelSerializer);
    dispose(): void;
    get dependentDataSources(): string[];
    relations: ko.ObservableArray<FederationMasterDetailRelation>;
    resultSet: ResultSet;
    dbSchemaProvider: IDBSchemaProvider;
    serializableSourceMap: ko.ObservableArray<ISerializableSourceMapItem>;
}