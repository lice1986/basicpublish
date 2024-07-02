﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\legacyReportWizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceWizardPageId, MultiQueryDataSourceWizardPageIterator, PageFactory, PopupWizard, SqlDataSourceWizardPageId } from '@devexpress/analytics-core/analytics-wizard';
import { LegacyReportRequestModel } from './internal/_legacyReportRequestModel';
import { LegacyReportWizardPageId, ReportWizardPageId } from './pageId';
import { _registerSelectReportTypePage } from './pages/chooseReportTypePage';
import { _registerLegacyAddGroupingLevelPage } from './pages/legacy/addGroupingLevelPage';
import { _registerLegacyChooseReportLayoutPage } from './pages/legacy/chooseReportLayoutPage';
import { _registerLegacyChooseReportStylePage } from './pages/legacy/chooseReportStylePage';
import { _registerLegacyChooseSummaryOptionsPage } from './pages/legacy/chooseSummaryOptionsPage';
import { _registerLegacySelectColumnsPage } from './pages/legacy/selectColumnsPage';
import { _registerLegacyChooseDataMemberPage } from './pages/legacy/selectDataMemberPage';
import { _registerCommonReportWizardPages } from './reportWizard';
import { ReportType } from './reportWizardState';
import { createReportWizardState } from './reportWizardStateCreating';
export class LegacyReportWizard extends PopupWizard {
    constructor(pageFactory, _reportWizardOptions) {
        super(pageFactory, _reportWizardOptions.callbacks.finishCallback);
        this._reportWizardOptions = _reportWizardOptions;
        this._requestModelType = LegacyReportRequestModel;
        this.title = getLocalization('Report Wizard', 'ASPxReportsStringId.ReportDesigner_Wizard_Header');
    }
    _callBeforeFinishHandler(state, wizardModel) { }
    _callAfterFinishHandler(state, result) {
        this.events.call('afterFinish', { state: state, wizardResult: result });
    }
    initialize(state = createReportWizardState()) {
        super.initialize(state, (factory, stateManager) => new LegacyReportWizardPageIterator(factory, stateManager, this._reportWizardOptions));
    }
    start(finishCallback) {
        if (finishCallback)
            this['_finishCallback'] = finishCallback;
        super.start();
    }
}
export class LegacyReportWizardPageIterator extends MultiQueryDataSourceWizardPageIterator {
    constructor(pageFactory, stateManager, reportWizardOptions) {
        super(pageFactory, stateManager, reportWizardOptions);
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
        else if (pageId === ReportWizardPageId.SelectReportTypePage && (this._getCurrentState().reportType === ReportType.Standard)) {
            return ReportWizardPageId.ChooseAvailableDataSourcePage;
        }
        else if (pageId === ReportWizardPageId.ChooseAvailableDataSourcePage && !this._getCurrentState().dataSource) {
            return SqlDataSourceWizardPageId.ChooseConnectionPage;
        }
        else if (super.getNextPageId(pageId)) {
            return super.getNextPageId(pageId);
        }
        else if (pageId === ReportWizardPageId.ChooseAvailableDataSourcePage && this._getCurrentState().dataSource) {
            return LegacyReportWizardPageId.ChooseDataMemberPage;
        }
        else if (pageId === DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage ||
            pageId === SqlDataSourceWizardPageId.MultiQueryConfigurePage ||
            pageId === SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage) {
            return LegacyReportWizardPageId.ChooseDataMemberPage;
        }
        else if (pageId === LegacyReportWizardPageId.ChooseDataMemberPage) {
            return LegacyReportWizardPageId.SelectColumnsPage;
        }
        else if (pageId === LegacyReportWizardPageId.SelectColumnsPage) {
            return LegacyReportWizardPageId.AddGroupingLevelPage;
        }
        else if (pageId === LegacyReportWizardPageId.AddGroupingLevelPage && this._getCurrentState().summaryOptionsColumns.length > 0) {
            return LegacyReportWizardPageId.ChooseSummaryOptionsPage;
        }
        else if (pageId === LegacyReportWizardPageId.ChooseSummaryOptionsPage || (pageId === LegacyReportWizardPageId.AddGroupingLevelPage && this._getCurrentState().summaryOptionsColumns.length == 0)) {
            return LegacyReportWizardPageId.ChooseReportLayoutPage;
        }
        else if (pageId === LegacyReportWizardPageId.ChooseReportLayoutPage) {
            return LegacyReportWizardPageId.ChooseReportStylePage;
        }
        else if (pageId === LegacyReportWizardPageId.ChooseReportStylePage) {
            return ReportWizardPageId.SetReportTitlePage;
        }
    }
}
export function _createLegacyReportWizard(reportWizardOptions) {
    const factory = new PageFactory();
    _registerCommonReportWizardPages(factory, reportWizardOptions);
    _registerSelectReportTypePage(factory, {
        showVertical: false,
        canCreateDatabound: () => reportWizardOptions.dataSources().length > 0 ||
            reportWizardOptions.connectionStrings.sql().length > 0,
        reportTemplates: reportWizardOptions.reportTemplates,
        searchBoxVisibilityMode: reportWizardOptions.searchBoxVisibilityMode
    });
    _registerLegacyChooseDataMemberPage(factory, reportWizardOptions);
    _registerLegacySelectColumnsPage(factory, reportWizardOptions.callbacks.fieldListsCallback);
    _registerLegacyAddGroupingLevelPage(factory);
    _registerLegacyChooseSummaryOptionsPage(factory);
    _registerLegacyChooseReportLayoutPage(factory);
    _registerLegacyChooseReportStylePage(factory);
    return new LegacyReportWizard(factory, reportWizardOptions);
}