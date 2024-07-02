﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_autoScrolling.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addDisposeCallback } from '@devexpress/analytics-core/analytics-internal';
import dxScrollView from 'devextreme/ui/scroll_view';
import * as $ from 'jquery';
import * as ko from 'knockout';
ko.bindingHandlers['dxAutoScrolling'] = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        const $element = $.fn.constructor(element);
        let rect = null;
        const values = valueAccessor();
        const scrollView = dxScrollView['getInstance'](element);
        if (scrollView) {
            let timeout = null, interval = null;
            const clearTimings = () => {
                timeout && clearTimeout(timeout);
                interval && clearInterval(interval);
                timeout = null;
                interval = null;
            }, scrolling = (inc) => {
                timeout = setTimeout(() => {
                    interval = setInterval(() => {
                        let newPosition = scrollView.scrollTop() + inc;
                        if (newPosition < 0) {
                            newPosition = 0;
                        }
                        scrollView['scrollTo'](newPosition);
                    }, 50);
                }, 500);
            }, move = (event) => {
                if (values.active()) {
                    if (!rect) {
                        rect = element.getBoundingClientRect();
                    }
                    if (event.clientY <= rect.top + 30) {
                        !timeout && scrolling(-30);
                    }
                    else if (event.clientY >= rect.bottom - 30) {
                        !timeout && scrolling(30);
                    }
                    else {
                        clearTimings();
                    }
                }
            }, subscription = values.active.subscribe((newVal) => {
                rect = null;
                clearTimings();
            });
            element.addEventListener('mousemove', move);
            addDisposeCallback(element, function () {
                element.removeEventListener('mousemove', move);
                subscription.dispose();
            });
        }
    }
};
