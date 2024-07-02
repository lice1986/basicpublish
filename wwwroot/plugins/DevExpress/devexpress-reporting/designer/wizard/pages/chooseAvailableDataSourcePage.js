﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseAvailableDataSourcePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ChooseAvailableItemPage } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { DataFederationDataSource, SerializableDataFederationDataSource } from '../../dataObjects/dataFederation';
import { createNewObjectItem } from '../../dataObjects/objectItemCreation';
import { ReportWizardPageId } from '../pageId';
export function _convertToStateDataSource(dataSource) {
    let objStorageItem;
    if (dataSource.data instanceof DataFederationDataSource) {
        objStorageItem = dataSource.data.getSerializableModel().serialize();
    }
    else {
        objStorageItem = new ModelSerializer().serialize(dataSource.data);
    }
    return JSON.stringify($.extend(true, {}, dataSource, { data: JSON.stringify(objStorageItem) }));
}
export function _restoreDataSourceFromState(serializedDataSource) {
    const dataSource = JSON.parse(serializedDataSource);
    if (dataSource) {
        const parsedData = JSON.parse(dataSource.data);
        if (parsedData.dataSources) {
            const serializableModel = new SerializableDataFederationDataSource(null, parsedData);
            dataSource.data = serializableModel.dataSource;
            serializableModel.dispose();
        }
        else {
            dataSource.data = createNewObjectItem(JSON.parse(dataSource.data));
        }
    }
    return dataSource;
}
export class ChooseAvailableDataSourcePage extends ChooseAvailableItemPage {
    commit() {
        return $.Deferred().resolve({
            sqlDataSourceWizard: {},
            jsonDataSourceWizard: {},
            dataSource: this.selectedOperation().createNew ? null : _convertToStateDataSource(this.selectedItems()[0])
        }).promise();
    }
    _getSelectedItem(state) {
        const availableDataSources = this.items() || [];
        if (state.dataSource) {
            const dataSource = _restoreDataSourceFromState(state.dataSource);
            return availableDataSources.filter(x => x.id === dataSource.id || x.ref === dataSource.ref)[0];
        }
        else if (availableDataSources.length === 0) {
            return null;
        }
        else {
            return availableDataSources[0];
        }
    }
    get createNewOperationText() {
        return getLocalization("No, I'd like to create a new data source", 'AnalyticsCoreStringId.Wizard_CreateNewDataSource');
    }
}
export function _registerChooseAvailableDataSourcePage(factory, reportWizardOptions) {
    factory.registerMetadata(ReportWizardPageId.ChooseAvailableDataSourcePage, {
        setState: (data, state) => {
            state.dataSource = data.dataSource;
            state.sqlDataSourceWizard = data.sqlDataSourceWizard;
            state.jsonDataSourceWizard = data.jsonDataSourceWizard;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.sqlDataSourceWizard = defaultState.sqlDataSourceWizard;
            state.jsonDataSourceWizard = defaultState.jsonDataSourceWizard;
            state.dataSource = defaultState.dataSource;
        },
        create: () => {
            return new ChooseAvailableDataSourcePage(reportWizardOptions.dataSources, reportWizardOptions.canCreateDataSource);
        },
        template: 'dxrd-page-selectitems',
        description: getLocalization('Do you want to use an existing data source?', 'AnalyticsCoreStringId.Wizard_UseExisting_DataSource')
    });
}
