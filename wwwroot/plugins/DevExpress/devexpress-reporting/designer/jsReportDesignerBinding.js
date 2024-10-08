﻿/**
* DevExpress HTML/JS Reporting (designer\jsReportDesignerBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addCultureInfo, ajaxSetup, fetchSetup, requestManager } from '@devexpress/analytics-core/analytics-utils';
import { DxAnalyticsComponentCommon, getLocalization, JSDesignerBindingCommon, resolveFromPromises, ShowMessage, _wrapModelInObservable, troubleshootingPageWrapper, assignTroubleshootingPage, useKoIntegration } from '@devexpress/analytics-core/analytics-internal';
import { registerBaseBinding } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { _setChartLimitation } from '../chart/_initializer';
import { EventGenerator } from '../common/binding/eventGenerator';
import { createReportDesignerFromModel } from './internal/_initializer';
import { limitation } from './internal/_settings';
import { JSReportDesigner } from './jsReportDesigner';
useKoIntegration();
export class JSReportDesignerBinding extends JSDesignerBindingCommon {
    constructor(_options, customEventRaiser) {
        super(_options, customEventRaiser);
        this._model = null;
        this._deferreds = [];
        limitation(_options.limitation);
        _setChartLimitation(limitation());
        _options.designerModel = _wrapModelInObservable(_options.designerModel);
        this.sender = new JSReportDesigner(_options.designerModel);
        this._initializationData = ko.isObservable(_options.initializationData)
            ? _options.initializationData
            : ko.observable(_options.initializationData);
        _options.callbacks && _options.callbacks._eventSenderCreated && _options.callbacks._eventSenderCreated(this.sender);
        this._callbacks = this._initializeCallbacks();
        this._callbacks && this._callbacks.designer.onInitializing && this._callbacks.designer.onInitializing();
    }
    _applyBindings(model, $element) {
        troubleshootingPageWrapper(() => {
            this.sender.designerModel = model;
            this._disposables.push(model);
            const childTemplate = !model ? $.fn.constructor('<div>') : this._templateHtml;
            $element.children().remove();
            const child = $element.append(childTemplate).children()[0];
            if (!child)
                return;
            ko.cleanNode(child);
            this._callbacks && this._callbacks.designer.beforeRender && this._callbacks.designer.beforeRender(model);
            ko.applyBindings(model, child);
            model.afterRender();
            this._fireEvent('Init');
            const updateSizeTimeout = setTimeout(() => {
                model && model.updateSurfaceSize();
            }, 1);
            this._disposables.push({ dispose: () => clearTimeout(updateSizeTimeout) });
        }, this.developmentMode, $element);
    }
    _initializeCallbacks() {
        if (this._options.callbacks) {
            const previewEvents = EventGenerator.generatePreviewEvents((eventName, args) => { this._fireEvent(eventName, args); }, 'Preview');
            const designerEvents = EventGenerator.generateDesignerEvents((eventName, args) => { this._fireEvent(eventName, args); });
            this._checkCallbackName(previewEvents);
            this._checkCallbackName(designerEvents);
            const availablePreviewEvents = this._generateCallbackDictionary(previewEvents, 'preview');
            const availableDesignerEvents = this._generateCallbackDictionary(designerEvents, 'designer');
            const availableEvents = {
                preview: availablePreviewEvents,
                designer: availableDesignerEvents
            };
            return availableEvents;
        }
    }
    _createModel(initData, element) {
        return createReportDesignerFromModel(initData, element, this._callbacks, false);
    }
    _showErrorInfo(jqXHR, getRequestDetails, errorThrown, element) {
        const messages = [];
        if (jqXHR && jqXHR.status)
            messages.push(jqXHR.status);
        if (errorThrown)
            messages.push(errorThrown);
        const helpLink = 'https://go.devexpress.com/Web_Reporting_Diagnostics_Tips.aspx';
        const consoleMessage = `Review the following help topic to diagnose a problem: '${helpLink}'.`;
        const clientMessage = getLocalization(`The page is blank because the Report Designer failed to load the report. Consult the developer for assistance.
            Use development mode for detailed information.`, 'ASPxReportsStringId.ReportDesigner_GetReportDesignerModel_Error');
        if (this.developmentMode) {
            assignTroubleshootingPage(element);
            console.log(consoleMessage);
            if (jqXHR && jqXHR.responseText)
                console.log(jqXHR.responseText);
        }
        else {
            ShowMessage(clientMessage);
        }
    }
    _getDesignerModelRequest(reportUrl, element) {
        const requestOptions = this._options.requestOptions;
        const getDesignerModelActionUrl = this._getServerActionUrl(requestOptions.host, requestOptions.getDesignerModelAction);
        const onError = (data, textStatus, jqXHR, getRequestDetails, errorThrown) => {
            this._showErrorInfo(jqXHR, getRequestDetails, errorThrown, element);
            if (this._callbacks && this._callbacks.designer && this._callbacks.designer.onServerError)
                this._callbacks.designer.onServerError({ jqXHR: jqXHR, textStatus: textStatus, data: data, getRequestDetails: getRequestDetails });
            if (errorThrown)
                throw errorThrown;
        };
        const requestManagerSetup = {
            ajaxSetup,
            fetchSetup
        };
        const getModel = requestManager.getInstance(requestManagerSetup).sendRequest({
            url: getDesignerModelActionUrl,
            type: 'POST',
            data: {
                reportUrl,
                designerModelSettings: this._options.designerModelSettings
            }
        });
        const _deferredModel = $.Deferred();
        this._deferreds.push(_deferredModel);
        getModel.done(_deferredModel.resolve).fail(_deferredModel.reject);
        _deferredModel.done((result, textStatus, jqXHR) => {
            if (result.error) {
                return onError(result, textStatus, jqXHR, () => ({ url: getDesignerModelActionUrl, data: { reportUrl } }), result.error);
            }
            result.handlerUri = this._getServerActionUrl(requestOptions.host, result.handlerUri);
            result.viewerHandlerUri = this._getServerActionUrl(requestOptions.host, result.viewerHandlerUri);
            result.queryBuilderHandlerUri = this._getServerActionUrl(requestOptions.host, result.queryBuilderHandlerUri);
            this._initializationData(result);
        }).fail((jqXHR, textStatus, errorThrown) => {
            if (!jqXHR && !errorThrown)
                return;
            const localizationPromises = [];
            this._callbacks && this._callbacks.designer && this._callbacks.designer.customizeLocalization && this._callbacks.designer.customizeLocalization(localizationPromises);
            resolveFromPromises(localizationPromises, () => {
                onError({ error: errorThrown }, textStatus, jqXHR, () => ({ url: getDesignerModelActionUrl, data: { reportUrl } }), errorThrown);
            });
        });
    }
    dispose() {
        (this._deferreds || []).forEach((deferred) => {
            deferred.reject();
        });
        super.dispose();
    }
    applyBindings(element) {
        const _$element = $.fn.constructor(element);
        _$element.addClass('dx-designer');
        this._createDisposeFunction(element);
        if (this._options.undoEngine) {
            this._applyBindings(this._options, _$element);
            return;
        }
        const applyBindingsFunc = (newData) => {
            this.developmentMode = this.developmentMode || newData.developmentMode;
            newData.developmentMode = this.developmentMode;
            troubleshootingPageWrapper(() => {
                if (this._model) {
                    this._disposables.splice(this._disposables.indexOf(this._model), 1);
                    ko.cleanNode(element.firstChild);
                    this._model.dispose();
                }
                this._createModel(newData, element).done((model) => {
                    this._model = model;
                    this._applyBindings(model, _$element);
                });
            }, this.developmentMode, _$element);
        };
        this._disposables.push(this._initializationData.subscribe((newVal) => {
            applyBindingsFunc(newVal);
        }));
        if (this._options.requestOptions) {
            this._getLocalizationRequest().done((localization) => {
                localization && addCultureInfo(localization);
            }).always(() => {
                if (this._options.requestOptions.getDesignerModelAction) {
                    if (ko.isSubscribable(this._options.reportUrl)) {
                        this._disposables.push(this._options.reportUrl.subscribe((newVal) => this._getDesignerModelRequest(newVal, _$element)));
                    }
                    this._getDesignerModelRequest(ko.unwrap(this._options.reportUrl), _$element);
                }
                else {
                    applyBindingsFunc(this._initializationData());
                }
            });
        }
        else {
            applyBindingsFunc(this._initializationData());
        }
    }
}
const dxReportDesignerBindingName = 'dxReportDesigner';
export class DxReportDesigner extends DxAnalyticsComponentCommon {
    getBindingName() {
        return dxReportDesignerBindingName;
    }
}
registerBaseBinding(dxReportDesignerBindingName, '$data');
ko.bindingHandlers[dxReportDesignerBindingName] = {
    init: function (element, valueAccessor) {
        new JSReportDesignerBinding(ko.unwrap(valueAccessor()) || {}).applyBindings(element);
        return { controlsDescendantBindings: true };
    }
};
