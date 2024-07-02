﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\addGroupingLevelSection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, getParentContainer, selectPlaceholder } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ReportWizardPageId } from '../pageId';
import { _fillTreeQueries, _registerAddGroupingLevelPage } from './addGroupingLevelPage';
export class _GroupsFieldStore extends Disposable {
    constructor(query, _onChange) {
        super();
        this._onChange = _onChange;
        this.groups = ko.observableArray();
        this.addGroupText = () => getLocalization('Add Group', 'ASPxReportsStringId.ReportDesigner_Wizard_AddGroup_Text');
        this.path = query.path;
        this.displayName = query.displayName;
        this.dataSource = ko.observableArray(query.fields.map(x => $.extend(true, {}, x, { visible: ko.observable(true) })));
    }
    dispose() {
        this.disposeObservableArray(this.groups);
    }
    getSelectedFieldsFlat() {
        return [].concat([], ...this.getSelectedFields());
    }
    getSelectedFields() {
        return this.groups().filter(x => x.fields().length > 0).map(x => x.fields());
    }
    isCreateGroupEnabled() {
        const groupsWithoutFields = this.groups().filter(x => x.fields().length === 0).length;
        const newAvailableGroupsCount = this.dataSource().length - this.getSelectedFieldsFlat().length;
        return newAvailableGroupsCount - groupsWithoutFields > 0;
    }
    add() {
        this.groups.push(new _GroupField(this, this._onChange));
        this._onChange();
    }
    remove(index) {
        this.groups()[index].dispose();
        this.groups.splice(index, 1);
        this._onChange();
    }
    moveUpDisabled(index) {
        return index === 0;
    }
    moveDownDisabled(index) {
        return index === this.groups().length - 1;
    }
    moveup(index) {
        const groups = this.groups();
        groups.splice(index - 1, 2, groups[index], groups[index - 1]);
        this.groups.valueHasMutated();
        this._onChange();
    }
    movedown(index) {
        const groups = this.groups();
        groups.splice(index, 2, groups[index + 1], groups[index]);
        this.groups.valueHasMutated();
        this._onChange();
    }
}
export class _GroupField extends Disposable {
    constructor(_store, _onChange) {
        super();
        this._store = _store;
        this._onChange = _onChange;
        this.fields = ko.observableArray();
        this._disposables.push(this.fields.subscribe(() => this._onChange()));
        let needRefresh = true;
        this.value = {
            dataSource: this._store.dataSource,
            showDropDownButton: true,
            searchEnabled: true,
            value: this.fields,
            getOptions: (options) => this.getOptions(options),
            multiline: false,
            placeholder: selectPlaceholder(),
            selectAllText: getLocalization('Select All', 'AnalyticsCoreStringId.SelectAll'),
            getPopupContainer: getParentContainer,
            showSelectionControls: true,
            valueExpr: 'name',
            displayExpr: 'displayName',
            searchExpr: ['displayName'],
            onOpened: (e) => {
                this._updateDataSource();
                if (e.component._popup) {
                    const _$content = $.fn.constructor(e.component.content());
                    const _selectAll = _$content.find('.dx-list-select-all');
                    const _popupHeight = _$content.height();
                    _selectAll.css('display', 'none');
                    _$content.height(_popupHeight - _selectAll.outerHeight());
                    e.component._popup.refreshPosition();
                }
                if (needRefresh) {
                    e.component._refresh();
                    needRefresh = false;
                }
            },
            onClosed: (e) => {
                this._store.dataSource().forEach(x => x.visible(true));
                needRefresh = true;
            },
        };
    }
    _updateDataSource() {
        this._store.dataSource().forEach(item => {
            item.visible(!this._store.groups.peek().some(group => {
                return group !== this && group.fields().indexOf(item.name) !== -1;
            }));
        });
    }
    getOptions(options) {
        return extend(this.value, { dropDownOptions: options.dropDownOptions });
    }
}
export class AddGroupFieldsPage extends WizardPageBase {
    constructor() {
        super(...arguments);
        this._reportTree = [];
        this._groupInfos = ko.observableArray();
    }
    dispose() {
        this.disposeObservableArray(this._groupInfos);
    }
    canFinish() {
        return true;
    }
    _mergeGroups(newGroups) {
        const currentGroups = this._groupInfos();
        newGroups.forEach((groupInfo) => {
            const currentGroup = currentGroups.filter(group => group.displayName === groupInfo.displayName)[0];
            if (!currentGroup || currentGroup.groups().length === 0)
                return;
            currentGroup.groups().filter(group => group.fields().length > 0).forEach((group) => {
                const availabelFields = groupInfo.dataSource().filter((field) => group.fields().some(x => x === field.name));
                if (availabelFields.length > 0) {
                    groupInfo.add();
                    groupInfo.groups()[groupInfo.groups().length - 1].fields(availabelFields.map(x => x.name));
                }
            });
        });
        this.disposeObservableArray(this._groupInfos);
    }
    initialize(state) {
        this._reportTree = _fillTreeQueries([], state.masterDetailInfoCollection, 0).map(item => { return $.extend(true, {}, item); });
        const newGroups = this._reportTree.filter(x => x.fields.length > 0).map(x => new _GroupsFieldStore(x, this._onChange));
        this._mergeGroups(newGroups);
        this._groupInfos(newGroups);
        return $.Deferred().resolve().promise();
    }
    commit() {
        const masterDetailGroups = {};
        const masterDetailSummaryOptionsColumns = {};
        this._groupInfos().forEach(groupInfo => {
            const selectedFields = groupInfo.getSelectedFields();
            if (selectedFields.length > 0) {
                masterDetailGroups[groupInfo.path] = selectedFields;
            }
        });
        this._reportTree.forEach(query => {
            let availableFields = query.fields.filter(field => field.specifics && ['integer', 'float', 'date', 'bool'].indexOf(field.specifics.toLowerCase()) > -1);
            if (masterDetailGroups[query.path]) {
                availableFields = availableFields.filter(field => masterDetailGroups[query.path].some(items => items.indexOf(field.name) === -1));
            }
            if (availableFields.length > 0) {
                masterDetailSummaryOptionsColumns[query.path] = availableFields;
            }
        });
        return $.Deferred().resolve({
            masterDetailGroups: masterDetailGroups,
            masterDetailSummaryOptionsColumns: masterDetailSummaryOptionsColumns
        }).promise();
    }
}
export function _registerAddGroupFieldsPage(factory) {
    _registerAddGroupingLevelPage(factory);
    const meta = factory.getMetadata(ReportWizardPageId.AddGroupingLevelPage);
    meta.create = () => {
        return new AddGroupFieldsPage();
    };
    meta['disabledText'] = getLocalization('To add groups to the report, select data fields.', 'ASPxReportsStringId.ReportDesigner_Wizard_AddGroupFields_Placeholder');
    meta.template = 'dxrd-page-masterdetail-groups-section';
}
