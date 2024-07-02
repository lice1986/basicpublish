﻿/**
* DevExpress Analytics (core\binding\_jsDesignerBindingCommon.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
import { addDisposeCallback } from '../../serializer/_internal';
import { Disposable } from '../../serializer/disposable';
import { _processError } from '../internal/_processError';
import { RequestHelper } from './_requestHelper';
import { troubleshootingPageWrapper } from '../utils/_troubleshootingHelpers';
import { currentMultiPlatformEngine } from '../../serializer/native/multiplatformEngine';
import { NotifyAboutWarning } from '../utils/_infoMessageHelpers';
export class JSDesignerBindingCommon extends Disposable {
    constructor(_options, _customEventRaiser) {
        super();
        this._options = _options;
        this._customEventRaiser = _customEventRaiser;
        this._templateHtml = getTemplate('dxrd-designer');
        this.developmentMode = _options.developmentMode;
    }
    dispose() {
        super.dispose();
        if (this.sender && this.sender instanceof Disposable)
            this.sender.dispose();
        this.removeProperties();
    }
    _fireEvent(eventName, args) {
        if (this._customEventRaiser) {
            this._customEventRaiser(eventName, args);
            return;
        }
        this._options && this._options.callbacks && this._options.callbacks[eventName] && this._options.callbacks[eventName](this.sender, args);
    }
    _warnForIncorrectCallbackName(publicName, privateName) {
        NotifyAboutWarning('The callback name must be different. Use "' + publicName + '" instead of "' + privateName + '" to call the function with the correct arguments.');
    }
    _checkCallbackName(availableEvents) {
        Object.keys(this._options.callbacks).forEach(callbackName => {
            availableEvents.forEach(event => {
                if (callbackName === event.privateName) {
                    this._warnForIncorrectCallbackName(event.publicName, callbackName);
                }
            });
        });
    }
    _getServerActionUrl(host, uri) {
        return RequestHelper.generateUri(host, uri);
    }
    _generateCallbackDictionary(eventsArray, prefix) {
        const events = JSDesignerBindingCommon.convertCallbackArrayToDictionary(eventsArray);
        const result = events;
        if (prefix && this._options.callbacks[prefix]) {
            Object.keys(events).forEach(propertyName => {
                result[propertyName] = this._options.callbacks[prefix][propertyName] || events[propertyName];
            });
        }
        else {
            Object.keys(events).forEach(propertyName => {
                result[propertyName] = this._options.callbacks[propertyName] || events[propertyName];
            });
        }
        return result;
    }
    _getLocalizationRequest() {
        const deferred = $.Deferred();
        const requestOptions = this._options.requestOptions;
        if (requestOptions.getLocalizationAction) {
            const actionUrl = this._getServerActionUrl(requestOptions.host, requestOptions.getLocalizationAction);
            $.getJSON(actionUrl)
                .fail(function (jqXHR, textStatus, errorThrown) {
                try {
                    _processError(errorThrown.message, $.Deferred(), jqXHR, textStatus);
                }
                finally {
                    deferred.reject();
                }
            }).done((localization) => {
                deferred.resolve(localization);
            });
        }
        else {
            deferred.resolve();
        }
        return deferred.promise();
    }
    _createDisposeFunction(element) {
        addDisposeCallback(element, () => {
            this.dispose();
        });
    }
    static convertCallbackArrayToDictionary(callbackArray) {
        const callbacks = {};
        callbackArray.forEach((event) => { callbacks[event['privateName']] = event['callback']; });
        return callbacks;
    }
}
export class DxAnalyticsComponentCommon {
    constructor(_element, _options) {
        this._element = _element;
        this._options = _options;
    }
    getBindingName() {
        return '';
    }
    render() {
        currentMultiPlatformEngine.cleanNode(this._element);
        this._element.setAttribute('data-bind', `${this.getBindingName()}: $data`);
        troubleshootingPageWrapper(() => currentMultiPlatformEngine.applyBindings(this._options, this._element), this._options.developmentMode, this._element);
    }
    dispose() {
        currentMultiPlatformEngine.cleanNode(this._element);
    }
}
