﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewRequestWrapper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest, formatUnicorn, getErrorMessage } from '@devexpress/analytics-core/analytics-internal-native';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import { HandlerUri, MessageHandler, TimeOut } from '../settings';
export var ColumnSortOrder;
(function (ColumnSortOrder) {
    ColumnSortOrder[ColumnSortOrder["None"] = 0] = "None";
    ColumnSortOrder[ColumnSortOrder["Ascending"] = 1] = "Ascending";
    ColumnSortOrder[ColumnSortOrder["Descending"] = 2] = "Descending";
})(ColumnSortOrder || (ColumnSortOrder = {}));
export class PreviewRequestWrapper {
    constructor(handlers, _callbacks) {
        this._callbacks = _callbacks;
        Object.keys(handlers || {}).forEach((name) => {
            this[name] = handlers[name];
        });
    }
    static getProcessErrorCallback(reportPreview, defaultErrorMessage, showMessage = true) {
        return function (message, jqXHR, textStatus) {
            let messageWithStatusCode;
            if (jqXHR) {
                const statusCodeText = getLocalization(jqXHR.statusText, 'ASPxReportsStringId.HttpResponseStatusCode_' + jqXHR.status);
                if (defaultErrorMessage) {
                    const stringFormat = getLocalization('{0} ({1} {2})', 'ASPxReportsStringId.Error_WithStatus');
                    messageWithStatusCode = formatUnicorn(stringFormat, defaultErrorMessage, jqXHR.status, statusCodeText);
                }
                else {
                    messageWithStatusCode = statusCodeText;
                }
            }
            if (!reportPreview) {
                const error = getErrorMessage(jqXHR);
                MessageHandler().processError(error || messageWithStatusCode || defaultErrorMessage || 'Internal Server Error', showMessage);
            }
            else {
                reportPreview._processError(messageWithStatusCode || defaultErrorMessage, jqXHR, showMessage);
            }
        };
    }
    static getPage(url, ignoreError) {
        return sendRequest(url, undefined, undefined, PreviewRequestWrapper.getProcessErrorCallback(), ignoreError, { type: 'GET' });
    }
    initialize(reportPreview, parametersModel, searchModel) {
        this._reportPreview = reportPreview;
        this._parametersModel = parametersModel;
        this._searchModel = searchModel;
    }
    findTextRequest(text, ignore) {
        return sendRequest(HandlerUri(), 'findText', JSON.stringify({
            text: text,
            documentId: this._reportPreview.documentId,
            matchCase: this._searchModel.matchCase,
            wholeWord: this._searchModel.matchWholeWord,
            searchUp: this._searchModel.searchUp
        }), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('An error occurred during search', 'ASPxReportsStringId.WebDocumentViewer_SearchError')), () => ignore);
    }
    startSearch(text, ignore) {
        return sendRequest(HandlerUri(), 'startSearch', JSON.stringify({
            text: text,
            documentId: this._reportPreview.documentId,
            matchCase: this._searchModel.matchCase,
            wholeWord: this._searchModel.matchWholeWord,
        }), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('An error occurred during search', 'ASPxReportsStringId.WebDocumentViewer_SearchError')), () => ignore);
    }
    getSearchStatus(searchOperationId, startIndex = 0, resultLimitPerRequest = 1000, ignore) {
        return sendRequest(HandlerUri(), 'getSearchStatus', JSON.stringify({
            searchOperationId: searchOperationId,
            documentId: this._reportPreview.documentId,
            startIndex: startIndex,
            resultLimitPerRequest: resultLimitPerRequest
        }), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('An error occurred during search', 'ASPxReportsStringId.WebDocumentViewer_SearchError')), () => ignore);
    }
    stopSearch(searchOperationId, ignore) {
        return sendRequest(HandlerUri(), 'stopSearch', JSON.stringify({
            searchOperationId: searchOperationId,
            documentId: this._reportPreview.documentId,
        }), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('An error occurred during search', 'ASPxReportsStringId.WebDocumentViewer_SearchError')), () => ignore);
    }
    stopBuild(id) {
        sendRequest(HandlerUri(), 'stopBuild', id, undefined, () => true);
    }
    sendCloseRequest(documentId, reportId) {
        sendRequest(HandlerUri(), 'close', JSON.stringify({
            reportId: reportId,
            documentId: documentId
        }), undefined, () => true);
    }
    startBuildRequest(shouldIgnoreError) {
        const parameters = this._parametersModel.serializeParameters();
        this._callbacks && this._callbacks.parametersSubmitted && this._callbacks.parametersSubmitted(this._parametersModel, parameters);
        return sendRequest({
            uri: HandlerUri(),
            action: 'startBuild',
            arg: JSON.stringify({
                reportId: this._reportPreview.reportId,
                reportUrl: this._reportPreview.reportUrl,
                drillDownKeys: this._reportPreview['_drillDownState'],
                sortingState: this._reportPreview['_sortingState'],
                timeZoneOffset: 0 - new Date().getTimezoneOffset(),
                parameters: parameters
            }),
            ignoreError: shouldIgnoreError,
            isError: (data) => !!data.error || !!(data.result && data.result.faultMessage),
            processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('Cannot create a document for the current report', 'ASPxReportsStringId.WebDocumentViewer_DocumentCreationError'))
        });
    }
    getBuildStatusRequest(documentId, shouldIgnoreError, isFirstRequest, firstPageRequest) {
        return sendRequest({
            uri: HandlerUri(),
            action: 'getBuildStatus',
            arg: JSON.stringify({
                documentId: documentId,
                firstPageRequest: firstPageRequest,
                isFirstRequest: isFirstRequest,
                timeOut: Math.max(5000, TimeOut())
            }),
            processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('Error obtaining a build status', 'ASPxReportsStringId.WebDocumentViewer_GetBuildStatusError')),
            ignoreError: shouldIgnoreError,
            isError: (data) => !!data.error || !!(data.result && data.result.faultMessage) || !data.success,
            getErrorMessage: this._reportPreview._getErrorMessage
        });
    }
    getDocumentData(documentId, shouldIgnoreError) {
        return sendRequest(HandlerUri(), 'getDocumentData', documentId, PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('Cannot obtain additional document data for the current document', 'ASPxReportsStringId.WebDocumentViewer_GetDocumentDataError')), shouldIgnoreError);
    }
    customDocumentOperation(documentId, serializedExportOptions, editindFields, customData, hideMessageFromUser) {
        return sendRequest(HandlerUri(), 'documentOperation', JSON.stringify({
            documentId: documentId,
            customData: customData,
            exportOptions: serializedExportOptions,
            editingFieldValues: editindFields
        }), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('The requested document operation cannot be performed.', 'ASPxReportsStringId.WebDocumentViewer_CustomDocumentOperationsDenied_Error'), !hideMessageFromUser));
    }
    openReport(reportName) {
        return sendRequest(HandlerUri(), 'openReport', reportName, PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('Could not open report', 'ASPxReportsStringId.WebDocumentViewer_OpenReportError') + " '" + reportName + "'"));
    }
    drillThrough(drillThroughData) {
        return sendRequest(HandlerUri(), 'drillThrough', JSON.stringify({
            reportId: this._reportPreview.reportId,
            reportUrl: this._reportPreview.reportUrl,
            drillThroughData: drillThroughData
        }), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('Drill through operation failed', 'ASPxReportsStringId.WebDocumentViewer_DrillThroughError')));
    }
    goToReport(customData) {
        return sendRequest(HandlerUri(), 'goToReport', JSON.stringify({
            reportId: this._reportPreview.reportId,
            reportUrl: this._reportPreview.reportUrl,
            documentId: this._reportPreview.documentId,
            parameters: this._parametersModel.serializeParameters(),
            editingFields: this._reportPreview.editingFieldsProvider().map(field => field.model()),
            customData: customData
        }), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('Go to report operation failed', 'ASPxReportsStringId.WebDocumentViewer_DrillThroughError')));
    }
    getStartExportOperation(arg, shouldIgnoreError) {
        return sendRequest(HandlerUri(), 'startExport', arg, PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('An error occurred during the export', 'ASPxReportsStringId.WebDocumentViewer_ExportError')), shouldIgnoreError);
    }
    getExportResult(requestData, shouldIgnoreError, method = 'POST') {
        return sendRequest({
            uri: requestData.RequestUrl,
            action: requestData.FormData.actionKey,
            arg: requestData.FormData.arg,
            processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('An error occurred during the export', 'ASPxReportsStringId.WebDocumentViewer_ExportError')),
            ignoreError: shouldIgnoreError,
            method
        });
    }
    cancelExportRequest(operationId, shouldIgnoreError) {
        const arg = JSON.stringify({
            id: operationId
        });
        return sendRequest(HandlerUri(), 'cancelExport', arg, PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('An error occurred during the export', 'ASPxReportsStringId.WebDocumentViewer_ExportError')), shouldIgnoreError);
    }
    getExportStatusRequest(operationId) {
        return sendRequest({
            uri: HandlerUri(),
            action: 'getExportStatus',
            arg: JSON.stringify({
                id: operationId,
                timeOut: Math.max(5000, TimeOut())
            }),
            processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, getLocalization('Error obtaining an export status', 'ASPxReportsStringId.WebDocumentViewer_GetExportStatusError')),
            isError: (data) => !!data.error || !!(data.result && data.result.faultMessage) || !data.success,
            getErrorMessage: this._reportPreview._getErrorMessage
        });
    }
    getEditingFieldHtml(value, editingFieldIndex) {
        return sendRequest(HandlerUri(), 'getEditingFieldHtmlValue', JSON.stringify({
            documentId: this._reportPreview.documentId,
            value: value,
            editingFieldIndex: editingFieldIndex
        }));
    }
}