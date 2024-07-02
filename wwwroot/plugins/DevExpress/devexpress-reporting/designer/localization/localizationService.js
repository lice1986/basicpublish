﻿/**
* DevExpress HTML/JS Reporting (designer\localization\localizationService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
class TranslationFactory {
    constructor() {
        this._services = {};
    }
    getFirstRegistered() {
        return findFirstItemMatchesCondition(Object.keys(this._services), (serviseKey) => this._services[serviseKey].onRequest !== undefined);
    }
    getTranslations(texts, destinationLanguage) {
        const $deferred = $.Deferred();
        $.when(...Object.keys(this._services).map((serviceName) => this.translate(serviceName, texts, destinationLanguage))).done((...results) => {
            $deferred.resolve([].concat.apply([], results));
        });
        return $deferred;
    }
    translate(name, texts, destinationLanguage) {
        if (!this._services[name])
            return;
        const $deferred = $.Deferred();
        $.ajax(this._services[name].onRequest(texts, destinationLanguage)).done((result) => {
            $deferred.resolve({ name, texts: this._services[name].onResponse(result) });
        }).fail(() => $deferred.reject());
        return $deferred.promise();
    }
    register(name, service) {
        this._services[name] = service;
    }
    unregister(name) {
        delete this._services[name];
    }
}
export const _translationFactory = new TranslationFactory();
export function registerTranslationService(name, service) {
    _translationFactory.register(name, service);
}
export function unregisterTranslationService(name) {
    _translationFactory.unregister(name);
}
