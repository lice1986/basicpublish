﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_initializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ILocalizationSettings } from '@devexpress/analytics-core/analytics-internal';
import { IEnumType } from '../../common/customTypes';
import { IPreviewCustomizationHandler } from '../../viewer/utils/initializer';
import { IReportDesignerRootContext } from '../tools/generator/reportDesignerContext';
import { IReportDesignerCustomizationHandler, IReportDesignerInitializationData, IReportDesignerInitializationModel } from '../utils/inititalizer';
export declare function createReportDesigner(element: HTMLElement, data: IReportDesignerInitializationData, callbacks: {
    designer?: IReportDesignerCustomizationHandler;
    preview?: IPreviewCustomizationHandler;
}, localizationSettings?: ILocalizationSettings, knownEnums?: Array<IEnumType>, designerHandlerUri?: string, previewHandlerUri?: string, rtl?: boolean, applyBindings?: boolean): JQuery.Promise<IReportDesignerRootContext>;
export declare function createReportDesignerFromModel(model: IReportDesignerInitializationModel, element: HTMLElement, callbacks?: {
    designer?: IReportDesignerCustomizationHandler;
    preview?: IPreviewCustomizationHandler;
}, applyBindings?: boolean): JQuery.Promise<IReportDesignerRootContext>;