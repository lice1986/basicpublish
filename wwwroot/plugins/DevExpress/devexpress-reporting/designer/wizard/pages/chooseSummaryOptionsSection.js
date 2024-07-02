﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseSummaryOptionsSection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { SummaryInfoFieldlist } from '../internal/_masterDetailWizardUtils';
import { ReportWizardPageId } from '../pageId';
import { _fillTreeQueries } from './addGroupingLevelPage';
import { _registerChooseSummaryOptionsPage } from './chooseSummaryOptionsPage';
export class AddSummaryFieldsPage extends WizardPageBase {
    constructor() {
        super(...arguments);
        this._toggleIgnoreNullValues = () => {
            this.ignoreNullValues(!this.ignoreNullValues());
            this._onChange();
        };
        this._fieldListProvider = ko.observable(null);
        this.ignoreNullValues = ko.observable(false);
        this._template = 'dxrd-page-masterdetail-summary-section';
        this._reportTree = ko.observableArray([]);
        this._availableFieldsCount = ko.observable(0);
        this._summaryInfos = ko.observableArray([]);
        this._selectFieldToSummaryCaption = getLocalization('Select fields and assign summary functions to them', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SummaryOptions_SelectFieldsAndSummaries');
        this._fieldsCaption = getLocalization('Field', 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryFields_Text');
        this._summaryFunctionCaption = getLocalization('Summary Functions', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SummaryOptions_SummaryFunctions');
        this._ignoreNullValuesCaption = getLocalization('Ignore null values', 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_IgnoreNullValues');
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this._summaryInfos);
    }
    _fillTreeQueries(tree, queries, availableQueries) {
        _fillTreeQueries([], queries, 0).forEach((value) => {
            if (availableQueries[value.path]) {
                const fields = value.fields.filter(x => availableQueries[value.path].some(field => field.name === x.name));
                const treeItem = $.extend(true, {}, value);
                treeItem.fields = fields;
                tree.push(treeItem);
            }
        });
        return tree;
    }
    _createSummaryInfo() {
        const newItem = new SummaryInfoFieldlist();
        newItem._disposables.push(newItem.selectedPath.subscribe((newVal) => {
            if (!newVal)
                newItem.field(null);
            else {
                this._fieldListProvider().getItemByPath({
                    fullPath: newVal,
                    path: newVal
                }).done((item) => {
                    newItem.field(item);
                    this._createNewItemIfNeed();
                });
            }
            this._onChange();
        }));
        newItem._disposables.push(newItem.functionValue.subscribe((newVal) => {
            this._onChange();
        }));
        return newItem;
    }
    _createNewItemIfNeed() {
        const _summaryInfos = this._summaryInfos.peek();
        if (_summaryInfos.filter(item => !item.field()).length === 0 && _summaryInfos.length < this._availableFieldsCount())
            this._summaryInfos.push(this._createSummaryInfo());
    }
    _getParentName(parent) {
        if (parent.parent) {
            return [this._getParentName(parent.parent), parent.displayName].join('.');
        }
        return parent.displayName;
    }
    _flat(fields, parent) {
        let flatList = fields.map(x => {
            if (x.path) {
                x.name = x.path;
            }
            else {
                x.path = [parent.path, x.name].join('.');
            }
            if (parent) {
                x.parent = {
                    path: parent.path,
                    displayName: this._getParentName(parent)
                };
            }
            return x;
        });
        fields.forEach(x => {
            if (x.fields) {
                flatList = flatList.concat(this._flat(x.fields, x));
            }
        });
        return flatList;
    }
    _removeSummaryInfo(info) {
        const index = this._summaryInfos.indexOf(info);
        if (index === -1)
            return;
        info.dispose();
        this._summaryInfos.splice(index, 1);
        if (this._summaryInfos.length === 0) {
            this._createNewItemIfNeed();
        }
        this._onChange();
    }
    canFinish() {
        return true;
    }
    _updateSummaries(flatlist) {
        this._summaryInfos().filter(x => x.field() && flatlist.every(item => item.path !== x.field().path)).forEach((item) => {
            this._summaryInfos().splice(this._summaryInfos().indexOf(item), 1);
        });
        this._summaryInfos.valueHasMutated();
    }
    initialize(state) {
        this.ignoreNullValues(state.ignoreNullValuesForSummary);
        this._reportTree(this._fillTreeQueries([], state.masterDetailInfoCollection, state.masterDetailSummaryOptionsColumns));
        const flatList = this._flat(this._reportTree());
        this._updateSummaries(flatList);
        this._availableFieldsCount(this._reportTree().reduce((count, item) => {
            count += item.fields.length;
            return count;
        }, 0));
        this._fieldListProvider({
            getItemByPath: (path) => {
                return $.Deferred().resolve(flatList.filter(x => x.path === path.fullPath)[0]).promise();
            },
            getItems: (path) => {
                const deferred = $.Deferred();
                if (path.fullPath === '') {
                    deferred.resolve(this._reportTree().filter(root => root.fields.some((field) => this._summaryInfos().every((summaryInfo) => summaryInfo.field() !== field))));
                }
                else {
                    const item = this._reportTree().filter(x => x.path === path.fullPath)[0];
                    if (item) {
                        deferred.resolve(item.fields.filter(field => this._summaryInfos().every(summaryInfo => summaryInfo.field() !== field)));
                    }
                    else
                        deferred.resolve([]);
                }
                return deferred.promise();
            }
        });
        this._createNewItemIfNeed();
        return $.Deferred().resolve().promise();
    }
    commit() {
        const masterDetailSummariesInfo = {};
        this._summaryInfos().forEach(summaryOption => {
            const field = summaryOption.field();
            if (!field)
                return;
            if (!masterDetailSummariesInfo[field['parent'].path]) {
                masterDetailSummariesInfo[field['parent'].path] = [];
            }
            masterDetailSummariesInfo[field['parent'].path].push({
                column: summaryOption.field(),
                summaryFunctions: summaryOption.value.value().map(item => summaryOption.value.dataSource.map(option => option.value).indexOf(item))
            });
        });
        const ignoreNullValuesForSummary = this.ignoreNullValues();
        return $.Deferred().resolve({
            masterDetailSummariesInfo: masterDetailSummariesInfo,
            ignoreNullValuesForSummary: ignoreNullValuesForSummary
        }).promise();
    }
}
export function _registerAddSummaryFieldsPage(factory) {
    _registerChooseSummaryOptionsPage(factory);
    const meta = factory.getMetadata(ReportWizardPageId.ChooseSummaryOptionsPage);
    meta.create = () => {
        return new AddSummaryFieldsPage();
    };
    meta['disabledText'] = getLocalization('To add a summary field to the report, select a data field (numeric, date-time or boolean) and ensure that it is not used in groups.', 'ASPxReportsStringId.ReportDesigner_Wizard_AddSummaryFields_Placeholder');
    meta.template = 'dxrd-page-masterdetail-summary-section';
}