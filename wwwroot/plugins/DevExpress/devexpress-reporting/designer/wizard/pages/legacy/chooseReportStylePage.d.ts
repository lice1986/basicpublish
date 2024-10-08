﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseReportStylePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { ReportStyle, ReportStyleItem } from '../../internal/reportStylePageUtils';
import { ILegacyReportWizardState } from '../../reportWizardState';
export declare class LegacyChooseReportStylePage extends WizardPageBase {
    canFinish(): boolean;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        style?: ReportStyle;
    }, any, any>;
    reportStyleItems: ReportStyleItem[];
    selectedReportStyle: ko.Observable<ReportStyleItem>;
}
export declare function _registerLegacyChooseReportStylePage(factory: PageFactory): void;
