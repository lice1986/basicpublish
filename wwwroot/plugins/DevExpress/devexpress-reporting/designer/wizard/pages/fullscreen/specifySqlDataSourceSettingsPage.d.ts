﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifySqlDataSourceSettingsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { FullscreenWizardPageFactory, SpecifySqlDataSourceSettingsPage as SpecifyAnalyticSqlDataSourceSettingsPage } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from '../../internal/utils';
export declare class SpecifySqlDataSourceSettingsPage extends SpecifyAnalyticSqlDataSourceSettingsPage {
    registerSections(): void;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerSpecifySqlDataSourceSettingsPage(factory: FullscreenWizardPageFactory, wizardOptions: _ReportWizardOptions): void;