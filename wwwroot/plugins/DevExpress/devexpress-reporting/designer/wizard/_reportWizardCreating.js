﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\_reportWizardCreating.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _createFullscreenReportWizard } from './fullscreenReportWizard';
import { _createLegacyReportWizard } from './legacyReportWizard';
import { _createReportWizard as _createReportWizardBase } from './reportWizard';
export function _createReportWizard(reportWizardOptions) {
    if (reportWizardOptions.wizardSettings.useFullscreenWizard && reportWizardOptions.wizardSettings.useMasterDetailWizard)
        return _createFullscreenReportWizard(reportWizardOptions);
    else if (reportWizardOptions.wizardSettings.useMasterDetailWizard)
        return _createReportWizardBase(reportWizardOptions);
    else
        return _createLegacyReportWizard(reportWizardOptions);
}
