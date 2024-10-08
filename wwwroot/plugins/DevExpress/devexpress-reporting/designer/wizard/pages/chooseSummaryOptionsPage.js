﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseSummaryOptionsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getSummaryFunctionValues } from '../../controls/metadata/properties/metadata';
import { SummaryInfo } from '../internal/_masterDetailWizardUtils';
import { ReportWizardPageId } from '../pageId';
import { _fillTreeQueries } from './addGroupingLevelPage';
export class ChooseSummaryOptionsPage extends WizardPageBase {
    constructor() {
        super();
        this._allColumns = {};
        this._masterDetailColumns = {};
        this._toggleIgnoreNullValues = () => {
            this.ignoreNullValues(!this.ignoreNullValues());
            this._onChange();
        };
        this._summaryOptions = ko.observableArray([]);
        this.ignoreNullValues = ko.observable(false);
        this._template = 'dxrd-page-masterdetail-summary';
        this._reportTree = ko.observableArray([]);
        this._currentPath = ko.observable('');
        this._availableFields = ko.observableArray([]);
        this._summaryInfos = ko.observableArray([]);
        this._selectFieldToSummaryCaption = getLocalization('Select fields and assign summary functions to them', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SummaryOptions_SelectFieldsAndSummaries');
        this._fieldsCaption = getLocalization('Fields', 'DevExpress.XtraReports.UI.XRPivotGrid.Fields');
        this._summaryFunctionCaption = getLocalization('Summary Functions', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SummaryOptions_SummaryFunctions');
        this._ignoreNullValuesCaption = getLocalization('Ignore null values', 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_IgnoreNullValues');
        this._disposables.push(this._currentPath.subscribe(newPath => {
            this._changeQuery(newPath);
        }));
    }
    _createSummaryInfo() {
        const newItem = new SummaryInfo(getSummaryFunctionValues());
        this._disposables.push(newItem.field.subscribe(newValue => {
            this._createNewItemIfNeed();
        }));
        return newItem;
    }
    _createNewItemIfNeed() {
        const _summaryInfos = this._summaryInfos.peek();
        if (_summaryInfos.filter(item => !item.field()).length === 0 && _summaryInfos.length < this._availableFields.peek().length)
            this._summaryInfos.push(this._createSummaryInfo());
        const fieldNames = this._summaryInfos.peek().filter(item => !!item.field()).map(item => item.field().name);
        this._displayedFields[this._currentPath()] && this._displayedFields[this._currentPath()]().forEach(item => item.visible(fieldNames.indexOf(item.name) === -1));
        this._onChange();
    }
    _changeQuery(path) {
        this._currentPath(path);
        this._summaryInfoMapByDataMember[this._currentDataMember] = this._summaryInfos();
        this._currentDataMember = path;
        this._availableFields(this._masterDetailColumns[path] || []);
        this._summaryInfos(this._summaryInfoMapByDataMember[path] || []);
        this._createNewItemIfNeed();
    }
    _removeSummaryInfo(info) {
        const index = this._summaryInfos.indexOf(info);
        if (index === -1)
            return;
        this._summaryInfos.splice(index, 1);
        this._createNewItemIfNeed();
        this._onChange();
    }
    canFinish() {
        return true;
    }
    initialize(state) {
        this._masterDetailColumns = $.extend(true, {}, state.masterDetailSummaryOptionsColumns);
        this.ignoreNullValues(state.ignoreNullValuesForSummary);
        this._reportTree(_fillTreeQueries([], state.masterDetailInfoCollection, 0));
        this._currentDataMember = this._reportTree()[0].path;
        const allColumnsTest = {};
        this._reportTree().forEach(query => {
            allColumnsTest[query.path] = state.masterDetailSummaryOptionsColumns[query.path] && state.masterDetailSummaryOptionsColumns[query.path].map(field => field.name);
        });
        let changes = [];
        $.each(allColumnsTest, (key, value) => {
            changes = changes.concat(ko.utils.compareArrays(this._allColumns[key], value));
        });
        const isColumnsChanged = changes.some((change, index, array) => { return change.status != 'retained'; });
        if (isColumnsChanged) {
            this._allColumns = allColumnsTest;
            this._summaryInfos([]);
            this._summaryInfoMapByDataMember = {};
            this._displayedFields = {};
            $.each(this._masterDetailColumns, (key, value) => {
                this._displayedFields[key] = ko.observableArray([]);
                this._displayedFields[key](value.map(item => {
                    return { name: item.name, displayName: item.displayName, visible: ko.observable(true) };
                }));
            });
        }
        else {
            this._summaryInfos(this._summaryInfoMapByDataMember[this._currentDataMember]);
        }
        this._changeQuery(this._currentDataMember);
        return $.Deferred().resolve().promise();
    }
    commit() {
        this._summaryInfoMapByDataMember[this._currentDataMember] = this._summaryInfos();
        const masterDetailSummaryOptionsColumns = this._masterDetailColumns;
        const masterDetailSummariesInfo = {};
        $.each(this._summaryInfoMapByDataMember, (key, value) => {
            masterDetailSummariesInfo[key] = value.filter(item => !!item.field()).map(summaryOption => ({ column: summaryOption.field(), summaryFunctions: summaryOption.value.value().map(item => summaryOption.value.dataSource.map(option => option.value).indexOf(item)) }));
        });
        const ignoreNullValuesForSummary = this.ignoreNullValues();
        return $.Deferred().resolve({
            masterDetailSummaryOptionsColumns: masterDetailSummaryOptionsColumns,
            masterDetailSummariesInfo: masterDetailSummariesInfo,
            ignoreNullValuesForSummary: ignoreNullValuesForSummary
        }).promise();
    }
}
export function _registerChooseSummaryOptionsPage(factory) {
    factory.registerMetadata(ReportWizardPageId.ChooseSummaryOptionsPage, {
        create: () => {
            return new ChooseSummaryOptionsPage();
        },
        description: getLocalization('Choose summary functions to calculate in reports.', 'ReportBoxDesignerStringId.Wizard_MasterDetailChooseSummaryOptions_Description'),
        template: 'dxrd-page-masterdetail-summary',
        getState: (state) => state,
        setState: (data, state) => {
            state.masterDetailSummariesInfo = data.masterDetailSummariesInfo;
            state.ignoreNullValuesForSummary = data.ignoreNullValuesForSummary;
        },
        resetState: (state, defaultState) => {
            state.masterDetailSummariesInfo = defaultState.masterDetailSummariesInfo;
            state.ignoreNullValuesForSummary = defaultState.ignoreNullValuesForSummary;
        }
    });
}
