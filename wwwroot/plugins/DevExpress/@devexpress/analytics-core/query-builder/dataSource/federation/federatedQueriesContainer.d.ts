﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueriesContainer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDataSourceInfo } from '../../../core/utils/_fieldListProvider';
import { IModelSerializer } from '../../../serializer/serializer';
import { Disposable } from '../../../serializer/disposable';
import { IFederationQuery } from '../utils';
import { FederationSource } from './federationSource';
export declare class FederatedQueriesContainer extends Disposable {
    dataSources: ko.ObservableArray<IDataSourceInfo> | ko.Computed<IDataSourceInfo[]>;
    protected _serializer?: IModelSerializer;
    constructor(model: object, dataSources: ko.ObservableArray<IDataSourceInfo> | ko.Computed<IDataSourceInfo[]>, _serializer?: IModelSerializer);
    protected _dataSourceName(dataSource: IDataSourceInfo): any;
    getQueryNameFromPath(path: string): string;
    getPathFromQueryName(sourceName: string): string;
    createQuery(item: object, dataSource?: FederatedQueriesContainer): IFederationQuery;
    addSource(source: string | FederationSource, queryPath?: string): void;
    removeSource(sourceName: string): void;
    addSelectQuery(queryPath: string, columnName?: string): void;
    removeQuery(queryName: string): void;
    removeExpression(columnName: string, queryPath: string): void;
    dispose(): void;
    name: ko.Observable<string> | ko.Computed<string>;
    id: string;
    queries: ko.ObservableArray<IFederationQuery>;
    sources: ko.ObservableArray<FederationSource>;
}
