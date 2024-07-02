/**
 * DevExtreme (cjs/viz/tree_map/colorizing.gradient.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _colorizing = require("./colorizing");
const _min = Math.min;
const _max = Math.max;

function createSimpleColorizer(getColor, range) {
    return function(node) {
        return getColor(node, range)
    }
}

function getRangeData(range) {
    return [Number(range[0]) || 0, range[1] - range[0] || 1]
}

function calculateRange(nodes, getValue) {
    let i;
    const ii = nodes.length;
    const codes = [];
    let code;
    for (i = 0; i < ii; ++i) {
        code = getValue(nodes[i]);
        if (isFinite(code)) {
            codes.push(code)
        }
    }
    return getRangeData([_min.apply(null, codes), _max.apply(null, codes)])
}

function createGuessingColorizer(getColor, getValue) {
    const ranges = {};
    return function(node) {
        const parent = node.parent;
        return getColor(node, ranges[parent._id] || (ranges[parent._id] = calculateRange(parent.nodes, getValue)))
    }
}

function gradientColorizer(options, themeManager) {
    const palette = themeManager.createGradientPalette(options.palette);
    const getValue = (0, _colorizing.createColorCodeGetter)(options);
    return "range" in options ? createSimpleColorizer(getColor, getRangeData(options.range || [])) : createGuessingColorizer(getColor, getValue);

    function getColor(node, arg) {
        return palette.getColor((getValue(node) - arg[0]) / arg[1])
    }
}(0, _colorizing.addColorizer)("gradient", gradientColorizer);
var _default = gradientColorizer;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
