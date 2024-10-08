﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\_reportWizardCreating.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FullscreenReportWizard } from './fullscreenReportWizard';
import { _ReportWizardOptions } from './internal/utils';
import { LegacyReportWizard } from './legacyReportWizard';
import { ReportWizard } from './reportWizard';
export declare function _createReportWizard(reportWizardOptions: _ReportWizardOptions): ReportWizard | FullscreenReportWizard | LegacyReportWizard;
