﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportPreview } from '../reportPreview';
import { PreviewParametersViewModel } from '../parameters/previewParametersViewModel';
import { ExportOptionsModel } from '../exportOptions/exportOptionsModel';
import { SearchViewModel } from '../search/_searchViewModel';
import { DocumentMapModel } from '../documentMap/_documentMapModel';
import { ActionLists } from './_actions';
import { TabPanel, DisposableType, ITabPanelViewModel } from '@devexpress/analytics-core/analytics-utils-native';
import { IDesignerPart, ToolbarKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
import { IDocumentOperationResult } from '../utils/utils';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IReportPreviewViewModel } from '../reportPreview.viewModel';
import { IExportToolViewModel } from './_exportHandler.viewModel';
import { IActionListBaseViewModel } from '@devexpress/analytics-core/analytics-internal';
import { BreadcrumbModel, IBreadcrumbViewModel } from './_previewBreadcrumbs';
export interface IPreviewModelBase {
    rootStyle: string | {
        [key: string]: boolean;
    };
    reportPreview: ReportPreview;
    parametersModel: PreviewParametersViewModel;
    exportModel: ExportOptionsModel;
    searchModel: SearchViewModel;
    rtl: boolean;
    parts?: IDesignerPart[];
    updateSurfaceSize?: () => void;
    resizeCallback?: () => void;
}
export interface IPreviewModel extends IPreviewModelBase {
    documentMapModel: DocumentMapModel;
    tabPanel: TabPanel;
    actionLists: ActionLists;
    accessibilityCompliant: boolean;
    breadcrumb: BreadcrumbModel;
}
export interface IPreviewViewModelBase extends IViewModel {
    parts: IDesignerPart[];
    reportPreview: IReportPreviewViewModel;
    exportHandler: IExportToolViewModel;
    rootStyle: string | {
        [key: string]: boolean;
    };
    rtl: boolean;
}
export interface IPreviewViewModel extends IPreviewViewModelBase {
    toolBar: IToolbarViewModel;
    accessibilityCompliant: boolean;
    tabPanel: ITabPanelViewModel;
    breadcrumb: IBreadcrumbViewModel;
}
export interface IToolbarViewModel extends IViewModel {
    actionLists: IActionListBaseViewModel;
    keyboardHelper: ToolbarKeyboardHelper;
    canSwitchToDesigner: boolean;
}
export declare class PreviewDisposableModel extends BaseRenderingModel<IPreviewViewModelBase> implements IPreviewModelBase {
    rootStyle: string | {
        [key: string]: boolean;
    };
    reportPreview: ReportPreview;
    parametersModel: PreviewParametersViewModel;
    exportModel: ExportOptionsModel;
    searchModel: SearchViewModel;
    rtl: boolean;
    parts?: IDesignerPart[];
    resizeCallback?: () => void;
    updateSurfaceSize?: () => void;
    constructor(options: IPreviewModelBase);
    createViewModel(): IPreviewViewModelBase;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    _addDisposable(object: DisposableType): void;
    dispose(): void;
    GetParametersModel(): PreviewParametersViewModel;
    OpenReport(reportName: string): void;
    Print(pageIndex?: number): void;
    ExportTo(format: string, inlineResult?: boolean): void;
    GetCurrentPageIndex(): number;
    GoToPage(pageIndex: number): void;
    Close(): void;
    ResetParameters(): void;
    StartBuild(): void;
    PerformCustomDocumentOperation(customData?: string, hideMessageFromUser?: boolean): JQueryPromise<IDocumentOperationResult>;
}
export declare class PreviewModel extends PreviewDisposableModel implements IPreviewModel {
    documentMapModel: DocumentMapModel;
    tabPanel: TabPanel;
    actionLists: ActionLists;
    accessibilityCompliant: boolean;
    createViewModel(): IPreviewViewModel;
    constructor(options: IPreviewModel);
    breadcrumb: BreadcrumbModel;
    getViewModel: () => IPreviewViewModel;
}
