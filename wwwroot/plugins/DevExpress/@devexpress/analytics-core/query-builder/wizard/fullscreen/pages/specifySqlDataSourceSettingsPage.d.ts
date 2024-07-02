﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\specifySqlDataSourceSettingsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _MultiQueryDataSourceWizardOptions } from '../../multiQueryDataSourceWizard';
import { FullscreenWizardPageFactory } from '../fullscreenWizardPageFactory';
import { FullscreenWizardPage } from './fullscreenWizardPage';
export declare class SpecifySqlDataSourceSettingsPage extends FullscreenWizardPage {
    private _dataSourceWizardOptions;
    constructor(_dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions);
    getNextSectionId(sectionId: string): string | any[];
    registerSections(): void;
}
export declare function _registerSpecifySqlDataSourceSettingsPage(factory: FullscreenWizardPageFactory, dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions): void;
