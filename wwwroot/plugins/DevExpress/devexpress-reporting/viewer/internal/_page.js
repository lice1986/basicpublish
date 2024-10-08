﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_page.js)
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
import { compareSizes } from '@devexpress/analytics-core/analytics-elements-native';
import { $dx, formatUnicorn, getLocalization } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, mutable, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
import * as $ from 'jquery';
import { generateGuid } from '../../common/utils/_utils';
import { PreviewEditingFieldsKeyboardHelper } from '../accessibility/_previewEditingFieldsKeyboardHelper';
import { ZoomAutoBy } from '../constants';
import { HandlerUri } from '../settings';
import { brickText, initializeBrick, updateBricksPosition } from './_brickUtils';
import { createPreviewPageViewModel, updatePreviewPageViewModel } from './_page.viewModel';
import { PreviewRequestWrapper } from './_previewRequestWrapper';
import { PreviewSelection } from './_previewSelection';
import { getCurrentResolution } from './_utils';
const imageSrcMutableOptions = { rateLimit: { timeout: 100, method: 'notifyWhenChangesStop' } };
export class PreviewPage extends BaseRenderingModel {
    constructor(reportPreview, pageIndex, processClick, subscribeToPageLoading = false) {
        super();
        this.reportPreview = reportPreview;
        this.actualResolution = 0;
        this.currentScaleFactor = 1;
        this.imageHeight = 0;
        this.imageWidth = 0;
        this.imageSrcOptions = { rateLimit: { timeout: 100, method: 'notifyWhenChangesStop' } };
        this.shouldSkipBrickLoading = false;
        this.bricks = [];
        this.clickableBricks = [];
        this.maxZoom = 0;
        this.disableResolutionReduction = false;
        this.shouldSendRequest = true;
        this._lastZoom = 0;
        this._selectedBrickPath = null;
        this._resizeTimeout = null;
        this._onResize = () => {
            imageSrcMutableOptions.rateLimit.timeout = 500;
            this._resizeTimeout && clearTimeout(this._resizeTimeout);
            this._resizeTimeout = setTimeout(() => {
                imageSrcMutableOptions.rateLimit.timeout = 100;
            }, 500);
        };
        this._editingFieldsSubscriptionDispose = null;
        this.pageIndex = pageIndex;
        this._onImageSrcChanged = () => {
            this.lastGetPageDeferred && this.lastGetPageDeferred.resolve(null);
            const currentGetPageDeferred = $.Deferred();
            this.lastGetPageDeferred = currentGetPageDeferred;
            currentGetPageDeferred
                .done((response) => this._onPageLoaded(response, processClick))
                .fail((_e) => this._onPageLoadFailed());
            this.shouldSendRequest && this._requestPage(reportPreview);
        };
        this._unifier = reportPreview._unifier || generateGuid();
        this.originalSize = { height: reportPreview._pageHeight, width: reportPreview._pageWidth };
        this.addDisposable(reportPreview.events.on('originalZoomChanged', (args) => {
            this.zoom = args.newValue;
        }), reportPreview.events.on('previewSizeChanged', (args) => {
            this.previewSize = args.newValue;
        }), reportPreview.events.on('autoFitByChanged', (args) => {
            this.autoFitBy = args.newValue;
        }), reportPreview.events.on('_unifierChanged', (args) => {
            this._unifier = args.newValue;
        }), reportPreview.events.on('pageLoadingChanged', (args) => {
            if (subscribeToPageLoading) {
                this.pageLoading = args.newValue;
            }
        }), reportPreview.events.on('pagesChanged', () => {
            this.currentPageAriaLabelImgAlt = this._getAriaLabel();
        }));
        this.previewSize = reportPreview.previewSize;
        this.autoFitBy = reportPreview.autoFitBy;
        this.imageWidth = this.originalSize.width * this._getPixelRatio();
        this.imageHeight = this.originalSize.height * this._getPixelRatio();
        this.color = reportPreview._pageBackColor || '';
        this.zoom = reportPreview.originalZoom;
        this.isEmpty = pageIndex === -1 && !this.brick && !processClick;
        this.currentPageAriaLabelImgAlt = this._getAriaLabel();
        this.resetBrickRecusive = (brick) => {
            if (brick && brick.active !== undefined) {
                this.deactivateBrick(brick);
                if (brick.bricks) {
                    brick.bricks.forEach((childBrick) => { this.resetBrickRecusive(childBrick); });
                }
            }
        };
        this.selectBrick = (path, ctrlKey) => {
            if (PreviewSelection.started)
                return;
            processClick && processClick(null);
            let currentBrick = this.brick;
            !ctrlKey && this.resetBrickRecusive(currentBrick);
            if (!path) {
                return;
            }
            if (!currentBrick) {
                this._selectedBrickPath = path;
                return;
            }
            const pathElements = path.split(',');
            pathElements.forEach((el) => {
                currentBrick = currentBrick.bricks[parseInt(el)];
            });
            this.activateBrick(currentBrick);
        };
        this.editingFieldsKeyboardHelper = new PreviewEditingFieldsKeyboardHelper(this);
        this._disposables.push(this.editingFieldsKeyboardHelper);
    }
    createViewModel() {
        return createPreviewPageViewModel.call(this, super.createViewModel());
    }
    updateViewModel(args) {
        updatePreviewPageViewModel.call(this, args);
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'zoom') {
            this._updatePageSize();
        }
        if (args.propertyName === 'previewSize')
            this._onResize();
        if (args.propertyName === 'originalSize' || args.propertyName === 'autoFitBy' || args.propertyName === 'brickLoading' || args.propertyName === 'previewSize') {
            this._onAutoFitChanged && this._onAutoFitChanged();
        }
        if (args.propertyName === 'active' || args.propertyName === 'brick') {
            if (!this.active) {
                this.resetBrickRecusive(this.brick);
                this._selectedBrickPath = null;
            }
            this._onPageActiveChanged && this._onPageActiveChanged(this.active);
        }
        if (args.propertyName === 'brick') {
            this.bricks = this.getBricksFlatList(this.brick);
            this.clickableBricks = this.bricks.filter((x) => !!x.navigation);
            this.updateActiveBricks();
        }
        if (args.propertyName === 'isClientVisible') {
            if (args.newValue) {
                this._setPageImgSrc(this.reportPreview.documentId, this._unifier, this.zoom);
            }
        }
        if (args.propertyName === 'imageSrc')
            this._onImageSrcChanged();
    }
    _initializeEditingFields(editingFieldBricks, originalWidth, originalHeight) {
        if (this._editingFieldsSubscriptionDispose) {
            this.editingFields.forEach(field => field.dispose && field.dispose());
            this._editingFieldsSubscriptionDispose();
        }
        const createEditingFields = () => {
            const allEditingFields = this.reportPreview._editingFields;
            if (!allEditingFields || editingFieldBricks.length === 0) {
                return [];
            }
            const pageFieldViewModels = [];
            for (let i = 0; i < editingFieldBricks.length; i++) {
                const brick = editingFieldBricks[i];
                const editingField = allEditingFields[brick.efIndex - 1];
                if (!editingField)
                    return [];
                editingField.brick = brick;
                pageFieldViewModels.push(editingField.createModel(this, originalWidth, originalHeight, () => allEditingFields, brick.absoluteBounds));
                brick.text = (brick => (() => brickText(brick, () => allEditingFields)))(brick);
            }
            return pageFieldViewModels;
        };
        this.editingFields = createEditingFields();
        this._editingFieldsSubscriptionDispose = this.reportPreview.events.on('_editingFieldsChanged', (args) => {
            this.editingFields = createEditingFields();
        });
    }
    _getPixelRatio() {
        return window['devicePixelRatio'] || 1;
    }
    _onPageLoaded(result, processClick) {
        if (!result)
            return;
        this.imageHeight = result.height;
        this.imageWidth = result.width;
        this.currentScaleFactor = this._currentScaleFactor;
        this._updatePageSize();
        this.displayImageSrc = 'data:image/png;base64,' + result.base64string;
        if (this._isDisposed)
            return;
        this.pageLoading = false;
        try {
            if (!result || !result.brick) {
                return;
            }
            this.brickColumnWidthArray = result.columnWidthArray;
            this.originalSize = { width: result.brick.width, height: result.brick.height };
            const editignFieldBricks = [];
            this.initializeBrick(result.brick, processClick, editignFieldBricks);
            this._initializeEditingFields(editignFieldBricks, result.brick.width, result.brick.height);
            this._selectedBrickPath && this.selectBrick(this._selectedBrickPath);
        }
        finally {
            if (!this.shouldSkipBrickLoading) {
                this.brickLoading = false;
            }
            this.shouldSkipBrickLoading = false;
        }
    }
    _onPageLoadFailed() {
        if (this._isDisposed)
            return;
        if (this.isClientVisible) {
            this.pageLoading = false;
            this.pageIndex !== -1 && (this.brickLoading = false);
        }
    }
    _updatePageSize() {
        const newSize = {
            width: this.imageWidth * this.zoom / this.currentScaleFactor / this._getPixelRatio(),
            height: this.imageHeight * this.zoom / this.currentScaleFactor / this._getPixelRatio()
        };
        if (!compareSizes(newSize, this.size)) {
            this.size = newSize;
        }
    }
    _getAriaLabel() {
        return formatUnicorn(getLocalization('Report Preview page {0} of {1}', 'ASPxReportsStringId.WebDocumentViewer_AriaLabelPreviewPage'), this.pageIndex + 1, this.reportPreview.pages.length);
    }
    updateSize(zoom) {
        const newResolution = getCurrentResolution(zoom);
        return newResolution;
    }
    updateActiveBricks() {
        this.activeBricks = this.bricks.filter(x => x.active);
    }
    activateBrick(brick) {
        if (brick.active)
            return;
        brick.active = true;
        this.updateActiveBricks();
    }
    deactivateBrick(brick) {
        if (!brick.active)
            return;
        brick.active = false;
        this.updateActiveBricks();
    }
    clearBricks() {
        this.brickLoading = true;
    }
    dispose() {
        var _a;
        super.dispose();
        this._isDisposed = true;
        this._editingFieldsSubscriptionDispose && this._editingFieldsSubscriptionDispose();
        this.reportPreview = null;
        (_a = this.lastGetPageDeferred) === null || _a === void 0 ? void 0 : _a.reject();
    }
    _setPageImgSrc(documentId, unifier, zoom, shouldSkipBricks) {
        if (!documentId || this.pageIndex === -1) {
            return;
        }
        if (this.maxZoom && this.maxZoom < zoom) {
            zoom = this.maxZoom;
        }
        if (this._lastZoom < zoom) {
            this._lastZoom = zoom;
        }
        else {
            if (this.actualResolution && this.disableResolutionReduction && this.imageSrc)
                return;
        }
        const newResolution = this.updateSize(zoom);
        if ((this.actualResolution === newResolution || newResolution < 9) && this.imageSrc) {
            return;
        }
        this.actualResolution = newResolution;
        this._currentScaleFactor = zoom;
        this.shouldSkipBrickLoading = shouldSkipBricks !== null && shouldSkipBricks !== void 0 ? shouldSkipBricks : false;
        this.imageSrc = HandlerUri() +
            '?actionKey=getPage&unifier=' + unifier +
            '&arg=' + encodeURIComponent(JSON.stringify(this._getCurrentPageRequest(documentId, shouldSkipBricks)));
    }
    _requestPage(preview) {
        if (this.isDisposing)
            return;
        this.brickLoading = true;
        const documentId = this.reportPreview.documentId;
        const currentGetPageDeferred = this.lastGetPageDeferred;
        const ignoreError = preview._closeDocumentRequests && (() => preview._closeDocumentRequests[documentId] || currentGetPageDeferred.state() != 'pending');
        PreviewRequestWrapper.getPage(this.imageSrc, ignoreError)
            .done((response) => {
            currentGetPageDeferred.resolve(response);
        }).fail((_e) => {
            currentGetPageDeferred.reject(_e);
        });
    }
    _getCurrentPageRequest(documentId, shouldSkipBricks) {
        return {
            pageIndex: this.pageIndex,
            documentId: documentId,
            resolution: Math.floor(this.actualResolution * this._getPixelRatio()),
            includeBricks: shouldSkipBricks ? false : this.brickLoading
        };
    }
    _getPageSizeConfiguration() {
        return {
            width: this.originalSize.width,
            height: this.originalSize.height,
            autoFitBy: this.autoFitBy,
            skipIfInvisible: false,
        };
    }
    _clear() {
        this.pageIndex = -1;
        this.isClientVisible = false;
        this._setPageImgSrc(null, null, 1);
        this.actualResolution = 0;
    }
    initializeBrick(brick, processClick, editingFieldBricks) {
        initializeBrick(brick, processClick, editingFieldBricks);
        updateBricksPosition(brick, brick.height, brick.width);
        this.brick = brick;
    }
    _clickToBrick(e) {
        const target = $dx(e.currentTarget);
        const offset = target.offset();
        const xPerc = (e.clientX - offset.left + window.scrollX) / target.width() * 100;
        const yPerc = (e.clientY - offset.top + window.scrollY) / target.height() * 100;
        const bricks = this.bricks;
        for (let i = 0; i < bricks.length; i++) {
            if (parseFloat(bricks[i].topP) < yPerc && parseFloat(bricks[i].topP) + parseFloat(bricks[i].heightP) > yPerc
                && parseFloat(bricks[i].leftP) < xPerc && parseFloat(bricks[i].leftP) + parseFloat(bricks[i].widthP) > xPerc) {
                bricks[i].onClick && bricks[i].onClick(e);
                break;
            }
        }
    }
    getBricksFlatList(brick) {
        if (brick) {
            let bricks = [];
            const innerBricksLength = brick.bricks && brick.bricks.length || 0;
            for (let i = 0; i < innerBricksLength; i++) {
                bricks = bricks.concat(this.getBricksFlatList(brick.bricks[i]));
            }
            bricks.push(brick);
            return bricks;
        }
        return [];
    }
}
__decorate([
    mutable(() => [])
], PreviewPage.prototype, "editingFields", void 0);
__decorate([
    mutable(false)
], PreviewPage.prototype, "isClientVisible", void 0);
__decorate([
    mutable(1)
], PreviewPage.prototype, "zoom", void 0);
__decorate([
    mutable(0)
], PreviewPage.prototype, "previewSize", void 0);
__decorate([
    mutable(ZoomAutoBy.WholePage)
], PreviewPage.prototype, "autoFitBy", void 0);
__decorate([
    mutable(() => { return { with: 0, height: 0 }; }, { deferred: true })
], PreviewPage.prototype, "size", void 0);
__decorate([
    mutable(() => { return { with: 0, height: 0 }; })
], PreviewPage.prototype, "originalSize", void 0);
__decorate([
    mutable(() => '', imageSrcMutableOptions)
], PreviewPage.prototype, "imageSrc", void 0);
__decorate([
    mutable(true)
], PreviewPage.prototype, "pageLoading", void 0);
__decorate([
    mutable(true)
], PreviewPage.prototype, "brickLoading", void 0);
__decorate([
    mutable(() => '')
], PreviewPage.prototype, "displayImageSrc", void 0);
__decorate([
    mutable(false)
], PreviewPage.prototype, "active", void 0);
__decorate([
    mutable(null)
], PreviewPage.prototype, "brick", void 0);
__decorate([
    mutable('')
], PreviewPage.prototype, "_unifier", void 0);
__decorate([
    mutable('')
], PreviewPage.prototype, "currentPageAriaLabelImgAlt", void 0);
__decorate([
    mutableArray(() => [])
], PreviewPage.prototype, "activeBricks", void 0);
