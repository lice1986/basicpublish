﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePreviewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPreviewViewModelBase, PreviewDisposableModel } from '../../internal/_previewModel';
import { GalleryModel } from './gallery/_galleryModel';
import { IMobilePaginatorViewModel, MobilePaginator } from './_paginator';
import { IMobileDesignerModel } from '../utils/_mobileInitializer';
import { MobileReportPreview } from '../mobilePreview';
import { MobileSearchViewModel } from './_mobileSearch';
import { IMobileReportPreviewViewModel } from '../mobilePreview.viewModel';
import { ISearchViewModel } from '../../search/_searchViewModel';
export interface IMobilePreviewViewModel extends IPreviewViewModelBase {
    paginator: IMobilePaginatorViewModel;
    searchModel: ISearchViewModel;
}
export declare class MobilePreviewModel extends PreviewDisposableModel {
    deferredUpdateViewModel(): boolean;
    gallery: GalleryModel;
    paginator: MobilePaginator;
    availableFormats: Array<{
        text: string;
        format: string;
    }>;
    constructor(options: IMobileDesignerModel);
    createViewModel(): IMobilePreviewViewModel;
    reportPreviewViewModel: IMobileReportPreviewViewModel;
    reportPreview: MobileReportPreview;
    searchModel: MobileSearchViewModel;
    getViewModel: () => IMobilePreviewViewModel;
}
