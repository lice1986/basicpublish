﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\mobilePreview.viewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
export function createMobileReportPreviewViewModel(base) {
    return createViewModelGenerator(base)
        .generateProperty('mobileZoomOptions', {
        getZoom: () => this.mobileZoomRead,
        setZoomUpdating: (newValue) => this.setZoomUpdating(newValue),
        setZoom: (newValue) => this.mobileZoom = newValue,
    })
        .generateProperty('zoomUpdating', this.zoomUpdating)
        .generateProperty('previewWrapperSizeWidth', this.previewWrapperSize.width)
        .generateProperty('previewWrapperSizeHeight', this.previewWrapperSize.height)
        .generateProperty('surfaceEvents', this.documentId === null ? 'none' : '')
        .generateProperty('galleryEvents', this.zoomUpdating ? 'none' : '')
        .generateProperty('pageEvents', this.brickEventsDisabled ? 'none' : '')
        .generateProperty('slideOptions', this.slideOptions)
        .generateProperty('topOffset', this.topOffset)
        .generateProperty('click', () => !this.brickEventsDisabled && this.showActions())
        .generateProperty('scrollViewOptions', createViewModelGenerator()
        .generateProperty('direction', 'both')
        .generateProperty('pushBackValue', '0')
        .generateProperty('bounceEnabled', false)
        .generateProperty('disabled', this.zoomUpdating)
        .generateProperty('onUpdated', (e) => { this.setScrollReached(e); })
        .getViewModel())
        .generateProperty('onSlide', (event) => this.onSlide(event))
        .getViewModel();
}
export function updateMobileReportPreviewViewModel(args) {
    const viewModel = this.getViewModel();
    if (args.propertyName === 'zoomUpdating') {
        viewModel.zoomUpdating = this.zoomUpdating;
    }
    if (args.propertyName === 'previewWrapperSize') {
        viewModel.previewWrapperSizeHeight = this.previewWrapperSize.height;
        viewModel.previewWrapperSizeWidth = this.previewWrapperSize.width;
    }
    if (args.propertyName === 'documentId') {
        viewModel.surfaceEvents = this.documentId === null ? 'none' : '';
    }
    if (args.propertyName === 'brickEventsDisabled') {
        viewModel.pageEvents = this.brickEventsDisabled ? 'none' : '';
    }
    if (args.propertyName === 'zoomUpdating') {
        viewModel.surfaceEvents = this.zoomUpdating ? 'none' : '';
        viewModel.scrollViewOptions.disabled = this.zoomUpdating;
    }
    if (args.propertyName === 'slideOptions') {
        viewModel.slideOptions = this.slideOptions;
    }
    if (args.propertyName === 'topOffset') {
        viewModel.topOffset = this.topOffset;
    }
}
