﻿/**
* DevExpress Analytics (query-builder\utils\_requestwrapper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { SqlDataConnection } from '../dataSource/sql/sqlDataConnection';
import { IRebuildSchemaResponse, ISelectStatementResponse } from './requestwrapper';
import { SqlDataSource } from '../dataSource/sql/sqlDataSource';
import { FederationDataSource } from '../dataSource/federation/federationDataSource';
export declare function wrapGetSelectStatement(callback?: (connection: SqlDataConnection, queryJSON: string) => JQueryPromise<ISelectStatementResponse>): (connection: SqlDataConnection, queryJSON: string) => JQueryPromise<ISelectStatementResponse>;
export declare function wrapRebuildResultSchema(callback?: (dataSource: SqlDataSource, queryName?: string, relationsEditing?: boolean) => JQueryPromise<IRebuildSchemaResponse>): (dataSource: SqlDataSource, queryName?: string, relationsEditing?: boolean) => JQueryPromise<IRebuildSchemaResponse>;
export declare function wrapGetFederationdResultSchema(callback?: (dataSource: FederationDataSource) => JQueryPromise<{
    resultSchemaJSON: string;
}>): (dataSource: FederationDataSource) => JQueryPromise<{
    resultSchemaJSON: string;
}>;
