﻿/**
* DevExpress Analytics (query-builder\wizard\dataSourceWizardState.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '../../core/utils/_fieldListProvider';
import { FederationDataSource } from '../dataSource/federation/federationDataSource';
import { JsonDataSource } from '../dataSource/json/jsonDataSource';
import { ObjectDataSource } from '../dataSource/object/objectDataSource';
import { ObjectCtor, ObjectDataMember, ObjectType } from '../dataSource/object/objectSchema';
import { RequestWrapper } from '../utils/requestwrapper';
import { DataSourceType } from './pages/chooseDataSourceTypePage';
import { _SqlDataSourceWrapper } from './pages/sqlDataSourceWizard/_sqlDataSourceWrapper';
export interface ISqlDataSourceWizardState {
    name?: string;
    queryName?: string;
    sqlDataSourceJSON?: string;
    relations?: string[];
    customQueries?: string[];
}
export interface IJsonDataSourceWizardState {
    dataSourceName?: string;
    jsonScheme?: string;
    rootElement?: string;
    jsonSource?: string;
    newConnectionName?: string;
    connectionName?: string;
}
export interface IObjectDataSourceWizardState {
    dataSourceName?: string;
    selectedType?: string;
    dataMember?: ObjectDataMember;
    ctor?: ObjectCtor;
    context?: string;
    selectedObjectType?: ObjectType;
}
export interface IFederationDataSourceWizardState {
    name?: string;
    federationDataSourceJSON?: string;
    relations?: string[];
    federatedQueries?: string[];
}
export interface IDataSourceWizardState {
    dataSourceType?: DataSourceType;
    sqlDataSourceWizard?: ISqlDataSourceWizardState;
    jsonDataSourceWizard?: IJsonDataSourceWizardState;
    objectDataSourceWizard?: IObjectDataSourceWizardState;
    federationDataSourceWizard?: IFederationDataSourceWizardState;
    dataSourceId?: string;
    predefinedDataSourceName?: string;
}
export declare let _restoreSqlDataSourceFromState: (state?: ISqlDataSourceWizardState, requestWrapper?: RequestWrapper, dataSourceId?: string) => _SqlDataSourceWrapper;
export declare const _setRestoreSqlDataSourceFromState: (func: (state?: ISqlDataSourceWizardState, requestWrapper?: RequestWrapper, dataSourceId?: string) => _SqlDataSourceWrapper) => void;
export declare const _resetRestoreSqlDataSourceFromState: () => void;
export declare const _restoreFederationDataSourceFromState: (state: IFederationDataSourceWizardState, usedDataSources: ko.ObservableArray<IDataSourceInfo> | ko.Computed<IDataSourceInfo[]>, dataSourceId?: string) => FederationDataSource;
export declare let _restoreJsonDataSourceFromState: (state: IJsonDataSourceWizardState, requestWrapper?: RequestWrapper, dataSourceId?: string) => JsonDataSource;
export declare function _setRestoreJsonDataSourceFromState(func: (state: IJsonDataSourceWizardState, requestWrapper?: RequestWrapper, dataSourceId?: string) => JsonDataSource): void;
export declare function _resetRestoreJsonDataSourceFromState(): void;
export declare function _restoreObjectDataSourceFromState(state: IObjectDataSourceWizardState, requestWrapper?: RequestWrapper, dataSourceId?: string): ObjectDataSource;
export declare function _createDefaultDataSourceWizardState(sqlDataSourceWizardState?: ISqlDataSourceWizardState, jsonDataSourceWizardState?: IJsonDataSourceWizardState, objectDataSourceWizardState?: IObjectDataSourceWizardState, federationDataSourceWizardState?: IFederationDataSourceWizardState): IDataSourceWizardState;
