﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewSelection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxPopup from 'devextreme/ui/popup';
import * as $ from 'jquery';
function rectIntersection(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}
export class PreviewSelection {
    constructor(_element, _page, _click) {
        this._element = _element;
        this._page = _page;
        this._click = _click;
        this._bodyEvents = {
            move: null,
            up: null
        };
        this.dispose = () => this._dispose && this._dispose();
        this._$element = $.fn.constructor(this._element);
        let mousemove = event => this._mouseMove(event);
        let mouseup = event => this._mouseUp(event);
        let mousedown = event => this._mouseDown(event);
        this._element.addEventListener('mousemove', mousemove);
        this._element.addEventListener('mouseup', mouseup);
        this._element.addEventListener('mousedown', mousedown);
        this._dispose = () => {
            this._element.removeEventListener('mousemove', mousemove);
            this._element.removeEventListener('mouseup', mouseup);
            this._element.removeEventListener('mousedown', mousedown);
            this._dispose = null;
            this._click = null;
            this._page = null;
            this._element = null;
            mousemove = null;
            mouseup = null;
            mousedown = null;
        };
    }
    _getBodyScrollTop() {
        return document.documentElement && document.documentElement.scrollTop || (document.body && document.body.scrollTop);
    }
    _getBodyScrollLeft() {
        return document.documentElement && document.documentElement.scrollLeft || (document.body && document.body.scrollLeft);
    }
    _updateSelectionContent(event) {
        if (this._startRect.left > event.clientX) {
            this._$selectionContent.css('left', event.clientX);
        }
        else {
            this._$selectionContent.css('right', document.documentElement.clientWidth - event.clientX);
        }
        if (this._startRect.top > event.clientY) {
            this._$selectionContent.css('top', event.clientY);
        }
        else {
            this._$selectionContent.css('bottom', document.documentElement.clientHeight - event.clientY);
        }
        const offset = this._$element.offset();
        const currentRect = {
            left: (parseInt(this._$selectionContent.css('left')) - offset.left + this._getBodyScrollLeft()) / this._$element.width() * 100,
            width: this._$selectionContent.width() / this._$element.width() * 100,
            top: (parseInt(this._$selectionContent.css('top')) - offset.top + this._getBodyScrollTop()) / this._$element.height() * 100,
            height: this._$selectionContent.height() / this._$element.height() * 100
        };
        currentRect['right'] = currentRect.left + currentRect.width;
        currentRect['bottom'] = currentRect.top + currentRect.height;
        const bricks = this._page.bricks;
        for (let i = 0; i < bricks.length; i++) {
            if (!bricks[i].bricks) {
                const isActive = rectIntersection({
                    left: parseFloat(bricks[i].leftP),
                    top: parseFloat(bricks[i].topP),
                    right: parseFloat(bricks[i].leftP) + parseFloat(bricks[i].widthP),
                    bottom: parseFloat(bricks[i].topP) + parseFloat(bricks[i].heightP),
                }, currentRect);
                isActive ? this._page.activateBrick(bricks[i]) : this._page.deactivateBrick(bricks[i]);
            }
        }
    }
    _mouseMove(event) {
        if (!this._startRect || !this._page.active || PreviewSelection.disabled)
            return;
        const leftButtonPressed = event.which === 1;
        if (leftButtonPressed) {
            if (!this._$selectionContainer) {
                if (Math.abs(this._startRect.left - event.clientX) >= 2 || Math.abs(this._startRect.top - event.clientY) >= 2) {
                    PreviewSelection.started = true;
                    const selectionContainer = $.fn.constructor('<div>');
                    selectionContainer.css({ position: 'fixed', top: '0', bottom: '0', left: '0', right: '0' });
                    this._$selectionContainer = selectionContainer.appendTo(document.body);
                    this._$selectionContent = $.fn.constructor('<div>').appendTo(this._$selectionContainer);
                    this._$selectionContent.css(this._startRect);
                    this._$selectionContent.addClass('dxrd-selection-content ui-selectable-helper');
                    if (dxPopup.prototype._zIndexInitValue)
                        this._$selectionContent.css('z-index', dxPopup.prototype._zIndexInitValue() + 100);
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
    }
    _mouseUp(event) {
        this._$selectionContainer && this._$selectionContainer.remove();
        this._$selectionContainer = null;
        this._bodyEvents.move && document.body.removeEventListener('mousemove', this._bodyEvents.move);
        this._bodyEvents.up && document.body.removeEventListener('mouseup', this._bodyEvents.up);
        this._startRect = null;
        setTimeout(() => {
            PreviewSelection.started = false;
        }, 1);
    }
    _mouseDown(event) {
        if (PreviewSelection.disabled) {
            return;
        }
        this._startRect = {
            left: event.clientX,
            top: event.clientY,
            right: document.documentElement.clientWidth - event.clientX,
            bottom: document.documentElement.clientHeight - event.clientY
        };
        this._click(this._page.pageIndex);
    }
}
PreviewSelection.started = false;
PreviewSelection.disabled = false;
export function initializeBrickSelectionProg(element, options) {
    const selection = new PreviewSelection(element, options.page, options.click);
    return () => {
        selection.dispose();
    };
}
