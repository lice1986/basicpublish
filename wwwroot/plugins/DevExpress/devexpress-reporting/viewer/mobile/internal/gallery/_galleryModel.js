﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryModel.js)
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
import { getCurrentResolution } from '../../../internal/_utils';
import { previewDefaultResolution } from '../../../settings';
import { ZoomAutoBy } from '../../../constants';
import { BaseRenderingModel, createViewModelGenerator, mutable, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
import { GalleryItem, GalleryItemBlock } from './_galleryItem';
export class GalleryModel extends BaseRenderingModel {
    constructor(preview) {
        super();
        this.preview = preview;
        this._spacing = 1;
        this._animationTimeout = null;
        this._currentItemSubscriptionDispose = null;
        this._repaint = () => {
            const args = { propertyName: 'repaint', newValue: {}, oldValue: {} };
            this.events.call('propertyChanged', args);
        };
        this.horizontal = 1;
        this.vertical = 1;
        this.pageCount = 0;
        const oldIndex = this.selectedIndex;
        this.items = [
            new GalleryItem(preview, this),
            new GalleryItem(preview, this),
            new GalleryItem(preview, this)
        ];
        this.animationEnabled = preview.animationSettings.swipeEnabled;
        const _calcHorizontalVertical = () => {
            const _zoom = preview.originalZoom;
            const pageHeight = Math.ceil(preview._pageHeight * getCurrentResolution(_zoom) / previewDefaultResolution());
            const pageWidth = Math.ceil(preview._pageWidth * getCurrentResolution(_zoom) / previewDefaultResolution());
            const _containerSize = preview.previewWrapperSize;
            const horizontal = (preview.autoFitBy != ZoomAutoBy.PageWidth && (Math.floor(_containerSize.width / (pageWidth + 2 * this._spacing)))) || 1;
            const vertical = Math.floor(_containerSize.height / (pageHeight + 2 * this._spacing)) || 1;
            this.horizontal = horizontal;
            this.vertical = vertical;
        };
        const updateGalleryContent = () => {
            _calcHorizontalVertical();
            this.pageCount = this.horizontal * this.vertical;
            this.updateContent(preview, this.pageCount);
        };
        this.addDisposable(preview.events.on('previewWrapperSizeChanged', (args) => {
            this.items.forEach(item => item.blocks.forEach(block => block.repaint = true));
            updateGalleryContent();
            const currentGalleryItem = this.items[this.selectedIndex];
            this.updateBlocks(currentGalleryItem, this.pageCount, preview, this.selectedIndexReal, preview.animationSettings.zoomEnabled);
            this._repaint();
        }), preview.events.on('visiblePagesChanged', (args) => {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].blocks = [];
                this.items[i].realIndex = -1;
            }
            updateGalleryContent();
        }), preview.events.on('zoomUpdatingChanged', (args) => {
            if (!args.newValue) {
                clearTimeout(this.repaintTimeout);
                this.repaintTimeout = setTimeout(() => this._repaint(), 410);
            }
        }), preview.events.on('originalZoomChanged', (args) => {
            _calcHorizontalVertical();
            const pageCount = this.horizontal * this.vertical;
            if (this.pageCount !== pageCount) {
                this.pageCount = pageCount;
                this.items.forEach(item => item.blocks.forEach(block => block.repaint = true));
                this.updateContent(preview, pageCount);
            }
            else if (this.pageCount === 1) {
                const block = this.items[this.selectedIndex].blocks[0];
                this.items.forEach((item, index) => {
                    if (index != this.selectedIndex)
                        item.blocks.forEach(block => block.repaint = true);
                });
                setTimeout(() => {
                    block.position = {
                        left: block.position.left,
                        top: block.position.top,
                        height: Math.max(this.preview.previewWrapperSize.height, block.page.size.height),
                        width: Math.max(this.preview.previewWrapperSize.width, block.page.size.width)
                    };
                });
            }
        }), preview.events.on('pageIndexChanged', (args) => {
            updateGalleryContent();
        }));
        this.getSwipeLeftEnabled = () => {
            return this.selectedIndexReal !== 0;
        };
        this.getSwipeRightEnabled = () => {
            return this.selectedIndexReal != (Math.ceil(preview.visiblePages.length / (this.horizontal * this.vertical)) - 1);
        };
    }
    deferredUpdateViewModel() { return false; }
    _createBlock(galleryItem, previewPage, className, visible) {
        previewPage.disableResolutionReduction = true;
        previewPage.maxZoom = 1;
        const classSet = {};
        if (this.animationEnabled && this.pageCount > 1) {
            className && (classSet[className] = true);
            classSet['dxrdp-animation'] = true;
        }
        return new GalleryItemBlock({
            page: previewPage,
            visible: visible,
            classSet: classSet,
            position: { top: 0, left: 0, width: 0, height: 0 },
            reportPreview: galleryItem.preview
        });
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('animationEnabled', this.animationEnabled)
            .generateProperty('selectedIndex', this.selectedIndex)
            .generateProperty('items', this.items.map(x => x.getViewModel()))
            .generateProperty('onOptionChanged', (event) => {
            if (event.name === 'selectedIndex')
                this.selectedIndex = event.value;
        })
            .getViewModel();
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        viewModel.selectedIndex = this.selectedIndex;
        viewModel.animationEnabled = this.animationEnabled;
        if (args.propertyName === 'items') {
            viewModel.items = this.items.map(x => x.getViewModel());
        }
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'selectedIndexReal') {
            if (args.newValue >= 0) {
                this.changePage(this.preview);
            }
            else if (args.newValue < 0) {
                this.selectedIndexReal = 0;
            }
        }
        else if (args.propertyName === 'selectedIndex') {
            const result = args.newValue - args.oldValue;
            if (result === -2 || result === 1) {
                this.selectedIndexReal += 1;
            }
            else if (result === 2 || result === -1) {
                this.selectedIndexReal -= 1;
            }
        }
        if (args.propertyName === 'items' || args.propertyName === 'selectedIndex') {
            this.updateContentSize();
        }
    }
    updateContentSize() {
        const currentItem = this.items[this.selectedIndex];
        this._currentItemSubscriptionDispose && this._currentItemSubscriptionDispose();
        this._currentItemSubscriptionDispose = currentItem.events.on('blocksChanged', (args) => {
            _onCurrentItemBlocksChanged(currentItem.blocks);
        });
        let _currentBlockSubscriptions = [];
        const _onCurrentItemBlocksChanged = (blocks) => {
            const block = blocks && blocks[0];
            _currentBlockSubscriptions.forEach(x => x());
            _currentBlockSubscriptions = [];
            if (!block) {
                this.contentSize = { width: 'auto', height: 'auto' };
            }
            else {
                _currentBlockSubscriptions.push(block.events.on('positionChanged', (args) => {
                    onBlockChanged();
                }), block.page.events.on('sizeChanged', (args) => {
                    onBlockChanged();
                }));
                const onBlockChanged = () => {
                    const position = block.position;
                    const width = Math.max(position.width, block.page.size.width);
                    const height = Math.max(position.height, block.page.size.height);
                    this.contentSize = { width: width + 'px', height: height + 'px' };
                };
                onBlockChanged();
            }
        };
        _onCurrentItemBlocksChanged(currentItem.blocks);
    }
    dispose() {
        clearTimeout(this.repaintTimeout);
        super.dispose();
    }
    updatePagesVisible(preview) {
        if (this.items[this.selectedIndex]) {
            let someActive = false;
            const pages = this.items[this.selectedIndex].blocks;
            if (pages.length > 0) {
                for (let i = 0; i < pages.length; i++) {
                    if (pages[i].page) {
                        pages[i].page.isClientVisible = true;
                        if (pages[i].page.active) {
                            someActive = true;
                        }
                    }
                }
                if (!someActive) {
                    pages[0].page && preview.goToPage(pages[0].page.pageIndex);
                }
            }
        }
    }
    updateCurrentBlock() {
        if (this.items[this.selectedIndex]) {
            const blocks = this.items[this.selectedIndex].blocks;
            if (blocks.length > 0) {
                if (blocks.length > 1) {
                    this.currentBlockText = [blocks[0].page.pageIndex + 1, blocks[blocks.length - 1].page.pageIndex + 1].join(' - ');
                }
                else {
                    if (blocks[0].page) {
                        this.currentBlockText = (this.preview.pageIndex + 1).toString();
                    }
                }
            }
        }
    }
    updateContent(preview, pagesCount) {
        const itemsCount = Math.ceil(preview.visiblePages.length / pagesCount);
        let pageIndex = 0;
        let isCurrentBlock = false;
        let realIndex = 0;
        for (let i = 0; i < itemsCount; i++) {
            for (let j = 0; j < pagesCount; j++) {
                if (preview.visiblePages[pageIndex].active) {
                    isCurrentBlock = true;
                    realIndex = i;
                    break;
                }
                pageIndex++;
                if (preview.visiblePages.length === pageIndex) {
                    break;
                }
            }
            if (isCurrentBlock)
                break;
        }
        if (this.selectedIndexReal !== realIndex) {
            this.selectedIndexReal = realIndex;
        }
        else {
            this.changePage(preview);
        }
    }
    updateBlockPositions(blocks, visible) {
        const height = this.preview.previewWrapperSize.height / this.vertical;
        const width = this.preview.previewWrapperSize.width / this.horizontal;
        for (let i = 0; i < blocks.length; i++) {
            const vertical = Math.floor((i) / this.horizontal);
            const horizontal = i - (this.horizontal * vertical);
            const left = horizontal * width;
            if (blocks[i].visible === visible || blocks[i].visible === true) {
                blocks[i].position = {
                    top: vertical * height,
                    left: left,
                    width: width,
                    height: height
                };
                blocks[i].visible = true;
            }
            else {
                blocks[i].position = {
                    top: vertical * height,
                    left: blocks[i].classSet['left'] ? ((this.preview.previewWrapperSize.width + left) * -1) : this.preview.previewWrapperSize.width + left,
                    width: width,
                    height: height
                };
            }
        }
    }
    updateStartBlocks(galleryItem, pages) {
        const currentBlockPages = galleryItem.blocks.map(x => x.page);
        let firstPage = pages.indexOf(currentBlockPages[0]);
        if (firstPage !== -1) {
            for (let i = 0; i < firstPage; i++) {
                galleryItem.blocks.splice(i, 0, this._createBlock(galleryItem, pages[i], 'left', false));
            }
        }
        else {
            firstPage = currentBlockPages.indexOf(pages[0]);
            if (firstPage !== -1) {
                galleryItem.blocks.splice(0, firstPage);
            }
        }
        return firstPage;
    }
    updateLastBlocks(galleryItem, pages) {
        const currentBlockPages = galleryItem.blocks.map(x => x.page);
        let lastPage = pages.indexOf(currentBlockPages[currentBlockPages.length - 1]);
        if (lastPage !== -1) {
            for (let i = lastPage + 1; i < pages.length; i++) {
                galleryItem.blocks.splice(i, 0, this._createBlock(galleryItem, pages[i], 'right', false));
            }
        }
        else {
            lastPage = currentBlockPages.indexOf(pages[pages.length - 1]);
            galleryItem.blocks.splice(lastPage + 1, currentBlockPages.length - lastPage);
        }
        return lastPage;
    }
    updateBlocks(galleryItem, pagesCount, preview, index, useAnimation = false) {
        const blocks = galleryItem.blocks;
        if (galleryItem.realIndex !== index
            || (blocks.length !== pagesCount || blocks[0].page.pageIndex === -1)
            || blocks.some(x => x.repaint)) {
            galleryItem.realIndex = index;
            clearTimeout(this._animationTimeout);
            const startIndex = pagesCount * index;
            if (startIndex < 0 || startIndex >= preview.visiblePages.length) {
                galleryItem.blocks = [];
                return;
            }
            const pages = [];
            for (let i = startIndex; i < startIndex + pagesCount; i++) {
                if (i >= preview.visiblePages.length) {
                    break;
                }
                pages.push(preview.visiblePages[i]);
            }
            const first = this.updateStartBlocks(galleryItem, pages);
            const last = this.updateLastBlocks(galleryItem, pages);
            if (first === -1 && last === -1) {
                galleryItem.blocks = [];
                for (let i = 0; i < pages.length; i++) {
                    galleryItem.blocks.splice(i, 0, this._createBlock(galleryItem, pages[i], null, true));
                }
            }
            this.updateBlockPositions(galleryItem.blocks, true);
            const self = this;
            if (useAnimation) {
                this._animationTimeout = setTimeout(() => {
                    !self.isDisposing && self.updateBlockPositions(galleryItem.blocks, false);
                }, 400);
            }
            else {
                self.updateBlockPositions(galleryItem.blocks, false);
            }
        }
    }
    changePage(preview) {
        const pagesCount = this.horizontal * this.vertical;
        const itemsCount = Math.ceil(preview.visiblePages.length / pagesCount);
        if (this.selectedIndex === this.items.length - 1) {
            this.updateBlocks(this.items[0], pagesCount, preview, this.selectedIndexReal + 1);
            this.updateBlocks(this.items[1], pagesCount, preview, this.selectedIndexReal - 1);
        }
        else if (this.selectedIndex === 0) {
            this.updateBlocks(this.items[2], pagesCount, preview, this.selectedIndexReal - 1);
            this.updateBlocks(this.items[1], pagesCount, preview, this.selectedIndexReal + 1);
        }
        else {
            this.updateBlocks(this.items[0], pagesCount, preview, this.selectedIndexReal - 1);
            this.updateBlocks(this.items[2], pagesCount, preview, this.selectedIndexReal + 1);
        }
        const currentGalleryItem = this.items[this.selectedIndex];
        this.updateBlocks(currentGalleryItem, pagesCount, preview, this.selectedIndexReal, preview.animationSettings.zoomEnabled);
        if (!this.isAnimated) {
            this.updatePagesVisible(preview);
        }
        this.updateCurrentBlock();
    }
}
__decorate([
    mutable(() => { })
], GalleryModel.prototype, "repaint", void 0);
__decorate([
    mutable(null)
], GalleryModel.prototype, "repaintTimeout", void 0);
__decorate([
    mutable(false)
], GalleryModel.prototype, "isAnimated", void 0);
__decorate([
    mutableArray(() => [])
], GalleryModel.prototype, "items", void 0);
__decorate([
    mutable('')
], GalleryModel.prototype, "currentBlockText", void 0);
__decorate([
    mutable(0)
], GalleryModel.prototype, "selectedIndexReal", void 0);
__decorate([
    mutable(0)
], GalleryModel.prototype, "selectedIndex", void 0);
__decorate([
    mutable(false)
], GalleryModel.prototype, "animationEnabled", void 0);
