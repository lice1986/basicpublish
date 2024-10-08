﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyJsonDataSourceSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { SpecifyJsonDataSourceSettingsPage as AnalyticSpecifyJsonDataSourceSettingsPage, _registerSpecifyJsonDataSourceSettingsPage as _registerSpecifyAnalyticsJsonDataSourceSettingsPage } from '@devexpress/analytics-core/analytics-wizard';
import { overrideFullscreenDataSourceWizardPageMetadata } from '../../internal/_utils';
import { FullscreenReportWizardPageId, FullscreenReportWizardSectionId } from '../../pageId';
import { _registerChooseJsonSchemaPage } from '../dataSourceWizard/chooseJsonSchemaPage';
export class SpecifyJsonDataSourceSettingsPage extends AnalyticSpecifyJsonDataSourceSettingsPage {
    registerSections() {
        super.registerSections();
        _registerChooseJsonSchemaPage(this._factory, this['_dataSourceWizardOptions'].callbacks);
        const meta = this._factory.getMetadata(FullscreenReportWizardSectionId.ChooseJsonSchemaPage);
        meta['disabledText'] = getLocalization('To select data fields, choose or create a data connection.', 'AnalyticsCoreStringId.JsonDSWizard_ChooseJsonSchemaPage_Placeholder');
    }
}
export function _registerSpecifyJsonDataSourceSettingsPage(factory, wizardOptions) {
    _registerSpecifyAnalyticsJsonDataSourceSettingsPage(factory, wizardOptions);
    overrideFullscreenDataSourceWizardPageMetadata(factory, FullscreenReportWizardPageId.SpecifyJsonDataSourceSettingsPage, () => new SpecifyJsonDataSourceSettingsPage(wizardOptions));
}
