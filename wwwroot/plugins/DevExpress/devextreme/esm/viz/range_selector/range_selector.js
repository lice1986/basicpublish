/**
 * DevExtreme (esm/viz/range_selector/range_selector.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import registerComponent from "../../core/component_registrator";
import {
    isDefined as _isDefined,
    isNumeric as _isNumber,
    isDate as _isDate,
    type as _type,
    isFunction,
    isPlainObject
} from "../../core/utils/type";
import {
    extend
} from "../../core/utils/extend";
import {
    each
} from "../../core/utils/iterator";
import {
    patchFontOptions,
    normalizeEnum as _normalizeEnum,
    getVizRangeObject as parseValue,
    convertVisualRangeObject,
    getCategoriesInfo,
    getLog,
    rangesAreEqual
} from "../core/utils";
import dateUtils from "../../core/utils/date";
import {
    adjust
} from "../../core/utils/math";
import {
    Range
} from "../translators/range";
import {
    Axis
} from "../axes/base_axis";
import {
    correctValueType,
    getParser
} from "../components/parse_utils";
import formatHelper from "../../format_helper";
import {
    consts,
    formatValue,
    HEIGHT_COMPACT_MODE
} from "./common";
import {
    SlidersController
} from "./sliders_controller";
import {
    Tracker
} from "./tracker";
import {
    RangeView
} from "./range_view";
import {
    SeriesDataSource
} from "./series_data_source";
import {
    tickGenerator
} from "../axes/tick_generator";
import constants from "../axes/axes_constants";
import baseWidgetModule from "../../__internal/viz/core/m_base_widget";
var _max = Math.max;
var _ceil = Math.ceil;
var _floor = Math.floor;
var START_VALUE = "startValue";
var END_VALUE = "endValue";
var DATETIME = "datetime";
var VALUE = "value";
var DISCRETE = "discrete";
var SEMIDISCRETE = "semidiscrete";
var STRING = "string";
var VALUE_CHANGED = VALUE + "Changed";
var CONTAINER_BACKGROUND_COLOR = "containerBackgroundColor";
var SLIDER_MARKER = "sliderMarker";
var OPTION_BACKGROUND = "background";
var LOGARITHMIC = "logarithmic";
var KEEP = "keep";
var SHIFT = "shift";
var RESET = "reset";
var INVISIBLE_POS = -1e3;
var SEMIDISCRETE_GRID_SPACING_FACTOR = 50;
var DEFAULT_AXIS_DIVISION_FACTOR = 30;
var DEFAULT_MINOR_AXIS_DIVISION_FACTOR = 15;
var logarithmBase = 10;

function calculateMarkerHeight(renderer, value, sliderMarkerOptions) {
    var formattedText = void 0 === value ? consts.emptySliderMarkerText : formatValue(value, sliderMarkerOptions);
    var textBBox = getTextBBox(renderer, formattedText, sliderMarkerOptions.font);
    return _ceil(textBBox.height) + 2 * sliderMarkerOptions.paddingTopBottom + consts.pointerSize
}

function calculateScaleLabelHalfWidth(renderer, value, scaleOptions, tickIntervalsInfo) {
    var formattedText = formatValue(value, scaleOptions.label, tickIntervalsInfo, scaleOptions.valueType, scaleOptions.type, scaleOptions.logarithmBase);
    var textBBox = getTextBBox(renderer, formattedText, scaleOptions.label.font);
    return _ceil(textBBox.width / 2)
}

function calculateIndents(renderer, scale, sliderMarkerOptions, indentOptions, tickIntervalsInfo) {
    var leftMarkerHeight;
    var leftScaleLabelWidth = 0;
    var rightScaleLabelWidth = 0;
    var rightMarkerHeight;
    var placeholderWidthLeft;
    var placeholderWidthRight;
    var placeholderHeight;
    var ticks = "semidiscrete" === scale.type ? scale.customTicks : tickIntervalsInfo.ticks;
    var startTickValue;
    var endTickValue;
    indentOptions = indentOptions || {};
    placeholderWidthLeft = indentOptions.left;
    placeholderWidthRight = indentOptions.right;
    placeholderHeight = sliderMarkerOptions.placeholderHeight;
    if (sliderMarkerOptions.visible) {
        leftMarkerHeight = calculateMarkerHeight(renderer, scale.startValue, sliderMarkerOptions);
        rightMarkerHeight = calculateMarkerHeight(renderer, scale.endValue, sliderMarkerOptions);
        if (void 0 === placeholderHeight) {
            placeholderHeight = _max(leftMarkerHeight, rightMarkerHeight)
        }
    }
    if (scale.label.visible) {
        startTickValue = _isDefined(scale.startValue) ? ticks[0] : void 0;
        endTickValue = _isDefined(scale.endValue) ? ticks[ticks.length - 1] : void 0;
        leftScaleLabelWidth = calculateScaleLabelHalfWidth(renderer, startTickValue, scale, tickIntervalsInfo);
        rightScaleLabelWidth = calculateScaleLabelHalfWidth(renderer, endTickValue, scale, tickIntervalsInfo)
    }
    placeholderWidthLeft = void 0 !== placeholderWidthLeft ? placeholderWidthLeft : leftScaleLabelWidth;
    placeholderWidthRight = (void 0 !== placeholderWidthRight ? placeholderWidthRight : rightScaleLabelWidth) || 1;
    return {
        left: placeholderWidthLeft,
        right: placeholderWidthRight,
        top: placeholderHeight || 0,
        bottom: 0
    }
}

function calculateValueType(firstValue, secondValue) {
    var typeFirstValue = _type(firstValue);
    var typeSecondValue = _type(secondValue);
    var validType = function(type) {
        return typeFirstValue === type || typeSecondValue === type
    };
    return validType("date") ? DATETIME : validType("number") ? "numeric" : validType(STRING) ? STRING : ""
}

function showScaleMarkers(scaleOptions) {
    return scaleOptions.valueType === DATETIME && scaleOptions.marker.visible
}

function updateTranslatorRangeInterval(translatorRange, scaleOptions) {
    var intervalX = scaleOptions.minorTickInterval || scaleOptions.tickInterval;
    if ("datetime" === scaleOptions.valueType) {
        intervalX = dateUtils.dateToMilliseconds(intervalX)
    }
    translatorRange.addRange({
        interval: intervalX
    })
}

function checkLogarithmicOptions(options, defaultLogarithmBase, incidentOccurred) {
    if (!options) {
        return
    }
    var logarithmBase = options.logarithmBase;
    if (options.type === LOGARITHMIC && logarithmBase <= 0 || logarithmBase && !_isNumber(logarithmBase)) {
        options.logarithmBase = defaultLogarithmBase;
        incidentOccurred("E2104")
    } else if (options.type !== LOGARITHMIC) {
        options.logarithmBase = void 0
    }
}

function calculateScaleAreaHeight(renderer, scaleOptions, visibleMarkers, tickIntervalsInfo) {
    var labelScaleOptions = scaleOptions.label;
    var markerScaleOptions = scaleOptions.marker;
    var placeholderHeight = scaleOptions.placeholderHeight;
    var ticks = "semidiscrete" === scaleOptions.type ? scaleOptions.customTicks : tickIntervalsInfo.ticks;
    var text = formatValue(ticks[0], labelScaleOptions);
    if (placeholderHeight) {
        return placeholderHeight
    } else {
        return (labelScaleOptions.visible ? labelScaleOptions.topIndent + getTextBBox(renderer, text, labelScaleOptions.font).height : 0) + (visibleMarkers ? markerScaleOptions.topIndent + markerScaleOptions.separatorHeight : 0)
    }
}

function getMinorTickIntervalUnit(tickInterval, minorTickInterval, withCorrection) {
    var interval = dateUtils.getDateUnitInterval(minorTickInterval);
    var majorUnit = dateUtils.getDateUnitInterval(tickInterval);
    var idx = dateUtils.dateUnitIntervals.indexOf(interval);
    if (withCorrection && interval === majorUnit && idx > 0) {
        interval = dateUtils.dateUnitIntervals[idx - 1]
    }
    return interval
}

function getNextTickInterval(tickInterval, minorTickInterval, isDateType) {
    if (!tickInterval) {
        tickInterval = minorTickInterval
    } else if (isDateType) {
        tickInterval = dateUtils.getNextDateUnit(tickInterval)
    } else {
        tickInterval += minorTickInterval
    }
    return tickInterval
}

function calculateTickIntervalsForSemidiscreteScale(scaleOptions, min, max, screenDelta) {
    var minorTickInterval = scaleOptions.minorTickInterval;
    var tickInterval = scaleOptions.tickInterval;
    var interval;
    var isDateType = "datetime" === scaleOptions.valueType;
    var gridSpacingFactor = scaleOptions.axisDivisionFactor || {};
    var tickCountByInterval;
    var tickCountByScreen;
    if (!tickInterval) {
        do {
            interval = getNextTickInterval(tickInterval, minorTickInterval, isDateType);
            if (tickInterval !== interval) {
                tickInterval = interval
            } else {
                break
            }
            if (isDateType) {
                interval = dateUtils.dateToMilliseconds(tickInterval)
            }
            tickCountByInterval = _ceil((max - min) / interval);
            tickCountByScreen = _floor(screenDelta / (gridSpacingFactor[tickInterval] || SEMIDISCRETE_GRID_SPACING_FACTOR)) || 1
        } while (interval && tickCountByInterval > tickCountByScreen)
    }
    return {
        tickInterval: tickInterval,
        minorTickInterval: minorTickInterval,
        bounds: {
            minVisible: min,
            maxVisible: max
        },
        ticks: []
    }
}

function updateTickIntervals(scaleOptions, screenDelta, incidentOccurred, range) {
    var result;
    var min = _isDefined(range.minVisible) ? range.minVisible : range.min;
    var max = _isDefined(range.maxVisible) ? range.maxVisible : range.max;
    var categoriesInfo = scaleOptions._categoriesInfo;
    var ticksInfo;
    var length;
    var bounds = {};
    if (scaleOptions.type === SEMIDISCRETE) {
        result = calculateTickIntervalsForSemidiscreteScale(scaleOptions, min, max, screenDelta)
    } else {
        ticksInfo = tickGenerator({
            axisType: scaleOptions.type,
            dataType: scaleOptions.valueType,
            logBase: scaleOptions.logarithmBase,
            allowNegatives: true,
            linearThreshold: Math.abs(scaleOptions.linearThreshold || 0),
            axisDivisionFactor: scaleOptions.axisDivisionFactor,
            minorAxisDivisionFactor: scaleOptions.minorAxisDivisionFactor,
            calculateMinors: true,
            allowDecimals: scaleOptions.allowDecimals,
            endOnTick: scaleOptions.endOnTick,
            incidentOccurred: incidentOccurred,
            rangeIsEmpty: range.isEmpty()
        })({
            min: min,
            max: max,
            categories: _isDefined(categoriesInfo) ? categoriesInfo.categories : []
        }, screenDelta, scaleOptions.tickInterval, scaleOptions.forceUserTickInterval, void 0, scaleOptions.minorTickInterval, scaleOptions.minorTickCount);
        length = ticksInfo.ticks.length;
        bounds.minVisible = ticksInfo.ticks[0] < min ? ticksInfo.ticks[0] : min;
        bounds.maxVisible = ticksInfo.ticks[length - 1] > max ? ticksInfo.ticks[length - 1] : max;
        result = {
            tickInterval: ticksInfo.tickInterval,
            minorTickInterval: 0 === scaleOptions.minorTickInterval ? 0 : ticksInfo.minorTickInterval,
            bounds: bounds,
            ticks: ticksInfo.ticks
        }
    }
    return result
}

function getFirstDayOfWeek(options) {
    var _options$workWeek;
    return null === (_options$workWeek = options.workWeek) || void 0 === _options$workWeek ? void 0 : _options$workWeek[0]
}

function calculateTranslatorRange(seriesDataSource, scaleOptions) {
    var minValue;
    var maxValue;
    var inverted = false;
    var startValue = scaleOptions.startValue;
    var endValue = scaleOptions.endValue;
    var categories;
    var categoriesInfo;
    var translatorRange = seriesDataSource ? seriesDataSource.getBoundRange().arg : new Range;
    var rangeForCategories;
    var isDate = "datetime" === scaleOptions.valueType;
    var firstDayOfWeek = getFirstDayOfWeek(scaleOptions);
    var minRange = scaleOptions.minRange;
    if (scaleOptions.type === DISCRETE) {
        rangeForCategories = new Range({
            minVisible: startValue,
            maxVisible: endValue
        });
        rangeForCategories.addRange(translatorRange);
        translatorRange = rangeForCategories;
        categories = seriesDataSource ? seriesDataSource.argCategories : scaleOptions.categories || startValue && endValue && [startValue, endValue];
        categories = categories || [];
        scaleOptions._categoriesInfo = categoriesInfo = getCategoriesInfo(categories, startValue, endValue)
    }
    if (scaleOptions.type === SEMIDISCRETE) {
        startValue = scaleOptions.startValue = correctValueByInterval(scaleOptions.startValue, isDate, minRange, firstDayOfWeek);
        endValue = scaleOptions.endValue = correctValueByInterval(scaleOptions.endValue, isDate, minRange, firstDayOfWeek);
        translatorRange.minVisible = correctValueByInterval(translatorRange.minVisible, isDate, minRange, firstDayOfWeek);
        translatorRange.maxVisible = correctValueByInterval(translatorRange.maxVisible, isDate, minRange, firstDayOfWeek);
        translatorRange.min = correctValueByInterval(translatorRange.min, isDate, minRange, firstDayOfWeek);
        translatorRange.max = correctValueByInterval(translatorRange.max, isDate, minRange, firstDayOfWeek)
    }
    if (_isDefined(startValue) && _isDefined(endValue)) {
        inverted = categoriesInfo ? categoriesInfo.inverted : startValue > endValue;
        minValue = categoriesInfo ? categoriesInfo.start : inverted ? endValue : startValue;
        maxValue = categoriesInfo ? categoriesInfo.end : inverted ? startValue : endValue
    } else if (_isDefined(startValue) || _isDefined(endValue)) {
        minValue = startValue;
        maxValue = endValue
    } else if (categoriesInfo) {
        minValue = categoriesInfo.start;
        maxValue = categoriesInfo.end
    }
    translatorRange.addRange({
        invert: inverted,
        min: minValue,
        max: maxValue,
        minVisible: minValue,
        maxVisible: maxValue,
        dataType: scaleOptions.valueType
    });
    translatorRange.addRange({
        categories: !seriesDataSource ? categories : void 0,
        base: scaleOptions.logarithmBase,
        axisType: scaleOptions.type,
        dataType: scaleOptions.valueType
    });
    seriesDataSource && translatorRange.sortCategories(categories);
    return translatorRange
}

function startEndNotDefined(start, end) {
    return !_isDefined(start) || !_isDefined(end)
}

function getTextBBox(renderer, text, fontOptions) {
    var textElement = renderer.text(text, INVISIBLE_POS, INVISIBLE_POS).css(patchFontOptions(fontOptions)).append(renderer.root);
    var textBBox = textElement.getBBox();
    textElement.remove();
    return textBBox
}

function getDateMarkerVisibilityChecker(screenDelta) {
    return function(isDateScale, isMarkerVisible, min, max, tickInterval) {
        if (isMarkerVisible && isDateScale) {
            if (!_isDefined(tickInterval) || tickInterval.years || tickInterval.months >= 6 || screenDelta / SEMIDISCRETE_GRID_SPACING_FACTOR < _ceil((max - min) / dateUtils.dateToMilliseconds("year")) + 1) {
                isMarkerVisible = false
            }
        }
        return isMarkerVisible
    }
}

function updateScaleOptions(scaleOptions, seriesDataSource, translatorRange, tickIntervalsInfo, checkDateMarkerVisibility) {
    var bounds;
    var isEmptyInterval;
    var categoriesInfo = scaleOptions._categoriesInfo;
    var intervals;
    var isDateTime = scaleOptions.valueType === DATETIME;
    if (seriesDataSource && !seriesDataSource.isEmpty() && !translatorRange.isEmpty()) {
        bounds = tickIntervalsInfo.bounds;
        translatorRange.addRange(bounds);
        scaleOptions.startValue = translatorRange.invert ? bounds.maxVisible : bounds.minVisible;
        scaleOptions.endValue = translatorRange.invert ? bounds.minVisible : bounds.maxVisible
    }
    scaleOptions.marker.visible = checkDateMarkerVisibility(isDateTime && -1 === scaleOptions.type.indexOf(DISCRETE), scaleOptions.marker.visible, scaleOptions.startValue, scaleOptions.endValue, tickIntervalsInfo.tickInterval);
    if (categoriesInfo) {
        scaleOptions.startValue = categoriesInfo.start;
        scaleOptions.endValue = categoriesInfo.end
    }
    if (-1 === scaleOptions.type.indexOf(DISCRETE)) {
        isEmptyInterval = _isDate(scaleOptions.startValue) && _isDate(scaleOptions.endValue) && scaleOptions.startValue.getTime() === scaleOptions.endValue.getTime() || scaleOptions.startValue === scaleOptions.endValue
    }
    scaleOptions.isEmpty = startEndNotDefined(scaleOptions.startValue, scaleOptions.endValue) || isEmptyInterval;
    if (scaleOptions.isEmpty) {
        scaleOptions.startValue = scaleOptions.endValue = void 0
    } else {
        scaleOptions.minorTickInterval = tickIntervalsInfo.minorTickInterval;
        scaleOptions.tickInterval = tickIntervalsInfo.tickInterval;
        if (isDateTime && (!_isDefined(scaleOptions.label.format) || scaleOptions.type === SEMIDISCRETE && scaleOptions.minorTickInterval !== scaleOptions.tickInterval)) {
            if (scaleOptions.type === DISCRETE) {
                scaleOptions.label.format = formatHelper.getDateFormatByTicks(tickIntervalsInfo.ticks)
            } else if (!scaleOptions.marker.visible) {
                scaleOptions.label.format = formatHelper.getDateFormatByTickInterval(scaleOptions.startValue, scaleOptions.endValue, scaleOptions.tickInterval)
            } else {
                scaleOptions.label.format = dateUtils.getDateFormatByTickInterval(scaleOptions.tickInterval)
            }
        }
    }
    if (scaleOptions.type === SEMIDISCRETE) {
        intervals = getIntervalCustomTicks(scaleOptions);
        scaleOptions.customMinorTicks = intervals.altIntervals;
        scaleOptions.customTicks = intervals.intervals;
        scaleOptions.customBoundTicks = [scaleOptions.customTicks[0]]
    }
}

function prepareScaleOptions(scaleOption, calculatedValueType, incidentOccurred, containerColor) {
    var parsedValue = 0;
    var valueType = correctValueType(_normalizeEnum(scaleOption.valueType));
    var validateStartEndValues = function(field, parser) {
        var messageToIncidentOccurred = field === START_VALUE ? "start" : "end";
        if (_isDefined(scaleOption[field])) {
            parsedValue = parser(scaleOption[field]);
            if (_isDefined(parsedValue)) {
                scaleOption[field] = parsedValue
            } else {
                scaleOption[field] = void 0;
                incidentOccurred("E2202", [messageToIncidentOccurred])
            }
        }
    };
    valueType = calculatedValueType || valueType;
    if (!valueType) {
        valueType = calculateValueType(scaleOption.startValue, scaleOption.endValue) || "numeric"
    }
    if (valueType === STRING || scaleOption.categories) {
        scaleOption.type = DISCRETE;
        valueType = STRING
    }
    scaleOption.containerColor = containerColor;
    scaleOption.valueType = valueType;
    scaleOption.dataType = valueType;
    var parser = getParser(valueType);
    validateStartEndValues(START_VALUE, parser);
    validateStartEndValues(END_VALUE, parser);
    checkLogarithmicOptions(scaleOption, logarithmBase, incidentOccurred);
    if (!scaleOption.type) {
        scaleOption.type = "continuous"
    }
    scaleOption.parser = parser;
    if (scaleOption.type === SEMIDISCRETE) {
        scaleOption.minorTick.visible = false;
        scaleOption.minorTickInterval = scaleOption.minRange;
        scaleOption.marker.visible = false;
        scaleOption.maxRange = void 0
    }
    scaleOption.forceUserTickInterval |= _isDefined(scaleOption.tickInterval) && !_isDefined(scaleOption.axisDivisionFactor);
    scaleOption.axisDivisionFactor = _isDefined(scaleOption.axisDivisionFactor) ? scaleOption.axisDivisionFactor : DEFAULT_AXIS_DIVISION_FACTOR;
    scaleOption.minorAxisDivisionFactor = _isDefined(scaleOption.minorAxisDivisionFactor) ? scaleOption.minorAxisDivisionFactor : DEFAULT_MINOR_AXIS_DIVISION_FACTOR;
    return scaleOption
}

function correctValueByInterval(value, isDate, interval, firstDayOfWeek) {
    if (_isDefined(value)) {
        value = isDate ? dateUtils.correctDateWithUnitBeginning(new Date(value), interval, null, firstDayOfWeek) : adjust(_floor(adjust(value / interval)) * interval)
    }
    return value
}

function getIntervalCustomTicks(options) {
    var min = options.startValue;
    var max = options.endValue;
    var isDate = "datetime" === options.valueType;
    var firstDayOfWeek = getFirstDayOfWeek(options);
    var tickInterval = options.tickInterval;
    var res = {
        intervals: []
    };
    if (!_isDefined(min) || !_isDefined(max)) {
        return res
    }
    res.intervals = dateUtils.getSequenceByInterval(min, max, options.minorTickInterval);
    if (tickInterval !== options.minorTickInterval) {
        res.altIntervals = res.intervals;
        min = correctValueByInterval(min, isDate, tickInterval, firstDayOfWeek);
        max = correctValueByInterval(max, isDate, tickInterval, firstDayOfWeek);
        res.intervals = dateUtils.getSequenceByInterval(min, max, tickInterval);
        res.intervals[0] = res.altIntervals[0]
    }
    return res
}

function getPrecisionForSlider(startValue, endValue, screenDelta) {
    var d = Math.abs(endValue - startValue) / screenDelta;
    var tail = d - _floor(d);
    return tail > 0 ? _ceil(Math.abs(adjust(getLog(tail, 10)))) : 0
}
var dxRangeSelector = baseWidgetModule.inherit({
    _toggleParentsScrollSubscription() {},
    _eventsMap: {
        onValueChanged: {
            name: VALUE_CHANGED
        }
    },
    _rootClassPrefix: "dxrs",
    _rootClass: "dxrs-range-selector",
    _dataIsReady: function() {
        return this._dataIsLoaded()
    },
    _initialChanges: ["DATA_SOURCE", "VALUE"],
    _themeDependentChanges: ["MOSTLY_TOTAL"],
    _themeSection: "rangeSelector",
    _fontFields: ["scale.label.font", "sliderMarker.font"],
    _setDeprecatedOptions() {
        this.callBase();
        extend(this._deprecatedOptions, {
            "behavior.callValueChanged": {
                since: "23.1",
                message: 'Use the "behavior.valueChangeMode" property instead'
            },
            "scale.aggregateByCategory": {
                since: "23.1",
                message: "Use the aggregation.enabled property"
            }
        })
    },
    _initCore: function() {
        var that = this;
        var renderer = that._renderer;
        var root = renderer.root;
        root.css({
            "touch-action": "pan-y"
        });
        that._clipRect = renderer.clipRect();
        var rangeViewGroup = renderer.g().attr({
            class: "dxrs-view"
        }).append(root);
        var slidersGroup = renderer.g().attr({
            class: "dxrs-slidersContainer",
            "clip-path": that._clipRect.id
        }).append(root);
        var scaleGroup = renderer.g().attr({
            class: "dxrs-scale",
            "clip-path": that._clipRect.id
        }).append(root);
        var labelsAxesGroup = renderer.g().attr({
            class: "dxrs-scale-elements",
            "clip-path": that._clipRect.id
        }).append(root);
        var scaleBreaksGroup = renderer.g().attr({
            class: "dxrs-scale-breaks"
        }).append(root);
        var trackersGroup = renderer.g().attr({
            class: "dxrs-trackers"
        }).append(root);
        that._axis = new AxisWrapper({
            renderer: renderer,
            root: scaleGroup,
            scaleBreaksGroup: scaleBreaksGroup,
            labelsAxesGroup: labelsAxesGroup,
            updateSelectedRange: function(range, e) {
                that.setValue(convertVisualRangeObject(range), e)
            },
            incidentOccurred: that._incidentOccurred
        });
        that._rangeView = new RangeView({
            renderer: renderer,
            root: rangeViewGroup,
            translator: that._axis.getTranslator()
        });
        that._slidersController = new SlidersController({
            renderer: renderer,
            root: slidersGroup,
            trackersGroup: trackersGroup,
            updateSelectedRange: function(range, lastSelectedRange, e) {
                if (!that._rangeOption) {
                    that.option(VALUE, convertVisualRangeObject(range, isPlainObject(that._options.silent(VALUE))))
                }
                that._eventTrigger(VALUE_CHANGED, {
                    value: convertVisualRangeObject(range),
                    previousValue: convertVisualRangeObject(lastSelectedRange),
                    event: e
                })
            },
            axis: that._axis,
            translator: that._axis.getTranslator()
        });
        that._tracker = new Tracker({
            renderer: renderer,
            controller: that._slidersController
        })
    },
    _getDefaultSize: function() {
        return {
            width: 400,
            height: 160
        }
    },
    _disposeCore: function() {
        this._axis.dispose();
        this._slidersController.dispose();
        this._tracker.dispose()
    },
    _applySize: function(rect) {
        this._clientRect = rect.slice();
        this._change(["MOSTLY_TOTAL"])
    },
    _optionChangesMap: {
        scale: "SCALE",
        value: "VALUE",
        dataSource: "DATA_SOURCE"
    },
    _optionChangesOrder: ["SCALE", "DATA_SOURCE"],
    _change_SCALE: function() {
        this._change(["MOSTLY_TOTAL"])
    },
    _setValueByDataSource() {
        var options = this._options.silent();
        var axis = this._axis;
        if (options.dataSource) {
            var selectedRangeUpdateMode = this.option("selectedRangeUpdateMode");
            var value = this.getValue();
            var valueIsReady = _isDefined(value[0]) && _isDefined(value[1]);
            if (_isDefined(selectedRangeUpdateMode)) {
                selectedRangeUpdateMode = _normalizeEnum(selectedRangeUpdateMode);
                this.__skipAnimation = true
            } else if (valueIsReady && !this._dataSourceIsAsync) {
                selectedRangeUpdateMode = RESET
            }
            if ("auto" === selectedRangeUpdateMode && valueIsReady) {
                var rangesInfo = axis.allScaleSelected(value);
                if (rangesInfo.startValue && rangesInfo.endValue) {
                    selectedRangeUpdateMode = RESET
                } else if (rangesInfo.endValue) {
                    selectedRangeUpdateMode = SHIFT
                } else {
                    selectedRangeUpdateMode = KEEP
                }
            }
            if (selectedRangeUpdateMode === RESET) {
                options[VALUE] = null
            } else if (selectedRangeUpdateMode === SHIFT && valueIsReady) {
                var _value = this.getValue();
                this.__skipAnimation = true;
                options[VALUE] = {
                    length: axis.getVisualRangeLength({
                        minVisible: _value[0],
                        maxVisible: _value[1]
                    })
                }
            } else if (selectedRangeUpdateMode === KEEP) {
                this.__skipAnimation = true
            }
        }
        this._dataSourceIsAsync = void 0
    },
    _change_DATA_SOURCE: function() {
        if (this._options.silent("dataSource")) {
            this._updateDataSource()
        }
    },
    _customChangesOrder: ["MOSTLY_TOTAL", "VALUE", "SLIDER_SELECTION"],
    _change_MOSTLY_TOTAL: function() {
        this._applyMostlyTotalChange()
    },
    _change_SLIDER_SELECTION: function() {
        var value = this._options.silent(VALUE);
        this._slidersController.setSelectedRange(value && parseValue(value))
    },
    _change_VALUE: function() {
        var option = this._rangeOption;
        this._dataSourceIsAsync = !this._dataIsReady();
        if (option) {
            this._options.silent(VALUE, option);
            this.setValue(option)
        }
    },
    _validateRange: function(start, end) {
        var ensureValueInvalid = value => _isDefined(value) && !this._axis.getTranslator().isValid(value);
        if (this._dataIsReady() && (ensureValueInvalid(start) || ensureValueInvalid(end))) {
            this._incidentOccurred("E2203")
        }
    },
    _applyChanges: function() {
        var that = this;
        var value = that._options.silent(VALUE);
        if (that._changes.has("VALUE") && value) {
            that._rangeOption = value
        }
        that.callBase.apply(that, arguments);
        that._rangeOption = null;
        that.__isResizing = that.__skipAnimation = false
    },
    _applyMostlyTotalChange: function() {
        var renderer = this._renderer;
        var rect = this._clientRect;
        var currentAnimationEnabled;
        var canvas = {
            left: rect[0],
            top: rect[1],
            width: rect[2] - rect[0],
            height: rect[3] - rect[1]
        };
        if (this.__isResizing || this.__skipAnimation) {
            currentAnimationEnabled = renderer.animationEnabled();
            renderer.updateAnimationOptions({
                enabled: false
            })
        }
        this._clipRect.attr({
            x: rect[0],
            y: rect[1],
            width: rect[2] - rect[0],
            height: rect[3] - rect[1]
        });
        this._axis.getTranslator().update(new Range, canvas, {
            isHorizontal: true
        });
        this._updateContent({
            left: rect[0],
            top: rect[1],
            width: rect[2] - rect[0],
            height: rect[3] - rect[1]
        });
        if (this.__isResizing || this.__skipAnimation) {
            renderer.updateAnimationOptions({
                enabled: currentAnimationEnabled
            })
        }
        this._drawn()
    },
    _dataSourceChangedHandler: function() {
        this._setValueByDataSource();
        this._requestChange(["MOSTLY_TOTAL"])
    },
    _completeSeriesDataSourceCreation(scaleOptions, seriesDataSource) {
        var rect = this._clientRect;
        var canvas = {
            left: rect[0],
            top: rect[1],
            width: rect[2] - rect[0],
            height: rect[3] - rect[1]
        };
        this._axis.updateOptions(extend({}, scaleOptions, {
            isHorizontal: true,
            label: {}
        }));
        seriesDataSource.isShowChart() && this._axis.setMarginOptions(seriesDataSource.getMarginOptions(canvas));
        this._axis.updateCanvas(canvas);
        seriesDataSource.createPoints()
    },
    _updateContent: function(canvas) {
        var chartOptions = this.option("chart");
        var seriesDataSource = this._createSeriesDataSource(chartOptions);
        var isCompactMode = !(seriesDataSource && seriesDataSource.isShowChart() || this.option("background.image.url"));
        var scaleOptions = prepareScaleOptions(this._getOption("scale"), seriesDataSource && seriesDataSource.getCalculatedValueType(), this._incidentOccurred, this._getOption("containerBackgroundColor", true));
        seriesDataSource && this._completeSeriesDataSourceCreation(scaleOptions, seriesDataSource);
        var argTranslatorRange = calculateTranslatorRange(seriesDataSource, scaleOptions);
        var tickIntervalsInfo = updateTickIntervals(scaleOptions, canvas.width, this._incidentOccurred, argTranslatorRange);
        var chartThemeManager = seriesDataSource && seriesDataSource.isShowChart() && seriesDataSource.getThemeManager();
        if (chartThemeManager) {
            checkLogarithmicOptions(chartOptions && chartOptions.valueAxis, chartThemeManager.getOptions("valueAxis").logarithmBase, this._incidentOccurred)
        }
        updateScaleOptions(scaleOptions, seriesDataSource, argTranslatorRange, tickIntervalsInfo, getDateMarkerVisibilityChecker(canvas.width));
        updateTranslatorRangeInterval(argTranslatorRange, scaleOptions);
        var sliderMarkerOptions = this._prepareSliderMarkersOptions(scaleOptions, canvas.width, tickIntervalsInfo, argTranslatorRange);
        var indents = calculateIndents(this._renderer, scaleOptions, sliderMarkerOptions, this.option("indent"), tickIntervalsInfo);
        var rangeContainerCanvas = {
            left: canvas.left + indents.left,
            top: canvas.top + indents.top,
            width: canvas.left + indents.left + _max(canvas.width - indents.left - indents.right, 1),
            height: _max(!isCompactMode ? canvas.height - indents.top - indents.bottom - calculateScaleAreaHeight(this._renderer, scaleOptions, showScaleMarkers(scaleOptions), tickIntervalsInfo) : HEIGHT_COMPACT_MODE, 0),
            right: 0,
            bottom: 0
        };
        this._axis.update(scaleOptions, isCompactMode, rangeContainerCanvas, argTranslatorRange, seriesDataSource);
        scaleOptions.minorTickInterval = scaleOptions.isEmpty ? 0 : scaleOptions.minorTickInterval;
        this._updateElements(scaleOptions, sliderMarkerOptions, isCompactMode, rangeContainerCanvas, seriesDataSource);
        if (chartThemeManager) {
            chartThemeManager.dispose()
        }
    },
    _updateElements: function(scaleOptions, sliderMarkerOptions, isCompactMode, canvas, seriesDataSource) {
        var behavior = this._getOption("behavior");
        var shutterOptions = this._getOption("shutter");
        var isNotSemiDiscrete = scaleOptions.type !== SEMIDISCRETE;
        shutterOptions.color = shutterOptions.color || this._getOption(CONTAINER_BACKGROUND_COLOR, true);
        this._rangeView.update(this.option("background"), this._themeManager.theme("background"), canvas, isCompactMode, behavior.animationEnabled && this._renderer.animationEnabled(), seriesDataSource);
        this._isUpdating = true;
        this._slidersController.update([canvas.top, canvas.top + canvas.height], behavior, isCompactMode, this._getOption("sliderHandle"), sliderMarkerOptions, shutterOptions, {
            minRange: isNotSemiDiscrete ? this.option("scale.minRange") : void 0,
            maxRange: isNotSemiDiscrete ? this.option("scale.maxRange") : void 0
        }, this._axis.getFullTicks(), this._getOption("selectedRangeColor", true));
        this._requestChange(["SLIDER_SELECTION"]);
        this._isUpdating = false;
        this._tracker.update(!this._axis.getTranslator().getBusinessRange().isEmpty(), behavior)
    },
    _createSeriesDataSource: function(chartOptions) {
        var seriesDataSource;
        var dataSource = this._dataSourceItems();
        var scaleOptions = this._getOption("scale");
        var valueType = scaleOptions.valueType || calculateValueType(scaleOptions.startValue, scaleOptions.endValue);
        var valueAxis = new Axis({
            renderer: this._renderer,
            axisType: "xyAxes",
            drawingType: "linear"
        });
        valueAxis.updateOptions({
            isHorizontal: false,
            label: {},
            categoriesSortingMethod: this._getOption("chart").valueAxis.categoriesSortingMethod
        });
        if (dataSource || chartOptions && chartOptions.series) {
            chartOptions = extend({}, chartOptions, {
                theme: this.option("theme")
            });
            seriesDataSource = new SeriesDataSource({
                renderer: this._renderer,
                dataSource: dataSource,
                valueType: _normalizeEnum(valueType),
                axisType: scaleOptions.type,
                chart: chartOptions,
                dataSourceField: this.option("dataSourceField"),
                incidentOccurred: this._incidentOccurred,
                categories: scaleOptions.categories,
                argumentAxis: this._axis,
                valueAxis: valueAxis
            })
        }
        return seriesDataSource
    },
    _prepareSliderMarkersOptions: function(scaleOptions, screenDelta, tickIntervalsInfo, argRange) {
        var minorTickInterval = tickIntervalsInfo.minorTickInterval;
        var tickInterval = tickIntervalsInfo.tickInterval;
        var interval = tickInterval;
        var endValue = scaleOptions.endValue;
        var startValue = scaleOptions.startValue;
        var sliderMarkerOptions = this._getOption(SLIDER_MARKER);
        var doNotSnap = !this._getOption("behavior").snapToTicks;
        var isTypeDiscrete = scaleOptions.type === DISCRETE;
        var isValueTypeDatetime = scaleOptions.valueType === DATETIME;
        sliderMarkerOptions.borderColor = this._getOption(CONTAINER_BACKGROUND_COLOR, true);
        if (!sliderMarkerOptions.format && !argRange.isEmpty()) {
            if (doNotSnap && _isNumber(scaleOptions.startValue)) {
                sliderMarkerOptions.format = {
                    type: "fixedPoint",
                    precision: getPrecisionForSlider(startValue, endValue, screenDelta)
                }
            }
            if (isValueTypeDatetime && !isTypeDiscrete) {
                if (_isDefined(minorTickInterval) && 0 !== minorTickInterval) {
                    interval = getMinorTickIntervalUnit(tickInterval, minorTickInterval, doNotSnap)
                }
                if (!scaleOptions.marker.visible) {
                    if (_isDefined(startValue) && _isDefined(endValue)) {
                        sliderMarkerOptions.format = formatHelper.getDateFormatByTickInterval(startValue, endValue, interval)
                    }
                } else {
                    sliderMarkerOptions.format = dateUtils.getDateFormatByTickInterval(interval)
                }
            }
            if (isValueTypeDatetime && isTypeDiscrete && tickIntervalsInfo.ticks.length) {
                sliderMarkerOptions.format = formatHelper.getDateFormatByTicks(tickIntervalsInfo.ticks)
            }
        }
        return sliderMarkerOptions
    },
    getValue: function() {
        return convertVisualRangeObject(this._slidersController.getSelectedRange())
    },
    setValue: function(value, e) {
        var visualRange = parseValue(value);
        if (!this._isUpdating && value) {
            this._validateRange(visualRange.startValue, visualRange.endValue);
            !rangesAreEqual(visualRange, this._slidersController.getSelectedRange()) && this._slidersController.setSelectedRange(visualRange, e)
        }
    },
    _setContentSize: function() {
        this.__isResizing = 2 === this._changes.count();
        this.callBase.apply(this, arguments)
    }
});
each(["selectedRangeColor", "containerBackgroundColor", "sliderMarker", "sliderHandle", "shutter", OPTION_BACKGROUND, "behavior", "chart", "indent"], (function(_, name) {
    dxRangeSelector.prototype._optionChangesMap[name] = "MOSTLY_TOTAL"
}));

function prepareAxisOptions(scaleOptions, isCompactMode, height, axisPosition) {
    scaleOptions.marker.label.font = scaleOptions.label.font;
    scaleOptions.color = scaleOptions.marker.color = scaleOptions.tick.color;
    scaleOptions.opacity = scaleOptions.marker.opacity = scaleOptions.tick.opacity;
    scaleOptions.width = scaleOptions.marker.width = scaleOptions.tick.width;
    scaleOptions.placeholderSize = (scaleOptions.placeholderHeight || 0) + axisPosition;
    scaleOptions.argumentType = scaleOptions.valueType;
    scaleOptions.visible = isCompactMode;
    scaleOptions.isHorizontal = true;
    scaleOptions.calculateMinors = true;
    scaleOptions.semiDiscreteInterval = scaleOptions.minRange;
    if (!isCompactMode) {
        scaleOptions.minorTick.length = scaleOptions.tick.length = height
    }
    scaleOptions.label.indentFromAxis = scaleOptions.label.topIndent + axisPosition;
    return scaleOptions
}

function createDateMarkersEvent(scaleOptions, markerTrackers, setSelectedRange) {
    each(markerTrackers, (function(_, value) {
        value.on("dxpointerdown", onPointerDown)
    }));

    function onPointerDown(e) {
        var range = e.target.range;
        var minRange = scaleOptions.minRange ? dateUtils.addInterval(range.startValue, scaleOptions.minRange) : void 0;
        var maxRange = scaleOptions.maxRange ? dateUtils.addInterval(range.startValue, scaleOptions.maxRange) : void 0;
        if (!(minRange && minRange > range.endValue || maxRange && maxRange < range.endValue)) {
            setSelectedRange(range, e)
        }
    }
}

function getSharpDirection() {
    return 1
}

function getTickStartPositionShift(length) {
    return length % 2 === 1 ? -_floor(length / 2) : -length / 2
}

function checkShiftedLabels(majorTicks, boxes, minSpacing, alignment) {
    function checkLabelsOverlapping(nearestLabelsIndexes) {
        if (2 === nearestLabelsIndexes.length && constants.areLabelsOverlap(boxes[nearestLabelsIndexes[0]], boxes[nearestLabelsIndexes[1]], minSpacing, alignment)) {
            majorTicks[nearestLabelsIndexes[0]].removeLabel()
        }
    }

    function getTwoVisibleLabels(startIndex) {
        var labels = [];
        for (var i = startIndex; labels.length < 2 && i < majorTicks.length; i++) {
            majorTicks[i].label && labels.push(i)
        }
        return labels
    }
    if (majorTicks.length < 3) {
        return
    }
    checkLabelsOverlapping(getTwoVisibleLabels(0));
    checkLabelsOverlapping(getTwoVisibleLabels(majorTicks.length - 2).reverse())
}

function AxisWrapper(params) {
    this._axis = new Axis({
        renderer: params.renderer,
        axesContainerGroup: params.root,
        scaleBreaksGroup: params.scaleBreaksGroup,
        labelsAxesGroup: params.labelsAxesGroup,
        incidentOccurred: params.incidentOccurred,
        axisType: "xyAxes",
        drawingType: "linear",
        widgetClass: "dxrs",
        axisClass: "range-selector",
        isArgumentAxis: true,
        getTemplate() {}
    });
    this._updateSelectedRangeCallback = params.updateSelectedRange;
    this._axis.getAxisSharpDirection = this._axis.getSharpDirectionByCoords = getSharpDirection;
    this._axis.getTickStartPositionShift = getTickStartPositionShift;
    this._axis._checkShiftedLabels = checkShiftedLabels
}
AxisWrapper.prototype = {
    constructor: AxisWrapper,
    update: function(options, isCompactMode, canvas, businessRange, seriesDataSource) {
        var axis = this._axis;
        axis.updateOptions(prepareAxisOptions(options, isCompactMode, canvas.height, canvas.height / 2 - _ceil(options.width / 2)));
        axis.validate();
        axis.setBusinessRange(businessRange, true);
        if (void 0 !== seriesDataSource && seriesDataSource.isShowChart()) {
            axis.setMarginOptions(seriesDataSource.getMarginOptions(canvas))
        }
        axis.draw(canvas);
        axis.shift({
            left: 0,
            bottom: -canvas.height / 2 + canvas.top
        });
        if (axis.getMarkerTrackers()) {
            createDateMarkersEvent(options, axis.getMarkerTrackers(), this._updateSelectedRangeCallback)
        }
        axis.drawScaleBreaks({
            start: canvas.top,
            end: canvas.top + canvas.height
        })
    },
    visualRange: function() {},
    getViewport: function() {
        return {}
    },
    allScaleSelected(value) {
        var {
            startValue: startValue,
            endValue: endValue
        } = this._axis.visualRange();
        return {
            startValue: value[0].valueOf() === startValue.valueOf(),
            endValue: value[1].valueOf() === endValue.valueOf()
        }
    },
    getOptions() {
        return this._axis.getOptions() || {}
    }
};
each(Axis.prototype, field => {
    if ("constructor" !== field && "_" !== field[0] && isFunction(Axis.prototype[field]) && !(field in AxisWrapper.prototype)) {
        AxisWrapper.prototype[field] = function() {
            var axis = this._axis;
            return axis[field].apply(axis, arguments)
        }
    }
});
registerComponent("dxRangeSelector", dxRangeSelector);
export default dxRangeSelector;
import {
    plugin as exportPlugin
} from "../core/export";
import {
    plugin as titlePlugin
} from "../core/title";
import {
    plugin as LoadingIndicatorPlugin
} from "../core/loading_indicator";
import {
    plugin as dataSourcePlugin
} from "../core/data_source";
dxRangeSelector.addPlugin(exportPlugin);
dxRangeSelector.addPlugin(titlePlugin);
dxRangeSelector.addPlugin(LoadingIndicatorPlugin);
dxRangeSelector.addPlugin(dataSourcePlugin);
