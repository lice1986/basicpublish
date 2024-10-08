﻿/**
* DevExpress HTML/JS Reporting (designer\jsReportDesignerBinding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxAnalyticsComponentCommon, ICommonBindingCustomizationHandler, JSDesignerBindingCommon, IJSDesignerBindingCommonOptions } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { IPreviewCustomizationHandler } from '../viewer/utils/initializer';
import { JSReportDesigner } from './jsReportDesigner';
import { IReportPreviewSettings } from './tools/generator/_settings';
import { IDataSourceSettings, IReportDesignerCustomizationHandler, IReportDesignerInitializationModel, IReportWizardSettings } from './utils/inititalizer';
import { IReportDeisgnerCallbacks } from './utils/publicCallbacks';
export interface IJSDesignerCallbacks extends IReportDeisgnerCallbacks<DxReportDesigner>, ICommonBindingCustomizationHandler<JSReportDesigner> {
    designer?: IReportDesignerCustomizationHandler;
    preview?: IPreviewCustomizationHandler;
}
export interface IServerSideConfigurationOptions {
    wizardSettings?: IReportWizardSettings;
    reportPreviewSettings?: IReportPreviewSettings;
    dataSourceSettings?: IDataSourceSettings;
    allowMDI?: boolean;
    rightToLeft?: boolean;
}
export interface IReportDesignerOptions extends IJSDesignerBindingCommonOptions {
    designerModel?: any;
    initializationData?: IReportDesignerInitializationModel | ko.Observable<IReportDesignerInitializationModel>;
    requestOptions?: {
        host: string;
        getDesignerModelAction?: string;
        getLocalizationAction?: string;
    };
    designerModelSettings?: IServerSideConfigurationOptions;
    callbacks?: IJSDesignerCallbacks;
    reportModel?: any;
    reportUrl?: any;
    parts?: any[];
    limitation?: boolean;
    undoEngine?: any;
}
export declare class JSReportDesignerBinding extends JSDesignerBindingCommon<JSReportDesigner, IReportDesignerOptions> {
    private _initializationData;
    private _callbacks;
    private _model;
    private _deferreds;
    private _applyBindings;
    private _initializeCallbacks;
    private _createModel;
    private _showErrorInfo;
    private _getDesignerModelRequest;
    constructor(_options: IReportDesignerOptions, customEventRaiser?: (eventName: string, args?: any) => void);
    dispose(): void;
    applyBindings(element: HTMLElement): void;
}
export declare class DxReportDesigner extends DxAnalyticsComponentCommon<IReportDesignerOptions> {
    getBindingName(): string;
}
