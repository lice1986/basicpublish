﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_selectQuerySqlTextProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { SqlDataConnection } from '../../dataSource/sql/sqlDataConnection';
import { ISelectStatementResponse } from '../../utils/requestwrapper';
import { TableQuery } from '../../dataSource/sql/tableQuery';
export declare class SelectQuerySqlTextProvider {
    private _selectStatementCallback;
    private _connection;
    constructor(_selectStatementCallback: (connection: SqlDataConnection, queryJSON: string) => JQueryPromise<ISelectStatementResponse>, _connection: () => SqlDataConnection);
    getQuerySqlText(newQuery: TableQuery): JQueryPromise<ISelectStatementResponse>;
}