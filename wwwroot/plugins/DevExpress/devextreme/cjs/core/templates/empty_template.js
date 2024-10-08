/**
 * DevExtreme (cjs/core/templates/empty_template.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.EmptyTemplate = void 0;
var _renderer = _interopRequireDefault(require("../renderer"));
var _template_base = require("./template_base");

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
let EmptyTemplate = function(_TemplateBase) {
    _inheritsLoose(EmptyTemplate, _TemplateBase);

    function EmptyTemplate() {
        return _TemplateBase.apply(this, arguments) || this
    }
    var _proto = EmptyTemplate.prototype;
    _proto._renderCore = function() {
        return (0, _renderer.default)()
    };
    return EmptyTemplate
}(_template_base.TemplateBase);
exports.EmptyTemplate = EmptyTemplate;
