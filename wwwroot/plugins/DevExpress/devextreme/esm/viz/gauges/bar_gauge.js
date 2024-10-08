/**
 * DevExtreme (esm/viz/gauges/bar_gauge.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var PI_DIV_180 = Math.PI / 180;
var _abs = Math.abs;
var _round = Math.round;
var _floor = Math.floor;
var _min = Math.min;
var _max = Math.max;
import registerComponent from "../../core/component_registrator";
import {
    clone
} from "../../core/utils/object";
import {
    noop
} from "../../core/utils/common";
import {
    overlapping
} from "../../__internal/viz/chart_components/m_base_chart";
import {
    extend
} from "../../core/utils/extend";
import {
    normalizeEnum as _normalizeEnum,
    convertAngleToRendererSpace,
    getCosAndSin,
    patchFontOptions,
    getVerticallyShiftedAngularCoords,
    normalizeArcParams,
    normalizeAngle
} from "../core/utils";
import {
    BaseGauge,
    getSampleText,
    formatValue,
    compareArrays
} from "./base_gauge";
import dxCircularGauge from "./circular_gauge";
import {
    plugin as pluginLegend
} from "../components/legend";
import {
    plugins as centerTemplatePlugins
} from "../core/center_template";
import {
    roundFloatPart
} from "../../core/utils/math";
var _getSampleText = getSampleText;
var _formatValue = formatValue;
var _compareArrays = compareArrays;
var _isArray = Array.isArray;
var _convertAngleToRendererSpace = convertAngleToRendererSpace;
var _getCosAndSin = getCosAndSin;
var _patchFontOptions = patchFontOptions;
var _Number = Number;
var _isFinite = isFinite;
var _noop = noop;
var _extend = extend;
var ARC_COORD_PREC = 5;
var OPTION_VALUES = "values";
var BarWrapper;
export var dxBarGauge = BaseGauge.inherit({
    _rootClass: "dxbg-bar-gauge",
    _themeSection: "barGauge",
    _fontFields: ["label.font", "legend.font", "legend.title.font", "legend.title.subtitle.font"],
    _initCore: function() {
        var that = this;
        that.callBase.apply(that, arguments);
        that._barsGroup = that._renderer.g().attr({
            class: "dxbg-bars"
        }).linkOn(that._renderer.root, "bars");
        that._values = [];
        that._context = {
            renderer: that._renderer,
            translator: that._translator,
            tracker: that._tracker,
            group: that._barsGroup
        };
        that._animateStep = function(pos) {
            var bars = that._bars;
            var i;
            var ii;
            for (i = 0, ii = bars.length; i < ii; ++i) {
                bars[i].animate(pos)
            }
        };
        that._animateComplete = function() {
            that._bars.forEach(bar => bar.endAnimation());
            that._checkOverlap()
        }
    },
    _disposeCore: function() {
        var that = this;
        that._barsGroup.linkOff();
        that._barsGroup = that._values = that._context = that._animateStep = that._animateComplete = null;
        that.callBase.apply(that, arguments)
    },
    _setupDomainCore: function() {
        var startValue = this.option("startValue");
        var endValue = this.option("endValue");
        _isFinite(startValue) || (startValue = 0);
        _isFinite(endValue) || (endValue = 100);
        this._translator.setDomain(startValue, endValue);
        this._baseValue = this._translator.adjust(this.option("baseValue"));
        _isFinite(this._baseValue) || (this._baseValue = startValue < endValue ? startValue : endValue)
    },
    _getDefaultSize: function() {
        return {
            width: 300,
            height: 300
        }
    },
    _setupCodomain: dxCircularGauge.prototype._setupCodomain,
    _getApproximateScreenRange: function() {
        var sides = this._area.sides;
        var width = this._canvas.width / (sides.right - sides.left);
        var height = this._canvas.height / (sides.down - sides.up);
        var r = width < height ? width : height;
        return -this._translator.getCodomainRange() * r * PI_DIV_180
    },
    _setupAnimationSettings: function() {
        var that = this;
        that.callBase.apply(that, arguments);
        if (that._animationSettings) {
            that._animationSettings.step = that._animateStep;
            that._animationSettings.complete = that._animateComplete
        }
    },
    _cleanContent: function() {
        this._barsGroup.linkRemove();
        this._animationSettings && this._barsGroup.stopAnimation();
        this._barsGroup.clear()
    },
    _renderContent: function() {
        var labelOptions = this.option("label");
        var text;
        var bBox;
        var context = this._context;
        this._barsGroup.linkAppend();
        context.textEnabled = void 0 === labelOptions || labelOptions && (!("visible" in labelOptions) || labelOptions.visible);
        if (context.textEnabled) {
            context.textColor = labelOptions && labelOptions.font && labelOptions.font.color || null;
            labelOptions = _extend(true, {}, this._themeManager.theme().label, labelOptions);
            context.formatOptions = {
                format: void 0 !== labelOptions.format ? labelOptions.format : this._defaultFormatOptions,
                customizeText: labelOptions.customizeText
            };
            context.textOptions = {
                align: "center"
            };
            context.fontStyles = _patchFontOptions(_extend({}, this._themeManager.theme().label.font, labelOptions.font, {
                color: null
            }));
            this._textIndent = labelOptions.indent > 0 ? _Number(labelOptions.indent) : 0;
            context.lineWidth = labelOptions.connectorWidth > 0 ? _Number(labelOptions.connectorWidth) : 0;
            context.lineColor = labelOptions.connectorColor || null;
            text = this._renderer.text(_getSampleText(this._translator, context.formatOptions), 0, 0).attr(context.textOptions).css(context.fontStyles).append(this._barsGroup);
            bBox = text.getBBox();
            text.remove();
            context.textY = bBox.y;
            context.textWidth = bBox.width;
            context.textHeight = bBox.height
        }
        dxCircularGauge.prototype._applyMainLayout.call(this);
        this._renderBars()
    },
    _measureMainElements: function() {
        var result = {
            maxRadius: this._area.radius
        };
        if (this._context.textEnabled) {
            result.horizontalMargin = this._context.textWidth;
            result.verticalMargin = this._context.textHeight;
            result.inverseHorizontalMargin = this._context.textWidth / 2;
            result.inverseVerticalMargin = this._context.textHeight / 2
        }
        return result
    },
    _renderBars: function() {
        var options = _extend({}, this._themeManager.theme(), this.option());
        var radius;
        var area = this._area;
        var relativeInnerRadius = options.relativeInnerRadius > 0 && options.relativeInnerRadius < 1 ? _Number(options.relativeInnerRadius) : .1;
        radius = area.radius;
        if (this._context.textEnabled) {
            this._textIndent = _round(_min(this._textIndent, radius / 2));
            radius -= this._textIndent
        }
        this._outerRadius = _floor(radius);
        this._innerRadius = _floor(radius * relativeInnerRadius);
        this._barSpacing = options.barSpacing > 0 ? _Number(options.barSpacing) : 0;
        _extend(this._context, {
            backgroundColor: options.backgroundColor,
            x: area.x,
            y: area.y,
            startAngle: area.startCoord,
            endAngle: area.endCoord,
            baseAngle: this._translator.translate(this._baseValue)
        });
        this._arrangeBars()
    },
    _arrangeBars: function() {
        var radius = this._outerRadius - this._innerRadius;
        var context = this._context;
        var i;
        var count = this._bars.length;
        this._beginValueChanging();
        context.barSize = count > 0 ? _max((radius - (count - 1) * this._barSpacing) / count, 1) : 0;
        var spacing = count > 1 ? _max(_min((radius - count * context.barSize) / (count - 1), this._barSpacing), 0) : 0;
        var _count = _min(_floor((radius + spacing) / context.barSize), count);
        this._setBarsCount(count);
        radius = this._outerRadius;
        context.textRadius = radius;
        context.textIndent = this._textIndent;
        this._palette.reset();
        var unitOffset = context.barSize + spacing;
        var colors = this._palette.generateColors(_count);
        for (i = 0; i < _count; ++i, radius -= unitOffset) {
            this._bars[i].arrange({
                radius: radius,
                color: colors[i]
            })
        }
        for (var _i = _count; _i < count; _i++) {
            this._bars[_i].hide()
        }
        if (this._animationSettings && !this._noAnimation) {
            this._animateBars()
        } else {
            this._updateBars()
        }
        this._endValueChanging()
    },
    _setBarsCount: function() {
        if (this._bars.length > 0) {
            if (this._dummyBackground) {
                this._dummyBackground.dispose();
                this._dummyBackground = null
            }
        } else {
            if (!this._dummyBackground) {
                this._dummyBackground = this._renderer.arc().attr({
                    "stroke-linejoin": "round"
                })
            }
            this._dummyBackground.attr({
                x: this._context.x,
                y: this._context.y,
                outerRadius: this._outerRadius,
                innerRadius: this._innerRadius,
                startAngle: this._context.endAngle,
                endAngle: this._context.startAngle,
                fill: this._context.backgroundColor
            }).append(this._barsGroup)
        }
    },
    _getCenter: function() {
        return {
            x: this._context.x,
            y: this._context.y
        }
    },
    _updateBars: function() {
        this._bars.forEach(bar => bar.applyValue());
        this._checkOverlap()
    },
    _checkOverlap: function() {
        var that = this;
        var overlapStrategy = _normalizeEnum(that._getOption("resolveLabelOverlapping", true));

        function shiftFunction(box, length) {
            return getVerticallyShiftedAngularCoords(box, -length, that._context)
        }
        if ("none" === overlapStrategy) {
            return
        }
        if ("shift" === overlapStrategy) {
            var newBars = that._dividePoints();
            overlapping.resolveLabelOverlappingInOneDirection(newBars.left, that._canvas, false, false, shiftFunction);
            overlapping.resolveLabelOverlappingInOneDirection(newBars.right, that._canvas, false, false, shiftFunction);
            that._clearLabelsCrossTitle();
            that._drawConnector()
        } else {
            that._clearOverlappingLabels()
        }
    },
    _drawConnector() {
        var that = this;
        var bars = that._bars;
        var {
            connectorWidth: connectorWidth
        } = that._getOption("label");
        bars.forEach(bar => {
            if (!bar._isLabelShifted) {
                return
            }
            var x = bar._bar.attr("x");
            var y = bar._bar.attr("y");
            var innerRadius = bar._bar.attr("innerRadius");
            var outerRadius = bar._bar.attr("outerRadius");
            var startAngle = bar._bar.attr("startAngle");
            var endAngle = bar._bar.attr("endAngle");
            var coordStart = getStartCoordsArc.apply(null, normalizeArcParams(x, y, innerRadius, outerRadius, startAngle, endAngle));
            var {
                cos: cos,
                sin: sin
            } = _getCosAndSin(bar._angle);
            var xStart = coordStart.x - sin * connectorWidth / 2 - cos;
            var yStart = coordStart.y - cos * connectorWidth / 2 + sin;
            var box = bar._text.getBBox();
            var lastCoords = bar._text._lastCoords;
            var indentFromLabel = that._context.textWidth / 2;
            var originalXLabelCoord = box.x + box.width / 2 + lastCoords.x;
            var originalPoints = [xStart, yStart, originalXLabelCoord, box.y + lastCoords.y];
            if (bar._angle > 90) {
                originalPoints[2] += indentFromLabel
            } else {
                originalPoints[2] -= indentFromLabel
            }
            if (bar._angle <= 180 && bar._angle > 0) {
                originalPoints[3] += box.height
            }
            if (connectorWidth % 2) {
                var xDeviation = -sin / 2;
                var yDeviation = -cos / 2;
                if (bar._angle > 180) {
                    originalPoints[0] -= xDeviation;
                    originalPoints[1] -= yDeviation
                } else if (bar._angle > 0 && bar._angle <= 90) {
                    originalPoints[0] += xDeviation;
                    originalPoints[1] += yDeviation
                }
            }
            var points = originalPoints.map(coordinate => roundFloatPart(coordinate, 4));
            bar._line.attr({
                points: points
            });
            bar._line.rotate(0);
            bar._isLabelShifted = false
        })
    },
    _dividePoints() {
        var bars = this._bars;
        return bars.reduce((function(stackBars, bar) {
            var angle = normalizeAngle(bar._angle);
            var isRightSide = angle <= 90 || angle >= 270;
            bar._text._lastCoords = {
                x: 0,
                y: 0
            };
            var barToExtend = isRightSide ? stackBars.right : stackBars.left;
            barToExtend.push({
                series: {
                    isStackedSeries: () => false,
                    isFullStackedSeries: () => false
                },
                getLabels: () => [{
                    isVisible: () => true,
                    getBoundingRect: () => {
                        var {
                            height: height,
                            width: width,
                            x: x,
                            y: y
                        } = bar._text.getBBox();
                        var lastCoords = bar._text._lastCoords;
                        return {
                            x: x + lastCoords.x,
                            y: y + lastCoords.y,
                            width: width,
                            height: height
                        }
                    },
                    shift: (x, y) => {
                        var box = bar._text.getBBox();
                        bar._text._lastCoords = {
                            x: x - box.x,
                            y: y - box.y
                        };
                        bar._text.attr({
                            translateX: x - box.x,
                            translateY: y - box.y
                        });
                        bar._isLabelShifted = true
                    },
                    draw: () => bar.hideLabel(),
                    getData: () => ({
                        value: bar.getValue()
                    }),
                    hideInsideLabel: () => false
                }]
            });
            return stackBars
        }), {
            left: [],
            right: []
        })
    },
    _clearOverlappingLabels() {
        var bars = this._bars;
        var currentIndex = 0;
        var nextIndex = 1;
        var sortedBars = bars.concat().sort((a, b) => a.getValue() - b.getValue());
        while (currentIndex < sortedBars.length && nextIndex < sortedBars.length) {
            var current = sortedBars[currentIndex];
            var next = sortedBars[nextIndex];
            if (current.checkIntersect(next)) {
                next.hideLabel();
                nextIndex++
            } else {
                currentIndex = nextIndex;
                nextIndex = currentIndex + 1
            }
        }
    },
    _clearLabelsCrossTitle() {
        var bars = this._bars;
        var titleCoords = this._title.getLayoutOptions() || {
            x: 0,
            y: 0,
            height: 0,
            width: 0
        };
        var minY = titleCoords.y + titleCoords.height;
        bars.forEach(bar => {
            var box = bar._text.getBBox();
            var lastCoords = bar._text._lastCoords;
            if (minY > box.y + lastCoords.y) {
                bar.hideLabel()
            }
        })
    },
    _animateBars: function() {
        var i;
        var ii = this._bars.length;
        if (ii > 0) {
            for (i = 0; i < ii; ++i) {
                this._bars[i].beginAnimation()
            }
            this._barsGroup.animate({
                _: 0
            }, this._animationSettings)
        }
    },
    _buildNodes() {
        var that = this;
        var options = that._options.silent();
        that._palette = that._themeManager.createPalette(options.palette, {
            useHighlight: true,
            extensionMode: options.paletteExtensionMode
        });
        that._palette.reset();
        that._bars = that._bars || [];
        that._animationSettings && that._barsGroup.stopAnimation();
        var barValues = that._values.filter(_isFinite);
        var count = barValues.length;
        if (that._bars.length > count) {
            var ii = that._bars.length;
            for (var i = count; i < ii; ++i) {
                that._bars[i].dispose()
            }
            that._bars.splice(count, ii - count)
        } else if (that._bars.length < count) {
            for (var _i2 = that._bars.length; _i2 < count; ++_i2) {
                that._bars.push(new BarWrapper(_i2, that._context))
            }
        }
        that._bars.forEach((bar, index) => {
            bar.update({
                color: that._palette.getNextColor(count),
                value: barValues[index]
            })
        })
    },
    _updateValues: function(values) {
        var list = _isArray(values) && values || _isFinite(values) && [values] || [];
        var i;
        var ii = list.length;
        var value;
        this._values.length = ii;
        for (i = 0; i < ii; ++i) {
            value = list[i];
            this._values[i] = _Number(_isFinite(value) ? value : this._values[i])
        }
        if (!this._resizing) {
            if (!_compareArrays(this._values, this.option(OPTION_VALUES))) {
                this.option(OPTION_VALUES, this._values.slice())
            }
        }
        this._change(["NODES"])
    },
    values: function(arg) {
        if (void 0 !== arg) {
            this._updateValues(arg);
            return this
        } else {
            return this._values.slice(0)
        }
    },
    _optionChangesMap: {
        backgroundColor: "MOSTLY_TOTAL",
        relativeInnerRadius: "MOSTLY_TOTAL",
        barSpacing: "MOSTLY_TOTAL",
        label: "MOSTLY_TOTAL",
        resolveLabelOverlapping: "MOSTLY_TOTAL",
        palette: "MOSTLY_TOTAL",
        paletteExtensionMode: "MOSTLY_TOTAL",
        values: "VALUES"
    },
    _change_VALUES: function() {
        this._updateValues(this.option(OPTION_VALUES))
    },
    _factory: clone(BaseGauge.prototype._factory),
    _optionChangesOrder: ["VALUES", "NODES"],
    _initialChanges: ["VALUES"],
    _change_NODES() {
        this._buildNodes()
    },
    _change_MOSTLY_TOTAL: function() {
        this._change(["NODES"]);
        this.callBase()
    },
    _proxyData: [],
    _getLegendData() {
        var formatOptions = {};
        var options = this._options.silent();
        var labelFormatOptions = (options.label || {}).format;
        var legendFormatOptions = (options.legend || {}).itemTextFormat;
        if (legendFormatOptions) {
            formatOptions.format = legendFormatOptions
        } else {
            formatOptions.format = labelFormatOptions || this._defaultFormatOptions
        }
        return (this._bars || []).map(b => ({
            id: b.index,
            item: {
                value: b.getValue(),
                color: b.getColor(),
                index: b.index
            },
            text: _formatValue(b.getValue(), formatOptions),
            visible: true,
            states: {
                normal: {
                    fill: b.getColor()
                }
            }
        }))
    }
});
BarWrapper = function(index, context) {
    this._context = context;
    this._tracker = context.renderer.arc().attr({
        "stroke-linejoin": "round"
    });
    this.index = index
};
_extend(BarWrapper.prototype, {
    dispose: function() {
        this._background.dispose();
        this._bar.dispose();
        if (this._context.textEnabled) {
            this._line.dispose();
            this._text.dispose()
        }
        this._context.tracker.detach(this._tracker);
        this._context = this._settings = this._background = this._bar = this._line = this._text = this._tracker = null;
        return this
    },
    arrange: function(options) {
        var context = this._context;
        this._visible = true;
        context.tracker.attach(this._tracker, this, {
            index: this.index
        });
        this._background = context.renderer.arc().attr({
            "stroke-linejoin": "round",
            fill: context.backgroundColor
        }).append(context.group);
        this._settings = this._settings || {
            x: context.x,
            y: context.y,
            startAngle: context.baseAngle,
            endAngle: context.baseAngle
        };
        this._bar = context.renderer.arc().attr(_extend({
            "stroke-linejoin": "round"
        }, this._settings)).append(context.group);
        if (context.textEnabled) {
            this._line = context.renderer.path([], "line").attr({
                "stroke-width": context.lineWidth
            }).append(context.group);
            this._text = context.renderer.text().css(context.fontStyles).attr(context.textOptions).append(context.group)
        }
        this._angle = isFinite(this._angle) ? this._angle : context.baseAngle;
        this._settings.outerRadius = options.radius;
        this._settings.innerRadius = options.radius - context.barSize;
        this._settings.x = context.x;
        this._settings.y = context.y;
        this._background.attr(_extend({}, this._settings, {
            startAngle: context.endAngle,
            endAngle: context.startAngle,
            fill: this._context.backgroundColor
        }));
        this._bar.attr({
            x: context.x,
            y: context.y,
            outerRadius: this._settings.outerRadius,
            innerRadius: this._settings.innerRadius,
            fill: this._color
        });
        this._tracker.attr(this._settings);
        if (context.textEnabled) {
            this._line.attr({
                points: [context.x, context.y - this._settings.innerRadius, context.x, context.y - context.textRadius - context.textIndent],
                stroke: context.lineColor || this._color
            }).sharp();
            this._text.css({
                fill: context.textColor || this._color
            })
        }
        return this
    },
    getTooltipParameters: function() {
        var cosSin = _getCosAndSin((this._angle + this._context.baseAngle) / 2);
        return {
            x: _round(this._context.x + (this._settings.outerRadius + this._settings.innerRadius) / 2 * cosSin.cos),
            y: _round(this._context.y - (this._settings.outerRadius + this._settings.innerRadius) / 2 * cosSin.sin),
            offset: 0,
            color: this._color,
            value: this._value
        }
    },
    setAngle: function(angle) {
        var context = this._context;
        var settings = this._settings;
        var cosSin;
        this._angle = angle;
        setAngles(settings, context.baseAngle, angle);
        this._bar.attr(settings);
        this._tracker.attr(settings);
        if (context.textEnabled) {
            cosSin = _getCosAndSin(angle);
            var indent = context.textIndent;
            var radius = context.textRadius + indent;
            var x = context.x + radius * cosSin.cos;
            var y = context.y - radius * cosSin.sin;
            var halfWidth = .5 * context.textWidth;
            var textHeight = context.textHeight;
            var textY = context.textY;
            if (_abs(x - context.x) > indent) {
                x += x < context.x ? -halfWidth : halfWidth
            }
            if (_abs(y - context.y) <= indent) {
                y -= textY + .5 * textHeight
            } else {
                y -= y < context.y ? textY + textHeight : textY
            }
            var text = _formatValue(this._value, context.formatOptions, {
                index: this.index
            });
            var visibility = "" === text ? "hidden" : null;
            this._text.attr({
                text: text,
                x: x,
                y: y,
                visibility: visibility
            });
            this._line.attr({
                visibility: visibility
            });
            this._line.rotate(_convertAngleToRendererSpace(angle), context.x, context.y)
        }
        return this
    },
    hideLabel: function() {
        this._text.attr({
            visibility: "hidden"
        });
        this._line.attr({
            visibility: "hidden"
        })
    },
    checkIntersect: function(anotherBar) {
        var coords = this.calculateLabelCoords();
        var anotherCoords = anotherBar.calculateLabelCoords();
        if (!coords || !anotherCoords) {
            return false
        }
        var width = Math.max(0, Math.min(coords.bottomRight.x, anotherCoords.bottomRight.x) - Math.max(coords.topLeft.x, anotherCoords.topLeft.x));
        var height = Math.max(0, Math.min(coords.bottomRight.y, anotherCoords.bottomRight.y) - Math.max(coords.topLeft.y, anotherCoords.topLeft.y));
        return width * height !== 0
    },
    calculateLabelCoords: function() {
        if (!this._text) {
            return
        }
        var box = this._text.getBBox();
        return {
            topLeft: {
                x: box.x,
                y: box.y
            },
            bottomRight: {
                x: box.x + box.width,
                y: box.y + box.height
            }
        }
    },
    _processValue: function(value) {
        return this._context.translator.translate(this._context.translator.adjust(value))
    },
    applyValue() {
        if (!this._visible) {
            return this
        }
        return this.setAngle(this._processValue(this.getValue()))
    },
    update(_ref) {
        var {
            color: color,
            value: value
        } = _ref;
        this._color = color;
        this._value = value
    },
    hide() {
        this._visible = false
    },
    getColor() {
        return this._color
    },
    getValue() {
        return this._value
    },
    beginAnimation: function() {
        if (!this._visible) {
            return this
        }
        var angle = this._processValue(this.getValue());
        if (!compareFloats(this._angle, angle)) {
            this._start = this._angle;
            this._delta = angle - this._angle;
            this._tracker.attr({
                visibility: "hidden"
            });
            if (this._context.textEnabled) {
                this._line.attr({
                    visibility: "hidden"
                });
                this._text.attr({
                    visibility: "hidden"
                })
            }
        } else {
            this.animate = _noop;
            this.setAngle(this._angle)
        }
    },
    animate: function(pos) {
        if (!this._visible) {
            return this
        }
        this._angle = this._start + this._delta * pos;
        setAngles(this._settings, this._context.baseAngle, this._angle);
        this._bar.attr(this._settings)
    },
    endAnimation: function() {
        if (void 0 !== this._delta) {
            if (compareFloats(this._angle, this._start + this._delta)) {
                this._tracker.attr({
                    visibility: null
                });
                this.setAngle(this._angle)
            }
        } else {
            delete this.animate
        }
        delete this._start;
        delete this._delta
    }
});

function setAngles(target, angle1, angle2) {
    target.startAngle = angle1 < angle2 ? angle1 : angle2;
    target.endAngle = angle1 < angle2 ? angle2 : angle1
}

function compareFloats(value1, value2) {
    return _abs(value1 - value2) < 1e-4
}

function getStartCoordsArc(x, y, innerR, outerR, startAngleCos, startAngleSin) {
    return {
        x: (x + outerR * startAngleCos).toFixed(ARC_COORD_PREC),
        y: (y - outerR * startAngleSin).toFixed(ARC_COORD_PREC)
    }
}
registerComponent("dxBarGauge", dxBarGauge);
dxBarGauge.addPlugin(pluginLegend);
dxBarGauge.addPlugin(centerTemplatePlugins.gauge);
