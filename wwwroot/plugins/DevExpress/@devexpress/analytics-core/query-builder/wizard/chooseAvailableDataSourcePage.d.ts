﻿/**
* DevExpress Analytics (query-builder\wizard\chooseAvailableDataSourcePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataSourceInfo } from '../../core/utils/_fieldListProvider';
import { ChooseAvailableItemPage } from './chooseAvailablePage';
import { _DataSourceWizardOptions } from './dataSourceWizard';
import { IDataSourceWizardState } from './dataSourceWizardState';
import { PageFactory } from './pageFactory';
export declare class ChooseAvailableDataSourcePage extends ChooseAvailableItemPage {
    commit(): JQuery.Promise<IDataSourceWizardState>;
    _getSelectedItem(state: IDataSourceWizardState): IDataSourceInfo;
    canNext(): boolean;
    canFinish(): boolean;
}
export declare function _registerChooseAvailableDataSourcePage(factory: PageFactory, wizardOptions: _DataSourceWizardOptions): void;