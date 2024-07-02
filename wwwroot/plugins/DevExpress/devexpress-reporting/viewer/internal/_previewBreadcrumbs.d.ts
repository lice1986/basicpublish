﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewBreadcrumbs.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewParametersViewModel } from '../parameters/previewParametersViewModel';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IPreviewInitialize } from '../utils/initializer';
export interface IBreadcrumbViewModel extends IViewModel {
    listItems: IBreadcrumbItem[];
    templateName: string;
    onClick: (itemIndex: number) => void;
    visible: boolean;
}
export interface IBreadcrumbItem extends IViewModel {
    position: number;
    previewInitData: IPreviewInitialize;
    displayText: string;
    parameterValues: any;
    pageIndex?: number;
    indexes?: string;
    onItemClick: (previewInitData: IPreviewInitialize, parameters: {
        [path: string]: string;
    }, pageIndex?: number, indexes?: string) => void;
}
export declare class BreadcrumbItem extends BaseRenderingModel<IBreadcrumbItem> implements IBreadcrumbItem {
    constructor(position: number, previewInitData?: IPreviewInitialize, onItemClick?: (previewInitData: IPreviewInitialize, parameters: {
        [path: string]: string;
    }) => void);
    getModel(): BreadcrumbItem;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    createViewModel(): IBreadcrumbItem;
    pageIndex?: number;
    indexes?: string;
    displayText: string;
    position: number;
    parameterValues: any;
    previewInitData: IPreviewInitialize;
    onItemClick: (previewInitData: IPreviewInitialize, parameters: {
        [path: string]: string;
    }) => void;
}
export declare class BreadcrumbModel extends BaseRenderingModel<IBreadcrumbViewModel> implements IBreadcrumbViewModel {
    addItem(previewInitData: IPreviewInitialize, itemClick?: () => void, displayText?: string): void;
    reset(): void;
    updateCurrentParameters(parametersViewModel: PreviewParametersViewModel): void;
    updateCurrentItem(previewInitData: IPreviewInitialize, itemClick: (previewInitData: IPreviewInitialize, parameters: {
        [path: string]: string;
    }) => void, displayText?: string): void;
    updateCurrentDocumentId(documentId: string): void;
    updateCurrentPosition(pageIndex: number, indexes: string): void;
    updateCurrentReportName(displayText: string): void;
    getCurrentPageInfo(): {
        pageIndex?: undefined;
        indexes?: undefined;
    } | {
        pageIndex: number;
        indexes: string;
    };
    private _currentIndex;
    onClick(itemIndex: number): void;
    constructor();
    dispose(): void;
    getModel(): BreadcrumbModel;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    createViewModel(): IBreadcrumbViewModel;
    templateName: string;
    updatePreviewSize: () => void;
    visible: boolean;
    listItems: IBreadcrumbItem[];
}