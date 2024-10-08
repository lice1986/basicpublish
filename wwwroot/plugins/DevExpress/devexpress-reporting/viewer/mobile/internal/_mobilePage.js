﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePage.js)
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
import { createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewPage } from '../../internal/_page';
export class MobilePreviewPage extends PreviewPage {
    constructor(preview, pageIndex, processClick, subscribeToPageLoading = false) {
        super(preview, pageIndex, processClick, subscribeToPageLoading);
        this.maxZoom = 1;
        this.readerMode = preview.readerMode;
        this.selectBrick = (path, ctrlKey) => {
            const currentBrick = this.brick;
            !ctrlKey && this.resetBrickRecusive(currentBrick);
            if (!path) {
                return;
            }
            if (!currentBrick) {
                this._selectedBrickPath = path;
                return;
            }
            this.bricks.forEach((brick) => { if (brick.indexes === path)
                this.activateBrick(brick); });
        };
    }
    deferredUpdateViewModel() { return false; }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('readerMode', this.readerMode)
            .generateProperty('hasBricks', this.hasBricks)
            .getViewModel();
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const viewModel = this.getViewModel();
        viewModel.hasBricks = this.hasBricks;
    }
}
__decorate([
    mutable(false)
], MobilePreviewPage.prototype, "hasBricks", void 0);
