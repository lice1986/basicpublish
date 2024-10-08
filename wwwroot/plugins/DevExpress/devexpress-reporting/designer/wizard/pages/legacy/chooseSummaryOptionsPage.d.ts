﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseSummaryOptionsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { ISummaryOptions, SummaryOptionsWrapper } from '../../internal/_summaryOptionsPageUtils';
import { ILegacyReportWizardState } from '../../reportWizardState';
export declare class LegacyChooseSummaryOptionsPage extends WizardPageBase {
    private _columns;
    canFinish(): boolean;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        summaryOptions?: Array<ISummaryOptions>;
        ignoreNullValuesForSummary?: boolean;
    }, any, any>;
    summaryOptions: ko.ObservableArray<SummaryOptionsWrapper>;
    ignoreNullValues: ko.Observable<boolean>;
    toggleIgnoreNullValues: () => void;
}
export declare function _registerLegacyChooseSummaryOptionsPage(factory: PageFactory): void;
