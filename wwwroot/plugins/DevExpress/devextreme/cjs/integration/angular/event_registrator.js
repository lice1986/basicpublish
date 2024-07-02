/**
 * DevExtreme (cjs/integration/angular/event_registrator.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _event_registrator_callbacks = _interopRequireDefault(require("../../events/core/event_registrator_callbacks"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _module = _interopRequireDefault(require("./module"));
var _angular = _interopRequireDefault(require("angular"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
if (_angular.default) {
    _event_registrator_callbacks.default.add((function(name) {
        const ngEventName = name.slice(0, 2) + name.charAt(2).toUpperCase() + name.slice(3);
        _module.default.directive(ngEventName, ["$parse", function($parse) {
            return function(scope, element, attr) {
                const attrValue = attr[ngEventName].trim();
                let handler;
                let eventOptions = {};
                if ("{" === attrValue.charAt(0)) {
                    eventOptions = scope.$eval(attrValue);
                    handler = $parse(eventOptions.execute)
                } else {
                    handler = $parse(attr[ngEventName])
                }
                _events_engine.default.on(element, name, eventOptions, (function(e) {
                    scope.$apply((function() {
                        handler(scope, {
                            $event: e
                        })
                    }))
                }))
            }
        }])
    }))
}
