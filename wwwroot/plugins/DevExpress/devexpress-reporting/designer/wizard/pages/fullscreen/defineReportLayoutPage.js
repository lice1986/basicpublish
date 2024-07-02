﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\defineReportLayoutPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { FullscreenWizardPage } from '@devexpress/analytics-core/analytics-wizard';
import { WizardPageSection, WizardSectionPosition } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as $ from 'jquery';
import { FullscreenReportWizardPageId, FullscreenReportWizardSectionId } from '../../pageId';
import { _registerAddGroupFieldsPage } from '../addGroupingLevelSection';
import { _registerAddSummaryFieldsPage } from '../chooseSummaryOptionsSection';
import { _registerSelectDataMembersPage } from '../selectDataMembersPage';
export class DefineReportLayoutPage extends FullscreenWizardPage {
    constructor(_reportWizardOptions) {
        super();
        this._reportWizardOptions = _reportWizardOptions;
    }
    registerSections() {
        _registerSelectDataMembersPage(this._factory, this._reportWizardOptions, FullscreenReportWizardSectionId.SelectDataMembersPage_Members);
        _registerAddGroupFieldsPage(this._factory);
        _registerAddSummaryFieldsPage(this._factory);
        let meta = this._factory.getMetadata(FullscreenReportWizardSectionId.SelectDataMembersPage_Members);
        meta['disabledText'] = getLocalization('Loading...', 'AnalyticsCoreStringId.Loading');
        meta.description = getLocalization('Select queries for the report and its detail reports.', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SelectQueries');
        meta = this._factory.getMetadata(FullscreenReportWizardSectionId.AddGroupFieldsPage);
        meta.description = getLocalization('Add group fields.', 'ASPxReportsStringId.ReportDesigner_Wizard_AddGroupFields');
        meta = this._factory.getMetadata(FullscreenReportWizardSectionId.AddSummaryFieldsPage);
        meta.description = getLocalization('Add summary fields.', 'ASPxReportsStringId.ReportDesigner_Wizard_AddSummaryFields');
        this._setSectionPosition(FullscreenReportWizardSectionId.SelectDataMembersPage_Members, WizardSectionPosition.Top);
        this._setSectionPosition(FullscreenReportWizardSectionId.AddGroupFieldsPage, this._reportWizardOptions.rtl ? WizardSectionPosition.BottomRight : WizardSectionPosition.BottomLeft);
        this._setSectionPosition(FullscreenReportWizardSectionId.AddSummaryFieldsPage, this._reportWizardOptions.rtl ? WizardSectionPosition.BottomLeft : WizardSectionPosition.BottomRight);
    }
    _beforeStart() {
        this._sections[0].metadata.template = 'dxrd-page-masterdetail-select-dataMembers';
        const cachedItem = new WizardPageSection(FullscreenReportWizardSectionId.SelectDataMembersPage_Fields, $.extend(true, {}, this._sections[0].metadata, {
            template: 'dxrd-page-masterdetail-select-fieldMembers',
            description: getLocalization('Select data fields to display in the report.', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SelectDataFields'),
            disabledText: getLocalization('Loading...', 'AnalyticsCoreStringId.Loading')
        }));
        cachedItem.page = this._sections[0].page;
        this._sections.splice(1, 0, cachedItem);
        this._setSectionPosition(FullscreenReportWizardSectionId.SelectDataMembersPage_Members, this._reportWizardOptions.rtl ? WizardSectionPosition.TopRight : WizardSectionPosition.TopLeft);
        this._setSectionPosition(FullscreenReportWizardSectionId.SelectDataMembersPage_Fields, this._reportWizardOptions.rtl ? WizardSectionPosition.TopLeft : WizardSectionPosition.TopRight);
    }
    getNextSectionId(sectionId) {
        if (!sectionId)
            return FullscreenReportWizardSectionId.SelectDataMembersPage_Members;
        else if (sectionId === FullscreenReportWizardSectionId.SelectDataMembersPage_Members && !$.isEmptyObject(this._stateManager.getCurrentState().masterDetailInfoCollection) && this._stateManager.getCurrentState().masterDetailInfoCollection.some(item => item.checked !== false)) {
            return FullscreenReportWizardSectionId.AddGroupFieldsPage;
        }
        else if (sectionId === FullscreenReportWizardSectionId.AddGroupFieldsPage && !$.isEmptyObject(this._stateManager.getCurrentState().masterDetailSummaryOptionsColumns)) {
            return FullscreenReportWizardSectionId.AddSummaryFieldsPage;
        }
    }
}
export function _registerDefineReportLayoutPage(factory, reportWizardOptions) {
    factory.registerMetadata(FullscreenReportWizardPageId.DefineReportLayoutPage, {
        create: () => {
            return new DefineReportLayoutPage(reportWizardOptions);
        },
        getState: (state) => state,
        setState: (data, state) => {
            state.masterDetailInfoCollection = data.masterDetailInfoCollection;
            state.masterDetailGroups = data.masterDetailGroups;
            state.masterDetailSummaryOptionsColumns = data.masterDetailSummaryOptionsColumns;
            state.masterDetailSummariesInfo = data.masterDetailSummariesInfo;
            state.ignoreNullValuesForSummary = data.ignoreNullValuesForSummary;
        },
        resetState: (state, defaultState) => {
            state.masterDetailInfoCollection = defaultState.masterDetailInfoCollection;
            state.masterDetailGroups = defaultState.masterDetailGroups;
            state.masterDetailSummaryOptionsColumns = defaultState.masterDetailSummaryOptionsColumns;
            state.masterDetailSummariesInfo = defaultState.masterDetailSummariesInfo;
            state.ignoreNullValuesForSummary = defaultState.ignoreNullValuesForSummary;
        },
        navigationPanelText: getLocalization('Define Report Layout', 'ASPxReportsStringId.ReportDesigner_Wizard_DefineReportLayout'),
        template: 'dx-wizard-fullscreen-page'
    });
}
