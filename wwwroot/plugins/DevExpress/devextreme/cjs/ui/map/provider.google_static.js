/**
 * DevExtreme (cjs/ui/map/provider.google_static.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../core/utils/size");
var _iterator = require("../../core/utils/iterator");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _provider = _interopRequireDefault(require("./provider"));
var _color = _interopRequireDefault(require("../../color"));
var _click = require("../../events/click");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
let GOOGLE_STATIC_URL = "https://maps.google.com/maps/api/staticmap?";
const GoogleStaticProvider = _provider.default.inherit({
    _locationToString: function(location) {
        const latLng = this._getLatLng(location);
        return latLng ? latLng.lat + "," + latLng.lng : location.toString().replace(/ /g, "+")
    },
    _renderImpl: function() {
        return this._updateMap()
    },
    updateDimensions: function() {
        return this._updateMap()
    },
    updateMapType: function() {
        return this._updateMap()
    },
    updateBounds: function() {
        return Promise.resolve()
    },
    updateCenter: function() {
        return this._updateMap()
    },
    updateZoom: function() {
        return this._updateMap()
    },
    updateControls: function() {
        return Promise.resolve()
    },
    addMarkers: function(options) {
        const that = this;
        return this._updateMap().then((function(result) {
            (0, _iterator.each)(options, (function(_, options) {
                that._fireMarkerAddedAction({
                    options: options
                })
            }));
            return result
        }))
    },
    removeMarkers: function(options) {
        const that = this;
        return this._updateMap().then((function(result) {
            (0, _iterator.each)(options, (function(_, options) {
                that._fireMarkerRemovedAction({
                    options: options
                })
            }));
            return result
        }))
    },
    adjustViewport: function() {
        return Promise.resolve()
    },
    addRoutes: function(options) {
        const that = this;
        return this._updateMap().then((function(result) {
            (0, _iterator.each)(options, (function(_, options) {
                that._fireRouteAddedAction({
                    options: options
                })
            }));
            return result
        }))
    },
    removeRoutes: function(options) {
        const that = this;
        return this._updateMap().then((function(result) {
            (0, _iterator.each)(options, (function(_, options) {
                that._fireRouteRemovedAction({
                    options: options
                })
            }));
            return result
        }))
    },
    clean: function() {
        this._$container.css("backgroundImage", "none");
        _events_engine.default.off(this._$container, this._addEventNamespace(_click.name));
        return Promise.resolve()
    },
    mapRendered: function() {
        return true
    },
    _updateMap: function() {
        const key = this._keyOption("googleStatic");
        const $container = this._$container;
        const requestOptions = ["sensor=false", "size=" + Math.round((0, _size.getWidth)($container)) + "x" + Math.round((0, _size.getHeight)($container)), "maptype=" + this._option("type"), "center=" + this._locationToString(this._option("center")), "zoom=" + this._option("zoom"), this._markersSubstring()];
        requestOptions.push.apply(requestOptions, this._routeSubstrings());
        if (key) {
            requestOptions.push("key=" + key)
        }
        const request = GOOGLE_STATIC_URL + requestOptions.join("&");
        this._$container.css("background", 'url("' + request + '") no-repeat 0 0');
        this._attachClickEvent();
        return Promise.resolve(true)
    },
    _markersSubstring: function() {
        const that = this;
        const markers = [];
        const markerIcon = this._option("markerIconSrc");
        if (markerIcon) {
            markers.push("icon:" + markerIcon)
        }(0, _iterator.each)(this._option("markers"), (function(_, marker) {
            markers.push(that._locationToString(marker.location))
        }));
        return "markers=" + markers.join("|")
    },
    _routeSubstrings: function() {
        const that = this;
        const routes = [];
        (0, _iterator.each)(this._option("routes"), (function(_, route) {
            const color = new _color.default(route.color || that._defaultRouteColor()).toHex().replace("#", "0x");
            const opacity = Math.round(255 * (route.opacity || that._defaultRouteOpacity())).toString(16);
            const width = route.weight || that._defaultRouteWeight();
            const locations = [];
            (0, _iterator.each)(route.locations, (function(_, routePoint) {
                locations.push(that._locationToString(routePoint))
            }));
            routes.push("path=color:" + color + opacity + "|weight:" + width + "|" + locations.join("|"))
        }));
        return routes
    },
    _attachClickEvent: function() {
        const that = this;
        const eventName = this._addEventNamespace(_click.name);
        _events_engine.default.off(this._$container, eventName);
        _events_engine.default.on(this._$container, eventName, (function(e) {
            that._fireClickAction({
                event: e
            })
        }))
    }
});
var _default = GoogleStaticProvider;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
