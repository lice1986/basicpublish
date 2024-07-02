﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\configureReportPageSettingsAndColorSchemeSection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { IReportWizardState } from '../reportWizardState';
import { ChooseReportColorSchemePage } from './colorSchemePage';
import { ConfigureReportPageSettingsPage } from './configureReportPageSettingsPage';
export declare class ConfigurePageSettingsPage extends WizardPageBase {
    _configureReportPageSettingsPage: ConfigureReportPageSettingsPage;
    _colorSchemePage: ChooseReportColorSchemePage;
    _colorSchemePageVisible: boolean;
    dispose(): void;
    addColorScheme(name: string, color: string, position?: number): void;
    removeColorScheme(...names: string[]): void;
    removeAllColorSchemes(): void;
    setCustomColor(color: string): void;
    onChange(callback: any): void;
    canNext(): boolean;
    canFinish(): boolean;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, never>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerConfigureReportPageSettingsSection(factory: PageFactory): void;