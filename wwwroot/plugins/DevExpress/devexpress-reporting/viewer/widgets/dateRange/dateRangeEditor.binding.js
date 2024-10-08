﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.binding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createDateRangeEditor } from './dateRangeEditor';
import * as ko from 'knockout';
import * as $ from 'jquery';
import { getTemplate } from '@devexpress/analytics-core/analytics-utils-native';
import { addDisposeCallback } from '@devexpress/analytics-core/analytics-internal-native';
ko.bindingHandlers['dxrvDateRangeEditor'] = {
    init: (element, valueAccessor, bindings, model, bindingContext) => {
        const rangeEditor = createDateRangeEditor(valueAccessor(), element, model);
        $.fn.constructor(element).children().remove();
        const templateHtml = getTemplate('dxrv-daterange-editor'), $element = $.fn.constructor(element).append(templateHtml);
        const context = bindingContext.createChildContext(rangeEditor.getViewModel());
        ko.applyBindingsToDescendants(context, $element.children()[0]);
        addDisposeCallback(element, () => rangeEditor.dispose());
        return { controlsDescendantBindings: true };
    }
};
