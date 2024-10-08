﻿/**
* DevExpress Analytics (core\internal\_surfaceHelpers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
export function findSurface(viewModel) {
    return !!viewModel ? viewModel['surface'] : null;
}
export function getControlNewAbsolutePositionOnResize(snapHelper, absolutePosition, ui, delta) {
    const newAbsolutePosition = {
        top: absolutePosition.top + delta.y,
        left: absolutePosition.left + delta.x,
        bottom: absolutePosition.top + ui.originalSize.height,
        right: absolutePosition.left + ui.originalSize.width
    };
    if (delta.x !== 0) {
        newAbsolutePosition.left = snapHelper.snapPosition(newAbsolutePosition.left, false);
    }
    else if (delta.width !== 0) {
        newAbsolutePosition.right = snapHelper.snapPosition(absolutePosition.left + ui.size.width, false);
    }
    if (delta.y !== 0) {
        newAbsolutePosition.top = snapHelper.snapPosition(newAbsolutePosition.top, true);
    }
    else if (delta.height !== 0) {
        newAbsolutePosition.bottom = snapHelper.snapPosition(absolutePosition.top + ui.size.height, true);
    }
    return newAbsolutePosition;
}
function num(v) {
    return parseInt(v, 10) || 0;
}
export function getControlRect(element, control, surface) {
    let curleft = num(element.css('left'));
    const curtop = num(element.css('top'));
    if (surface.rtl()) {
        const posLeft = surface.pageWidth() - surface.margins.left() - element.width();
        if (curleft > posLeft) {
            curleft = posLeft;
        }
    }
    const bounds = element[0].getBoundingClientRect();
    return { top: curtop, left: curleft, width: bounds.width, height: bounds.height };
}
export function minHeightWithoutScroll(element) {
    return Math.min(element.scrollHeight, element.offsetHeight, element.clientHeight) + element.offsetTop;
}
export function chooseBetterPositionOf(html, designer) {
    return designer && (minHeightWithoutScroll(html) < minHeightWithoutScroll(designer) ? window : designer) || window;
}
export function updateSurfaceContentSize(surfaceSize, root, rtl = false) {
    return () => {
        const $root = $.fn.constructor(root).find('.dxrd-designer').eq(0);
        const toolboxWidth = $root.find('.dxrd-toolbox-wrapper:visible').outerWidth() || 0;
        const rightAreaWidth = ($root.find('.dxrd-right-panel:visible').outerWidth() || 0) + ($root.find('.dxrd-right-tabs:visible').outerWidth() || 0);
        const otherWidth = rightAreaWidth + toolboxWidth, surfaceWidth = $root.width() - (otherWidth);
        $root.find('.dxrd-surface-wrapper').eq(0).css({
            'left': rtl ? rightAreaWidth : toolboxWidth,
            'right': !rtl ? rightAreaWidth : toolboxWidth,
            'width': surfaceWidth,
            'bottom': $root.find('.dxrd-navigation-panel-wrapper:visible').outerHeight() || 0
        });
        surfaceSize(surfaceWidth);
    };
}
