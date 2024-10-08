﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\multiQueryConfigureParametersPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { SqlDataSource } from '@devexpress/analytics-core/analytics-data';
import { MultiQueryConfigureParametersPage as AnalyticMultiQueryConfigureParametersPage, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { IDataSourceInfo } from '../../../actions/_sqlDataSourceEditor';
import { IReportWizardCallbacks } from '../../internal/_utils';
export declare class MultiQueryConfigureParametersPage extends AnalyticMultiQueryConfigureParametersPage {
    private createSqlDataSourceInfo;
    private _dataSourceWizardHelper;
    constructor(createSqlDataSourceInfo: (dataSource: SqlDataSource) => JQueryPromise<IDataSourceInfo>, parametersConverters?: any, requestWrapper?: any);
    initialize(state: any): JQueryPromise<any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerMultiQueryConfigureParametersPage(factory: PageFactory, callbacks: IReportWizardCallbacks): void;
