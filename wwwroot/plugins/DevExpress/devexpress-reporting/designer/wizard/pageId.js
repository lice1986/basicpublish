﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pageId.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FullscreenDataSourceWizardPageId, FullscreenDataSourceWizardSectionId } from '@devexpress/analytics-core/analytics-wizard';
export const LegacyReportWizardPageId = {
    ChooseDataMemberPage: 'chooseDataMemberPage',
    SelectColumnsPage: 'selectColumnsPage',
    AddGroupingLevelPage: 'addGroupingLevelPage',
    ChooseSummaryOptionsPage: 'chooseSummaryOptionsPage',
    ChooseReportLayoutPage: 'chooseReportLayoutPage',
    ChooseReportStylePage: 'chooseReportStylePage'
};
export const ReportWizardPageId = {
    SelectReportTypePage: 'selectReportTypePage',
    ChooseAvailableDataSourcePage: 'chooseAvailableDataSourcePage',
    SelectLabelTypePage: 'selectLabelTypePage',
    CustomizeLabelPage: 'customizeLabelPage',
    SelectDataMembersPage: 'selectDataMembersPage',
    AddGroupingLevelPage: 'addGroupingLevelPage',
    ChooseSummaryOptionsPage: 'chooseSummaryOptionsPage',
    ConfigureReportPageSettingsPage: 'configureReportPageSettingsPage',
    ChooseReportColorSchemePage: 'chooseReportColorSchemePage',
    SetReportTitlePage: 'setReportTitlePage',
};
export const FullscreenReportWizardPageId = {
    SelectReportTypePage: ReportWizardPageId.SelectReportTypePage,
    SelectDataSourcePage: FullscreenDataSourceWizardPageId.SelectDataSourcePage,
    SpecifySqlDataSourceSettingsPage: FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage,
    SpecifyJsonDataSourceSettingsPage: FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage,
    DefineReportLayoutPage: 'defineReportLayoutPage',
    DefineCrossTabPage: 'defineCrossTabPage',
    SpecifyPageSettingsPage: 'specifyPageSettingsPage',
    SpecifyLabelSettingsPage: 'specifyLabelSettingsPage',
};
export const FullscreenReportWizardSectionId = {
    ChooseAvailableDataSourcePage: ReportWizardPageId.ChooseAvailableDataSourcePage,
    SelectLabelTypePage: ReportWizardPageId.SelectLabelTypePage,
    CustomizeLabelPage: ReportWizardPageId.CustomizeLabelPage,
    SelectDataMembersPage_Members: 'selectDataMembersPage_Members',
    SelectDataMembersPage_Fields: 'selectDataMembersPage_Fields',
    SelectSingleDataMemberPage: 'selectSingleDataMembersPage',
    AddGroupFieldsPage: ReportWizardPageId.AddGroupingLevelPage,
    AddSummaryFieldsPage: ReportWizardPageId.ChooseSummaryOptionsPage,
    ConfigurePageSettingsPage: ReportWizardPageId.ConfigureReportPageSettingsPage,
    SpecifyReportTitlePage: ReportWizardPageId.SetReportTitlePage,
    ChooseDataSourceTypePage: FullscreenDataSourceWizardPageId.ChooseDataSourceTypePage,
    ChooseJsonSchemaPage: FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage,
    SpecifyJsonConnectionPage: FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage,
    ConfigureMasterDetailRelationshipsPage: FullscreenDataSourceWizardSectionId.ConfigureMasterDetailRelationshipsPage,
    ConfigureQueryParametersPage: FullscreenDataSourceWizardSectionId.ConfigureQueryParametersPage,
    ChooseSqlConnectionPage: FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage,
    ConfigureQueryPage: FullscreenDataSourceWizardSectionId.ConfigureQueryPage,
    ChooseJsonSourcePage: FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage,
    ConfigureCrossTabColumnsPage: 'configureCrossTabColumnsPage',
    ConfigureCrossTabRowsPage: 'configureCrossTabRowsPage',
    ConfigureCrossTabDataPage: 'configureCrossTabDataPage'
};
