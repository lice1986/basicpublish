﻿/**
* DevExpress Analytics (query-builder\wizard\chooseAvailableDataSourcePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { getLocalization } from '../../property-grid/localization/_localization';
import { ChooseAvailableItemPage } from './chooseAvailablePage';
import { DataSourceWizardPageId } from './pageId';
export class ChooseAvailableDataSourcePage extends ChooseAvailableItemPage {
    commit() {
        return $.Deferred().resolve({
            predefinedDataSourceName: this.selectedOperation().createNew ? null : this.selectedItems()[0].name
        }).promise();
    }
    _getSelectedItem(state) {
        const availableDataSources = this.items() || [];
        if (state.predefinedDataSourceName) {
            return availableDataSources.filter(x => x.name === state.predefinedDataSourceName)[0];
        }
        else if (availableDataSources.length === 0) {
            return null;
        }
        else {
            return availableDataSources[0];
        }
    }
    canNext() {
        return this.selectedOperation().createNew;
    }
    canFinish() {
        return !this.selectedOperation().createNew;
    }
}
export function _registerChooseAvailableDataSourcePage(factory, wizardOptions) {
    factory.registerMetadata(DataSourceWizardPageId.ChoosePredefinedDataSourcePage, {
        setState: (data, state) => {
            state.predefinedDataSourceName = data.predefinedDataSourceName;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.predefinedDataSourceName = null;
        },
        create: () => {
            return new ChooseAvailableDataSourcePage(wizardOptions.predefinedDataSources, wizardOptions.canCreateDataSource);
        },
        alwaysShowTitle: true,
        template: 'dxrd-page-selectitems',
        description: getLocalization('Do you want to use an existing data source?', 'AnalyticsCoreStringId.Wizard_UseExisting_DataSource') + ' ' +
            getLocalization('The Wizard assigns the selected or a newly created data source to the report.', 'AnalyticsCoreStringId.Wizard_DataSourceAssignment_Description')
    });
}
