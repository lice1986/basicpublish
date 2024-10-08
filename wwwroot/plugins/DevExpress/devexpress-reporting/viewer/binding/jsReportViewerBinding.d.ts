﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewerBinding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ICommonBindingCustomizationHandler, IJSDesignerBindingCommonOptions, JSDesignerBindingCommon } from '@devexpress/analytics-core/analytics-internal-native';
import { IPreviewCustomizationHandler, IWebDocumentViewerSettings } from '../utils/initializer';
import { JSReportViewer } from './jsReportViewer';
import { IPreviewCustomizationCallbacksPublic } from '../utils/publicCallbacks';
import { PreviewDisposableModel } from '../internal/_previewModel';
export interface IJSReportViewerCallbacks extends IPreviewCustomizationHandler, ICommonBindingCustomizationHandler<JSReportViewer>, IPreviewCustomizationCallbacksPublic<JSReportViewer> {
}
export interface IReportViewerOptions extends IJSDesignerBindingCommonOptions, IWebDocumentViewerSettings {
    viewerModel?: any;
    reportPreview?: any;
    callbacks?: IJSReportViewerCallbacks;
    parts?: any[];
    handlerUri?: string;
    requestOptions?: {
        host?: string;
        invokeAction: string;
        getLocalizationAction?: string;
    };
    documentId?: string;
    reportId?: string;
    reportUrl?: any;
    keepReportOnComponentDisposal?: boolean;
}
export declare class JSReportViewerBinding extends JSDesignerBindingCommon<JSReportViewer, IReportViewerOptions> {
    private _shouldApplyBindings;
    private _callbacks;
    private _deferreds;
    private _closeReportOnDisposing;
    dispose(): void;
    private _initializeCallbacks;
    private _applyBindings;
    constructor(_options: IReportViewerOptions, customEventRaiser?: (eventName: string, args?: any) => void, _shouldApplyBindings?: boolean);
    _createModel(element: HTMLElement): JQueryDeferred<PreviewDisposableModel>;
    applyBindings(element: HTMLElement): void;
}
