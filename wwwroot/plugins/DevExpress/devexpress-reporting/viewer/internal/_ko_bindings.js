﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_ko_bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { initializeAutoFitBinding, initializeChildStyleBinding, initializeLazyImagesBinding, initializeTextCopierBinding, initializeToViewBinding, initializeViewerExportBinding } from './_bindings';
import { $dx, addDisposeCallback } from '@devexpress/analytics-core/analytics-internal-native';
import { getTemplate } from '@devexpress/analytics-core/analytics-utils-native';
import { initializeBrickSelectionProg } from './_previewSelection';
function wrapWithDisposeCallback(element, disposeFunc) {
    addDisposeCallback(element, disposeFunc);
}
ko.bindingHandlers['toView'] = {
    init: (element, valueAccessor) => wrapWithDisposeCallback(element, initializeToViewBinding(element, valueAccessor()))
};
ko.bindingHandlers['lazyImages'] = {
    init: (element, valueAccessor) => wrapWithDisposeCallback(element, initializeLazyImagesBinding(element, valueAccessor()))
};
ko.bindingHandlers['textCopier'] = {
    init: (element, valueAccessor, allBindings, viewModel, bindingContext) => wrapWithDisposeCallback(element, initializeTextCopierBinding(element, { viewModel }))
};
ko.bindingHandlers['autoFit'] = {
    init: (element, valueAccessor) => wrapWithDisposeCallback(element, initializeAutoFitBinding(element, valueAccessor()))
};
ko.bindingHandlers['childStyle'] = {
    init: (element, valueAccessor) => initializeChildStyleBinding(element, valueAccessor())
};
ko.bindingHandlers['brick-selection-prog'] = {
    init: function (element, valueAccessor) {
        addDisposeCallback(element, initializeBrickSelectionProg(element, valueAccessor()));
    }
};
ko.bindingHandlers['dxViewerExport'] = {
    init: function (element, valueAccessor) {
        const templateHtml = getTemplate('dxrd-export-tool-content');
        $dx(element).append(templateHtml);
        initializeViewerExportBinding(element, valueAccessor());
    }
};