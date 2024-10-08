﻿/**
* DevExpress Analytics (property-grid\widgets\bindingsCacheUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addToBindingsCache as addToBindingsCacheInternal, registerBaseBinding as registerBaseBindingInternal } from './internal/_bindingsCache';
export function registerBaseBinding(bindingName, optionsName) {
    registerBaseBindingInternal(bindingName, optionsName);
}
export function addToBindingsCache(bindingText, value) {
    addToBindingsCacheInternal(bindingText, value);
}
