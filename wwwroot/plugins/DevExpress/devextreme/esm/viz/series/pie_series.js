/**
 * DevExtreme (esm/viz/series/pie_series.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    noop
} from "../../core/utils/common";
import {
    each
} from "../../core/utils/iterator";
import {
    chart
} from "./scatter_series";
import {
    normalizeAngle,
    map,
    extractColor
} from "../core/utils";
import {
    extend
} from "../../core/utils/extend";
import {
    chart as barChart
} from "./bar_series";
var chartScatterSeries = chart;
var barSeries = barChart.bar;
var _extend = extend;
var _each = each;
var _noop = noop;
var _map = map;
var _isFinite = isFinite;
var _max = Math.max;
var ANIMATION_DURATION = .7;
var INSIDE = "inside";
export var pie = _extend({}, barSeries, {
    _setGroupsSettings: function() {
        chartScatterSeries._setGroupsSettings.apply(this, arguments);
        this._labelsGroup.attr({
            "pointer-events": null
        })
    },
    _createErrorBarGroup: _noop,
    _drawPoint: function(options) {
        var point = options.point;
        var legendCallback = this._legendCallback;
        chartScatterSeries._drawPoint.call(this, options);
        !point.isVisible() && point.setInvisibility();
        point.isSelected() && legendCallback()
    },
    _getOldPoint: function(data, oldPointsByArgument, index) {
        var point = (this._points || [])[index];
        if (point) {
            oldPointsByArgument[point.argument.valueOf()] = oldPointsByArgument[point.argument.valueOf()].filter(p => p !== point)
        }
        return point
    },
    adjustLabels: function(moveLabelsFromCenter) {
        return (this._points || []).reduce((r, p) => {
            if (p._label.isVisible()) {
                p.setLabelTrackerData();
                r = p.applyWordWrap(moveLabelsFromCenter) || r;
                p.updateLabelCoord(moveLabelsFromCenter);
                return r
            }
        }, false)
    },
    _applyElementsClipRect: _noop,
    getColor: _noop,
    areErrorBarsVisible: _noop,
    drawLabelsWOPoints: function() {
        if (this._options.label.position === INSIDE) {
            return false
        }
        this._labelsGroup.append(this._extGroups.labelsGroup);
        (this._points || []).forEach((function(point) {
            point.drawLabel()
        }));
        return true
    },
    getPointsCount: function() {
        return this._data.filter(d => this._checkData(d)).length
    },
    setMaxPointsCount: function(count) {
        this._pointsCount = count
    },
    _getCreatingPointOptions: function(data, dataIndex) {
        return this._getPointOptions(data, dataIndex)
    },
    _updateOptions: function(options) {
        this.labelSpace = 0;
        this.innerRadius = "pie" === this.type ? 0 : options.innerRadius
    },
    _checkData: function(data, skippedFields) {
        var base = barSeries._checkData.call(this, data, skippedFields, {
            value: this.getValueFields()[0]
        });
        return this._options.paintNullPoints ? base : base && null !== data.value
    },
    _createGroups: chartScatterSeries._createGroups,
    _setMarkerGroupSettings: function() {
        this._markersGroup.attr({
            class: "dxc-markers"
        })
    },
    _getMainColor(data, point) {
        var pointsByArg = this.getPointsByArg(data.argument);
        var argumentIndex = point ? pointsByArg.indexOf(point) : pointsByArg.length;
        return this._options.mainSeriesColor(data.argument, argumentIndex, this._pointsCount)
    },
    _getPointOptions: function(data) {
        return this._parsePointOptions(this._preparePointOptions(), this._options.label, data)
    },
    _getRangeData: function() {
        return this._rangeData
    },
    _createPointStyles: function(pointOptions, data, point) {
        var _pointOptions$color;
        var mainColor = extractColor(pointOptions.color, true) || this._getMainColor(data, point);
        var colorId = null === (_pointOptions$color = pointOptions.color) || void 0 === _pointOptions$color ? void 0 : _pointOptions$color.fillId;
        var hoverStyle = pointOptions.hoverStyle || {};
        var selectionStyle = pointOptions.selectionStyle || {};
        if (colorId) {
            this._turnOffHatching(hoverStyle, selectionStyle)
        }
        return {
            labelColor: mainColor,
            normal: this._parsePointStyle(pointOptions, mainColor, mainColor),
            hover: this._parsePointStyle(hoverStyle, colorId || mainColor, mainColor),
            selection: this._parsePointStyle(selectionStyle, colorId || mainColor, mainColor),
            legendStyles: {
                normal: this._createLegendState(pointOptions, mainColor),
                hover: this._createLegendState(hoverStyle, colorId || mainColor),
                selection: this._createLegendState(selectionStyle, colorId || mainColor)
            }
        }
    },
    _getArrangeMinShownValue: function(points, total) {
        var minSegmentSize = this._options.minSegmentSize;
        var totalMinSegmentSize = 0;
        var totalNotMinValues = 0;
        total = total || points.length;
        _each(points, (function(_, point) {
            if (point.isVisible()) {
                if (point.normalInitialValue < minSegmentSize * total / 360) {
                    totalMinSegmentSize += minSegmentSize
                } else {
                    totalNotMinValues += point.normalInitialValue
                }
            }
        }));
        return totalMinSegmentSize < 360 ? minSegmentSize * totalNotMinValues / (360 - totalMinSegmentSize) : 0
    },
    _applyArrangeCorrection: function(points, minShownValue, total) {
        var options = this._options;
        var isClockWise = "anticlockwise" !== options.segmentsDirection;
        var shiftedAngle = _isFinite(options.startAngle) ? normalizeAngle(options.startAngle) : 0;
        var minSegmentSize = options.minSegmentSize;
        var percent;
        var correction = 0;
        var zeroTotalCorrection = 0;
        if (0 === total) {
            total = points.filter((function(el) {
                return el.isVisible()
            })).length;
            zeroTotalCorrection = 1
        }
        _each(isClockWise ? points : points.concat([]).reverse(), (function(_, point) {
            var val = point.isVisible() ? zeroTotalCorrection || point.normalInitialValue : 0;
            var updatedZeroValue;
            if (minSegmentSize && point.isVisible() && val < minShownValue) {
                updatedZeroValue = minShownValue
            }
            percent = val / total;
            point.correctValue(correction, percent, zeroTotalCorrection + (updatedZeroValue || 0));
            point.shiftedAngle = shiftedAngle;
            correction += updatedZeroValue || val
        }));
        this._rangeData = {
            val: {
                min: 0,
                max: correction
            }
        }
    },
    _removePoint: function(point) {
        var points = this.getPointsByArg(point.argument);
        points.splice(points.indexOf(point), 1);
        point.dispose()
    },
    arrangePoints: function() {
        var that = this;
        var originalPoints = that._points || [];
        var minSegmentSize = that._options.minSegmentSize;
        var minShownValue;
        var isAllPointsNegative = true;
        var i = 0;
        var len = originalPoints.length;
        while (i < len && isAllPointsNegative) {
            isAllPointsNegative = originalPoints[i].value <= 0;
            i++
        }
        var points = that._points = _map(originalPoints, (function(point) {
            if (null === point.value || !isAllPointsNegative && point.value < 0) {
                that._removePoint(point);
                return null
            } else {
                return point
            }
        }));
        var maxValue = points.reduce((function(max, p) {
            return _max(max, Math.abs(p.initialValue))
        }), 0);
        points.forEach((function(p) {
            p.normalInitialValue = p.initialValue / (0 !== maxValue ? maxValue : 1)
        }));
        var total = points.reduce((function(total, point) {
            return total + (point.isVisible() ? point.normalInitialValue : 0)
        }), 0);
        if (minSegmentSize) {
            minShownValue = this._getArrangeMinShownValue(points, total)
        }
        that._applyArrangeCorrection(points, minShownValue, total)
    },
    correctPosition: function(correction, canvas) {
        _each(this._points, (function(_, point) {
            point.correctPosition(correction)
        }));
        this.setVisibleArea(canvas)
    },
    correctRadius: function(correction) {
        this._points.forEach((function(point) {
            point.correctRadius(correction)
        }))
    },
    correctLabelRadius: function(labelRadius) {
        this._points.forEach((function(point) {
            point.correctLabelRadius(labelRadius)
        }))
    },
    setVisibleArea: function(canvas) {
        this._visibleArea = {
            minX: canvas.left,
            maxX: canvas.width - canvas.right,
            minY: canvas.top,
            maxY: canvas.height - canvas.bottom
        }
    },
    _applyVisibleArea: _noop,
    _animate: function(firstDrawing) {
        var that = this;
        var points = that._points;
        var pointsCount = points && points.length;
        var completeFunc = function() {
            that._animateComplete()
        };
        var animatePoint;
        if (firstDrawing) {
            animatePoint = function(p, i) {
                p.animate(i === pointsCount - 1 ? completeFunc : void 0, ANIMATION_DURATION, (1 - ANIMATION_DURATION) * i / (pointsCount - 1))
            }
        } else {
            animatePoint = function(p, i) {
                p.animate(i === pointsCount - 1 ? completeFunc : void 0)
            }
        }
        points.forEach(animatePoint)
    },
    getVisiblePoints: function() {
        return _map(this._points, (function(p) {
            return p.isVisible() ? p : null
        }))
    },
    getPointsByKeys: function(arg, argumentIndex) {
        var pointsByArg = this.getPointsByArg(arg);
        return pointsByArg[argumentIndex] && [pointsByArg[argumentIndex]] || []
    }
});
export var doughnut = pie;
export var donut = pie;
