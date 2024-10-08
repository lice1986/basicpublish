﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\selectColumnsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { LegacyReportWizardPageId } from '../../pageId';
import { ListViewModel } from '../../_utils';
import { _restoreDataSourceFromState } from '../chooseAvailableDataSourcePage';
export class LegacySelectColumnsPage extends WizardPageBase {
    constructor(getFieldListItems) {
        super();
        this._selectedPath = null;
        this._fields = [];
        this.select = () => {
            this.selectedFields.add(this.availableFields.activeItem);
            this.availableFields.removeActiveItem();
        };
        this.selectAll = () => {
            this.selectedFields.setItems(this._fields.slice(0));
            this.availableFields.removeAll();
        };
        this.unselect = () => {
            this.availableFields.add(this.selectedFields.activeItem);
            this.selectedFields.removeActiveItem();
        };
        this.unselectAll = () => {
            this.availableFields.setItems(this._fields.slice(0));
            this.selectedFields.removeAll();
        };
        this.availableFieldDblClick = (field) => {
            this.availableFields.activeItem = field;
            this.select();
        };
        this.availableFieldClick = (e) => {
            this.availableFields.activeItem = e.itemData;
        };
        this.selectedFieldDblClick = (field) => {
            this.selectedFields.activeItem = field;
            this.unselect();
        };
        this.selectedFieldClick = (e) => {
            this.selectedFields.activeItem = e.itemData;
        };
        this.availableFields = new ListViewModel(getLocalization('Available fields', 'ASPxReportsStringId.ReportDesigner_Wizard_AvailableFields'));
        this.selectedFields = new ListViewModel(getLocalization('Selected fields', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectedFields'));
        this._fieldListsCallback = getFieldListItems;
    }
    canFinish() {
        return true;
    }
    canNext() {
        return !this.selectedFields.isEmpty;
    }
    selectedPath() {
        return this._selectedPath;
    }
    reset() {
        this._selectedPath = null;
    }
    initialize(state) {
        this.selectedFields.setItems(state.fields || []);
        if (this._selectedPath != state.dataMemberPath) {
            return this._fieldListsCallback(new PathRequest(state.dataMemberPath), _restoreDataSourceFromState(state.newDataSource || state.dataSource))
                .done((fields) => {
                this._fields = fields.filter((item) => {
                    return (item.specifics !== 'List' && item.specifics !== 'ListSource' && item.isList !== true);
                });
                this._selectedPath = state.dataMemberPath;
                this.availableFields.setItems(this._fields.filter((value) => {
                    return this.selectedFields.items.indexOf(value) === -1;
                }));
            });
        }
        else {
            this.availableFields.setItems(this._fields.filter((value) => {
                return this.selectedFields.items.indexOf(value) === -1;
            }));
            return $.Deferred().resolve().promise();
        }
    }
    commit() {
        return $.Deferred().resolve({
            fields: this.selectedFields.items
        }).promise();
    }
    isSelectEnable() {
        return !!this.availableFields.activeItem;
    }
    isUnselectEnable() {
        return !!this.selectedFields.activeItem;
    }
}
export function _registerLegacySelectColumnsPage(factory, fieldListItemsCallback) {
    factory.registerMetadata(LegacyReportWizardPageId.SelectColumnsPage, {
        setState: (data, state) => {
            state.fields = data.fields;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.fields = defaultState.fields;
        },
        create: () => {
            return new LegacySelectColumnsPage(fieldListItemsCallback);
        },
        template: 'dxrd-page-columns',
        description: getLocalization('Select the columns you want to display within your report.', 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseColumns')
    });
}
