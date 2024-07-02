﻿/**
* DevExpress Analytics (query-builder\wizard\pageId.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const DataSourceWizardPageId = {
    ChoosePredefinedDataSourcePage: 'choosePredefinedDataSourcePage',
    ChooseDataSourceTypePage: 'chooseDataSourceTypePage',
    ConfigureMasterDetailRelationshipsPage: 'configureMasterDetailRelationshipsPage'
};
export const SqlDataSourceWizardPageId = {
    ChooseConnectionPage: 'chooseSqlConnectionPage',
    ConfigureQueryPage: 'configureSqlQueryPage',
    ConfigureParametersPage: 'configureSqlParametersPage',
    MultiQueryConfigurePage: 'multiSqlQueryConfigurePage',
    MultiQueryConfigureParametersPage: 'multiSqlQueryConfigureParametersPage',
    FederatedQueryConfigurePage: 'federatedQueryConfigurePage'
};
export const FederationDataSourceWizardPageId = {
    FederatedQueryConfigurePage: 'federatedQueryConfigurePage',
    FederatedMasterDetailRelationshipsPage: 'federatedMasterDetailRelationshipsPage'
};
export const JsonDataSourceWizardPageId = {
    ChooseJsonSourcePage: 'chooseJsonSourcePage',
    ChooseJsonSchemaPage: 'chooseJsonSchemaPage',
    ChooseConnectionPage: 'chooseJsonConnectionPage',
    SpecifyJsonConnectionPage: 'specifyJsonConnectionPage'
};
export const ObjectDataSourceWizardPageId = {
    ChooseTypesPage: 'chooseObjectDataSourceTypesPage',
    ChooseDataMembersPage: 'chooseObjectDataSourceDataMembersPage',
    ConfigureParametersPage: 'configureObjectDataSourceParametersPage'
};
export const FullscreenDataSourceWizardPageId = {
    ChooseDataSourceTypePage: DataSourceWizardPageId.ChooseDataSourceTypePage,
    SpecifySqlDataSourceSettingsPage: 'specifySqlDataSourceSettingsPage',
    SpecifyJsonDataSourceSettingsPage: 'specifyJsonDataSourceSettingsPage',
    SpecifyObjectDataSourceSettingsPage: 'specifyObjectDataSourceSettingsPage',
    SpecifyFederationDataSourceSettingsPage: 'specifyFederationDataSourceSettingsPage',
    SelectDataSourcePage: 'selectDataSourcePage'
};
export const FullscreenDataSourceWizardSectionId = {
    SpecifyJsonConnectionPage: JsonDataSourceWizardPageId.SpecifyJsonConnectionPage,
    ChooseJsonSchemaPage: JsonDataSourceWizardPageId.ChooseJsonSchemaPage,
    ChooseJsonSourcePage: JsonDataSourceWizardPageId.ChooseJsonSourcePage,
    ChooseSqlConnectionPage: SqlDataSourceWizardPageId.ChooseConnectionPage,
    ConfigureFederatedQueriesPage: FederationDataSourceWizardPageId.FederatedQueryConfigurePage,
    ConfigureFederatedMasterDetailRelationshipsPage: FederationDataSourceWizardPageId.FederatedMasterDetailRelationshipsPage,
    ConfigureQueryPage: SqlDataSourceWizardPageId.MultiQueryConfigurePage,
    ConfigureQueryParametersPage: SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage,
    ConfigureMasterDetailRelationshipsPage: DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage
};