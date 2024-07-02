﻿/**
* DevExpress Analytics (query-builder\wizard\pages\jsonDataSourceWizard\specifyJsonConnectionPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IItemsProvider } from '../../../../widgets/utils';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { IJsonDataSourceWizardState } from '../../dataSourceWizardState';
import { IConnectionStringDefinition } from '../../internal/initializer';
import { PageFactory } from '../../pageFactory';
import { IWizardPage } from '../IWizardPage';
import { ChooseJsonConnectionPage } from './chooseJsonConnectionPage';
import { ChooseJsonSourcePage } from './chooseJsonSourcePage';
export declare class SpecifyJsonConnectionPage extends ChooseJsonConnectionPage {
    private _requestWrapper;
    constructor(connections: any, allowCreateNewJsonConnection: any, itemsProvider?: IItemsProvider, _requestWrapper?: RequestWrapper, _getJsonConnectionsCallback?: () => JQueryPromise<IConnectionStringDefinition[]>);
    commit(): JQuery.Promise<IJsonDataSourceWizardState, any, any>;
    canNext(): boolean;
    initialize(state: any): JQuery.Promise<IWizardPage, any, any>;
    _specifySourceData: ChooseJsonSourcePage;
}
export declare function _registerSpecifyJsonConnectionPage(factory: PageFactory, connections: ko.ObservableArray<any>, allowCreateNewJsonConnection: boolean, getItemsProviderCallBack: () => IItemsProvider, getJsonConnectionsCallback?: () => JQueryPromise<IConnectionStringDefinition[]>): void;