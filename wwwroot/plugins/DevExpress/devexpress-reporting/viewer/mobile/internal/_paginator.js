﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_paginator.js)
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
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { $dx } from '@devexpress/analytics-core/analytics-internal-native';
export class MobilePaginator extends BaseRenderingModel {
    constructor(reportPreview, gallery) {
        super();
        this.reportPreview = reportPreview;
        this.gallery = gallery;
        this._updateText();
        this.addDisposable(reportPreview.events.on('pagesChanged', (args) => {
            this._updateText();
        }), reportPreview.events.on('pageIndexChanged', (args) => {
            this._updateText();
        }), gallery.events.on('currentBlockTextChanged', (args) => {
            this._updateText();
        }));
    }
    _updateText() {
        setTimeout(() => { this.visible = true; }, 1);
        if (this.reportPreview.pageIndex === -1) {
            this.text = getLocalization('0 pages', 'ASPxReportsStringId.WebDocumentViewer_0Pages');
        }
        else {
            const ofText = getLocalization('of', 'ASPxReportsStringId.ToolBarItemText_OfLabel');
            const pageText = getLocalization('Page', 'ASPxReportsStringId.ToolBarItemText_PageLabel');
            this.text = pageText + ' ' + this.gallery.currentBlockText + ' ' + ofText + ' ' + this.reportPreview.pages.length;
        }
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'visible') {
            this._updateVisibility && this._updateVisibility(args.newValue);
        }
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('visible', this.visible)
            .generateProperty('text', this.text)
            .getViewModel();
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        viewModel.text = this.text;
        viewModel.visible = this.visible;
    }
    initialize(element) {
        const $element = $dx(element);
        let timeoutId = null;
        let hideAnimationTimeoutId = null;
        this._updateVisibility = (newVal) => {
            if (newVal) {
                $element.removeClass('dxrdp-hide').addClass('dxrdp-show');
                timeoutId && clearTimeout(timeoutId);
                timeoutId = setTimeout(() => { this.visible = false; }, 2000);
            }
            else {
                $element.removeClass('dxrdp-show').addClass('dxrdp-hide');
                hideAnimationTimeoutId && clearTimeout(hideAnimationTimeoutId);
                hideAnimationTimeoutId = setTimeout(() => {
                    $element.removeClass('dxrdp-hide');
                }, 500);
            }
        };
    }
}
__decorate([
    mutable(false, { notify: 'always' })
], MobilePaginator.prototype, "visible", void 0);
__decorate([
    mutable('')
], MobilePaginator.prototype, "text", void 0);
