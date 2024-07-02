﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyFederationDataSourceSettingsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { FullscreenWizardPageFactory, SpecifyFederationDataSourceSettingsPage as AnalyticSpecifyFederationDataSourceSettingsPage } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from '../../internal/utils';
export declare class SpecifyFederationDataSourceSettingsPage extends AnalyticSpecifyFederationDataSourceSettingsPage {
    canNext(): boolean;
    initialize(state: any): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerSpecifyFederationDataSourceSettingsPage(factory: FullscreenWizardPageFactory, wizardOptions: _ReportWizardOptions): void;