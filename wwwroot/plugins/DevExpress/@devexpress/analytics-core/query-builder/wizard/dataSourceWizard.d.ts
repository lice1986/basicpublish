﻿/**
* DevExpress Analytics (query-builder\wizard\dataSourceWizard.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IDataSourceInfo } from '../../core/utils/_fieldListProvider';
import { TableQuery } from '../dataSource/sql/tableQuery';
import { ISelectStatementResponse, RequestWrapper } from '../utils/requestwrapper';
import { IDataSourceWizardState } from './dataSourceWizardState';
import { IConnectionStringDefinition, IDataSourceWizardConnectionStrings } from './internal/initializer';
import { IDataSourceWizardCallbacks } from './internal/_utils';
import { PageFactory } from './pageFactory';
import { PageIterator } from './pageIterator';
import { PopupWizard } from './popupWizard';
import { StateManager } from './stateManager';
export declare class _DataSourceWizardOptionsBase<T extends IDataSourceWizardCallbacks> {
    get jsonDataSourceAvailable(): boolean;
    get sqlDataSourceAvailable(): boolean;
    get objectDataSourceAvailable(): boolean;
    get canCreateDataSource(): boolean;
    get canRunWizard(): boolean;
    get federationDataSourceAvailable(): boolean;
    connectionStrings: IDataSourceWizardConnectionStrings;
    callbacks: T;
    rtl: boolean;
    requestWrapper: RequestWrapper;
    disableCustomSql: boolean;
    wizardSettings: IDataSourceWizardSettings;
    queryName: string;
    allowCreateNewJsonConnection: boolean;
    dataSources: ko.PureComputed<IDataSourceInfo[]>;
    predefinedDataSources: ko.PureComputed<IDataSourceInfo[]> | ko.Observable<IDataSourceInfo[]>;
    getSqlConnectionStrings?: () => JQueryPromise<IConnectionStringDefinition[]>;
    getJsonConnectionStrings?: () => JQueryPromise<IConnectionStringDefinition[]>;
}
export declare class _DataSourceWizardOptions extends _DataSourceWizardOptionsBase<IDataSourceWizardCallbacks> {
}
export interface IDataSourceWizardSettings {
    enableJsonDataSource?: boolean;
    enableSqlDataSource?: boolean;
    enableObjectDataSource?: boolean;
    enableFederationDataSource?: boolean;
}
export declare class DataSourceWizardSettings implements IDataSourceWizardSettings {
    createDefault(settings?: IDataSourceWizardSettings): IDataSourceWizardSettings;
    enableJsonDataSource?: boolean;
    enableSqlDataSource?: boolean;
    enableObjectDataSource?: boolean;
    enableFederationDataSource?: boolean;
}
export interface IRetrieveQuerySqlCallback {
    (query: TableQuery, isInProcess: ko.Observable<boolean>): JQueryPromise<ISelectStatementResponse>;
}
export declare class DataSourceWizardPageIterator extends PageIterator {
    private _dataSourceWizardOptions;
    constructor(pageFactory: PageFactory, stateManager: StateManager, _dataSourceWizardOptions: _DataSourceWizardOptions);
    getNextPageId(pageId: string): string;
}
export declare class DataSourceWizard extends PopupWizard {
    private _wizardOptions;
    constructor(pageFactory: PageFactory, _wizardOptions: _DataSourceWizardOptions);
    initialize(state: IDataSourceWizardState, createIterator?: (pageFactory: PageFactory, stateManager: StateManager) => PageIterator): void;
    canRunWizard(): boolean;
    _extendCssClass: string;
    title: any;
}
export declare function _registerDataSourceWizardPages(factory: PageFactory, dataSourceWizardOptions: _DataSourceWizardOptions): PageFactory;
export declare function _createDataSourceWizard(factory: PageFactory, dataSourceWizardOptions: _DataSourceWizardOptions): DataSourceWizard;
