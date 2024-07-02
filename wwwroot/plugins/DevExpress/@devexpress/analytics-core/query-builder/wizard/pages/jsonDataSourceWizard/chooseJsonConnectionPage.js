﻿/**
* DevExpress Analytics (query-builder\wizard\pages\jsonDataSourceWizard\chooseJsonConnectionPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { getFirstItemByPropertyValue } from '../../../../core/utils/_arrayutils';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { ChooseAvailableItemPage } from '../../chooseAvailablePage';
import { JsonDataSourceWizardPageId } from '../../pageId';
export class ChooseJsonConnectionPage extends ChooseAvailableItemPage {
    commit() {
        return $.Deferred().resolve({
            connectionName: !this.selectedOperation().createNew ? this.selectedItems()[0].name : null
        }).promise();
    }
    _getSelectedItem(data) {
        return getFirstItemByPropertyValue(this.items(), 'name', data.connectionName) || super._getSelectedItem();
    }
    get createNewOperationText() {
        return getLocalization("No, I'd like to create a new data connection", 'AnalyticsCoreStringId.JsonDSWizard_CreateNewConnection');
    }
    get existingOperationText() {
        return getLocalization('Yes, let me choose an existing data connection from the list', 'AnalyticsCoreStringId.JsonDSWizard_UseExistingConnection');
    }
}
export function _registerChooseJsonConnectionPage(factory, wizardOptions) {
    factory.registerMetadata(JsonDataSourceWizardPageId.ChooseConnectionPage, {
        create: () => {
            return new ChooseJsonConnectionPage(wizardOptions.connectionStrings && wizardOptions.connectionStrings.json, wizardOptions.allowCreateNewJsonConnection, wizardOptions.getJsonConnectionStrings);
        },
        description: wizardOptions.allowCreateNewJsonConnection ?
            getLocalization('Do you want to use an existing data connection?', 'AnalyticsCoreStringId.JsonDSWizard_ChooseConnection_Description') :
            getLocalization('Choose a data connection.', 'AnalyticsCoreStringId.SqlDSWizard_PageChooseConnection'),
        getState: (state) => state.jsonDataSourceWizard,
        setState: (data, state) => state.connectionName = data.connectionName,
        resetState: (state, defaultState) => {
            state.connectionName = defaultState.connectionName;
        },
        template: 'dxrd-page-selectitems'
    });
}
