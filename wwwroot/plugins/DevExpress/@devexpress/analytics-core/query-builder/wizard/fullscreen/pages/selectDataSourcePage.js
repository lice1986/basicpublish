﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\selectDataSourcePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../../../property-grid/localization/_localization';
import { _registerChooseAvailableDataSourcePage } from '../../chooseAvailableDataSourcePage';
import { WizardSectionPosition, _isMoreThanOneDataSourceTypeAvailable } from '../../internal/_utils';
import { DataSourceWizardPageId, FullscreenDataSourceWizardPageId } from '../../pageId';
import { _registerChooseDataSourceTypePage } from '../../pages/chooseDataSourceTypePage';
import { FullscreenWizardPage } from './fullscreenWizardPage';
export class SelectDataSourcePage extends FullscreenWizardPage {
    constructor(wizardOptions, dataSources) {
        super();
        this.wizardOptions = wizardOptions;
        this.dataSources = dataSources;
        this.disabledSectionText = getLocalization("To specify a data source, select \"No, I'd like to create a new data source\".", 'AnalyticsCoreStringId.Wizard_SelectDataSourceType_Placeholder');
    }
    registerSections() {
        if (this.showPredefinedDataSourceSection()) {
            _registerChooseAvailableDataSourcePage(this._factory, this.wizardOptions);
            this._setSectionPosition(DataSourceWizardPageId.ChoosePredefinedDataSourcePage);
        }
        if (this.showChooseDataSourceTypeSection()) {
            _registerChooseDataSourceTypePage(this._factory, this.wizardOptions);
            this._setSectionPosition(DataSourceWizardPageId.ChooseDataSourceTypePage);
            const meta = this._factory.getMetadata(DataSourceWizardPageId.ChooseDataSourceTypePage);
            meta['disabledText'] = this.disabledSectionText;
        }
        if (this.showPredefinedDataSourceSection() && this.showChooseDataSourceTypeSection()) {
            this._setSectionPosition(DataSourceWizardPageId.ChoosePredefinedDataSourcePage, WizardSectionPosition.Top);
            this._setSectionPosition(DataSourceWizardPageId.ChooseDataSourceTypePage, WizardSectionPosition.Bottom);
        }
    }
    showPredefinedDataSourceSection() {
        return this.dataSources.length > 0;
    }
    showChooseDataSourceTypeSection() {
        return this.wizardOptions.canCreateDataSource && _isMoreThanOneDataSourceTypeAvailable(this.wizardOptions);
    }
    getNextSectionId(sectionId) {
        if (!sectionId && this.showPredefinedDataSourceSection())
            return DataSourceWizardPageId.ChoosePredefinedDataSourcePage;
        else if (!sectionId && this.showChooseDataSourceTypeSection())
            return DataSourceWizardPageId.ChooseDataSourceTypePage;
        else if (sectionId === DataSourceWizardPageId.ChoosePredefinedDataSourcePage && !this._stateManager.getCurrentState().predefinedDataSourceName && this.showChooseDataSourceTypeSection())
            return DataSourceWizardPageId.ChooseDataSourceTypePage;
    }
}
export function _registerSelectDataSourcePage(factory, wizardOptions) {
    factory.registerMetadata(FullscreenDataSourceWizardPageId.SelectDataSourcePage, {
        setState: (data, state) => {
            state.dataSourceType = data.dataSourceType;
            state.predefinedDataSourceName = data.predefinedDataSourceName;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.dataSource = defaultState.dataSource;
            state.predefinedDataSourceName = null;
        },
        create: () => {
            return new SelectDataSourcePage(wizardOptions, wizardOptions.predefinedDataSources());
        },
        navigationPanelText: getLocalization('Select Data Source', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectDataSource'),
        template: 'dx-wizard-fullscreen-page'
    });
}
