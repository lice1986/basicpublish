﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_sqlDataSourceEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { SqlDataSource } from '@devexpress/analytics-core/analytics-data';
import { IActionsProvider, IDataSourceInfo as analyticIDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { IAction, IItemsProvider, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceWizard, DataSourceWizardPageIterator, IDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { IMultiQueryDataSourceWizardCallbacks, IParameter } from '@devexpress/analytics-core/analytics-wizard-internal';
import { IRebuildSchemaResponse } from '@devexpress/analytics-core/queryBuilder-utils';
import { MasterDetailEditor } from '@devexpress/analytics-core/queryBuilder-widgets-internal';
import * as ko from 'knockout';
import { ReportViewModel } from '../controls/xrReport';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
export declare abstract class DataSourceEditorBase implements IActionsProvider {
    _dsHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>;
    _wizard: DataSourceWizard;
    _reportViewModel: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>;
    _undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
    _itemsProvider: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>;
    _callbacks?: IMultiQueryDataSourceWizardCallbacks;
    _rtl?: boolean;
    abstract getActions(context: any): IAction[];
    constructor(_dsHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>, _wizard: DataSourceWizard, _reportViewModel: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>, _undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, _itemsProvider: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>, _callbacks?: IMultiQueryDataSourceWizardCallbacks, _rtl?: boolean);
    protected _findDataSource(dataSourceID: string): analyticIDataSourceInfo;
    static _onFail(result: any, deferred: JQueryDeferred<any>): void;
}
export interface IDataSourceInfo extends analyticIDataSourceInfo {
    base64: () => string;
}
export declare class CreateQueryIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId: string): string;
}
export declare class SqlDataSourceEditor extends DataSourceEditorBase {
    private _applyWizardChanges;
    private _createOrEditSqlDataSource;
    private _applyDataSourceChange;
    relationsEditor: ko.Observable<MasterDetailEditor>;
    editSqlQuery(dataSourceID: string, queryName: string): void;
    addSqlQuery(dataSourceID: string): void;
    removeSqlQuery(dataSourceID: string, queryName: string): void;
    editMasterDetailRelations(dataSourceID: string): void;
    applySqlDataSourceWizardChanges(dataSourceWizardModel: IDataSourceWizardState): JQueryPromise<IDataSourceInfo>;
    static rebuildResultSchema(source: SqlDataSource, queryName?: string, relationsEditing?: boolean, parameters?: IParameter[]): JQueryPromise<IRebuildSchemaResponse>;
    static createSqlDataSourceInfo(source: SqlDataSource, queryName?: string, relationsEditing?: boolean, parameters?: IParameter[]): JQueryPromise<IDataSourceInfo>;
    addAction: {
        clickAction: (item: any) => void;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    editAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    removeAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    editRelationsAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    getActions(context: any): IAction[];
}
