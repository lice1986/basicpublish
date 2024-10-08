﻿/**
* DevExpress Analytics (core\internal\_resizable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { Disposable } from '../../serializer/disposable';
import { extend } from '../../serializer/_utils';
import { koUtils } from '../utils/_koUtils';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from './_utils.unitsConvertation';
export function initializeBaseResizableOptions(values) {
    return extend({
        handles: koUtils.isSubscribable(values.handles) ? values.handles : (values.handles || 'all'),
        ghost: false,
        start: () => void 0,
        stop: () => void 0,
        resize: () => void 0
    }, values);
}
export function initializeResize(element, options) {
    const resizable = new Resizable(element, options).initialize();
    return () => {
        resizable.dispose();
    };
}
export class Resizable extends Disposable {
    constructor(_element, _options) {
        super();
        this._element = _element;
        this._options = _options;
        this.handleClass = 'ui-resizable-handle';
        this.handleClassSelector = `.${this.handleClass}`;
        this.resizableElementClass = 'ui-resizable';
        this._defaultMinSize = 1;
        this._bodyEvents = {
            move: null,
            up: null
        };
        this._resizeDirection = null;
        this._resizeHandles = ['w', 'e', 's', 'n', 'se', 'sw', 'ne', 'nw'];
    }
    _initResize(event) {
        this._startResizeMousePosition = {
            left: event.pageX,
            top: event.pageY
        };
        this._resizeDirection = getResizeDirection(event.target.classList);
        this._addClassToElement('ui-resizable-resizing');
        const bounds = this._element.getBoundingClientRect();
        const $el = $.fn.constructor(this._element);
        this._element.dataset.originalLeftPosition = $el.css('left');
        this._element.dataset.originalTopPosition = $el.css('top');
        this._element.dataset.originalWidth = convertToCssPixelUnits(bounds.width);
        this._element.dataset.originalHeight = convertToCssPixelUnits(bounds.height);
        this._element.dataset.originalLeftMousePosition = convertToCssPixelUnits(event.pageX);
        this._element.dataset.originalTopMousePosition = convertToCssPixelUnits(event.pageY);
        this._bodyEvents.move = event => this._mouseMove(event);
        this._bodyEvents.up = event => this._mouseUp(event);
        document.body.addEventListener('mousemove', this._bodyEvents.move);
        document.body.addEventListener('mouseup', this._bodyEvents.up);
    }
    _mouseMove(event) {
        const leftButtonPressed = event.which === 1;
        if (leftButtonPressed) {
            const boundsDiff = this._getBoundsDiff(event);
            this._options.resize(event, this._element, boundsDiff);
        }
    }
    _mouseUp(event) {
        this._bodyEvents.move && document.body.removeEventListener('mousemove', this._bodyEvents.move);
        this._bodyEvents.up && document.body.removeEventListener('mouseup', this._bodyEvents.up);
        this._options.stop();
        Resizable.inProcess = false;
        this._removeClassFromElement('ui-resizable-resizing');
        this._startResizeMousePosition = null;
        this._resizeDirection = null;
    }
    _mouseDown(event) {
        Resizable.inProcess = true;
        this._initResize(event);
        this._options.start(event, this._element);
    }
    _initResizeHandle(className, handleResizeEvent) {
        const handleDiv = document.createElement('div');
        handleDiv.classList.add(this.handleClass);
        handleDiv.style.zIndex = '95';
        handleDiv.classList.add(className);
        handleDiv.addEventListener('mousedown', handleResizeEvent);
        this._element.append(handleDiv);
    }
    _addClassToElement(className) {
        this._element.classList.add(className);
    }
    _removeClassFromElement(className) {
        this._element.classList.remove(className);
    }
    _getBoundsDiff(event) {
        let diffWidth = 0;
        let diffHeight = 0;
        let leftDiff = 0;
        let topDiff = 0;
        const originalHeight = convertFromCssPixelUnits(this._element.dataset.originalHeight);
        const originalWidth = convertFromCssPixelUnits(this._element.dataset.originalWidth);
        const updateHeightFunc = (resizeFromTop) => {
            const minHeight = this._element.style.minHeight ? convertFromCssPixelUnits(this._element.style.minHeight) : this._defaultMinSize;
            const resizeDistance = (this._startResizeMousePosition.top - event.pageY) * (resizeFromTop ? 1 : -1);
            const newHeightIsLessThanMinHeight = minHeight > originalHeight + resizeDistance;
            if (newHeightIsLessThanMinHeight) {
                const respectedDiff = originalHeight - minHeight;
                if (resizeFromTop)
                    topDiff = respectedDiff;
                diffHeight = -respectedDiff;
                return;
            }
            diffHeight = resizeDistance;
            if (resizeFromTop) {
                topDiff = -diffHeight;
            }
        };
        const updateWidthFunc = (resizeFromLeft) => {
            const minWidth = this._element.style.minWidth ? convertFromCssPixelUnits(this._element.style.minWidth) : this._defaultMinSize;
            const resizeDistance = (this._startResizeMousePosition.left - event.pageX) * (resizeFromLeft ? 1 : -1);
            const newWidthIsLessThanMinWidth = minWidth > originalWidth + resizeDistance;
            if (newWidthIsLessThanMinWidth) {
                const respectedDiff = originalWidth - minWidth;
                if (resizeFromLeft)
                    leftDiff = respectedDiff;
                diffWidth = -respectedDiff;
                return;
            }
            diffWidth = resizeDistance;
            if (resizeFromLeft) {
                leftDiff = -diffWidth;
            }
        };
        const updateHeight = this._resizeDirection && /sw|se|nw|ne|s|n/.test(this._resizeDirection);
        const updateWidth = this._resizeDirection && /sw|se|nw|ne|e|w/.test(this._resizeDirection);
        if (updateHeight)
            updateHeightFunc(/nw|ne|n/.test(this._resizeDirection));
        if (updateWidth)
            updateWidthFunc(/sw|nw|w/.test(this._resizeDirection));
        const boundsDiff = {
            width: diffWidth,
            height: diffHeight,
            left: leftDiff,
            top: topDiff
        };
        return boundsDiff;
    }
    initialize() {
        let mousedown = event => this._mouseDown(event);
        let addElementHandles = (handles) => {
            if (!handles)
                return;
            this._addClassToElement(this.resizableElementClass);
            $.fn.constructor(this._element).children(this.handleClassSelector).remove();
            const elementResizeHandles = handles === 'all' ? this._resizeHandles : handles.split(',');
            elementResizeHandles.forEach(handle => {
                this._initResizeHandle(`ui-resizable-${handle}`, mousedown);
            });
        };
        addElementHandles(koUtils.unwrap(this._options.handles));
        if (koUtils.isSubscribable(this._options.handles)) {
            const subscribe = this._options.handles.subscribe((newHandles) => {
                this._removeClassFromElement(this.resizableElementClass);
                const oldElementHandles = this._element.querySelectorAll(this.handleClassSelector);
                oldElementHandles.forEach(handle => handle.removeEventListener('mousedown', mousedown));
                $.fn.constructor(this._element).children(this.handleClassSelector).remove();
                addElementHandles(newHandles);
            });
            this._disposables.push(subscribe);
        }
        this._disposables.push({
            dispose: () => {
                addElementHandles = null;
                const elementHandles = this._element.querySelectorAll(this.handleClass);
                elementHandles.forEach(handle => handle.removeEventListener('mousedown', mousedown));
                this._element.removeEventListener('mousedown', mousedown);
                mousedown = null;
                this._element = null;
                this._options = null;
            }
        });
        return this;
    }
}
Resizable.inProcess = false;
export function getResizeDirection(currentClassList) {
    for (let i = 0; i < currentClassList.length; i++) {
        if (currentClassList[i] !== 'ui-resizable-handle' && currentClassList[i].indexOf('ui-resizable-') === 0)
            return currentClassList[i].slice('ui-resizable-'.length, currentClassList[i].length);
    }
}
