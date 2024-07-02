﻿/**
* DevExpress Analytics (query-builder\dataSource\dbSchemaProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IItemsProvider, IDataMemberInfo } from '../../widgets/utils';
import { DBSchema } from './dbSchema';
import { DBTable } from './dbTable';
import { DBStoredProcedure } from './dbStoredProcedure';
import { Disposable } from '../../serializer/disposable';
import { SqlDataConnection } from './sql/sqlDataConnection';
import { RequestWrapper } from '../utils/requestwrapper';
import { IPathRequest } from '../../widgets/common/pathRequest';
export interface IDBSchemaProvider extends IItemsProvider {
    getDbTable: (tableName: string, path?: string) => JQueryPromise<DBTable>;
    getDbSchema: () => JQueryPromise<any>;
    getDbTables?: () => JQueryPromise<any>;
    getDbViews?: () => JQueryPromise<any>;
    getDbStoredProcedures?: () => JQueryPromise<DBStoredProcedure[]>;
}
export declare class DBSchemaProvider extends Disposable implements IDBSchemaProvider {
    private _requestWrapper;
    private _dbSchema;
    private _dbTablesSchema;
    private _dbViewsSchema;
    private _dbStoredProceduresSchema;
    private _tables;
    private _tableRequests;
    connection: SqlDataConnection;
    private _getDBSchema;
    private _getDBStoredProcedures;
    constructor(connection: SqlDataConnection, _requestWrapper?: RequestWrapper);
    getDbViews(): JQueryPromise<DBSchema>;
    getDbTables(): JQueryPromise<DBSchema>;
    getItemByPath?: (path: IPathRequest) => JQueryPromise<IDataMemberInfo>;
    getValues?: (path: IPathRequest) => JQueryPromise<any[]>;
    getItems: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    getDbSchema(): JQueryPromise<DBSchema>;
    getDbStoredProcedures(): JQueryPromise<DBStoredProcedure[]>;
    getDbTable(tableName: string, fullPath?: string): JQueryPromise<DBTable>;
}
