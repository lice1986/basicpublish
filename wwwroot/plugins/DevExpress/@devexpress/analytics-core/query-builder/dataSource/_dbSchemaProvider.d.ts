﻿/**
* DevExpress Analytics (query-builder\dataSource\_dbSchemaProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { RequestWrapper } from '../utils/requestwrapper';
import { SqlDataConnection } from './sql/sqlDataConnection';
import { DBTable } from './dbTable';
import { DBSchema } from './dbSchema';
import { DBStoredProcedure } from './dbStoredProcedure';
export declare function getDBSchemaCallback({ requestWrapper, connection, tables, getTables, getViews }: {
    requestWrapper: RequestWrapper;
    connection: SqlDataConnection;
    tables: DBTable[];
    getViews?: boolean;
    getTables?: boolean;
}): JQueryPromise<DBSchema>;
export declare function getDBStoredProceduresCallback(requestWrapper: RequestWrapper, connection: SqlDataConnection): JQueryPromise<DBStoredProcedure[]>;
