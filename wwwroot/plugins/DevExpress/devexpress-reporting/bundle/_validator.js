﻿/**
* DevExpress HTML/JS Reporting (bundle\_validator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const version = '%VERSION%';
export function checkVersions() {
    const DevExpress = window.DevExpress;
    const reportingVersion = DevExpress['Reporting']['VERSION'];
    const analyticsVersion = DevExpress['Analytics']['VERSION'];
    if (reportingVersion != analyticsVersion)
        console.warn(`Reporting (v${reportingVersion}) and Analytics-Core (v${analyticsVersion}) versions do not match.`);
}
