﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewPage } from '../../internal/_page';
import { IPreviewPageViewModel } from '../../internal/_page.viewModel';
import { IBrickNode } from '../../utils/utils';
import { MobileReportPreview } from '../mobilePreview';
export interface IMobilePageViewModel extends IPreviewPageViewModel {
    readerMode: boolean;
    hasBricks: boolean;
}
export declare class MobilePreviewPage extends PreviewPage {
    deferredUpdateViewModel(): boolean;
    createViewModel(): IMobilePageViewModel;
    updateViewModel(args: PropertyChangedEventArgs<MobilePreviewPage> | ArrayPropertyChangedEventArgs<MobilePreviewPage>): void;
    constructor(preview: MobileReportPreview, pageIndex: number, processClick?: (target: IBrickNode) => void, subscribeToPageLoading?: boolean);
    hasBricks: boolean;
    readerMode: boolean;
    maxZoom: number;
}