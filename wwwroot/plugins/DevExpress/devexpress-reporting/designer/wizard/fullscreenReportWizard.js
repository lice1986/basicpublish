﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\fullscreenReportWizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { isEmptyObject } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceType, FullscreenDataSourceWizardPageId, FullscreenWizard, FullscreenWizardPageFactory, PageIterator } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { MasterDetailRequestModel } from './internal/_masterDetailRequestModel';
import { FullscreenReportWizardPageId } from './pageId';
import { _convertToStateDataSource } from './pages/chooseAvailableDataSourcePage';
import { _registerSelectReportTypePage } from './pages/chooseReportTypePage';
import { _registerDefineCrossTabPage } from './pages/fullscreen/defineCrossTabPage';
import { _registerDefineReportLayoutPage } from './pages/fullscreen/defineReportLayoutPage';
import { _registerSelectDataSourcePage } from './pages/fullscreen/selectDataSourcePage';
import { _registerSpecifyFederationDataSourceSettingsPage } from './pages/fullscreen/specifyFederationDataSourceSettingsPage';
import { _registerSpecifyJsonDataSourceSettingsPage } from './pages/fullscreen/specifyJsonDataSourceSettingsPage';
import { _registerSpecifyLabelSettingsPage } from './pages/fullscreen/specifyLabelSettingsPage';
import { _registerSpecifyObjectDataSourceSettingsPage } from './pages/fullscreen/specifyObjectDataSourceSettingsPage';
import { _registerSpecifyPageSettingsPage } from './pages/fullscreen/specifyPageSettingsPage';
import { _registerSpecifySqlDataSourceSettingsPage } from './pages/fullscreen/specifySqlDataSourceSettingsPage';
import { ReportType } from './reportWizardState';
import { createReportWizardState } from './reportWizardStateCreating';
export class FullscreenReportWizard extends FullscreenWizard {
    constructor(pageFactory, _reportWizardOptions) {
        super(pageFactory, _reportWizardOptions.callbacks.finishCallback);
        this._reportWizardOptions = _reportWizardOptions;
        this._requestModelType = MasterDetailRequestModel;
        this._availableDataSources = ko.observable([]);
        this._extendCssClass = 'dxrd-master-detail-report-wizard ' + this._extendCssClass;
    }
    _callBeforeFinishHandler(state, wizardModel) { }
    _callAfterFinishHandler(state, result) {
        this.events.call('afterFinish', { state: state, wizardResult: result });
    }
    _description() {
        return getLocalization('Report Wizard', 'ASPxReportsStringId.ReportDesigner_Wizard_Header');
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
        else if (this._reportWizardOptions.objectDataSourceAvailable || !isEmptyObject(state.objectDataSourceWizard)) {
            state.dataSourceType = DataSourceType.Object;
        }
        else {
            state.dataSourceType = DataSourceType.NoData;
        }
        super.initialize(state, (factory, stateManager) => new FullscreenReportWizardPageIterator(factory, stateManager, (page) => this._onResetPage(page), this._reportWizardOptions));
    }
}
export class FullscreenReportWizardPageIterator extends PageIterator {
    constructor(pagesFactory, stateManager, _onResetPage, _reportWizardOptions) {
        super(pagesFactory, stateManager, _onResetPage);
        this._reportWizardOptions = _reportWizardOptions;
    }
    getNextPageId(pageId) {
        const getDefineLayoutPage = () => {
            return this._getCurrentState().reportType === ReportType.CrossTab ? FullscreenReportWizardPageId.DefineCrossTabPage : FullscreenReportWizardPageId.DefineReportLayoutPage;
        };
        if (!pageId)
            return FullscreenReportWizardPageId.SelectReportTypePage;
        if (pageId === FullscreenReportWizardPageId.SelectReportTypePage && this._getCurrentState().reportType === ReportType.Label) {
            return FullscreenReportWizardPageId.SpecifyLabelSettingsPage;
        }
        else if (pageId === FullscreenReportWizardPageId.SelectReportTypePage && this._getCurrentState().dataSource && !this._reportWizardOptions.canCreateDataSource) {
            return getDefineLayoutPage();
        }
        else if (pageId === FullscreenReportWizardPageId.SelectReportTypePage) {
            return FullscreenReportWizardPageId.SelectDataSourcePage;
        }
        else if (pageId === FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSource) {
            return getDefineLayoutPage();
        }
        else if (pageId === FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.Json) {
            return FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage;
        }
        else if (pageId === FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.Sql) {
            return FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage;
        }
        else if (pageId === FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.Object) {
            return FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage;
        }
        else if (pageId === FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.Federation) {
            return FullscreenDataSourceWizardPageId.SpecifyFederationDataSourceSettingsPage;
        }
        else if (pageId === FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.NoData) {
            return FullscreenReportWizardPageId.SpecifyPageSettingsPage;
        }
        else if (pageId === FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage ||
            pageId === FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage ||
            pageId === FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage ||
            pageId === FullscreenDataSourceWizardPageId.SpecifyFederationDataSourceSettingsPage) {
            return getDefineLayoutPage();
        }
        else if (pageId === FullscreenReportWizardPageId.DefineReportLayoutPage || pageId === FullscreenReportWizardPageId.DefineCrossTabPage) {
            return FullscreenReportWizardPageId.SpecifyPageSettingsPage;
        }
    }
}
export function _registerFullscreenReportWizardPages(factory, reportWizardOptions) {
    _registerSelectReportTypePage(factory, {
        canCreateDatabound: () => reportWizardOptions.dataSources().length > 0 ||
            reportWizardOptions.connectionStrings.sql().length > 0 ||
            reportWizardOptions.connectionStrings.json().length > 0 ||
            reportWizardOptions.wizardSettings.enableObjectDataSource ||
            (reportWizardOptions.allowCreateNewJsonConnection && reportWizardOptions.wizardSettings.enableJsonDataSource),
        showVertical: true,
        reportTemplates: reportWizardOptions.reportTemplates,
        searchBoxVisibilityMode: reportWizardOptions.searchBoxVisibilityMode
    });
    _registerSelectDataSourcePage(factory, reportWizardOptions);
    _registerSpecifySqlDataSourceSettingsPage(factory, reportWizardOptions);
    _registerSpecifyJsonDataSourceSettingsPage(factory, reportWizardOptions);
    _registerSpecifyObjectDataSourceSettingsPage(factory, reportWizardOptions);
    _registerSpecifyFederationDataSourceSettingsPage(factory, reportWizardOptions);
    _registerDefineReportLayoutPage(factory, reportWizardOptions);
    _registerDefineCrossTabPage(factory, reportWizardOptions);
    _registerSpecifyLabelSettingsPage(factory, reportWizardOptions);
    _registerSpecifyPageSettingsPage(factory, reportWizardOptions);
}
export function _createFullscreenReportWizard(reportWizardOptions) {
    const factory = new FullscreenWizardPageFactory();
    _registerFullscreenReportWizardPages(factory, reportWizardOptions);
    return new FullscreenReportWizard(factory, reportWizardOptions);
}