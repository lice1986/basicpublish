/**
 * DevExtreme (esm/ui/date_box/ui.date_box.strategy.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import {
    noop
} from "../../core/utils/common";
import Class from "../../core/class";
import dateLocalization from "../../localization/date";
var abstract = Class.abstract;
var DateBoxStrategy = Class.inherit({
    ctor: function(dateBox) {
        this.dateBox = dateBox
    },
    widgetOption: function() {
        return this._widget && this._widget.option.apply(this._widget, arguments)
    },
    _renderWidget: function(element) {
        element = element || $("<div>");
        this._widget = this._createWidget(element);
        this._widget.$element().appendTo(this._getWidgetContainer())
    },
    _createWidget: function(element) {
        var widgetName = this._getWidgetName();
        var widgetOptions = this._getWidgetOptions();
        return this.dateBox._createComponent(element, widgetName, widgetOptions)
    },
    _getWidgetOptions: abstract,
    _getWidgetName: abstract,
    getDefaultOptions: function() {
        return {
            mode: "text"
        }
    },
    getDisplayFormat: abstract,
    supportedKeys: noop,
    getKeyboardListener: noop,
    customizeButtons: noop,
    getParsedText: function(text, format) {
        var value = dateLocalization.parse(text, format);
        return value ? value : dateLocalization.parse(text)
    },
    renderInputMinMax: noop,
    renderOpenedState: function() {
        this._updateValue()
    },
    popupConfig: abstract,
    _dimensionChanged: function() {
        var _this$_getPopup;
        null === (_this$_getPopup = this._getPopup()) || void 0 === _this$_getPopup ? void 0 : _this$_getPopup.repaint()
    },
    renderPopupContent: function() {
        var popup = this._getPopup();
        this._renderWidget();
        var $popupContent = popup.$content().parent();
        eventsEngine.off($popupContent, "mousedown");
        eventsEngine.on($popupContent, "mousedown", this._preventFocusOnPopup.bind(this))
    },
    _preventFocusOnPopup: function(e) {
        e.preventDefault()
    },
    _getWidgetContainer: function() {
        return this._getPopup().$content()
    },
    _getPopup: function() {
        return this.dateBox._popup
    },
    popupShowingHandler: noop,
    popupHiddenHandler: noop,
    _updateValue: function() {
        this._widget && this._widget.option("value", this.dateBoxValue())
    },
    useCurrentDateByDefault: noop,
    getDefaultDate: function() {
        return new Date
    },
    textChangedHandler: noop,
    renderValue: function() {
        if (this.dateBox.option("opened")) {
            this._updateValue()
        }
    },
    getValue: function() {
        return this._widget.option("value")
    },
    isAdaptivityChanged: function() {
        return false
    },
    dispose: function() {
        var popup = this._getPopup();
        if (popup) {
            popup.$content().empty()
        }
    },
    dateBoxValue: function() {
        if (arguments.length) {
            return this.dateBox.dateValue.apply(this.dateBox, arguments)
        } else {
            return this.dateBox.dateOption.apply(this.dateBox, ["value"])
        }
    }
});
export default DateBoxStrategy;
