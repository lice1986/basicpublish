﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\configureReportPageSettingsAndColorSchemeSection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { ReportWizardPageId } from '../pageId';
import { ChooseReportColorSchemePage, _applyColorSchemeState } from './colorSchemePage';
import { ConfigureReportPageSettingsPage, _applyPageSetting } from './configureReportPageSettingsPage';
export class ConfigurePageSettingsPage extends WizardPageBase {
    constructor() {
        super(...arguments);
        this._configureReportPageSettingsPage = new ConfigureReportPageSettingsPage();
        this._colorSchemePage = new ChooseReportColorSchemePage();
        this._colorSchemePageVisible = true;
    }
    dispose() {
        this._configureReportPageSettingsPage.dispose();
        this._colorSchemePage.dispose();
    }
    addColorScheme(name, color, position) {
        this._colorSchemePage.addColorScheme(name, color, position);
    }
    removeColorScheme(...names) {
        this._colorSchemePage.removeColorScheme(...names);
    }
    removeAllColorSchemes() {
        this._colorSchemePage.removeAllColorSchemes();
    }
    setCustomColor(color) {
        this._colorSchemePage.setCustomColor(color);
    }
    onChange(callback) {
        this._colorSchemePage.onChange(callback);
        this._configureReportPageSettingsPage.onChange(callback);
    }
    canNext() {
        return this._colorSchemePage.canNext() && this._configureReportPageSettingsPage.canNext();
    }
    canFinish() {
        return this._colorSchemePage.canFinish() && this._configureReportPageSettingsPage.canFinish();
    }
    initialize(state) {
        this._colorSchemePageVisible = this._colorSchemePage._lookupData.scheme.length > 0 && !!(state.dataSource || state.newDataSource);
        return $.when(...[
            this._configureReportPageSettingsPage.initialize(state.pageSetup),
            this._colorSchemePage.initialize(state.colorScheme)
        ]);
    }
    commit() {
        const deferred = $.Deferred();
        this._colorSchemePage.commit().done((colorResult) => {
            this._configureReportPageSettingsPage.commit().done((configureReportPageSettingsPageResult) => {
                deferred.resolve({
                    pageSetup: configureReportPageSettingsPageResult,
                    colorScheme: colorResult
                });
            });
        });
        return deferred.promise();
    }
}
export function _registerConfigureReportPageSettingsSection(factory) {
    factory.registerMetadata(ReportWizardPageId.ConfigureReportPageSettingsPage, {
        create: () => new ConfigurePageSettingsPage(),
        getState: (state) => state,
        setState: (data, state) => {
            _applyPageSetting(data.pageSetup, state.pageSetup);
            _applyColorSchemeState(data.colorScheme, state.colorScheme);
        },
        resetState: (state, defaultState) => {
            _applyPageSetting(defaultState.pageSetup, state.pageSetup);
            _applyColorSchemeState(defaultState.colorScheme, state.colorScheme);
        },
        template: 'dxrd-page-pageSetupAndColorScheme',
        description: getLocalization('Specify page settings and a report color scheme.', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyPageSettingsColorScheme')
    });
}