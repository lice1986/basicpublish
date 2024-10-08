﻿/**
* DevExpress Analytics (query-builder\wizard\pages\chooseSqlConnectionPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { ISqlDataSourceWizardState } from '../dataSourceWizardState';
import { IConnectionStringDefinition } from '../internal/initializer';
import { PageFactory } from '../pageFactory';
import { WizardPageBase } from './wizardPageBase';
export declare class ChooseSqlConnectionPage extends WizardPageBase<ISqlDataSourceWizardState, ISqlDataSourceWizardState> {
    private _getSqlConnectionsCallback?;
    constructor(connectionStrings: ko.ObservableArray<IConnectionStringDefinition>, _getSqlConnectionsCallback?: () => JQueryPromise<IConnectionStringDefinition[]>);
    initialize(state: ISqlDataSourceWizardState): JQueryPromise<any>;
    canNext(): boolean;
    commit(): JQueryPromise<ISqlDataSourceWizardState>;
    _connectionStrings: ko.ObservableArray<IConnectionStringDefinition>;
    _selectedConnectionString: ko.ObservableArray<IConnectionStringDefinition>;
}
export declare function _registerChooseSqlConnectionPage(factory: PageFactory, connectionStrings: ko.ObservableArray<IConnectionStringDefinition>, getSqlConnectionsCallback?: () => JQueryPromise<IConnectionStringDefinition[]>): void;
