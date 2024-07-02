﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\mobilePreview.viewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { OptionChangedEvent, SelectionChangedEvent } from 'devextreme/ui/gallery';
import { dxScrollViewOptions } from 'devextreme/ui/scroll_view';
import { IReportPreviewViewModel } from '../reportPreview.viewModel';
import { IGalleryViewModel } from './internal/gallery/_galleryModel';
import { ISlideOptions, MobileReportPreview } from './mobilePreview';
export interface IZoomOptions {
    setZoomUpdating: (newValue: boolean) => void;
    getZoom: () => number;
    setZoom: (newValue: number) => void;
}
export interface IScrollViewOptions extends dxScrollViewOptions {
    pushBackValue: string;
}
export interface IMobileReportPreviewViewModel extends IReportPreviewViewModel {
    mobileZoomOptions: IZoomOptions;
    zoomUpdating: boolean;
    previewWrapperSizeHeight: number;
    previewWrapperSizeWidth: number;
    surfaceEvents: string;
    galleryEvents: string;
    pageEvents: string;
    slideOptions: ISlideOptions;
    gallery: IGalleryViewModel;
    topOffset: number;
    scrollViewOptions: IScrollViewOptions;
    onSlide: (event: SelectionChangedEvent) => void;
    onOptionChanged: (event: OptionChangedEvent) => void;
    click: () => void;
}
export declare function createMobileReportPreviewViewModel(this: MobileReportPreview, base: IReportPreviewViewModel): IMobileReportPreviewViewModel;
export declare function updateMobileReportPreviewViewModel(this: MobileReportPreview, args: PropertyChangedEventArgs<MobileReportPreview> | ArrayPropertyChangedEventArgs<MobileReportPreview>): void;