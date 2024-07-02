﻿/**
* DevExpress Analytics (core\internal\_fetchRequestManager.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as $ from 'jquery';
export class FetchRequestManager {
    constructor(fetchSettingsFn) {
        this._executeRequest = (method, url, body, params, abortControler) => {
            const responseDeferred = $.Deferred();
            const response = this._fetch(method, url, body, params, abortControler);
            response.then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const contentType = (_a = response.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.split(';')[0];
                if (contentType === 'application/json') {
                    try {
                        const json = yield response.json();
                        if (response.ok) {
                            responseDeferred.resolve(json, 'success', Object.assign(Object.assign({}, responseDeferred.promise()), { responseJSON: json }));
                        }
                        else {
                            responseDeferred.reject(Object.assign(Object.assign({}, responseDeferred.promise()), { responseJSON: json, statusText: json.statusText, status: response.status }), json.statusText);
                        }
                    }
                    catch (error) {
                        responseDeferred.reject(Object.assign(Object.assign({}, responseDeferred.promise()), { statusText: error.message, status: response.status }), error.message, error);
                    }
                }
                else if (response.ok && contentType) {
                    responseDeferred.resolve({ result: response, success: true });
                }
                else {
                    responseDeferred.reject(Object.assign(Object.assign({}, responseDeferred.promise()), { statusText: response.statusText, status: response.status }), response.statusText);
                }
            }), (error) => {
                responseDeferred.reject(Object.assign(Object.assign({}, responseDeferred.promise()), { statusText: error.message, status: 0 }), error.message);
            });
            return responseDeferred.promise();
        };
        this._fetch = (method, url, body, params, abortControler) => {
            const settings = {
                method,
                cache: params === null || params === void 0 ? void 0 : params.cache,
                headers: params === null || params === void 0 ? void 0 : params.headers,
                body,
                signal: abortControler === null || abortControler === void 0 ? void 0 : abortControler.signal
            };
            const fetchSettings = this.getFetchSettings();
            fetchSettings && fetchSettings.beforeSend && fetchSettings.beforeSend(settings);
            return fetch(url, settings);
        };
        this.useFetch = true;
        this.getFetchSettings = fetchSettingsFn || (() => ({}));
    }
    sendRequest(settings) {
        const { method, preparedUrl, body, params } = this._prepareParams(settings);
        return this._executeRequest(method, preparedUrl, body, params, settings.abortController);
    }
    _prepareParams(settings) {
        var _a;
        const GET = 'GET';
        const POST = 'POST';
        const method = settings.type;
        const data = settings.data;
        let preparedUrl = settings.url;
        let body = null;
        const cache = 'default';
        const queryParams = $.param(data);
        if (queryParams) {
            if (settings.type === GET) {
                preparedUrl.includes('?') ? preparedUrl += `&${queryParams}` : preparedUrl += `?${queryParams}`;
            }
            else if (settings.type === POST) {
                body = new URLSearchParams(queryParams);
            }
        }
        const params = {
            cache,
            headers: Object.assign(Object.assign({}, settings.headers), (_a = this.getFetchSettings()) === null || _a === void 0 ? void 0 : _a.headers)
        };
        return { method, preparedUrl, body, params };
    }
}
