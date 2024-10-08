﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_sizeUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ZoomAutoBy } from '../constants';
import { getSizeFactor, accessibilityFontSizeZoomFactor, $dx } from '@devexpress/analytics-core/analytics-internal-native';
import { TabPanel } from '@devexpress/analytics-core/analytics-utils-native';
import * as $ from 'jquery';
export function stringToPosition(position) {
    const lowerCased = (position || '').toLowerCase();
    if (!lowerCased || lowerCased === 'default') {
        return null;
    }
    const top = lowerCased.indexOf('top') !== -1;
    const right = lowerCased.indexOf('right') !== -1;
    return { top: top, bottom: !top, right: right, left: !right };
}
export function getDockedElementCallback($targetElement, $viewer, $window, selector, position = null) {
    if (!selector)
        return $.noop;
    return (viewer) => {
        if ($viewer.length === 0)
            $viewer = $.fn.constructor(viewer);
        if ($targetElement.length === 0)
            $targetElement = $viewer.find(selector);
        if ($window.length === 0)
            $window = $.fn.constructor(window);
        if (!position || position.bottom) {
            const elementTop = parseInt($targetElement.css('bottom')) + $targetElement.height();
            const viewerTop = $viewer.offset().top;
            const viewerHeight = $viewer.height();
            const windowContentHeight = $window.height() + $window.scrollTop();
            let result = viewerTop + viewerHeight - windowContentHeight;
            if (result < viewerHeight - elementTop) {
                result = Math.max(0, result);
                const transform = 'translateY(-' + result * accessibilityFontSizeZoomFactor() + 'px)';
                $targetElement.css({
                    '-webkit-transform': transform,
                    'transform': transform
                });
            }
        }
        else {
            const previewWrapper = $viewer.find('.dxrd-preview-wrapper')[0];
            const clientRect = previewWrapper && previewWrapper.getBoundingClientRect();
            if (!clientRect || clientRect.top < 0 && (clientRect.height + clientRect.top < $targetElement.outerHeight()))
                return;
            const translateY = clientRect.top < 0 ? -clientRect.top : 0;
            const transform = 'translateY(' + translateY * accessibilityFontSizeZoomFactor() + 'px)';
            $targetElement.css({
                '-webkit-transform': transform,
                'transform': transform
            });
        }
    };
}
function _getRightAreaWidth($container) {
    const rightAreaWidth = ($container.find('.dxrd-right-panel:visible').outerWidth() || 0) + ($container.find('.dxrd-right-tabs:visible').outerWidth() || 0);
    return isNaN(rightAreaWidth) ? 0 : rightAreaWidth;
}
export function updatePreviewContentSize(reportPreview, root, rtl) {
    let _cashedSizeFactorClass = 'lg';
    return (tabPanelPosition) => {
        const $_root = $dx(root);
        const $root = $_root.find('.dxrd-preview');
        if (!$root.length)
            return;
        const $viewPort = $_root.children('.dx-designer-viewport');
        const sizeFactor = getSizeFactor($_root.outerWidth());
        if (!!$viewPort.length && _cashedSizeFactorClass !== sizeFactor) {
            $viewPort.removeClass('dx-designer-viewport-' + _cashedSizeFactorClass);
            $viewPort.addClass('dx-designer-viewport-' + sizeFactor);
        }
        _cashedSizeFactorClass = sizeFactor;
        const rightAreaWidth = _getRightAreaWidth($root);
        const surfaceWidth = (($root.width() - rightAreaWidth - 10) * accessibilityFontSizeZoomFactor());
        const breadcrumbs = $root.find('.breadcrumbs-wrapper');
        const previewWrapper = $root.find('.dxrd-preview-wrapper');
        let topAreaHeight = 84;
        if (breadcrumbs.element) {
            const padding = 18;
            breadcrumbs.css({ 'width': (surfaceWidth - padding) + 'px' });
            topAreaHeight += $dx(breadcrumbs.element).height() - padding;
        }
        const cssStyleData = (tabPanelPosition === TabPanel.Position.Left) ? { 'right': '', 'left': rightAreaWidth + 'px', top: topAreaHeight + 'px' } : { 'right': rightAreaWidth + 'px', 'left': '', top: topAreaHeight + 'px' };
        previewWrapper.css(cssStyleData);
        reportPreview.previewSize = surfaceWidth;
    };
}
export function updatePreviewZoomWithAutoFit(width, height, element, autoFitBy = ZoomAutoBy.WholePage) {
    const $element = $dx(element);
    const $previewWrapper = $element.closest('.dxrd-preview-wrapper');
    const $preview = $element.closest('.dxrd-preview');
    if ($previewWrapper.length === 0 || $preview.length === 0 || $preview.width() === 0) {
        return 1;
    }
    const surfaceWidth = $preview.width() - _getRightAreaWidth($preview) - 10;
    const topAreaHeight = parseFloat($previewWrapper.css('top').split('px')[0]);
    const designerHeight = $preview.outerHeight();
    const surfaceHeight = designerHeight - topAreaHeight;
    if (autoFitBy === ZoomAutoBy.PageWidth) {
        return (surfaceWidth - 12) / width;
    }
    const heightZoom = surfaceHeight / (height + 6);
    const widthZoom = surfaceWidth / width;
    return Math.min(heightZoom, widthZoom);
}
