﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_page.viewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import { getLocalization, } from '@devexpress/analytics-core/analytics-utils-native';
export function createPreviewPageViewModel(base) {
    return createViewModelGenerator(base)
        .generateProperty('pageLoading', this.pageLoading)
        .generateProperty('brickLoading', this.brickLoading)
        .generateProperty('width', this.size.width)
        .generateProperty('height', this.size.height)
        .generateProperty('displayImageSrc', this.displayImageSrc)
        .generateProperty('loadingText', getLocalization('Loading...', 'AnalyticsCoreStringId.Loading'))
        .generateProperty('delayedInit', () => this.reportPreview.delayedInit())
        .generateProperty('brickSelectionProg', {
        page: this, preview: this.reportPreview, click: (pageIndex) => this.reportPreview.goToPage(pageIndex)
    })
        .generateProperty('autoFitOptions', {
        setZoom: (newValue) => {
            if (this.isDisposing)
                return;
            this.reportPreview.originalZoom = newValue;
        },
        setAutoFitChangedEvent: (callback) => {
            this._onAutoFitChanged = callback;
            return () => this._onAutoFitChanged = undefined;
        },
        getPageSizeConfiguration: () => this._getPageSizeConfiguration()
    })
        .generateProperty('clickToBrick', (_, event) => this._clickToBrick(event))
        .generateProperty('currentPageAriaLabelImgAlt', this.currentPageAriaLabelImgAlt)
        .generateProperty('editingFields', this.editingFields)
        .generateProperty('color', this.color)
        .generateProperty('bricks', this.bricks)
        .generateProperty('activeBricks', this.activeBricks)
        .generateProperty('active', this.active)
        .generateProperty('clickableBricks', this.clickableBricks)
        .generateProperty('setPageActiveChangedEvent', (callback) => {
        this._onPageActiveChanged = callback;
        return () => {
            this._onPageActiveChanged = undefined;
        };
    })
        .generateProperty('editingFieldsKeyboardHelper', this.editingFieldsKeyboardHelper)
        .getViewModel();
}
export function updatePreviewPageViewModel(args) {
    const viewModel = this.getViewModel();
    if (args.propertyName === 'displayImageSrc') {
        viewModel.displayImageSrc = this.displayImageSrc;
    }
    else if (args.propertyName === 'pageLoading') {
        viewModel.pageLoading = this.pageLoading;
    }
    else if (args.propertyName === 'brickLoading') {
        viewModel.brickLoading = this.brickLoading;
    }
    else if (args.propertyName === 'isClientVisible') {
        viewModel.isClientVisible = this.isClientVisible;
    }
    else if (args.propertyName === 'active') {
        viewModel.active = this.active;
    }
    else if (args.propertyName === 'size') {
        viewModel.width = args.newValue['width'];
        viewModel.height = args.newValue['height'];
    }
    else if (args.propertyName === 'brick') {
        viewModel.bricks = this.bricks;
        viewModel.activeBricks = this.activeBricks;
        viewModel.clickableBricks = this.clickableBricks;
    }
    else if (args.propertyName === 'activeBricks') {
        if ('added' in args) {
            const arrayArgs = args;
            viewModel.activeBricks.push(...arrayArgs.added.map(x => x.item));
            arrayArgs.removed.forEach((x) => {
                viewModel.activeBricks.splice(viewModel.activeBricks.indexOf(x.item), 1);
            });
        }
        else {
            viewModel.activeBricks = this.activeBricks;
        }
    }
    else if (args.propertyName === 'editingFields') {
        viewModel.editingFields = this.editingFields.map(x => x.getViewModel());
    }
    else if (args.propertyName === 'currentPageAriaLabelImgAlt') {
        viewModel.currentPageAriaLabelImgAlt = this.currentPageAriaLabelImgAlt;
    }
}
