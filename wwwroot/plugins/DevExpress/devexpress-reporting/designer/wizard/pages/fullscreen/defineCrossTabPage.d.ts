﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\defineCrossTabPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { FullscreenWizardPage, FullscreenWizardPageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from '../../internal/utils';
export declare class DefineCrossTabPage extends FullscreenWizardPage {
    private _reportWizardOptions;
    constructor(_reportWizardOptions: _ReportWizardOptions);
    _showPageDescription(): boolean;
    canNext(): boolean;
    _className: string;
    registerSections(): void;
    getNextSectionId(sectionId: string): string;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerSelectSingleDataMemberPage(factory: FullscreenWizardPageFactory, reportWizardOptions: _ReportWizardOptions): void;
export declare function _registerDefineCrossTabPage(factory: FullscreenWizardPageFactory, reportWizardOptions: _ReportWizardOptions): void;