﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_federationDataSourceEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { FederationDataSource } from '@devexpress/analytics-core/analytics-data';
import { IDataSourceInfo as analyticIDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { IAction } from '@devexpress/analytics-core/analytics-utils';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { IDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { FederatedQueriesHelper, ManageFederatedQueriesEditor, MasterDetailEditor } from '@devexpress/analytics-core/queryBuilder-widgets-internal';
import * as ko from 'knockout';
import { DataSourceEditorBase, IDataSourceInfo } from './_sqlDataSourceEditor';
export declare class FederationDataSourceEditor extends DataSourceEditorBase {
    private _applyFederationDataSourceWizardChanges;
    applyFederationDataSourceWizardChanges(dataSourceWizardModel: IDataSourceWizardState): JQuery.Promise<IDataSourceInfo>;
    static createFederationDataSourceInfo(dataSource: FederationDataSource): JQueryPromise<IDataSourceInfo>;
    private _wrapFieldListCallback;
    getFederationDataSourceByInfo(dataSourceInfo: analyticIDataSourceInfo): JQuery.Promise<FederationDataSource>;
    editMasterDetailRelations(dataSourceID: string): void;
    saveDataSourceInfo(federationDataSource: FederationDataSource, dataSourceInfo: analyticIDataSourceInfo): void;
    openManageQueriesEditor(dataSourceID: string): void;
    addAction: {
        clickAction: (item: TreeListItemViewModel) => void;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    editAction: {
        clickAction: (item: TreeListItemViewModel) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    editRelationsAction: {
        clickAction: (item: TreeListItemViewModel) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    removeAction: {
        clickAction: (item: TreeListItemViewModel) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    getActions(context: TreeListItemViewModel): IAction[];
    relationsEditor: ko.Observable<MasterDetailEditor>;
    manageQueriesEditor: ko.Observable<ManageFederatedQueriesEditor>;
    queriesPopupHelper: ko.Observable<FederatedQueriesHelper>;
}