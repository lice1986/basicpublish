﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\chooseJsonSchemaPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChooseJsonSchemaPage as ChooseAnalyticJsonSchemaPage, JsonDataSourceWizardPageId, _restoreJsonDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import { DataSourceWizardHelper, overrideJsonDataSourceWizardPage } from './_dataSourceWizardHelper';
export class ChooseJsonSchemaPage extends ChooseAnalyticJsonSchemaPage {
    constructor(createJsonDataSourceInfo) {
        super();
        this._dataSourceWizardHelper = new DataSourceWizardHelper(this, createJsonDataSourceInfo);
    }
    initialize(state) {
        this._dataSourceId = state.dataSourceId;
        return super.initialize(state.jsonDataSourceWizard);
    }
    commit() {
        return this._dataSourceWizardHelper.commit(() => super.commit(), (state) => _restoreJsonDataSourceFromState(state, undefined, this._dataSourceId));
    }
}
export function _registerChooseJsonSchemaPage(factory, callbacks) {
    overrideJsonDataSourceWizardPage(factory, JsonDataSourceWizardPageId.ChooseJsonSchemaPage, {
        create: () => {
            return new ChooseJsonSchemaPage(callbacks.createJsonDataSourceInfo);
        },
        resetState: (state) => {
            delete state.jsonDataSourceWizard.dataSourceName;
            delete state.jsonDataSourceWizard.jsonScheme;
            delete state.jsonDataSourceWizard.rootElement;
        }
    });
}
