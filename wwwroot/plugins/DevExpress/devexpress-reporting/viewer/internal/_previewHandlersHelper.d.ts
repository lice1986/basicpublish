﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewHandlersHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import { ReportPreview } from '../reportPreview';
import { IGetPageResponse } from './_previewRequestWrapper';
export interface IProgressStatus {
    requestAgain: boolean;
    completed?: boolean;
    progress?: number;
    error?: string;
}
export interface IExportProgressStatus extends IProgressStatus {
    token?: string;
    uri?: string;
}
export interface IDocumentBuildStatus extends IProgressStatus {
    pageCount?: number;
    firstPageResponse?: IGetPageResponse;
}
export declare class PreviewHandlersHelper {
    private _preview;
    constructor(preview: ReportPreview);
    doneStartExportHandler(deferred: JQueryDeferred<boolean>, inlineResult: boolean, response: string, exportOperationIdDeferred: JQueryDeferred<string>, startExportOperationId: string, useSameTab?: boolean, printable?: boolean, abortController?: AbortController): void;
    errorStartExportHandler(deferred: JQueryDeferred<boolean>, startExportOperationId: string): void;
    doneExportStatusHandler(deferred: JQueryDeferred<any>, operationId: string, response: IExportProgressStatus): void;
    errorExportStatusHandler(deferred: JQueryDeferred<IDocumentBuildStatus>, operationId: string): void;
    doneStartBuildHandler(deferred: JQueryDeferred<boolean>, response: {
        documentId: string;
    }, startBuildOperationId: string, doucmentIdDeferred: JQueryDeferred<string>): void;
    errorStartBuildHandler(deferred: JQuery.Deferred<boolean>, startBuildOperationId: string): void;
    errorGetBuildStatusHandler(deferred: JQueryDeferred<IDocumentBuildStatus>): void;
    processPages(pageCount: number, stopProcessingPredicate: () => boolean): void;
    doneGetBuildStatusHandler(deferred: JQueryDeferred<IDocumentBuildStatus>, documentId: string, response: IDocumentBuildStatus, stopProcessingPredicate: () => boolean): void;
}
