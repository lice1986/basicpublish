﻿/**
* DevExpress Analytics (query-builder\binding\jsQueryBuilderBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { DxAnalyticsComponentCommon, JSDesignerBindingCommon } from '../../core/binding/_jsDesignerBindingCommon';
import { _wrapModelInObservable } from '../../core/utils/_utils.wrapModelInObservable';
import { addCultureInfo } from '../../property-grid/localization/localization_utils';
import { registerBaseBinding } from '../../property-grid/widgets/internal/_bindingsCache';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
import { createQueryBuilder, createQueryBuilderSurface } from '../_initializer';
import { EventGenerator } from './eventGenerator';
import { JSQueryBuilder } from './jsQueryBuilder';
import { troubleshootingPageWrapper } from '../../core/utils/_troubleshootingHelpers';
export class JSQueryBuilderBinding extends JSDesignerBindingCommon {
    constructor(options, customEventRaiser) {
        super(ko.unwrap(options), customEventRaiser);
        this.options = options;
        this._deferreds = [];
        this._templateHtml = getTemplate('dxrd-querybuilder');
        options.queryBuilderModel = _wrapModelInObservable(options.queryBuilderModel);
        this.sender = new JSQueryBuilder(options.queryBuilderModel);
        options.callbacks && options.callbacks._eventSenderCreated && options.callbacks._eventSenderCreated(this.sender);
    }
    _applyBindings(model, _$element) {
        troubleshootingPageWrapper(() => {
            this._disposables.push(model);
            _$element.children().remove();
            const child = _$element.append(this._templateHtml).children()[0];
            if (!child)
                return;
            ko.cleanNode(child);
            this._callbacks && this._callbacks.beforeRender && this._callbacks.beforeRender(model);
            ko.applyBindings(model, child);
            const updateSizeTimeout = setTimeout(() => {
                model && model.updateSurfaceSize();
            }, 1);
            this._disposables.push({ dispose: () => clearTimeout(updateSizeTimeout) });
        }, this.developmentMode, _$element);
    }
    _initializeCallbacks() {
        if (this._options.callbacks) {
            const queryBuilderEvents = EventGenerator.generateQueryBuilderEvents((eventName, args) => {
                this._fireEvent(eventName, args);
            });
            this._checkCallbackName(queryBuilderEvents);
            const availableEvents = this._generateCallbackDictionary(queryBuilderEvents);
            return availableEvents;
        }
    }
    _createModel(element) {
        this._callbacks = this._initializeCallbacks();
        return createQueryBuilder(element, this._options, this._callbacks, false);
    }
    dispose() {
        (this._deferreds || []).forEach((deferred) => {
            deferred.reject();
        });
        super.dispose();
    }
    applyBindings(element) {
        const _$element = $.fn.constructor(element);
        const requestOptions = this._options.requestOptions;
        const applyModel = () => {
            if (requestOptions && requestOptions.invokeAction) {
                this._options.handlerUri = this._getServerActionUrl(requestOptions.host, requestOptions.invokeAction);
            }
            this._deferreds.push(this._createModel(element)
                .done((queryBuilderModel) => {
                this.options.queryBuilderModel(queryBuilderModel);
                this.sender.queryBuilderModel = queryBuilderModel;
                this._createDisposeFunction(element);
                this._applyBindings(this.sender.queryBuilderModel, _$element);
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
const queryBuilderBindingName = 'dxQueryBuilder';
export class DxQueryBuilder extends DxAnalyticsComponentCommon {
    getBindingName() {
        return queryBuilderBindingName;
    }
}
registerBaseBinding(queryBuilderBindingName, '$data');
ko.bindingHandlers[queryBuilderBindingName] = {
    init: function (element, valueAccessor) {
        const values = ko.unwrap(valueAccessor());
        new JSQueryBuilderBinding(values || {}).applyBindings(element);
        return { controlsDescendantBindings: true };
    }
};
ko.bindingHandlers['dxQueryBuilderSurface'] = {
    init: function (element, valueAccessor) {
        const values = ko.unwrap(valueAccessor());
        const options = values.options;
        const templateHtml = getTemplate('dxrd-querybuilder'), $element = $.fn.constructor(element).append(templateHtml);
        const model = createQueryBuilderSurface($element.children()[0], options, values.creator);
        options.queryBuilderModel(model);
        return { controlsDescendantBindings: true };
    }
};