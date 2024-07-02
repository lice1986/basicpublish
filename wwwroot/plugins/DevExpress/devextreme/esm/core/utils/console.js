/**
 * DevExtreme (esm/core/utils/console.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isFunction
} from "./type";
var noop = function() {};
var getConsoleMethod = function(method) {
    if ("undefined" === typeof console || !isFunction(console[method])) {
        return noop
    }
    return console[method].bind(console)
};
export var logger = {
    log: getConsoleMethod("log"),
    info: getConsoleMethod("info"),
    warn: getConsoleMethod("warn"),
    error: getConsoleMethod("error")
};
export var debug = function() {
    function assert(condition, message) {
        if (!condition) {
            throw new Error(message)
        }
    }
    return {
        assert: assert,
        assertParam: function(parameter, message) {
            assert(null !== parameter && void 0 !== parameter, message)
        }
    }
}();
