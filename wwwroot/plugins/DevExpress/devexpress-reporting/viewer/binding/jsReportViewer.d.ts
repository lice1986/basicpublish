﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, BaseModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewDisposableModel } from '../internal/_previewModel';
export declare class JSReportViewer extends BaseModel {
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    dispose(): void;
    previewModel: PreviewDisposableModel;
    constructor(_previewModel: ko.Observable<PreviewDisposableModel>);
    previewExists(): import("../reportPreview").ReportPreview;
    GetReportPreview(): import("../reportPreview").ReportPreview;
    GetPreviewModel(): PreviewDisposableModel;
    GetParametersModel(): import("../parameters/previewParametersViewModel").PreviewParametersViewModel;
    PerformCustomDocumentOperation(customData: any, hideMessageFromUser: any): JQueryPromise<import("../utils/utils").IDocumentOperationResult>;
    OpenReport(reportName: any): void;
    Print(pageIndex: any): void;
    ExportTo(format: any, inlineResult: any): void;
    GetCurrentPageIndex(): number;
    GoToPage(pageIndex: any): void;
    Close(): void;
    ResetParameters(): void;
    StartBuild(): void;
    UpdateLocalization(localization: any): void;
    AdjustControlCore(): void;
}
