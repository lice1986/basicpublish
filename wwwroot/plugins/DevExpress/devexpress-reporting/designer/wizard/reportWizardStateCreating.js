﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\reportWizardStateCreating.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { _createDefaultDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { ReportWizardStateHelper } from './internal/_reportWizardStateHelper';
import { defaultReportWizardState } from './reportWizardState';
export function createReportWizardState(reportViewModel) {
    const state = extend(true, {}, defaultReportWizardState, _createDefaultDataSourceWizardState());
    if (reportViewModel) {
        ReportWizardStateHelper.applyDataBindings(state, reportViewModel);
        ReportWizardStateHelper.applyPageSetup(state, reportViewModel);
    }
    return state;
}