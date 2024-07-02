﻿/**
* DevExpress Analytics (bundle\_validator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function checkIncludedScripts() {
    const ko = window['ko'];
    let devextremeExists = false;
    if (!(window['DevExpress'] && window['DevExpress'].ui && window['DevExpress'].ui.dxTextBox)) {
        console.error('The DevExtreme library is missing. Check whether a script is included on the page.');
    }
    else
        devextremeExists = true;
    if (!ko) {
        console.error('The Knockout library is missing. Check whether a script is included on the page.');
    }
    else if (!ko.bindingHandlers['dxPopup'] && devextremeExists) {
        console.error('The DevExtreme library is included before the Knockout library. Check the order in which the scripts appear on the page.');
    }
    const $ = window['$'] || window['jQuery'];
    if (!$) {
        console.error('The jQuery library is missing. Check whether a script is included on the page.');
    }
}
export function checkVersions() {
    const DevExpress = window.DevExpress;
    const analyticsVersion = DevExpress['Analytics']['VERSION'];
    const devExtremeVersion = DevExpress['VERSION'];
    if (devExtremeVersion != analyticsVersion)
        console.warn(`Analytics-Core (v${analyticsVersion}) and DevExtreme (v${devExtremeVersion}) versions do not match.`);
}
