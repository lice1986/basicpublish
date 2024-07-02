﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\specifyFederationDataSourceSettingsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _MultiQueryDataSourceWizardOptions } from '../../multiQueryDataSourceWizard';
import { FullscreenWizardPageFactory } from '../fullscreenWizardPageFactory';
import { FullscreenWizardPage } from './fullscreenWizardPage';
export declare class SpecifyFederationDataSourceSettingsPage extends FullscreenWizardPage {
    protected _dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions;
    constructor(_dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions);
    getNextSectionId(sectionId: string): string;
    _showPageDescription(): boolean;
    registerSections(): void;
}
export declare function _registerSpecifyFederationDataSourceSettingsPage(factory: FullscreenWizardPageFactory, dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions): void;
