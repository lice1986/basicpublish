﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\chooseJsonSchemaPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { JsonDataSource } from '@devexpress/analytics-core/analytics-data';
import { ChooseJsonSchemaPage as ChooseAnalyticJsonSchemaPage, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { IDataSourceInfo } from '../../../actions/_sqlDataSourceEditor';
import { IReportWizardCallbacks } from '../../internal/_utils';
export declare class ChooseJsonSchemaPage extends ChooseAnalyticJsonSchemaPage {
    private _dataSourceWizardHelper;
    private _dataSourceId;
    constructor(createJsonDataSourceInfo: (dataSource: JsonDataSource) => JQueryPromise<IDataSourceInfo>);
    initialize(state: any): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerChooseJsonSchemaPage(factory: PageFactory, callbacks: IReportWizardCallbacks): void;
