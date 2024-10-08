﻿/**
* DevExpress Analytics (query-builder\wizard\pages\multiQueryWizard\masterDetailRelationshipsPageBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { MasterDetailRelation } from '../../../dataSource/sql/masterDetailRelation';
import { ResultSet } from '../../../dataSource/resultSet';
import { IDataSourceBase } from '../../../dataSource/sql/sqlDataSource';
import { MasterDetailEditor } from '../../../widgets/masterdetaileditor/_masterDetailEditor';
import { WizardPageBase } from '../wizardPageBase';
import { IRebuildSchemaResponse } from '../../../utils/requestwrapper';
export declare class MasterDetailRelationshipsPageBase<TState = any, TResult = any> extends WizardPageBase<TState, TResult> {
    private _getResultSchema;
    private _getResultSet;
    protected _resultSet: ResultSet;
    protected relationsSubscription: ko.Subscription;
    protected _relations: ko.ObservableArray<MasterDetailRelation>;
    protected _dataSource(): IDataSourceBase;
    protected _restoreDataSource(state: TState): void;
    protected _updateRelations(): void;
    constructor(_getResultSchema: (dataSource: IDataSourceBase, queryName?: string, relationsEditing?: boolean) => JQueryPromise<IRebuildSchemaResponse>);
    canNext(): boolean;
    canFinish(): boolean;
    initialize(state: TState): JQueryPromise<ResultSet>;
    dispose(): void;
    _customResetOptions: () => undefined;
    _relationsEditor: ko.Observable<MasterDetailEditor>;
}
