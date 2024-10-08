﻿/**
* DevExpress Analytics (query-builder\wizard\pages\multiQueryWizard\configureMasterDetailRelationshipsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { ISqlDataSourceWizardState } from '../../dataSourceWizardState';
import { IDataSourceBase, SqlDataSource } from '../../../dataSource/sql/sqlDataSource';
import { MasterDetailEditor } from '../../../widgets/masterdetaileditor/_masterDetailEditor';
import { PageFactory } from '../../pageFactory';
import { MasterDetailRelationshipsPageBase } from './masterDetailRelationshipsPageBase';
import { IRebuildSchemaResponse } from '../../../utils/requestwrapper';
export declare class ConfigureMasterDetailRelationshipsPage extends MasterDetailRelationshipsPageBase<ISqlDataSourceWizardState, ISqlDataSourceWizardState> {
    private _sqlDataSourceWrapper;
    protected _restoreDataSource(state: ISqlDataSourceWizardState): void;
    protected _dataSource(): IDataSourceBase;
    commit(): JQueryPromise<ISqlDataSourceWizardState>;
    _customResetOptions: () => undefined;
    _relationsEditor: ko.Observable<MasterDetailEditor>;
}
export declare function _registerConfigureMasterDetailRelationshipsPage(factory: PageFactory, sqlDataSourceResultSchema: (dataSource: SqlDataSource, queryName?: string, relationsEditing?: boolean) => JQueryPromise<IRebuildSchemaResponse>): void;
