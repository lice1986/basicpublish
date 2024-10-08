﻿/**
* DevExpress HTML/JS Reporting (viewer\reportPreview.viewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
export function createReportPreviewViewModel(base) {
    var _a, _b;
    return createViewModelGenerator(base)
        .generateProperty('editingFieldsHighlighted', this.editingFieldsHighlighted)
        .generateProperty('rtlReport', this.rtlReport)
        .generateProperty('currentPage', (_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.getViewModel())
        .generateProperty('progressBar', (_b = this.progressBar) === null || _b === void 0 ? void 0 : _b.getViewModel())
        .generateProperty('showMultipagePreview', this.showMultipagePreview)
        .generateProperty('previewVisible', this.previewVisible)
        .generateProperty('getSelectedContent', (mask) => this.getSelectedContent(mask))
        .generateProperty('lazyImagesOptions', {
        getEnabled: () => this.showMultipagePreview,
        setLoadVisibleImagesCallback: (callback) => {
            this._loadVisibleImages = callback;
            return () => {
                this._loadVisibleImages = null;
            };
        },
        getPage: (index) => {
            return this.pages[index];
        },
        setPageVisibility: (page, isVisible) => this.setPageVisibility(page.getModel(), isVisible)
    })
        .generateProperty('pages', this._getPagesViewModels())
        .generateProperty('delayedInit', () => this.delayedInit())
        .generateProperty('emptyDocumentCaption', this.emptyDocumentCaption)
        .generateProperty('previewBrickKeyboardHelper', this.previewBrickKeyboardHelper)
        .getViewModel();
}
export function updateReportPreviewViewModel(args) {
    var _a;
    const viewModel = this.getViewModel();
    if (args.propertyName === 'editingFieldsHighlighted') {
        viewModel.editingFieldsHighlighted = this.editingFieldsHighlighted;
    }
    if (args.propertyName === 'showMultipagePreview') {
        viewModel.showMultipagePreview = this.showMultipagePreview;
    }
    if (args.propertyName === 'rtlReport') {
        viewModel.rtlReport = this.rtlReport;
    }
    if (args.propertyName === 'emptyDocumentCaption') {
        viewModel.emptyDocumentCaption = this.emptyDocumentCaption;
    }
    if (args.propertyName === 'previewVisible') {
        viewModel.previewVisible = this.previewVisible;
    }
    if (args.propertyName === 'currentPage') {
        viewModel.currentPage = (_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.getViewModel();
    }
    if (args.propertyName === 'pages') {
        viewModel.pages = this._getPagesViewModels();
    }
    if (args.propertyName === 'signatures') {
        viewModel.signatures = this.signatures;
    }
}
