﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\_selectLabelTypePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { ReportWizardService } from '../../services/_reportWizardService';
export let labelReportWizardPromise = null;
export function initializeLabelReportWizardPromise() {
    if (!labelReportWizardPromise) {
        const $def = $.Deferred();
        ReportWizardService.getLabelReportWizardData().done(data => $def.resolve(JSON.parse(data)));
        labelReportWizardPromise = $def.promise();
    }
}