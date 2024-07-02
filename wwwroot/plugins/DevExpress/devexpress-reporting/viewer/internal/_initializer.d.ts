﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_initializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IBindingSettings, IPreviewCustomizationHandler, IWebDocumentViewerModel } from '../utils/initializer';
import { PreviewDisposableModel, PreviewModel } from './_previewModel';
export declare function createDesktopPreview(bindingSettings: IBindingSettings): PreviewModel;
export declare function createPreview(bindingSettings: IBindingSettings): JQueryDeferred<PreviewDisposableModel>;
export declare function createPreviewModel(viewerModel: IWebDocumentViewerModel, element: HTMLElement, callbacks?: IPreviewCustomizationHandler, applyBindings?: boolean): JQueryDeferred<PreviewDisposableModel>;
export declare function initPreviewModel(previewModel: PreviewDisposableModel, viewerModel: IWebDocumentViewerModel): void;
