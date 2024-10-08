﻿/**
* DevExpress HTML/JS Reporting (designer\utils\inititalizer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { DataSourceWizardSettings } from '@devexpress/analytics-core/analytics-wizard';
export var SearchBoxVisibilityMode;
(function (SearchBoxVisibilityMode) {
    SearchBoxVisibilityMode[SearchBoxVisibilityMode["Auto"] = 0] = "Auto";
    SearchBoxVisibilityMode[SearchBoxVisibilityMode["Always"] = 1] = "Always";
    SearchBoxVisibilityMode[SearchBoxVisibilityMode["Never"] = 2] = "Never";
})(SearchBoxVisibilityMode || (SearchBoxVisibilityMode = {}));
export class ReportWizardSettings extends DataSourceWizardSettings {
    createDefault(wizardSettings) {
        const newSettings = extend({}, super.createDefault(wizardSettings), { useFullscreenWizard: true, useMasterDetailWizard: true });
        if (!wizardSettings)
            return newSettings;
        if (wizardSettings.useFullscreenWizard !== undefined)
            newSettings.useFullscreenWizard = wizardSettings.useFullscreenWizard;
        if (wizardSettings.useMasterDetailWizard !== undefined)
            newSettings.useMasterDetailWizard = wizardSettings.useMasterDetailWizard;
        newSettings.reportWizardTemplatesSearchBoxVisibility = wizardSettings.reportWizardTemplatesSearchBoxVisibility;
        return newSettings;
    }
}
