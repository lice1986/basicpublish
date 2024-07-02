/**
 * DevExtreme (cjs/ui/diagram/diagram.edges_option.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _diagram = _interopRequireDefault(require("./diagram.items_option"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
let EdgesOption = function(_ItemsOption) {
    _inheritsLoose(EdgesOption, _ItemsOption);

    function EdgesOption() {
        return _ItemsOption.apply(this, arguments) || this
    }
    var _proto = EdgesOption.prototype;
    _proto._getKeyExpr = function() {
        return this._diagramWidget._createOptionGetter("edges.keyExpr")
    };
    return EdgesOption
}(_diagram.default);
var _default = EdgesOption;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
