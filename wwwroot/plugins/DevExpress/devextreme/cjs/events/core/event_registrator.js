/**
 * DevExtreme (cjs/events/core/event_registrator.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _iterator = require("../../core/utils/iterator");
var _event_registrator_callbacks = _interopRequireDefault(require("./event_registrator_callbacks"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const registerEvent = function(name, eventObject) {
    const strategy = {};
    if ("noBubble" in eventObject) {
        strategy.noBubble = eventObject.noBubble
    }
    if ("bindType" in eventObject) {
        strategy.bindType = eventObject.bindType
    }
    if ("delegateType" in eventObject) {
        strategy.delegateType = eventObject.delegateType
    }(0, _iterator.each)(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], (function(_, methodName) {
        if (!eventObject[methodName]) {
            return
        }
        strategy[methodName] = function() {
            const args = [].slice.call(arguments);
            args.unshift(this);
            return eventObject[methodName].apply(eventObject, args)
        }
    }));
    _event_registrator_callbacks.default.fire(name, strategy)
};
registerEvent.callbacks = _event_registrator_callbacks.default;
var _default = registerEvent;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
