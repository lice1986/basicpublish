﻿/**
* DevExpress Analytics (core\internal\_draggable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/disposable';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from './_utils.unitsConvertation';
import { Resizable } from './_resizable';
export class Draggable extends Disposable {
    constructor(_element, _options) {
        super();
        this._element = _element;
        this._options = _options;
        this._bodyEvents = { move: null, up: null };
        this._windowEvents = { up: null };
        this._originalDragStartCoordinates = null;
        this._originalElementPosition = null;
        this._dragInitialized = false;
        this._scrollableContainer = null;
        this._draggableElementClass = 'ui-draggable';
        this._minDragDistance = 1;
        let mousedown = event => this._canDrag() && this._mouseDown(event);
        this._addClassToElement(this._draggableElementClass);
        this._element.addEventListener('mousedown', mousedown);
        this._disposables.push({
            dispose: () => {
                this._element.removeEventListener('mousedown', mousedown);
                mousedown = null;
                this._element = null;
                this._options = null;
            }
        });
    }
    _initScrollContainer() {
        const containment = this._options.containment;
        if (containment && containment[0].classList.contains('dxrd-ghost-container')) {
            this._scrollableContainer = containment.find('.dx-scrollable-container')[0];
        }
    }
    _initDrag(event) {
        this._startRect = {
            left: event.pageX,
            top: event.pageY
        };
        this._bodyEvents.move = event => this._canDrag() && this._mouseMove(event);
        this._windowEvents.up = event => this._canDrag() && this._mouseUp(event);
        document.body.addEventListener('mousemove', this._bodyEvents.move);
        window.addEventListener('mouseup', this._windowEvents.up);
        this._initScrollContainer();
    }
    _addClassToElement(className) {
        this._element.classList.add(className);
    }
    _calculateElementPosition(dragDeltaLeft, dragDeltaTop) {
        var _a, _b;
        let left = this._originalElementPosition.left - dragDeltaLeft - (((_a = this._scrollableContainer) === null || _a === void 0 ? void 0 : _a.scrollLeft) || 0);
        let top = this._originalElementPosition.top - dragDeltaTop - (((_b = this._scrollableContainer) === null || _b === void 0 ? void 0 : _b.scrollTop) || 0);
        const boundary = this._options.boundary;
        if (boundary) {
            left = left < boundary.left ? boundary.left : left > boundary.right ? boundary.right : left;
            top = top < boundary.top ? boundary.top : top > boundary.bottom ? boundary.bottom : top;
        }
        return { left, top };
    }
    _mouseMove(event) {
        if (Resizable.inProcess || !this._startRect)
            return;
        const leftButtonPressed = event.which === 1;
        if (!leftButtonPressed || !this.shouldStartDrag(event))
            return;
        if (!this._dragInitialized) {
            this._dragInitialized = true;
            this._options.helper && (this._ghostContainer = this._options.helper(event, this._element));
            if (this._ghostContainer)
                this._element.ghostContainer = this._ghostContainer[0];
            this._originalDragStartCoordinates = { left: this._element.dataset.startDragWithOffset ? event.pageX : this._startRect.left, top: this._element.dataset.startDragWithOffset ? event.pageY : this._startRect.top };
            this._originalElementPosition = { left: this._ghostContainer ? convertFromCssPixelUnits(this._ghostContainer[0].dataset.startLeftPosition) : event.pageX, top: this._ghostContainer ? convertFromCssPixelUnits(this._ghostContainer[0].dataset.startTopPosition) : event.pageY };
            this._element.dataset.leftPosition = convertToCssPixelUnits(this._originalElementPosition.left);
            this._element.dataset.topPosition = convertToCssPixelUnits(this._originalElementPosition.top);
            this._options.start(event, this._element);
        }
        const dragDeltaLeft = this._originalDragStartCoordinates.left - event.pageX;
        const dragDeltaTop = this._originalDragStartCoordinates.top - event.pageY;
        const position = this._calculateElementPosition(dragDeltaLeft, dragDeltaTop);
        this._element.dataset.leftPosition = convertToCssPixelUnits(position.left);
        this._element.dataset.topPosition = convertToCssPixelUnits(position.top);
        if (this._ghostContainer) {
            this._ghostContainer[0].style.left = this._element.dataset.leftPosition;
            this._ghostContainer[0].style.top = this._element.dataset.topPosition;
        }
        this._options.drag(event, this._element);
    }
    shouldStartDrag(event) {
        return Math.abs(this._startRect.left - event.pageX) >= this._minDragDistance || Math.abs(this._startRect.top - event.pageY) >= this._minDragDistance;
    }
    _mouseUp(event) {
        if (Resizable.inProcess)
            return;
        Draggable.inProcess = false;
        this._bodyEvents.move && document.body.removeEventListener('mousemove', this._bodyEvents.move);
        this._windowEvents.up && window.removeEventListener('mouseup', this._windowEvents.up);
        if (this._dragInitialized) {
            this._dragInitialized = false;
            this._ghostContainer && this._ghostContainer.remove();
            this._ghostContainer = null;
            this._scrollableContainer = null;
            this._options.stop(event, this._element);
        }
        this._startRect = null;
    }
    _mouseDown(event) {
        event.stopPropagation();
        if (Resizable.inProcess)
            return;
        Draggable.inProcess = true;
        this._initDrag(event);
    }
    _canDrag() {
        var _a;
        return ((_a = (this._options.disabled && !this._options.disabled())) !== null && _a !== void 0 ? _a : true);
    }
}
Draggable.inProcess = false;
