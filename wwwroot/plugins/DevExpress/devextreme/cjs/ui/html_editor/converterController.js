/**
 * DevExtreme (cjs/ui/html_editor/converterController.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
let ConverterController = function() {
    function ConverterController() {
        this._converters = {}
    }
    var _proto = ConverterController.prototype;
    _proto.addConverter = function(name, converter) {
        this._converters[name] = converter
    };
    _proto.getConverter = function(name) {
        return this._converters[name]
    };
    return ConverterController
}();
const controller = new ConverterController;
var _default = controller;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
