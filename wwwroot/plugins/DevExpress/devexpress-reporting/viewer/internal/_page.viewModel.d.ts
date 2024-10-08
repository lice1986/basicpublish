﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_page.viewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { ReportPreview } from '../reportPreview';
import { IBrickNode } from '../utils/utils';
import { IAutoFitOptions } from './_bindings';
import { PreviewPage } from './_page';
import { PreviewEditingFieldsKeyboardHelper } from '../accessibility/_previewEditingFieldsKeyboardHelper';
export interface IPreviewPageViewModel extends IViewModel {
    pageLoading: boolean;
    brickLoading: boolean;
    displayImageSrc: string;
    width: number;
    height: number;
    loadingText: string;
    brickSelectionProg: {
        page: PreviewPage;
        preview: ReportPreview;
        click: (pageIndex: number) => void;
    };
    autoFitOptions: IAutoFitOptions;
    editingFields: any[];
    delayedInit: () => void;
    clickToBrick: (sender: IPreviewPageViewModel, event: any) => void;
    currentPageAriaLabelImgAlt: string;
    bricks: IBrickNode[];
    activeBricks: IBrickNode[];
    clickableBricks: IBrickNode[];
    setPageActiveChangedEvent: (callback: (active: boolean) => void) => () => void;
    isClientVisible: boolean;
    color: string;
    active: boolean;
    editingFieldsKeyboardHelper: PreviewEditingFieldsKeyboardHelper;
}
export declare function createPreviewPageViewModel(this: PreviewPage, base: IPreviewPageViewModel): IPreviewPageViewModel;
export declare function updatePreviewPageViewModel(this: PreviewPage, args: PropertyChangedEventArgs<PreviewPage> | ArrayPropertyChangedEventArgs<PreviewPage>): void;
