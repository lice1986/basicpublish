﻿/**
* DevExpress Analytics (query-builder\wizard\pages\federationDataSourceWizard\federatedQueryConfigurePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { FieldListProvider, IDataSourceInfo } from '../../../../core/utils/_fieldListProvider';
import { ITreeListOptions } from '../../../../widgets/treelist/_treelistItem';
import { IAction, IDataMemberInfo } from '../../../../widgets/utils';
import { FederationDataSource } from '../../../dataSource/federation/federationDataSource';
import { ISqlQueryViewModel } from '../../../dataSource/utils';
import { FederatedQueriesHelper } from '../../../widgets/_federatedQueriesHelper';
import { IFederationDataSourceWizardState, ISqlDataSourceWizardState } from '../../dataSourceWizardState';
import { TreeNode } from '../../internal/_treeListNode';
import { MultiQueryTreeListItemFactory } from '../../internal/_utils';
import { _MultiQueryDataSourceWizardOptions } from '../../multiQueryDataSourceWizard';
import { PageFactory } from '../../pageFactory';
import { WizardPageBase } from '../wizardPageBase';
export declare class FederatedQueryConfigurePage extends WizardPageBase<IFederationDataSourceWizardState, IFederationDataSourceWizardState> {
    private _options;
    private _selectedPath;
    private _itemsProvider;
    private _customQueries;
    private _setQueryChecked;
    private _wrapFieldListCallback;
    constructor(_options: _MultiQueryDataSourceWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    _createTreeListFactory(): MultiQueryTreeListItemFactory;
    _loadPanelViewModel(element: HTMLElement): {
        animation: any;
        message: any;
        visible: any;
        shading: any;
        shadingColor: any;
        position: any;
        container: any;
    };
    commit(): JQuery.Promise<IFederationDataSourceWizardState>;
    initialize(state: ISqlDataSourceWizardState): JQuery.Promise<ISqlQueryViewModel>;
    _queriesPopupHelper: FederatedQueriesHelper;
    _fieldListProvider: FieldListProvider;
    _getItemsAfterCheck: (node: TreeNode) => any;
    _dataSources: ko.ObservableArray<IDataSourceInfo>;
    _dataSource: FederationDataSource;
    _scrollViewHeight: string;
    _fieldListModel: ko.Observable<ITreeListOptions>;
    _isDataLoadingInProcess: ko.Observable<boolean>;
    _customizeDBSchemaTreeListActions: (item: IDataMemberInfo, actions: IAction[]) => void;
}
export declare function _registerFederatedQueryConfigurePage(factory: PageFactory, wizardOptions: _MultiQueryDataSourceWizardOptions): void;
