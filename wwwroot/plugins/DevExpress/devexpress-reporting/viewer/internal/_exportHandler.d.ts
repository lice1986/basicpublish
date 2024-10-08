﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_exportHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { ReportPreview } from '../reportPreview';
import { IExportSettings } from '../utils/initializer';
import { IExportToolViewModel } from './_exportHandler.viewModel';
import { IExportProgressStatus } from './_previewHandlersHelper';
export declare class ExportResultRequestData {
    RequestUrl: string;
    FormData: Object;
    QueryParameters: Object;
}
export declare class ExportHandler extends BaseRenderingModel<IExportToolViewModel> {
    private preview;
    exportActionUri: string;
    exportFormData: Array<{
        name: string;
        value: string;
    }>;
    reportDisplayName: string;
    popupVisible: boolean;
    exportingFrame: HTMLIFrameElement;
    postingForm: HTMLFormElement;
    exportingFrameName: string;
    printingLinkCallback: () => void;
    getPopupTitle: () => string;
    onExportCustomEvent: (data: any) => void;
    private _exportResultRequestData;
    private _showPrintNotificationDialog;
    private _useSameTabExport;
    private _useAsynchronousExport;
    private _workerTicker;
    private _workerFunctionBlobUrl;
    private _xhr;
    private _exportResultDeferred;
    private _workerTickerFunction;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    createViewModel(): IExportToolViewModel;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    constructor(exportSetting: IExportSettings, preview: ReportPreview);
    private _getUrlObject;
    private _createWorker;
    private _terminateWorker;
    private _callPrint;
    private _window;
    clearExportTools(): void;
    private _initPrintingWindow;
    private _setPrintingLinkCallback;
    private _formSubmit;
    private _doExportSync;
    private _handleFile;
    private _getExportResultUsingFetch;
    private _handleBlobUsingFetch;
    private _getFileName;
    private _initExportWindow;
    private _startExportAsync;
    export(args: () => string, actionUri: string, inlineResult?: boolean, printable?: boolean): JQuery.Promise<boolean>;
    private _showAsyncExportError;
    private _printUsingBlob;
    private _executeXhr;
    private _printUsingBlobFetch;
    private _prepareXhr;
    private _handleXhrReady;
    private _addQueryParamsToUri;
    private _replaceLocation;
    private _timeouts;
    dispose(): void;
    updateExportStatus(progress: number, operationId: string): void;
    getExportStatus(operationId: string): JQueryPromise<IExportProgressStatus>;
    getExportResult(operationId: string, inlineDisposition: boolean, useSameTab: boolean, token?: string, printable?: boolean, uri?: string, abortController?: AbortController): void;
}
