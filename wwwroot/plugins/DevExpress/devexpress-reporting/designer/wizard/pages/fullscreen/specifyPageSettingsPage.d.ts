﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyPageSettingsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { FullscreenWizardPage, FullscreenWizardPageFactory, PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { _ReportWizardOptions } from '../../internal/utils';
import { PreviewPageHelper } from '../configureReportPageSettingsPage';
export declare class SpecifyPageSettingsPage extends FullscreenWizardPage {
    private _reportWizardOptions;
    constructor(_reportWizardOptions: _ReportWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    registerSections(): void;
    getNextSectionId(sectionId: any): string;
}
export declare function _registerSpecifyPageSettingsPage(factory: FullscreenWizardPageFactory, reportWizardOptions: _ReportWizardOptions): void;
export declare class SpecifyReportTitlePage extends WizardPageBase {
    constructor();
    private _getBrightness;
    private _fillTables;
    initialize(state: any): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _reportTitlePlaceholder(): any;
    _foreColor: ko.Observable<string>;
    _masterDetailInfo: ko.ObservableArray<any>;
    reportTitle: ko.Observable<string> | ko.Computed<string>;
    _reportTitleVisible: boolean;
    _color: ko.Observable<string>;
    _previewPageHelper: PreviewPageHelper;
}
export declare function _registerSpecifyReportTitlePage(factory: PageFactory): void;
