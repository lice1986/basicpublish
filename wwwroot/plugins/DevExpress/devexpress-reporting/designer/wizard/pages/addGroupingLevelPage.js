﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\addGroupingLevelPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFirstItemByPropertyValue } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ReportWizardPageId } from '../pageId';
import { ListViewModel } from '../_utils';
export function _fillTreeQueries(reportTree, queries, level, parentDisplayName) {
    const lvl = level;
    queries.forEach(query => {
        if (query.checked !== false) {
            const fields = query.fields.filter(field => field.checked).map((value => { return { name: value.name, displayName: value.displayName, specifics: value.specifics }; }));
            const name = query.displayName || query.name;
            const displayName = parentDisplayName ? [parentDisplayName, name].join('.') : name;
            reportTree.push({
                name: name,
                displayName: displayName,
                path: query.path,
                fields: fields,
                isList: true,
                level: level
            });
            if (query.relations.length > 0) {
                const newLvl = lvl + 1;
                _fillTreeQueries(reportTree, query.relations, newLvl, displayName);
            }
        }
    });
    return reportTree;
}
export class AddGroupingLevelPage extends WizardPageBase {
    constructor() {
        super();
        this._availableColumns = {};
        this._groupingLevels = {};
        this._masterDetailGroups = {};
        this._addNewGroup = () => {
            if (this._isCreateGroupEnabled()) {
                this._currentGroups().add({ fields: ko.observableArray([this._currentFields().activeItem]) });
                this._currentFields().removeActiveItem();
                this._onChange();
            }
        };
        this._appendFieldsToGroup = () => {
            if (this._isAppendToGroupEnabled()) {
                this._currentGroups().activeItem.fields.push(this._currentFields().activeItem);
                this._currentFields().removeActiveItem();
                this._onChange();
            }
        };
        this._removeGroup = () => {
            if (this._isRemoveGroupEnabled()) {
                this._currentFields().addRange(this._currentGroups().activeItem.fields());
                this._currentGroups().removeActiveItem();
                this._onChange();
            }
        };
        this._moveUp = () => {
            !!this._currentGroups() && this._currentGroups().moveUp();
            this._onChange();
        };
        this._moveDown = () => {
            !!this._currentGroups() && this._currentGroups().moveDown();
            this._onChange();
        };
        this._fieldDblClick = (field) => {
            this._currentFields().activeItem = field;
            this._addNewGroup();
        };
        this._fieldClick = (e) => {
            this._currentFields().activeItem = e.itemData;
        };
        this._groupDblClick = (group) => {
            this._currentGroups().activeItem = group;
            this._removeGroup();
        };
        this._groupClick = (e) => {
            this._currentGroups().activeItem = e.itemData;
        };
        this._currentPath = ko.observable('');
        this._currentFields = ko.observable(null);
        this._currentGroups = ko.observable(null);
        this._fieldCaption = getLocalization('Available fields', 'ASPxReportsStringId.ReportDesigner_Wizard_AvailableFields');
        this._groupCaption = getLocalization('Groups', 'ASPxReportsStringId.ReportDesigner_Groups');
        this._reportTree = ko.observableArray([]);
        this._disposables.push(this._currentPath.subscribe(newPath => {
            this._currentGroups(this._groupingLevels[newPath]);
            this._currentFields(this._availableColumns[newPath]);
        }));
    }
    _setData(queries) {
        queries.forEach(query => {
            if (!this._groupingLevels[query.path] || !this._availableColumns[query.path]) {
                this._availableColumns[query.path] = new ListViewModel();
                this._groupingLevels[query.path] = new ListViewModel();
            }
            if (!this._masterDetailGroups[query.path]) {
                this._masterDetailGroups[query.path] = [];
            }
            const fields = ko.observableArray(query.fields.map(value => value.displayName));
            this._groupingLevels[query.path].setItems(this._masterDetailGroups[query.path].map((value) => {
                fields.removeAll(value);
                return { fields: ko.observableArray(value) };
            }));
            this._availableColumns[query.path].setItems(fields());
        });
    }
    canFinish() {
        return true;
    }
    _isCreateGroupEnabled() {
        return !!this._currentFields() && !!this._currentFields().activeItem;
    }
    _isAppendToGroupEnabled() {
        return !!this._currentFields() && this._currentFields().activeItem && !!this._currentGroups() && this._currentGroups().activeItem && this._currentGroups().activeItem.fields().length > 0;
    }
    _isRemoveGroupEnabled() {
        return !!this._currentGroups() && this._currentGroups().activeItem && this._currentGroups().activeItem.fields().length > 0;
    }
    _isMoveUpEnabled() {
        return !!this._currentGroups() && this._currentGroups().isMoveUpEnabled();
    }
    _isMoveDownEnabled() {
        return !!this._currentGroups() && this._currentGroups().isMoveDownEnabled();
    }
    initialize(state) {
        this._reportTree(_fillTreeQueries([], state.masterDetailInfoCollection, 0).map(item => { return $.extend(true, {}, item); }));
        this._masterDetailGroups = $.extend(true, {}, state.masterDetailGroups);
        const firstPath = this._reportTree()[0] && this._reportTree()[0].path;
        if (firstPath) {
            this._setData(this._reportTree());
            this._currentPath(firstPath);
            if (firstPath === this._currentPath.peek())
                this._currentPath.notifySubscribers(firstPath);
        }
        return $.Deferred().resolve().promise();
    }
    commit() {
        const masterDetailGroups = {};
        const masterDetailSummaryOptionsColumns = {};
        this._reportTree().forEach(query => {
            if (this._groupingLevels[query.path].items.length > 0) {
                masterDetailGroups[query.path] = this._groupingLevels[query.path].items.map((item) => {
                    return item.fields().map(displayName => getFirstItemByPropertyValue(query.fields, 'displayName', displayName).name);
                });
            }
            if (this._availableColumns[query.path]) {
                const summaryColumns = [];
                masterDetailSummaryOptionsColumns[query.path] = [];
                this._availableColumns[query.path].items.forEach((fieldName) => {
                    const field = getFirstItemByPropertyValue(query.fields, 'displayName', fieldName);
                    if (field.specifics && ['integer', 'float', 'date'].indexOf(field.specifics.toLowerCase()) > -1) {
                        summaryColumns.push(field);
                    }
                });
                summaryColumns.sort((a, b) => { return a.name.localeCompare(b.name); });
                if (summaryColumns.length === 0)
                    delete masterDetailSummaryOptionsColumns[query.path];
                else
                    masterDetailSummaryOptionsColumns[query.path] = summaryColumns;
            }
        });
        return $.Deferred().resolve({
            masterDetailGroups: masterDetailGroups,
            masterDetailSummaryOptionsColumns: masterDetailSummaryOptionsColumns
        }).promise();
    }
}
export function _registerAddGroupingLevelPage(factory) {
    factory.registerMetadata(ReportWizardPageId.AddGroupingLevelPage, {
        create: () => {
            return new AddGroupingLevelPage();
        },
        getState: (state) => state,
        setState: (data, state) => {
            state.masterDetailGroups = data.masterDetailGroups;
            state.masterDetailSummaryOptionsColumns = data.masterDetailSummaryOptionsColumns;
        },
        description: getLocalization('Group data in the selected reports. You can specify one or more fields for each group.', 'ReportBoxDesignerStringId.Wizard_MasterDetailAddGroupingLevel_Description'),
        template: 'dxrd-page-masterdetail-groups',
        resetState: (state, defaultState) => {
            state.masterDetailGroups = defaultState.masterDetailGroups;
            state.masterDetailSummaryOptionsColumns = defaultState.masterDetailSummaryOptionsColumns;
        }
    });
}
