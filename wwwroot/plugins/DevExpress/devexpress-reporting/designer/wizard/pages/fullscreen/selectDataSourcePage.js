﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\selectDataSourcePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { FullscreenWizardPage } from '@devexpress/analytics-core/analytics-wizard';
import { WizardSectionPosition } from '@devexpress/analytics-core/analytics-wizard-internal';
import { FullscreenReportWizardPageId, FullscreenReportWizardSectionId } from '../../pageId';
import { _registerChooseAvailableDataSourcePage } from '../chooseAvailableDataSourcePage';
import { _registerChooseDataSourceTypePage } from '../chooseReportTypePage';
export class SelectDataSourcePage extends FullscreenWizardPage {
    constructor(reportWizardOptions) {
        super();
        this.reportWizardOptions = reportWizardOptions;
    }
    registerSections() {
        if (this.reportWizardOptions.dataSources().length > 0) {
            _registerChooseAvailableDataSourcePage(this._factory, this.reportWizardOptions);
            this._setSectionPosition(FullscreenReportWizardSectionId.ChooseAvailableDataSourcePage);
        }
        if (this.reportWizardOptions.canCreateDataSource) {
            _registerChooseDataSourceTypePage(this._factory, this.reportWizardOptions);
            this._setSectionPosition(FullscreenReportWizardSectionId.ChooseDataSourceTypePage);
            const meta = this._factory.getMetadata(FullscreenReportWizardSectionId.ChooseDataSourceTypePage);
            meta['disabledText'] = getLocalization("To specify a data source, select \"No, I'd like to create a new data source\".", 'AnalyticsCoreStringId.Wizard_SelectDataSourceType_Placeholder');
        }
        if (this.reportWizardOptions.dataSources().length > 0 && this.reportWizardOptions.canCreateDataSource) {
            this._setSectionPosition(FullscreenReportWizardSectionId.ChooseAvailableDataSourcePage, WizardSectionPosition.Top);
            this._setSectionPosition(FullscreenReportWizardSectionId.ChooseDataSourceTypePage, WizardSectionPosition.Bottom);
        }
    }
    getNextSectionId(sectionId) {
        if (!sectionId && this.reportWizardOptions.dataSources().length > 0)
            return FullscreenReportWizardSectionId.ChooseAvailableDataSourcePage;
        else if (!sectionId)
            return FullscreenReportWizardSectionId.ChooseDataSourceTypePage;
        else if (sectionId === FullscreenReportWizardSectionId.ChooseAvailableDataSourcePage && !this._stateManager.getCurrentState().dataSource)
            return FullscreenReportWizardSectionId.ChooseDataSourceTypePage;
    }
}
export function _registerSelectDataSourcePage(factory, reportWizardOptions) {
    factory.registerMetadata(FullscreenReportWizardPageId.SelectDataSourcePage, {
        setState: (data, state) => {
            state.dataSourceType = data.dataSourceType;
            state.dataSource = data.dataSource;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.dataSource = defaultState.dataSource;
            state.dataSourceType = defaultState.dataSourceType;
        },
        create: () => {
            return new SelectDataSourcePage(reportWizardOptions);
        },
        navigationPanelText: getLocalization('Select Data Source', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectDataSource'),
        template: 'dx-wizard-fullscreen-page'
    });
}