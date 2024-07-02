﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\selectDataSourcePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '../../../../core/utils/_fieldListProvider';
import { _DataSourceWizardOptions } from '../../dataSourceWizard';
import { FullscreenWizardPageFactory } from '../fullscreenWizardPageFactory';
import { FullscreenWizardPage } from './fullscreenWizardPage';
export declare class SelectDataSourcePage extends FullscreenWizardPage {
    private wizardOptions;
    private dataSources;
    constructor(wizardOptions: _DataSourceWizardOptions, dataSources: IDataSourceInfo[]);
    registerSections(): void;
    showPredefinedDataSourceSection(): boolean;
    showChooseDataSourceTypeSection(): boolean;
    getNextSectionId(sectionId: string): string;
    disabledSectionText: any;
}
export declare function _registerSelectDataSourcePage(factory: FullscreenWizardPageFactory, wizardOptions: _DataSourceWizardOptions): void;