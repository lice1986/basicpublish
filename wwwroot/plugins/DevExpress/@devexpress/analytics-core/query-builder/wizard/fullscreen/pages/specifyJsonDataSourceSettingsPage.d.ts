﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\specifyJsonDataSourceSettingsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _DataSourceWizardOptions } from '../../dataSourceWizard';
import { FullscreenWizardPageFactory } from '../fullscreenWizardPageFactory';
import { FullscreenWizardPage } from './fullscreenWizardPage';
export declare class SpecifyJsonDataSourceSettingsPage extends FullscreenWizardPage {
    private _dataSourceWizardOptions;
    constructor(_dataSourceWizardOptions: _DataSourceWizardOptions);
    registerSections(): void;
    getNextSectionId(sectionId: string): string;
    canNext(): boolean;
}
export declare function _registerSpecifyJsonDataSourceSettingsPage(factory: FullscreenWizardPageFactory, dataSourceWizardOptions: _DataSourceWizardOptions): void;
