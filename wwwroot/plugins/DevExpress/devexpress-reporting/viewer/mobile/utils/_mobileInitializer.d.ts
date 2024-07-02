﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\utils\_mobileInitializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPreviewModelBase } from '../../internal/_previewModel';
import { MobileReportPreview } from '../mobilePreview';
import { MobileSearchViewModel } from '../internal/_mobileSearch';
import { GalleryModel } from '../internal/gallery/_galleryModel';
import { MobilePaginator } from '../internal/_paginator';
import { IBindingSettings } from '../../utils/initializer';
import { MobilePreviewModel } from '../internal/_mobilePreviewModel';
export interface IDesignerModelPart {
    id: string;
    templateName: string;
    model: any;
}
export interface IMobileDesignerModel extends IPreviewModelBase {
    reportPreview: MobileReportPreview;
    searchModel: MobileSearchViewModel;
    gallery?: GalleryModel;
    paginator?: MobilePaginator;
    availableFormats: {
        text: string;
        format: string;
    }[];
}
export declare function createMobilePreview(bindingSettings: IBindingSettings): MobilePreviewModel;