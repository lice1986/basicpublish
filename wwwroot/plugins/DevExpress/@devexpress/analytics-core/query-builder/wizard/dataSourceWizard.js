﻿/**
* DevExpress Analytics (query-builder\wizard\dataSourceWizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { isEmptyObject } from '../../serializer/_utils';
import { _isMoreThanOneDataSourceTypeAvailable } from './internal/_utils';
import { PageFactory } from './pageFactory';
import { DataSourceWizardPageId, FederationDataSourceWizardPageId, JsonDataSourceWizardPageId, SqlDataSourceWizardPageId } from './pageId';
import { PageIterator } from './pageIterator';
import { DataSourceType, _registerChooseDataSourceTypePage } from './pages/chooseDataSourceTypePage';
import { _registerChooseSqlConnectionPage } from './pages/chooseSqlConnectionPage';
import { _registerChooseJsonConnectionPage } from './pages/jsonDataSourceWizard/chooseJsonConnectionPage';
import { _registerChooseJsonSchemaPage } from './pages/jsonDataSourceWizard/chooseJsonSchemaPage';
import { _registerChooseJsonSourcePage } from './pages/jsonDataSourceWizard/chooseJsonSourcePage';
import { _registerConfigureObjectDataSourceParametersPage } from './pages/objectDataSourceWizard/configureObjectDataSourceParametersPage';
import { _registerConfigureParametersPage } from './pages/sqlDataSourceWizard/configureParametersPage';
import { _registerConfigureQueryPage } from './pages/sqlDataSourceWizard/configureQueryPage';
import { PopupWizard } from './popupWizard';
export class _DataSourceWizardOptionsBase {
    constructor() {
        this.connectionStrings = {
            json: ko.observableArray([]),
            sql: ko.observableArray([])
        };
        this.callbacks = {};
        this.rtl = false;
        this.disableCustomSql = false;
        this.wizardSettings = new DataSourceWizardSettings().createDefault();
        this.allowCreateNewJsonConnection = false;
        this.predefinedDataSources = ko.observable([]);
    }
    get jsonDataSourceAvailable() {
        return this.wizardSettings.enableJsonDataSource && (this.allowCreateNewJsonConnection || (ko.unwrap(this.connectionStrings.json) || []).length > 0);
    }
    get sqlDataSourceAvailable() {
        return this.wizardSettings.enableSqlDataSource && (ko.unwrap(this.connectionStrings.sql) || []).length > 0;
    }
    get objectDataSourceAvailable() {
        return this.wizardSettings.enableObjectDataSource;
    }
    get canCreateDataSource() {
        return this.jsonDataSourceAvailable || this.sqlDataSourceAvailable || this.objectDataSourceAvailable;
    }
    get canRunWizard() {
        return this.canCreateDataSource || ko.unwrap(this.predefinedDataSources).length > 0;
    }
    get federationDataSourceAvailable() {
        return this.wizardSettings.enableFederationDataSource && this.dataSources && this.dataSources() && this.dataSources().length > 0;
    }
}
export class _DataSourceWizardOptions extends _DataSourceWizardOptionsBase {
}
export class DataSourceWizardSettings {
    createDefault(settings) {
        const newSettings = { enableJsonDataSource: true, enableSqlDataSource: true, enableObjectDataSource: true, enableFederationDataSource: true };
        if (!settings)
            return newSettings;
        if (settings.enableJsonDataSource !== undefined)
            newSettings.enableJsonDataSource = settings.enableJsonDataSource;
        if (settings.enableSqlDataSource !== undefined)
            newSettings.enableSqlDataSource = settings.enableSqlDataSource;
        if (settings.enableObjectDataSource != undefined)
            newSettings.enableObjectDataSource = settings.enableObjectDataSource;
        if (settings.enableFederationDataSource != undefined)
            newSettings.enableFederationDataSource = settings.enableFederationDataSource;
        return newSettings;
    }
}
export class DataSourceWizardPageIterator extends PageIterator {
    constructor(pageFactory, stateManager, _dataSourceWizardOptions) {
        super(pageFactory, stateManager);
        this._dataSourceWizardOptions = _dataSourceWizardOptions;
    }
    getNextPageId(pageId) {
        if (!pageId && _isMoreThanOneDataSourceTypeAvailable(this._dataSourceWizardOptions)) {
            return DataSourceWizardPageId.ChooseDataSourceTypePage;
        }
        else if (!pageId) {
            return this.getNextPageId(DataSourceWizardPageId.ChooseDataSourceTypePage);
        }
        else if (pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Sql) {
            return SqlDataSourceWizardPageId.ChooseConnectionPage;
        }
        else if (pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Federation) {
            return FederationDataSourceWizardPageId.FederatedQueryConfigurePage;
        }
        else if (pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Json && this._dataSourceWizardOptions.connectionStrings.json().length > 0) {
            return JsonDataSourceWizardPageId.ChooseConnectionPage;
        }
        else if (this._dataSourceWizardOptions.allowCreateNewJsonConnection && pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Json) {
            return JsonDataSourceWizardPageId.ChooseJsonSourcePage;
        }
        else if (pageId === JsonDataSourceWizardPageId.ChooseConnectionPage && this._getCurrentState().jsonDataSourceWizard.connectionName) {
            return JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
        }
        else if (this._dataSourceWizardOptions.allowCreateNewJsonConnection && pageId === JsonDataSourceWizardPageId.ChooseConnectionPage && !this._getCurrentState().jsonDataSourceWizard.connectionName) {
            return JsonDataSourceWizardPageId.ChooseJsonSourcePage;
        }
        else if (pageId === JsonDataSourceWizardPageId.ChooseJsonSourcePage) {
            return JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
        }
        else if (pageId === SqlDataSourceWizardPageId.ChooseConnectionPage && this._getCurrentState().sqlDataSourceWizard.name) {
            return SqlDataSourceWizardPageId.ConfigureQueryPage;
        }
        else if (pageId === SqlDataSourceWizardPageId.ConfigureQueryPage && this._getCurrentState().sqlDataSourceWizard.sqlDataSourceJSON) {
            return SqlDataSourceWizardPageId.ConfigureParametersPage;
        }
    }
}
export class DataSourceWizard extends PopupWizard {
    constructor(pageFactory, _wizardOptions) {
        super(pageFactory, _wizardOptions.callbacks.finishCallback);
        this._wizardOptions = _wizardOptions;
        this._extendCssClass = 'dxrd-sqldatasource-wizard';
        this.title = getLocalization('Data Source Wizard', 'AnalyticsCoreStringId.DSWizard_Title');
    }
    initialize(state, createIterator = (pageFactory, stateManager) => new DataSourceWizardPageIterator(pageFactory, stateManager, this._wizardOptions)) {
        if (this._wizardOptions.sqlDataSourceAvailable || !isEmptyObject(state.sqlDataSourceWizard)) {
            state.dataSourceType = DataSourceType.Sql;
        }
        else if (this._wizardOptions.jsonDataSourceAvailable || state.jsonDataSourceWizard.jsonSource) {
            state.dataSourceType = DataSourceType.Json;
        }
        super.initialize(state, createIterator);
    }
    canRunWizard() {
        return this._wizardOptions.jsonDataSourceAvailable || this._wizardOptions.sqlDataSourceAvailable;
    }
}
export function _registerDataSourceWizardPages(factory = new PageFactory(), dataSourceWizardOptions) {
    _registerChooseDataSourceTypePage(factory, dataSourceWizardOptions);
    _registerChooseJsonSourcePage(factory, dataSourceWizardOptions.requestWrapper, dataSourceWizardOptions.callbacks.getItemsProviderCallback);
    _registerChooseJsonConnectionPage(factory, dataSourceWizardOptions);
    _registerChooseJsonSchemaPage(factory, dataSourceWizardOptions.requestWrapper, dataSourceWizardOptions.callbacks);
    _registerConfigureObjectDataSourceParametersPage(factory, dataSourceWizardOptions.callbacks.getItemsProviderCallback);
    _registerConfigureQueryPage(factory, dataSourceWizardOptions);
    _registerChooseSqlConnectionPage(factory, dataSourceWizardOptions.connectionStrings.sql);
    _registerConfigureParametersPage(factory, dataSourceWizardOptions.requestWrapper);
    return factory;
}
export function _createDataSourceWizard(factory = new PageFactory(), dataSourceWizardOptions) {
    factory = _registerDataSourceWizardPages(factory, dataSourceWizardOptions);
    return new DataSourceWizard(factory, dataSourceWizardOptions);
}