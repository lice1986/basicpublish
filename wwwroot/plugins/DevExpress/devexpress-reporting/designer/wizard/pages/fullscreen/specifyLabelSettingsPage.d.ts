﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyLabelSettingsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FullscreenWizardPage, FullscreenWizardPageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from '../../internal/utils';
export declare class SpecifyLabelSettingsPage extends FullscreenWizardPage {
    private _reportWizardOptions;
    constructor(_reportWizardOptions: _ReportWizardOptions);
    registerSections(): void;
    canNext(): boolean;
    getNextSectionId(sectionId: string): string;
}
export declare function _registerSpecifyLabelSettingsPage(factory: FullscreenWizardPageFactory, reportWizardOptions: _ReportWizardOptions): void;
