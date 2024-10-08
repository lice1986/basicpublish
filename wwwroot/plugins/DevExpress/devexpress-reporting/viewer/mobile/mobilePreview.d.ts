﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\mobilePreview.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportPreview } from '../reportPreview';
import { PreviewRequestWrapper } from '../internal/_previewRequestWrapper';
import { PreviewHandlersHelper } from '../internal/_previewHandlersHelper';
import { IPreviewCustomizationHandler, IMobileModeSettings, IExportSettings } from '../utils/initializer';
import { IBrickNode } from '../utils/utils';
import { MobilePreviewPage } from './internal/_mobilePage';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IReportPreviewViewModel } from '../reportPreview.viewModel';
import { ScrollEvent } from 'devextreme/ui/scroll_view';
import { SelectionChangedEvent } from 'devextreme/ui/gallery';
import { INumericSize } from '@devexpress/analytics-core/analytics-elements-native';
import { MobileSearchViewModel } from './internal/_mobileSearch';
import { GalleryModel } from './internal/gallery/_galleryModel';
import { BreadcrumbModel } from '../internal/_previewBreadcrumbs';
export interface ISlideOptions {
    getDisabled: () => boolean;
    readerMode: boolean;
    animationSettings: IPreviewAnimationSettings;
    getRepaintTimeout: () => ReturnType<typeof setTimeout>;
    setRepaintTimeout: (value: ReturnType<typeof setTimeout>) => void;
    searchPanel: MobileSearchViewModel;
    getReachedTop: () => boolean;
    getReachedLeft: () => boolean;
    getReachedRight: () => boolean;
    getZoomUpdating: () => boolean;
    setZoomUpdating: (value: boolean) => void;
    getGalleryIsAnimated: () => boolean;
    setAutoFitBy: (value: number) => void;
    getTopOffset: () => number;
    setTopOffset: (value: number) => void;
    getBrickEventsDisabled: () => boolean;
    setBrickEventsDisabled: (value: boolean) => void;
    getSwipeEnabled: () => boolean;
    getScrollAvailable: () => boolean;
}
export interface IPreviewAnimationSettings {
    zoomEnabled: boolean;
    swipeEnabled: boolean;
}
export declare class MobileReportPreview extends ReportPreview {
    deferredUpdateViewModel(): boolean;
    private _getSwipeEnabled;
    private _getScrollAvailable;
    constructor(handlerUri?: string, previewRequestWrapper?: PreviewRequestWrapper, previewHandlersHelper?: PreviewHandlersHelper, callbacks?: IPreviewCustomizationHandler, rtl?: boolean, mobileSettings?: IMobileModeSettings, breadcrumb?: BreadcrumbModel, exportSettings?: IExportSettings);
    onPropertyChanged(args: PropertyChangedEventArgs<MobileReportPreview>): void;
    createViewModel(): IReportPreviewViewModel;
    updateViewModel(args: PropertyChangedEventArgs<MobileReportPreview> | ArrayPropertyChangedEventArgs<MobileReportPreview>): void;
    setZoomUpdating(newValue: boolean): void;
    createPage(pageIndex: number, processClick?: (target: IBrickNode) => void, subscribeToPageLoading?: boolean): MobilePreviewPage;
    createBrickClickProcessor(cyclePageIndex: number): (brick: IBrickNode) => void;
    _hasActiveEditingFields(): boolean;
    showActions(): void;
    onSlide(e: SelectionChangedEvent): void;
    goToPage(pageIndex: number, forcePage?: boolean): void;
    setScrollReached(e: ScrollEvent): void;
    initializeSlideOptions(searchModel: MobileSearchViewModel, gallery: GalleryModel): void;
    slideOptions: ISlideOptions;
    readerMode: boolean;
    animationSettings: IPreviewAnimationSettings;
    pages: MobilePreviewPage[];
    topOffset: number;
    previewWrapperSize: INumericSize;
    interactionDisabled: boolean;
    availablePages: number[];
    visiblePages: MobilePreviewPage[];
    searchPanelVisible: boolean;
    actionsVisible: boolean;
    scrollReachedLeft: boolean;
    scrollReachedRight: boolean;
    scrollReachedTop: boolean;
    scrollReachedBottom: boolean;
    zoomUpdating: boolean;
    mobileZoom: number;
    mobileZoomRead: number;
    brickEventsDisabled: boolean;
    scrollAvailable: boolean;
}
