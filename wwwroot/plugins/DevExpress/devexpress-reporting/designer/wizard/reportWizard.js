﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\reportWizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { isEmptyObject } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceType, DataSourceWizardPageId, JsonDataSourceWizardPageId, MultiQueryDataSourceWizardPageIterator, PageFactory, PopupWizard, SqlDataSourceWizardPageId, _registerMultiQueryDataSourcePages } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { MasterDetailRequestModel } from './internal/_masterDetailRequestModel';
import { _masterDetailWizardHeight, _masterDetailWizardWidth } from './internal/_utils';
import { ReportWizardPageId } from './pageId';
import { _registerAddGroupingLevelPage } from './pages/addGroupingLevelPage';
import { _convertToStateDataSource, _registerChooseAvailableDataSourcePage } from './pages/chooseAvailableDataSourcePage';
import { _registerSelectReportTypePage } from './pages/chooseReportTypePage';
import { _registerChooseSummaryOptionsPage } from './pages/chooseSummaryOptionsPage';
import { _registerChooseReportColorSchemePage } from './pages/colorSchemePage';
import { _registerConfigureReportPageSettingsPage } from './pages/configureReportPageSettingsPage';
import { _registerCustomizeLabelPage } from './pages/customizeLabelPage';
import { _registerChooseJsonSchemaPage } from './pages/dataSourceWizard/chooseJsonSchemaPage';
import { _registerConfigureMasterDetailRelationshipsPage } from './pages/dataSourceWizard/configureMasterDetailRelationshipsPage';
import { _registerMultiQueryConfigurePage } from './pages/dataSourceWizard/multiQueryConfigurePage';
import { _registerMultiQueryConfigureParametersPage } from './pages/dataSourceWizard/multiQueryConfigureParametersPage';
import { _registerSelectDataMembersPage } from './pages/selectDataMembersPage';
import { _registerSelectLabelTypePage } from './pages/selectLabelTypePage';
import { _registerSetReportTitlePage } from './pages/setReportTitlePage';
import { ReportType } from './reportWizardState';
import { createReportWizardState } from './reportWizardStateCreating';
export class ReportWizard extends PopupWizard {
    constructor(pageFactory, _reportWizardOptions) {
        super(pageFactory, _reportWizardOptions.callbacks.finishCallback);
        this._reportWizardOptions = _reportWizardOptions;
        this._requestModelType = MasterDetailRequestModel;
        this.title = getLocalization('Report Wizard', 'ASPxReportsStringId.ReportDesigner_Wizard_Header');
        this.height(_masterDetailWizardHeight);
        this.width(_masterDetailWizardWidth);
        this._extendCssClass = 'dxrd-report-wizard dxrd-master-detail-report-wizard';
    }
    _callBeforeFinishHandler(state, wizardModel) { }
    _callAfterFinishHandler(state, result) {
        this.events.call('afterFinish', { state: state, wizardResult: result });
    }
    initialize(state = createReportWizardState()) {
        if (this._reportWizardOptions.dataSources().length === 1 && !this._reportWizardOptions.canCreateDataSource) {
            state.dataSource = _convertToStateDataSource(this._reportWizardOptions.dataSources()[0]);
        }
        if (this._reportWizardOptions.sqlDataSourceAvailable || !isEmptyObject(state.sqlDataSourceWizard)) {
            state.dataSourceType = DataSourceType.Sql;
        }
        else if (this._reportWizardOptions.jsonDataSourceAvailable || state.jsonDataSourceWizard.jsonSource) {
            state.dataSourceType = DataSourceType.Json;
        }
        else {
            state.dataSourceType = DataSourceType.NoData;
        }
        super.initialize(state, (pageFactory, stateManager) => new ReportWizardPageIterator(pageFactory, stateManager, this._reportWizardOptions));
    }
    start(finishCallback) {
        if (finishCallback)
            this['_finishCallback'] = finishCallback;
        super.start();
    }
}
export class ReportWizardPageIterator extends MultiQueryDataSourceWizardPageIterator {
    constructor(pagesFactory, stateManager, _reportWizardOptions) {
        super(pagesFactory, stateManager, _reportWizardOptions);
        this._reportWizardOptions = _reportWizardOptions;
    }
    getNextPageId(pageId) {
        if (!pageId)
            return ReportWizardPageId.SelectReportTypePage;
        if (pageId === ReportWizardPageId.SelectReportTypePage && this._getCurrentState().reportType === ReportType.Label) {
            return ReportWizardPageId.SelectLabelTypePage;
        }
        else if (pageId === ReportWizardPageId.SelectLabelTypePage) {
            return ReportWizardPageId.CustomizeLabelPage;
        }
        else if (pageId === ReportWizardPageId.SelectReportTypePage && this._getCurrentState().dataSource && !this._reportWizardOptions.canCreateDataSource) {
            return ReportWizardPageId.SelectDataMembersPage;
        }
        else if (pageId === ReportWizardPageId.SelectReportTypePage && this._reportWizardOptions.dataSources().length === 0) {
            return super.getNextPageId();
        }
        else if (pageId === ReportWizardPageId.SelectReportTypePage) {
            return ReportWizardPageId.ChooseAvailableDataSourcePage;
        }
        else if (pageId === ReportWizardPageId.ChooseAvailableDataSourcePage && !this._getCurrentState().dataSource) {
            return super.getNextPageId();
        }
        else if (super.getNextPageId(pageId)) {
            return super.getNextPageId(pageId);
        }
        else if (pageId === ReportWizardPageId.ChooseAvailableDataSourcePage && this._getCurrentState().dataSource) {
            return ReportWizardPageId.SelectDataMembersPage;
        }
        else if ((pageId === DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage ||
            pageId === SqlDataSourceWizardPageId.MultiQueryConfigurePage ||
            pageId === SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage ||
            pageId === JsonDataSourceWizardPageId.ChooseJsonSchemaPage)) {
            return ReportWizardPageId.SelectDataMembersPage;
        }
        else if (pageId === ReportWizardPageId.SelectDataMembersPage && !$.isEmptyObject(this.stateManager.getCurrentState().masterDetailInfoCollection) && this.stateManager.getCurrentState().masterDetailInfoCollection.some(item => item.checked !== false)) {
            return ReportWizardPageId.AddGroupingLevelPage;
        }
        else if (pageId === ReportWizardPageId.AddGroupingLevelPage && !$.isEmptyObject(this._getCurrentState().masterDetailSummaryOptionsColumns)) {
            return ReportWizardPageId.ChooseSummaryOptionsPage;
        }
        else if (pageId === ReportWizardPageId.AddGroupingLevelPage || pageId === ReportWizardPageId.ChooseSummaryOptionsPage) {
            return ReportWizardPageId.ConfigureReportPageSettingsPage;
        }
        else if (pageId === ReportWizardPageId.ConfigureReportPageSettingsPage) {
            return ReportWizardPageId.ChooseReportColorSchemePage;
        }
        else if (pageId === ReportWizardPageId.ChooseReportColorSchemePage) {
            return ReportWizardPageId.SetReportTitlePage;
        }
    }
}
export function _registerCommonReportWizardPages(factory, reportWizardOptions) {
    _registerSelectLabelTypePage(factory);
    _registerCustomizeLabelPage(factory);
    _registerChooseAvailableDataSourcePage(factory, reportWizardOptions);
    _registerSetReportTitlePage(factory);
    _registerMultiQueryDataSourcePages(factory, reportWizardOptions);
    _registerChooseJsonSchemaPage(factory, reportWizardOptions.callbacks);
    _registerConfigureMasterDetailRelationshipsPage(factory, reportWizardOptions.callbacks);
    _registerMultiQueryConfigurePage(factory, reportWizardOptions);
    _registerMultiQueryConfigureParametersPage(factory, reportWizardOptions.callbacks);
}
export function _registerReportWizardPages(factory, reportWizardOptions) {
    _registerCommonReportWizardPages(factory, reportWizardOptions);
    _registerSelectReportTypePage(factory, {
        showVertical: false,
        canCreateDatabound: () => reportWizardOptions.dataSources().length > 0 ||
            reportWizardOptions.connectionStrings.sql().length > 0 ||
            reportWizardOptions.connectionStrings.json().length > 0 ||
            (reportWizardOptions.allowCreateNewJsonConnection && reportWizardOptions.wizardSettings.enableJsonDataSource),
        reportTemplates: reportWizardOptions.reportTemplates,
        searchBoxVisibilityMode: reportWizardOptions.searchBoxVisibilityMode
    });
    _registerSelectDataMembersPage(factory, reportWizardOptions);
    _registerAddGroupingLevelPage(factory);
    _registerChooseSummaryOptionsPage(factory);
    _registerConfigureReportPageSettingsPage(factory);
    _registerChooseReportColorSchemePage(factory);
}
export function _createReportWizard(reportWizardOptions) {
    const factory = new PageFactory();
    _registerReportWizardPages(factory, reportWizardOptions);
    return new ReportWizard(factory, reportWizardOptions);
}
