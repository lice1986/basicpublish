﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobileBindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/events/transform';
import 'devextreme/events/pointer';
import { EventProcessor } from './_eventProcessor';
import { on } from 'devextreme/events';
import dxScrollView from 'devextreme/ui/scroll_view';
import { $dx } from '@devexpress/analytics-core/analytics-internal-native';
import { SearchBarModel } from './_mobileSearch';
export function initializeMobileZoomBinding(element, options) {
    let scroll;
    let zoom = options.getZoom();
    on(element, 'dxpinch', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const scale = e['scale'];
        let newZoom = zoom;
        newZoom *= scale;
        newZoom = Math.max(0.15, Math.min(2, newZoom));
        options.setZoom(newZoom);
    });
    on(element, 'dxpinchstart', (e) => {
        scroll = dxScrollView.getInstance(element.getElementsByClassName('dxrd-scrollView-mobile')[0]);
        e.stopPropagation();
        e.preventDefault();
        options.setZoomUpdating(true);
        scroll && scroll.option('disabled', true);
        zoom = options.getZoom();
    });
    on(element, 'dxpinchend', (e) => {
        e.stopPropagation();
        options.setZoomUpdating(false);
        setTimeout(() => {
            scroll && scroll.option('disabled', false);
            scroll && scroll.refresh();
        }, 10);
    });
}
export function initializeSlideBinding(element, options) {
    let isStarted = false;
    const processor = new EventProcessor(element, options);
    on(element, 'dxpointerdown', (e) => {
        processor.start(e);
        isStarted = true;
    });
    on(element, 'dxpointermove', (e) => {
        isStarted && processor.move(e);
    });
    ['dxpointercancel', 'dxpointerleave', 'dxpointerup'].forEach((value) => {
        on(element, value, (e) => {
            if (isStarted) {
                processor.end(e);
                isStarted = false;
            }
        });
    });
    return () => processor.dispose();
}
export function initializeMobileSearchBinding(element, viewModel) {
    const model = viewModel.getModel();
    const $element = $dx(element);
    element.style.display = 'none';
    const $searchText = $element.find('.dxrdp-taptosearch-text');
    const searchBarModel = new SearchBarModel(model, element, $searchText);
    return () => searchBarModel.dispose();
}
export function initializeMobilePaginatorBinding(element, viewModel) {
    const values = viewModel.getModel();
    values.initialize(element);
}
