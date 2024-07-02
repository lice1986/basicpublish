﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\selectDataMemberPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListProvider, getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { DataMemberTreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { _masterDetailScrollViewHeight } from '../../internal/_utils';
import { LegacyReportWizardPageId } from '../../pageId';
import { _restoreDataSourceFromState } from '../chooseAvailableDataSourcePage';
class DataMemberPageTreeListController extends DataMemberTreeListController {
    canSelect(value) {
        return (this.hasItems(value.data) && !!value.path) || value.data.specifics === 'none';
    }
}
export class LegacyChooseDataMemberPage extends WizardPageBase {
    constructor(reportWizardOptions) {
        super();
        this._rootItems = ko.observableArray([]);
        this._selectedPath = ko.observable(null);
        this._fieldListCallBack = reportWizardOptions.callbacks.fieldListsCallback;
        this._createSqlDataSourceInfo = reportWizardOptions.callbacks.createSqlDataSourceInfo;
        this._hideDataMemberSubItems = reportWizardOptions.hideDataMemberSubItems;
        this.scrollViewHeight = _masterDetailScrollViewHeight;
        this.fieldListModel = {
            itemsProvider: new FieldListProvider(this._wrapFieldListCallback(this._fieldListCallBack), this._rootItems),
            selectedPath: this._selectedPath,
            treeListController: new DataMemberPageTreeListController()
        };
    }
    _wrapFieldListCallback(itemsCallback) {
        return (pathRequest) => {
            if (this._hideDataMemberSubItems) {
                const deferred = $.Deferred();
                deferred.resolve([]);
                return deferred.promise();
            }
            else {
                return itemsCallback(new PathRequest(this.dataSourcePath + '.' + pathRequest.fullPath), this._dataSource);
            }
        };
    }
    get dataSourcePath() {
        return (this._dataSource.id || this._dataSource.ref);
    }
    _beginInternal(state) {
        this._dataSource = _restoreDataSourceFromState(state.newDataSource || state.dataSource);
        if (!state.dataMemberPath) {
            return this._fieldListCallBack(new PathRequest(this.dataSourcePath), this._dataSource).done((fields) => {
                this._selectedPath(null);
                this._rootItems(fields.map((value) => {
                    return {
                        name: value.displayName,
                        id: value.name,
                        specifics: 'List',
                        dataSerializer: null,
                        data: {}
                    };
                }));
            });
        }
        else {
            this._selectedPath(state.dataMemberPath.replace(this.dataSourcePath + '.', ''));
            return $.Deferred().resolve().promise();
        }
    }
    canNext() {
        return !!this._selectedPath();
    }
    canFinish() {
        return !!this._selectedPath();
    }
    initialize(state) {
        return this._beginInternal(state);
    }
    commit() {
        return $.Deferred().resolve({
            dataMemberPath: getFullPath(this.dataSourcePath, this._selectedPath()),
            dataMemberInfo: this.fieldListModel.treeListController.selectedItem && this.fieldListModel.treeListController.selectedItem.data
        }).promise();
    }
}
export function _registerLegacyChooseDataMemberPage(factory, reportWizardOptions) {
    factory.registerMetadata(LegacyReportWizardPageId.ChooseDataMemberPage, {
        setState: (data, state) => {
            state.dataMemberInfo = data.dataMemberInfo;
            state.dataMemberPath = data.dataMemberPath;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.dataMemberInfo = defaultState.dataMemberInfo;
            state.dataMemberPath = defaultState.dataMemberPath;
        },
        create: () => {
            return new LegacyChooseDataMemberPage(reportWizardOptions);
        },
        template: 'dxrd-page-dataMember',
        description: getLocalization('The table or view you choose determines wich columns will be available in your report.', 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseDataMember')
    });
}