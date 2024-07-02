﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_eventProcessor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SearchAvailable } from '../../settings';
import { MobileSearchViewModel } from './_mobileSearch';
import { ZoomAutoBy } from '../../constants';
import * as $ from 'jquery';
import Gallery from 'devextreme/ui/gallery';
import { Disposable } from '@devexpress/analytics-core/analytics-utils-native';
import { dxGalleryReportPreview } from './gallery/_galleryComponent';
export const slowdownDisctanceFactor = 2.5;
export const minScale = 0.92;
function setTransform($element, transform) {
    $element.css({
        '-webkit-transform': transform,
        'transform': transform
    });
}
export class EventProcessor extends Disposable {
    constructor(element, slideOptions) {
        super();
        this.element = element;
        this.slideOptions = slideOptions;
        this._direction = {
            vertical: false,
            horizontal: false,
            scrollDown: false
        };
        this.isLeftMove = false;
        this.isRightMove = false;
        this.$window = $.fn.constructor(window);
        this.$element = $.fn.constructor(element),
            this.$body = $.fn.constructor(document.body),
            this.$gallery = this.$element.find('.dxrd-mobile-gallery');
        this.$galleryblocks = this.$gallery.find('.dxrd-gallery-blocks');
        this.firstMobilePageOffset = this._getFirstPageOffset();
        this.addDisposable(this.slideOptions.searchPanel.events.on('heightChanged', (args) => {
            const newVal = args.newValue;
            if (slideOptions.getDisabled())
                return;
            if (!this.firstMobilePageOffset)
                this.firstMobilePageOffset = this._getFirstPageOffset();
            if (this.slideOptions.readerMode) {
                this.slideOptions.setTopOffset(newVal);
            }
            else {
                this.slideOptions.setTopOffset(Math.min(newVal, Math.max(0, MobileSearchViewModel.maxHeight - this.firstMobilePageOffset.top)));
            }
            if (!newVal) {
                this.applySearchAnimation(newVal);
            }
            else if (newVal === MobileSearchViewModel.maxHeight) {
                this.slideOptions.searchPanel.searchPanelVisible = true;
                this.applySearchAnimation(newVal);
            }
            else {
                const dif = 1 - minScale;
                const perc = newVal / MobileSearchViewModel.maxHeight;
                const scale = 1 - dif * perc;
                setTransform(this.$galleryblocks, 'scale(' + Math.max(minScale, scale) + ')');
            }
        }));
    }
    _getFirstPageOffset() {
        return this.$galleryblocks.find('.dxrd-mobile-page').eq(0).offset();
    }
    getDirection(x, y) {
        const differenceY = y - this._startingPositionY;
        const distanceY = Math.abs(differenceY);
        const distanceX = Math.abs(x - this._startingPositionX);
        if (distanceY === 0 && distanceX === 0) {
            this._direction.horizontal = false;
            this._direction.vertical = false;
            return this._direction;
        }
        const tg = !distanceX ? 10 : distanceY / distanceX;
        if (tg < 2) {
            this._direction.horizontal = true;
            this._direction.vertical = false;
            this._direction.scrollDown = false;
        }
        else {
            this._direction.horizontal = false;
            this._direction.vertical = true;
            this._direction.scrollDown = differenceY > 0;
        }
        return this._direction;
    }
    setPosition(x, y) {
        this.isLeftMove = this.latestX > x;
        this.isRightMove = this.latestX < x;
        this.latestY = y;
        this.latestX = x;
    }
    initialize(x, y) {
        this._startingPositionX = x;
        this._startingPositionY = y;
        this.latestX = x;
        this.latestY = y;
        this._direction = { horizontal: false, vertical: false, scrollDown: false };
    }
    start(e) {
        this.$body.addClass('dxrd-prevent-refresh');
        this.$galleryblocks = this.$gallery.find('.dxrd-gallery-blocks');
        if (!this.slideOptions.getTopOffset()) {
            this.firstMobilePageOffset = this._getFirstPageOffset();
            if (this.firstMobilePageOffset) {
                this.firstMobilePageOffset.top = this.firstMobilePageOffset.top * minScale;
            }
        }
        this.initialize(e.pageX, e.pageY);
    }
    move(e) {
        if (this.slideOptions.getZoomUpdating() || this.slideOptions.getGalleryIsAnimated() || this.slideOptions.getDisabled()) {
            return;
        }
        if (SearchAvailable() && !this.slideOptions.searchPanel.editorVisible) {
            const direction = this.getDirection(e.pageX, e.pageY);
            if (!direction.vertical && !direction.horizontal)
                return;
            if (direction.vertical && direction.scrollDown || this.slideOptions.searchPanel.height !== 0) {
                if (this.slideOptions.getReachedTop() && (MobileSearchViewModel.maxHeight + this.$element.offset().top) > this.$window.scrollTop()) {
                    this.slideOptions.setBrickEventsDisabled(true);
                    e.stopPropagation();
                    const currentHeight = this.slideOptions.searchPanel.height;
                    const difference = currentHeight + (e.clientY - this.latestY) / slowdownDisctanceFactor;
                    const distance = difference > 0 ? Math.min(difference, MobileSearchViewModel.maxHeight) : 0;
                    this.slideOptions.searchPanel.height = distance;
                }
            }
        }
        this.setPosition(e.clientX, e.clientY);
    }
    end(e) {
        const zoomUpdating = this.slideOptions.getZoomUpdating();
        if (zoomUpdating || this.slideOptions.getGalleryIsAnimated()) {
            const touches = e['touches'];
            if (!touches || touches.length === 0) {
                if (zoomUpdating) {
                    e.stopPropagation();
                }
                this.slideOptions.setZoomUpdating(false);
            }
            return;
        }
        const direction = this.getDirection(e.pageX, e.pageY);
        if (this.slideOptions.getScrollAvailable()) {
            if (direction.horizontal && this.slideOptions.getSwipeEnabled()) {
                const galleryInstance = Gallery.getInstance(this.$gallery.get(0)) || dxGalleryReportPreview.getInstance(this.$gallery.get(0));
                const gallery = galleryInstance.option('gallery').getModel();
                const repaintTimeout = this.slideOptions.getRepaintTimeout();
                if (this.slideOptions.getReachedLeft() && this.isRightMove && gallery.getSwipeLeftEnabled()) {
                    galleryInstance.prevItem();
                    clearTimeout(repaintTimeout);
                    this.slideOptions.setRepaintTimeout(setTimeout(() => galleryInstance.repaint(), 410));
                }
                else if (this.slideOptions.getReachedRight() && this.isLeftMove && gallery.getSwipeRightEnabled()) {
                    galleryInstance.nextItem();
                    clearTimeout(repaintTimeout);
                    this.slideOptions.setRepaintTimeout(setTimeout(() => galleryInstance.repaint(), 410));
                }
            }
        }
        if (SearchAvailable() && !this.slideOptions.searchPanel.editorVisible) {
            if (this.slideOptions.searchPanel.height >= MobileSearchViewModel.maxHeight / 2) {
                this.slideOptions.searchPanel.height = MobileSearchViewModel.maxHeight;
            }
            else {
                this.slideOptions.searchPanel.height = 0;
            }
            if (this.slideOptions.searchPanel.height == MobileSearchViewModel.maxHeight) {
                this.slideOptions.setAutoFitBy(ZoomAutoBy.PageWidth);
            }
        }
        this.$body.removeClass('dxrd-prevent-refresh');
        setTimeout(() => { this.slideOptions.setBrickEventsDisabled(false); }, 50);
    }
    applySearchAnimation(value) {
        if (this.slideOptions.animationSettings.zoomEnabled) {
            this.$galleryblocks.addClass('dxrdp-animation');
            this.$element.addClass('dxrdp-animation');
            setTimeout(() => {
                this.$galleryblocks.removeClass('dxrdp-animation');
                this.$element.removeClass('dxrdp-animation');
            }, 410);
        }
        setTransform(this.$galleryblocks, !value ? '' : 'scale(0.92)');
    }
}