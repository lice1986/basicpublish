﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\mobilePreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ReportPreview } from '../reportPreview';
import { ZoomAutoBy } from '../constants';
import { MobilePreviewPage } from './internal/_mobilePage';
import { mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { createMobileReportPreviewViewModel, updateMobileReportPreviewViewModel } from './mobilePreview.viewModel';
export class MobileReportPreview extends ReportPreview {
    constructor(handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl = false, mobileSettings = { readerMode: true, animationEnabled: true }, breadcrumb, exportSettings) {
        super(handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl, undefined, exportSettings, undefined, breadcrumb);
        this.readerMode = mobileSettings.readerMode;
        const globalAnimationEnabled = mobileSettings.animationEnabled;
        this.animationSettings = { zoomEnabled: globalAnimationEnabled, swipeEnabled: globalAnimationEnabled };
        this.canSwitchToDesigner = false;
        this.autoFitBy = ZoomAutoBy.PageWidth;
        this.showMultipagePreview = true;
    }
    deferredUpdateViewModel() { return false; }
    _getScrollAvailable() {
        return !(this.scrollReachedTop && this.scrollReachedLeft
            && this.scrollReachedRight && this.scrollReachedBottom);
    }
    onPropertyChanged(args) {
        super.onPropertyChanged(args);
        if (args.propertyName === 'mobileZoom') {
            this.zoom = args.newValue;
        }
        if (args.propertyName === 'zoom' || args.propertyName === 'originalZoom') {
            const currentZoom = this.zoom;
            this.mobileZoomRead = currentZoom > 0 ? currentZoom : this.originalZoom;
        }
        if (args.propertyName === 'searchPanelVisible') {
            if (args.newValue) {
                this.actionsVisible = false;
            }
        }
        if (args.propertyName == 'pageIndex') {
            this.actionsVisible = false;
        }
        if (args.propertyName === 'pages') {
            this.interactionDisabled = this.pages.length === 0;
        }
        if (args.propertyName === 'pages' || args.propertyName === 'availablePages') {
            if (!this.availablePages) {
                this.visiblePages = [].concat(this.pages);
            }
            else {
                this.visiblePages = this.pages.filter((x) => this.availablePages.indexOf(x.pageIndex) !== -1);
            }
        }
    }
    createViewModel() {
        return createMobileReportPreviewViewModel.call(this, super.createViewModel());
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        updateMobileReportPreviewViewModel.call(this, args);
    }
    setZoomUpdating(newValue) {
        this.zoomUpdating = newValue;
    }
    createPage(pageIndex, processClick, subscribeToPageLoading = false) {
        return new MobilePreviewPage(this, pageIndex, processClick, subscribeToPageLoading);
    }
    createBrickClickProcessor(cyclePageIndex) {
        const _clickHandler = super.createBrickClickProcessor(cyclePageIndex);
        const func = (brick) => {
            if (this.zoomUpdating)
                return;
            if (cyclePageIndex !== this.pageIndex) {
                this.actionsVisible = false;
                const supscriptionDispose = this.events.on('actionsVisibleChanged', (args) => {
                    supscriptionDispose();
                    this.actionsVisible = false;
                });
            }
            _clickHandler(brick);
        };
        return func;
    }
    _hasActiveEditingFields() {
        return this.visiblePages.some(p => {
            const pageEditFields = p.editingFields;
            return pageEditFields && pageEditFields.some(x => x.active);
        });
    }
    showActions() {
        if (this.zoomUpdating || this.interactionDisabled)
            return;
        const searchVisible = this.searchPanelVisible;
        if (!searchVisible) {
            if (!this._hasActiveEditingFields()) {
                this.actionsVisible = !this.actionsVisible;
            }
        }
        else {
            this.searchPanelVisible = !searchVisible;
        }
    }
    onSlide(e) {
        this.scrollReachedLeft = true;
        this.scrollReachedRight = true;
        if (this.autoFitBy === ZoomAutoBy.None && e.removedItems && e.removedItems[0].blocks.length === 1 && e.addedItems && e.addedItems[0].blocks.length === 1)
            this.autoFitBy = ZoomAutoBy.PageWidth;
    }
    goToPage(pageIndex, forcePage) {
        super.goToPage(pageIndex, forcePage);
    }
    setScrollReached(e) {
        this.scrollReachedLeft = e.reachedLeft;
        this.scrollReachedRight = e.reachedRight;
        this.scrollReachedTop = e.reachedTop;
        this.scrollReachedBottom = e.reachedBottom;
    }
    initializeSlideOptions(searchModel, gallery) {
        const viewModel = this.getViewModel();
        viewModel.gallery = gallery.getViewModel();
        viewModel.slideOptions = {
            readerMode: this.readerMode,
            animationSettings: this.animationSettings,
            searchPanel: searchModel,
            getTopOffset: () => this.topOffset,
            setTopOffset: (value) => this.topOffset = value,
            getReachedTop: () => this.scrollReachedTop,
            getReachedLeft: () => this.scrollReachedLeft,
            getReachedRight: () => this.scrollReachedRight,
            getDisabled: () => this.interactionDisabled,
            setAutoFitBy: (value) => this.autoFitBy = value,
            getGalleryIsAnimated: () => gallery.isAnimated,
            getRepaintTimeout: () => gallery.repaintTimeout,
            setRepaintTimeout: (value) => gallery.repaintTimeout = value,
            setZoomUpdating: (value) => this.zoomUpdating = value,
            getZoomUpdating: () => this.zoomUpdating,
            getBrickEventsDisabled: () => this.brickEventsDisabled,
            setBrickEventsDisabled: (value) => this.brickEventsDisabled = value,
            getScrollAvailable: () => this._getScrollAvailable(),
            getSwipeEnabled: () => {
                if (this.zoomUpdating) {
                    return false;
                }
                if (searchModel.height > 0 && !searchModel.editorVisible) {
                    return false;
                }
                if (!this.scrollReachedLeft && !this.scrollReachedRight) {
                    return false;
                }
                return true;
            }
        };
    }
}
__decorate([
    mutable(null)
], MobileReportPreview.prototype, "slideOptions", void 0);
__decorate([
    mutable(0)
], MobileReportPreview.prototype, "topOffset", void 0);
__decorate([
    mutable({ width: 0, height: 0 })
], MobileReportPreview.prototype, "previewWrapperSize", void 0);
__decorate([
    mutable(() => [])
], MobileReportPreview.prototype, "availablePages", void 0);
__decorate([
    mutable(() => [])
], MobileReportPreview.prototype, "visiblePages", void 0);
__decorate([
    mutable(false)
], MobileReportPreview.prototype, "searchPanelVisible", void 0);
__decorate([
    mutable(false)
], MobileReportPreview.prototype, "actionsVisible", void 0);
__decorate([
    mutable(false)
], MobileReportPreview.prototype, "scrollReachedLeft", void 0);
__decorate([
    mutable(false)
], MobileReportPreview.prototype, "scrollReachedRight", void 0);
__decorate([
    mutable(true)
], MobileReportPreview.prototype, "scrollReachedTop", void 0);
__decorate([
    mutable(true)
], MobileReportPreview.prototype, "scrollReachedBottom", void 0);
__decorate([
    mutable(false)
], MobileReportPreview.prototype, "zoomUpdating", void 0);
__decorate([
    mutable(1)
], MobileReportPreview.prototype, "mobileZoom", void 0);
__decorate([
    mutable(1)
], MobileReportPreview.prototype, "mobileZoomRead", void 0);
__decorate([
    mutable(false)
], MobileReportPreview.prototype, "brickEventsDisabled", void 0);
__decorate([
    mutable(true)
], MobileReportPreview.prototype, "scrollAvailable", void 0);
