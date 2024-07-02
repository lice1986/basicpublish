/**
 * DevExtreme (esm/core/utils/support.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import domAdapter from "../dom_adapter";
import callOnce from "./call_once";
import {
    getNavigator,
    hasProperty
} from "./window";
import devices from "../devices";
import {
    stylePropPrefix,
    styleProp
} from "./style";
var {
    maxTouchPoints: maxTouchPoints
} = getNavigator();
var transitionEndEventNames = {
    webkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd",
    transition: "transitionend"
};
var supportProp = function(prop) {
    return !!styleProp(prop)
};
var isNativeScrollingSupported = function() {
    var {
        platform: platform,
        mac: isMac
    } = devices.real();
    var isNativeScrollDevice = "ios" === platform || "android" === platform || isMac;
    return isNativeScrollDevice
};
var inputType = function(type) {
    if ("text" === type) {
        return true
    }
    var input = domAdapter.createElement("input");
    try {
        input.setAttribute("type", type);
        input.value = "wrongValue";
        return !input.value
    } catch (e) {
        return false
    }
};
var detectTouchEvents = function(hasWindowProperty, maxTouchPoints) {
    return (hasWindowProperty("ontouchstart") || !!maxTouchPoints) && !hasWindowProperty("callPhantom")
};
var detectPointerEvent = function(hasWindowProperty) {
    return hasWindowProperty("PointerEvent")
};
var touchEvents = detectTouchEvents(hasProperty, maxTouchPoints);
var pointerEvents = detectPointerEvent(hasProperty);
var touchPointersPresent = !!maxTouchPoints;
export {
    touchEvents,
    pointerEvents,
    styleProp,
    stylePropPrefix,
    supportProp,
    inputType
};
export var touch = touchEvents || pointerEvents && touchPointersPresent;
export var transition = callOnce((function() {
    return supportProp("transition")
}));
export var transitionEndEventName = callOnce((function() {
    return transitionEndEventNames[styleProp("transition")]
}));
export var animation = callOnce((function() {
    return supportProp("animation")
}));
export var nativeScrolling = isNativeScrollingSupported();
