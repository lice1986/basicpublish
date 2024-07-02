﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_objectExplorerDragDropHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReorderTreeListDragDropHelper } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
export class ObjectExplorerDragDropHelper extends ReorderTreeListDragDropHelper {
    constructor() {
        super(...arguments);
        this._orderingAreaHeight = 8;
    }
    _isInTopOrderArea(targetElement, mouseLocationY) {
        const targetTop = targetElement.offset().top;
        return mouseLocationY < (targetTop + this._orderingAreaHeight);
    }
    _isInBottomOrderArea(targetElement, mouseLocationY) {
        const targetTop = targetElement.offset().top;
        return mouseLocationY > (targetTop + targetElement.height() - this._orderingAreaHeight);
    }
    _getDroppableClassName(isInTopOrderArea, isInBottomOrderArea) {
        return this.droppableClassName;
    }
    _shouldCheckAreas() {
        return true;
    }
    setNewDropTarget(elementModel, element, mouseLocationY) {
        this.drag(elementModel, element);
        const $targetElement = $.fn.constructor(this._targetElement);
        if ($targetElement && $targetElement.length) {
            let isInTopOrderArea, isInBottomOrderArea;
            if (mouseLocationY && this._shouldCheckAreas()) {
                isInTopOrderArea = this._isInTopOrderArea($targetElement, mouseLocationY);
                isInBottomOrderArea = this._isInBottomOrderArea($targetElement, mouseLocationY);
            }
            $targetElement.addClass(this._getDroppableClassName(isInTopOrderArea, isInBottomOrderArea));
        }
    }
}
