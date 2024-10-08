﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\multiQueryConfigurePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MultiQueryConfigurePage as AnalyticMultiQueryConfigurePage, SqlDataSourceWizardPageId, _canEditQueryParameters, _restoreSqlDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import { DataSourceWizardHelper, overrideSqlDataSourceWizardPage } from './_dataSourceWizardHelper';
export class MultiQueryConfigurePage extends AnalyticMultiQueryConfigurePage {
    constructor(reportWizardOptions) {
        super(reportWizardOptions);
        this._dataSourceWizardHelper = new DataSourceWizardHelper(this, reportWizardOptions.callbacks.createSqlDataSourceInfo);
    }
    _getQueriesCount() {
        return this['_dataSource']().queries().length;
    }
    _canEditQueryParameters() {
        return this['_dataSource']().queries().some(query => _canEditQueryParameters(query, this['_customQueries']()));
    }
    initialize(state) {
        return super.initialize(state.sqlDataSourceWizard);
    }
    commit() {
        return this._dataSourceWizardHelper.commit(() => super.commit(), (state) => _restoreSqlDataSourceFromState(state).sqlDataSource);
    }
}
export function _registerMultiQueryConfigurePage(factory, reportWizardOptions) {
    overrideSqlDataSourceWizardPage(factory, SqlDataSourceWizardPageId.MultiQueryConfigurePage, {
        create: () => {
            return new MultiQueryConfigurePage(reportWizardOptions);
        },
        resetState: (state) => {
            delete state.sqlDataSourceWizard.customQueries;
            delete state.sqlDataSourceWizard.sqlDataSourceJSON;
        }
    });
}
