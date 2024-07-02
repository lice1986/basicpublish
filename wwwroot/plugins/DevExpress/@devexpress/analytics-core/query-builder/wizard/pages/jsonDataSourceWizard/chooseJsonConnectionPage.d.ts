﻿/**
* DevExpress Analytics (query-builder\wizard\pages\jsonDataSourceWizard\chooseJsonConnectionPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataSourceInfo } from '../../../../core/utils/_fieldListProvider';
import { ChooseAvailableItemPage } from '../../chooseAvailablePage';
import { _DataSourceWizardOptions } from '../../dataSourceWizard';
import { IJsonDataSourceWizardState } from '../../dataSourceWizardState';
import { PageFactory } from '../../pageFactory';
export declare class ChooseJsonConnectionPage extends ChooseAvailableItemPage {
    commit(): JQuery.Promise<IJsonDataSourceWizardState, any, any>;
    _getSelectedItem(data: IJsonDataSourceWizardState): IDataSourceInfo;
    get createNewOperationText(): any;
    get existingOperationText(): any;
}
export declare function _registerChooseJsonConnectionPage(factory: PageFactory, wizardOptions: _DataSourceWizardOptions): void;
