﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_alignmentHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Margins } from '@devexpress/analytics-core/analytics-elements';
import * as $ from 'jquery';
import { BandSurface } from '../bands/xrBand';
import { XRTableCellSurface } from '../controls/xrTableCell';
import { XRTableRowSurface } from '../controls/xrTableRow';
export class AlignmentHandler {
    constructor(selectionProvider, surfaceContext) {
        this._selectionProvider = selectionProvider;
        this._surfaceContext = surfaceContext;
    }
    _getFocusedItem() { return this._selectionProvider.focused(); }
    _getFocusedParent() { return this._selectionProvider.focused().parent; }
    _getPositionFromBand(surface) {
        const rect = $.extend({}, surface.rect());
        let parent = surface.parent;
        if (!(surface instanceof BandSurface)) {
            while (!(parent instanceof BandSurface)) {
                rect.left += parent.rect().left;
                rect.top += parent.rect().top;
                parent = parent.parent;
            }
            rect.bottom = rect.top + rect.height;
            rect.right = rect.left + rect.width;
        }
        else {
            parent = surface;
        }
        rect.band = parent;
        return rect;
    }
    _visitAllSelectedItemsInSameContainerWithFocused(iterator) {
        const focused = this._selectionProvider.focused();
        const rect = this._getPositionFromBand(focused);
        this._selectionProvider.selectedItems.filter((item) => { return !item.locked; }).filter((item) => {
            return item !== focused;
        }).forEach((item) => {
            iterator(item, rect);
        });
    }
    _centerByBand(isHoriz, margins, rtl = false) {
        const items = this._selectionProvider.selectedItems.filter(x => !x.locked);
        if (!items.length)
            return;
        const axisProperty = isHoriz ? 'left' : 'top', lengthProperty = isHoriz ? 'width' : 'height', focusedParent = items[0].parent, bandOffset = focusedParent instanceof BandSurface ? margins.right() : 0, parentLengthProperty = focusedParent.rect()[lengthProperty] - bandOffset;
        let minAxis = items[0].rect()[axisProperty], maxSide = items[0].rect()[axisProperty] + items[0].rect()[lengthProperty];
        items.forEach((item) => {
            const axis = item.rect()[axisProperty];
            const side = item.rect()[axisProperty] + item.rect()[lengthProperty];
            if (axis < minAxis) {
                minAxis = axis;
            }
            if (side > maxSide) {
                maxSide = side;
            }
        });
        const newOffset = (parentLengthProperty - (maxSide - minAxis)) / 2 - minAxis + (rtl ? bandOffset : 0);
        items.forEach((item) => {
            const newVal = {};
            newVal[axisProperty] = item.rect()[axisProperty] + newOffset;
            newVal[lengthProperty] = item.rect()[lengthProperty];
            item.rect(newVal);
        });
    }
    _roundingValue(value, snapGridSize) {
        return Math.round(value / snapGridSize) * snapGridSize;
    }
    alignLeft() {
        this._visitAllSelectedItemsInSameContainerWithFocused((item, rect) => {
            if (item instanceof XRTableRowSurface) {
                item = item.parent;
            }
            const parentRect = this._getPositionFromBand(item.parent);
            const left = rect.left - parentRect.left;
            item.rect({ left: left });
        });
    }
    alignTop() {
        this._visitAllSelectedItemsInSameContainerWithFocused((item, rect) => {
            if (item instanceof XRTableCellSurface) {
                item = item.parent;
            }
            const parentRect = this._getPositionFromBand(item.parent);
            if (parentRect['band'] === rect['band']) {
                const top = rect.top - parentRect.top;
                item.rect({ top: top });
            }
        });
    }
    alignRight() {
        this._visitAllSelectedItemsInSameContainerWithFocused((item, rect) => {
            if (item instanceof XRTableRowSurface) {
                item = item.parent;
            }
            const parentRect = this._getPositionFromBand(item.parent);
            const right = rect.left - parentRect.left + rect.width;
            const left = right - item.rect().width;
            item.rect({ right: right, left: left });
        });
    }
    alignBottom() {
        this._visitAllSelectedItemsInSameContainerWithFocused((item, rect) => {
            if (item instanceof XRTableCellSurface) {
                item = item.parent;
            }
            const parentRect = this._getPositionFromBand(item.parent);
            if (parentRect['band'] === rect['band']) {
                const bottom = rect.top - parentRect.top + rect.height;
                const top = bottom - item.rect().height;
                item.rect({ bottom: bottom, top: top });
            }
        });
    }
    alignVerticalCenters() {
        const focused = this._getFocusedItem();
        const verticalCenter = focused.rect().left + focused.rect().width / 2;
        this._visitAllSelectedItemsInSameContainerWithFocused((item) => {
            if (item instanceof XRTableCellSurface) {
                item = item.parent.parent;
            }
            else if (item instanceof XRTableRowSurface) {
                item = item.parent;
            }
            item.rect({ left: verticalCenter - item.rect().width / 2 });
        });
    }
    alignHorizontalCenters() {
        const focused = this._getFocusedItem();
        const horizontalCenter = focused.rect().top + focused.rect().height / 2;
        this._visitAllSelectedItemsInSameContainerWithFocused((item) => {
            if (item instanceof XRTableCellSurface) {
                item = item.parent.parent;
            }
            else if (item instanceof XRTableRowSurface) {
                item = item.parent;
            }
            if (focused.parent === item.parent) {
                item.rect({ top: horizontalCenter - item.rect().height / 2 });
            }
        });
    }
    sizeToControlWidth() {
        const newWidth = this._getFocusedItem().rect().width;
        this._visitAllSelectedItemsInSameContainerWithFocused((item) => {
            if (item instanceof XRTableRowSurface) {
                item = item.parent;
            }
            item.rect({ width: newWidth });
        });
    }
    sizeToControlHeight() {
        const newHeight = this._getFocusedItem().rect().height;
        this._visitAllSelectedItemsInSameContainerWithFocused((item) => {
            if (item instanceof XRTableCellSurface) {
                item = item.parent;
            }
            item.rect({ height: newHeight });
        });
    }
    sizeToControl() {
        const newWidth = this._getFocusedItem().rect().width, newHeight = this._getFocusedItem().rect().height;
        this._visitAllSelectedItemsInSameContainerWithFocused((item) => {
            if (item instanceof XRTableCellSurface) {
                item.rect({ width: newWidth });
                item.parent.rect({ height: newHeight });
            }
            else if (item instanceof XRTableRowSurface) {
                item.rect({ height: newHeight });
                item.parent.rect({ width: newWidth });
            }
            else {
                item.rect({ width: newWidth, height: newHeight });
            }
        });
    }
    centerHorizontally() {
        this._centerByBand(true, this._surfaceContext().margins, this._surfaceContext().rtl());
    }
    centerVertically() {
        this._centerByBand(false, new Margins(0, 0, 0, 0));
    }
    alignToGrid() {
        const snapGridSize = this._surfaceContext().snapGridSize();
        this._selectionProvider.selectedItems.filter((item) => { return !item.locked; }).forEach((item) => {
            if (item instanceof XRTableCellSurface) {
                item.rect({
                    left: this._roundingValue(item.rect().left, snapGridSize)
                });
                item.parent.rect({
                    top: this._roundingValue(item.rect().top, snapGridSize)
                });
            }
            else if (item instanceof XRTableRowSurface) {
                item.rect({
                    top: this._roundingValue(item.rect().top, snapGridSize)
                });
                item.parent.rect({
                    left: this._roundingValue(item.rect().left, snapGridSize)
                });
            }
            else {
                item.rect({
                    left: this._roundingValue(item.rect().left, snapGridSize),
                    top: this._roundingValue(item.rect().top, snapGridSize)
                });
            }
        });
    }
    sizeToGrid() {
        const snapGridSize = this._surfaceContext().snapGridSize();
        this._selectionProvider.selectedItems.filter((item) => { return !item.locked; }).forEach((item) => {
            if (item instanceof XRTableCellSurface) {
                item.rect({
                    left: this._roundingValue(item.rect().left, snapGridSize),
                    width: this._roundingValue(item.rect().width, snapGridSize)
                });
                item.parent.rect({
                    top: this._roundingValue(item.rect().top, snapGridSize),
                    height: this._roundingValue(item.rect().height, snapGridSize)
                });
            }
            else if (item instanceof XRTableRowSurface) {
                item.rect({
                    top: this._roundingValue(item.rect().top, snapGridSize),
                    height: this._roundingValue(item.rect().height, snapGridSize)
                });
                item.parent.rect({
                    left: this._roundingValue(item.rect().left, snapGridSize),
                    width: this._roundingValue(item.rect().width, snapGridSize)
                });
            }
            else {
                item.rect({
                    left: this._roundingValue(item.rect().left, snapGridSize),
                    top: this._roundingValue(item.rect().top, snapGridSize),
                    width: this._roundingValue(item.rect().width, snapGridSize),
                    height: this._roundingValue(item.rect().height, snapGridSize)
                });
            }
        });
    }
    sendToBack() {
        this._selectionProvider.selectedItems.filter((item) => { return !item.locked; }).forEach((item) => {
            if (!item.focused()) {
                item.getControlModel()['sendToBack']();
            }
        });
        this._getFocusedItem().getControlModel()['sendToBack']();
    }
    bringToFront() {
        const reverseSelectedItems = this._selectionProvider.selectedItems.filter((item) => { return !item.locked; });
        reverseSelectedItems.reverse();
        reverseSelectedItems.forEach((item) => {
            item.getControlModel()['bringToFront']();
        });
    }
    canChangeZOrder() {
        const focusedItem = this._getFocusedItem(), parent = focusedItem && focusedItem.parent;
        if (!focusedItem || !parent)
            return false;
        const childrenCollection = parent.getChildrenCollection();
        return (childrenCollection && childrenCollection.peek().length) > 1;
    }
}
