﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_ko_mobileBindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { initializeMobilePaginatorBinding, initializeMobileSearchBinding, initializeMobileZoomBinding, initializeSlideBinding } from './_mobileBindings';
import { addDisposeCallback } from '@devexpress/analytics-core/analytics-internal-native';
ko.bindingHandlers['mobileZoom'] = {
    init: (element, valueAccessor) => initializeMobileZoomBinding(element, valueAccessor())
};
ko.bindingHandlers['slide'] = {
    init: (element, valueAccessor) => addDisposeCallback(element, initializeSlideBinding(element, valueAccessor()))
};
ko.bindingHandlers['dxrdMobilePaginator'] = {
    init: (element, valueAccessor) => initializeMobilePaginatorBinding(element, valueAccessor())
};
ko.bindingHandlers['dxrdSearchBar'] = {
    init: (element, valueAccessor) => addDisposeCallback(element, initializeMobileSearchBinding(element, valueAccessor()))
};
