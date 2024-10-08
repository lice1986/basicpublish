﻿/**
* DevExpress Analytics (query-builder\wizard\pages\federationDataSourceWizard\federatedMasterDetailRelationshipsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IFederationDataSourceWizardState } from '../../dataSourceWizardState';
import { MasterDetailEditor } from '../../../widgets/masterdetaileditor/_masterDetailEditor';
import { PageFactory } from '../../pageFactory';
import { FederationDataSource } from '../../../dataSource/federation/federationDataSource';
import { _MultiQueryDataSourceWizardOptions } from '../../multiQueryDataSourceWizard';
import { MasterDetailRelationshipsPageBase } from '../multiQueryWizard/masterDetailRelationshipsPageBase';
import { IDataSourceBase } from '../../../dataSource/sql/sqlDataSource';
export declare class FederatedMasterDetailRelationshipsPage extends MasterDetailRelationshipsPageBase<IFederationDataSourceWizardState, IFederationDataSourceWizardState> {
    private _options;
    private _federationDataSource;
    protected _restoreDataSource(state: IFederationDataSourceWizardState): void;
    protected _dataSource(): IDataSourceBase;
    constructor(federationDataSourceResultSchema: (dataSource: FederationDataSource) => JQueryPromise<{
        resultSchemaJSON: string;
    }>, _options: _MultiQueryDataSourceWizardOptions);
    commit(): JQuery.Promise<IFederationDataSourceWizardState, any, any>;
    _customResetOptions: () => undefined;
    _relationsEditor: ko.Observable<MasterDetailEditor>;
}
export declare function _registerFederatedMasterDetailRelationshipsPage(factory: PageFactory, federationDataSourceResultSchema: (dataSource: FederationDataSource) => JQueryPromise<{
    resultSchemaJSON: string;
}>, wizardOptions: _MultiQueryDataSourceWizardOptions): void;
