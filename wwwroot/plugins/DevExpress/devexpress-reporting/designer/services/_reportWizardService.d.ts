﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportWizardService.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { JsonDataSource } from '@devexpress/analytics-core/analytics-data';
import { IJsonDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { IDataSourceInfo } from '../actions/_sqlDataSourceEditor';
import { IReportWizardState } from '../wizard/reportWizardState';
export interface IOldReportInfo {
    json: string;
    useInitialDataSource: boolean;
}
export declare class ReportWizardService {
    static createNewWizardRequest(reportWizardState: IReportWizardState, requestType: any, state: any, customizeWizardModelAction: (wizardModel: any) => void, oldReportInfo?: IOldReportInfo): string;
    static generateReportFromWizardState(reportWizardState: IReportWizardState, requestType: any, state: any, customizeWizardModelAction: (wizardModel: any) => void, oldReportInfo?: IOldReportInfo): JQueryPromise<any>;
    static getLabelReportWizardData(): any;
    static createNewJsonDataSource(state: IJsonDataSourceWizardState, createJsonCallback: (dataSource: JsonDataSource) => JQueryPromise<IDataSourceInfo>): JQuery.Promise<string, any, any>;
}
