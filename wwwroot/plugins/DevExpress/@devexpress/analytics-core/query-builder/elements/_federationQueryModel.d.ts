﻿/**
* DevExpress Analytics (query-builder\elements\_federationQueryModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ElementViewModel } from '../../core/elements/elementViewModel';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { ModelSerializer } from '../../serializer/serializer';
import { DBColumn } from '../dataSource/dbColumn';
import { IDBSchemaProvider } from '../dataSource/dbSchemaProvider';
import { SubNode } from '../dataSource/federation/federatedQueries/subNode';
import { FederatedQueryExpression } from '../dataSource/federation/federatedQueryExpression';
import { FederationDataSource } from '../dataSource/federation/federationDataSource';
import { IDataSourceBase } from '../dataSource/sql/sqlDataSource';
import { ColumnViewModel } from './columnModel';
import { JoinConditionViewModel } from './joinConditionModel';
import { QueryViewModelBase } from './queryModel';
import { QuerySurface } from './querySurface';
import { TableViewModel } from './tableModel';
import { TableSurface } from './tableSurface';
import { FederationColumnViewModel } from './_federationColumnModel';
export declare const federationQuerySerializationsInfo: ISerializationInfoArray;
export declare class FederationQueryViewModel extends QueryViewModelBase {
    private _dbSchemaProvider?;
    private serializer?;
    private static emptyModel;
    protected _initializeTable(table: FederationTableViewModel): void;
    private _createTableViewModel;
    constructor(querySource: any, dataSource: IDataSourceBase, _dbSchemaProvider?: IDBSchemaProvider, parametersMode?: string, serializer?: ModelSerializer);
    dispose(): void;
    serialize(includeRootTag?: boolean): any;
    createChild(info: any, model?: any, path?: string): ElementViewModel;
    cerateJoinCondition(parentColumn: ColumnViewModel, nestedColumn: ColumnViewModel): JoinConditionViewModel;
    getInfo(): ISerializationInfoArray;
    tables: ko.ObservableArray<FederationTableViewModel>;
    expressions: ko.ObservableArray<FederatedQueryExpression>;
    subNodes: ko.ObservableArray<SubNode>;
    rootModel: ko.Observable<FederationTableViewModel>;
    dataSource: FederationDataSource;
    controlType: string;
    defaultPageHeight: number;
    topOffset: number;
}
export declare class FederationQuerySurface extends QuerySurface {
}
export declare class FederationTableViewModel extends TableViewModel {
    constructor(model: any, parent: FederationQueryViewModel, path: string, serializer?: ModelSerializer);
    queryType: ko.Observable<string> | ko.Computed<string>;
    path: string;
    sourceName: ko.Observable<string> | ko.Computed<string>;
    getInfo(): ISerializationInfoArray;
    getPath(): string;
    createChildColumn(item: DBColumn): FederationColumnViewModel;
    displaySourceName: ko.Observable<string>;
}
export declare class FederationTableSurface extends TableSurface {
    titletemplate: string;
}
