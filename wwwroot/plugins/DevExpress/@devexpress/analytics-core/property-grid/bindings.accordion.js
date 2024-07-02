﻿/**
* DevExpress Analytics (property-grid\bindings.accordion.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import dxScrollView from 'devextreme/ui/scroll_view';
import * as events from 'devextreme/events';
import { koUtils } from '../core/utils/_koUtils';
export function InitAccordion(element, options) {
    const $element = $.fn.constructor(element), $accordionContent = $element.find('.dx-accordion-content').first(), scrollUpdateCallback = () => {
        const $scroll = $element.parents('.dx-scrollview');
        if ($scroll.length > 0) {
            const scrollView = dxScrollView.getInstance($scroll.get(0));
            scrollView && scrollView['update']();
        }
    };
    const accordionButton = $element
        .find('.dx-accordion-header,.dx-accordion-button').get(0);
    const getCollapsed = () => {
        if (options['getCollapsed'])
            return options.getCollapsed();
        return koUtils.unwrap(options.collapsed);
    };
    events.off(accordionButton, 'dxclick');
    const onClickEvent = function () {
        const currentValue = koUtils.unwrap(options.alwaysShow) ? false : !koUtils.unwrap(getCollapsed());
        if (options['setCollapsed']) {
            options.setCollapsed(currentValue);
        }
        else if (koUtils.isSubscribable(options.collapsed)) {
            options.collapsed(currentValue);
        }
        $element.addClass('dx-transition-style');
        if (getCollapsed())
            $element.addClass('dx-accordion-collapsed');
        setTimeout(() => {
            $element.removeClass('dx-accordion-collapsed');
            if (!getCollapsed())
                $element.removeClass('dx-transition-style');
        }, 500);
    };
    events.on(accordionButton, 'dxclick', onClickEvent);
    getCollapsed() ? $accordionContent.hide() : $accordionContent.show();
    if (koUtils.isSubscribable(options.collapsed)) {
        const subscription = options.collapsed.subscribe((newVal) => {
            $accordionContent.slideToggle(options.timeout, () => scrollUpdateCallback());
        });
        return () => {
            events.off(accordionButton, 'dxclick', onClickEvent);
            subscription.dispose();
        };
    }
    else if (options['setCollapsedChangedEvent']) {
        const dispose = options.setCollapsedChangedEvent(() => $accordionContent.slideToggle(options.timeout, () => scrollUpdateCallback()));
        return () => {
            events.off(accordionButton, 'dxclick', onClickEvent);
            dispose();
        };
    }
    else {
        throw Error('Not working!');
    }
}
