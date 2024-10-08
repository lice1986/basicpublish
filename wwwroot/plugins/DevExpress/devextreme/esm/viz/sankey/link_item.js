/**
 * DevExtreme (esm/viz/sankey/link_item.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    COLOR_MODE_GRADIENT,
    COLOR_MODE_SOURCE,
    COLOR_MODE_TARGET
} from "./constants";
var states = ["normal", "adjacentNodeHover", "hover"];
import {
    isDefined
} from "../../core/utils/type";

function compileAttrs(color, itemOptions, itemBaseOptions, gradient) {
    var border = itemOptions.border;
    var baseBorder = itemBaseOptions.border;
    var borderVisible = isDefined(border.visible) ? border.visible : baseBorder.visible;
    var borderWidth = isDefined(border.width) ? border.width : baseBorder.width;
    var borderOpacity = isDefined(border.opacity) ? border.opacity : isDefined(baseBorder.opacity) ? baseBorder.opacity : 1;
    var opacity = isDefined(itemOptions.opacity) ? itemOptions.opacity : isDefined(itemBaseOptions.opacity) ? itemBaseOptions.opacity : 1;
    var fill = itemOptions.color || color;
    if (itemBaseOptions.colorMode === COLOR_MODE_TARGET || itemBaseOptions.colorMode === COLOR_MODE_SOURCE) {
        fill = color
    } else if (itemBaseOptions.colorMode === COLOR_MODE_GRADIENT && gradient && isDefined(gradient.id)) {
        fill = gradient.id
    }
    return {
        fill: fill,
        "stroke-width": borderVisible ? borderWidth : 0,
        stroke: itemOptions.border.color || itemBaseOptions.border.color,
        "stroke-opacity": borderOpacity,
        opacity: opacity,
        hatching: itemOptions.hatching
    }
}

function Link(widget, params) {
    var widgetOffset = widget._renderer.getRootOffset();
    this.code = 0;
    this.widget = widget;
    this.color = params.color;
    this.connection = params.connection;
    this.d = params.d;
    this.options = params.options;
    this.boundingRect = params.boundingRect, this.coords = {
        x: params.boundingRect.x + params.boundingRect.width / 2 + widgetOffset.left,
        y: params.boundingRect.y + params.boundingRect.height / 2 + widgetOffset.top
    };
    this.states = {
        normal: compileAttrs(this.color, this.options, this.options, params.gradient),
        adjacentNodeHover: compileAttrs(this.color, {
            opacity: 0,
            border: {}
        }, this.options, params.gradient),
        hover: compileAttrs(this.color, {
            opacity: 0,
            border: {}
        }, this.options, params.gradient)
    };
    this.overlayStates = {
        normal: compileAttrs(this.color, {
            opacity: 0,
            border: {}
        }, this.options),
        adjacentNodeHover: compileAttrs(this.color, this.options.hoverStyle, this.options),
        hover: compileAttrs(this.color, this.options.hoverStyle, this.options)
    }
}
Link.prototype = {
    getState: function() {
        return states[this.code]
    },
    isHovered: function() {
        return 2 === this.code
    },
    isAdjacentNodeHovered: function() {
        return 1 === this.code
    },
    setState: function(code, state) {
        if (state) {
            this.code = code
        } else {
            this.code = 0;
            this.hideTooltip()
        }
        this.widget._applyLinksAppearance()
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
        this.setState(2, state);
        this.widget._eventTrigger("linkHoverChanged", {
            target: this
        });
        this.widget._resume()
    },
    adjacentNodeHover: function(state) {
        if (!this.widget._getOption("hoverEnabled", true) || state === this.isAdjacentNodeHovered()) {
            return
        }
        this.widget._suspend();
        this.setState(1, state);
        this.widget._resume()
    },
    setAdjacentNodeHover: function() {
        this.adjacentNodeHover(true)
    },
    showTooltip: function(coords) {
        this.widget._getOption("hoverEnabled", true) && this.widget._tooltip && this.widget._tooltip.show({
            type: "link",
            info: {
                source: this.connection.source,
                target: this.connection.target,
                weight: this.connection.weight
            }
        }, "undefined" !== typeof coords ? {
            x: coords[0],
            y: coords[1]
        } : this.coords)
    },
    hideTooltip: function() {
        this.widget._tooltip && this.widget._tooltip.hide()
    }
};
export default Link;
