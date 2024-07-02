/**
 * DevExtreme (esm/viz/core/renderers/renderer.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../../core/renderer";
import domAdapter from "../../../core/dom_adapter";
import {
    getWindow
} from "../../../core/utils/window";
import callOnce from "../../../core/utils/call_once";
import eventsEngine from "../../../events/core/events_engine";
import {
    getSvgMarkup
} from "../../../core/utils/svg";
import {
    AnimationController
} from "./animation";
import {
    normalizeBBox,
    rotateBBox,
    normalizeEnum,
    normalizeArcParams,
    getNextDefsSvgId
} from "../utils";
import {
    isDefined
} from "../../../core/utils/type";
var window = getWindow();
var {
    max: max,
    round: round
} = Math;
var SHARPING_CORRECTION = .5;
var ARC_COORD_PREC = 5;
var LIGHTENING_HASH = "@filter::lightening";
var pxAddingExceptions = {
    "column-count": true,
    "fill-opacity": true,
    "flex-grow": true,
    "flex-shrink": true,
    "font-weight": true,
    "line-height": true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    "z-index": true,
    zoom: true
};
var KEY_TEXT = "text";
var KEY_STROKE = "stroke";
var KEY_STROKE_WIDTH = "stroke-width";
var KEY_STROKE_OPACITY = "stroke-opacity";
var KEY_FONT_SIZE = "font-size";
var KEY_FONT_STYLE = "font-style";
var KEY_FONT_WEIGHT = "font-weight";
var KEY_TEXT_DECORATION = "text-decoration";
var KEY_TEXTS_ALIGNMENT = "textsAlignment";
var NONE = "none";
var DEFAULT_FONT_SIZE = 12;
var ELLIPSIS = "...";
var objectCreate = function() {
    if (!Object.create) {
        return function(proto) {
            var F = function() {};
            F.prototype = proto;
            return new F
        }
    } else {
        return function(proto) {
            return Object.create(proto)
        }
    }
}();
var DEFAULTS = {
    scaleX: 1,
    scaleY: 1,
    "pointer-events": null
};
var getBackup = callOnce((function() {
    var backupContainer = domAdapter.createElement("div");
    backupContainer.style.left = "-9999px";
    backupContainer.style.position = "absolute";
    return {
        backupContainer: backupContainer,
        backupCounter: 0
    }
}));

function backupRoot(root) {
    if (0 === getBackup().backupCounter) {
        domAdapter.getBody().appendChild(getBackup().backupContainer)
    }++getBackup().backupCounter;
    root.append({
        element: getBackup().backupContainer
    })
}

function restoreRoot(root, container) {
    root.append({
        element: container
    });
    --getBackup().backupCounter;
    if (0 === getBackup().backupCounter) {
        domAdapter.getBody().removeChild(getBackup().backupContainer)
    }
}

function isObjectArgument(value) {
    return value && "string" !== typeof value
}

function createElement(tagName) {
    return domAdapter.createElementNS("http://www.w3.org/2000/svg", tagName)
}
export function getFuncIri(id, pathModified) {
    return null !== id ? "url(" + (pathModified ? window.location.href.split("#")[0] : "") + "#" + id + ")" : id
}

function extend(target, source) {
    var key;
    for (key in source) {
        target[key] = source[key]
    }
    return target
}
var preserveAspectRatioMap = {
    full: NONE,
    lefttop: "xMinYMin",
    leftcenter: "xMinYMid",
    leftbottom: "xMinYMax",
    centertop: "xMidYMin",
    center: "xMidYMid",
    centerbottom: "xMidYMax",
    righttop: "xMaxYMin",
    rightcenter: "xMaxYMid",
    rightbottom: "xMaxYMax"
};
export function processHatchingAttrs(element, attrs) {
    if (attrs.hatching && "none" !== normalizeEnum(attrs.hatching.direction)) {
        attrs = extend({}, attrs);
        attrs.fill = element._hatching = element.renderer.lockDefsElements({
            color: attrs.fill,
            hatching: attrs.hatching
        }, element._hatching, "pattern");
        delete attrs.filter
    } else if (element._hatching) {
        element.renderer.releaseDefsElements(element._hatching);
        element._hatching = null;
        delete attrs.filter
    } else if (attrs.filter) {
        attrs = extend({}, attrs);
        attrs.filter = element._filter = element.renderer.lockDefsElements({}, element._filter, "filter")
    } else if (element._filter) {
        element.renderer.releaseDefsElements(element._filter);
        element._filter = null
    }
    delete attrs.hatching;
    return attrs
}
var buildArcPath = function(x, y, innerR, outerR, startAngleCos, startAngleSin, endAngleCos, endAngleSin, isCircle, longFlag) {
    return ["M", (x + outerR * startAngleCos).toFixed(ARC_COORD_PREC), (y - outerR * startAngleSin).toFixed(ARC_COORD_PREC), "A", outerR.toFixed(ARC_COORD_PREC), outerR.toFixed(ARC_COORD_PREC), 0, longFlag, 0, (x + outerR * endAngleCos).toFixed(ARC_COORD_PREC), (y - outerR * endAngleSin).toFixed(ARC_COORD_PREC), isCircle ? "M" : "L", (x + innerR * endAngleCos).toFixed(5), (y - innerR * endAngleSin).toFixed(ARC_COORD_PREC), "A", innerR.toFixed(ARC_COORD_PREC), innerR.toFixed(ARC_COORD_PREC), 0, longFlag, 1, (x + innerR * startAngleCos).toFixed(ARC_COORD_PREC), (y - innerR * startAngleSin).toFixed(ARC_COORD_PREC), "Z"].join(" ")
};

function buildPathSegments(points, type) {
    var list = [
        ["M", 0, 0]
    ];
    switch (type) {
        case "line":
            list = buildLineSegments(points);
            break;
        case "area":
            list = buildLineSegments(points, true);
            break;
        case "bezier":
            list = buildCurveSegments(points);
            break;
        case "bezierarea":
            list = buildCurveSegments(points, true)
    }
    return list
}

function buildLineSegments(points, close) {
    return buildSegments(points, buildSimpleLineSegment, close)
}

function buildCurveSegments(points, close) {
    return buildSegments(points, buildSimpleCurveSegment, close)
}

function buildSegments(points, buildSimpleSegment, close) {
    var _points$;
    var i;
    var ii;
    var list = [];
    if (null !== (_points$ = points[0]) && void 0 !== _points$ && _points$.length) {
        for (i = 0, ii = points.length; i < ii; ++i) {
            buildSimpleSegment(points[i], close, list)
        }
    } else {
        buildSimpleSegment(points, close, list)
    }
    return list
}

function buildSimpleLineSegment(points, close, list) {
    var i = 0;
    var k0 = list.length;
    var k = k0;
    var ii = (points || []).length;
    if (ii) {
        if (void 0 !== points[0].x) {
            for (; i < ii;) {
                list[k++] = ["L", points[i].x, points[i++].y]
            }
        } else {
            for (; i < ii;) {
                list[k++] = ["L", points[i++], points[i++]]
            }
        }
        list[k0][0] = "M"
    } else {
        list[k] = ["M", 0, 0]
    }
    close && list.push(["Z"]);
    return list
}

function buildSimpleCurveSegment(points, close, list) {
    var i;
    var k = list.length;
    var ii = (points || []).length;
    if (ii) {
        if (void 0 !== points[0].x) {
            list[k++] = ["M", points[0].x, points[0].y];
            for (i = 1; i < ii;) {
                list[k++] = ["C", points[i].x, points[i++].y, points[i].x, points[i++].y, points[i].x, points[i++].y]
            }
        } else {
            list[k++] = ["M", points[0], points[1]];
            for (i = 2; i < ii;) {
                list[k++] = ["C", points[i++], points[i++], points[i++], points[i++], points[i++], points[i++]]
            }
        }
    } else {
        list[k] = ["M", 0, 0]
    }
    close && list.push(["Z"]);
    return list
}

function combinePathParam(segments) {
    var d = [];
    var k = 0;
    var i;
    var ii = segments.length;
    var segment;
    var j;
    var jj;
    for (i = 0; i < ii; ++i) {
        segment = segments[i];
        for (j = 0, jj = segment.length; j < jj; ++j) {
            d[k++] = segment[j]
        }
    }
    return d.join(" ")
}

function compensateSegments(oldSegments, newSegments, type) {
    var oldLength = oldSegments.length;
    var newLength = newSegments.length;
    var i;
    var originalNewSegments;
    var makeEqualSegments = -1 !== type.indexOf("area") ? makeEqualAreaSegments : makeEqualLineSegments;
    if (0 === oldLength) {
        for (i = 0; i < newLength; i++) {
            oldSegments.push(newSegments[i].slice(0))
        }
    } else if (oldLength < newLength) {
        makeEqualSegments(oldSegments, newSegments, type)
    } else if (oldLength > newLength) {
        originalNewSegments = newSegments.slice(0);
        makeEqualSegments(newSegments, oldSegments, type)
    }
    return originalNewSegments
}

function prepareConstSegment(constSeg, type) {
    var x = constSeg[constSeg.length - 2];
    var y = constSeg[constSeg.length - 1];
    switch (type) {
        case "line":
        case "area":
            constSeg[0] = "L";
            break;
        case "bezier":
        case "bezierarea":
            constSeg[0] = "C";
            constSeg[1] = constSeg[3] = constSeg[5] = x;
            constSeg[2] = constSeg[4] = constSeg[6] = y
    }
}

function makeEqualLineSegments(short, long, type) {
    var constSeg = short[short.length - 1].slice();
    var i = short.length;
    prepareConstSegment(constSeg, type);
    for (; i < long.length; i++) {
        short[i] = constSeg.slice(0)
    }
}

function makeEqualAreaSegments(short, long, type) {
    var i;
    var head;
    var shortLength = short.length;
    var longLength = long.length;
    var constsSeg1;
    var constsSeg2;
    if ((shortLength - 1) % 2 === 0 && (longLength - 1) % 2 === 0) {
        i = (shortLength - 1) / 2 - 1;
        head = short.slice(0, i + 1);
        constsSeg1 = head[head.length - 1].slice(0);
        constsSeg2 = short.slice(i + 1)[0].slice(0);
        prepareConstSegment(constsSeg1, type);
        prepareConstSegment(constsSeg2, type);
        for (var j = i; j < (longLength - 1) / 2 - 1; j++) {
            short.splice(j + 1, 0, constsSeg1);
            short.splice(j + 3, 0, constsSeg2)
        }
    }
}

function baseCss(that, styles) {
    var elemStyles = that._styles;
    var key;
    var value;
    styles = styles || {};
    for (key in styles) {
        value = styles[key];
        if (isDefined(value)) {
            value += "number" === typeof value && !pxAddingExceptions[key] ? "px" : "";
            elemStyles[key] = "" !== value ? value : null
        }
    }
    for (key in elemStyles) {
        value = elemStyles[key];
        if (value) {
            that.element.style[key] = value
        } else if (null === value) {
            that.element.style[key] = ""
        }
    }
    return that
}

function fixFuncIri(wrapper, attribute) {
    var element = wrapper.element;
    var id = wrapper.attr(attribute);
    if (id && -1 !== id.indexOf("DevExpress")) {
        element.removeAttribute(attribute);
        element.setAttribute(attribute, getFuncIri(id, wrapper.renderer.pathModified))
    }
}

function baseAttr(that, attrs) {
    attrs = attrs || {};
    var settings = that._settings;
    var attributes = {};
    var key;
    var value;
    var elem = that.element;
    var renderer = that.renderer;
    var rtl = renderer.rtl;
    var hasTransformations;
    var recalculateDashStyle;
    var sw;
    var i;
    if (!isObjectArgument(attrs)) {
        if (attrs in settings) {
            return settings[attrs]
        }
        if (attrs in DEFAULTS) {
            return DEFAULTS[attrs]
        }
        return 0
    }
    extend(attributes, attrs);
    for (key in attributes) {
        value = attributes[key];
        if (void 0 === value) {
            continue
        }
        settings[key] = value;
        if ("align" === key) {
            key = "text-anchor";
            value = {
                left: rtl ? "end" : "start",
                center: "middle",
                right: rtl ? "start" : "end"
            } [value] || null
        } else if ("dashStyle" === key) {
            recalculateDashStyle = true;
            continue
        } else if (key === KEY_STROKE_WIDTH) {
            recalculateDashStyle = true
        } else if (value && ("fill" === key || "clip-path" === key || "filter" === key) && 0 === value.indexOf("DevExpress")) {
            that._addFixIRICallback();
            value = getFuncIri(value, renderer.pathModified)
        } else if (/^(translate(X|Y)|rotate[XY]?|scale(X|Y)|sharp|sharpDirection)$/i.test(key)) {
            hasTransformations = true;
            continue
        } else if (/^(x|y|d)$/i.test(key)) {
            hasTransformations = true
        }
        if (null === value) {
            elem.removeAttribute(key)
        } else {
            elem.setAttribute(key, value)
        }
    }
    if (recalculateDashStyle && "dashStyle" in settings) {
        value = settings.dashStyle;
        sw = ("_originalSW" in that ? that._originalSW : settings[KEY_STROKE_WIDTH]) || 1;
        key = "stroke-dasharray";
        value = null === value ? "" : normalizeEnum(value);
        if ("" === value || "solid" === value || value === NONE) {
            that.element.removeAttribute(key)
        } else {
            value = value.replace(/longdash/g, "8,3,").replace(/dash/g, "4,3,").replace(/dot/g, "1,3,").replace(/,$/, "").split(",");
            i = value.length;
            while (i--) {
                value[i] = parseInt(value[i]) * sw
            }
            that.element.setAttribute(key, value.join(","))
        }
    }
    if (hasTransformations) {
        that._applyTransformation()
    }
    return that
}

function pathAttr(attrs) {
    var segments;
    if (isObjectArgument(attrs)) {
        attrs = extend({}, attrs);
        segments = attrs.segments;
        if ("points" in attrs) {
            segments = buildPathSegments(attrs.points, this.type);
            delete attrs.points
        }
        if (segments) {
            attrs.d = combinePathParam(segments);
            this.segments = segments;
            delete attrs.segments
        }
    }
    return baseAttr(this, attrs)
}

function arcAttr(attrs) {
    var settings = this._settings;
    var x;
    var y;
    var innerRadius;
    var outerRadius;
    var startAngle;
    var endAngle;
    if (isObjectArgument(attrs)) {
        attrs = extend({}, attrs);
        if ("x" in attrs || "y" in attrs || "innerRadius" in attrs || "outerRadius" in attrs || "startAngle" in attrs || "endAngle" in attrs) {
            settings.x = x = "x" in attrs ? attrs.x : settings.x;
            delete attrs.x;
            settings.y = y = "y" in attrs ? attrs.y : settings.y;
            delete attrs.y;
            settings.innerRadius = innerRadius = "innerRadius" in attrs ? attrs.innerRadius : settings.innerRadius;
            delete attrs.innerRadius;
            settings.outerRadius = outerRadius = "outerRadius" in attrs ? attrs.outerRadius : settings.outerRadius;
            delete attrs.outerRadius;
            settings.startAngle = startAngle = "startAngle" in attrs ? attrs.startAngle : settings.startAngle;
            delete attrs.startAngle;
            settings.endAngle = endAngle = "endAngle" in attrs ? attrs.endAngle : settings.endAngle;
            delete attrs.endAngle;
            attrs.d = buildArcPath.apply(null, normalizeArcParams(x, y, innerRadius, outerRadius, startAngle, endAngle))
        }
    }
    return baseAttr(this, attrs)
}

function rectAttr(attrs) {
    var x;
    var y;
    var width;
    var height;
    var sw;
    var maxSW;
    var newSW;
    if (isObjectArgument(attrs)) {
        attrs = extend({}, attrs);
        if (void 0 !== attrs.x || void 0 !== attrs.y || void 0 !== attrs.width || void 0 !== attrs.height || void 0 !== attrs[KEY_STROKE_WIDTH]) {
            void 0 !== attrs.x ? x = this._originalX = attrs.x : x = this._originalX || 0;
            void 0 !== attrs.y ? y = this._originalY = attrs.y : y = this._originalY || 0;
            void 0 !== attrs.width ? width = this._originalWidth = attrs.width : width = this._originalWidth || 0;
            void 0 !== attrs.height ? height = this._originalHeight = attrs.height : height = this._originalHeight || 0;
            void 0 !== attrs[KEY_STROKE_WIDTH] ? sw = this._originalSW = attrs[KEY_STROKE_WIDTH] : sw = this._originalSW;
            maxSW = ~~((width < height ? width : height) / 2);
            newSW = (sw || 0) < maxSW ? sw || 0 : maxSW;
            attrs.x = x + newSW / 2;
            attrs.y = y + newSW / 2;
            attrs.width = width - newSW;
            attrs.height = height - newSW;
            ((sw || 0) !== newSW || !(0 === newSW && void 0 === sw)) && (attrs[KEY_STROKE_WIDTH] = newSW)
        }
        if ("sharp" in attrs) {
            delete attrs.sharp
        }
    }
    return baseAttr(this, attrs)
}

function textAttr(attrs) {
    var isResetRequired;
    if (!isObjectArgument(attrs)) {
        return baseAttr(this, attrs)
    }
    attrs = extend({}, attrs);
    var settings = this._settings;
    var wasStroked = isDefined(settings[KEY_STROKE]) && isDefined(settings[KEY_STROKE_WIDTH]);
    if (void 0 !== attrs[KEY_TEXT]) {
        settings[KEY_TEXT] = attrs[KEY_TEXT];
        delete attrs[KEY_TEXT];
        isResetRequired = true
    }
    if (void 0 !== attrs[KEY_STROKE]) {
        settings[KEY_STROKE] = attrs[KEY_STROKE];
        delete attrs[KEY_STROKE]
    }
    if (void 0 !== attrs[KEY_STROKE_WIDTH]) {
        settings[KEY_STROKE_WIDTH] = attrs[KEY_STROKE_WIDTH];
        delete attrs[KEY_STROKE_WIDTH]
    }
    if (void 0 !== attrs[KEY_STROKE_OPACITY]) {
        settings[KEY_STROKE_OPACITY] = attrs[KEY_STROKE_OPACITY];
        delete attrs[KEY_STROKE_OPACITY]
    }
    if (void 0 !== attrs[KEY_TEXTS_ALIGNMENT]) {
        alignTextNodes(this, attrs[KEY_TEXTS_ALIGNMENT]);
        delete attrs[KEY_TEXTS_ALIGNMENT]
    }
    var isStroked = isDefined(settings[KEY_STROKE]) && isDefined(settings[KEY_STROKE_WIDTH]);
    baseAttr(this, attrs);
    isResetRequired = isResetRequired || isStroked !== wasStroked && settings[KEY_TEXT];
    if (isResetRequired) {
        createTextNodes(this, settings.text, isStroked);
        this._hasEllipsis = false
    }
    if (isResetRequired || void 0 !== attrs.x || void 0 !== attrs.y) {
        locateTextNodes(this)
    }
    if (isStroked) {
        strokeTextNodes(this)
    }
    return this
}

function textCss(styles) {
    styles = styles || {};
    baseCss(this, styles);
    if (KEY_FONT_SIZE in styles) {
        locateTextNodes(this)
    }
    return this
}

function orderHtmlTree(list, line, node, parentStyle, parentClassName) {
    var style;
    var realStyle;
    var i;
    var ii;
    var nodes;
    if (void 0 !== node.wholeText) {
        list.push({
            value: node.wholeText,
            style: parentStyle,
            className: parentClassName,
            line: line,
            height: parentStyle[KEY_FONT_SIZE] || 0
        })
    } else if ("BR" === node.tagName) {
        ++line
    } else if (domAdapter.isElementNode(node)) {
        extend(style = {}, parentStyle);
        switch (node.tagName) {
            case "B":
            case "STRONG":
                style[KEY_FONT_WEIGHT] = "bold";
                break;
            case "I":
            case "EM":
                style[KEY_FONT_STYLE] = "italic";
                break;
            case "U":
                style[KEY_TEXT_DECORATION] = "underline"
        }
        realStyle = node.style;
        realStyle.color && (style.fill = realStyle.color);
        realStyle.fontSize && (style[KEY_FONT_SIZE] = realStyle.fontSize);
        realStyle.fontStyle && (style[KEY_FONT_STYLE] = realStyle.fontStyle);
        realStyle.fontWeight && (style[KEY_FONT_WEIGHT] = realStyle.fontWeight);
        realStyle.textDecoration && (style[KEY_TEXT_DECORATION] = realStyle.textDecoration);
        for (i = 0, nodes = node.childNodes, ii = nodes.length; i < ii; ++i) {
            line = orderHtmlTree(list, line, nodes[i], style, node.className || parentClassName)
        }
    }
    return line
}

function adjustLineHeights(items) {
    var i;
    var ii;
    var currentItem = items[0];
    var item;
    for (i = 1, ii = items.length; i < ii; ++i) {
        item = items[i];
        if (item.line === currentItem.line) {
            currentItem.height = maxLengthFontSize(currentItem.height, item.height);
            currentItem.inherits = currentItem.inherits || 0 === parseFloat(item.height);
            item.height = NaN
        } else {
            currentItem = item
        }
    }
}

function removeExtraAttrs(html) {
    var findStyleAndClassAttrs = /(style|class)\s*=\s*(["'])(?:(?!\2).)*\2\s?/gi;
    return html.replace(/(?:(<[a-z0-9]+\s*))([\s\S]*?)(>|\/>)/gi, (function(allTagAttrs, p1, p2, p3) {
        p2 = (p2 && p2.match(findStyleAndClassAttrs) || []).map((function(str) {
            return str
        })).join(" ");
        return p1 + p2 + p3
    }))
}

function parseHTML(text) {
    var items = [];
    var div = domAdapter.createElement("div");
    div.innerHTML = text.replace(/\r/g, "").replace(/\n/g, "<br/>").replace(/style=/g, "data-style=");
    div.querySelectorAll("[data-style]").forEach(element => {
        element.style = element.getAttribute("data-style");
        element.removeAttribute("data-style")
    });
    orderHtmlTree(items, 0, div, {}, "");
    adjustLineHeights(items);
    return items
}

function parseMultiline(text) {
    var texts = text.replace(/\r/g, "").split(/\n/g);
    var i = 0;
    var items = [];
    for (; i < texts.length; i++) {
        items.push({
            value: texts[i].trim(),
            height: 0,
            line: i
        })
    }
    return items
}

function createTspans(items, element, fieldName) {
    var i;
    var ii;
    var item;
    for (i = 0, ii = items.length; i < ii; ++i) {
        item = items[i];
        item[fieldName] = createElement("tspan");
        item[fieldName].appendChild(domAdapter.createTextNode(item.value));
        item.style && baseCss({
            element: item[fieldName],
            _styles: {}
        }, item.style);
        item.className && item[fieldName].setAttribute("class", item.className);
        element.appendChild(item[fieldName])
    }
}

function restoreText() {
    if (this._hasEllipsis) {
        this.attr({
            text: this._settings.text
        })
    }
}

function applyEllipsis(maxWidth) {
    var lines;
    var hasEllipsis = false;
    var i;
    var ii;
    var lineParts;
    var j;
    var jj;
    var text;
    restoreText.call(this);
    var ellipsis = this.renderer.text(ELLIPSIS).attr(this._styles).append(this.renderer.root);
    var ellipsisWidth = ellipsis.getBBox().width;
    if (this._getElementBBox().width > maxWidth) {
        if (maxWidth - ellipsisWidth < 0) {
            maxWidth = 0
        } else {
            maxWidth -= ellipsisWidth
        }
        lines = prepareLines(this.element, this._texts, maxWidth);
        for (i = 0, ii = lines.length; i < ii; ++i) {
            lineParts = lines[i].parts;
            if (1 === lines[i].commonLength) {
                continue
            }
            for (j = 0, jj = lineParts.length; j < jj; ++j) {
                text = lineParts[j];
                if (isDefined(text.endIndex)) {
                    setNewText(text, text.endIndex);
                    hasEllipsis = true
                } else if (text.startBox > maxWidth) {
                    removeTextSpan(text)
                }
            }
        }
    }
    ellipsis.remove();
    this._hasEllipsis = hasEllipsis;
    return hasEllipsis
}

function cloneAndRemoveAttrs(node) {
    var clone;
    if (node) {
        clone = node.cloneNode();
        clone.removeAttribute("y");
        clone.removeAttribute("x")
    }
    return clone || node
}

function detachTitleElements(element) {
    var titleElements = domAdapter.querySelectorAll(element, "title");
    for (var i = 0; i < titleElements.length; i++) {
        element.removeChild(titleElements[i])
    }
    return titleElements
}

function detachAndStoreTitleElements(element) {
    var titleElements = detachTitleElements(element);
    return () => {
        for (var i = 0; i < titleElements.length; i++) {
            element.appendChild(titleElements[i])
        }
    }
}

function setMaxSize(maxWidth, maxHeight) {
    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var that = this;
    var lines = [];
    var textChanged = false;
    var textIsEmpty = false;
    var ellipsisMaxWidth = maxWidth;
    restoreText.call(that);
    var restoreTitleElement = detachAndStoreTitleElements(this.element);
    var ellipsis = that.renderer.text(ELLIPSIS).attr(that._styles).append(that.renderer.root);
    var ellipsisWidth = ellipsis.getBBox().width;
    var {
        width: width,
        height: height
    } = that._getElementBBox();
    if ((width || height) && (width > maxWidth || maxHeight && height > maxHeight)) {
        if (maxWidth - ellipsisWidth < 0) {
            ellipsisMaxWidth = 0
        } else {
            ellipsisMaxWidth -= ellipsisWidth
        }
        lines = applyOverflowRules(that.element, that._texts, maxWidth, ellipsisMaxWidth, options);
        lines = setMaxHeight(lines, ellipsisMaxWidth, options, maxHeight, parseFloat(this._getLineHeight()));
        this._texts = lines.reduce((texts, line) => texts.concat(line.parts), []).filter(t => "" !== t.value).map(t => {
            t.stroke && t.tspan.parentNode.appendChild(t.stroke);
            return t
        }).map(t => {
            t.tspan.parentNode.appendChild(t.tspan);
            return t
        });
        !this._texts.length && (this._texts = null);
        textChanged = true;
        if (this._texts) {
            locateTextNodes(this)
        } else {
            this.element.textContent = "";
            textIsEmpty = true
        }
    }
    ellipsis.remove();
    that._hasEllipsis = textChanged;
    restoreTitleElement();
    return {
        rowCount: lines.length,
        textChanged: textChanged,
        textIsEmpty: textIsEmpty
    }
}

function getIndexForEllipsis(text, maxWidth, startBox, endBox) {
    var k;
    var kk;
    if (startBox <= maxWidth && endBox > maxWidth) {
        for (k = 1, kk = text.value.length; k <= kk; ++k) {
            if (startBox + text.tspan.getSubStringLength(0, k) > maxWidth) {
                return k - 1
            }
        }
    }
}

function getTextWidth(text) {
    return text.value.length ? text.tspan.getSubStringLength(0, text.value.length) : 0
}

function prepareLines(element, texts, maxWidth) {
    var lines = [];
    var i;
    var ii;
    var text;
    var startBox;
    var endBox;
    if (texts) {
        for (i = 0, ii = texts.length; i < ii; ++i) {
            text = texts[i];
            if (!lines[text.line]) {
                text.startBox = startBox = 0;
                lines.push({
                    commonLength: text.value.length,
                    parts: [text]
                })
            } else {
                text.startBox = startBox;
                lines[text.line].parts.push(text);
                lines[text.line].commonLength += text.value.length
            }
            endBox = startBox + text.tspan.getSubStringLength(0, text.value.length);
            text.endIndex = getIndexForEllipsis(text, maxWidth, startBox, endBox);
            startBox = endBox
        }
    } else {
        text = {
            value: element.textContent,
            tspan: element
        };
        text.startBox = startBox = 0;
        endBox = startBox + getTextWidth(text);
        text.endIndex = getIndexForEllipsis(text, maxWidth, startBox, endBox);
        lines = [{
            commonLength: element.textContent.length,
            parts: [text]
        }]
    }
    return lines
}

function getSpaceBreakIndex(text, maxWidth) {
    var initialIndices = text.startBox > 0 ? [0] : [];
    var spaceIndices = text.value.split("").reduce((indices, char, index) => {
        if (" " === char) {
            indices.push(index)
        }
        return indices
    }, initialIndices);
    var spaceIndex = 0;
    while (void 0 !== spaceIndices[spaceIndex + 1] && text.startBox + text.tspan.getSubStringLength(0, spaceIndices[spaceIndex + 1]) < maxWidth) {
        spaceIndex++
    }
    return spaceIndices[spaceIndex]
}

function getWordBreakIndex(text, maxWidth) {
    for (var i = 0; i < text.value.length - 1; i++) {
        if (text.startBox + text.tspan.getSubStringLength(0, i + 1) > maxWidth) {
            return i
        }
    }
}

function getEllipsisString(ellipsisMaxWidth, _ref) {
    var {
        hideOverflowEllipsis: hideOverflowEllipsis
    } = _ref;
    return hideOverflowEllipsis && 0 === ellipsisMaxWidth ? "" : ELLIPSIS
}

function setEllipsis(text, ellipsisMaxWidth, options) {
    var ellipsis = getEllipsisString(ellipsisMaxWidth, options);
    if (text.value.length && text.tspan.parentNode) {
        for (var i = text.value.length - 1; i >= 1; i--) {
            if (text.startBox + text.tspan.getSubStringLength(0, i) < ellipsisMaxWidth) {
                setNewText(text, i, ellipsis);
                break
            } else if (1 === i) {
                setNewText(text, 0, ellipsis)
            }
        }
    }
}

function wordWrap(text, maxWidth, ellipsisMaxWidth, options, lastStepBreakIndex) {
    var wholeText = text.value;
    var breakIndex;
    if ("none" !== options.wordWrap) {
        breakIndex = "normal" === options.wordWrap ? getSpaceBreakIndex(text, maxWidth) : getWordBreakIndex(text, maxWidth)
    }
    var restLines = [];
    var restText;
    if (isFinite(breakIndex) && !(0 === lastStepBreakIndex && 0 === breakIndex)) {
        setNewText(text, breakIndex, "");
        var newTextOffset = " " === wholeText[breakIndex] ? 1 : 0;
        var restString = wholeText.slice(breakIndex + newTextOffset);
        if (restString.length) {
            var restTspan = cloneAndRemoveAttrs(text.tspan);
            restTspan.textContent = restString;
            text.tspan.parentNode.appendChild(restTspan);
            restText = extend(extend({}, text), {
                value: restString,
                startBox: 0,
                height: 0,
                tspan: restTspan,
                stroke: cloneAndRemoveAttrs(text.stroke),
                endBox: restTspan.getSubStringLength(0, restString.length)
            });
            restText.stroke && (restText.stroke.textContent = restString);
            if (restText.endBox > maxWidth) {
                restLines = wordWrap(restText, maxWidth, ellipsisMaxWidth, options, breakIndex);
                if (!restLines.length) {
                    return []
                }
            }
        }
    }
    if (text.value.length) {
        if ("ellipsis" === options.textOverflow && text.tspan.getSubStringLength(0, text.value.length) > maxWidth) {
            setEllipsis(text, ellipsisMaxWidth, options)
        }
        if ("hide" === options.textOverflow && text.tspan.getSubStringLength(0, text.value.length) > maxWidth) {
            return []
        }
    } else {
        text.tspan.parentNode.removeChild(text.tspan)
    }
    var parts = [];
    if (restText) {
        parts.push(restText)
    }
    return [{
        commonLength: wholeText.length,
        parts: parts
    }].concat(restLines)
}

function calculateLineHeight(line, lineHeight) {
    return line.parts.reduce((height, text) => max(height, getItemLineHeight(text, lineHeight)), 0)
}

function setMaxHeight(lines, ellipsisMaxWidth, options, maxHeight, lineHeight) {
    var textOverflow = options.textOverflow;
    if (!isFinite(maxHeight) || 0 === Number(maxHeight) || "none" === textOverflow) {
        return lines
    }
    var result = lines.reduce((_ref2, l, index, arr) => {
        var [lines, commonHeight] = _ref2;
        var height = calculateLineHeight(l, lineHeight);
        commonHeight += height;
        if (commonHeight < maxHeight) {
            lines.push(l)
        } else {
            l.parts.forEach(item => {
                removeTextSpan(item)
            });
            if ("ellipsis" === textOverflow) {
                var prevLine = arr[index - 1];
                if (prevLine) {
                    var text = prevLine.parts[prevLine.parts.length - 1];
                    if (!text.hasEllipsis) {
                        if (0 === ellipsisMaxWidth || text.endBox < ellipsisMaxWidth) {
                            setNewText(text, text.value.length, getEllipsisString(ellipsisMaxWidth, options))
                        } else {
                            setEllipsis(text, ellipsisMaxWidth, options)
                        }
                    }
                }
            }
        }
        return [lines, commonHeight]
    }, [
        [], 0
    ]);
    if ("hide" === textOverflow && result[1] > maxHeight) {
        result[0].forEach(l => {
            l.parts.forEach(item => {
                removeTextSpan(item)
            })
        });
        return []
    }
    return result[0]
}

function applyOverflowRules(element, texts, maxWidth, ellipsisMaxWidth, options) {
    if (!texts) {
        var textValue = element.textContent;
        var text = {
            value: textValue,
            height: 0,
            line: 0
        };
        element.textContent = "";
        createTspans([text], element, "tspan");
        texts = [text]
    }
    return texts.reduce((_ref3, text) => {
        var [lines, startBox, endBox, stop, lineNumber] = _ref3;
        var line = lines[lines.length - 1];
        if (stop) {
            return [lines, startBox, endBox, stop]
        }
        if (!line || text.line !== lineNumber) {
            text.startBox = startBox = 0;
            lines.push({
                commonLength: text.value.length,
                parts: [text]
            })
        } else {
            text.startBox = startBox;
            if (startBox > ellipsisMaxWidth && "none" === options.wordWrap && "ellipsis" === options.textOverflow) {
                removeTextSpan(text);
                return [lines, startBox, endBox, stop, lineNumber]
            }
            line.parts.push(text);
            line.commonLength += text.value.length
        }
        text.endBox = endBox = startBox + getTextWidth(text);
        startBox = endBox;
        if (isDefined(maxWidth) && endBox > maxWidth) {
            var wordWrapLines = wordWrap(text, maxWidth, ellipsisMaxWidth, options);
            if (!wordWrapLines.length) {
                lines = [];
                stop = true
            } else {
                lines = lines.concat(wordWrapLines.filter(l => l.parts.length > 0))
            }
        }
        return [lines, startBox, endBox, stop, text.line]
    }, [
        [], 0, 0, false, 0
    ])[0]
}

function setNewText(text, index) {
    var insertString = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ELLIPSIS;
    var newText = text.value.substr(0, index) + insertString;
    text.value = text.tspan.textContent = newText;
    text.stroke && (text.stroke.textContent = newText);
    if (insertString === ELLIPSIS) {
        text.hasEllipsis = true
    }
}

function removeTextSpan(text) {
    text.tspan.parentNode && text.tspan.parentNode.removeChild(text.tspan);
    text.stroke && text.stroke.parentNode && text.stroke.parentNode.removeChild(text.stroke)
}

function createTextNodes(wrapper, text, isStroked) {
    var items;
    var parsedHtml;
    wrapper._texts = null;
    wrapper.clear();
    if (null === text) {
        return
    }
    text = "" + text;
    if (!wrapper.renderer.encodeHtml && (/<[a-z][\s\S]*>/i.test(text) || -1 !== text.indexOf("&"))) {
        parsedHtml = removeExtraAttrs(text);
        items = parseHTML(parsedHtml)
    } else if (/\n/g.test(text)) {
        items = parseMultiline(text)
    } else if (isStroked) {
        items = [{
            value: text.trim(),
            height: 0
        }]
    }
    if (items) {
        if (items.length) {
            wrapper._texts = items;
            if (isStroked) {
                createTspans(items, wrapper.element, KEY_STROKE)
            }
            createTspans(items, wrapper.element, "tspan")
        }
    } else {
        wrapper.element.appendChild(domAdapter.createTextNode(text))
    }
}

function setTextNodeAttribute(item, name, value) {
    item.tspan.setAttribute(name, value);
    item.stroke && item.stroke.setAttribute(name, value)
}

function getItemLineHeight(item, defaultValue) {
    return item.inherits ? maxLengthFontSize(item.height, defaultValue) : item.height || defaultValue
}

function locateTextNodes(wrapper) {
    if (!wrapper._texts) {
        return
    }
    var items = wrapper._texts;
    var x = wrapper._settings.x;
    var lineHeight = wrapper._getLineHeight();
    var i;
    var ii;
    var item = items[0];
    setTextNodeAttribute(item, "x", x);
    setTextNodeAttribute(item, "y", wrapper._settings.y);
    for (i = 1, ii = items.length; i < ii; ++i) {
        item = items[i];
        if (parseFloat(item.height) >= 0) {
            setTextNodeAttribute(item, "x", x);
            var height = getItemLineHeight(item, lineHeight);
            setTextNodeAttribute(item, "dy", height)
        }
    }
}

function alignTextNodes(wrapper, alignment) {
    if (!wrapper._texts || "center" === alignment) {
        return
    }
    var items = wrapper._texts;
    var direction = "left" === alignment ? -1 : 1;
    var maxTextWidth = Math.max.apply(Math, items.map(t => getTextWidth(t)));
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var textWidth = getTextWidth(item);
        if (0 !== maxTextWidth && maxTextWidth !== textWidth) {
            setTextNodeAttribute(item, "dx", direction * round((maxTextWidth - textWidth) / 2 * 10) / 10)
        }
    }
}

function maxLengthFontSize(fontSize1, fontSize2) {
    var parsedHeight1 = parseFloat(fontSize1);
    var parsedHeight2 = parseFloat(fontSize2);
    var height1 = parsedHeight1 || DEFAULT_FONT_SIZE;
    var height2 = parsedHeight2 || DEFAULT_FONT_SIZE;
    return height1 > height2 ? !isNaN(parsedHeight1) ? fontSize1 : height1 : !isNaN(parsedHeight2) ? fontSize2 : height2
}

function strokeTextNodes(wrapper) {
    if (!wrapper._texts) {
        return
    }
    var items = wrapper._texts;
    var stroke = wrapper._settings[KEY_STROKE];
    var strokeWidth = wrapper._settings[KEY_STROKE_WIDTH];
    var strokeOpacity = wrapper._settings[KEY_STROKE_OPACITY] || 1;
    var tspan;
    var i;
    var ii;
    for (i = 0, ii = items.length; i < ii; ++i) {
        tspan = items[i].stroke;
        tspan.setAttribute(KEY_STROKE, stroke);
        tspan.setAttribute(KEY_STROKE_WIDTH, strokeWidth);
        tspan.setAttribute(KEY_STROKE_OPACITY, strokeOpacity);
        tspan.setAttribute("stroke-linejoin", "round")
    }
}

function baseAnimate(that, params, options, complete) {
    options = options || {};
    var key;
    var value;
    var renderer = that.renderer;
    var settings = that._settings;
    var animationParams = {};
    var defaults = {
        translateX: 0,
        translateY: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        rotateX: 0,
        rotateY: 0
    };
    if (complete) {
        options.complete = complete
    }
    if (renderer.animationEnabled()) {
        for (key in params) {
            value = params[key];
            if (/^(translate(X|Y)|rotate[XY]?|scale(X|Y))$/i.test(key)) {
                animationParams.transform = animationParams.transform || {
                    from: {},
                    to: {}
                };
                animationParams.transform.from[key] = key in settings ? Number(settings[key].toFixed(3)) : defaults[key];
                animationParams.transform.to[key] = value
            } else if ("arc" === key || "segments" === key) {
                animationParams[key] = value
            } else {
                animationParams[key] = {
                    from: key in settings ? settings[key] : parseFloat(that.element.getAttribute(key) || 0),
                    to: value
                }
            }
        }
        renderer.animateElement(that, animationParams, extend(extend({}, renderer._animation), options))
    } else {
        options.step && options.step.call(that, 1, 1);
        options.complete && options.complete.call(that);
        that.attr(params)
    }
    return that
}

function pathAnimate(params, options, complete) {
    var curSegments = this.segments || [];
    var newSegments;
    var endSegments;
    if (this.renderer.animationEnabled() && "points" in params) {
        newSegments = buildPathSegments(params.points, this.type);
        endSegments = compensateSegments(curSegments, newSegments, this.type);
        params.segments = {
            from: curSegments,
            to: newSegments,
            end: endSegments
        };
        delete params.points
    }
    return baseAnimate(this, params, options, complete)
}

function arcAnimate(params, options, complete) {
    var settings = this._settings;
    var arcParams = {
        from: {},
        to: {}
    };
    if (this.renderer.animationEnabled() && ("x" in params || "y" in params || "innerRadius" in params || "outerRadius" in params || "startAngle" in params || "endAngle" in params)) {
        arcParams.from.x = settings.x || 0;
        arcParams.from.y = settings.y || 0;
        arcParams.from.innerRadius = settings.innerRadius || 0;
        arcParams.from.outerRadius = settings.outerRadius || 0;
        arcParams.from.startAngle = settings.startAngle || 0;
        arcParams.from.endAngle = settings.endAngle || 0;
        arcParams.to.x = "x" in params ? params.x : settings.x;
        delete params.x;
        arcParams.to.y = "y" in params ? params.y : settings.y;
        delete params.y;
        arcParams.to.innerRadius = "innerRadius" in params ? params.innerRadius : settings.innerRadius;
        delete params.innerRadius;
        arcParams.to.outerRadius = "outerRadius" in params ? params.outerRadius : settings.outerRadius;
        delete params.outerRadius;
        arcParams.to.startAngle = "startAngle" in params ? params.startAngle : settings.startAngle;
        delete params.startAngle;
        arcParams.to.endAngle = "endAngle" in params ? params.endAngle : settings.endAngle;
        delete params.endAngle;
        params.arc = arcParams
    }
    return baseAnimate(this, params, options, complete)
}

function buildLink(target, parameters) {
    var obj = {
        is: false,
        name: parameters.name || parameters,
        after: parameters.after
    };
    if (target) {
        obj.to = target
    } else {
        obj.virtual = true
    }
    return obj
}
export var SvgElement = function(renderer, tagName, type) {
    this.renderer = renderer;
    this.element = createElement(tagName);
    this._settings = {};
    this._styles = {};
    if ("path" === tagName) {
        this.type = type || "line"
    }
};

function removeFuncIriCallback(callback) {
    fixFuncIriCallbacks.remove(callback)
}
SvgElement.prototype = {
    constructor: SvgElement,
    _getJQElement: function() {
        return this._$element || (this._$element = $(this.element))
    },
    _addFixIRICallback: function() {
        var that = this;
        var fn = function() {
            fixFuncIri(that, "fill");
            fixFuncIri(that, "clip-path");
            fixFuncIri(that, "filter")
        };
        that.element._fixFuncIri = fn;
        fn.renderer = that.renderer;
        fixFuncIriCallbacks.add(fn);
        that._addFixIRICallback = function() {}
    },
    _clearChildrenFuncIri: function() {
        ! function clearChildren(element) {
            var i;
            for (i = 0; i < element.childNodes.length; i++) {
                removeFuncIriCallback(element.childNodes[i]._fixFuncIri);
                clearChildren(element.childNodes[i])
            }
        }(this.element)
    },
    dispose: function() {
        removeFuncIriCallback(this.element._fixFuncIri);
        this._clearChildrenFuncIri();
        this._getJQElement().remove();
        return this
    },
    append: function(parent) {
        (parent || this.renderer.root).element.appendChild(this.element);
        return this
    },
    remove: function() {
        var element = this.element;
        element.parentNode && element.parentNode.removeChild(element);
        return this
    },
    enableLinks: function() {
        this._links = [];
        return this
    },
    virtualLink: function(parameters) {
        linkItem({
            _link: buildLink(null, parameters)
        }, this);
        return this
    },
    linkAfter: function(name) {
        this._linkAfter = name;
        return this
    },
    linkOn: function(target, parameters) {
        this._link = buildLink(target, parameters);
        linkItem(this, target);
        return this
    },
    linkOff: function() {
        unlinkItem(this);
        this._link = null;
        return this
    },
    linkAppend: function() {
        var link = this._link;
        var items = link.to._links;
        var i;
        var next;
        for (i = link.i + 1;
            (next = items[i]) && !next._link.is; ++i) {}
        this._insert(link.to, next);
        link.is = true;
        return this
    },
    _insert: function(parent, next) {
        parent.element.insertBefore(this.element, next ? next.element : null)
    },
    linkRemove: function() {
        this.remove();
        this._link.is = false;
        return this
    },
    clear: function() {
        this._clearChildrenFuncIri();
        this._getJQElement().empty();
        return this
    },
    toBackground: function() {
        var elem = this.element;
        var parent = elem.parentNode;
        parent && parent.insertBefore(elem, parent.firstChild);
        return this
    },
    toForeground: function() {
        var elem = this.element;
        var parent = elem.parentNode;
        parent && parent.appendChild(elem);
        return this
    },
    attr: function(attrs) {
        return baseAttr(this, attrs)
    },
    smartAttr: function(attrs) {
        return this.attr(processHatchingAttrs(this, attrs))
    },
    css: function(styles) {
        return baseCss(this, styles)
    },
    animate: function(params, options, complete) {
        return baseAnimate(this, params, options, complete)
    },
    sharp(pos, sharpDirection) {
        return this.attr({
            sharp: pos || true,
            sharpDirection: sharpDirection
        })
    },
    _applyTransformation() {
        var tr = this._settings;
        var rotateX;
        var rotateY;
        var transformations = [];
        var sharpMode = tr.sharp;
        var trDirection = tr.sharpDirection || 1;
        var strokeOdd = tr[KEY_STROKE_WIDTH] % 2;
        var correctionX = strokeOdd && ("h" === sharpMode || true === sharpMode) ? SHARPING_CORRECTION * trDirection : 0;
        var correctionY = strokeOdd && ("v" === sharpMode || true === sharpMode) ? SHARPING_CORRECTION * trDirection : 0;
        transformations.push("translate(" + ((tr.translateX || 0) + correctionX) + "," + ((tr.translateY || 0) + correctionY) + ")");
        if (tr.rotate) {
            if ("rotateX" in tr) {
                rotateX = tr.rotateX
            } else {
                rotateX = tr.x
            }
            if ("rotateY" in tr) {
                rotateY = tr.rotateY
            } else {
                rotateY = tr.y
            }
            transformations.push("rotate(" + tr.rotate + "," + (rotateX || 0) + "," + (rotateY || 0) + ")")
        }
        var scaleXDefined = isDefined(tr.scaleX);
        var scaleYDefined = isDefined(tr.scaleY);
        if (scaleXDefined || scaleYDefined) {
            transformations.push("scale(" + (scaleXDefined ? tr.scaleX : 1) + "," + (scaleYDefined ? tr.scaleY : 1) + ")")
        }
        if (transformations.length) {
            this.element.setAttribute("transform", transformations.join(" "))
        }
    },
    move: function(x, y, animate, animOptions) {
        var obj = {};
        isDefined(x) && (obj.translateX = x);
        isDefined(y) && (obj.translateY = y);
        if (!animate) {
            this.attr(obj)
        } else {
            this.animate(obj, animOptions)
        }
        return this
    },
    rotate: function(angle, x, y, animate, animOptions) {
        var obj = {
            rotate: angle || 0
        };
        isDefined(x) && (obj.rotateX = x);
        isDefined(y) && (obj.rotateY = y);
        if (!animate) {
            this.attr(obj)
        } else {
            this.animate(obj, animOptions)
        }
        return this
    },
    _getElementBBox: function() {
        var elem = this.element;
        var bBox;
        try {
            bBox = elem.getBBox && elem.getBBox()
        } catch (e) {}
        return bBox || {
            x: 0,
            y: 0,
            width: elem.offsetWidth || 0,
            height: elem.offsetHeight || 0
        }
    },
    getBBox: function() {
        var transformation = this._settings;
        var bBox = this._getElementBBox();
        if (transformation.rotate) {
            bBox = rotateBBox(bBox, [("rotateX" in transformation ? transformation.rotateX : transformation.x) || 0, ("rotateY" in transformation ? transformation.rotateY : transformation.y) || 0], -transformation.rotate)
        } else {
            bBox = normalizeBBox(bBox)
        }
        return bBox
    },
    markup: function() {
        return getSvgMarkup(this.element)
    },
    getOffset: function() {
        return this._getJQElement().offset()
    },
    stopAnimation: function(disableComplete) {
        var animation = this.animation;
        animation && animation.stop(disableComplete);
        return this
    },
    setTitle: function(text) {
        var titleElem = createElement("title");
        titleElem.textContent = text || "";
        this.element.appendChild(titleElem)
    },
    removeTitle() {
        detachTitleElements(this.element)
    },
    data: function(obj, val) {
        var elem = this.element;
        var key;
        if (void 0 !== val) {
            elem[obj] = val
        } else {
            for (key in obj) {
                elem[key] = obj[key]
            }
        }
        return this
    },
    on: function() {
        var args = [this._getJQElement()];
        args.push.apply(args, arguments);
        eventsEngine.on.apply(eventsEngine, args);
        return this
    },
    off: function() {
        var args = [this._getJQElement()];
        args.push.apply(args, arguments);
        eventsEngine.off.apply(eventsEngine, args);
        return this
    },
    trigger: function() {
        var args = [this._getJQElement()];
        args.push.apply(args, arguments);
        eventsEngine.trigger.apply(eventsEngine, args);
        return this
    }
};
export var PathSvgElement = function(renderer, type) {
    SvgElement.call(this, renderer, "path", type)
};
PathSvgElement.prototype = objectCreate(SvgElement.prototype);
extend(PathSvgElement.prototype, {
    constructor: PathSvgElement,
    attr: pathAttr,
    animate: pathAnimate
});
export var ArcSvgElement = function(renderer) {
    SvgElement.call(this, renderer, "path", "arc")
};
ArcSvgElement.prototype = objectCreate(SvgElement.prototype);
extend(ArcSvgElement.prototype, {
    constructor: ArcSvgElement,
    attr: arcAttr,
    animate: arcAnimate
});
export var RectSvgElement = function(renderer) {
    SvgElement.call(this, renderer, "rect")
};
RectSvgElement.prototype = objectCreate(SvgElement.prototype);
extend(RectSvgElement.prototype, {
    constructor: RectSvgElement,
    attr: rectAttr
});
export var TextSvgElement = function(renderer) {
    SvgElement.call(this, renderer, "text");
    this.css({
        "white-space": "pre"
    })
};
TextSvgElement.prototype = objectCreate(SvgElement.prototype);
extend(TextSvgElement.prototype, {
    constructor: TextSvgElement,
    attr: textAttr,
    css: textCss,
    applyEllipsis: applyEllipsis,
    setMaxSize: setMaxSize,
    restoreText: restoreText,
    _getLineHeight() {
        return !isNaN(parseFloat(this._styles[KEY_FONT_SIZE])) ? this._styles[KEY_FONT_SIZE] : DEFAULT_FONT_SIZE
    }
});

function updateIndexes(items, k) {
    var i;
    var item;
    for (i = k; item = items[i]; ++i) {
        item._link.i = i
    }
}

function linkItem(target, container) {
    var items = container._links;
    var key = target._link.after = target._link.after || container._linkAfter;
    var i;
    var item;
    if (key) {
        for (i = 0;
            (item = items[i]) && item._link.name !== key; ++i) {}
        if (item) {
            for (++i;
                (item = items[i]) && item._link.after === key; ++i) {}
        }
    } else {
        i = items.length
    }
    items.splice(i, 0, target);
    updateIndexes(items, i)
}

function unlinkItem(target) {
    var i;
    var items = target._link.to._links;
    for (i = 0; items[i] !== target; ++i) {}
    items.splice(i, 1);
    updateIndexes(items, i)
}
export function Renderer(options) {
    this.root = this._createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
        fill: NONE,
        stroke: NONE,
        "stroke-width": 0
    }).attr({
        class: options.cssClass
    }).css({
        "line-height": "normal",
        "-moz-user-select": NONE,
        "-webkit-user-select": NONE,
        "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        display: "block",
        overflow: "hidden"
    });
    this._init();
    this.pathModified = !!options.pathModified;
    this._$container = $(options.container);
    this.root.append({
        element: options.container
    });
    this._locker = 0;
    this._backed = false
}
Renderer.prototype = {
    constructor: Renderer,
    _init: function() {
        this._defs = this._createElement("defs").append(this.root);
        this._animationController = new AnimationController(this.root.element);
        this._animation = {
            enabled: true,
            duration: 1e3,
            easing: "easeOutCubic"
        }
    },
    setOptions: function(options) {
        this.rtl = !!options.rtl;
        this.encodeHtml = !!options.encodeHtml;
        this.updateAnimationOptions(options.animation || {});
        this.root.attr({
            direction: this.rtl ? "rtl" : "ltr"
        });
        return this
    },
    _createElement: function(tagName, attr, type) {
        var elem = new SvgElement(this, tagName, type);
        attr && elem.attr(attr);
        return elem
    },
    lock: function() {
        if (0 === this._locker) {
            this._backed = !this._$container.is(":visible");
            if (this._backed) {
                backupRoot(this.root)
            }
        }++this._locker;
        return this
    },
    unlock: function() {
        --this._locker;
        if (0 === this._locker) {
            if (this._backed) {
                restoreRoot(this.root, this._$container[0])
            }
            this._backed = false
        }
        return this
    },
    resize: function(width, height) {
        if (width >= 0 && height >= 0) {
            this.root.attr({
                width: width,
                height: height
            })
        }
        return this
    },
    dispose: function() {
        var key;
        this.root.dispose();
        this._defs.dispose();
        this._animationController.dispose();
        fixFuncIriCallbacks.removeByRenderer(this);
        for (key in this) {
            this[key] = null
        }
        return this
    },
    animationEnabled: function() {
        return !!this._animation.enabled
    },
    updateAnimationOptions: function(newOptions) {
        extend(this._animation, newOptions);
        return this
    },
    stopAllAnimations: function(lock) {
        this._animationController[lock ? "lock" : "stop"]();
        return this
    },
    animateElement: function(element, params, options) {
        this._animationController.animateElement(element, params, options);
        return this
    },
    svg: function() {
        return this.root.markup()
    },
    getRootOffset: function() {
        return this.root.getOffset()
    },
    onEndAnimation: function(endAnimation) {
        this._animationController.onEndAnimation(endAnimation)
    },
    rect: function(x, y, width, height) {
        var elem = new RectSvgElement(this);
        return elem.attr({
            x: x || 0,
            y: y || 0,
            width: width || 0,
            height: height || 0
        })
    },
    simpleRect: function() {
        return this._createElement("rect")
    },
    circle: function(x, y, r) {
        return this._createElement("circle", {
            cx: x || 0,
            cy: y || 0,
            r: r || 0
        })
    },
    g: function() {
        return this._createElement("g")
    },
    image: function(x, y, w, h, href, location) {
        var image = this._createElement("image", {
            x: x || 0,
            y: y || 0,
            width: w || 0,
            height: h || 0,
            preserveAspectRatio: preserveAspectRatioMap[normalizeEnum(location)] || NONE
        });
        image.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", href || "");
        return image
    },
    path: function(points, type) {
        var elem = new PathSvgElement(this, type);
        return elem.attr({
            points: points || []
        })
    },
    arc: function(x, y, innerRadius, outerRadius, startAngle, endAngle) {
        var elem = new ArcSvgElement(this);
        return elem.attr({
            x: x || 0,
            y: y || 0,
            innerRadius: innerRadius || 0,
            outerRadius: outerRadius || 0,
            startAngle: startAngle || 0,
            endAngle: endAngle || 0
        })
    },
    text: function(_text, x, y) {
        var elem = new TextSvgElement(this);
        return elem.attr({
            text: _text,
            x: x || 0,
            y: y || 0
        })
    },
    linearGradient: function(stops) {
        var id = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : getNextDefsSvgId();
        var rotationAngle = arguments.length > 2 ? arguments[2] : void 0;
        var gradient = this._createElement("linearGradient", {
            id: id,
            gradientTransform: "rotate(".concat(rotationAngle || 0, ")")
        }).append(this._defs);
        gradient.id = id;
        this._createGradientStops(stops, gradient);
        return gradient
    },
    radialGradient: function(stops, id) {
        var gradient = this._createElement("radialGradient", {
            id: id
        }).append(this._defs);
        this._createGradientStops(stops, gradient);
        return gradient
    },
    _createGradientStops: function(stops, group) {
        stops.forEach(stop => {
            var _stop$stopColor;
            this._createElement("stop", {
                offset: stop.offset,
                "stop-color": null !== (_stop$stopColor = stop["stop-color"]) && void 0 !== _stop$stopColor ? _stop$stopColor : stop.color,
                "stop-opacity": stop.opacity
            }).append(group)
        })
    },
    pattern: function(color, hatching, _id) {
        hatching = hatching || {};
        var step = hatching.step || 6;
        var stepTo2 = step / 2;
        var stepBy15 = 1.5 * step;
        var id = _id || getNextDefsSvgId();
        var d = "right" === normalizeEnum(hatching.direction) ? "M " + stepTo2 + " " + -stepTo2 + " L " + -stepTo2 + " " + stepTo2 + " M 0 " + step + " L " + step + " 0 M " + stepBy15 + " " + stepTo2 + " L " + stepTo2 + " " + stepBy15 : "M 0 0 L " + step + " " + step + " M " + -stepTo2 + " " + stepTo2 + " L " + stepTo2 + " " + stepBy15 + " M " + stepTo2 + " " + -stepTo2 + " L " + stepBy15 + " " + stepTo2;
        var pattern = this._createElement("pattern", {
            id: id,
            width: step,
            height: step,
            patternUnits: "userSpaceOnUse"
        }).append(this._defs);
        pattern.id = id;
        this.rect(0, 0, step, step).attr({
            fill: color,
            opacity: hatching.opacity
        }).append(pattern);
        new PathSvgElement(this).attr({
            d: d,
            "stroke-width": hatching.width || 1,
            stroke: color
        }).append(pattern);
        return pattern
    },
    customPattern: function(id, template, width, height) {
        var option = {
            id: id,
            width: width,
            height: height,
            patternContentUnits: "userSpaceOnUse",
            patternUnits: this._getPatternUnits(width, height)
        };
        var pattern = this._createElement("pattern", option).append(this._defs);
        template.render({
            container: pattern.element
        });
        return pattern
    },
    _getPatternUnits: function(width, height) {
        if (Number(width) && Number(height)) {
            return "userSpaceOnUse"
        }
    },
    _getPointsWithYOffset: function(points, offset) {
        return points.map((function(point, index) {
            if (index % 2 !== 0) {
                return point + offset
            }
            return point
        }))
    },
    clipShape: function(method, methodArgs) {
        var id = getNextDefsSvgId();
        var clipPath = this._createElement("clipPath", {
            id: id
        }).append(this._defs);
        var shape = method.apply(this, methodArgs).append(clipPath);
        shape.id = id;
        shape.remove = function() {
            throw "Not implemented"
        };
        shape.dispose = function() {
            clipPath.dispose();
            clipPath = null;
            return this
        };
        return shape
    },
    clipRect(x, y, width, height) {
        return this.clipShape(this.rect, arguments)
    },
    clipCircle(x, y, radius) {
        return this.clipShape(this.circle, arguments)
    },
    shadowFilter: function(x, y, width, height, offsetX, offsetY, blur, color, opacity) {
        var id = getNextDefsSvgId();
        var filter = this._createElement("filter", {
            id: id,
            x: x || 0,
            y: y || 0,
            width: width || 0,
            height: height || 0
        }).append(this._defs);
        var gaussianBlur = this._createElement("feGaussianBlur", {
            in: "SourceGraphic",
            result: "gaussianBlurResult",
            stdDeviation: blur || 0
        }).append(filter);
        var offset = this._createElement("feOffset", {
            in: "gaussianBlurResult",
            result: "offsetResult",
            dx: offsetX || 0,
            dy: offsetY || 0
        }).append(filter);
        var flood = this._createElement("feFlood", {
            result: "floodResult",
            "flood-color": color || "",
            "flood-opacity": opacity
        }).append(filter);
        var composite = this._createElement("feComposite", {
            in: "floodResult",
            in2: "offsetResult",
            operator: "in",
            result: "compositeResult"
        }).append(filter);
        var finalComposite = this._createElement("feComposite", {
            in: "SourceGraphic",
            in2: "compositeResult",
            operator: "over"
        }).append(filter);
        filter.id = id;
        filter.gaussianBlur = gaussianBlur;
        filter.offset = offset;
        filter.flood = flood;
        filter.composite = composite;
        filter.finalComposite = finalComposite;
        filter.attr = function(attrs) {
            var filterAttrs = {};
            var offsetAttrs = {};
            var floodAttrs = {};
            "x" in attrs && (filterAttrs.x = attrs.x);
            "y" in attrs && (filterAttrs.y = attrs.y);
            "width" in attrs && (filterAttrs.width = attrs.width);
            "height" in attrs && (filterAttrs.height = attrs.height);
            baseAttr(this, filterAttrs);
            "blur" in attrs && this.gaussianBlur.attr({
                stdDeviation: attrs.blur
            });
            "offsetX" in attrs && (offsetAttrs.dx = attrs.offsetX);
            "offsetY" in attrs && (offsetAttrs.dy = attrs.offsetY);
            this.offset.attr(offsetAttrs);
            "color" in attrs && (floodAttrs["flood-color"] = attrs.color);
            "opacity" in attrs && (floodAttrs["flood-opacity"] = attrs.opacity);
            this.flood.attr(floodAttrs);
            return this
        };
        return filter
    },
    brightFilter: function(type, slope) {
        var id = getNextDefsSvgId();
        var filter = this._createElement("filter", {
            id: id
        }).append(this._defs);
        var componentTransferElement = this._createElement("feComponentTransfer").append(filter);
        var attrs = {
            type: type,
            slope: slope
        };
        filter.id = id;
        this._createElement("feFuncR", attrs).append(componentTransferElement);
        this._createElement("feFuncG", attrs).append(componentTransferElement);
        this._createElement("feFuncB", attrs).append(componentTransferElement);
        return filter
    },
    getGrayScaleFilter: function() {
        if (this._grayScaleFilter) {
            return this._grayScaleFilter
        }
        var id = getNextDefsSvgId();
        var filter = this._createElement("filter", {
            id: id
        }).append(this._defs);
        this._createElement("feColorMatrix").attr({
            type: "matrix",
            values: "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 0.6 0"
        }).append(filter);
        filter.id = id;
        this._grayScaleFilter = filter;
        return filter
    },
    lightenFilter: function(id) {
        var filter = this._createElement("filter", {
            id: id
        }).append(this._defs);
        this._createElement("feColorMatrix", {
            type: "matrix",
            values: "".concat(1.3, " 0 0 0 0 0 ").concat(1.3, " 0 0 0 0 0 ").concat(1.3, " 0 0 0 0 0 1 0")
        }).append(filter);
        filter.id = id;
        return filter
    },
    initDefsElements: function() {
        var storage = this._defsElementsStorage = this._defsElementsStorage || {
            byHash: {},
            baseId: getNextDefsSvgId()
        };
        var byHash = storage.byHash;
        var name;
        for (name in byHash) {
            byHash[name].pattern.dispose()
        }
        storage.byHash = {};
        storage.refToHash = {};
        storage.nextId = 0
    },
    drawPattern: function(_ref4, storageId, nextId) {
        var {
            color: color,
            hatching: hatching
        } = _ref4;
        return this.pattern(color, hatching, "".concat(storageId, "-hatching-").concat(nextId++))
    },
    drawFilter: function(_, storageId, nextId) {
        return this.lightenFilter("".concat(storageId, "-lightening-").concat(nextId++))
    },
    lockDefsElements: function(attrs, ref, type) {
        var storage = this._defsElementsStorage;
        var storageItem;
        var hash = "pattern" === type ? getHatchingHash(attrs) : LIGHTENING_HASH;
        var method = "pattern" === type ? this.drawPattern : this.drawFilter;
        var pattern;
        if (storage.refToHash[ref] !== hash) {
            if (ref) {
                this.releaseDefsElements(ref)
            }
            storageItem = storage.byHash[hash];
            if (!storageItem) {
                pattern = method.call(this, attrs, storage.baseId, storage.nextId++);
                storageItem = storage.byHash[hash] = {
                    pattern: pattern,
                    count: 0
                };
                storage.refToHash[pattern.id] = hash
            }++storageItem.count;
            ref = storageItem.pattern.id
        }
        return ref
    },
    releaseDefsElements: function(ref) {
        var storage = this._defsElementsStorage;
        var hash = storage.refToHash[ref];
        var storageItem = storage.byHash[hash];
        if (storageItem && 0 === --storageItem.count) {
            storageItem.pattern.dispose();
            delete storage.byHash[hash];
            delete storage.refToHash[ref]
        }
    }
};

function getHatchingHash(_ref5) {
    var {
        color: color,
        hatching: hatching
    } = _ref5;
    return "@" + color + "::" + hatching.step + ":" + hatching.width + ":" + hatching.opacity + ":" + hatching.direction
}
var fixFuncIriCallbacks = function() {
    var callbacks = [];
    return {
        add: function(fn) {
            callbacks.push(fn)
        },
        remove: function(fn) {
            callbacks = callbacks.filter((function(el) {
                return el !== fn
            }))
        },
        removeByRenderer: function(renderer) {
            callbacks = callbacks.filter((function(el) {
                return el.renderer !== renderer
            }))
        },
        fire: function() {
            callbacks.forEach((function(fn) {
                fn()
            }))
        }
    }
}();
export var refreshPaths = function() {
    fixFuncIriCallbacks.fire()
};
