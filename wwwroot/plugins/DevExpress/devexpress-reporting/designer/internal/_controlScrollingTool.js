﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_controlScrollingTool.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export class ControlScrollingTool extends Disposable {
    constructor(_rootElement) {
        super();
        this._rootElement = _rootElement;
    }
    scrollToControl(surface) {
        if (this._viewport == null) {
            this._viewport = this._rootElement.getElementsByClassName('dxrd-viewport')[0];
        }
        if (surface['absolutePosition']) {
            const currentPosition = surface['absolutePosition'];
            const scrollLeft = this._getScrollOffset(currentPosition.x(), this._viewport.scrollLeft, this._viewport.clientWidth, this._viewport.scrollWidth);
            const scrollTop = this._getScrollOffset(currentPosition.y(), this._viewport.scrollTop, this._viewport.clientHeight, this._viewport.scrollHeight);
            if (this._viewport.scrollTo) {
                this._viewport.scrollTo({
                    left: scrollLeft,
                    top: scrollTop
                });
            }
            else {
                this._viewport.scrollLeft = scrollLeft;
                this._viewport.scrollTop = scrollTop;
            }
        }
    }
    _getScrollOffset(elementPosition, scrollOffset, visibleSize, fullSize) {
        let newOffset = scrollOffset;
        if (elementPosition < scrollOffset || elementPosition > (scrollOffset + visibleSize) / 2) {
            newOffset = elementPosition;
            if (newOffset + visibleSize / 2 < fullSize) {
                newOffset -= visibleSize / 2;
            }
        }
        return newOffset;
    }
    dispose() {
        this._viewport = null;
        this._rootElement = null;
    }
}
