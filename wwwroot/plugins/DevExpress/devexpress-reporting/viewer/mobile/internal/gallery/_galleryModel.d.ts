﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewPage } from '../../../internal/_page';
import { MobileReportPreview } from '../../mobilePreview';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { GalleryItem, GalleryItemBlock, IGalleryItemViewModel } from './_galleryItem';
import { OptionChangedEvent } from 'devextreme/ui/gallery';
export interface IAbsolutePosition {
    left: number;
    top: number;
    height: number;
    width: number;
}
export interface IGalleryViewModel extends IViewModel {
    items: IGalleryItemViewModel[];
    animationEnabled: boolean;
    selectedIndex: number;
    onOptionChanged: (event: OptionChangedEvent) => void;
}
export declare class GalleryModel extends BaseRenderingModel<IGalleryViewModel> {
    preview: MobileReportPreview;
    deferredUpdateViewModel(): boolean;
    private _spacing;
    private _animationTimeout;
    private _currentItemSubscriptionDispose;
    private _createBlock;
    createViewModel(): IGalleryViewModel;
    updateViewModel(args: PropertyChangedEventArgs<GalleryModel> | ArrayPropertyChangedEventArgs<GalleryModel>): void;
    onPropertyChanged(args: PropertyChangedEventArgs<GalleryModel> | ArrayPropertyChangedEventArgs<GalleryModel>): void;
    updateContentSize(): void;
    constructor(preview: MobileReportPreview);
    dispose(): void;
    updatePagesVisible(preview: MobileReportPreview): void;
    updateCurrentBlock(): void;
    updateContent(preview: MobileReportPreview, pagesCount: number): void;
    updateBlockPositions(blocks: GalleryItemBlock[], visible: boolean): void;
    updateStartBlocks(galleryItem: GalleryItem, pages: PreviewPage[]): number;
    updateLastBlocks(galleryItem: GalleryItem, pages: PreviewPage[]): number;
    updateBlocks(galleryItem: GalleryItem, pagesCount: number, preview: MobileReportPreview, index: number, useAnimation?: boolean): void;
    changePage(preview: MobileReportPreview): void;
    repaint: object;
    _repaint: () => void;
    repaintTimeout: ReturnType<typeof setTimeout>;
    contentSize: {
        width: string;
        height: string;
    };
    horizontal: number;
    vertical: number;
    pageCount: number;
    isAnimated: boolean;
    items: GalleryItem[];
    currentBlockText: string;
    selectedIndexReal: number;
    selectedIndex: number;
    animationEnabled: boolean;
    getSwipeRightEnabled: () => boolean;
    getSwipeLeftEnabled: () => boolean;
}
