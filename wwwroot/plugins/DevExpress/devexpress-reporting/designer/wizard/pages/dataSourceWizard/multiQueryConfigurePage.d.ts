﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\multiQueryConfigurePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { MultiQueryConfigurePage as AnalyticMultiQueryConfigurePage, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from '../../internal/utils';
export declare class MultiQueryConfigurePage extends AnalyticMultiQueryConfigurePage {
    private _dataSourceWizardHelper;
    constructor(reportWizardOptions: _ReportWizardOptions);
    _getQueriesCount(): any;
    _canEditQueryParameters(): any;
    initialize(state: any): JQueryPromise<any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerMultiQueryConfigurePage(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;
