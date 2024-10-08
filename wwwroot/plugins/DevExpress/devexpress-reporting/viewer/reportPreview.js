﻿/**
* DevExpress HTML/JS Reporting (viewer\reportPreview.js)
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
import { CustomSortedArrayStore, formatUnicorn, getErrorMessage } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, mutable, mutableArray, nativeModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import * as $ from 'jquery';
import { ImageSource } from '../common/imageSource';
import { generateGuid, transformNewLineCharacters, isIOS } from '../common/utils/_utils';
import { PreviewBricksKeyboardHelper } from './accessibility/_previewBricksKeyboardHelper';
import { ZoomAutoBy } from './constants';
import { EditingField } from './editing/editingField';
import { ExportOptionsMergedPreview, ExportOptionsPreview } from './exportOptions/exportOptionsPreview';
import { ExportHandler } from './internal/_exportHandler';
import { PreviewPage } from './internal/_page';
import { PageLoader } from './internal/_pageLoader';
import { PreviewHandlersHelper } from './internal/_previewHandlersHelper';
import { PreviewRequestWrapper } from './internal/_previewRequestWrapper';
import { ProgressViewModel } from './internal/_progressViewModel';
import { SortingProcessor } from './internal/_sortingProcessor';
import { safelyRunWindowOpen } from './internal/_utils';
import { createReportPreviewViewModel, updateReportPreviewViewModel } from './reportPreview.viewModel';
import { EditablePreviewEnabled, HandlerUri, MessageHandler, PollingDelay, PreloadedPagesOffset } from './settings';
import { BreadcrumbModel } from './internal/_previewBreadcrumbs';
export class ReportPreview extends BaseRenderingModel {
    constructor(handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl = false, enableKeyboardSupport, exportSettings, element, breadcrumb) {
        super();
        this.enableKeyboardSupport = enableKeyboardSupport;
        this.element = element;
        this.predefinedZoomLevels = [5, 2, 1.5, 1, 0.75, 0.5, 0.25];
        this._stopBuildRequests = {};
        this._closeReportRequests = {};
        this._closeDocumentRequests = {};
        this._cancelExportRequests = {};
        this._startBuildOperationId = '';
        this._drillDownState = [];
        this._sortingState = [];
        this._sortingProcessor = new SortingProcessor(() => this._sortingState || []);
        this._getBuildStatusDeferreds = [];
        this._timeouts = [];
        this._deferreds = [];
        this.getSelectedContent = (punctuationMark = '') => {
            const currentPage = this.pages[this.pageIndex];
            if (!currentPage || !currentPage.brickColumnWidthArray) {
                return '';
            }
            const activeBricks = [];
            const getActiveBricks = function (currentBrick, resultArray) {
                if (!currentBrick) {
                    return;
                }
                currentBrick.active && currentBrick.genlIndex != -1 && activeBricks.push(currentBrick);
                currentBrick.bricks && currentBrick.bricks.length != 0 && currentBrick.bricks.forEach((innerBrick) => { getActiveBricks(innerBrick, resultArray); });
            };
            getActiveBricks(currentPage.brick, activeBricks);
            if (!activeBricks) {
                return '';
            }
            const sortedActiveBricks = [];
            const extendWithSpaces = function (width, text) {
                const spaceCount = width - text.length;
                for (let i = 0; i <= spaceCount; i++) {
                    text += ' ';
                }
                return text;
            };
            let firstUsedColumn = currentPage.brickColumnWidthArray.length, lastUsedColumn = -1;
            activeBricks.forEach((activeBrick) => {
                let row = sortedActiveBricks[activeBrick.row];
                if (!row) {
                    row = [];
                    sortedActiveBricks[activeBrick.row] = row;
                }
                row[activeBrick.col] = activeBrick.accessibleDescription || activeBrick.text();
                if (firstUsedColumn > activeBrick.col) {
                    firstUsedColumn = activeBrick.col;
                }
                if (lastUsedColumn < activeBrick.col) {
                    lastUsedColumn = activeBrick.col;
                }
            });
            let result = '';
            sortedActiveBricks.forEach((row, index) => {
                for (let c = firstUsedColumn; c <= lastUsedColumn; c++) {
                    const rowText = row[c] ? row[c] + punctuationMark : '';
                    result += c == lastUsedColumn ? rowText : extendWithSpaces(currentPage.brickColumnWidthArray[c], rowText);
                }
                if (index != sortedActiveBricks.length - 1) {
                    result += '\r\n';
                }
            });
            return result;
        };
        this.editingFieldsProvider = () => this._editingFields;
        this._raiseOnSizeChanged = () => { this._loadVisibleImages && this._loadVisibleImages(); };
        this._loadVisibleImages = null;
        this._getPagesViewModels = () => { var _a; return (_a = this.pages) === null || _a === void 0 ? void 0 : _a.map(x => x.getViewModel()); };
        this.canSwitchToDesigner = true;
        this.allowURLsWithJSContent = false;
        this.zoomStep = 0.05;
        this._progressFirstTime = false;
        HandlerUri(handlerUri || HandlerUri());
        this.pageLoader = new PageLoader(this);
        this.progressBar = new ProgressViewModel(enableKeyboardSupport);
        this.editingFieldChanged = callbacks && callbacks.editingFieldChanged;
        this.previewHandlersHelper = previewHandlersHelper || new PreviewHandlersHelper(this);
        this.requestWrapper = previewRequestWrapper || new PreviewRequestWrapper(null, callbacks);
        this.rtlViewer = rtl;
        this._breadcrumb = breadcrumb !== null && breadcrumb !== void 0 ? breadcrumb : new BreadcrumbModel();
        this.exportHandler = new ExportHandler(exportSettings, this);
        if (callbacks) {
            this.customProcessBrickClick = callbacks.previewClick;
            this.customizeExportOptions = callbacks.customizeExportOptions;
            this.documentReady = callbacks.documentReady;
            this.exportHandler.onExportCustomEvent = callbacks.onExport;
            this._onGetBuildStatus = callbacks._onGetBuildStatus;
            this._onGetDocumentDetails = callbacks._onGetDocumentDetails;
        }
        this.addDisposable(EditablePreviewEnabled.subscribe((newValue) => !newValue && (this.editingFieldsHighlighted = false)));
        this._onDocumentBuildingChanged = (newVal) => {
            if (!newVal) {
                this._unifier = generateGuid();
                const documentId = this.documentId;
                const pageCount = this.pages.length;
                for (let i = 0; i < pageCount; i++) {
                    const page = this.pages[i];
                    if (!page.pageLoading) {
                        page.clearBricks();
                    }
                    page.updateSize(this.originalZoom);
                    page.actualResolution = 0;
                    page.isClientVisible && page._setPageImgSrc(documentId, this._unifier, this.originalZoom);
                }
                if (!this.pageLoader.isActive()) {
                    this.pageLoader.prefetchPages(0, 0, undefined);
                }
            }
            else {
                this.progressBar.text = getLocalization('Creating the document...', 'PreviewStringId.Msg_CreatingDocument');
                this.progressBar.cancelText = getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel');
            }
        };
        this._disposables.push(this.progressBar);
        this._onOriginalZoomChanged = () => {
            if (this.showMultipagePreview) {
                this.pages.forEach((page) => {
                    page.updateSize(this.originalZoom);
                    page.isClientVisible = false;
                });
                this._raiseOnSizeChanged();
            }
            else {
                const currentPage = this.pages[this.pageIndex];
                currentPage && Promise.resolve().then(() => {
                    currentPage.onPropertyChanged({ propertyName: 'isClientVisible', newValue: currentPage.isClientVisible });
                });
            }
        };
        this._updateCurrentPage = () => {
            const pagesArray = this.pages;
            const pageIndex = this.pageIndex;
            if (!pagesArray || pageIndex >= pagesArray.length)
                return;
            let currentPage = null;
            if (pageIndex >= 0)
                currentPage = pagesArray[pageIndex];
            if (currentPage != this.currentPage)
                this.currentPage = currentPage;
        };
        if (enableKeyboardSupport) {
            this.previewBrickKeyboardHelper = new PreviewBricksKeyboardHelper(this);
            this._disposables.push(this.previewBrickKeyboardHelper);
        }
        this.addDisposable(this.progressBar.events.on('inProgressChanged', (args) => {
            this._updateExportDisabled();
        }), this.progressBar.events.on('progressChanged', (args) => {
            if (this.currentPage) {
                this._updateEmptyDocumentCaption();
            }
        }), this.exportHandler.events.on('reportDisplayNameChanged', (args) => {
            this._breadcrumb.updateCurrentReportName(args.newValue);
        }), this.events.on('documentIdChanged', (args) => {
            this._breadcrumb.updateCurrentDocumentId(this.documentId);
        }));
        this._updateExportDisabled();
    }
    _doDrillDown(drillDownKey) {
        this._drillDownState.forEach((x) => x.Key === drillDownKey && (x.Value = !x.Value));
        const documentId = this.documentId;
        this.closeDocument();
        this.progressBar.complete(documentId);
        this.documentMap = null;
        for (let i = this.pages.length - 1; i >= 0; i--) {
            const page = this.pages[i];
            if (i > this.pageIndex) {
                this.removePage(page);
            }
            else {
                page._clear();
            }
        }
        this._startBuildRequest();
    }
    _doSorting(sortData, shiftKey, ctrlKey) {
        if (!this._sortingProcessor.doSorting(sortData, shiftKey, ctrlKey))
            return;
        this.closeDocument();
        this.documentMap = null;
        this.pages.forEach(page => page._clear());
        this._startBuildRequest();
    }
    dispose() {
        super.dispose();
        this.pageLoader.reset();
        this.removeAllPages();
        (this._timeouts || []).forEach(tic => clearTimeout(tic));
        (this._deferreds || []).forEach(deferred => deferred.reject());
        this.exportHandler && this.exportHandler.dispose();
        this.removeProperties();
        this._sortingProcessor = null;
    }
    removePage(page) {
        const deletedPage = this.pages.splice(this.pages.indexOf(page), 1)[0];
        deletedPage === null || deletedPage === void 0 ? void 0 : deletedPage.dispose();
    }
    removeAllPages() {
        this.pages.forEach(x => x.dispose());
        this.pages = [];
    }
    removeEmptyPages(all) {
        all && this.removeAllPages();
        for (let idx = this.pages.length - 1; idx >= 0; idx--) {
            const tempPage = this.pages[idx];
            (tempPage.isEmpty || tempPage.pageIndex === -1) && this.removePage(tempPage);
        }
    }
    _initialize(closeDocument = true) {
        var _a, _b, _c;
        this._drillDownState = [];
        this._sortingState = [];
        this._initialDocumentData = null;
        if (this.requestWrapper && ((_a = this.requestWrapper['_searchModel']) === null || _a === void 0 ? void 0 : _a.loading) && ((_b = this.requestWrapper['_searchModel']) === null || _b === void 0 ? void 0 : _b.useAsyncSearch))
            (_c = this.requestWrapper['_searchModel']) === null || _c === void 0 ? void 0 : _c.stopSearchProcess();
        if (closeDocument)
            this.closeDocument();
        this._editingFields = [];
        this.disposeArray(this._editingFields);
        this.documentMap = null;
        this.pageIndex = -1;
        this.pageLoading = true;
        this.errorMessage = '';
        this.exportOptionsModel = null;
        this.progressBar.complete(null);
        this._getBuildStatusDeferreds.forEach(a => a.reject());
        this._getBuildStatusDeferreds = [];
        this.disposePagesChangedEvent && this.disposePagesChangedEvent();
        this.pages.forEach(x => x.dispose());
        this.pages = [this.createPage(-1, undefined)];
        this.exportHandler.reportDisplayName = null;
    }
    createPage(pageIndex, processClick, subscribeToPageLoading = false) {
        return new PreviewPage(this, pageIndex, processClick, subscribeToPageLoading);
    }
    _getIgnorePredicate(documentId) {
        return () => this._closeDocumentRequests && this._closeDocumentRequests[documentId];
    }
    _cleanTabInfo() {
        this.exportOptionsModel = null;
        this.documentMap = null;
    }
    _clearReportInfo() {
        this._cleanTabInfo();
        this.closeReport();
        this.originalParametersInfo = null;
    }
    createBrickClickProcessor(cyclePageIndex) {
        const _self = this;
        return (brick, e) => {
            _self.goToPage(cyclePageIndex, true);
            if (!brick)
                return;
            const page = _self.pages[cyclePageIndex];
            if (!page)
                return;
            page.selectBrick('');
            const shiftKey = !!(e && e.shiftKey);
            const ctrlKey = !!(e && e.ctrlKey);
            const brickNavigation = brick && brick.navigation;
            const defaultHandler = () => {
                if (brickNavigation) {
                    if (brickNavigation.drillThroughData && _self.reportId) {
                        this._breadcrumb.updateCurrentPosition(this.pageIndex, brick.indexes);
                        _self.drillThrough(brickNavigation.drillThroughData);
                    }
                    else if (brickNavigation.drillDownKey && _self.reportId && _self._doDrillDown && _self._drillDownState.length > 0) {
                        if (_self._startBuildOperationId)
                            return;
                        _self._doDrillDown(brickNavigation.drillDownKey);
                    }
                    else if (brickNavigation.sortData && _self.reportId && _self._doSorting && _self._sortingState.length > 0) {
                        if (_self._startBuildOperationId)
                            return;
                        _self._doSorting(brickNavigation.sortData, shiftKey, ctrlKey);
                    }
                    else if (brickNavigation.pageIndex >= 0) {
                        const targetPage = _self.pages.filter(page => page.pageIndex === brickNavigation.pageIndex)[0];
                        if (targetPage) {
                            _self.goToPage(brickNavigation.pageIndex);
                            targetPage.selectBrick(brickNavigation.indexes);
                            _self.brickClickDocumentMapHandler && _self.brickClickDocumentMapHandler(brickNavigation);
                        }
                    }
                    else {
                        const validateUrl = function (url) {
                            const isUrlString = typeof url === 'string';
                            if (isUrlString) {
                                url = url.toLowerCase();
                            }
                            if (url === 'empty') {
                                return false;
                            }
                            return _self.allowURLsWithJSContent || (isUrlString && (url.indexOf('javascript:') === -1));
                        };
                        if (brickNavigation.url && validateUrl(brickNavigation.url)) {
                            safelyRunWindowOpen(brickNavigation.url, brickNavigation.target || '_blank');
                        }
                    }
                }
            };
            if (_self.customProcessBrickClick && _self.customProcessBrickClick(cyclePageIndex, brick, defaultHandler))
                return;
            defaultHandler();
        };
    }
    delayedInit() {
        this.previewBrickKeyboardHelper && this.previewBrickKeyboardHelper.delayedInit();
    }
    openReport(reportName) {
        this._clearReportInfo();
        const deferred = $.Deferred();
        this._deferreds.push(deferred);
        this._openReportOperationDeferred = deferred;
        this.requestWrapper.openReport(reportName).done((response) => {
            deferred.resolve(response);
        }).fail((error) => {
            deferred.reject(error);
        });
        return this.initialize(deferred.promise());
    }
    goToReport(customData, closeCurrentReport = true) {
        const deferred = $.Deferred();
        this._deferreds.push(deferred);
        this.requestWrapper.goToReport(customData).done(response => {
            if (closeCurrentReport) {
                this._clearReportInfo();
                this.initialize(deferred.promise());
            }
            deferred.resolve(response);
        }).fail((error) => {
            deferred.reject(error);
        });
        return deferred.promise();
    }
    drillThrough(drillThroughData) {
        const deferred = $.Deferred();
        this._deferreds.push(deferred);
        this.requestWrapper.drillThrough(drillThroughData).done(response => {
            this._breadcrumb.addItem(response);
            this.initialize(deferred.promise(), false);
            deferred.resolve(response);
        }).fail((error) => {
            deferred.reject(error);
        });
        return deferred.promise();
    }
    _sortCustomParametersLookUpValues(reportParameterInfo) {
        var _a;
        if (!reportParameterInfo || !reportParameterInfo.knownEnums)
            return;
        (_a = reportParameterInfo.parameters) === null || _a === void 0 ? void 0 : _a.forEach((parameter) => {
            if (!parameter.LookUpValues)
                return;
            if (reportParameterInfo.knownEnums.some(x => x.enumType === parameter.TypeName)) {
                CustomSortedArrayStore._sortItems(parameter.LookUpValues, 'Description');
            }
        });
    }
    _resolveFirstPage(status) {
        const firstPage = this.pages[0];
        firstPage.shouldSendRequest = !!status.pageCount;
        if (firstPage.displayImageSrc || status.pageCount === 0)
            return;
        if (status.firstPageResponse && firstPage.lastGetPageDeferred) {
            firstPage.lastGetPageDeferred.resolve(status.firstPageResponse);
        }
        else {
            firstPage.lastGetPageDeferred && firstPage._requestPage(this);
        }
        this.setPageVisibility(firstPage, true);
    }
    initialize(initializeDataPromise, closeDocument = true) {
        this.reportOpening = true;
        this.reportId = null;
        this.reportUrl = null;
        this.documentId = null;
        this._initialize(closeDocument);
        const _initializeDeferred = $.Deferred();
        this._deferreds.push(_initializeDeferred);
        _initializeDeferred.done(() => {
            initializeDataPromise.done((previewInitialize) => {
                var _a;
                this.reportOpening = false;
                if (previewInitialize && !previewInitialize.error && !previewInitialize.startBuildFaultMessage && (previewInitialize.reportId || previewInitialize.documentId)) {
                    const setReport = (previewInitialize, parameters, pageIndex) => {
                        this._initialize(false);
                        this.documentBuilding = false;
                        this.progressBar.inProgress = false;
                        this.reportId = previewInitialize.reportId;
                        this.reportUrl = previewInitialize.reportUrl;
                        this.documentId = previewInitialize.documentId;
                        this.rtlReport = previewInitialize.rtlReport;
                        const pageSettings = previewInitialize.pageSettings;
                        if (pageSettings) {
                            if (pageSettings.height)
                                this._pageHeight = pageSettings.height;
                            if (pageSettings.width)
                                this._pageWidth = pageSettings.width;
                            this._pageBackColor = (pageSettings.color && this.readerMode) ? 'rgba(' + pageSettings.color + ')' : '';
                        }
                        this._initialDocumentData = previewInitialize.documentData;
                        this._sortCustomParametersLookUpValues(previewInitialize.parametersInfo);
                        this.originalParametersInfo = previewInitialize.parametersInfo;
                        if (previewInitialize.documentId && !this.documentBuilding) {
                            const documentIdPromise = $.Deferred().resolve(previewInitialize.documentId).promise();
                            this.progressBar.startProgress(null, () => { this.stopBuild(); }, documentIdPromise)
                                .always(() => { this.documentBuilding = false; });
                            this.documentBuilding = true;
                            const doGetBuildStatusFunc = this.getDoGetBuildStatusFunc(true);
                            doGetBuildStatusFunc(previewInitialize.documentId);
                        }
                        if (parameters) {
                            Object.keys(parameters).forEach(path => {
                                const setParameterValueByPath = (parameterViewModel, parameterPath, value) => {
                                    var _a;
                                    if (parameterViewModel[parameterPath] !== undefined) {
                                        parameterViewModel[parameterPath].value ? parameterViewModel[parameterPath].value = value
                                            : parameterViewModel[parameterPath] = value;
                                    }
                                    else {
                                        (_a = parameterViewModel.groupLayoutItems) === null || _a === void 0 ? void 0 : _a.forEach(groupLayoutItem => {
                                            setParameterValueByPath(groupLayoutItem, parameterPath, value);
                                        });
                                    }
                                };
                                setParameterValueByPath(this.previewParametersViewModel, path, parameters[path]);
                            });
                        }
                        this._breadcrumb.updatePreviewSize && this._breadcrumb.updatePreviewSize();
                        this.disposePagesChangedEvent && this.disposePagesChangedEvent();
                        if (pageIndex !== undefined) {
                            this.disposePagesChangedEvent = this.events.on('pagesChanged', (args) => {
                                const pageInfo = this._breadcrumb.getCurrentPageInfo();
                                if (this.pages.length && this.pages.length > pageInfo.pageIndex) {
                                    const targetPage = this.pages[pageInfo.pageIndex];
                                    if (targetPage) {
                                        this.pageIndex !== pageInfo.pageIndex && this.goToPage(pageInfo.pageIndex);
                                        pageInfo.indexes && pageInfo.indexes.length && targetPage.selectBrick(pageInfo.indexes);
                                        this.disposePagesChangedEvent && this.disposePagesChangedEvent();
                                    }
                                }
                            });
                        }
                    };
                    setReport(previewInitialize);
                    this._breadcrumb.updateCurrentItem(previewInitialize, setReport, (_a = previewInitialize.documentData) === null || _a === void 0 ? void 0 : _a.displayName);
                }
                else if (previewInitialize.startBuildFaultMessage) {
                    this._processError(getLocalization('Cannot create a document for the current report', 'ASPxReportsStringId.WebDocumentViewer_DocumentCreationError'), null, true, previewInitialize.startBuildFaultMessage);
                }
                else {
                    this.pageLoading = false;
                    this._processError(getLocalization('The report preview initialization has failed', 'ASPxReportsStringId.WebDocumentViewer_InitializationError'), previewInitialize && previewInitialize.error);
                }
            }).fail((error) => {
                this.reportOpening = false;
                this.removeEmptyPages();
            });
        }).resolve();
        return initializeDataPromise;
    }
    _deserializeExportOptions(exportOptionsString, isMerged) {
        const jsonModel = exportOptionsString && JSON.parse(exportOptionsString);
        return (isMerged ? new ExportOptionsMergedPreview(this.signatures) : new ExportOptionsPreview(this.signatures)).deserialize(jsonModel, nativeModelSerializer());
    }
    deactivate() {
        this._initialize();
        this._cleanTabInfo();
        this.closeReport();
        this.documentId = null;
        this.reportId = null;
        this.reportUrl = null;
        this.originalParametersInfo = null;
    }
    startBuild() {
        this._initialize();
        return this._startBuildRequest();
    }
    customDocumentOperation(customData, hideMessageFromUser) {
        const documentId = this.documentId;
        if (this.documentBuilding || !documentId)
            return;
        const serializedExportOptions = this.exportOptionsModel ? JSON.stringify(nativeModelSerializer().serialize(this.exportOptionsModel)) : null;
        const editingFields = () => this._editingFields.map(item => item.getEditValue());
        const deferred = $.Deferred();
        setTimeout(() => this.requestWrapper.customDocumentOperation(documentId, serializedExportOptions, editingFields(), customData, hideMessageFromUser)
            .done((response) => {
            try {
                if (response && response.message) {
                    if (response.succeeded) {
                        MessageHandler().processMessage(response.message, !hideMessageFromUser, this._getToastMessageContainer());
                    }
                    else {
                        MessageHandler().processError(response.message, !hideMessageFromUser, undefined, this._getToastMessageContainer());
                    }
                }
            }
            finally {
                deferred.resolve(response);
            }
        })
            .fail(error => {
            const response = { message: getLocalization('The requested document operation cannot be performed.', 'ASPxReportsStringId.WebDocumentViewer_CustomDocumentOperationsDenied_Error') };
            deferred.reject(response);
        }));
        return deferred.promise();
    }
    _initializeStartBuild(documentIdPromise) {
        if (this.documentBuilding || this._startBuildOperationId) {
            return false;
        }
        this._startBuildOperationId = generateGuid();
        this.documentId = null;
        this.progressBar.startProgress(this._startBuildOperationId, () => { this.stopBuild(); }, documentIdPromise)
            .always(() => { this.documentBuilding = false; });
        this.documentBuilding = true;
        return true;
    }
    _startBuildRequest() {
        const documentIdDeferred = $.Deferred();
        if (!this._initializeStartBuild(documentIdDeferred)) {
            return null;
        }
        const deferred = $.Deferred();
        const currentReportId = this.reportId;
        const startBuildOperationId = this._startBuildOperationId;
        const shouldIgnoreError = () => this._closeReportRequests[currentReportId];
        this.requestWrapper.startBuildRequest(shouldIgnoreError)
            .done((response) => {
            this.previewHandlersHelper && this.previewHandlersHelper.doneStartBuildHandler(deferred, response, startBuildOperationId, documentIdDeferred);
            this._breadcrumb.updateCurrentParameters(this.previewParametersViewModel);
        })
            .fail(() => {
            this.previewHandlersHelper && this.previewHandlersHelper.errorStartBuildHandler(deferred, startBuildOperationId);
            documentIdDeferred.reject();
        });
        deferred.always(() => this._startBuildOperationId = '');
        return deferred.promise();
    }
    getBuildStatus(documentId, isFirstRequest, shouldRequestFirstPage) {
        const deferred = $.Deferred();
        this._deferreds.push(deferred);
        const sessionDeferred = $.Deferred();
        this._getBuildStatusDeferreds.push(sessionDeferred);
        this._timeouts.push(setTimeout(() => {
            const ignorePredicate = this._getIgnorePredicate(documentId);
            const firstPage = this.pages[0];
            const firstPageRequest = ((firstPage === null || firstPage === void 0 ? void 0 : firstPage.shouldSendRequest) || !shouldRequestFirstPage) ? undefined : firstPage === null || firstPage === void 0 ? void 0 : firstPage._getCurrentPageRequest(documentId);
            this.requestWrapper.getBuildStatusRequest(documentId, ignorePredicate, isFirstRequest, firstPageRequest)
                .done((response) => {
                sessionDeferred.resolve(response);
            })
                .fail((error) => {
                sessionDeferred.reject(error);
            });
            sessionDeferred.done((response) => {
                this._onGetBuildStatus && this._onGetBuildStatus(response);
                this.previewHandlersHelper && this.previewHandlersHelper.doneGetBuildStatusHandler(deferred, documentId, response, ignorePredicate);
            }).fail(() => {
                this.previewHandlersHelper && this.previewHandlersHelper.errorGetBuildStatusHandler(deferred);
            });
        }, 250));
        return deferred.promise();
    }
    getDoGetBuildStatusFunc(shouldRequestFirstPage = false) {
        const preview = this;
        let isFirstRequest = true;
        this.previewHandlersHelper.processPages(1, this._getIgnorePredicate(this.documentId));
        this.pages[0].shouldSendRequest = false;
        const doGetBuildStatus = (documentId) => {
            const promise = preview.getBuildStatus(documentId, isFirstRequest, shouldRequestFirstPage);
            promise.done((result) => {
                isFirstRequest = false;
                if (documentId !== preview.documentId)
                    return;
                if (result && result.requestAgain && !preview._closeDocumentRequests[documentId]) {
                    const doStatusRequest = () => {
                        if (!preview._closeDocumentRequests[documentId]) {
                            doGetBuildStatus(documentId);
                        }
                    };
                    PollingDelay() ? this._timeouts.push(setTimeout(doStatusRequest, PollingDelay())) : doStatusRequest();
                }
                else {
                    try {
                        if (result.error || !result.requestAgain && !result.pageCount) {
                            preview.pageLoading = false;
                            preview.removeEmptyPages(!result.pageCount);
                            if (!preview.pages.length)
                                preview.pageIndex = -1;
                            return;
                        }
                        if (!result.completed) {
                            return;
                        }
                        else if (result.pageCount < preview.pages.length) {
                            preview.pageIndex = Math.min(result.pageCount - 1, preview.pageIndex);
                            preview.pages.splice(result.pageCount, preview.pages.length);
                        }
                        preview.getDocumentData(documentId);
                    }
                    finally {
                        preview.progressBar.complete(documentId);
                        this._timeouts.push(setTimeout(preview._raiseOnSizeChanged, 1000));
                    }
                }
            });
        };
        return doGetBuildStatus;
    }
    getDocumentData(documentId) {
        const ignoreErrorPredicate = this._getIgnorePredicate(documentId);
        const documentDataDeferred = $.Deferred();
        this._deferreds.push(documentDataDeferred);
        documentDataDeferred.done((response) => {
            var _a, _b;
            if (!response) {
                return;
            }
            this.signatures = (response.signatures || []).map(x => {
                const fields = [];
                let image = null;
                if (x.issuer)
                    fields.push({
                        label: getLocalization('Issuer:', 'PreviewStringId.ExportOption_PdfSignature_Issuer'),
                        value: x.issuer
                    });
                if (x.contactInfo)
                    fields.push({
                        label: getLocalization('Contact Info', 'PreviewStringId.ExportOption_PdfSignatureOptions_ContactInfo') + ':',
                        value: x.contactInfo
                    });
                if (x.location)
                    fields.push({
                        label: getLocalization('Location', 'PreviewStringId.ExportOption_PdfSignatureOptions_Location') + ':',
                        value: x.location
                    });
                if (x.reason)
                    fields.push({
                        label: getLocalization('Reason', 'PreviewStringId.ExportOption_PdfSignatureOptions_Reason') + ':',
                        value: x.reason
                    });
                if (x.validFrom && x.validTo)
                    fields.push({
                        value: formatUnicorn(getLocalization('Valid From: {0:d} to {1:d}', 'PreviewStringId.ExportOption_PdfSignature_ValidRange'), x.validFrom, x.validTo)
                    });
                if (x.image)
                    image = ImageSource.parse(x.image).getDataUrl();
                return {
                    displayName: fields.map(x => x.value).join('; '),
                    image,
                    key: x.key,
                    fields
                };
            });
            this.previewHandlersHelper.processPages(response.pageCount, () => false);
            this._onGetDocumentDetails && this._onGetDocumentDetails(response);
            this.exportHandler.reportDisplayName = response.displayName;
            this._drillDownState = response.drillDownKeys || [];
            this._sortingState = response.sortingState || [];
            const isMerged = this.reportId
                ? response.canPerformContinuousExport === false
                : (_b = !((_a = this._initialDocumentData) === null || _a === void 0 ? void 0 : _a.canPerformContinuousExport)) !== null && _b !== void 0 ? _b : true;
            const deserializedExportOptions = this._deserializeExportOptions(response.exportOptions, isMerged);
            const customizeExportOptionsArgs = { exportOptions: deserializedExportOptions, panelVisible: true };
            this.customizeExportOptions && this.customizeExportOptions(customizeExportOptionsArgs);
            this.exportOptionsTabVisible = customizeExportOptionsArgs.panelVisible;
            this.exportOptionsModel = deserializedExportOptions;
            this.documentMap = response.documentMap;
            this.disposeArray(this._editingFields);
            this._editingFields = (response.editingFields || []).map((item, index) => {
                const field = this.createEditingField(item, index);
                if (this.editingFieldChanged) {
                    field.editingFieldChanged = this.editingFieldChanged;
                }
                return field;
            });
        });
        this.requestWrapper.getDocumentData(documentId, ignoreErrorPredicate)
            .done(response => {
            documentDataDeferred.resolve(response);
            if (this.documentReady && documentId) {
                this._timeouts.push(setTimeout(() => {
                    const pageCount = this.pages.length;
                    this.documentReady(documentId, this.reportId, pageCount);
                }));
            }
        })
            .fail(error => {
            documentDataDeferred.reject(error);
        });
    }
    exportDocumentTo(format, inlineResult) {
        if (!this.documentId)
            return;
        this.pageLoader.reset();
        let signature = null;
        if (format === 'pdf') {
            signature = this.exportOptionsModel.pdf._get('signature');
        }
        const serializedExportOptions = this.exportOptionsModel ? JSON.stringify(nativeModelSerializer().serialize(this.exportOptionsModel)) : null;
        const args = () => JSON.stringify({
            documentId: this.documentId,
            exportOptions: serializedExportOptions,
            format: format,
            signature,
            inlineResult: inlineResult,
            editingFieldValues: this._editingFields.map(item => {
                const editValue = item.getEditValue();
                if (typeof editValue === 'string')
                    return transformNewLineCharacters(editValue);
                return editValue;
            })
        });
        this.exportHandler.export(args, HandlerUri(), inlineResult);
    }
    printDocument(pageIndex) {
        if (!this.documentId)
            return;
        this.pageLoader.reset();
        const signature = this.exportOptionsModel.pdf._get('signature');
        const previousShowPrintDialogOnOpen = this.exportOptionsModel.pdf._get('showPrintDialogOnOpen');
        const previousPdfACompatibility = this.exportOptionsModel.pdf._get('pdfACompatibility');
        const previousPageRange = this.exportOptionsModel.pdf._get('pageRange');
        this.exportOptionsModel.pdf._set('showPrintDialogOnOpen', true);
        this.exportOptionsModel.pdf._set('pdfACompatibility', 'None');
        pageIndex = parseInt(pageIndex);
        if ((!!pageIndex && pageIndex > 0 || pageIndex === 0) && (this.pages.length > pageIndex)) {
            this.exportOptionsModel.pdf._set('pageRange', pageIndex + 1);
        }
        const serializedExportOptions = JSON.stringify(nativeModelSerializer().serialize(this.exportOptionsModel));
        const args = () => JSON.stringify({
            documentId: this.documentId,
            exportOptions: serializedExportOptions,
            format: 'printpdf',
            signature,
            inlineResult: !isIOS,
            editingFieldValues: this._editingFields.map(item => item.getEditValue())
        });
        this.exportHandler.export(args, HandlerUri(), true, true);
        this.exportOptionsModel.pdf._set('showPrintDialogOnOpen', previousShowPrintDialogOnOpen);
        this.exportOptionsModel.pdf._set('pdfACompatibility', previousPdfACompatibility);
        this.exportOptionsModel.pdf._set('pageRange', previousPageRange);
    }
    stopBuild(documentId) {
        const id = documentId || this.documentId;
        if (!id) {
            this._startBuildOperationId && (this._stopBuildRequests[this._startBuildOperationId] = true);
            return;
        }
        this._stopBuildRequests[id] = true;
        this.requestWrapper.stopBuild(id);
    }
    closeDocument(documentId) {
        const _documentId = documentId || this.documentId;
        if (!_documentId) {
            this._startBuildOperationId && (this._closeDocumentRequests[this._startBuildOperationId] = true);
            return;
        }
        this._closeDocumentRequests[_documentId] = true;
        this.progressBar.complete(documentId);
        this.requestWrapper.sendCloseRequest(_documentId);
    }
    closeReport() {
        this._openReportOperationDeferred && this._openReportOperationDeferred.reject();
        const currentReportId = this.reportId;
        if (!currentReportId) {
            return;
        }
        this._closeReportRequests[currentReportId] = true;
        this.requestWrapper.sendCloseRequest(null, currentReportId);
    }
    setPageVisibility(page, visible) {
        page.isClientVisible = visible;
        if (visible) {
            this.pageLoader.reset();
            const offset = PreloadedPagesOffset();
            if (offset === 0)
                return;
            let startIndex = page.pageIndex - 2;
            startIndex = startIndex < 0 ? 0 : startIndex;
            const endIndex = page.pageIndex + offset;
            this.pageLoader.prefetchPages(startIndex, endIndex, page.pageIndex);
        }
    }
    updatePage(page, zoom = this.originalZoom) {
        page._setPageImgSrc(this.documentId, this._unifier, zoom, this.documentBuilding);
    }
    goToPage(pageIndex, forcePageChanging, throttle) {
        var _a;
        if (!forcePageChanging && this.pageIndex === pageIndex || this.pages.length === 0 || pageIndex < 0 || pageIndex >= this.pages.length) {
            return;
        }
        if (this._goToPageTimer !== undefined) {
            clearTimeout(this._goToPageTimer);
        }
        const updateActivePage = (activePageIndex) => {
            this.pages.forEach((page) => {
                const visible = page.pageIndex === activePageIndex;
                page.active = visible;
                this.setPageVisibility(page, visible);
            });
            this._goToPageTimer = undefined;
        };
        if (throttle && !((_a = this.pages[pageIndex]) === null || _a === void 0 ? void 0 : _a.imageSrc))
            this._timeouts.push(this._goToPageTimer = setTimeout(() => updateActivePage(this.pageIndex), throttle));
        else
            updateActivePage(pageIndex);
        this.pageIndex = pageIndex;
    }
    createEditingField(item, index) {
        return new EditingField(item, index, this.requestWrapper);
    }
    _updateExportDisabled() {
        this.exportDisabled = this.progressBar.inProgress || !this.exportOptionsModel;
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'zoom') {
            const zoom = args.newValue;
            if (zoom > 0) {
                this.autoFitBy = ZoomAutoBy.None;
                this.originalZoom = zoom;
            }
            else {
                this.autoFitBy = zoom;
            }
        }
        if (args.propertyName === 'autoFitBy' || args.propertyName === 'originalZoom') {
            this.zoom = (this.autoFitBy != ZoomAutoBy.None || this.originalZoom === 0) ? this.autoFitBy : this.originalZoom;
        }
        if (args.propertyName === 'documentId')
            this._unifier = args.newValue ? generateGuid() : '';
        if (args.propertyName === 'originalZoom')
            this._onOriginalZoomChanged();
        if (args.propertyName === 'previewSize')
            this._raiseOnSizeChanged();
        if (args.propertyName === 'pages' || args.propertyName === 'pageIndex')
            this._updateCurrentPage();
        if (args.propertyName === 'documentBuilding')
            this._onDocumentBuildingChanged(args.newValue);
        if (args.propertyName === 'exportOptionsModel')
            this._updateExportDisabled();
        if (args.propertyName === 'showMultipagePreview') {
            if (!args.newValue) {
                const currentPage = this.pages[this.pageIndex];
                if (currentPage)
                    currentPage.isClientVisible = true;
            }
            else {
                this._loadVisibleImages && this._loadVisibleImages(500);
            }
        }
        if (args.propertyName === 'documentId' || args.propertyName === 'currentPage' || args.propertyName === 'pageIndex'
            || args.propertyName === 'documentBuilding' || args.propertyName == 'reportOpening' || args.propertyName == 'errorMessage'
            || args.propertyName === 'originalParametersInfo') {
            this._updateEmptyDocumentCaption();
        }
    }
    createViewModel() {
        return createReportPreviewViewModel.call(this, super.createViewModel());
    }
    updateViewModel(args) {
        updateReportPreviewViewModel.call(this, args);
    }
    _getErrorMessage(jqXHR) {
        const serverError = getErrorMessage(jqXHR);
        if (!serverError)
            return jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.result && jqXHR.responseJSON.result.faultMessage ?
                jqXHR.responseJSON.result.faultMessage :
                serverError;
        return serverError;
    }
    _processError(error, jqXHR, showForUser = true, serverError) {
        const prefix = error + ': ';
        serverError = serverError || this._getErrorMessage(jqXHR);
        serverError && (error = prefix + serverError);
        MessageHandler().processError(error, showForUser, serverError && prefix, this._getToastMessageContainer());
    }
    _getToastMessageContainer() {
        var _a;
        return (_a = this.element) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('dx-designer-viewport')[0];
    }
    _updateEmptyDocumentCaption() {
        const parametersInfo = this.originalParametersInfo;
        const parametersExist = parametersInfo && parametersInfo.parameters.some(x => x.Visible);
        let newCaption = '';
        if (this.documentBuilding) {
            if (this.currentPage) {
                if (!this._progressFirstTime)
                    newCaption = formatUnicorn(getLocalization('Progress {0}%', 'ASPxReportsStringId.WebDocumentViewer_AriaDocumentProgress'), this.progressBar.progress.toString());
                else
                    newCaption = this.progressBar.progress + '%';
                this._progressFirstTime = true;
            }
            else {
                newCaption = getLocalization('Creating the document...', 'PreviewStringId.Msg_CreatingDocument');
            }
        }
        else if (parametersExist && !this.documentId) {
            newCaption = getLocalization('Waiting for parameter values...', 'PreviewStringId.Msg_WaitingForParameterValues');
        }
        else if (this.documentId) {
            this._progressFirstTime = false;
            if (this.pageIndex !== -1 && !this.progressBar.inProgress) {
                newCaption = getLocalization('Document is ready', 'ASPxReportsStringId.WebDocumentViewer_AriaDocumentReady');
            }
            else {
                newCaption = getLocalization('The document does not contain any pages.', 'PreviewStringId.Msg_EmptyDocument');
            }
        }
        else if (this.reportOpening) {
            this._progressFirstTime = false;
            newCaption = getLocalization('Loading...', 'AnalyticsCoreStringId.Loading');
        }
        else if (this.errorMessage) {
            newCaption = this.errorMessage;
        }
        this.emptyDocumentCaption = newCaption;
    }
}
__decorate([
    mutable(null)
], ReportPreview.prototype, "originalParametersInfo", void 0);
__decorate([
    mutable(null)
], ReportPreview.prototype, "exportOptionsModel", void 0);
__decorate([
    mutable('')
], ReportPreview.prototype, "errorMessage", void 0);
__decorate([
    mutable(false)
], ReportPreview.prototype, "reportOpening", void 0);
__decorate([
    mutable(false)
], ReportPreview.prototype, "exportDisabled", void 0);
__decorate([
    mutableArray(() => [])
], ReportPreview.prototype, "pages", void 0);
__decorate([
    mutable(-1)
], ReportPreview.prototype, "pageIndex", void 0);
__decorate([
    mutable(null)
], ReportPreview.prototype, "currentPage", void 0);
__decorate([
    mutable(false)
], ReportPreview.prototype, "showMultipagePreview", void 0);
__decorate([
    mutable(false)
], ReportPreview.prototype, "rtlReport", void 0);
__decorate([
    mutable(false)
], ReportPreview.prototype, "editingFieldsHighlighted", void 0);
__decorate([
    mutable(null)
], ReportPreview.prototype, "documentMap", void 0);
__decorate([
    mutable(false)
], ReportPreview.prototype, "pageLoading", void 0);
__decorate([
    mutable(ZoomAutoBy.WholePage)
], ReportPreview.prototype, "autoFitBy", void 0);
__decorate([
    mutable(1)
], ReportPreview.prototype, "originalZoom", void 0);
__decorate([
    mutable(ZoomAutoBy.WholePage)
], ReportPreview.prototype, "zoom", void 0);
__decorate([
    mutable(0)
], ReportPreview.prototype, "previewSize", void 0);
__decorate([
    mutable(null)
], ReportPreview.prototype, "documentId", void 0);
__decorate([
    mutable(null)
], ReportPreview.prototype, "reportId", void 0);
__decorate([
    mutable(null)
], ReportPreview.prototype, "reportUrl", void 0);
__decorate([
    mutable(false)
], ReportPreview.prototype, "documentBuilding", void 0);
__decorate([
    mutable('')
], ReportPreview.prototype, "_unifier", void 0);
__decorate([
    mutable(818)
], ReportPreview.prototype, "_pageWidth", void 0);
__decorate([
    mutable(1058)
], ReportPreview.prototype, "_pageHeight", void 0);
__decorate([
    mutable('')
], ReportPreview.prototype, "_pageBackColor", void 0);
__decorate([
    mutable('', { rateLimit: { timeout: 1000 } })
], ReportPreview.prototype, "emptyDocumentCaption", void 0);
__decorate([
    mutable(true)
], ReportPreview.prototype, "exportOptionsTabVisible", void 0);
__decorate([
    mutable(false)
], ReportPreview.prototype, "previewVisible", void 0);
__decorate([
    mutable(() => [])
], ReportPreview.prototype, "_editingFields", void 0);
__decorate([
    mutable(() => [])
], ReportPreview.prototype, "signatures", void 0);
