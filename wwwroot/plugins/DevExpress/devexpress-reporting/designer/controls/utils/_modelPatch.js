﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_modelPatch.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function convertFontToDXFont(font) {
    font = font.replace('style=', '');
    const components = font.split(',');
    if (components.length > 1)
        components[1] = ' ' + parseFloat(components[1]);
    return components.join(',');
}
function convertMarginsToDXMargins(margins) {
    const marginsParts = margins.split(',');
    if (marginsParts.length > 4) {
        marginsParts.pop();
    }
    return marginsParts.join(',');
}
export function patchFontInLocalizationItem(model) {
    if (!model)
        return;
    if (model['@Path'].indexOf('Font') !== -1) {
        model['@Data'] = convertFontToDXFont(model['@Data']);
    }
}
export function patchFont(model) {
    if (model['@Font']) {
        model['@Font'] = convertFontToDXFont(model['@Font']);
    }
    return model;
}
export function patchMargins(model) {
    if (model['@Margins']) {
        model['@Margins'] = convertMarginsToDXMargins(model['@Margins']);
    }
    return model;
}
export function patchSubreport(model) {
    if (model['@ReportSourceUrl']) {
        delete model['ReportSource'];
    }
    return model;
}