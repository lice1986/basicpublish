/**
 * DevExtreme (esm/viz/vector_map/projection.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    projection
} from "./projection.main";
var _min = Math.min;
var _max = Math.max;
var _sin = Math.sin;
var _asin = Math.asin;
var _tan = Math.tan;
var _atan = Math.atan;
var _exp = Math.exp;
var _log = Math.log;
var PI = Math.PI;
var PI_DIV_4 = PI / 4;
var GEO_LON_BOUND = 180;
var GEO_LAT_BOUND = 90;
var RADIANS = PI / 180;
var MERCATOR_LAT_BOUND = (2 * _atan(_exp(PI)) - PI / 2) / RADIANS;
var MILLER_LAT_BOUND = (2.5 * _atan(_exp(.8 * PI)) - .625 * PI) / RADIANS;

function clamp(value, threshold) {
    return _max(_min(value, +threshold), -threshold)
}
projection.add("mercator", projection({
    aspectRatio: 1,
    to: function(coordinates) {
        return [coordinates[0] / GEO_LON_BOUND, _log(_tan(PI_DIV_4 + clamp(coordinates[1], MERCATOR_LAT_BOUND) * RADIANS / 2)) / PI]
    },
    from: function(coordinates) {
        return [coordinates[0] * GEO_LON_BOUND, (2 * _atan(_exp(coordinates[1] * PI)) - PI / 2) / RADIANS]
    }
}));
projection.add("equirectangular", projection({
    aspectRatio: 2,
    to: function(coordinates) {
        return [coordinates[0] / GEO_LON_BOUND, coordinates[1] / GEO_LAT_BOUND]
    },
    from: function(coordinates) {
        return [coordinates[0] * GEO_LON_BOUND, coordinates[1] * GEO_LAT_BOUND]
    }
}));
projection.add("lambert", projection({
    aspectRatio: 2,
    to: function(coordinates) {
        return [coordinates[0] / GEO_LON_BOUND, _sin(clamp(coordinates[1], GEO_LAT_BOUND) * RADIANS)]
    },
    from: function(coordinates) {
        return [coordinates[0] * GEO_LON_BOUND, _asin(clamp(coordinates[1], 1)) / RADIANS]
    }
}));
projection.add("miller", projection({
    aspectRatio: 1,
    to: function(coordinates) {
        return [coordinates[0] / GEO_LON_BOUND, 1.25 * _log(_tan(PI_DIV_4 + clamp(coordinates[1], MILLER_LAT_BOUND) * RADIANS * .4)) / PI]
    },
    from: function(coordinates) {
        return [coordinates[0] * GEO_LON_BOUND, (2.5 * _atan(_exp(.8 * coordinates[1] * PI)) - .625 * PI) / RADIANS]
    }
}));
export {
    projection
};
