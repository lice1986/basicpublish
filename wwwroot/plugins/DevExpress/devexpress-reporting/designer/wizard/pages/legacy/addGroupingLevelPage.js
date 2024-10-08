﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\addGroupingLevelPage.js)
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
import { LegacyReportWizardPageId } from '../../pageId';
import { ListViewModel } from '../../_utils';
export class LegacyAddGroupingLevelPage extends WizardPageBase {
    constructor() {
        super(...arguments);
        this.fields = new ListViewModel(getLocalization('Available fields', 'ASPxReportsStringId.ReportDesigner_Wizard_AvailableFields'));
        this.groups = new ListViewModel(getLocalization('Groups', 'ASPxReportsStringId.ReportDesigner_Groups'));
        this.addNewGroup = () => {
            if (this.isCreateGroupEnabled()) {
                this.groups.add({ fields: ko.observableArray([this.fields.activeItem]) });
                this.fields.removeActiveItem();
            }
        };
        this.appendFieldsToGroup = () => {
            if (this.isAppendToGroupEnabled()) {
                this.groups.activeItem.fields.push(this.fields.activeItem);
                this.fields.removeActiveItem();
            }
        };
        this.removeGroup = () => {
            if (this.isRemoveGroupEnabled()) {
                this.fields.addRange(this.groups.activeItem.fields());
                this.groups.removeActiveItem();
            }
        };
        this.moveUp = () => {
            this.groups.moveUp();
        };
        this.moveDown = () => {
            this.groups.moveDown();
        };
        this.fieldDblClick = (field) => {
            this.fields.activeItem = field;
            this.addNewGroup();
        };
        this.fieldClick = (e) => {
            this.fields.activeItem = e.itemData;
        };
        this.groupDblClick = (group) => {
            this.groups.activeItem = group;
            this.removeGroup();
        };
        this.groupClick = (e) => {
            this.groups.activeItem = e.itemData;
        };
    }
    canFinish() {
        return true;
    }
    isCreateGroupEnabled() {
        return !!this.fields.activeItem;
    }
    isAppendToGroupEnabled() {
        return this.fields.activeItem && this.groups.activeItem && this.groups.activeItem.fields().length > 0;
    }
    isRemoveGroupEnabled() {
        return this.groups.activeItem && this.groups.activeItem.fields().length > 0;
    }
    isMoveUpEnabled() {
        return this.groups.isMoveUpEnabled();
    }
    isMoveDownEnabled() {
        return this.groups.isMoveDownEnabled();
    }
    initialize(state) {
        this.initialFields = state.fields || [];
        const fields = ko.observableArray((state.fields || []).map((value, index, array) => { return value.displayName; }));
        this.groups.setItems((state.groups || []).map((value) => {
            fields.removeAll(value);
            return { fields: ko.observableArray(value) };
        }));
        this.fields.setItems(fields());
        return $.Deferred().resolve().promise();
    }
    commit() {
        const groups = this.groups.items.map((item) => {
            return item.fields();
        });
        const summaryColumns = [];
        if (!this.groups.isEmpty) {
            this.fields.items.forEach((fieldName) => {
                const field = getFirstItemByPropertyValue(this.initialFields, 'displayName', fieldName);
                if (field.specifics && ['integer', 'float', 'date'].indexOf(field.specifics.toLowerCase()) > -1) {
                    summaryColumns.push(field);
                }
            });
            summaryColumns.sort((a, b) => { return a.name.localeCompare(b.name); });
        }
        return $.Deferred().resolve({
            groups: groups,
            summaryOptionsColumns: summaryColumns
        }).promise();
    }
}
export function _registerLegacyAddGroupingLevelPage(factory) {
    factory.registerMetadata(LegacyReportWizardPageId.AddGroupingLevelPage, {
        setState: (data, state) => {
            state.groups = data.groups;
            state.summaryOptionsColumns = data.summaryOptionsColumns;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.groups = defaultState.groups;
            state.summaryOptionsColumns = defaultState.summaryOptionsColumns;
        },
        create: () => {
            return new LegacyAddGroupingLevelPage();
        },
        template: 'dxrd-page-groups',
        description: getLocalization('Create multiple groups, each with a single field value, or define several fields in the same group.', 'ASPxReportsStringId.ReportDesigner_Wizard_CreateGroups')
    });
}
