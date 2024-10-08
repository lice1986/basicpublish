﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryItem.js)
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
import { BaseRenderingModel, createViewModelGenerator, mutable, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
export class GalleryItemBlock extends BaseRenderingModel {
    constructor(options) {
        super();
        this.repaint = options.repaint;
        this.page = options.page;
        this.classSet = options.classSet;
        this.visible = options.visible;
        this.position = options.position;
        this.preview = options.reportPreview;
    }
    deferredUpdateViewModel() { return false; }
    onPropertyChanged(args) { }
    createViewModel() {
        var _a;
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('repaint', this.repaint)
            .generateProperty('classSet', this.classSet)
            .generateProperty('visible', this.visible)
            .generateProperty('position', this.position)
            .generateProperty('active', this.active)
            .generateProperty('page', (_a = this.page) === null || _a === void 0 ? void 0 : _a.getViewModel())
            .generateProperty('reportPreview', this.preview)
            .getViewModel();
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'position') {
            viewModel.position = this.position;
        }
        viewModel.active = this.active;
    }
}
__decorate([
    mutable(null)
], GalleryItemBlock.prototype, "position", void 0);
__decorate([
    mutable(false)
], GalleryItemBlock.prototype, "active", void 0);
export class GalleryItem extends BaseRenderingModel {
    constructor(preview, gallery) {
        super();
        this.preview = preview.getViewModel();
        this.gallery = gallery.getViewModel();
    }
    deferredUpdateViewModel() { return false; }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('blocks', this.blocks.map(x => x.getViewModel()))
            .generateProperty('gallery', this.gallery, true)
            .generateProperty('reportPreview', this.preview)
            .getViewModel();
    }
    updateViewModel(args) {
        var _a, _b;
        const viewModel = this.getViewModel();
        if (args.propertyName === 'blocks') {
            const arrayArgs = args;
            if (arrayArgs.added || arrayArgs.removed) {
                (_a = arrayArgs.added) === null || _a === void 0 ? void 0 : _a.forEach(change => viewModel.blocks.splice(change.index, 0, change.item.getViewModel()));
                (_b = arrayArgs.removed) === null || _b === void 0 ? void 0 : _b.sort((a, b) => b.index - a.index).forEach(change => viewModel.blocks.splice(change.index, 1));
            }
            else {
                viewModel.blocks = arrayArgs.newValue.map(x => x.getViewModel());
            }
        }
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'blocks') {
            this.enabled = this.blocks.length > 1;
        }
        else if (args.propertyName === 'enabled') {
            this.blocks.forEach(x => x.active === args.newValue);
        }
    }
}
__decorate([
    mutableArray(() => [])
], GalleryItem.prototype, "blocks", void 0);
__decorate([
    mutable(false)
], GalleryItem.prototype, "enabled", void 0);
