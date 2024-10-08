﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePreviewModel.js)
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
import { PreviewDisposableModel } from '../../internal/_previewModel';
import { createViewModelGenerator, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
export class MobilePreviewModel extends PreviewDisposableModel {
    constructor(options) {
        super(options);
        this.gallery = options.gallery;
        this.availableFormats = options.availableFormats;
        this._disposables.push(options.gallery);
        this._disposables.push(options.paginator);
        this._disposables.push(options.searchModel);
        this.paginator = options.paginator;
        this.reportPreview.initializeSlideOptions(options.searchModel, options.gallery);
    }
    deferredUpdateViewModel() { return false; }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('paginator', this.paginator.getViewModel())
            .generateProperty('searchModel', this.searchModel.getViewModel())
            .getViewModel();
    }
}
__decorate([
    mutableArray(() => [])
], MobilePreviewModel.prototype, "availableFormats", void 0);
