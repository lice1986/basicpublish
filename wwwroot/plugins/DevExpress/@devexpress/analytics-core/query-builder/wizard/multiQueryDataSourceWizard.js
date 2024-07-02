﻿/**
* DevExpress Analytics (query-builder\wizard\multiQueryDataSourceWizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { isEmptyObject } from '../../serializer/_utils';
import { wrapGetFederationdResultSchema, wrapRebuildResultSchema } from '../utils/_requestwrapper';
import { _registerChooseAvailableDataSourcePage } from './chooseAvailableDataSourcePage';
import { _DataSourceWizardOptionsBase } from './dataSourceWizard';
import { _restoreFederationDataSourceFromState, _restoreSqlDataSourceFromState } from './dataSourceWizardState';
import { _registerSpecifyObjectDataSourceSettingsPage } from './fullscreen/pages/specifyObjectDataSourceSettingsPage';
import { _isMoreThanOneDataSourceTypeAvailable } from './internal/_utils';
import { PageFactory } from './pageFactory';
import { DataSourceWizardPageId, FederationDataSourceWizardPageId, JsonDataSourceWizardPageId, ObjectDataSourceWizardPageId, SqlDataSourceWizardPageId } from './pageId';
import { PageIterator } from './pageIterator';
import { DataSourceType, _registerChooseDataSourceTypePage } from './pages/chooseDataSourceTypePage';
import { _registerChooseSqlConnectionPage } from './pages/chooseSqlConnectionPage';
import { _registerFederatedMasterDetailRelationshipsPage } from './pages/federationDataSourceWizard/federatedMasterDetailRelationshipsPage';
import { _registerFederatedQueryConfigurePage } from './pages/federationDataSourceWizard/federatedQueryConfigurePage';
import { _registerChooseJsonConnectionPage } from './pages/jsonDataSourceWizard/chooseJsonConnectionPage';
import { _registerChooseJsonSchemaPage } from './pages/jsonDataSourceWizard/chooseJsonSchemaPage';
import { _registerChooseJsonSourcePage } from './pages/jsonDataSourceWizard/chooseJsonSourcePage';
import { _registerConfigureMasterDetailRelationshipsPage } from './pages/multiQueryWizard/configureMasterDetailRelationshipsPage';
import { _registerMultiQueryConfigurePage } from './pages/multiQueryWizard/multiQueryConfigurePage';
import { _registerMultiQueryConfigureParametersPage } from './pages/multiQueryWizard/multiQueryConfigureParametersPage';
import { _registerChooseObjectDataSourceDataMembersPage } from './pages/objectDataSourceWizard/chooseObjectDataSourceDataMembersPage';
import { _registerChooseObjectDataSourceTypesPage } from './pages/objectDataSourceWizard/chooseObjectDataSourceTypesPage';
import { _registerConfigureObjectDataSourceParametersPage } from './pages/objectDataSourceWizard/configureObjectDataSourceParametersPage';
import { PopupWizard } from './popupWizard';
export class _MultiQueryDataSourceWizardOptions extends _DataSourceWizardOptionsBase {
}
export class MultiQueryDataSourceWizard extends PopupWizard {
    constructor(pageFactory, _wizardOptions) {
        super(pageFactory, _wizardOptions.callbacks.finishCallback);
        this._wizardOptions = _wizardOptions;
        this.title = getLocalization('Data Source Wizard', 'AnalyticsCoreStringId.SqlDSWizard_Title');
        this._extendCssClass = 'dxrd-multiqueries-sqldatasource-wizard';
        this.height(443);
    }
    canRunWizard() {
        return this._wizardOptions.canRunWizard;
    }
    initialize(state, createIterator = (pageFactory, stateManager) => new MultiQueryDataSourceWizardPageIterator(pageFactory, stateManager, this._wizardOptions)) {
        if (this._wizardOptions.sqlDataSourceAvailable || !isEmptyObject(state.sqlDataSourceWizard)) {
            state.dataSourceType = DataSourceType.Sql;
        }
        else if (this._wizardOptions.jsonDataSourceAvailable || state.jsonDataSourceWizard.jsonSource) {
            state.dataSourceType = DataSourceType.Json;
        }
        else if (this._wizardOptions.objectDataSourceAvailable) {
            state.dataSourceType = DataSourceType.Object;
        }
        super.initialize(state, createIterator);
    }
}
export class MultiQueryDataSourceWizardPageIterator extends PageIterator {
    constructor(pagesFactory, stateManager, _wizardOptions) {
        super(pagesFactory, stateManager);
        this._wizardOptions = _wizardOptions;
    }
    getNextPageId(pageId) {
        if (!pageId && this._wizardOptions.predefinedDataSources().length > 0) {
            return DataSourceWizardPageId.ChoosePredefinedDataSourcePage;
        }
        else if ((!pageId || pageId === DataSourceWizardPageId.ChoosePredefinedDataSourcePage) && _isMoreThanOneDataSourceTypeAvailable(this._wizardOptions)) {
            return DataSourceWizardPageId.ChooseDataSourceTypePage;
        }
        else if (!pageId || pageId === DataSourceWizardPageId.ChoosePredefinedDataSourcePage) {
            return this.getNextPageId(DataSourceWizardPageId.ChooseDataSourceTypePage);
        }
        else if (pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Sql) {
            return SqlDataSourceWizardPageId.ChooseConnectionPage;
        }
        else if (pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Federation) {
            return FederationDataSourceWizardPageId.FederatedQueryConfigurePage;
        }
        else if (pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Object) {
            return ObjectDataSourceWizardPageId.ChooseTypesPage;
        }
        else if (pageId === ObjectDataSourceWizardPageId.ChooseTypesPage && this._getCurrentState().objectDataSourceWizard.selectedType) {
            return ObjectDataSourceWizardPageId.ChooseDataMembersPage;
        }
        else if (pageId === ObjectDataSourceWizardPageId.ChooseDataMembersPage) {
            return ObjectDataSourceWizardPageId.ConfigureParametersPage;
        }
        else if (pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Json && this._wizardOptions.connectionStrings.json().length > 0) {
            return JsonDataSourceWizardPageId.ChooseConnectionPage;
        }
        else if (this._wizardOptions.allowCreateNewJsonConnection && pageId === DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Json) {
            return JsonDataSourceWizardPageId.ChooseJsonSourcePage;
        }
        else if (pageId === JsonDataSourceWizardPageId.ChooseConnectionPage && this._getCurrentState().jsonDataSourceWizard.connectionName) {
            return JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
        }
        else if (this._wizardOptions.allowCreateNewJsonConnection && pageId === JsonDataSourceWizardPageId.ChooseConnectionPage && !this._getCurrentState().jsonDataSourceWizard.connectionName) {
            return JsonDataSourceWizardPageId.ChooseJsonSourcePage;
        }
        else if (pageId === JsonDataSourceWizardPageId.ChooseJsonSourcePage) {
            return JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
        }
        else if (pageId === SqlDataSourceWizardPageId.ChooseConnectionPage && this._getCurrentState().sqlDataSourceWizard.name) {
            return SqlDataSourceWizardPageId.MultiQueryConfigurePage;
        }
        else if (this._getCurrentState().sqlDataSourceWizard.sqlDataSourceJSON && pageId === SqlDataSourceWizardPageId.MultiQueryConfigurePage && this._getCurrentState().sqlDataSourceWizard.customQueries.length > 0) {
            return SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage;
        }
        else if (pageId === SqlDataSourceWizardPageId.MultiQueryConfigurePage || pageId === SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage) {
            const sqlDataSourceWrapped = _restoreSqlDataSourceFromState(this._getCurrentState().sqlDataSourceWizard);
            if (sqlDataSourceWrapped.sqlDataSource.queries().length > 1) {
                return DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage;
            }
        }
        else if (pageId === FederationDataSourceWizardPageId.FederatedQueryConfigurePage) {
            const federationDataSource = _restoreFederationDataSourceFromState(this._getCurrentState().federationDataSourceWizard, this._wizardOptions.dataSources);
            if (federationDataSource.queries().length > 1) {
                return FederationDataSourceWizardPageId.FederatedMasterDetailRelationshipsPage;
            }
        }
    }
}
export function _registerMultiQueryDataSourcePages(factory = new PageFactory(), dataSourceWizardOptions) {
    _registerChooseAvailableDataSourcePage(factory, dataSourceWizardOptions);
    _registerChooseDataSourceTypePage(factory, dataSourceWizardOptions);
    _registerChooseJsonConnectionPage(factory, dataSourceWizardOptions);
    _registerChooseJsonSourcePage(factory, dataSourceWizardOptions.requestWrapper, dataSourceWizardOptions.callbacks.getItemsProviderCallback);
    _registerChooseJsonSchemaPage(factory, dataSourceWizardOptions.requestWrapper, dataSourceWizardOptions.callbacks);
    _registerChooseSqlConnectionPage(factory, dataSourceWizardOptions.connectionStrings.sql, dataSourceWizardOptions.getSqlConnectionStrings);
    _registerSpecifyObjectDataSourceSettingsPage(factory, dataSourceWizardOptions);
    _registerFederatedQueryConfigurePage(factory, dataSourceWizardOptions);
    _registerFederatedMasterDetailRelationshipsPage(factory, wrapGetFederationdResultSchema(dataSourceWizardOptions.callbacks.federationDataSourceResultSchema), dataSourceWizardOptions);
    _registerMultiQueryConfigurePage(factory, dataSourceWizardOptions);
    _registerMultiQueryConfigureParametersPage(factory, dataSourceWizardOptions.requestWrapper);
    _registerConfigureMasterDetailRelationshipsPage(factory, wrapRebuildResultSchema(dataSourceWizardOptions.callbacks.sqlDataSourceResultSchema));
    _registerChooseObjectDataSourceTypesPage(factory, dataSourceWizardOptions);
    _registerChooseObjectDataSourceDataMembersPage(factory, dataSourceWizardOptions);
    _registerConfigureObjectDataSourceParametersPage(factory, dataSourceWizardOptions.callbacks.getItemsProviderCallback);
    return factory;
}
export function _createMultiQueryDataSourceWizard(factory = new PageFactory(), dataSourceWizardOptions) {
    _registerMultiQueryDataSourcePages(factory, dataSourceWizardOptions);
    return new MultiQueryDataSourceWizard(factory, dataSourceWizardOptions);
}
