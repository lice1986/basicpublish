﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\sqlDataSource.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { SqlDataConnection } from './sqlDataConnection';
import { ResultSet } from '../resultSet';
import { Disposable } from '../../../serializer/disposable';
import { ISqlQueryViewModel } from '../utils';
import { IModelSerializer } from '../../../serializer/serializer';
import { RequestWrapper } from '../../utils/requestwrapper';
import { MasterDetailRelation } from './masterDetailRelation';
import { DBSchemaProvider, IDBSchemaProvider } from '../dbSchemaProvider';
export interface IDataSourceBase {
    name: ko.Observable<string> | ko.Computed<string>;
    id: string;
}
export interface IDataSourceDBSchema extends IDataSourceBase {
    dbSchemaProvider: IDBSchemaProvider;
}
export declare class SqlDataSource extends Disposable implements IDataSourceDBSchema {
    getInfo(): ISerializationInfoArray;
    createQuery(item: any, serializer: any): ISqlQueryViewModel;
    constructor(model: any, serializer?: IModelSerializer, requestWrapper?: RequestWrapper);
    name: ko.Observable<string> | ko.Computed<string>;
    id: string;
    queries: ko.ObservableArray<ISqlQueryViewModel>;
    relations: ko.ObservableArray<MasterDetailRelation>;
    connection: SqlDataConnection;
    dbSchemaProvider: DBSchemaProvider;
    resultSet: ResultSet;
}