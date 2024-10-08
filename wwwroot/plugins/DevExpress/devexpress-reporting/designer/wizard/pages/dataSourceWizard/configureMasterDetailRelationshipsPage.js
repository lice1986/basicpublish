﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\configureMasterDetailRelationshipsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ConfigureMasterDetailRelationshipsPage as ConfigureAnalyticMasterDetailRelationshipsPage, DataSourceWizardPageId, _restoreSqlDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import { DataSourceWizardHelper, overrideSqlDataSourceWizardPage } from './_dataSourceWizardHelper';
export class ConfigureMasterDetailRelationshipsPage extends ConfigureAnalyticMasterDetailRelationshipsPage {
    constructor(createSqlDataSourceInfo, sqlDataSourceResultSchema) {
        super(sqlDataSourceResultSchema);
        this._dataSourceWizardHelper = new DataSourceWizardHelper(this, createSqlDataSourceInfo);
    }
    initialize(state) {
        return super.initialize(state.sqlDataSourceWizard);
    }
    commit() {
        return this._dataSourceWizardHelper.commit(() => super.commit(), (state) => _restoreSqlDataSourceFromState(state).sqlDataSource);
    }
}
export function _registerConfigureMasterDetailRelationshipsPage(factory, callbacks) {
    overrideSqlDataSourceWizardPage(factory, DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage, {
        create: () => {
            return new ConfigureMasterDetailRelationshipsPage(callbacks.createSqlDataSourceInfo, callbacks.sqlDataSourceResultSchema);
        }
    });
}
