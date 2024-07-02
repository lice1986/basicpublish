﻿/**
* DevExpress Analytics (query-builder\wizard\pages\federationDataSourceWizard\federatedQueryConfigurePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { findFirstItemMatchesCondition } from '../../../../core/utils/_arrayutils';
import { FieldListProvider } from '../../../../core/utils/_fieldListProvider';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { ModelSerializer } from '../../../../serializer/serializer';
import { FederationDataSource } from '../../../dataSource/federation/federationDataSource';
import { FederatedQueriesHelper } from '../../../widgets/_federatedQueriesHelper';
import { FederationDataSourceItemsExtender } from '../../internal/federationDataSource/_federationDataSourceItemsExtender';
import { FederationTreeNodeProvider } from '../../internal/federationDataSource/_federationTreeNodeProvider';
import { __loadingStateFunctionName } from '../../internal/_constants';
import { DBSchemaTreeListController } from '../../internal/_dbSchemaTreeListController';
import { MultiQueryTreeListItemFactory } from '../../internal/_utils';
import { FederationDataSourceWizardPageId } from '../../pageId';
import { PopupWizard } from '../../popupWizard';
import { WizardPageBase } from '../wizardPageBase';
export class FederatedQueryConfigurePage extends WizardPageBase {
    constructor(_options) {
        super();
        this._options = _options;
        this._selectedPath = ko.observable(null);
        this._itemsProvider = ko.observable();
        this._customQueries = ko.observableArray([]);
        this._setQueryChecked = (query) => {
            const rootItems = this._itemsProvider().getRootItems();
            this._selectedPath('queries.' + query.alias());
            const queries = findFirstItemMatchesCondition(rootItems, (data) => data.name === 'queries');
            const children = queries.children();
            const child = children[children.length - 1];
            child.setChecked(true);
            child['_afterCheckToggled'] && child['_afterCheckToggled'](child);
        };
        this._dataSources = ko.observableArray();
        this._scrollViewHeight = 'calc(100% - 37px)';
        this._isDataLoadingInProcess = ko.observable(false);
        this._customizeDBSchemaTreeListActions = null;
        this._dataSources(this._options.dataSources());
        this._disposables.push(this._fieldListProvider = new FieldListProvider(this._wrapFieldListCallback(this._options.callbacks.fieldListsCallback, false), this._dataSources, [
            new FederationDataSourceItemsExtender(this._dataSources)
        ], true));
        this._disposables.push(this._dataSource = new FederationDataSource({}, this._dataSources, this._fieldListProvider, new ModelSerializer()));
        this._disposables.push(this._queriesPopupHelper = new FederatedQueriesHelper(this._dataSource, this._customQueries, { afterAddQuery: this._setQueryChecked }, this._options.rtl));
        this._fieldListModel = ko.observable(null);
        this._getItemsAfterCheck = (node) => {
            const pathParts = node.path.split('.');
            if (node.specifics == 'query') {
                const query = node['query'] || findFirstItemMatchesCondition(this._customQueries(), (data) => (data.alias() || query.generateName()) === node.name);
                query.alias(node.name);
                if (node.checked.peek()) {
                    this._dataSource.queries.indexOf(query) === -1 && this._dataSource.queries.push(query);
                }
                else {
                    this._dataSource.queries.remove(query);
                }
            }
            else if (!node.isList || pathParts.length > 2) {
                const columnName = pathParts.pop();
                const queryName = pathParts.join('.');
                node.checked.peek() ? this._dataSource.addSelectQuery(queryName, columnName) : this._dataSource.removeExpression(columnName, queryName);
            }
            else {
                node.children().forEach(x => this._getItemsAfterCheck(x));
            }
            this._onChange();
            this[__loadingStateFunctionName] && this[__loadingStateFunctionName](false);
        };
    }
    _wrapFieldListCallback(itemsCallback, useCache) {
        return (pathRequest) => {
            const _dataSource = findFirstItemMatchesCondition(this._dataSources(), x => {
                return x.id != null && pathRequest.id != null && x.id === pathRequest.id ||
                    x.ref != null && pathRequest.id != null && x.ref === pathRequest.ref;
            });
            if (_dataSource)
                return itemsCallback(pathRequest, _dataSource, useCache);
            else
                return itemsCallback(pathRequest, undefined, useCache);
        };
    }
    canNext() {
        return this._dataSource.queries().length > 1;
    }
    canFinish() {
        return this._dataSource.queries().length > 0;
    }
    _createTreeListFactory() {
        return new MultiQueryTreeListItemFactory();
    }
    _loadPanelViewModel(element) {
        return PopupWizard._getLoadPanelViewModel(element, this._isDataLoadingInProcess);
    }
    commit() {
        return $.Deferred().resolve({
            federationDataSourceJSON: JSON.stringify(new ModelSerializer().serialize(this._dataSource)),
            federatedQueries: []
        }).promise();
    }
    initialize(state) {
        const deferred = $.Deferred();
        const rootItems = ko.observableArray($.map(this._dataSources(), (item) => {
            return {
                name: item.id || item.ref,
                displayName: item.name,
                isList: true,
                specifics: item.specifics || 'ListSource',
                isListType: item.isListType,
                dragData: { noDragable: false }
            };
        }));
        const itemsProvider = new FederationTreeNodeProvider(this._fieldListProvider, rootItems, this._queriesPopupHelper.callBacks, this._customQueries, this._getItemsAfterCheck);
        this._disposables.push(itemsProvider);
        this._itemsProvider(itemsProvider);
        this._fieldListModel({
            factory: this._createTreeListFactory(),
            itemsProvider: this._itemsProvider(),
            selectedPath: this._selectedPath,
            treeListController: new DBSchemaTreeListController(this._customizeDBSchemaTreeListActions),
            templateName: 'dxrd-treelist-with-checkbox'
        });
        return deferred.resolve().promise();
    }
}
export function _registerFederatedQueryConfigurePage(factory, wizardOptions) {
    factory.registerMetadata(FederationDataSourceWizardPageId.FederatedQueryConfigurePage, {
        create: () => {
            return new FederatedQueryConfigurePage(wizardOptions);
        },
        setState: (data, state) => {
            state.federationDataSourceJSON = data.federationDataSourceJSON;
            state.federatedQueries = data.federatedQueries;
        },
        getState: (state) => {
            return state.federationDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.federationDataSourceJSON = defaultState.federationDataSourceJSON;
            state.federatedQueries = defaultState.federatedQueries;
        },
        description: getLocalization('Columns selected from specific tables and/or views will be automatically included into a separate query.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureMultiQuery'),
        template: 'dxrd-wizard-add-federated-queries-page'
    });
}