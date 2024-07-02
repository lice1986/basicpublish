﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\selectDataMembersPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListProvider, isList } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { DataMemberTreeNode, FieldTreeNode, TreeNodeItemsProvider } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { includeNonListItem } from '../../internal/_dataUtils';
import { AvailableFieldsTreeListController, DataMemberCustomCheckedTreeNode, MasterDetailQueryInfo, MasterDetailTreeListController } from '../internal/_masterDetailWizardUtils';
import { ReportWizardPageId } from '../pageId';
import { ReportType } from '../reportWizardState';
import { _restoreDataSourceFromState } from './chooseAvailableDataSourcePage';
export class SelectDataMembersPage extends WizardPageBase {
    constructor(_fieldListCallBack, _hideDataMemberSubItems = false) {
        super();
        this._fieldListCallBack = _fieldListCallBack;
        this._hideDataMemberSubItems = _hideDataMemberSubItems;
        this._rootItems = ko.observableArray([]);
        this._dataMemberSelectedPath = ko.observable(null);
        this._fieldSelectedPath = ko.observable(null);
        this._checkedDataMembers = ko.observableArray([]);
        this._checkedFields = ko.observableArray([]);
        this._showDataSource = false;
        this._afterCheckToggled = (node) => {
            if (!isList(node))
                return;
            if (!node.unChecked()) {
                if (this._checkedDataMembers.indexOf(node) === -1) {
                    if (!this._multiSelectMode) {
                        this._checkedDataMembers()[0] && this._checkedDataMembers()[0].setChecked(false);
                        this._checkedDataMembers([node]);
                    }
                    else {
                        this._checkedDataMembers.push(node);
                    }
                    this._fieldSelectedPath(node.path);
                }
            }
            else
                this._checkedDataMembers.remove(node);
            this._onChange();
        };
        this._afterCheckToggledFields = (node) => {
            this._processNode(node);
            this._onChange();
        };
        this._createMasterDetailTreeNode = (item, isChecked, path) => {
            const node = new DataMemberTreeNode(item.name, item.displayName, item.specifics, isChecked, path, this._afterCheckToggledFields);
            this._disposables.push(node);
            return node;
        };
        this._createMasterDetailFirstTabTreeNode = (item, isChecked, path) => {
            const checked = isChecked || (this._showDataSource ? [this.dataSourcePath, this.initialFullDataMember].join('.') : this.initialFullDataMember) === path;
            const node = new DataMemberCustomCheckedTreeNode(item.name, item.displayName, item.specifics, checked, path, this._afterCheckToggled);
            this._disposables.push(node);
            return node;
        };
        this._createMasterDetailLeafTreeNode = (item, isChecked, path) => {
            const node = new FieldTreeNode(item.name, item.displayName, item.specifics, isChecked, path, this._afterCheckToggledFields);
            this._disposables.push(node);
            return node;
        };
        this._showFirstLevelDataMembers = ko.observable(false);
        this._multiSelectMode = true;
        this._selectDataMembersCaption = getLocalization('Select data members', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_ChooseDataMembers_SelectDataMembers');
        this._selectDataFieldsCaption = getLocalization('Select data fields', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_ChooseDataMembers_SelectDataFields');
        const fieldListProvider = new FieldListProvider(this._wrapFieldListCallback(this._fieldListCallBack), ko.observableArray([]));
        this._disposables.push(this._dataMemberItemsProvider = new TreeNodeItemsProvider(fieldListProvider, this._rootItems, this._createMasterDetailFirstTabTreeNode, this._createMasterDetailLeafTreeNode));
        this._disposables.push(this._fieldMemberItemsProvider = new TreeNodeItemsProvider(fieldListProvider, this._rootItems, this._createMasterDetailTreeNode, this._createMasterDetailLeafTreeNode));
        this._availableFieldsController = new AvailableFieldsTreeListController(this._checkedDataMembers);
        this._disposables.push(ko.computed(() => {
            const item = this._availableFieldsController.selectedItem;
            item && item.collapsed && item.toggleCollapsed();
        }));
        this._dataMemberFieldListModel = {
            itemsProvider: this._dataMemberItemsProvider,
            selectedPath: this._dataMemberSelectedPath,
            treeListController: new MasterDetailTreeListController(this._showFirstLevelDataMembers),
            templateName: 'dxrd-treelist-with-checkbox'
        };
        this._fieldMemberFieldListModel = {
            itemsProvider: this._fieldMemberItemsProvider,
            selectedPath: this._fieldSelectedPath,
            treeListController: this._availableFieldsController,
            templateName: 'dxrd-treelist-with-checkbox'
        };
    }
    _wrapFieldListCallback(itemsCallback) {
        return (pathRequest) => {
            if (this._hideDataMemberSubItems) {
                return $.Deferred().resolve([]).promise();
            }
            else {
                return itemsCallback(new PathRequest(this._showDataSource ? pathRequest.fullPath : this.dataSourcePath + '.' + pathRequest.fullPath), this._dataSource);
            }
        };
    }
    get dataSourcePath() {
        return (this._dataSource.id || this._dataSource.ref);
    }
    getDataMemberSelectedPath(state) {
        if (state.masterDetailInfoCollection.length > 0)
            return null;
        return state.dataMember;
    }
    _beginInternal(state) {
        if (state.reportType === ReportType.Vertical) {
            this._multiSelectMode = false;
            this._showFirstLevelDataMembers(true);
        }
        this._dataSource = _restoreDataSourceFromState(state.newDataSource || state.dataSource);
        const dataMember = this.getDataMemberSelectedPath(state);
        this.initialFullDataMember = state.dataMember;
        if (state.masterDetailInfoCollection.length === 0) {
            return this._fieldListCallBack(new PathRequest(this.dataSourcePath), this._dataSource)
                .done((fields) => {
                this._fieldSelectedPath(null);
                this._checkedDataMembers([]);
                this._showDataSource = false;
                if (includeNonListItem(fields)) {
                    this._dataMemberSelectedPath([this.dataSourcePath, dataMember].join('.'));
                    this._showDataSource = true;
                    this._rootItems([{
                            name: this.dataSourcePath,
                            displayName: this._dataSource.name,
                            specifics: 'List'
                        }]);
                }
                else {
                    this._dataMemberSelectedPath(dataMember);
                    this._rootItems(fields.map((value) => {
                        return {
                            name: value.name,
                            displayName: value.displayName || value.name,
                            specifics: 'List'
                        };
                    }));
                }
            });
        }
        else {
            return $.Deferred().resolve().promise();
        }
    }
    _processFields(node) {
        if (!node.unChecked()) {
            if (this._checkedFields.indexOf(node) === -1) {
                this._checkedFields.push(node);
            }
        }
        else
            this._checkedFields.remove(node);
        this._onChange();
    }
    _processNode(node) {
        if (isList(node)) {
            node.children().forEach((item) => {
                if (isList(item)) {
                    this._processNode(item);
                }
                else {
                    this._processFields(item);
                }
            });
        }
        else {
            this._processFields(node);
        }
    }
    canNext() {
        return this._fieldMemberItemsProvider.hasCheckedItems();
    }
    canFinish() {
        return true;
    }
    selectDataMember(dataMemberPath) {
        this._dataMemberItemsProvider.selectItemByPath(dataMemberPath).always(() => this._onChange());
    }
    selectAllDataMembers() {
        this._dataMemberItemsProvider.selectAllItems(false).always(() => this._onChange());
    }
    selectDataField(dataFieldPath) {
        const pathParts = dataFieldPath.split('.');
        pathParts.pop();
        this._dataMemberItemsProvider.selectItemByPath(pathParts.join('.')).always(() => this._fieldMemberItemsProvider.selectItemByPath(dataFieldPath).always(() => this._onChange()));
    }
    selectDataFields(dataMemberPath) {
        this._dataMemberItemsProvider.selectItemByPath(dataMemberPath).always(() => {
            this._fieldMemberItemsProvider.selectItemsByPath(dataMemberPath).always(() => this._onChange());
        });
    }
    selectAllDataFields() {
        this._dataMemberItemsProvider.selectAllItems(false).always(() => this._fieldMemberItemsProvider.selectAllItems().always(() => this._onChange()));
    }
    initialize(state) {
        return this._beginInternal(state);
    }
    _haveCheckedFields() {
        return this._checkedFields().length !== 0;
    }
    commit() {
        return $.Deferred().resolve({
            masterDetailInfoCollection: (this._fieldMemberItemsProvider.getRootItems().filter(item => item.isList && !item.isComplex).map(item => {
                if (this._showDataSource)
                    item = $.extend({}, item, { name: '' });
                return new MasterDetailQueryInfo(item);
            }))
        }).promise();
    }
}
export function _registerSelectDataMembersPage(factory, reportWizardOptions, pageId = ReportWizardPageId.SelectDataMembersPage) {
    factory.registerMetadata(pageId, {
        create: () => {
            return new SelectDataMembersPage(reportWizardOptions.callbacks.fieldListsCallback, reportWizardOptions.hideDataMemberSubItems);
        },
        description: getLocalization('Select data members to assign to the report and its detail reports and fields to display in these reports.', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_ChooseDataMembers_Description'),
        template: 'dxrd-page-masterdetail-select-reportdata',
        getState: (state) => state,
        setState: (data, state) => state.masterDetailInfoCollection = data.masterDetailInfoCollection,
        resetState: (state, defaultState) => state.masterDetailInfoCollection = defaultState.masterDetailInfoCollection
    });
}
