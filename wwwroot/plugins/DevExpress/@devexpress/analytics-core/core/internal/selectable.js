﻿/**
* DevExpress Analytics (core\internal\selectable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxPopup from 'devextreme/ui/popup';
import * as $ from 'jquery';
import { Disposable } from '../../serializer/disposable';
import { DragDropHandler } from '../dragDrop/_dragDropHandler';
import { Draggable } from './_draggable';
import { Resizable } from './_resizable';
function rectIntersection(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}
export class SelectableElement extends Disposable {
    constructor(_element, _options) {
        super();
        this._element = _element;
        this._options = _options;
        this.isSelected = false;
        this.bounds = _element.getBoundingClientRect();
        this._disposables.push({
            dispose: () => {
                this._element = null;
                this._options = null;
                this.bounds = null;
            }
        });
    }
    updateSelection(currentRect, event) {
        const isSelected = rectIntersection(this.bounds, currentRect);
        if (isSelected != this.isSelected) {
            isSelected ? this._options.selecting(event, this._element) : this._options.unselecting(event, this._element);
            this.isSelected = isSelected;
        }
    }
}
export class Selectable extends Disposable {
    constructor(_element, _options) {
        super();
        this._element = _element;
        this._options = _options;
        this._elements = [];
        this._bodyEvents = {
            move: null,
            up: null
        };
        this._minSelectDistance = 2;
        let mousemove = event => this._mouseMove(event);
        let mouseup = event => this._mouseUp(event);
        let mousedown = event => this._mouseDown(event);
        this._element.addEventListener('mousemove', mousemove);
        this._element.addEventListener('mouseup', mouseup);
        this._element.addEventListener('mousedown', mousedown);
        this._$window = $.fn.constructor(window);
        this._disposables.push({
            dispose: () => {
                this._element.removeEventListener('mousemove', mousemove);
                this._element.removeEventListener('mouseup', mouseup);
                this._element.removeEventListener('mousedown', mousedown);
                mousemove = null;
                mouseup = null;
                mousedown = null;
                this._$window = null;
                this._element = null;
                this._options = null;
            }
        });
    }
    _clearElements() {
        this._elements.forEach(x => x.dispose());
        this._elements = [];
    }
    _collectElements() {
        this._clearElements();
        const elements = document.getElementsByClassName(this._options.filter.substr(1));
        for (let i = 0; i < elements.length; i++) {
            this._elements.push(new SelectableElement(elements[i], this._options));
        }
    }
    _updateSelectionContent(event) {
        if (this._startRect.left >= event.pageX) {
            this._$selectionContent.css('left', event.pageX);
            this._$selectionContent.css('right', this._startRect.right);
        }
        else {
            this._$selectionContent.css('left', this._startRect.left);
            this._$selectionContent.css('right', this._$window.width() - event.pageX);
        }
        if (this._startRect.top >= event.pageY) {
            this._$selectionContent.css('top', event.pageY);
            this._$selectionContent.css('bottom', this._startRect.bottom);
        }
        else {
            this._$selectionContent.css('top', this._startRect.top);
            this._$selectionContent.css('bottom', this._$window.height() - event.pageY);
        }
        const currentRect = this._$selectionContent[0].getBoundingClientRect();
        for (let i = 0; i < this._elements.length; i++) {
            this._elements[i].updateSelection(currentRect, event);
        }
    }
    _initStartRect(event) {
        this._startRect = {
            left: event.pageX,
            top: event.pageY,
            right: this._$window.width() - event.pageX,
            bottom: this._$window.height() - event.pageY
        };
    }
    _mouseMove(event) {
        setTimeout(() => {
            if (DragDropHandler.started() || Selectable.disabled || Resizable.inProcess || !this._startRect)
                return;
            const leftButtonPressed = event.which === 1;
            if (leftButtonPressed) {
                if (!this._$selectionContent) {
                    if (this.shouldStartSelect(event)) {
                        this._options.start(event);
                        Selectable.inProcess = true;
                        this._$selectionContent = $.fn.constructor('<div />').appendTo(document.body);
                        this._$selectionContent.addClass('dxrd-selection-content ui-selectable-helper');
                        if (dxPopup.prototype['_zIndexInitValue'])
                            this._$selectionContent.css('z-index', dxPopup.prototype['_zIndexInitValue']() + 100);
                        this._updateSelectionContent(event);
                        this._bodyEvents.move = event => this._mouseMove(event);
                        this._bodyEvents.up = event => this._mouseUp(event);
                        document.body.addEventListener('mousemove', this._bodyEvents.move);
                        document.body.addEventListener('mouseup', this._bodyEvents.up);
                    }
                }
                else {
                    this._updateSelectionContent(event);
                }
            }
        }, 1);
    }
    shouldStartSelect(event) {
        return Math.abs(this._startRect.left - event.pageX) >= this._minSelectDistance || Math.abs(this._startRect.top - event.pageY) >= this._minSelectDistance;
    }
    _mouseUp(event) {
        if (Selectable.disabled || Resizable.inProcess || Draggable.inProcess)
            return;
        this._options.stop();
        this._$selectionContent && this._$selectionContent.remove();
        this._$selectionContent = null;
        this._bodyEvents.move && document.body.removeEventListener('mousemove', this._bodyEvents.move);
        this._bodyEvents.up && document.body.removeEventListener('mouseup', this._bodyEvents.up);
        this._startRect = null;
        this._clearElements();
        Selectable.inProcess = false;
    }
    _mouseDown(event) {
        if (Selectable.disabled || Resizable.inProcess || Draggable.inProcess)
            return;
        this._initStartRect(event);
        this._collectElements();
    }
}
Selectable.inProcess = false;
Selectable.disabled = false;
