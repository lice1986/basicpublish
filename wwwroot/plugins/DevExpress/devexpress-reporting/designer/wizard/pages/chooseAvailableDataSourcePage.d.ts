﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseAvailableDataSourcePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ChooseAvailableItemPage, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from '../internal/utils';
export declare function _convertToStateDataSource(dataSource: any): string;
export declare function _restoreDataSourceFromState(serializedDataSource: any): any;
export declare class ChooseAvailableDataSourcePage extends ChooseAvailableItemPage {
    commit(): JQuery.Promise<any, any, any>;
    _getSelectedItem(state: any): any;
    get createNewOperationText(): any;
}
export declare function _registerChooseAvailableDataSourcePage(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;