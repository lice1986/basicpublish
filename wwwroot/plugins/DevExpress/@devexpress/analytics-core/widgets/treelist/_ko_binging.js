﻿/**
* DevExpress Analytics (widgets\treelist\_ko_binging.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { TreeListSearchViewModel } from './_treeListSearchViewModel';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
import { addDisposeCallback } from '../../serializer/_internal';
import { initTreeListBinding } from './_binding';
ko.bindingHandlers['treelist'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const options = ko.unwrap(valueAccessor());
        const disposeCallback = initTreeListBinding({
            element: element,
            values: valueAccessor(),
            createChildContext: (viewModel) => {
                const treeListTemplate = options.templateHtml || getTemplate('dx-treelist');
                const $element = $.fn.constructor(element).html(treeListTemplate);
                const childContext = bindingContext.createChildContext(viewModel);
                ko.applyBindings(childContext, $element.children()[0]);
            },
            dragDropHandler: bindingContext.$root.fieldDragHandler
        });
        addDisposeCallback(element, disposeCallback);
        return { controlsDescendantBindings: true };
    }
};
ko.bindingHandlers['treeListSearchPanel'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const values = valueAccessor();
        const template = ko.unwrap(values.template);
        const modelType = ko.unwrap(values.modelType);
        let controllers = ko.unwrap(values.controllers);
        if (!Array.isArray(controllers))
            controllers = [controllers];
        TreeListSearchViewModel.createController(element, controllers, modelType, template);
        return { controlsDescendantBindings: true };
    }
};
