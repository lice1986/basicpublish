﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_bindings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportPreviewViewModel } from '../reportPreview.viewModel';
import { IPreviewPageViewModel } from './_page.viewModel';
import { PreviewPage } from './_page';
import { IExportToolViewModel } from './_exportHandler.viewModel';
export interface IToViewOptions {
    setPageActiveChangedEvent: (callback: (active: boolean) => void) => () => void;
}
export declare function initializeToViewBinding(previewPage: HTMLElement, options: IToViewOptions): () => void;
export interface ILazyImagesOptions {
    getEnabled: () => boolean;
    setLoadVisibleImagesCallback: (callback: () => void) => () => void;
    getPage(index: number): PreviewPage;
    setPageVisibility: (page: IPreviewPageViewModel, isVisible: boolean) => void;
}
export declare function initializeLazyImagesBinding(element: HTMLElement, options: ILazyImagesOptions): () => void;
export interface ITextCopierOptions {
    viewModel: IReportPreviewViewModel;
}
export declare function initializeTextCopierBinding(element: Element, options: ITextCopierOptions): () => void;
export interface IAutoFitOptions {
    setAutoFitChangedEvent: (callback: () => void) => () => void;
    getPageSizeConfiguration: () => IPageSizeConfiguration;
    setZoom: (newValue: number) => void;
}
export interface IPageSizeConfiguration {
    skipIfInvisible: boolean;
    width: number;
    height: number;
    autoFitBy: number;
}
export declare function initializeAutoFitBinding(element: HTMLElement, autoFitOptions: IAutoFitOptions): () => void;
export interface IChildStyleOptions {
    style: {
        [key: string]: string;
    };
    selector: string;
}
export declare function initializeChildStyleBinding(element: HTMLElement, values: IChildStyleOptions): void;
export declare function initializeViewerExportBinding(element: HTMLElement, exportHandlerViewModel: IExportToolViewModel): void;