﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\multiQueryConfigureParametersPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MultiQueryConfigureParametersPage as AnalyticMultiQueryConfigureParametersPage, SqlDataSourceWizardPageId, _restoreSqlDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import { QBRequestWrapper } from '../../../tools/generator/_qBRequestWrapper';
import { DataSourceWizardHelper, overrideSqlDataSourceWizardPage } from './_dataSourceWizardHelper';
export class MultiQueryConfigureParametersPage extends AnalyticMultiQueryConfigureParametersPage {
    constructor(createSqlDataSourceInfo, parametersConverters, requestWrapper) {
        super(parametersConverters, requestWrapper);
        this.createSqlDataSourceInfo = createSqlDataSourceInfo;
        this._dataSourceWizardHelper = new DataSourceWizardHelper(this, createSqlDataSourceInfo);
    }
    initialize(state) {
        return super.initialize(state.sqlDataSourceWizard);
    }
    commit() {
        return this._dataSourceWizardHelper.commit(() => super.commit(), (state) => _restoreSqlDataSourceFromState(state).sqlDataSource);
    }
}
export function _registerMultiQueryConfigureParametersPage(factory, callbacks) {
    overrideSqlDataSourceWizardPage(factory, SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage, {
        create: () => {
            return new MultiQueryConfigureParametersPage(callbacks.createSqlDataSourceInfo, undefined, QBRequestWrapper);
        }
    });
}
