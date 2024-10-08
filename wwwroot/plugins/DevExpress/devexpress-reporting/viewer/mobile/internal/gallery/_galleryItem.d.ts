﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryItem.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewPage } from '../../../internal/_page';
import { IPreviewPageViewModel } from '../../../internal/_page.viewModel';
import { MobileReportPreview } from '../../mobilePreview';
import { IMobileReportPreviewViewModel } from '../../mobilePreview.viewModel';
import { GalleryModel, IAbsolutePosition, IGalleryViewModel as IGalleryViewModel } from './_galleryModel';
export interface IGalleryItemBlock {
    repaint?: boolean;
    page: PreviewPage | IPreviewPageViewModel;
    classSet?: any;
    visible?: boolean;
    position: IAbsolutePosition;
    reportPreview: IMobileReportPreviewViewModel;
}
export interface IGalleryItemBlockViewModel extends IViewModel, IGalleryItemBlock {
    page: IPreviewPageViewModel;
    active: boolean;
}
export interface IGalleryItemViewModel extends IViewModel {
    blocks: IGalleryItemBlockViewModel[];
    reportPreview: IMobileReportPreviewViewModel;
    gallery: IGalleryViewModel;
}
export declare class GalleryItemBlock extends BaseRenderingModel<IGalleryItemBlockViewModel> {
    deferredUpdateViewModel(): boolean;
    onPropertyChanged(args: PropertyChangedEventArgs<GalleryItemBlock>): void;
    createViewModel(): IGalleryItemBlockViewModel;
    updateViewModel(args: PropertyChangedEventArgs<GalleryItemBlock> | ArrayPropertyChangedEventArgs<GalleryItemBlock>): void;
    constructor(options: IGalleryItemBlock);
    repaint?: boolean;
    page: PreviewPage;
    classSet?: any;
    visible?: boolean;
    position: IAbsolutePosition;
    active: boolean;
    preview: IMobileReportPreviewViewModel;
}
export declare class GalleryItem extends BaseRenderingModel<IGalleryItemViewModel> {
    deferredUpdateViewModel(): boolean;
    createViewModel(): IGalleryItemViewModel;
    updateViewModel(args: PropertyChangedEventArgs<GalleryItem> | ArrayPropertyChangedEventArgs<GalleryItem>): void;
    onPropertyChanged(args: PropertyChangedEventArgs<GalleryItem>): void;
    constructor(preview: MobileReportPreview, gallery: GalleryModel);
    blocks: GalleryItemBlock[];
    realIndex?: number;
    preview: IMobileReportPreviewViewModel;
    gallery: IGalleryViewModel;
    enabled: boolean;
}
