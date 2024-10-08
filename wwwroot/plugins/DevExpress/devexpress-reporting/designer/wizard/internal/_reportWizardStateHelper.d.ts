﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_reportWizardStateHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../../controls/xrReport';
import { IReportWizardState } from '../reportWizardState';
export declare class ReportWizardStateHelper {
    static applyDataBindings(state: IReportWizardState, model: ReportViewModel): void;
    static applyPageSetup(state: IReportWizardState, model: ReportViewModel): void;
}
