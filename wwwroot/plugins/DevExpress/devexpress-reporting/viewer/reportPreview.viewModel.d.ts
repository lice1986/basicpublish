﻿/**
* DevExpress HTML/JS Reporting (viewer\reportPreview.viewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewBricksKeyboardHelper } from './accessibility/_previewBricksKeyboardHelper';
import { ILazyImagesOptions } from './internal/_bindings';
import { IPreviewPageViewModel } from './internal/_page.viewModel';
import { ISignatureDisplayItem } from './internal/_previewRequestWrapper';
import { IProgressBarViewModel } from './internal/_progressViewModel';
import { ReportPreview } from './reportPreview';
export interface IReportPreviewViewModel extends IViewModel {
    rtlReport: boolean;
    editingFieldsHighlighted: boolean;
    progressBar: IProgressBarViewModel;
    currentPage: IPreviewPageViewModel;
    pages: IPreviewPageViewModel[];
    showMultipagePreview: boolean;
    emptyDocumentCaption: string;
    previewVisible: boolean;
    lazyImagesOptions: ILazyImagesOptions;
    getSelectedContent: (mask?: string) => string;
    delayedInit: () => void;
    signatures: ISignatureDisplayItem[];
    previewBrickKeyboardHelper: PreviewBricksKeyboardHelper;
}
export declare function createReportPreviewViewModel(this: ReportPreview, base: IReportPreviewViewModel): IReportPreviewViewModel;
export declare function updateReportPreviewViewModel(this: ReportPreview, args: PropertyChangedEventArgs<ReportPreview> | ArrayPropertyChangedEventArgs<ReportPreview>): void;
