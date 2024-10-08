﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\configureMasterDetailRelationshipsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { SqlDataSource } from '@devexpress/analytics-core/analytics-data';
import { ConfigureMasterDetailRelationshipsPage as ConfigureAnalyticMasterDetailRelationshipsPage, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { IDataSourceInfo } from '../../../actions/_sqlDataSourceEditor';
import { IReportWizardCallbacks } from '../../internal/_utils';
export declare class ConfigureMasterDetailRelationshipsPage extends ConfigureAnalyticMasterDetailRelationshipsPage {
    private _dataSourceWizardHelper;
    constructor(createSqlDataSourceInfo: (dataSource: SqlDataSource) => JQueryPromise<IDataSourceInfo>, sqlDataSourceResultSchema: any);
    initialize(state: any): JQueryPromise<import("@devexpress/analytics-core/analytics-data").ResultSet>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerConfigureMasterDetailRelationshipsPage(factory: PageFactory, callbacks: IReportWizardCallbacks): void;
