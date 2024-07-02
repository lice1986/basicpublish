﻿/**
* DevExpress Analytics (query-builder\utils\requestwrapper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IAjaxSettings } from '../../core/utils/_utils.ajax';
import { SqlDataConnection } from '../dataSource/sql/sqlDataConnection';
import { DBTable } from '../dataSource/dbTable';
import { SqlDataSource } from '../dataSource/sql/sqlDataSource';
import { JsonDataSource } from '../dataSource/json/jsonDataSource';
import { IParameter } from '../wizard/internal/_utils';
import { FederationDataSource } from '../dataSource/federation/federationDataSource';
export interface ISelectStatementResponse {
    sqlSelectStatement: string;
    errorMessage: string;
}
export interface IUriJsonSourceValidationResult {
    isUriValid: boolean;
    faultMessage?: string;
}
export interface IRebuildSchemaResponse {
    resultSchemaJSON: string;
    connectionParameters?: string;
}
export declare class RequestWrapper {
    sendRequest<T = any>(action: string, arg: string): JQueryPromise<T>;
    _sendRequest<T = any>(settings: IAjaxSettings): JQueryPromise<T>;
    getDbSchema({ connection, tables, getViews, getTables }: {
        connection: SqlDataConnection;
        tables?: DBTable[];
        getViews?: boolean;
        getTables?: boolean;
    }): JQueryPromise<{
        dbSchemaJSON: string;
    }>;
    getDbStoredProcedures(connection: SqlDataConnection): JQueryPromise<{
        dbSchemaJSON: string;
    }>;
    getSelectStatement(connection: SqlDataConnection, queryJSON: string): JQueryPromise<ISelectStatementResponse>;
    getDataPreview(connection: SqlDataConnection, queryJSON: string): JQueryPromise<{
        dataPreviewJSON: string;
    }>;
    rebuildResultSchema(dataSource: SqlDataSource, queryName?: string, relationsEditing?: boolean, parameters?: IParameter[]): JQueryPromise<IRebuildSchemaResponse>;
    getFederationResultSchema(dataSource: FederationDataSource): JQueryPromise<{
        resultSchemaJSON: string;
    }>;
    validateJsonUri(jsonDataSource: JsonDataSource): JQueryPromise<IUriJsonSourceValidationResult>;
    saveJsonSource(connectionName: string, jsonDataSource: JsonDataSource): JQueryPromise<string>;
    getJsonSchema(jsonDataSource: JsonDataSource, parameters: IParameter[]): JQueryPromise<{
        jsonSchemaJSON: string;
    }>;
    getObjectTypeDescriptions(context: string): JQueryPromise<{
        objectDataSourceInfoJson: string;
    }>;
}
