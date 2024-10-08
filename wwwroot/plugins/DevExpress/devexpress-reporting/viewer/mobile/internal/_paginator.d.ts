﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_paginator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MobileReportPreview } from '../mobilePreview';
import { GalleryModel } from './gallery/_galleryModel';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
export interface IMobilePaginatorViewModel extends IViewModel {
    visible: boolean;
    text: string;
}
export declare class MobilePaginator extends BaseRenderingModel<IMobilePaginatorViewModel> {
    reportPreview: MobileReportPreview;
    gallery: GalleryModel;
    private _updateVisibility;
    private _updateText;
    onPropertyChanged(args: PropertyChangedEventArgs<MobilePaginator> | ArrayPropertyChangedEventArgs<MobilePaginator>): void;
    createViewModel(): IMobilePaginatorViewModel;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    initialize(element: HTMLElement): void;
    constructor(reportPreview: MobileReportPreview, gallery: GalleryModel);
    visible: boolean;
    text: string;
}
