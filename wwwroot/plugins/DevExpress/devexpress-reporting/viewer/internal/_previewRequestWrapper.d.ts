﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewRequestWrapper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IKeyValuePair } from '../../common/types';
import { IBookmarkNode } from '../documentMap/_documentMapModel';
import { IEditingFieldHtmlProvider, IEditingFieldSerializedModel } from '../editing/editingField';
import { PreviewParametersViewModel } from '../parameters/previewParametersViewModel';
import { ReportPreview } from '../reportPreview';
import { SearchViewModel } from '../search/_searchViewModel';
import { IPreviewCustomizationHandler, IPreviewInitialize } from '../utils/initializer';
import { IBrickNode, IDocumentOperationResult } from '../utils/utils';
import { IGetPageRequest } from './_page';
import { IDocumentBuildStatus, IExportProgressStatus } from './_previewHandlersHelper';
export interface IGetPageResponse extends IGetBrickMapResult {
    width: number;
    height: number;
    base64string: string;
}
export interface IGetBrickMapResult {
    brick: IBrickNode;
    columnWidthArray: Array<number>;
}
export declare enum ColumnSortOrder {
    None = 0,
    Ascending = 1,
    Descending = 2
}
export interface ISortingFieldInfo {
    fieldName?: string;
    sortOrder?: ColumnSortOrder;
}
export interface ISignatureItem {
    reason?: string;
    location?: string;
    contactInfo?: string;
    validFrom?: string;
    validTo?: string;
    issuer?: string;
    image?: string;
    key?: string;
}
export interface ISignatureField {
    label?: string;
    value: string;
}
export interface ISignatureDisplayItem {
    key: string;
    image: string;
    displayName: string;
    fields: ISignatureField[];
}
export interface IGeneratedDocumentData {
    documentMap?: IBookmarkNode;
    drillDownKeys?: Array<IKeyValuePair<boolean>>;
    sortingState?: Array<IKeyValuePair<Array<ISortingFieldInfo>>>;
    exportOptions?: string;
    canPerformContinuousExport?: boolean;
    editingFields?: Array<IEditingFieldSerializedModel>;
    displayName?: string;
    errors?: any;
    pageCount?: number;
    signatures?: ISignatureItem[];
}
export declare class PreviewRequestWrapper implements IEditingFieldHtmlProvider {
    private _callbacks?;
    private _reportPreview;
    private _parametersModel;
    private _searchModel;
    constructor(handlers?: {
        [key in keyof PreviewRequestWrapper]?: PreviewRequestWrapper[key];
    }, _callbacks?: IPreviewCustomizationHandler);
    static getProcessErrorCallback(reportPreview?: ReportPreview, defaultErrorMessage?: string, showMessage?: boolean): (message: string, jqXHR: JQuery.jqXHR<any>, textStatus: string) => void;
    static getPage(url: string, ignoreError?: () => boolean): JQueryPromise<IGetPageResponse>;
    initialize(reportPreview: ReportPreview, parametersModel: PreviewParametersViewModel, searchModel: SearchViewModel): void;
    findTextRequest(text: string, ignore: boolean): JQueryPromise<any>;
    startSearch(text: string, ignore: boolean): JQueryPromise<any>;
    getSearchStatus(searchOperationId: string, startIndex: number, resultLimitPerRequest: number, ignore: boolean): JQueryPromise<any>;
    stopSearch(searchOperationId: string, ignore: boolean): any;
    stopBuild(id: string): void;
    sendCloseRequest(documentId: string, reportId?: string): void;
    startBuildRequest(shouldIgnoreError?: () => boolean): JQueryPromise<any>;
    getBuildStatusRequest(documentId: string, shouldIgnoreError: () => boolean, isFirstRequest: boolean, firstPageRequest: IGetPageRequest): JQueryPromise<IDocumentBuildStatus>;
    getDocumentData(documentId: string, shouldIgnoreError: () => boolean): JQueryPromise<IGeneratedDocumentData>;
    customDocumentOperation(documentId: string, serializedExportOptions: string, editindFields: any[], customData: string, hideMessageFromUser?: boolean): JQueryPromise<IDocumentOperationResult>;
    openReport(reportName: string): JQueryDeferred<IPreviewInitialize>;
    drillThrough(drillThroughData: string): JQueryDeferred<IPreviewInitialize>;
    goToReport(customData: string): JQueryDeferred<IPreviewInitialize>;
    getStartExportOperation(arg: string, shouldIgnoreError: () => boolean): JQueryDeferred<string>;
    getExportResult(requestData: any, shouldIgnoreError: () => boolean, method?: string): JQueryDeferred<Response>;
    cancelExportRequest(operationId: string, shouldIgnoreError: () => boolean): void;
    getExportStatusRequest(operationId: string): JQueryDeferred<IExportProgressStatus>;
    getEditingFieldHtml(value: unknown, editingFieldIndex: number): JQueryPromise<string>;
}
