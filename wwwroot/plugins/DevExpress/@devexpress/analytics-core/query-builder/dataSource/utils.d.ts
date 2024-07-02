﻿/**
* DevExpress Analytics (query-builder\dataSource\utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializableModel } from '../../serializer/serializationInfo';
import { DataSourceParameter } from './dataSourceParameter';
import { FederatedQueryExpression } from './federation/federatedQueryExpression';
import { FederationSource } from './federation/federationSource';
import { SqlDataSource } from './sql/sqlDataSource';
export declare const SqlQueryType: {
    customSqlQuery: string;
    tableQuery: string;
    storedProcQuery: string;
};
export declare const JsonSourceType: {
    fileJsonSource: string;
    customJsonSource: string;
    uriJsonSource: string;
};
export declare enum FederationQueryType {
    SelectNode = 0,
    UnionNode = 1,
    SourceNode = 2,
    TransformationNode = 3
}
export interface INamedQueryViewModel extends ISerializableModel {
    generateName: () => string;
}
export interface IFederationQuery extends INamedQueryViewModel {
    queryType: ko.Observable<string> | ko.Computed<string>;
    alias?: ko.Observable<string> | ko.Computed<string>;
    expressions?: ko.ObservableArray<FederatedQueryExpression>;
    sources?: ko.ObservableArray<FederationSource> | ko.Computed<FederationSource[]>;
}
export interface ISqlQueryViewModel extends INamedQueryViewModel {
    name: ko.Observable<string> | ko.Computed<string>;
    parameters: ko.ObservableArray<DataSourceParameter>;
    type: ko.Observable<string> | ko.Computed<string>;
    parent: SqlDataSource;
}