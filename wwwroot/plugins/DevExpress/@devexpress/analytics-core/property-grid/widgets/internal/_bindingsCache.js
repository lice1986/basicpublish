﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_bindingsCache.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
const cache = {};
function createBaseFunction(controlName, optionsName) {
    return function ($context, $index) {
        const obj = {};
        obj[controlName] = function () {
            if (optionsName === '$data')
                return $context.$data;
            return optionsName === undefined ? undefined : $context.$data[optionsName];
        };
        return obj;
    };
}
export function registerBaseBinding(bindingName, optionsName) {
    addToBindingsCache(!optionsName ? bindingName : `${bindingName}: ${optionsName}`, createBaseFunction(bindingName, optionsName));
}
export function addToBindingsCache(key, value) {
    cache[key] = value;
}
export function getFromCache(key) {
    return cache[key];
}
registerBaseBinding('svgAttrs');
registerBaseBinding('dxButtonWithTemplate', 'options');
registerBaseBinding('dxButton', 'options');
registerBaseBinding('dxCheckBox', 'options');
registerBaseBinding('dxToolbarBase', 'options');
registerBaseBinding('dxToolbar', 'options');
registerBaseBinding('treelist', 'options');
addToBindingsCache('template: \'dxrd-designer\'', function ($context, $element) {
    return { 'template': function () { return 'dxrd-designer'; } };
});
