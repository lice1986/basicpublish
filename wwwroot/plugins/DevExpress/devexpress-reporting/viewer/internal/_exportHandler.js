﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_exportHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { formatUnicorn } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { getLocalization, _isFetchConfigured } from '@devexpress/analytics-core/analytics-utils-native';
import browser from 'devextreme/core/utils/browser';
import * as $ from 'jquery';
import { generateGuid, isIOS, isAndroid, isMobile } from '../../common/utils/_utils';
import { AsyncExportApproach, HandlerUri, ReportServerDownloadUri } from '../settings';
import { createExportHandlerViewModel, updateExportHandlerViewModel } from './_exportHandler.viewModel';
import { PreviewRequestWrapper } from './_previewRequestWrapper';
import { safelyRunWindowOpen } from './_utils';
export class ExportResultRequestData {
    constructor() {
        this.RequestUrl = '';
        this.FormData = {};
        this.QueryParameters = {};
    }
}
export class ExportHandler extends BaseRenderingModel {
    constructor(exportSetting, preview) {
        super();
        this.preview = preview;
        this.exportingFrameName = 'dxrd-exporting-frame' + generateGuid();
        this.printingLinkCallback = () => { };
        this.getPopupTitle = () => this.reportDisplayName || '';
        this._exportResultRequestData = new ExportResultRequestData();
        this._showPrintNotificationDialog = true;
        this._useSameTabExport = true;
        this._useAsynchronousExport = true;
        this._workerTicker = null;
        this._workerFunctionBlobUrl = null;
        this._xhr = null;
        this._exportResultDeferred = $.Deferred();
        this._workerTickerFunction = function () {
            let started, interval;
            self.onmessage = function (e) {
                if (e.data === 'stop') {
                    clearInterval(interval);
                    return;
                }
                if (started)
                    return;
                interval = setInterval(() => {
                    postMessage.apply(self, ['tick']);
                }, 10);
                started = true;
            };
        };
        this._window = null;
        this._handleFile = (fileMetadata, _url) => {
            if (fileMetadata.url) {
                const link = document.createElement('a');
                link.href = fileMetadata.url;
                link.rel = 'noreferrer noopener';
                link.download = fileMetadata.contentFilename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                _url.revokeObjectURL(fileMetadata.url);
            }
        };
        this._timeouts = [];
        if (exportSetting) {
            if (exportSetting.useAsynchronousExport !== undefined)
                this._useAsynchronousExport = exportSetting.useAsynchronousExport;
            if (exportSetting.useSameTab !== undefined)
                this._useSameTabExport = exportSetting.useSameTab;
            if (exportSetting.showPrintNotificationDialog !== undefined)
                this._showPrintNotificationDialog = exportSetting.showPrintNotificationDialog;
        }
    }
    onPropertyChanged(args) { }
    createViewModel() {
        return createExportHandlerViewModel.call(this, super.createViewModel());
    }
    updateViewModel(args) {
        updateExportHandlerViewModel.call(this, args);
    }
    _getUrlObject() {
        return window.URL || window['webkitURL'] || window['mozURL'] || window['msURL'] || window['oURL'];
    }
    _createWorker() {
        this._terminateWorker();
        const blob = new Blob(['(' + this._workerTickerFunction.toString() + ')()'], { type: 'text/javascript' });
        const _url = this._getUrlObject();
        this._workerFunctionBlobUrl = _url.createObjectURL(blob);
        this._workerTicker = new Worker(this._workerFunctionBlobUrl);
        return this._workerTicker;
    }
    _terminateWorker() {
        if (this._workerTicker) {
            this._workerTicker.terminate();
            this._workerTicker = null;
        }
        if (this._workerFunctionBlobUrl) {
            const _url = this._getUrlObject();
            _url && _url.revokeObjectURL(this._workerFunctionBlobUrl);
            this._workerFunctionBlobUrl = null;
        }
    }
    _callPrint(_window) {
        if (_window && !isAndroid && (browser.chrome || browser.safari)) {
            const worker = this._createWorker();
            const checkOnTick = () => {
                try {
                    if (_window.document && _window.document.contentType === 'application/pdf') {
                        _window.print();
                        worker.postMessage('stop');
                        this._terminateWorker();
                    }
                }
                catch (ex) {
                    this._terminateWorker();
                }
            };
            worker.onerror = (e) => { checkOnTick(); };
            worker.onmessage = (e) => { checkOnTick(); };
            worker.postMessage('start');
        }
    }
    clearExportTools() {
        const iframe = this.exportingFrame.contentWindow;
        iframe && iframe.location.replace('about:blank');
        this.printingLinkCallback = () => { };
        this.popupVisible = false;
    }
    _initPrintingWindow() {
        if (this._showPrintNotificationDialog) {
            this.popupVisible = true;
        }
    }
    _setPrintingLinkCallback(printingLinkCallback) {
        if (this._showPrintNotificationDialog) {
            this.printingLinkCallback = printingLinkCallback;
        }
    }
    _formSubmit(_requestData, _formTarget) {
        if (this.postingForm) {
            this.postingForm.target = _formTarget;
            this.exportActionUri = _requestData.RequestUrl;
            const formData = [];
            for (const key in _requestData.FormData) {
                formData.push({ name: key, value: _requestData.FormData[key] });
            }
            this.exportFormData = formData;
            this.postingForm.submit();
        }
    }
    _doExportSync(_exportWindow, printable, useSameTab, shouldChangePrintJobName, operationId, abortController) {
        this.onExportCustomEvent && this.onExportCustomEvent(this._exportResultRequestData);
        const _requestData = this._exportResultRequestData;
        useSameTab && printable && this._initPrintingWindow();
        const formTarget = useSameTab || (this._useSameTabExport && !useSameTab && isMobile) ? this.exportingFrameName : '_blank';
        if (!this._useSameTabExport && !printable) {
            this._replaceLocation(_exportWindow, _requestData);
        }
        else if (this._useSameTabExport && (!printable || (!useSameTab && isMobile))) {
            if (_isFetchConfigured()) {
                const method = 'POST';
                this._getExportResultUsingFetch(_requestData, method, printable, this._handleFile, operationId, abortController);
            }
            else {
                this._formSubmit(_requestData, formTarget);
            }
        }
        else {
            if (!_exportWindow) {
                _exportWindow = this.exportingFrame && (useSameTab || (this._useSameTabExport && isMobile)) ? this.exportingFrame.contentWindow : this._replaceLocation(null, null);
            }
            const method = this._useSameTabExport ? 'POST' : 'GET';
            this._printUsingBlob(_exportWindow, _requestData, method, useSameTab, printable, shouldChangePrintJobName, operationId, abortController);
        }
    }
    _getExportResultUsingFetch(_requestData, _method, printable, handleFile, operationId, abortController) {
        const _url = this._getUrlObject();
        const shouldIgnoreError = (operationId) => () => this.preview.progressBar.wasCancelRequested(operationId);
        this._exportResultDeferred = $.Deferred();
        this.preview.requestWrapper.getExportResult(_requestData, shouldIgnoreError(operationId), _method)
            .done(response => { var _a; return (_a = this._exportResultDeferred) === null || _a === void 0 ? void 0 : _a.resolve(response); })
            .catch(fail => { var _a; return (_a = this._exportResultDeferred) === null || _a === void 0 ? void 0 : _a.fail(fail); });
        this.preview.progressBar.text = getLocalization('Downloading the document...', 'WebDocumentViewer_DownloadingDocument');
        this._exportResultDeferred.done(response => {
            if (response.ok) {
                return this._handleBlobUsingFetch(response, _url, operationId, printable, abortController)
                    .then(fileMetadata => {
                    handleFile(fileMetadata, _url);
                });
            }
        }).catch(response => {
            if (!this.preview)
                return;
            this.preview.progressBar.complete(operationId);
            const message = getLocalization('An error occurred during the export', 'ASPxReportsStringId.WebDocumentViewer_ExportError');
            PreviewRequestWrapper.getProcessErrorCallback(this.preview, message, true)('', this, '');
        });
    }
    _handleBlobUsingFetch(response, _url, operationId, printable, abortController) {
        const contentLength = +response.headers.get('Content-Length');
        const contentDisposition = response.headers.get('Content-Disposition');
        const contentFilename = this._getFileName(contentDisposition);
        const contentType = !printable && response.headers.get('Content-Type') === 'application/pdf' && isIOS ? 'application/octet-stream' : response.headers.get('Content-Type');
        const reader = response.body.getReader();
        abortController && (abortController.signal.onabort = () => {
            reader.cancel();
        });
        const readChunk = (controller) => {
            reader.read().then(({ done, value }) => {
                if (done) {
                    controller.close();
                    return;
                }
                receivedLenght += value.byteLength;
                const currentProgress = Math.round(receivedLenght * 100 / contentLength) + 100;
                this._useSameTabExport && this.updateExportStatus(currentProgress, operationId);
                controller.enqueue(value);
                readChunk(controller);
            });
        };
        let receivedLenght = 0;
        return Promise.resolve(new ReadableStream({
            start(controller) {
                readChunk(controller);
            }
        }))
            .then(stream => {
            return new Response(stream, {
                headers: {
                    'Content-Type': contentType
                }
            });
        })
            .then(response => response.blob())
            .then(blob => {
            return {
                contentType,
                contentLength,
                contentFilename,
                url: !abortController.signal.aborted ? _url.createObjectURL(blob) : null
            };
        });
    }
    _getFileName(contentDisposition) {
        const utf8FileNameRegex = /filename\*=UTF-8''(.*?)$/i;
        const fileNameRegex = /^attachment; filename=\"?(.*[^\"?$])/;
        let fileName = 'downloaded file';
        if (utf8FileNameRegex.test(contentDisposition)) {
            fileName = utf8FileNameRegex.exec(contentDisposition)[1];
        }
        else if (fileNameRegex.test(contentDisposition)) {
            fileName = fileNameRegex.exec(contentDisposition)[1];
        }
        return decodeURIComponent(fileName);
    }
    _initExportWindow() {
        const message = getLocalization('Do not close this tab to get the resulting file.', 'ASPxReportsStringId.WebDocumentViewer_AsyncExportCloseWarning');
        let div = this._window.document.createElement('div');
        div.style['text-align'] = 'center';
        div.innerText = message;
        div.style.position = 'absolute';
        div.style.left = '0';
        div.style.top = '0';
        div.style.right = '0';
        div.style.fontSize = '20px';
        this._window.document.title = getLocalization('Exporting...', 'ASPxReportsStringId.WebDocumentViewer_AsyncExportTabTitle');
        this._window.document.body.appendChild(div);
        div = this._window.document.createElement('div');
        div.id = 'loading';
        div.style.position = 'absolute';
        div.style.left = '0';
        div.style.top = '0';
        div.style.bottom = '0';
        div.style.right = '0';
        div.style['text-align'] = 'center';
        div.style.margin = 'auto';
        div.style.height = '0';
        div.style.fontSize = '32px';
        this._window.document.body.appendChild(div);
    }
    _startExportAsync(args, useSameTabLocal, deferred, inlineResult, printable = false, abortController) {
        if (useSameTabLocal) {
            this._setPrintingLinkCallback(() => this._startExportAsync(args, false, deferred, inlineResult, printable, abortController));
        }
        else {
            if (!this._useSameTabExport) {
                this._window = window.open();
                this._window && (this._window.onunload = () => {
                    this.preview.progressBar.cancelAction();
                    this._terminateWorker();
                });
                this._initExportWindow();
            }
        }
        this.preview.progressBar.text = getLocalization('Exporting the document...', 'PreviewStringId.Msg_ExportingDocument');
        this.preview.progressBar.cancelText = getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel');
        const exportOperationIdDeferred = $.Deferred();
        const startExportOperationId = generateGuid();
        const shouldIgnoreError = (operationId) => () => this.preview.progressBar.wasCancelRequested(operationId || startExportOperationId);
        this.preview.progressBar.startProgress(startExportOperationId, (operationId) => {
            if (_isFetchConfigured() && this.preview.progressBar.progress >= 50)
                abortController.abort();
            else
                this.preview.requestWrapper.cancelExportRequest(operationId, shouldIgnoreError(operationId));
        }, exportOperationIdDeferred.promise());
        this.preview.requestWrapper.getStartExportOperation(args, shouldIgnoreError())
            .done((response) => {
            this.preview.previewHandlersHelper.doneStartExportHandler(deferred, inlineResult, response, exportOperationIdDeferred, startExportOperationId, useSameTabLocal, printable, abortController);
        })
            .fail((error) => {
            this.preview.previewHandlersHelper.errorStartExportHandler(deferred, startExportOperationId);
            exportOperationIdDeferred.reject();
            !this._useSameTabExport && error.responseJSON && error.responseJSON['error'] && this._showAsyncExportError(this._window, error.responseJSON['error']);
        });
    }
    export(args, actionUri, inlineResult, printable = false) {
        this._terminateWorker();
        const abortController = new AbortController();
        const deferred = $.Deferred();
        const requestData = this._exportResultRequestData;
        requestData.RequestUrl = actionUri;
        if (this.preview._editingFields.length > 0 || AsyncExportApproach() || this._useAsynchronousExport || (this.preview.exportOptionsModel && this.preview.exportOptionsModel.hasSensitiveData())) {
            setTimeout(() => {
                this._startExportAsync(args(), this._useSameTabExport, deferred, inlineResult, printable, abortController);
            });
        }
        else {
            deferred.resolve(true);
            if (this._useSameTabExport) {
                requestData.FormData['arg'] = args();
                requestData.FormData['actionKey'] = 'exportTo';
                this._setPrintingLinkCallback(() => this._doExportSync(null, true, false, false, null, abortController));
            }
            else {
                requestData.QueryParameters['arg'] = args();
                requestData.QueryParameters['actionKey'] = 'exportTo';
            }
            this._doExportSync(null, printable, this._useSameTabExport, false, null, abortController);
        }
        return deferred.promise();
    }
    _showAsyncExportError(window, message, status, statusText) {
        if (window) {
            const div = window.document.getElementById('loading');
            if (div) {
                if (status || statusText) {
                    const stringFormat = getLocalization('{0} ({1} {2})', 'ASPxReportsStringId.Error_WithStatus');
                    div.innerText = formatUnicorn(stringFormat, message, status, statusText);
                }
                else
                    div.innerText = message;
            }
        }
    }
    _printUsingBlob(_exportWindow, _requestData, _method, useSameTab, printable, shouldChangePrintJobName, operationId, abortControler) {
        if (!this._useSameTabExport && _exportWindow && shouldChangePrintJobName) {
            _exportWindow.location.replace(_requestData.RequestUrl);
            this.preview.progressBar.complete(operationId);
            return;
        }
        _method === 'GET' && (_requestData.RequestUrl = this._addQueryParamsToUri(_requestData.RequestUrl, _requestData.QueryParameters));
        if (_isFetchConfigured()) {
            this._printUsingBlobFetch(_exportWindow, _requestData, _method, useSameTab, printable, operationId, abortControler);
            return;
        }
        this._executeXhr(_exportWindow, _requestData, _method, this._handleXhrReady);
    }
    _executeXhr(_exportWindow, _requestData, _method, _handleXhrReady) {
        this._prepareXhr(_exportWindow, _requestData, _method, _requestData.RequestUrl, _handleXhrReady);
        const formData = new FormData();
        for (const key in _requestData.FormData) {
            formData.append(key, _requestData.FormData[key]);
        }
        this._xhr.send(formData);
    }
    _printUsingBlobFetch(_exportWindow, _requestData, _method, useSameTab, printable, operationId, abortController) {
        if (this._useSameTabExport && (!printable || (isMobile && !useSameTab))) {
            this._getExportResultUsingFetch(_requestData, _method, printable, this._handleFile, operationId, abortController);
            return;
        }
        const handleFile = (fileMetadata, _url) => {
            if (fileMetadata.url && _exportWindow) {
                _exportWindow.location.replace(fileMetadata.url);
                setTimeout(() => { _url.revokeObjectURL(fileMetadata.url); }, 1);
                this._callPrint(_exportWindow);
            }
        };
        this._getExportResultUsingFetch(_requestData, _method, printable, handleFile, operationId, abortController);
    }
    _prepareXhr(_exportWindow, _requestData, _method, _exportUrl, _handleXhrReady) {
        const _this = this;
        this._xhr = new XMLHttpRequest();
        this._xhr.onreadystatechange = function () {
            _handleXhrReady(_this, this, _exportWindow, _requestData);
        };
        this._xhr.open(_method, _exportUrl);
        this._xhr.responseType = 'blob';
    }
    _handleXhrReady(_this, _xmlHttpRequest, _exportWindow, _requestData) {
        if (_xmlHttpRequest.readyState == 4 && _xmlHttpRequest.status == 200) {
            const _url = _this._getUrlObject();
            const blobUrl = _url.createObjectURL(_xmlHttpRequest.response);
            _exportWindow && _exportWindow.location.replace(blobUrl);
            setTimeout(() => { _url.revokeObjectURL(blobUrl); }, 1);
            _this._callPrint(_exportWindow);
        }
        else if (_xmlHttpRequest.readyState == 4 && _xmlHttpRequest.status >= 400) {
            const message = getLocalization('An error occurred during the export', 'ASPxReportsStringId.WebDocumentViewer_ExportError');
            PreviewRequestWrapper.getProcessErrorCallback(_this.preview, message, true)('', this, '');
            if (_exportWindow && _exportWindow.name != _this.exportingFrameName) {
                _this._showAsyncExportError(_exportWindow, message, _xmlHttpRequest.status, _xmlHttpRequest.statusText);
            }
        }
    }
    _addQueryParamsToUri(_exportUri, _queryParameters) {
        const keys = Object.keys(_queryParameters || {});
        if (keys.length > 0) {
            _exportUri += '?';
            _exportUri += keys.map(x => x + '=' + _queryParameters[x]).join('&');
        }
        return _exportUri;
    }
    _replaceLocation(_exportWindow, _requestData) {
        if (!_requestData) {
            return safelyRunWindowOpen('');
        }
        const _exportUrl = this._addQueryParamsToUri(_requestData.RequestUrl, _requestData.QueryParameters);
        _exportWindow ? _exportWindow.location.replace(_exportUrl) : (_exportWindow = safelyRunWindowOpen(_exportUrl));
        return _exportWindow;
    }
    dispose() {
        var _a;
        super.dispose();
        (_a = this._exportResultDeferred) === null || _a === void 0 ? void 0 : _a.reject();
        if (this._xhr)
            this._xhr.onreadystatechange = null;
        (this._timeouts || []).forEach(tic => clearTimeout(tic));
        this.removeProperties();
    }
    updateExportStatus(progress, operationId) {
        if (_isFetchConfigured() && this._useSameTabExport) {
            progress = Math.floor(progress / 2);
        }
        if (this.preview.progressBar)
            this.preview.progressBar.progress = progress;
        if (this._window) {
            const div = this._window.document.getElementById('loading');
            const exportText = getLocalization('Exporting the document...', 'PreviewStringId.Msg_ExportingDocument') + ' ' + progress + '%';
            div && (div.innerText = exportText);
            this._window.document.title = getLocalization('Exporting...', 'ASPxReportsStringId.WebDocumentViewer_AsyncExportTabTitle') + progress + '%';
        }
        if (progress >= 100) {
            this.preview.progressBar.complete(operationId);
        }
    }
    getExportStatus(operationId) {
        const deferred = $.Deferred();
        this._timeouts.push(setTimeout(() => {
            this.preview.requestWrapper.getExportStatusRequest(operationId)
                .done((response) => {
                this.preview.previewHandlersHelper.doneExportStatusHandler(deferred, operationId, response);
            })
                .fail((error) => {
                this.preview.previewHandlersHelper.errorExportStatusHandler(deferred, operationId);
                !this._useSameTabExport && error.responseJSON && error.responseJSON['error'] && this._showAsyncExportError(this._window, error.responseJSON['error']);
            });
        }, 250));
        return deferred.promise();
    }
    getExportResult(operationId, inlineDisposition, useSameTab, token, printable = false, uri = '', abortController) {
        const requestData = this._exportResultRequestData;
        if (uri) {
            requestData.RequestUrl = uri;
        }
        else if (token) {
            requestData.RequestUrl = ReportServerDownloadUri();
            requestData.QueryParameters['token'] = token;
            requestData.QueryParameters['printable'] = printable.toString();
        }
        else {
            const arg = JSON.stringify({ id: operationId, inlineResult: !!inlineDisposition });
            requestData.RequestUrl = HandlerUri();
            if (this._useSameTabExport) {
                requestData.FormData['actionKey'] = 'getExportResult';
                requestData.FormData['arg'] = arg;
            }
            else {
                requestData.QueryParameters['actionKey'] = 'getExportResult';
                requestData.QueryParameters['arg'] = arg;
            }
        }
        this._window && (this._window.onunload = null);
        this._doExportSync(this._window, printable, useSameTab, !!uri, operationId, abortController);
        this._window = null;
    }
}
__decorate([
    mutable(null)
], ExportHandler.prototype, "exportActionUri", void 0);
__decorate([
    mutable(() => [])
], ExportHandler.prototype, "exportFormData", void 0);
__decorate([
    mutable(null)
], ExportHandler.prototype, "reportDisplayName", void 0);
__decorate([
    mutable(false)
], ExportHandler.prototype, "popupVisible", void 0);