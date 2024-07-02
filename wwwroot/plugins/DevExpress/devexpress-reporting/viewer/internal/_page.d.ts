﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_page.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { INumericSize } from '@devexpress/analytics-core/analytics-elements-native';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewEditingFieldsKeyboardHelper } from '../accessibility/_previewEditingFieldsKeyboardHelper';
import { ZoomAutoBy } from '../constants';
import { EditingFieldBase } from '../editing/models/editingFieldBase';
import { ReportPreview } from '../reportPreview';
import { IBrickNode } from '../utils/utils';
import { IPageSizeConfiguration } from './_bindings';
import { IPreviewPageViewModel } from './_page.viewModel';
import { IGetPageResponse } from './_previewRequestWrapper';
export interface IGetPageRequest {
    pageIndex: number;
    documentId: string;
    resolution: number;
    includeBricks: boolean;
}
export declare class PreviewPage extends BaseRenderingModel<IPreviewPageViewModel> {
    reportPreview: ReportPreview;
    createViewModel(): IPreviewPageViewModel;
    updateViewModel(args: PropertyChangedEventArgs<PreviewPage> | ArrayPropertyChangedEventArgs<PreviewPage>): void;
    onPropertyChanged(args: PropertyChangedEventArgs<PreviewPage>): void;
    private _initializeEditingFields;
    private _getPixelRatio;
    private _onPageLoaded;
    private _onPageLoadFailed;
    private _updatePageSize;
    private _getAriaLabel;
    constructor(reportPreview: ReportPreview, pageIndex: number, processClick?: (target: IBrickNode) => void, subscribeToPageLoading?: boolean);
    updateSize(zoom?: number): number;
    updateActiveBricks(): void;
    activateBrick(brick: IBrickNode): void;
    deactivateBrick(brick: IBrickNode): void;
    clearBricks(): void;
    dispose(): void;
    _setPageImgSrc(documentId: string, unifier: string, zoom?: number, shouldSkipBricks?: boolean): void;
    _requestPage(preview: ReportPreview): void;
    _getCurrentPageRequest(documentId: string, shouldSkipBricks?: boolean): IGetPageRequest;
    _getPageSizeConfiguration(): IPageSizeConfiguration;
    _clear(): void;
    initializeBrick(brick: IBrickNode, processClick: (target: IBrickNode) => void, editingFieldBricks: IBrickNode[]): void;
    _clickToBrick(e: JQueryEventObject): void;
    getBricksFlatList(brick: IBrickNode): IBrickNode[];
    editingFields: EditingFieldBase[];
    selectBrick: (path: string, ctrlKey?: boolean) => void;
    resetBrickRecusive: (brick: IBrickNode) => void;
    getBricks: (pageIndex: number) => void;
    actualResolution: number;
    isEmpty: boolean;
    pageIndex: number;
    _currentScaleFactor: any;
    currentScaleFactor: number;
    imageHeight: number;
    imageWidth: number;
    color: string;
    isClientVisible: boolean;
    zoom: number;
    previewSize: number;
    autoFitBy: ZoomAutoBy;
    size: INumericSize;
    originalSize: INumericSize;
    imageSrcOptions: {
        rateLimit: {
            timeout: number;
            method: string;
        };
    };
    imageSrc: string;
    pageLoading: boolean;
    brickLoading: boolean;
    displayImageSrc: string;
    active: boolean;
    brick: IBrickNode;
    _unifier: string;
    currentPageAriaLabelImgAlt: string;
    shouldSkipBrickLoading: boolean;
    brickColumnWidthArray: Array<number>;
    bricks: IBrickNode[];
    activeBricks: IBrickNode[];
    clickableBricks: IBrickNode[];
    maxZoom: number;
    disableResolutionReduction: boolean;
    editingFieldsKeyboardHelper: PreviewEditingFieldsKeyboardHelper;
    shouldSendRequest: boolean;
    lastGetPageDeferred: JQueryDeferred<IGetPageResponse>;
    _onAutoFitChanged: () => void;
    _onPageActiveChanged: (active: boolean) => void;
    private _lastZoom;
    protected _selectedBrickPath: string;
    private _isDisposed;
    private _resizeTimeout;
    private _onResize;
    private _onImageSrcChanged;
    private _editingFieldsSubscriptionDispose;
}