﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryComponent.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addDisposeCallback } from '@devexpress/analytics-core/analytics-internal-native';
import registerComponent from 'devextreme/core/component_registrator';
import 'devextreme/ui/gallery';
import dxGallery from 'devextreme/ui/gallery';
import * as $ from 'jquery';
export class dxGalleryExtender {
    constructor(_gallery) {
        this._gallery = _gallery;
    }
    extend(element) {
        this
            ._extendCtor(element)
            ._extendRepaint()
            ._extend_blockItemsHaveExpired()
            ._extend_getNextIndex()
            ._extend_swipeStartHandler()
            ._extend_setSwipeAnimation()
            ._extend_addAnimation()
            ._extend_restoreDefault()
            ._extend_getItem()
            ._extend_swipeUpdateHandler()
            ._extend_swipeEndHandler()
            ._extend_endSwipe();
        this._gallery.repaint();
    }
    _extendCtor(element) {
        this._gallery._animationClassName = 'dxrdp-gallery-item-animation';
        this._gallery.currentBlockItem = null;
        this._gallery.nextBlockItem = null;
        this._gallery.swipeEnabled = true;
        this._gallery.initializeBlockItems = () => {
            this._gallery.blockItems = [];
            const $items = this._gallery['_getAvailableItems']();
            for (let i = 0; i < $items.length; i++) {
                let left = parseFloat($items[i]['style'].left);
                left = isNaN(left) ? 0 : left;
                this._gallery.blockItems.push({
                    element: $.fn.constructor($items[i]),
                    left: left
                });
            }
        };
        this._gallery.initializeBlockItems();
        this._gallery.gallery = this._gallery['option']('gallery').getModel();
        this._gallery.slideOptions = this._gallery['option']('slideOptions');
        const subscriptionDispose = this._gallery.gallery.events.on('repaintChanged', (args) => {
            if (!this._gallery.gallery.preview._hasActiveEditingFields()) {
                this._gallery.repaint();
            }
        });
        addDisposeCallback(element, () => {
            subscriptionDispose();
        });
        return this;
    }
    _extendRepaint() {
        const oldRepaint = this._gallery.repaint;
        this._gallery.repaint = () => {
            oldRepaint.apply(this._gallery);
            this._gallery.initializeBlockItems();
        };
        return this;
    }
    _extend_blockItemsHaveExpired() {
        this._gallery._blockItemsHaveExpired = () => this._gallery.blockItems.length && !document.body.contains(this._gallery.blockItems[0].element[0]);
        return this;
    }
    _extend_swipeStartHandler() {
        const old_swipeStartHandler = this._gallery['_swipeStartHandler'];
        this._gallery['_swipeStartHandler'] = (e) => {
            this._gallery.swipeEnabled = this._gallery.slideOptions.getSwipeEnabled();
            if (!this._gallery.swipeEnabled)
                return;
            old_swipeStartHandler.apply(this._gallery, [e]);
            if (this._gallery._blockItemsHaveExpired()) {
                this._gallery.initializeBlockItems();
            }
            const swipeRightEnable = this._gallery.gallery.getSwipeRightEnabled();
            const swipeLeftEnable = this._gallery.gallery.getSwipeLeftEnabled();
            if (!swipeRightEnable || !swipeLeftEnable) {
                const selectedIndex = swipeRightEnable ? 0 : 2;
                let startOffset = 3 - selectedIndex - 1, endOffset = selectedIndex;
                if (!swipeRightEnable && !swipeLeftEnable) {
                    startOffset = 0;
                    endOffset = 0;
                }
                e.event.maxLeftOffset = startOffset;
                e.event.maxRightOffset = endOffset;
            }
            this._gallery.gallery.isAnimated = true;
            if (this._gallery.gallery.animationEnabled) {
                this._gallery.currentBlockItem && this._gallery.currentBlockItem.element.removeClass(this._gallery._animationClassName);
                this._gallery.nextBlockItem && this._gallery.nextBlockItem.element.removeClass(this._gallery._animationClassName);
            }
        };
        return this;
    }
    _extend_getNextIndex() {
        this._gallery._getNextIndex = (offset) => {
            let index = this._gallery.gallery.selectedIndex;
            if (offset < 0) {
                if (index === 2) {
                    index = 0;
                }
                else {
                    index++;
                }
            }
            else {
                if (index === 0) {
                    index = 2;
                }
                else {
                    index--;
                }
            }
            return index;
        };
        return this;
    }
    _extend_setSwipeAnimation() {
        this._gallery._setSwipeAnimation = (element, difference, offset, right) => {
            const diffperc = 100 * offset / 4;
            let newLeft = '0%';
            if (right) {
                newLeft = (element.left + diffperc) + '%';
            }
            else {
                newLeft = (element.left - diffperc) + '%';
            }
            element.element.css({
                'opacity': difference,
                'transform': 'scale(' + difference + ')',
                'left': newLeft
            });
        };
        return this;
    }
    _extend_addAnimation() {
        this._gallery._addAnimation = (item) => {
            if (item) {
                if (this._gallery.gallery.animationEnabled) {
                    item.element.addClass(this._gallery._animationClassName);
                }
            }
        };
        return this;
    }
    _extend_restoreDefault() {
        this._gallery._restoreDefault = (item) => {
            if (item) {
                item.element.css({
                    'opacity': 1,
                    'transform': 'scale(' + 1 + ')',
                    'left': item.left + '%'
                });
            }
        };
        return this;
    }
    _extend_getItem() {
        this._gallery._getItem = (index, loopTest) => {
            let realIndex = index;
            const currentBlockIndex = this._gallery.blockItems.indexOf(this._gallery.currentBlockItem);
            if (loopTest) {
                if (currentBlockIndex === 2 && index === 0) {
                    realIndex = 3;
                }
                else if (currentBlockIndex === 0 && index === 2) {
                    realIndex = 4;
                }
            }
            const item = this._gallery.blockItems[realIndex];
            if (this._gallery.gallery.animationEnabled) {
                item.element.removeClass(this._gallery._animationClassName);
            }
            return item;
        };
        return this;
    }
    _extend_swipeUpdateHandler() {
        const oldswipeUpdateHandler = this._gallery['_swipeUpdateHandler'];
        this._gallery['_swipeUpdateHandler'] = (e) => {
            if (!this._gallery.swipeEnabled)
                return;
            oldswipeUpdateHandler.apply(this._gallery, [e]);
            let offset = e.event.offset;
            const nextIndex = this._gallery._getNextIndex(offset);
            const currentIndex = this._gallery.gallery.selectedIndex;
            const currentBlockIndex = this._gallery.blockItems.indexOf(this._gallery.currentBlockItem);
            const nextBlockIndex = this._gallery.blockItems.indexOf(this._gallery.nextBlockItem);
            if (!this._gallery.currentBlockItem || currentBlockIndex !== currentIndex) {
                this._gallery.currentBlockItem = this._gallery._getItem(currentIndex, false);
            }
            if (!this._gallery.nextBlockItem || nextBlockIndex !== nextIndex) {
                this._gallery.nextBlockItem = this._gallery._getItem(nextIndex, true);
            }
            if (this._gallery.gallery.animationEnabled) {
                offset = Math.abs(offset);
                const right = (nextIndex - currentIndex === 1) || (currentIndex === 2 && nextIndex === 0);
                this._gallery._setSwipeAnimation(this._gallery.currentBlockItem, Math.min(1, (1 - offset)), offset, right);
                this._gallery._setSwipeAnimation(this._gallery.nextBlockItem, Math.min(1, offset * 1.5), offset, !right);
            }
        };
        return this;
    }
    _extend_swipeEndHandler() {
        const oldSwipeEnd = this._gallery['_swipeEndHandler'];
        this._gallery['_swipeEndHandler'] = (e) => {
            if (!this._gallery.swipeEnabled)
                return;
            oldSwipeEnd.apply(this._gallery, [e]);
            if (this._gallery.gallery.animationEnabled) {
                for (let i = 0; i < this._gallery.blockItems.length; i++) {
                    if (this._gallery.blockItems[i] === this._gallery.currentBlockItem || this._gallery.blockItems[i] === this._gallery.nextBlockItem) {
                        this._gallery._addAnimation(this._gallery.blockItems[i]);
                    }
                    this._gallery._restoreDefault(this._gallery.blockItems[i]);
                }
            }
            else {
                this._gallery.gallery.isAnimated = false;
                this._gallery.gallery.updatePagesVisible(this._gallery.gallery.preview);
            }
        };
        return this;
    }
    _extend_endSwipe() {
        const oldEndSwipe = this._gallery['_endSwipe'];
        const self = this;
        this._gallery['_endSwipe'] = function () {
            oldEndSwipe.apply(self._gallery, arguments);
            self._gallery.gallery.isAnimated = false;
            self._gallery.gallery.updatePagesVisible(self._gallery.gallery.preview);
        };
        return this;
    }
}
export class dxGalleryReportPreview extends dxGallery {
    constructor(element, options) {
        super(element, options);
        new dxGalleryExtender(this).extend(element);
    }
}
registerComponent('dxGalleryReportPreview', dxGalleryReportPreview);