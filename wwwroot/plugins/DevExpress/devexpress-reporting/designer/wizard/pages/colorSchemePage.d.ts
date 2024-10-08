﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\colorSchemePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { ColorScheme, CustomColorScheme } from '../internal/colorSchemaPageUtils';
import { IColorSchemeState } from '../reportWizardState';
export declare class ChooseReportColorSchemePage extends WizardPageBase {
    constructor();
    addColorScheme(name: string, color: string, position?: number): void;
    removeColorScheme(...names: string[]): void;
    removeAllColorSchemes(): void;
    setCustomColor(color: string): void;
    _applyScheme(data: ColorScheme): void;
    canFinish(): boolean;
    _scheme: ko.Observable<ColorScheme>;
    _customColorScheme: CustomColorScheme;
    _lookupData: {
        scheme: ColorScheme[];
    };
    initialize(state: IColorSchemeState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _applyColorSchemeState(data: IColorSchemeState, state: IColorSchemeState): void;
export declare function _registerChooseReportColorSchemePage(factory: PageFactory): void;
