/**
 * DevExtreme (cjs/data/data_source/operation_manager.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _utils = require("./utils");
let OperationManager = function() {
    function OperationManager() {
        this._counter = -1;
        this._deferreds = {}
    }
    var _proto = OperationManager.prototype;
    _proto.add = function(deferred) {
        this._counter++;
        this._deferreds[this._counter] = deferred;
        return this._counter
    };
    _proto.remove = function(operationId) {
        return delete this._deferreds[operationId]
    };
    _proto.cancel = function(operationId) {
        if (operationId in this._deferreds) {
            this._deferreds[operationId].reject(_utils.CANCELED_TOKEN);
            return true
        }
        return false
    };
    _proto.cancelAll = function() {
        while (this._counter > -1) {
            this.cancel(this._counter);
            this._counter--
        }
    };
    return OperationManager
}();
exports.default = OperationManager;
module.exports = exports.default;
module.exports.default = exports.default;
