﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_dataSourceActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListProvider, IActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { IAction, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../controls/xrReport';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { ReportDesignerTreelistItem } from '../internal/fieldlist/_treelistItem';
export declare class DataSourceActions implements IActionsProvider {
    private _allowEditDataSource;
    private _allowRemoveDataSource;
    private _fieldListProvider;
    private _dsHelper;
    private _reportViewModel;
    private _undoEngine;
    private _findDataSource;
    constructor(dsHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>, reportViewModel: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, _allowEditDataSource: boolean, _allowRemoveDataSource: boolean, _fieldListProvider: ko.Observable<FieldListProvider> | ko.Computed<FieldListProvider>);
    removeDataSource(dataSourceID: string): void;
    addPredifinedDataSource(dataSourceName: string): void;
    removeDataSourceAction: {
        clickAction: (item: ReportDesignerTreelistItem) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    rebuildResultSchema(dataSourceID: string): void;
    rebuildResultSchemaAction: IAction;
    renameAction: IAction;
    getActions(context: ReportDesignerTreelistItem): IAction[];
}
