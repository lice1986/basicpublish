﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\specifyJsonDataSourceSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { WizardSectionPosition } from '../../internal/_utils';
import { FullscreenDataSourceWizardPageId, FullscreenDataSourceWizardSectionId } from '../../pageId';
import { _registerChooseJsonSchemaPage } from '../../pages/jsonDataSourceWizard/chooseJsonSchemaPage';
import { _registerChooseJsonSourcePage } from '../../pages/jsonDataSourceWizard/chooseJsonSourcePage';
import { _registerSpecifyJsonConnectionPage } from '../../pages/jsonDataSourceWizard/specifyJsonConnectionPage';
import { FullscreenWizardPage } from './fullscreenWizardPage';
export class SpecifyJsonDataSourceSettingsPage extends FullscreenWizardPage {
    constructor(_dataSourceWizardOptions) {
        super();
        this._dataSourceWizardOptions = _dataSourceWizardOptions;
    }
    registerSections() {
        if (this._dataSourceWizardOptions.connectionStrings.json().length > 0) {
            _registerSpecifyJsonConnectionPage(this._factory, this._dataSourceWizardOptions.connectionStrings.json, this._dataSourceWizardOptions.allowCreateNewJsonConnection, this._dataSourceWizardOptions.callbacks.getItemsProviderCallback, this._dataSourceWizardOptions.getJsonConnectionStrings);
            this._setSectionPosition(FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.Right : WizardSectionPosition.Left);
        }
        if (this._dataSourceWizardOptions.allowCreateNewJsonConnection) {
            if (this._dataSourceWizardOptions.connectionStrings.json().length === 0) {
                _registerChooseJsonSourcePage(this._factory, this._dataSourceWizardOptions.requestWrapper, this._dataSourceWizardOptions.callbacks.getItemsProviderCallback);
                this._setSectionPosition(FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.Right : WizardSectionPosition.Left);
                const meta = this._factory.getMetadata(FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage);
                meta['disabledText'] = getLocalization("To create a data connection, select \"No, I'd like to create a new data connection\".", 'AnalyticsCoreStringId.JsonDSWizard_CreateNewConnectionPage_Placeholder');
            }
        }
        _registerChooseJsonSchemaPage(this._factory, this._dataSourceWizardOptions.requestWrapper, this._dataSourceWizardOptions.callbacks);
        this._setSectionPosition(FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.Left : WizardSectionPosition.Right);
        const meta = this._factory.getMetadata(FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage);
        meta['disabledText'] = getLocalization('To select data fields, choose or create a data connection.', 'AnalyticsCoreStringId.JsonDSWizard_ChooseJsonSchemaPage_Placeholder');
    }
    getNextSectionId(sectionId) {
        if (!sectionId && this._dataSourceWizardOptions.connectionStrings.json().length > 0) {
            return FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage;
        }
        else if (!sectionId) {
            return FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage;
        }
        else if (this._dataSourceWizardOptions.allowCreateNewJsonConnection) {
            if (sectionId === FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage)
                return FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage;
            else if (sectionId === FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage)
                return FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage;
        }
        else {
            if (sectionId === FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage)
                return FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage;
        }
    }
    canNext() {
        const section = this._sectionsProcessor.getPageById(FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage);
        return section && section.page() && section.metadata.canNext(section.page().page);
    }
}
export function _registerSpecifyJsonDataSourceSettingsPage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage, {
        setState: (data, state) => {
            state.jsonDataSourceWizard.connectionName = data.jsonDataSourceWizard.connectionName;
            state.jsonDataSourceWizard.newConnectionName = data.jsonDataSourceWizard.newConnectionName;
            state.jsonDataSourceWizard.jsonSource = data.jsonDataSourceWizard.jsonSource;
            state.jsonDataSourceWizard.dataSourceName = data.jsonDataSourceWizard.dataSourceName;
            state.jsonDataSourceWizard.jsonScheme = data.jsonDataSourceWizard.jsonScheme;
            state.jsonDataSourceWizard.rootElement = data.jsonDataSourceWizard.rootElement;
        },
        getState: (state) => state,
        resetState: (state, defaultState) => {
            state.jsonDataSourceWizard.connectionName = defaultState.jsonDataSourceWizard.connectionName;
            state.jsonDataSourceWizard.jsonSource = defaultState.jsonDataSourceWizard.jsonSource;
            state.jsonDataSourceWizard.dataSourceName = defaultState.jsonDataSourceWizard.dataSourceName;
            state.jsonDataSourceWizard.newConnectionName = defaultState.jsonDataSourceWizard.newConnectionName;
            state.jsonDataSourceWizard.jsonScheme = defaultState.jsonDataSourceWizard.jsonScheme;
            state.jsonDataSourceWizard.rootElement = defaultState.jsonDataSourceWizard.rootElement;
        },
        create: () => {
            return new SpecifyJsonDataSourceSettingsPage(dataSourceWizardOptions);
        },
        navigationPanelText: getLocalization('Specify Data Source Settings', 'AnalyticsCoreStringId.Wizard_SpecifyDataSourceSettingsPage'),
        template: 'dx-wizard-fullscreen-page'
    });
}
