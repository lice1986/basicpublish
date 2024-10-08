/**
 * DevExtreme (esm/viz/gauges/common.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    BaseGauge,
    compareArrays as _compareArrays
} from "./base_gauge";
import {
    isDefined as _isDefined,
    isNumeric as _isNumber
} from "../../core/utils/type";
import {
    extend
} from "../../core/utils/extend";
var _isArray = Array.isArray;
import {
    Axis
} from "../axes/base_axis";
import {
    map as _map,
    normalizeEnum as _normalizeEnum
} from "../core/utils";
var _isFinite = isFinite;
var _Number = Number;
var _min = Math.min;
var _max = Math.max;
var _extend = extend;
import {
    noop as _noop
} from "../../core/utils/common";
var SHIFT_ANGLE = 90;
var OPTION_VALUE = "value";
var OPTION_SUBVALUES = "subvalues";
var DEFAULT_MINOR_AXIS_DIVISION_FACTOR = 5;
var DEFAULT_NUMBER_MULTIPLIERS = [1, 2, 5];

function processValue(value, fallbackValue) {
    if (null === value) {
        return value
    }
    return _isFinite(value) ? _Number(value) : fallbackValue
}

function parseArrayOfNumbers(arg) {
    return _isArray(arg) ? arg : _isNumber(arg) ? [arg] : null
}
export var dxGauge = BaseGauge.inherit({
    _initCore: function() {
        var that = this;
        var renderer = that._renderer;
        that._setupValue(that.option(OPTION_VALUE));
        that.__subvalues = parseArrayOfNumbers(that.option(OPTION_SUBVALUES));
        that._setupSubvalues(that.__subvalues);
        selectMode(that);
        that.callBase.apply(that, arguments);
        that._rangeContainer = new that._factory.RangeContainer({
            renderer: renderer,
            container: renderer.root,
            translator: that._translator,
            themeManager: that._themeManager
        });
        that._initScale();
        that._subvalueIndicatorContainer = that._renderer.g().attr({
            class: "dxg-subvalue-indicators"
        }).linkOn(that._renderer.root, "valueIndicator").enableLinks()
    },
    _fontFields: ["scale.label.font", "valueIndicators.rangebar.text.font", "valueIndicators.textcloud.text.font", "indicator.text.font"],
    _initScale: function() {
        this._scaleGroup = this._renderer.g().attr({
            class: "dxg-scale"
        }).linkOn(this._renderer.root, "scale");
        this._labelsAxesGroup = this._renderer.g().attr({
            class: "dxg-scale-elements"
        }).linkOn(this._renderer.root, "scale-elements");
        this._scale = new Axis({
            incidentOccurred: this._incidentOccurred,
            renderer: this._renderer,
            axesContainerGroup: this._scaleGroup,
            labelsAxesGroup: this._labelsAxesGroup,
            axisType: this._scaleTypes.type,
            drawingType: this._scaleTypes.drawingType,
            widgetClass: "dxg",
            getTemplate() {}
        })
    },
    _disposeCore: function() {
        var that = this;
        that.callBase.apply(that, arguments);
        that._scale.dispose();
        that._scaleGroup.linkOff();
        that._labelsAxesGroup.linkOff();
        that._rangeContainer.dispose();
        that._disposeValueIndicators();
        that._subvalueIndicatorContainer.linkOff();
        that._scale = that._scaleGroup = that._labelsAxesGroup = that._rangeContainer = null
    },
    _disposeValueIndicators: function() {
        this._valueIndicator && this._valueIndicator.dispose();
        this._subvalueIndicatorsSet && this._subvalueIndicatorsSet.dispose();
        this._valueIndicator = this._subvalueIndicatorsSet = null
    },
    _setupDomainCore: function() {
        var scaleOption = this.option("scale") || {};
        var startValue = this.option("startValue");
        var endValue = this.option("endValue");
        startValue = _isNumber(startValue) ? _Number(startValue) : _isNumber(scaleOption.startValue) ? _Number(scaleOption.startValue) : 0;
        endValue = _isNumber(endValue) ? _Number(endValue) : _isNumber(scaleOption.endValue) ? _Number(scaleOption.endValue) : 100;
        this._baseValue = startValue < endValue ? startValue : endValue;
        this._translator.setDomain(startValue, endValue)
    },
    _cleanContent: function() {
        this._rangeContainer.clean();
        this._cleanValueIndicators()
    },
    _measureScale: function(scaleOptions) {
        var majorTick = scaleOptions.tick;
        var majorTickEnabled = majorTick.visible && majorTick.length > 0 && majorTick.width > 0;
        var minorTick = scaleOptions.minorTick;
        var minorTickEnabled = minorTick.visible && minorTick.length > 0 && minorTick.width > 0;
        var label = scaleOptions.label;
        var indentFromTick = Number(label.indentFromTick);
        if (!majorTickEnabled && !minorTickEnabled && !label.visible) {
            return {}
        }
        var textParams = this._scale.measureLabels(extend({}, this._canvas));
        var layoutValue = this._getScaleLayoutValue();
        var result = {
            min: layoutValue,
            max: layoutValue
        };
        var coefs = this._getTicksCoefficients(scaleOptions);
        var innerCoef = coefs.inner;
        var outerCoef = coefs.outer;
        if (majorTickEnabled) {
            result.min = _min(result.min, layoutValue - innerCoef * majorTick.length);
            result.max = _max(result.max, layoutValue + outerCoef * majorTick.length)
        }
        if (minorTickEnabled) {
            result.min = _min(result.min, layoutValue - innerCoef * minorTick.length);
            result.max = _max(result.max, layoutValue + outerCoef * minorTick.length)
        }
        label.visible && this._correctScaleIndents(result, indentFromTick, textParams);
        return result
    },
    _renderContent: function() {
        var that = this;
        var scaleOptions = that._prepareScaleSettings();
        that._rangeContainer.render(_extend(that._getOption("rangeContainer"), {
            vertical: that._area.vertical
        }));
        that._renderScale(scaleOptions);
        that._subvalueIndicatorContainer.linkAppend();
        var elements = _map([that._rangeContainer].concat(that._prepareValueIndicators()), (function(element) {
            return element && element.enabled ? element : null
        }));
        that._applyMainLayout(elements, that._measureScale(scaleOptions));
        elements.forEach(element => element.resize(that._getElementLayout(element.getOffset())));
        that._shiftScale(that._getElementLayout(0), scaleOptions);
        that._beginValueChanging();
        that._updateActiveElements();
        that._endValueChanging()
    },
    _prepareScaleSettings: function() {
        var that = this;
        var userOptions = that.option("scale");
        var scaleOptions = extend(true, {}, that._themeManager.theme("scale"), userOptions);
        scaleOptions.label.indentFromAxis = 0;
        scaleOptions.isHorizontal = !that._area.vertical;
        scaleOptions.forceUserTickInterval |= _isDefined(userOptions) && _isDefined(userOptions.tickInterval) && !_isDefined(userOptions.scaleDivisionFactor);
        scaleOptions.axisDivisionFactor = scaleOptions.scaleDivisionFactor || that._gridSpacingFactor;
        scaleOptions.minorAxisDivisionFactor = scaleOptions.minorScaleDivisionFactor || DEFAULT_MINOR_AXIS_DIVISION_FACTOR;
        scaleOptions.numberMultipliers = DEFAULT_NUMBER_MULTIPLIERS;
        scaleOptions.tickOrientation = that._getTicksOrientation(scaleOptions);
        if (scaleOptions.label.useRangeColors) {
            scaleOptions.label.customizeColor = function() {
                return that._rangeContainer.getColorForValue(this.value)
            }
        }
        return scaleOptions
    },
    _renderScale: function(scaleOptions) {
        var bounds = this._translator.getDomain();
        var startValue = bounds[0];
        var endValue = bounds[1];
        var angles = this._translator.getCodomain();
        var invert = !!(startValue > endValue ^ scaleOptions.inverted);
        var min = _min(startValue, endValue);
        var max = _max(startValue, endValue);
        scaleOptions.min = min;
        scaleOptions.max = max;
        scaleOptions.startAngle = SHIFT_ANGLE - angles[0];
        scaleOptions.endAngle = SHIFT_ANGLE - angles[1];
        scaleOptions.skipViewportExtending = true;
        scaleOptions.inverted = invert;
        this._scale.updateOptions(scaleOptions);
        this._scale.setBusinessRange({
            axisType: "continuous",
            dataType: "numeric",
            min: min,
            max: max,
            invert: invert
        });
        this._updateScaleTickIndent(scaleOptions);
        this._scaleGroup.linkAppend();
        this._labelsAxesGroup.linkAppend();
        this._scale.draw(extend({}, this._canvas))
    },
    _updateIndicatorSettings: function(settings) {
        settings.currentValue = settings.baseValue = _isFinite(this._translator.translate(settings.baseValue)) ? _Number(settings.baseValue) : this._baseValue;
        settings.vertical = this._area.vertical;
        if (settings.text && !settings.text.format) {
            settings.text.format = this._defaultFormatOptions
        }
    },
    _prepareIndicatorSettings: function(options, defaultTypeField) {
        var theme = this._themeManager.theme("valueIndicators");
        var type = _normalizeEnum(options.type || this._themeManager.theme(defaultTypeField));
        var settings = _extend(true, {}, theme._default, theme[type], options);
        settings.type = type;
        settings.animation = this._animationSettings;
        settings.containerBackgroundColor = this._containerBackgroundColor;
        this._updateIndicatorSettings(settings);
        return settings
    },
    _cleanValueIndicators: function() {
        this._valueIndicator && this._valueIndicator.clean();
        this._subvalueIndicatorsSet && this._subvalueIndicatorsSet.clean()
    },
    _prepareValueIndicators: function() {
        this._prepareValueIndicator();
        null !== this.__subvalues && this._prepareSubvalueIndicators();
        return [this._valueIndicator, this._subvalueIndicatorsSet]
    },
    _updateActiveElements: function() {
        this._updateValueIndicator();
        this._updateSubvalueIndicators()
    },
    _prepareValueIndicator: function() {
        var target = this._valueIndicator;
        var settings = this._prepareIndicatorSettings(this.option("valueIndicator") || {}, "valueIndicatorType");
        if (target && target.type !== settings.type) {
            target.dispose();
            target = null
        }
        if (!target) {
            target = this._valueIndicator = this._createIndicator(settings.type, this._renderer.root, "dxg-value-indicator", "value-indicator")
        }
        target.render(settings)
    },
    _createSubvalueIndicatorsSet: function() {
        var that = this;
        var root = that._subvalueIndicatorContainer;
        return new ValueIndicatorsSet({
            createIndicator: function(type, i) {
                return that._createIndicator(type, root, "dxg-subvalue-indicator", "subvalue-indicator", i)
            },
            createPalette: function(palette) {
                return that._themeManager.createPalette(palette)
            }
        })
    },
    _prepareSubvalueIndicators: function() {
        var target = this._subvalueIndicatorsSet;
        var settings = this._prepareIndicatorSettings(this.option("subvalueIndicator") || {}, "subvalueIndicatorType");
        if (!target) {
            target = this._subvalueIndicatorsSet = this._createSubvalueIndicatorsSet()
        }
        var isRecreate = settings.type !== target.type;
        target.type = settings.type;
        var dummy = this._createIndicator(settings.type, this._renderer.root);
        if (dummy) {
            dummy.dispose();
            target.render(settings, isRecreate)
        }
    },
    _setupValue: function(value) {
        this.__value = processValue(value, this.__value)
    },
    _setupSubvalues: function(subvalues) {
        var vals = void 0 === subvalues ? this.__subvalues : parseArrayOfNumbers(subvalues);
        var i;
        var ii;
        var list;
        if (null === vals) {
            return
        }
        for (i = 0, ii = vals.length, list = []; i < ii; ++i) {
            list.push(processValue(vals[i], this.__subvalues[i]))
        }
        this.__subvalues = list
    },
    _updateValueIndicator: function() {
        this._valueIndicator && this._valueIndicator.value(this.__value, this._noAnimation)
    },
    _updateSubvalueIndicators: function() {
        this._subvalueIndicatorsSet && this._subvalueIndicatorsSet.values(this.__subvalues, this._noAnimation)
    },
    value: function(arg) {
        if (void 0 !== arg) {
            this._changeValue(arg);
            return this
        }
        return this.__value
    },
    subvalues: function(arg) {
        if (void 0 !== arg) {
            this._changeSubvalues(arg);
            return this
        }
        return null !== this.__subvalues ? this.__subvalues.slice() : void 0
    },
    _changeValue: function(value) {
        this._setupValue(value);
        this._beginValueChanging();
        this._updateValueIndicator();
        this._updateExtraElements();
        if (this.__value !== this.option(OPTION_VALUE)) {
            this.option(OPTION_VALUE, this.__value)
        }
        this._endValueChanging()
    },
    _changeSubvalues: function(subvalues) {
        if (null !== this.__subvalues) {
            this._setupSubvalues(subvalues);
            this._beginValueChanging();
            this._updateSubvalueIndicators();
            this._updateExtraElements();
            this._endValueChanging()
        } else {
            this.__subvalues = parseArrayOfNumbers(subvalues);
            this._setContentSize();
            this._renderContent()
        }
        if (!_compareArrays(this.__subvalues, this.option(OPTION_SUBVALUES))) {
            this.option(OPTION_SUBVALUES, this.__subvalues)
        }
    },
    _optionChangesMap: {
        scale: "DOMAIN",
        rangeContainer: "MOSTLY_TOTAL",
        valueIndicator: "MOSTLY_TOTAL",
        subvalueIndicator: "MOSTLY_TOTAL",
        containerBackgroundColor: "MOSTLY_TOTAL",
        value: "VALUE",
        subvalues: "SUBVALUES",
        valueIndicators: "MOSTLY_TOTAL"
    },
    _customChangesOrder: ["VALUE", "SUBVALUES"],
    _change_VALUE: function() {
        this._changeValue(this.option(OPTION_VALUE))
    },
    _change_SUBVALUES: function() {
        this._changeSubvalues(this.option(OPTION_SUBVALUES))
    },
    _applyMainLayout: null,
    _getElementLayout: null,
    _createIndicator: function(type, owner, className, trackerType, trackerIndex, _strict) {
        var indicator = this._factory.createIndicator({
            renderer: this._renderer,
            translator: this._translator,
            owner: owner,
            tracker: this._tracker,
            className: className
        }, type, _strict);
        if (indicator) {
            indicator.type = type;
            indicator._trackerInfo = {
                type: trackerType,
                index: trackerIndex
            }
        }
        return indicator
    },
    _getApproximateScreenRange: null
});

function valueGetter(arg) {
    return arg ? arg.value : null
}

function setupValues(that, fieldName, optionItems) {
    var currentValues = that[fieldName];
    var newValues = _isArray(optionItems) ? _map(optionItems, valueGetter) : [];
    var i = 0;
    var ii = newValues.length;
    var list = [];
    for (; i < ii; ++i) {
        list.push(processValue(newValues[i], currentValues[i]))
    }
    that[fieldName] = list
}

function selectMode(gauge) {
    if (void 0 === gauge.option(OPTION_VALUE) && void 0 === gauge.option(OPTION_SUBVALUES)) {
        if (void 0 !== gauge.option("valueIndicators")) {
            disableDefaultMode(gauge);
            selectHardMode(gauge)
        }
    }
}

function disableDefaultMode(that) {
    that.value = that.subvalues = _noop;
    that._setupValue = that._setupSubvalues = that._updateValueIndicator = that._updateSubvalueIndicators = null
}

function selectHardMode(that) {
    that._indicatorValues = [];
    setupValues(that, "_indicatorValues", that.option("valueIndicators"));
    that._valueIndicators = [];
    var _applyMostlyTotalChange = that._applyMostlyTotalChange;
    that._applyMostlyTotalChange = function() {
        setupValues(this, "_indicatorValues", this.option("valueIndicators"));
        _applyMostlyTotalChange.call(this)
    };
    that._updateActiveElements = updateActiveElements_hardMode;
    that._prepareValueIndicators = prepareValueIndicators_hardMode;
    that._disposeValueIndicators = disposeValueIndicators_hardMode;
    that._cleanValueIndicators = cleanValueIndicators_hardMode;
    that.indicatorValue = indicatorValue_hardMode
}

function updateActiveElements_hardMode() {
    var that = this;
    that._valueIndicators.forEach(valueIndicator => {
        valueIndicator.value(that._indicatorValues[valueIndicator.index], that._noAnimation)
    })
}

function prepareValueIndicators_hardMode() {
    var that = this;
    var valueIndicators = that._valueIndicators || [];
    var userOptions = that.option("valueIndicators");
    var optionList = [];
    var i = 0;
    var ii;
    for (ii = _isArray(userOptions) ? userOptions.length : 0; i < ii; ++i) {
        optionList.push(userOptions[i])
    }
    for (ii = valueIndicators.length; i < ii; ++i) {
        optionList.push(null)
    }
    var newValueIndicators = [];
    optionList.forEach((userSettings, i) => {
        var valueIndicator = valueIndicators[i];
        if (!userSettings) {
            valueIndicator && valueIndicator.dispose();
            return
        }
        var settings = that._prepareIndicatorSettings(userSettings, "valueIndicatorType");
        if (valueIndicator && valueIndicator.type !== settings.type) {
            valueIndicator.dispose();
            valueIndicator = null
        }
        if (!valueIndicator) {
            valueIndicator = that._createIndicator(settings.type, that._renderer.root, "dxg-value-indicator", "value-indicator", i, true)
        }
        if (valueIndicator) {
            valueIndicator.index = i;
            valueIndicator.render(settings);
            newValueIndicators.push(valueIndicator)
        }
    });
    that._valueIndicators = newValueIndicators;
    return that._valueIndicators
}

function disposeValueIndicators_hardMode() {
    this._valueIndicators.forEach(valueIndicator => valueIndicator.dispose());
    this._valueIndicators = null
}

function cleanValueIndicators_hardMode() {
    this._valueIndicators.forEach(valueIndicator => valueIndicator.clean())
}

function indicatorValue_hardMode(index, value) {
    return accessPointerValue(this, this._valueIndicators, this._indicatorValues, index, value)
}

function accessPointerValue(that, pointers, values, index, value) {
    if (void 0 !== value) {
        if (void 0 !== values[index]) {
            values[index] = processValue(value, values[index]);
            pointers[index] && pointers[index].value(values[index])
        }
        return that
    } else {
        return values[index]
    }
}

function ValueIndicatorsSet(parameters) {
    this._parameters = parameters;
    this._indicators = []
}
ValueIndicatorsSet.prototype = {
    constructor: ValueIndicatorsSet,
    dispose: function() {
        this._indicators.forEach(indicator => indicator.dispose());
        this._parameters = this._options = this._indicators = this._colorPalette = this._palette = null;
        return this
    },
    clean: function() {
        this._sample && this._sample.clean().dispose();
        this._indicators.forEach(indicator => indicator.clean());
        this._sample = this._options = this._palette = null;
        return this
    },
    render: function(options, isRecreate) {
        var that = this;
        that._options = options;
        that._sample = that._parameters.createIndicator(that.type);
        that._sample.render(options);
        that.enabled = that._sample.enabled;
        that._palette = _isDefined(options.palette) ? that._parameters.createPalette(options.palette) : null;
        if (that.enabled) {
            that._generatePalette(that._indicators.length);
            that._indicators = _map(that._indicators, (function(indicator, i) {
                if (isRecreate) {
                    indicator.dispose();
                    indicator = that._parameters.createIndicator(that.type, i)
                }
                indicator.render(that._getIndicatorOptions(i));
                return indicator
            }))
        }
        return that
    },
    getOffset: function() {
        return this._sample.getOffset()
    },
    resize: function(layout) {
        this._layout = layout;
        this._indicators.forEach(indicator => indicator.resize(layout));
        return this
    },
    measure: function(layout) {
        return this._sample.measure(layout)
    },
    _getIndicatorOptions: function(index) {
        var result = this._options;
        if (this._colorPalette) {
            result = _extend({}, result, {
                color: this._colorPalette[index]
            })
        }
        return result
    },
    _generatePalette: function(count) {
        var colors = null;
        if (this._palette) {
            this._palette.reset();
            colors = this._palette.generateColors(count, {
                repeat: true
            })
        }
        this._colorPalette = colors
    },
    _adjustIndicatorsCount: function(count) {
        var indicators = this._indicators;
        var i;
        var ii;
        var indicator;
        var indicatorsLen = indicators.length;
        if (indicatorsLen > count) {
            for (i = count, ii = indicatorsLen; i < ii; ++i) {
                indicators[i].clean().dispose()
            }
            this._indicators = indicators.slice(0, count);
            this._generatePalette(indicators.length)
        } else if (indicatorsLen < count) {
            this._generatePalette(count);
            for (i = indicatorsLen, ii = count; i < ii; ++i) {
                indicator = this._parameters.createIndicator(this.type, i);
                indicator.render(this._getIndicatorOptions(i)).resize(this._layout);
                indicators.push(indicator)
            }
        }
    },
    values: function(arg, _noAnimation) {
        if (!this.enabled) {
            return
        }
        if (void 0 !== arg) {
            if (!_isArray(arg)) {
                arg = _isFinite(arg) ? [Number(arg)] : null
            }
            if (arg) {
                this._adjustIndicatorsCount(arg.length);
                this._indicators.forEach((indicator, i) => indicator.value(arg[i], _noAnimation))
            }
            return this
        }
        return _map(this._indicators, (function(indicator) {
            return indicator.value()
        }))
    }
};
export function createIndicatorCreator(indicators) {
    return function(parameters, type, _strict) {
        var indicatorType = indicators[_normalizeEnum(type)] || !_strict && indicators._default;
        return indicatorType ? new indicatorType(parameters) : null
    }
}
