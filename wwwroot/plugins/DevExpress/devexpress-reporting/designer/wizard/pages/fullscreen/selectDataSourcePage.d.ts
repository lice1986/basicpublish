﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\selectDataSourcePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FullscreenWizardPage, FullscreenWizardPageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from '../../internal/utils';
export declare class SelectDataSourcePage extends FullscreenWizardPage {
    private reportWizardOptions;
    constructor(reportWizardOptions: _ReportWizardOptions);
    registerSections(): void;
    getNextSectionId(sectionId: any): string;
}
export declare function _registerSelectDataSourcePage(factory: FullscreenWizardPageFactory, reportWizardOptions: _ReportWizardOptions): void;
