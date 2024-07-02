﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _DataSourceWizardOptionsBase } from '@devexpress/analytics-core/analytics-wizard';
import { IReportWizardSettings, IReportWizardTypeItem, SearchBoxVisibilityMode } from '../../utils/inititalizer';
import { IReportWizardCallbacks } from './_utils';
export declare class _ReportWizardOptions extends _DataSourceWizardOptionsBase<IReportWizardCallbacks> {
    reportTemplates: IReportWizardTypeItem[];
    searchBoxVisibilityMode: SearchBoxVisibilityMode;
    callbacks: IReportWizardCallbacks;
    wizardSettings: IReportWizardSettings;
    hideDataMemberSubItems: boolean;
}