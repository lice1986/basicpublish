﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ZoomAutoBy } from '../constants';
import { updatePreviewZoomWithAutoFit } from './_sizeUtils';
import { roundingXDecimals, $dx } from '@devexpress/analytics-core/analytics-internal-native';
import { MultipageScrollingThrottle } from '../settings';
export function initializeToViewBinding(previewPage, options) {
    const container = previewPage.closest('.dxrd-report-preview-holder'), dispose = options.setPageActiveChangedEvent((active) => {
        if (active) {
            const pageTop = previewPage.getBoundingClientRect().top;
            if (pageTop < 0 && (pageTop + previewPage.getBoundingClientRect().height < 0) || pageTop >= container.getBoundingClientRect().height) {
                container.scrollTop = container.scrollTop + pageTop;
            }
        }
    });
    return dispose;
}
export function initializeLazyImagesBinding(element, options) {
    let load = null;
    const loadVisibleImages = (time = 300) => {
        load && clearTimeout(load);
        load = setTimeout(function () {
            if (!options.getEnabled()) {
                return;
            }
            const visibleArea = element.getBoundingClientRect().height + 100;
            for (let i = 0; i < element.children.length; i++) {
                const previewPage = element.children[i], rect = previewPage.getBoundingClientRect(), pageTop = rect.top;
                if (visibleArea > pageTop && pageTop >= 0 || pageTop < 0 && pageTop + rect.height > -100) {
                    const previewPageModel = options.getPage(i);
                    if ((previewPageModel === null || previewPageModel === void 0 ? void 0 : previewPageModel.isClientVisible) === false) {
                        options.setPageVisibility(previewPageModel.getViewModel(), true);
                    }
                }
            }
        }, time);
    };
    const dispose = options.setLoadVisibleImagesCallback(loadVisibleImages);
    const scrollLoad = () => loadVisibleImages(MultipageScrollingThrottle());
    element.addEventListener('scroll', scrollLoad);
    loadVisibleImages(500);
    return () => {
        element.removeEventListener('scroll', scrollLoad);
        dispose();
    };
}
export function initializeTextCopierBinding(element, options) {
    const keyDownHandler = function (e) {
        const value = options.viewModel.getSelectedContent();
        const target = e.target;
        if (!value || !(e.ctrlKey || e.metaKey)
            || target.matches('textarea')
            || target.matches('input')
            || window.getSelection && window.getSelection() && window.getSelection().toString()
            || document['selection'] && document['selection'].createRange().text) {
            return;
        }
        const clipboardContainer = document.querySelector('#clipboard-container');
        $dx(clipboardContainer).empty().show();
        const textArea = document.createElement('textarea');
        textArea.id = 'clipboard';
        textArea.value = value;
        clipboardContainer.appendChild(textArea);
        textArea.focus();
        textArea.select();
    };
    const keyUpHandler = function (e) {
        const target = e.target;
        if (target instanceof HTMLElement && target.matches('#clipboard')) {
            $dx('#clipboard-container').empty().hide();
        }
    };
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    return () => {
        document.removeEventListener('keydown', keyDownHandler);
        document.removeEventListener('keyup', keyUpHandler);
    };
}
export function initializeAutoFitBinding(element, autoFitOptions) {
    const updateZoom = () => {
        const options = autoFitOptions.getPageSizeConfiguration();
        const autoFitBy = options.autoFitBy;
        if (autoFitBy != ZoomAutoBy.None) {
            if (options.skipIfInvisible && !$dx(element).isVisible())
                return;
            const newZoom = roundingXDecimals(updatePreviewZoomWithAutoFit(options.width, options.height, element, autoFitBy), true);
            Promise.resolve().then(() => autoFitOptions.setZoom(Math.max(newZoom, 0.1)));
        }
    };
    updateZoom();
    return autoFitOptions.setAutoFitChangedEvent(updateZoom);
}
export function initializeChildStyleBinding(element, values) {
    $dx(element).find(values.selector).css(values.style);
}
export function initializeViewerExportBinding(element, exportHandlerViewModel) {
    const exportHandler = exportHandlerViewModel.getModel();
    const exportFrame = document.createElement('iframe');
    exportFrame.name = exportHandler.exportingFrameName;
    exportFrame.setAttribute('role', 'none');
    element.querySelector('.dxrd-visually-hidden').appendChild(exportFrame);
    exportHandler.exportingFrame = exportFrame;
    exportHandler.postingForm = element.querySelector('form');
}
