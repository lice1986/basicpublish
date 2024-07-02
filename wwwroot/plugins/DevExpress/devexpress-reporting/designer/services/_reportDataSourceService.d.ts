﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportDataSourceService.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FederationDataSource, JsonDataSource, SqlDataSource, TableQuery } from '@devexpress/analytics-core/analytics-data';
import { IDataMemberInfo, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import { IConnectionStringDefinition, IObjectDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
export declare class ReportDataSourceService {
    static fieldListCallback(request: IPathRequest): JQueryPromise<IDataMemberInfo[]>;
    static getCustomQueriesPreset(dataSource: SqlDataSource): JQueryPromise<TableQuery[]>;
    static getWizardSqlDataConnections(): JQueryPromise<IConnectionStringDefinition[]>;
    static getWizardJsonDataConnections(): JQueryPromise<IConnectionStringDefinition[]>;
    static sqlDataSourceFromBase64(base64: string): JQueryPromise<{
        sqlDataSourceJSON: string;
        queryName: string;
        relationsEditing: boolean;
    }>;
    static sqlRebuildResultSchema(base64: string): JQueryPromise<string>;
    static getSqlDataSourceBase64(dataSource: SqlDataSource): JQueryPromise<string>;
    static federationDataSourceFromBase64(base64: string, dependentDataSources: string[]): JQueryPromise<{
        federationDataSourceJSON: string;
    }>;
    static federationRebuildResultSchema(base64: string, dependentDataSources: string[]): JQueryPromise<string>;
    static getFederationDataSourceBase64(dataSource: FederationDataSource, dependentDataSources: string[]): JQueryPromise<string>;
    static getJsonDataSourceBase64(dataSource: JsonDataSource): JQueryPromise<{
        base64: string;
        schema: string;
        isSupportQueries: boolean;
        isListType: boolean;
    }>;
    static getObjectDataSourceBase64(json: IObjectDataSourceWizardState): JQueryPromise<{
        base64: string;
        isSupportQueries: boolean;
        isListType: boolean;
    }>;
    static editObjectDataSourceParameters(json: IObjectDataSourceWizardState, base64: string): JQueryPromise<{
        base64: string;
        isSupportQueries: boolean;
        isListType: boolean;
    }>;
    static objectDataSourceFromBase64(base64: string): JQueryPromise<IObjectDataSourceWizardState>;
    static jsonDataSourceFromBase64(base64: string): JQueryPromise<{
        jsonDataSourceJSON: string;
    }>;
}