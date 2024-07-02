/**
 * DevExtreme (cjs/ui/gantt/ui.gantt.cache.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GanttDataCache = void 0;
var _extend = require("../../core/utils/extend");
let GanttDataCache = function() {
    function GanttDataCache() {
        this._cache = {};
        this._timers = {}
    }
    var _proto = GanttDataCache.prototype;
    _proto.saveData = function(key, data, keyExpireCallback) {
        if (data) {
            this._clearTimer(key);
            const storage = this._getCache(key, true);
            (0, _extend.extendFromObject)(storage, data, true);
            if (keyExpireCallback) {
                this._setExpireTimer(key, keyExpireCallback)
            }
        }
    };
    _proto.pullDataFromCache = function(key, target) {
        const data = this._getCache(key);
        if (data) {
            (0, _extend.extendFromObject)(target, data)
        }
        this._onKeyExpired(key)
    };
    _proto.hasData = function(key) {
        return !!this._cache[key]
    };
    _proto.resetCache = function(key) {
        this._onKeyExpired(key)
    };
    _proto._getCache = function(key, forceCreate) {
        if (!this._cache[key] && forceCreate) {
            this._cache[key] = {}
        }
        return this._cache[key]
    };
    _proto._setExpireTimer = function(key, callback) {
        this._timers[key] = setTimeout(() => {
            callback(key, this._getCache(key));
            this._onKeyExpired(key)
        }, 200)
    };
    _proto._onKeyExpired = function(key) {
        this._clearCache(key);
        this._clearTimer(key)
    };
    _proto._clearCache = function(key) {
        delete this._cache[key]
    };
    _proto._clearTimer = function(key) {
        const timers = this._timers;
        if (timers && timers[key]) {
            clearTimeout(timers[key]);
            delete timers[key]
        }
    };
    return GanttDataCache
}();
exports.GanttDataCache = GanttDataCache;