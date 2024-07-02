﻿/**
* DevExpress Analytics (query-builder\wizard\pages\multiQueryWizard\multiQueryConfigurePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { ISqlDataSourceWizardState } from '../../dataSourceWizardState';
import { MultiQueryTreeListItemFactory } from '../../internal/_utils';
import { TableQuery } from '../../../dataSource/sql/tableQuery';
import { ISqlQueryViewModel } from '../../../dataSource/utils';
import { TreeNode, TreeLeafNode } from '../../internal/_treeListNode';
import { _MultiQueryDataSourceWizardOptions } from '../../multiQueryDataSourceWizard';
import { QueryBuilderPopup } from '../../internal/_queryBuilderPopup';
import { CustomSqlQuery } from '../../../dataSource/sql/customSqlQuery';
import { ITreeListOptions } from '../../../../widgets/treelist/_treelistItem';
import { IDataMemberInfo, IAction } from '../../../../widgets/utils';
import { PageFactory } from '../../pageFactory';
import { ISelectStatementResponse } from '../../../utils/requestwrapper';
import { WizardPageBase } from '../wizardPageBase';
export declare class MultiQueryConfigurePage extends WizardPageBase<ISqlDataSourceWizardState, ISqlDataSourceWizardState> {
    private _options;
    private _callbacks;
    private _selectedPath;
    private _itemsProvider;
    private _customQueries;
    private _checkedQueries;
    private _sqlTextProvider;
    private _sqlDataSourceWrapper;
    private _dataSource;
    private _dataConnection;
    private _addQueryAlgorithm;
    private _addQueryFromTables;
    private _addQueryFromStoredProcedures;
    private _addQueryFromCustomQueries;
    private _getItemsPromise;
    private _resetDataSourceResult;
    private _setQueryCore;
    static _pushQuery(newQuery: ISqlQueryViewModel, node: TreeLeafNode, queries: ko.ObservableArray<ISqlQueryViewModel>): void;
    static _removeQuery(queries: ko.ObservableArray<ISqlQueryViewModel>, node: any): void;
    constructor(_options: _MultiQueryDataSourceWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    _showStatementPopup: (query: any) => void;
    _AddQueryWithBuilder(): void;
    _runQueryBuilder(): void;
    _loadPanelViewModel(element: HTMLElement): {
        animation: {
            show: {
                type: string;
                from: number;
                to: number;
                duration: number;
            };
            hide: {
                type: string;
                from: number;
                to: number;
                duration: number;
            };
        };
        deferRendering: boolean;
        message: any;
        visible: ko.Observable<boolean>;
        shading: boolean;
        shadingColor: string;
        position: {
            of: any;
        };
        container: any;
    };
    _setTableQuery(query: TableQuery, isInProcess?: ko.Observable<boolean>): JQueryPromise<ISelectStatementResponse>;
    _setCustomSqlQuery(query: CustomSqlQuery): void;
    _createTreeListFactory(): MultiQueryTreeListItemFactory;
    _showQbCallBack: (name?: any, isCustomQuery?: boolean) => void;
    commit(): JQueryPromise<ISqlDataSourceWizardState>;
    initialize(state: ISqlDataSourceWizardState): JQueryPromise<any>;
    _popupSelectStatement: {
        isVisible: ko.Observable<boolean>;
        title: () => string;
        query: any;
        data: ko.Observable<any>;
        okButtonText: () => string;
        okButtonHandler: (e: any) => void;
        aceOptions: {
            showLineNumbers: boolean;
            showPrintMargin: boolean;
            enableBasicAutocompletion: boolean;
            enableLiveAutocompletion: boolean;
            readOnly: boolean;
            highlightSelectedWord: boolean;
            showGutter: boolean;
            highlightActiveLine: boolean;
        };
        aceAvailable: any;
        additionalOptions: {
            onChange: (session: any) => void;
            onValueChange: (editor: any) => void;
            changeTimeout: number;
            overrideEditorFocus: boolean;
            setUseWrapMode: boolean;
        };
        languageHelper: {
            getLanguageMode: () => string;
            createCompleters: () => any[];
        };
        closest(element: HTMLElement, parentSelector: string): JQuery;
    };
    _customResetOptions: () => undefined;
    _queryEditIndex: ko.Observable<number>;
    disableCustomSql: boolean;
    _scrollViewHeight: string;
    _getItemsAfterCheck: (node: TreeNode) => any;
    _fieldListModel: ko.Observable<ITreeListOptions>;
    _popupQueryBuilder: QueryBuilderPopup;
    _customizeDBSchemaTreeListActions: (item: IDataMemberInfo, actions: IAction[]) => void;
    _hasParametersToEdit: ko.Computed<boolean>;
    _isDataLoadingInProcess: ko.Observable<boolean>;
}
export declare function _registerMultiQueryConfigurePage(factory: PageFactory, wizardOptions: _MultiQueryDataSourceWizardOptions): void;
