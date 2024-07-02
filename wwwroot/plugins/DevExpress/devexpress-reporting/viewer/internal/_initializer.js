﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_initializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { initGlobalize, koUtils, processErrorEvent, RequestHelper, resolveFromPromises, troubleshootingPageWrapper } from '@devexpress/analytics-core/analytics-internal-native';
import { currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
import { addCultureInfo, ajaxSetup, requestManager, TabPanel, fetchSetup, _isFetchConfigured } from '@devexpress/analytics-core/analytics-utils-native';
import config from 'devextreme/core/config';
import * as $ from 'jquery';
import { createFullscreenComputed, cultureInfo, processZoomFactor } from '../../common/utils/_utils';
import { PreviewElements } from '../constants';
import { DocumentMapModel } from '../documentMap/_documentMapModel';
import { ExportOptionsModel } from '../exportOptions/exportOptionsModel';
import { createMobilePreview } from '../mobile/utils/_mobileInitializer';
import { PreviewParameterHelper } from '../parameters/previewParameterHelper';
import { PreviewParametersViewModel } from '../parameters/previewParametersViewModel';
import { ReportPreview } from '../reportPreview';
import { SearchViewModel } from '../search/_searchViewModel';
import { AsyncExportApproach, EditablePreviewEnabled, ReportServerDownloadUri, ReportServerExportUri, ReportServerInvokeUri, SearchAvailable } from '../settings';
import { ActionLists, PreviewActions, PreviewDesignerActions } from './_actions';
import { PreviewModel } from './_previewModel';
import { PreviewRequestWrapper } from './_previewRequestWrapper';
import { getUpdateProgressBarCallback } from './_progressBarUtils';
import { updatePreviewContentSize } from './_sizeUtils';
import { BreadcrumbModel } from './_previewBreadcrumbs';
export function createDesktopPreview(bindingSettings) {
    processZoomFactor(bindingSettings.model.accessibilityCompliant);
    const enableKeyboardSupport = !!bindingSettings.model.accessibilityCompliant;
    const callbacks = bindingSettings.callbacks;
    const bindingModel = bindingSettings.model;
    const bindingElement = bindingSettings.element;
    const previewWrapper = new PreviewRequestWrapper(null, callbacks), breadcrumb = new BreadcrumbModel(), reportPreview = new ReportPreview(bindingModel.handlerUri, previewWrapper, undefined, callbacks, bindingModel.rtl, enableKeyboardSupport, bindingModel.exportSettings, bindingSettings.element, breadcrumb), searchModel = new SearchViewModel(reportPreview, bindingModel === null || bindingModel === void 0 ? void 0 : bindingModel.searchSettings, enableKeyboardSupport);
    const documentMapModel = new DocumentMapModel(reportPreview);
    const parametersModel = new PreviewParametersViewModel(reportPreview, new PreviewParameterHelper(bindingModel.parametersInfo && bindingModel.parametersInfo.knownEnums, bindingSettings.callbacks), enableKeyboardSupport);
    const exportModel = new ExportOptionsModel(reportPreview, enableKeyboardSupport);
    reportPreview.canSwitchToDesigner = !bindingModel.previewVisible;
    reportPreview.previewParametersViewModel = parametersModel;
    reportPreview.allowURLsWithJSContent = bindingModel.allowURLsWithJSContent;
    previewWrapper.initialize(reportPreview, parametersModel, searchModel);
    const tabPanel = new TabPanel({
        tabs: [
            parametersModel.tabInfo,
            exportModel.tabInfo,
            searchModel.tabInfo,
            documentMapModel.tabInfo
        ],
        width: 396,
        autoSelectTab: true,
        rtl: bindingModel.rtl
    });
    tabPanel.collapsed = true;
    const fullscreenEnabled = createFullscreenComputed(bindingElement, reportPreview);
    reportPreview.previewVisible = bindingModel.previewVisible;
    reportPreview.tabPanel = tabPanel;
    const previewActions = new PreviewActions(reportPreview);
    const designPreviewActions = new PreviewDesignerActions(reportPreview, fullscreenEnabled);
    const globalActionProviders = [previewActions, exportModel, searchModel, designPreviewActions];
    const actionLists = new ActionLists(reportPreview, globalActionProviders, callbacks && callbacks.customizeActions, () => reportPreview.previewVisible);
    const designerModelOptions = {
        rootStyle: 'dxrd-preview dxd-back-primary-invariant' + (reportPreview.canSwitchToDesigner ? ' dxrd-designer-preview' : ''),
        reportPreview: reportPreview,
        parametersModel: parametersModel,
        exportModel: exportModel,
        searchModel: searchModel,
        documentMapModel: documentMapModel,
        tabPanel: tabPanel,
        actionLists: actionLists,
        rtl: reportPreview.rtlViewer,
        accessibilityCompliant: bindingModel.accessibilityCompliant,
        breadcrumb: breadcrumb
    };
    const designerModel = new PreviewModel(designerModelOptions);
    designerModel.addDisposable(previewActions);
    designerModel.addDisposable(designPreviewActions);
    const designerViewModel = designerModel.getViewModel();
    designerModel.parts = [
        { id: PreviewElements.Toolbar, templateName: PreviewElements.Toolbar, model: designerViewModel.toolBar, viewModel: designerViewModel.toolBar },
        { id: PreviewElements.Surface, templateName: PreviewElements.Surface, model: designerModel.reportPreview, viewModel: designerViewModel.reportPreview },
        { id: PreviewElements.RightPanel, templateName: PreviewElements.RightPanel, model: designerModel, viewModel: designerViewModel.tabPanel },
        { id: PreviewElements.ExportTool, templateName: PreviewElements.ExportTool, model: designerModel.reportPreview.exportHandler, viewModel: designerViewModel.exportHandler },
        { id: PreviewElements.Breadcrumb, templateName: PreviewElements.Breadcrumb, model: designerViewModel.breadcrumb }
    ];
    callbacks && callbacks.customizeParts && callbacks.customizeParts(designerModel.parts);
    const $window = $.fn.constructor(window);
    const timers = [];
    let updateProgressPosition = getUpdateProgressBarCallback(bindingModel.progressBarSettings, designerModel, reportPreview, bindingElement, $window);
    let updatePreviewContentSize_ = updatePreviewContentSize(reportPreview, bindingElement, bindingModel.rtl);
    if (bindingModel.tabPanelSettings) {
        if (bindingModel.tabPanelSettings.width)
            tabPanel.width = parseInt(bindingModel.tabPanelSettings.width);
        if (bindingModel.tabPanelSettings.position)
            tabPanel.position = bindingModel.tabPanelSettings.position;
    }
    const updateSizesCallback = () => {
        updatePreviewContentSize_ && updatePreviewContentSize_(tabPanel.position);
        updateProgressPosition && updateProgressPosition();
    };
    breadcrumb.updatePreviewSize = updateSizesCallback;
    designerModel.updateSurfaceSize = updateSizesCallback;
    designerModel.resizeCallback = updateSizesCallback;
    window.addEventListener('resize', designerModel.resizeCallback);
    designerModel.addDisposable(fullscreenEnabled.subscribe(designerModel.resizeCallback));
    designerModel.addDisposable(tabPanel.events.on('widthChanged', (args) => {
        timers.push(setTimeout(() => updatePreviewContentSize_(tabPanel.position), 1));
    }), tabPanel.events.on('isEmptyChanged', (args) => {
        timers.push(setTimeout(() => updatePreviewContentSize_(tabPanel.position), 1));
    }), tabPanel.events.on('positionChanged', (args) => {
        updatePreviewContentSize_(tabPanel.position);
    }));
    updateSizesCallback();
    designerModel.addDisposable({
        dispose: () => {
            window.removeEventListener('resize', designerModel.resizeCallback);
            designerModel.updateSurfaceSize = null;
            designerModel.resizeCallback = null;
            timers.forEach(x => clearTimeout(x));
            updatePreviewContentSize_ = null;
            updateProgressPosition = null;
        }
    });
    return designerModel;
}
function _createPreview(bindingSettings) {
    var _a;
    const bindingModel = bindingSettings.model;
    bindingModel.previewVisible = bindingModel.previewVisible !== undefined ? bindingModel.previewVisible : true;
    bindingModel.allowURLsWithJSContent = bindingModel.allowURLsWithJSContent !== undefined ? bindingModel.allowURLsWithJSContent : false;
    bindingModel.accessibilityCompliant = bindingModel.accessibilityCompliant !== undefined ? bindingModel.accessibilityCompliant : false;
    bindingSettings.applyBindings = bindingSettings.applyBindings !== undefined ? bindingSettings.applyBindings : true;
    const disposableCallback = bindingSettings.callbacks && bindingSettings.callbacks.onServerError && processErrorEvent(bindingSettings.callbacks.onServerError);
    config({ rtlEnabled: !!bindingModel.rtl });
    if (bindingModel.remoteSettings && (bindingModel.remoteSettings.authToken || bindingModel.remoteSettings.serverUri)) {
        AsyncExportApproach(true);
        bindingModel.handlerUri = RequestHelper.generateUri(bindingModel.remoteSettings.serverUri, ReportServerInvokeUri);
        SearchAvailable(false);
        EditablePreviewEnabled(false);
        ReportServerDownloadUri(RequestHelper.generateUri(bindingModel.remoteSettings.serverUri, ReportServerExportUri));
        if (bindingModel.remoteSettings.authToken) {
            const headers = {
                'Authorization': `Bearer ${bindingModel.remoteSettings.authToken}`
            };
            const requestManagerSetup = {
                ajaxSetup,
                fetchSetup
            };
            const requestManagerInstance = requestManager.getInstance(requestManagerSetup);
            if (_isFetchConfigured()) {
                fetchSetup.fetchSettings.headers = Object.assign(Object.assign({}, fetchSetup.fetchSettings.headers), headers);
            }
            else {
                ajaxSetup.ajaxSettings.headers = Object.assign(Object.assign({}, ajaxSetup.ajaxSettings.headers), headers);
            }
        }
    }
    let designerModel;
    if (bindingModel.isMobile) {
        designerModel = createMobilePreview(bindingSettings);
    }
    else {
        designerModel = createDesktopPreview(bindingSettings);
    }
    if (bindingSettings.element && bindingSettings.applyBindings && !designerModel.reportPreview.canSwitchToDesigner) {
        ((_a = bindingSettings.callbacks) === null || _a === void 0 ? void 0 : _a.beforeRender) && bindingSettings.callbacks.beforeRender(designerModel);
        $.fn.constructor(bindingSettings.element).children().remove();
        currentMultiPlatformEngine.applyBindings(designerModel.getViewModel(), bindingSettings.element);
    }
    if (disposableCallback) {
        designerModel.addDisposable(disposableCallback);
    }
    return designerModel;
}
export function createPreview(bindingSettings) {
    if (bindingSettings.model && bindingSettings.model.localization) {
        addCultureInfo({
            messages: bindingSettings.model.localization
        });
    }
    const localizationCallbacks = [];
    bindingSettings.callbacks && bindingSettings.callbacks.customizeLocalization && bindingSettings.callbacks.customizeLocalization(localizationCallbacks);
    return resolveFromPromises(localizationCallbacks, () => {
        return troubleshootingPageWrapper(() => {
            return _createPreview(bindingSettings);
        }, bindingSettings.model.developmentMode, bindingSettings.element);
    });
}
export function createPreviewModel(viewerModel, element, callbacks, applyBindings) {
    initGlobalize(viewerModel);
    return createPreview({ model: viewerModel, element: element, callbacks: callbacks, applyBindings: applyBindings }).done(() => {
        $.extend(true, cultureInfo, viewerModel.cultureInfoList);
    });
}
export function initPreviewModel(previewModel, viewerModel) {
    if (viewerModel.reportId || viewerModel.documentId) {
        previewModel.reportPreview.initialize($.Deferred().resolve(viewerModel).promise());
    }
    else {
        const unwrappedUrl = koUtils.unwrap(viewerModel.reportUrl);
        if (unwrappedUrl) {
            previewModel.OpenReport(unwrappedUrl);
        }
    }
}
