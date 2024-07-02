﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\setReportTitlePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { IReportTitleState } from '../reportWizardState';
export declare class SetReportTitlePage extends WizardPageBase {
    initialize(data: IReportTitleState): JQuery.Promise<any, any, any>;
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQuery.Promise<any, any, any>;
    reportTitle: ko.Observable<string>;
}
export declare function _registerSetReportTitlePage(factory: PageFactory): void;