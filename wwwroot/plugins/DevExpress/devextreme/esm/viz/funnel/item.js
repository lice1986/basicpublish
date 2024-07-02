/**
 * DevExtreme (esm/viz/funnel/item.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var states = ["normal", "hover", "selection", "selection"];
import {
    isDefined
} from "../../core/utils/type";

function parseStyles(color, style, baseStyle) {
    var border = style.border;
    var baseBorder = baseStyle.border;
    var borderVisible = isDefined(border.visible) ? border.visible : baseBorder.visible;
    var borderWidth = isDefined(border.width) ? border.width : baseBorder.width;
    return {
        fill: color,
        hatching: style.hatching,
        stroke: border.color || baseBorder.color,
        "stroke-width": borderVisible ? borderWidth : 0
    }
}

function Item(widget, options) {
    var data = options.data;
    this.code = 0;
    this.widget = widget;
    this.figure = options.figure;
    this.argument = data.argument;
    this.value = data.value;
    this.data = data.dataItem;
    this.percent = options.percent;
    this.id = options.id;
    this.color = options.color;
    this.states = {
        normal: parseStyles(options.color, options.itemOptions, options.itemOptions),
        hover: parseStyles(options.color, options.itemOptions.hoverStyle, options.itemOptions),
        selection: parseStyles(options.color, options.itemOptions.selectionStyle, options.itemOptions)
    }
}
Item.prototype = {
    getState: function() {
        return states[this.code]
    },
    getNormalStyle: function() {
        return this.states.normal
    },
    setHover: function() {
        this.hover(true)
    },
    hover: function(state) {
        if (!this.widget._getOption("hoverEnabled", true) || state === this.isHovered()) {
            return
        }
        this.widget._suspend();
        state && this.widget.clearHover();
        this.setState(1, state);
        this.widget._eventTrigger("hoverChanged", {
            item: this
        });
        this.widget._resume()
    },
    setState: function(code, state) {
        if (state) {
            this.code |= code
        } else {
            this.code &= ~code
        }
        this.widget._applyTilesAppearance()
    },
    select: function(state) {
        var mode = this.widget._getOption("selectionMode", true);
        if ("none" === mode || state === this.isSelected()) {
            return
        }
        this.widget._suspend();
        if (state && "multiple" !== mode) {
            this.widget.clearSelection()
        }
        this.setState(2, state);
        this.widget._eventTrigger("selectionChanged", {
            item: this
        });
        this.widget._resume()
    },
    showTooltip: function(coords) {
        this.widget._showTooltip(this.id, coords)
    },
    getColor: function() {
        return this.color
    },
    isHovered: function() {
        return !!(1 & this.code)
    },
    isSelected: function() {
        return !!(2 & this.code)
    }
};
export default Item;
