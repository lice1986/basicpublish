﻿/**
* DevExpress Analytics (widgets\bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { addDisposeCallback } from '../serializer/_internal';
ko.bindingHandlers['focus'] = {
    init: function (element, valueAccessor) {
        const visible = valueAccessor().on || valueAccessor();
        const subscription = visible.subscribe((newVal) => {
            if (newVal) {
                setTimeout(() => {
                    $.fn.constructor(element).find(':input').focus();
                }, 1);
            }
        });
        addDisposeCallback(element, function () {
            subscription.dispose();
        });
    }
};
ko.bindingHandlers['svgAttrs'] = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        element.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    }
};
