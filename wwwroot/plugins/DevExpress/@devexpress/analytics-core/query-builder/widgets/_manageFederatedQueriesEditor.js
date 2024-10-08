﻿/**
* DevExpress Analytics (query-builder\widgets\_manageFederatedQueriesEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { findFirstItemMatchesCondition } from '../../core/utils/_arrayutils';
import { PopupEditorBase } from '../../core/widgets/_popupEditorBase';
import { getLocalization } from '../../property-grid/localization/_localization';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
import { FederationQueryType } from '../dataSource/utils';
import { FederatedQueriesTreeNode } from '../wizard/internal/federationDataSource/_federatedQueriesTreeNode';
import { FederatedQueriesHelper } from './_federatedQueriesHelper';
export class ManageFederatedQueriesEditor extends PopupEditorBase {
    constructor(_dataSource, _callBack, rtl = false) {
        super();
        this._dataSource = _dataSource;
        this._callBack = _callBack;
        this.rtl = rtl;
        this.className = 'dxrd-federated-manageQueries-editor';
        this._disposables.push(this._queriesPopupHelper = new FederatedQueriesHelper(this._dataSource, this._dataSource.queries, {}, rtl));
        this._createAddQueryButton();
        this.queriesStoreData = ko.pureComputed(() => this._dataSource && this._dataSource.queries().map(x => {
            return {
                name: x.alias(),
                id: x.alias(),
                type: FederationQueryType[x.queryType()]
            };
        }));
        this._disposables.push(this.queriesStoreData);
        this.queriesGrid = {
            rtlEnabled: rtl,
            dataSource: this.queriesStoreData,
            showColumnLines: false,
            hoverStateEnabled: true,
            scrolling: { mode: 'infinite' },
            height: '100%',
            editing: {
                mode: 'cell',
                allowUpdating: true,
            },
            onRowUpdating: (event) => {
                event.oldData.alias = event.newData.name;
            },
            columns: [{
                    dataField: 'name',
                    get caption() {
                        return getLocalization('Name', 'AnalyticsCoreStringId.CollectionEditor_Name_Placeholder');
                    },
                }, {
                    type: 'buttons',
                    width: 100,
                    buttons: [
                        {
                            icon: 'edit',
                            onClick: (e) => {
                                this._queriesPopupHelper.editQuery(e.row.data.type, e.row.data.id);
                            },
                            cssClass: 'dxrd-manage-queries-actions dxd-icon-highlighted dxrd-image-operations-edit-query',
                            template: getTemplate('dxrd-svg-operations-edit'),
                        },
                        {
                            icon: 'delete',
                            onClick: (e) => {
                                this._dataSource.removeQuery(e.row.data.id);
                            },
                            cssClass: 'dxrd-manage-queries-actions dxd-icon-highlighted dxrd-image-recycle-bin',
                            template: getTemplate('dxrd-svg-operations-recycle_bin'),
                        }
                    ]
                }
            ]
        };
    }
    _createAddQueryButton() {
        const addQueryTemplate = 'dxrd-managequeries-selectbox';
        const queriesTreeNode = new FederatedQueriesTreeNode('queries', getLocalization('Federated Queries', 'DataAccessUIStringId.FederatedQueryCollectionList_Title'), 'list', false, ko.observable({ showQbCallBacks: this._queriesPopupHelper.callBacks }));
        const popoverListItems = queriesTreeNode.popoverListItems();
        const addAction = {
            text: getLocalization('Add query', 'AnalyticsCoreStringId.SqlDSWizard_AddQuery'),
            items: popoverListItems.map(x => {
                return {
                    text: x.name,
                    onClick: x.addAction
                };
            }),
            dropDownOptions: {
                width: 150,
                container: '.dx-designer-viewport',
            },
            useItemTextAsTitle: false
        };
        this.buttonItems.push({ toolbar: 'bottom', location: 'before', template: function () { return getTemplate(addQueryTemplate); }, options: addAction });
    }
    save() {
        this.queriesStoreData().forEach(data => {
            const query = findFirstItemMatchesCondition(this._dataSource.queries(), query => query.alias() === data.id);
            query.sources().forEach(x => this._dataSource.addSource(x));
            if (query && data.id !== data.name) {
                query.alias(data.name);
            }
        });
        this._callBack();
        super.save();
        this.dispose();
    }
    canSave() {
        return !!this.queriesStoreData().length;
    }
    close() {
        super.close();
        this.dispose();
    }
    dispose() {
        super.dispose();
        this.queriesGrid = null;
        this._dataSource = null;
        this._callBack = null;
    }
    title() {
        return getLocalization('Manage Queries', 'DataAccessUIStringId.FederatedQueryCollectionEditorForm_Title');
    }
}
