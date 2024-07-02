﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewerBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { JSDesignerBindingCommon, _wrapModelInObservable, troubleshootingPageWrapper, koUtils } from '@devexpress/analytics-core/analytics-internal-native';
import { addCultureInfo } from '@devexpress/analytics-core/analytics-utils-native';
import * as $ from 'jquery';
import { EventGenerator } from '../../common/binding/eventGenerator';
import { createPreviewModel, initPreviewModel } from '../internal/_initializer';
import { JSReportViewer } from './jsReportViewer';
import { currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
export class JSReportViewerBinding extends JSDesignerBindingCommon {
    constructor(_options, customEventRaiser, _shouldApplyBindings = true) {
        super(_options, customEventRaiser);
        this._shouldApplyBindings = _shouldApplyBindings;
        this._deferreds = [];
        _options.viewerModel = _wrapModelInObservable(_options.viewerModel);
        this.sender = new JSReportViewer(_options.viewerModel);
        this._closeReportOnDisposing = !_options.keepReportOnComponentDisposal;
        _options.callbacks && _options.callbacks._eventSenderCreated && _options.callbacks._eventSenderCreated(this.sender);
        this._callbacks = this._initializeCallbacks();
        this._callbacks && this._callbacks.onInitializing && this._callbacks.onInitializing();
    }
    dispose() {
        if (this._closeReportOnDisposing && this.sender && this.sender.Close)
            this.sender.Close();
        (this._deferreds || []).forEach((deferred) => {
            deferred.reject();
        });
        super.dispose();
    }
    _initializeCallbacks() {
        if (this._options.callbacks) {
            const previewEvents = EventGenerator.generatePreviewEvents((eventName, args) => {
                this._fireEvent(eventName, args);
            });
            this._checkCallbackName(previewEvents);
            const availablePreviewEvents = this._generateCallbackDictionary(previewEvents);
            return availablePreviewEvents;
        }
    }
    _applyBindings(model, _$element, shouldInitPreviewModel) {
        troubleshootingPageWrapper(() => {
            if (shouldInitPreviewModel) {
                this._callbacks && this._callbacks.beforeRender && this._callbacks.beforeRender(model);
                initPreviewModel(model, this._options);
            }
            this._disposables.push(model);
            if (this._shouldApplyBindings) {
                _$element.children().remove();
                const child = _$element.append(this._templateHtml).children()[0];
                if (!child)
                    return;
                currentMultiPlatformEngine.cleanNode(child);
                currentMultiPlatformEngine.applyBindings(model.getViewModel(), child);
            }
            this._fireEvent('Init');
        }, this.developmentMode, _$element);
    }
    _createModel(element) {
        return createPreviewModel(this._options, element, this._callbacks, false);
    }
    applyBindings(element) {
        const _$element = $.fn.constructor(element);
        _$element.addClass('dx-designer');
        if (this._options.reportPreview && this._options.parts) {
            this._applyBindings(this._options, _$element);
            return;
        }
        const requestOptions = this._options.requestOptions;
        const applyModel = () => {
            if (requestOptions && requestOptions.invokeAction) {
                this._options.handlerUri = this._getServerActionUrl(requestOptions.host, requestOptions.invokeAction);
            }
            this._deferreds.push(this._createModel(element)
                .done((previewModel) => {
                this.sender.previewModel = previewModel;
                if (this._options.reportUrl) {
                    if (koUtils.isSubscribable(this._options.reportUrl)) {
                        this._disposables.push(this._options.reportUrl.subscribe((newVal) => {
                            this.sender.OpenReport(newVal);
                        }));
                    }
                }
                if (this._shouldApplyBindings)
                    this._createDisposeFunction(element);
                this._applyBindings(this.sender.previewModel, _$element, true);
            }));
        };
        if (requestOptions) {
            this._getLocalizationRequest().done((localization) => {
                localization && addCultureInfo(localization);
            }).always(() => {
                applyModel();
            });
        }
        else {
            applyModel();
        }
    }
}
