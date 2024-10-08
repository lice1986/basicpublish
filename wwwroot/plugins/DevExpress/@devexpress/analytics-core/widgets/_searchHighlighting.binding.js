﻿/**
* DevExpress Analytics (widgets\_searchHighlighting.binding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { addDisposeCallback } from '../serializer/_internal';
import { HighlightEngine } from './_searchHighlighting';
export function cloneHtmlBinding(data, element, valueAccessor, allBindings, viewModel, bindingContext) {
    addDisposeCallback(element, function () {
        data.dispose();
    });
    setTimeout(() => {
        let isInitialized = false;
        ko.computed({
            read: () => {
                if (!isInitialized && ko.bindingHandlers['html'].init) {
                    ko.bindingHandlers['html'].init(element, () => { return data.content; }, allBindings, viewModel, bindingContext);
                    isInitialized = true;
                }
                if (ko.bindingHandlers['html'].update) {
                    ko.bindingHandlers['html'].update(element, () => {
                        data.update(valueAccessor());
                        return data.content;
                    }, allBindings, viewModel, bindingContext);
                }
            },
            disposeWhenNodeIsRemoved: element
        });
    }, 1);
}
ko.bindingHandlers['searchHighlighting'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        cloneHtmlBinding(new HighlightEngine(valueAccessor()), element, valueAccessor, allBindings, viewModel, bindingContext);
    }
};
