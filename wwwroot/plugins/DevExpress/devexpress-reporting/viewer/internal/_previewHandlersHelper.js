﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewHandlersHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, _isFetchConfigured } from '@devexpress/analytics-core/analytics-utils-native';
import { PollingDelay } from '../settings';
export class PreviewHandlersHelper {
    constructor(preview) {
        this._preview = preview;
    }
    doneStartExportHandler(deferred, inlineResult, response, exportOperationIdDeferred, startExportOperationId, useSameTab = false, printable = false, abortController) {
        try {
            if (!response) {
                exportOperationIdDeferred.reject();
                this._preview.progressBar.complete(startExportOperationId);
                return;
            }
            const exportOperationId = response;
            exportOperationIdDeferred.resolve(exportOperationId);
            let progress = 0;
            const doGetExportStatus = (operationId) => {
                var _a;
                if (!((_a = this._preview) === null || _a === void 0 ? void 0 : _a.exportHandler))
                    return;
                const promise = this._preview.exportHandler.getExportStatus(operationId);
                promise.done((result) => {
                    if (result && result.requestAgain) {
                        if (progress < result.progress) {
                            progress = result.progress;
                            this._preview.exportHandler.updateExportStatus(result.progress, operationId);
                        }
                        const doStatusRequest = () => { doGetExportStatus(operationId); };
                        PollingDelay() ? setTimeout(doStatusRequest, PollingDelay()) : doStatusRequest();
                    }
                    else {
                        if (!_isFetchConfigured())
                            this._preview.progressBar.complete(operationId);
                        if (!result.requestAgain && result.completed && !this._preview._cancelExportRequests[operationId]) {
                            this._preview.exportHandler.updateExportStatus(result.progress, operationId);
                            this._preview.exportHandler.getExportResult(operationId, inlineResult, useSameTab, result.token, printable, result.uri, abortController);
                        }
                    }
                });
            };
            doGetExportStatus(exportOperationId);
        }
        finally {
            deferred.resolve(true);
            this._preview._startBuildOperationId = '';
        }
    }
    errorStartExportHandler(deferred, startExportOperationId) {
        this._preview.progressBar.complete(startExportOperationId);
        deferred.reject();
    }
    doneExportStatusHandler(deferred, operationId, response) {
        try {
            if (!response) {
                deferred.resolve({ requestAgain: false });
                this._preview.progressBar.complete(operationId);
                return;
            }
            if (this._preview.progressBar && this._preview.progressBar.progress < response.progress)
                this._preview.progressBar.progress = response.progress;
            deferred.resolve(response);
        }
        finally {
            if (!deferred.state || deferred.state() === 'pending') {
                deferred.resolve({ requestAgain: false });
            }
        }
    }
    errorExportStatusHandler(deferred, operationId) {
        this._preview.progressBar.complete(operationId);
        deferred.resolve({ requestAgain: false, completed: false });
    }
    doneStartBuildHandler(deferred, response, startBuildOperationId, doucmentIdDeferred) {
        try {
            const removeAllEmptyPages = (all) => {
                all && this._preview.removeAllPages();
                this._preview.removeEmptyPages();
            };
            if (!response || !response.documentId) {
                doucmentIdDeferred.reject();
                this._preview.progressBar.complete(startBuildOperationId);
                removeAllEmptyPages();
                return;
            }
            const documentId = response.documentId;
            const stopBuildRequest = this._preview._stopBuildRequests[startBuildOperationId];
            const closeDocumentRequest = this._preview._closeDocumentRequests[startBuildOperationId];
            if (startBuildOperationId && (stopBuildRequest || closeDocumentRequest)) {
                if (closeDocumentRequest) {
                    closeDocumentRequest && this._preview.closeDocument(documentId);
                }
                else {
                    stopBuildRequest && this._preview.stopBuild(documentId);
                }
                doucmentIdDeferred.reject();
                this._preview.progressBar.complete(startBuildOperationId);
                removeAllEmptyPages();
                return;
            }
            this._preview.documentId = documentId;
            doucmentIdDeferred.resolve(documentId);
            const doGetBuildStatus = this._preview.getDoGetBuildStatusFunc();
            doGetBuildStatus(documentId);
        }
        finally {
            deferred.resolve(true);
        }
    }
    errorStartBuildHandler(deferred, startBuildOperationId) {
        this._preview.pageLoading = false;
        this._preview.errorMessage = getLocalization('Document creation was cancelled due to server error', 'WebDocumentViewer_DocumentCreationCancelled');
        this._preview.progressBar.complete(startBuildOperationId);
        deferred.resolve(true);
        this._preview.removeEmptyPages();
    }
    errorGetBuildStatusHandler(deferred) {
        deferred.resolve({ requestAgain: false, completed: false });
    }
    processPages(pageCount, stopProcessingPredicate) {
        var _a;
        const wereNoPagesAndNewOnesExist = this._preview.pageIndex === -1 && pageCount > 0;
        if (wereNoPagesAndNewOnesExist) {
            this._preview.pageIndex = 0;
        }
        for (let i = 0; i < pageCount && !stopProcessingPredicate(); i++) {
            const createNewPage = (index) => {
                return this._preview.createPage(index, this._preview.createBrickClickProcessor(index));
            };
            if (i < this._preview.pages.length) {
                let page = this._preview.pages[i];
                if (!page || page.isEmpty) {
                    page = createNewPage(i);
                    const deleted = this._preview.pages.splice(i, 1, page);
                    (_a = deleted[0]) === null || _a === void 0 ? void 0 : _a.dispose();
                }
                if (page.pageIndex === -1) {
                    page.pageIndex = i;
                    if (this._preview.pageIndex === i) {
                        this._preview.setPageVisibility(page, true);
                    }
                }
            }
            else {
                const newPage = createNewPage(i);
                this._preview.pages.push(newPage);
            }
        }
        this._preview._raiseOnSizeChanged();
        if (wereNoPagesAndNewOnesExist) {
            const pageIndex = this._preview.pages.length ? 0 : -1;
            this._preview.goToPage(pageIndex, true);
        }
    }
    doneGetBuildStatusHandler(deferred, documentId, response, stopProcessingPredicate) {
        try {
            if (!response) {
                deferred.resolve({ requestAgain: false });
                return;
            }
            if (this._preview.progressBar.progress < response.progress && !this._preview._stopBuildRequests[documentId] && !stopProcessingPredicate())
                this._preview.progressBar.progress = response.progress;
            this.processPages(response.pageCount, stopProcessingPredicate);
            this._preview._resolveFirstPage(response);
            deferred.resolve(response);
        }
        finally {
            if (deferred.state() === 'pending') {
                deferred.resolve({ requestAgain: false });
            }
        }
    }
}