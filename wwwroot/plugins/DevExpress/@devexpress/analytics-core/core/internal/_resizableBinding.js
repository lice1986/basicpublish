﻿/**
* DevExpress Analytics (core\internal\_resizableBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { getControlRect, getControlNewAbsolutePositionOnResize } from './_surfaceHelpers';
import { Size } from '../elements/size';
import { addDisposeCallback } from '../../serializer/_internal';
import { extend } from '../../serializer/_utils';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from './_utils.unitsConvertation';
import { getResizeDirection, initializeBaseResizableOptions, initializeResize } from './_resizable';
ko.bindingHandlers['resizable'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const values = valueAccessor();
        const $element = $.fn.constructor(element), $parent = $element.closest('.dx-designer'), resizableDirections = { 'north': 'n', 'east': 'e', 'south': 's', 'west': 'w' };
        let currentDirection = null, $selectedNodes = null, calculateSizes = [], absolutePosition = null;
        const options = extend(initializeBaseResizableOptions(valueAccessor()), {
            stop: function (event) {
                $selectedNodes.each((_, el) => {
                    const context = ko.contextFor(el), control = context.$data, surface = context.$root.surface(), $el = $.fn.constructor(el);
                    const rect = control.rect();
                    let newRect = getControlRect($el, control, surface);
                    newRect = {
                        top: currentDirection.indexOf(resizableDirections.north) !== -1 ? newRect.top : rect.top,
                        left: currentDirection.indexOf(resizableDirections.west) !== -1 ? newRect.left : rect.left,
                        width: currentDirection.indexOf(resizableDirections.east) !== -1 || currentDirection.indexOf(resizableDirections.west) !== -1 ? newRect.width : rect.width,
                        height: currentDirection.indexOf(resizableDirections.south) !== -1 || currentDirection.indexOf(resizableDirections.north) !== -1 ? newRect.height : rect.height,
                    };
                    calculateSizes.push(() => {
                        if (control.canSetRect && !control.canSetRect(newRect)) {
                            if (el.dataset.originalLeftPosition && el.dataset.originalTopPosition) {
                                $el.css('top', el.dataset.originalTopPosition);
                                $el.css('left', el.dataset.originalLeftPosition);
                            }
                            if (el.dataset.originalWidth && el.dataset.originalHeight) {
                                $el.css('width', el.dataset.originalWidth);
                                $el.css('height', el.dataset.originalHeight);
                            }
                        }
                        else {
                            control.rect(newRect);
                            if (JSON.stringify(rect) === JSON.stringify(newRect)) {
                                $el.css({
                                    left: rect.left,
                                    top: rect.top,
                                    width: rect.width,
                                    height: rect.height
                                });
                            }
                        }
                        el.dataset.originalLeftPosition = void 0;
                        el.dataset.originalTopPosition = void 0;
                        el.dataset.originalWidth = void 0;
                        el.dataset.originalHeight = void 0;
                    });
                });
                calculateSizes.forEach(c => c());
                calculateSizes = [];
                currentDirection = null;
                values.stopped();
                values.started = false;
                if (values.snapHelper) {
                    values.snapHelper.deactivateSnapLines();
                }
            },
            start: (event) => {
                currentDirection = getResizeDirection(event.target.classList);
                values.started = true;
                values.starting(event);
                $selectedNodes = values.$selectedNodes || $.fn.constructor('.dxrd-viewport .dxrd-selected').filter(':visible');
                $selectedNodes
                    .each((_, el) => {
                    const $el = $.fn.constructor(el);
                    const bounds = el.getBoundingClientRect();
                    el.dataset.originalLeftPosition = $el.css('left');
                    el.dataset.originalTopPosition = $el.css('top');
                    el.dataset.originalWidth = convertToCssPixelUnits(bounds.width);
                    el.dataset.originalHeight = convertToCssPixelUnits(bounds.height);
                });
                const elementOffset = $element.offset();
                const ghostContainerOffset = $parent.find('.dxrd-ghost-container').offset();
                if (!ghostContainerOffset) {
                    absolutePosition = elementOffset;
                }
                else {
                    absolutePosition = {
                        top: elementOffset.top - ghostContainerOffset.top,
                        left: elementOffset.left - ghostContainerOffset.left
                    };
                }
                if (values.snapHelper) {
                    values.snapHelper.updateSnapLines(viewModel);
                }
            },
            resize: (event, element, boundsDiff) => {
                event.stopPropagation();
                const dw = boundsDiff.width;
                const dh = boundsDiff.height;
                const dx = boundsDiff.left;
                const dy = boundsDiff.top;
                if (values.forceResize) {
                    values.forceResize({ size: new Size(element.offsetWidth, element.offsetHeight), delta: { dx: dx, dy: dy, dw: dw, dh: dh }, element });
                    return;
                }
                if (!element.dataset.originalLeftPosition || !element.dataset.originalTopPosition || !element.dataset.originalWidth || !element.dataset.originalHeight)
                    return;
                const mainSelectionOriginalSize = getOriginalSizeNum(element);
                const mainSelectionOriginalPosition = getOriginalPositionNum(element);
                if (event.altKey) {
                    values.snapHelper && values.snapHelper.deactivateSnapLines();
                }
                else if (values.snapHelper && $selectedNodes.length === 1) {
                    const newWidth = mainSelectionOriginalSize.width + dw;
                    const newHeight = mainSelectionOriginalSize.height + dh;
                    const elementSizeInfo = {
                        originalSize: { width: mainSelectionOriginalSize.width, height: mainSelectionOriginalSize.height },
                        size: { width: newWidth, height: newHeight }
                    };
                    const newAbsolutePosition = getControlNewAbsolutePositionOnResize(values.snapHelper, absolutePosition, elementSizeInfo, { x: dx, y: dy, width: dw, height: dh });
                    values.snapHelper.activateSnapLines(newAbsolutePosition);
                    const resizedBounds = getResizedBounds(mainSelectionOriginalPosition, mainSelectionOriginalSize, boundsDiff);
                    const snapBounds = {
                        left: mainSelectionOriginalPosition.left + newAbsolutePosition.left - absolutePosition.left,
                        top: mainSelectionOriginalPosition.top + newAbsolutePosition.top - absolutePosition.top,
                        width: newAbsolutePosition.right - newAbsolutePosition.left,
                        height: newAbsolutePosition.bottom - newAbsolutePosition.top
                    };
                    if (!boundsAreEqual(snapBounds, resizedBounds)) {
                        $element.css(snapBounds);
                        return;
                    }
                }
                $selectedNodes.each(function (key, el) {
                    if (el === event.target)
                        return;
                    const resizedBounds = getResizedBounds(getOriginalPositionNum(el), getOriginalSizeNum(el), boundsDiff);
                    el.style.left = convertToCssPixelUnits(resizedBounds.left);
                    el.style.top = convertToCssPixelUnits(resizedBounds.top);
                    el.style.width = convertToCssPixelUnits(resizedBounds.width);
                    el.style.height = convertToCssPixelUnits(resizedBounds.height);
                });
            }
        }, ko.unwrap(values));
        const subscription = null;
        if (!values.disabled) {
        }
        const disposeFunction = initializeResize(element, options);
        addDisposeCallback(element, () => {
            disposeFunction();
            element = null;
            subscription && subscription.dispose();
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        const minWidthOption = ko.unwrap(valueAccessor().minimumWidth);
        if (minWidthOption) {
            element.style.minWidth = convertToCssPixelUnits(minWidthOption);
        }
        const minHeightOption = ko.unwrap(valueAccessor().minimumHeight);
        if (minHeightOption) {
            element.style.minHeight = convertToCssPixelUnits(minHeightOption);
        }
        const getElementHandles = (element) => Array.from(element.children).filter(function (child) {
            return child.classList.contains('ui-resizable-handle');
        });
        const maxWidth = ko.unwrap(valueAccessor().maximumWidth);
        if (maxWidth) {
            element.style.maxWidth = convertToCssPixelUnits(maxWidth);
        }
        const handleClassName = valueAccessor().handleClassName;
        handleClassName && getElementHandles(element).forEach((handle) => handle.classList.add(handleClassName));
        const disabled = !!(ko.unwrap(valueAccessor().disabled) || ko.unwrap(viewModel.locked));
        getElementHandles(element).forEach((handle) => handle.style.display = disabled ? 'none' : 'block');
    }
};
ko.bindingHandlers['resizableReportMargins'] = {
    init: function (element, valueAccessor) {
        valueAccessor();
    }
};
function getOriginalPositionNum(element) {
    return {
        left: convertFromCssPixelUnits(element.dataset.originalLeftPosition),
        top: convertFromCssPixelUnits(element.dataset.originalTopPosition)
    };
}
function getOriginalSizeNum(element) {
    return {
        width: convertFromCssPixelUnits(element.dataset.originalWidth),
        height: convertFromCssPixelUnits(element.dataset.originalHeight)
    };
}
function getResizedBounds(originalPosition, originalSize, boundsDiff) {
    return {
        left: originalPosition.left + boundsDiff.left,
        top: originalPosition.top + boundsDiff.top,
        width: originalSize.width + boundsDiff.width,
        height: originalSize.height + boundsDiff.height
    };
}
function boundsAreEqual(bounds1, bounds2) {
    return bounds1.left === bounds2.left
        && bounds1.top === bounds2.top
        && bounds1.width === bounds2.width
        && bounds1.height === bounds2.height;
}
