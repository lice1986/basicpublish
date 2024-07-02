/**
 * DevExtreme (cjs/viz/gauges/linear_indicators.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.trianglemarker = exports.textcloud = exports.rhombus = exports.rectangle = exports.rangebar = exports.circle = exports._default = void 0;
var _base_indicators = require("./base_indicators");
var _utils = require("../core/utils");
const _Number = Number;
const SimpleIndicator = _base_indicators.BaseIndicator.inherit({
    _move: function() {
        const delta = this._actualPosition - this._zeroPosition;
        this._rootElement.move(this.vertical ? 0 : delta, this.vertical ? delta : 0);
        this._trackerElement && this._trackerElement.move(this.vertical ? 0 : delta, this.vertical ? delta : 0)
    },
    _isEnabled: function() {
        this.vertical = this._options.vertical;
        return this._options.length > 0 && this._options.width > 0
    },
    _isVisible: function() {
        return true
    },
    _getTrackerSettings: function() {
        const options = this._options;
        let x1;
        let x2;
        let y1;
        let y2;
        let width = options.width / 2;
        let length = options.length / 2;
        const p = this._zeroPosition;
        width > 10 || (width = 10);
        length > 10 || (length = 10);
        if (this.vertical) {
            x1 = options.x - length;
            x2 = options.x + length;
            y1 = p + width;
            y2 = p - width
        } else {
            x1 = p - width;
            x2 = p + width;
            y1 = options.y + length;
            y2 = options.y - length
        }
        return {
            points: [x1, y1, x1, y2, x2, y2, x2, y1]
        }
    },
    _render: function() {
        this._zeroPosition = this._translator.getCodomainStart()
    },
    _clear: function() {
        delete this._element
    },
    measure: function(layout) {
        const p = this.vertical ? layout.x : layout.y;
        return {
            min: p - this._options.length / 2,
            max: p + this._options.length / 2
        }
    },
    getTooltipParameters: function() {
        const options = this._options;
        const p = this._actualPosition;
        const parameters = {
            x: p,
            y: p,
            value: this._currentValue,
            color: options.color,
            offset: options.width / 2
        };
        this.vertical ? parameters.x = options.x : parameters.y = options.y;
        return parameters
    }
});
const rectangle = SimpleIndicator.inherit({
    _render: function() {
        const options = this._options;
        let x1;
        let x2;
        let y1;
        let y2;
        this.callBase();
        const p = this._zeroPosition;
        if (this.vertical) {
            x1 = options.x - options.length / 2;
            x2 = options.x + options.length / 2;
            y1 = p + options.width / 2;
            y2 = p - options.width / 2
        } else {
            x1 = p - options.width / 2;
            x2 = p + options.width / 2;
            y1 = options.y + options.length / 2;
            y2 = options.y - options.length / 2
        }
        this._element = this._element || this._renderer.path([], "area").append(this._rootElement);
        this._element.attr({
            points: [x1, y1, x1, y2, x2, y2, x2, y1]
        })
    }
});
exports.rectangle = rectangle;
const rhombus = SimpleIndicator.inherit({
    _render: function() {
        const that = this;
        const options = that._options;
        let x;
        let y;
        let dx;
        let dy;
        that.callBase();
        if (that.vertical) {
            x = options.x;
            y = that._zeroPosition;
            dx = options.length / 2 || 0;
            dy = options.width / 2 || 0
        } else {
            x = that._zeroPosition;
            y = options.y;
            dx = options.width / 2 || 0;
            dy = options.length / 2 || 0
        }
        that._element = that._element || that._renderer.path([], "area").append(that._rootElement);
        that._element.attr({
            points: [x - dx, y, x, y - dy, x + dx, y, x, y + dy]
        })
    }
});
exports.rhombus = rhombus;
const circle = SimpleIndicator.inherit({
    _render: function() {
        const that = this;
        const options = that._options;
        let x;
        let y;
        that.callBase();
        if (that.vertical) {
            x = options.x;
            y = that._zeroPosition
        } else {
            x = that._zeroPosition;
            y = options.y
        }
        const r = options.length / 2 || 0;
        that._element = that._element || that._renderer.circle().append(that._rootElement);
        that._element.attr({
            cx: x,
            cy: y,
            r: r
        })
    }
});
exports.circle = circle;
const triangleMarker = SimpleIndicator.inherit({
    _isEnabled: function() {
        this.vertical = this._options.vertical;
        this._inverted = this.vertical ? "right" === (0, _utils.normalizeEnum)(this._options.horizontalOrientation) : "bottom" === (0, _utils.normalizeEnum)(this._options.verticalOrientation);
        return this._options.length > 0 && this._options.width > 0
    },
    _isVisible: function() {
        return true
    },
    _render: function() {
        const that = this;
        const options = that._options;
        let x1;
        let x2;
        let y1;
        let y2;
        const settings = {
            stroke: "none",
            "stroke-width": 0,
            "stroke-linecap": "square"
        };
        that.callBase();
        if (that.vertical) {
            x1 = options.x;
            y1 = that._zeroPosition;
            x2 = x1 + _Number(that._inverted ? options.length : -options.length);
            settings.points = [x1, y1, x2, y1 - options.width / 2, x2, y1 + options.width / 2]
        } else {
            y1 = options.y;
            x1 = that._zeroPosition;
            y2 = y1 + _Number(that._inverted ? options.length : -options.length);
            settings.points = [x1, y1, x1 - options.width / 2, y2, x1 + options.width / 2, y2]
        }
        if (options.space > 0) {
            settings["stroke-width"] = Math.min(options.space, options.width / 4) || 0;
            settings.stroke = settings["stroke-width"] > 0 ? options.containerBackgroundColor || "none" : "none"
        }
        that._element = that._element || that._renderer.path([], "area").append(that._rootElement);
        that._element.attr(settings).sharp()
    },
    _getTrackerSettings: function() {
        const that = this;
        const options = that._options;
        let width = options.width / 2;
        let length = _Number(options.length);
        let x1;
        let x2;
        let y1;
        let y2;
        let result;
        width > 10 || (width = 10);
        length > 20 || (length = 20);
        if (that.vertical) {
            x1 = options.x;
            x2 = x1 + (that._inverted ? length : -length);
            y1 = that._zeroPosition + width;
            y2 = that._zeroPosition - width;
            result = [x1, y1, x2, y1, x2, y2, x1, y2]
        } else {
            y1 = options.y;
            y2 = y1 + (that._inverted ? length : -length);
            x1 = that._zeroPosition - width;
            x2 = that._zeroPosition + width;
            result = [x1, y1, x1, y2, x2, y2, x2, y1]
        }
        return {
            points: result
        }
    },
    measure: function(layout) {
        const that = this;
        const length = _Number(that._options.length);
        let minBound;
        let maxBound;
        if (that.vertical) {
            minBound = maxBound = layout.x;
            if (that._inverted) {
                maxBound = minBound + length
            } else {
                minBound = maxBound - length
            }
        } else {
            minBound = maxBound = layout.y;
            if (that._inverted) {
                maxBound = minBound + length
            } else {
                minBound = maxBound - length
            }
        }
        return {
            min: minBound,
            max: maxBound
        }
    },
    getTooltipParameters: function() {
        const options = this._options;
        const s = (this._inverted ? options.length : -options.length) / 2;
        const parameters = this.callBase();
        this.vertical ? parameters.x += s : parameters.y += s;
        parameters.offset = options.length / 2;
        return parameters
    }
});
exports.trianglemarker = triangleMarker;
const textCloud = _base_indicators.BaseTextCloudMarker.inherit({
    _isEnabled: function() {
        this.vertical = this._options.vertical;
        this._inverted = this.vertical ? "right" === (0, _utils.normalizeEnum)(this._options.horizontalOrientation) : "bottom" === (0, _utils.normalizeEnum)(this._options.verticalOrientation);
        return true
    },
    _isVisible: function() {
        return true
    },
    _getTextCloudOptions: function() {
        const that = this;
        let x = that._actualPosition;
        let y = that._actualPosition;
        let type;
        if (that.vertical) {
            x = that._options.x;
            type = that._inverted ? "top-left" : "top-right"
        } else {
            y = that._options.y;
            type = that._inverted ? "right-top" : "right-bottom"
        }
        return {
            x: x,
            y: y,
            type: type
        }
    },
    measure: function(layout) {
        const that = this;
        let minBound;
        let maxBound;
        const arrowLength = _Number(that._options.arrowLength) || 0;
        that._measureText();
        if (that.vertical) {
            if (that._inverted) {
                minBound = layout.x;
                maxBound = layout.x + arrowLength + that._textFullWidth
            } else {
                minBound = layout.x - arrowLength - that._textFullWidth;
                maxBound = layout.x
            }
        } else if (that._inverted) {
            minBound = layout.y;
            maxBound = layout.y + arrowLength + that._textFullHeight
        } else {
            minBound = layout.y - arrowLength - that._textFullHeight;
            maxBound = layout.y
        }
        return {
            min: minBound,
            max: maxBound,
            indent: 0
        }
    },
    _correctCloudType(type, _ref, _ref2) {
        let {
            x: x,
            y: y
        } = _ref;
        let {
            width: width,
            height: height
        } = _ref2;
        if ("right-top" === type || "right-bottom" === type) {
            if (x - width < this._translator.getCodomainStart()) {
                type = "left-".concat(type.split("-")[1])
            }
        } else if ("top-left" === type || "top-right" === type) {
            if (y + height > this._translator.getCodomainStart()) {
                type = "bottom-".concat(type.split("-")[1])
            }
        }
        return type
    }
});
exports.textcloud = textCloud;
const rangeBar = _base_indicators.BaseRangeBar.inherit({
    _isEnabled: function() {
        this.vertical = this._options.vertical;
        this._inverted = this.vertical ? "right" === (0, _utils.normalizeEnum)(this._options.horizontalOrientation) : "bottom" === (0, _utils.normalizeEnum)(this._options.verticalOrientation);
        return this._options.size > 0
    },
    _isVisible: function() {
        return true
    },
    _createBarItem: function() {
        return this._renderer.path([], "area").append(this._rootElement)
    },
    _createTracker: function() {
        return this._renderer.path([], "area")
    },
    _setBarSides: function() {
        const that = this;
        const options = that._options;
        const size = _Number(options.size);
        let minSide;
        let maxSide;
        if (that.vertical) {
            if (that._inverted) {
                minSide = options.x;
                maxSide = options.x + size
            } else {
                minSide = options.x - size;
                maxSide = options.x
            }
        } else if (that._inverted) {
            minSide = options.y;
            maxSide = options.y + size
        } else {
            minSide = options.y - size;
            maxSide = options.y
        }
        that._minSide = minSide;
        that._maxSide = maxSide;
        that._minBound = minSide;
        that._maxBound = maxSide
    },
    _getSpace: function() {
        const options = this._options;
        return options.space > 0 ? _Number(options.space) : 0
    },
    _isTextVisible: function() {
        const textOptions = this._options.text || {};
        return textOptions.indent > 0 || textOptions.indent < 0
    },
    _getTextAlign: function() {
        return this.vertical ? this._options.text.indent > 0 ? "left" : "right" : "center"
    },
    _setTextItemsSides: function() {
        const that = this;
        const indent = _Number(that._options.text.indent);
        if (indent > 0) {
            that._lineStart = that._maxSide;
            that._lineEnd = that._maxSide + indent;
            that._textPosition = that._lineEnd + (that.vertical ? 2 : that._textHeight / 2);
            that._maxBound = that._textPosition + (that.vertical ? that._textWidth : that._textHeight / 2)
        } else if (indent < 0) {
            that._lineStart = that._minSide;
            that._lineEnd = that._minSide + indent;
            that._textPosition = that._lineEnd - (that.vertical ? 2 : that._textHeight / 2);
            that._minBound = that._textPosition - (that.vertical ? that._textWidth : that._textHeight / 2)
        }
    },
    _getPositions: function() {
        const startPosition = this._startPosition;
        const endPosition = this._endPosition;
        const space = this._space;
        const basePosition = this._basePosition;
        const actualPosition = this._actualPosition;
        let mainPosition1;
        let mainPosition2;
        let backPosition1;
        let backPosition2;
        if (startPosition < endPosition) {
            if (basePosition < actualPosition) {
                mainPosition1 = basePosition;
                mainPosition2 = actualPosition
            } else {
                mainPosition1 = actualPosition;
                mainPosition2 = basePosition
            }
            backPosition1 = mainPosition1 - space;
            backPosition2 = mainPosition2 + space
        } else {
            if (basePosition > actualPosition) {
                mainPosition1 = basePosition;
                mainPosition2 = actualPosition
            } else {
                mainPosition1 = actualPosition;
                mainPosition2 = basePosition
            }
            backPosition1 = mainPosition1 + space;
            backPosition2 = mainPosition2 - space
        }
        return {
            start: startPosition,
            end: endPosition,
            main1: mainPosition1,
            main2: mainPosition2,
            back1: backPosition1,
            back2: backPosition2
        }
    },
    _buildItemSettings: function(from, to) {
        const side1 = this._minSide;
        const side2 = this._maxSide;
        const points = this.vertical ? [side1, from, side1, to, side2, to, side2, from] : [from, side1, from, side2, to, side2, to, side1];
        return {
            points: points
        }
    },
    _updateTextPosition: function() {
        this._text.attr(this.vertical ? {
            x: this._textPosition,
            y: this._actualPosition + this._textVerticalOffset
        } : {
            x: this._actualPosition,
            y: this._textPosition + this._textVerticalOffset
        })
    },
    _updateLinePosition: function() {
        const that = this;
        const actualPosition = that._actualPosition;
        let side1;
        let side2;
        let points;
        if (that.vertical) {
            if (that._basePosition >= actualPosition) {
                side1 = actualPosition;
                side2 = actualPosition + 2
            } else {
                side1 = actualPosition - 2;
                side2 = actualPosition
            }
            points = [that._lineStart, side1, that._lineStart, side2, that._lineEnd, side2, that._lineEnd, side1]
        } else {
            if (that._basePosition <= actualPosition) {
                side1 = actualPosition - 2;
                side2 = actualPosition
            } else {
                side1 = actualPosition;
                side2 = actualPosition + 2
            }
            points = [side1, that._lineStart, side1, that._lineEnd, side2, that._lineEnd, side2, that._lineStart]
        }
        that._line.attr({
            points: points
        }).sharp()
    },
    _getTooltipPosition: function() {
        const crossCenter = (this._minSide + this._maxSide) / 2;
        const alongCenter = (this._basePosition + this._actualPosition) / 2;
        return this.vertical ? {
            x: crossCenter,
            y: alongCenter
        } : {
            x: alongCenter,
            y: crossCenter
        }
    },
    measure: function(layout) {
        const that = this;
        const size = _Number(that._options.size);
        const textIndent = _Number(that._options.text.indent);
        let minBound;
        let maxBound;
        let indent;
        that._measureText();
        if (that.vertical) {
            minBound = maxBound = layout.x;
            if (that._inverted) {
                maxBound += size
            } else {
                minBound -= size
            }
            if (that._hasText) {
                indent = that._textHeight / 2;
                if (textIndent > 0) {
                    maxBound += textIndent + that._textWidth
                }
                if (textIndent < 0) {
                    minBound += textIndent - that._textWidth
                }
            }
        } else {
            minBound = maxBound = layout.y;
            if (that._inverted) {
                maxBound += size
            } else {
                minBound -= size
            }
            if (that._hasText) {
                indent = that._textWidth / 2;
                if (textIndent > 0) {
                    maxBound += textIndent + that._textHeight
                }
                if (textIndent < 0) {
                    minBound += textIndent - that._textHeight
                }
            }
        }
        return {
            min: minBound,
            max: maxBound,
            indent: indent
        }
    }
});
exports.rangebar = exports._default = rangeBar;
