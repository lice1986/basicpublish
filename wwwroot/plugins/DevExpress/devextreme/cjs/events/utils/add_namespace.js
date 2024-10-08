/**
 * DevExtreme (cjs/events/utils/add_namespace.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _errors = _interopRequireDefault(require("../../core/errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const addNamespace = (eventNames, namespace) => {
    if (!namespace) {
        throw _errors.default.Error("E0017")
    }
    if (Array.isArray(eventNames)) {
        return eventNames.map(eventName => addNamespace(eventName, namespace)).join(" ")
    }
    if (-1 !== eventNames.indexOf(" ")) {
        return addNamespace(eventNames.split(/\s+/g), namespace)
    }
    return "".concat(eventNames, ".").concat(namespace)
};
var _default = addNamespace;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
