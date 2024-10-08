/**
 * DevExtreme (esm/viz/components/legend.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    enumParser,
    normalizeEnum,
    patchFontOptions
} from "../core/utils";
import {
    extend
} from "../../core/utils/extend";
import {
    LayoutElement,
    WrapperLayoutElement
} from "../core/layout_element";
import {
    isDefined,
    isFunction
} from "../../core/utils/type";
import {
    Title
} from "../core/title";
import {
    clone
} from "../../core/utils/object";
import {
    noop
} from "../../core/utils/common";
import {
    processHatchingAttrs,
    getFuncIri
} from "../core/renderers/renderer";
import {
    Deferred
} from "../../core/utils/deferred";
var _Number = Number;
var _math = Math;
var _round = _math.round;
var _max = _math.max;
var _min = _math.min;
var _ceil = _math.ceil;
var _isDefined = isDefined;
var _isFunction = isFunction;
var _enumParser = enumParser;
var _normalizeEnum = normalizeEnum;
var _extend = extend;
var DEFAULT_MARGIN = 10;
var DEFAULT_MARKER_HATCHING_WIDTH = 2;
var DEFAULT_MARKER_HATCHING_STEP = 5;
var CENTER = "center";
var RIGHT = "right";
var LEFT = "left";
var TOP = "top";
var BOTTOM = "bottom";
var HORIZONTAL = "horizontal";
var VERTICAL = "vertical";
var INSIDE = "inside";
var OUTSIDE = "outside";
var NONE = "none";
var HEIGHT = "height";
var WIDTH = "width";
var parseHorizontalAlignment = _enumParser([LEFT, CENTER, RIGHT]);
var parseVerticalAlignment = _enumParser([TOP, BOTTOM]);
var parseOrientation = _enumParser([VERTICAL, HORIZONTAL]);
var parseItemTextPosition = _enumParser([LEFT, RIGHT, TOP, BOTTOM]);
var parsePosition = _enumParser([OUTSIDE, INSIDE]);
var parseItemsAlignment = _enumParser([LEFT, CENTER, RIGHT]);

function getState(state, color, stateName) {
    if (!state) {
        return
    }
    var colorFromAction = state.fill;
    return extend({}, {
        state: stateName,
        fill: colorFromAction === NONE ? color : colorFromAction,
        opacity: state.opacity,
        filter: state.filter,
        hatching: _extend({}, state.hatching, {
            step: DEFAULT_MARKER_HATCHING_STEP,
            width: DEFAULT_MARKER_HATCHING_WIDTH
        })
    })
}

function getAttributes(item, state, size) {
    var attrs = processHatchingAttrs(item, state);
    if (attrs.fill && 0 === attrs.fill.indexOf("DevExpress")) {
        attrs.fill = getFuncIri(attrs.fill)
    }
    attrs.opacity = attrs.opacity >= 0 ? attrs.opacity : 1;
    return extend({}, attrs, {
        size: size
    })
}

function parseMargins(options) {
    var margin = options.margin;
    if (margin >= 0) {
        margin = _Number(options.margin);
        margin = {
            top: margin,
            bottom: margin,
            left: margin,
            right: margin
        }
    } else {
        margin = {
            top: margin.top >= 0 ? _Number(margin.top) : DEFAULT_MARGIN,
            bottom: margin.bottom >= 0 ? _Number(margin.bottom) : DEFAULT_MARGIN,
            left: margin.left >= 0 ? _Number(margin.left) : DEFAULT_MARGIN,
            right: margin.right >= 0 ? _Number(margin.right) : DEFAULT_MARGIN
        }
    }
    options.margin = margin
}

function getSizeItem(options, markerBBox, labelBBox) {
    var width;
    var height;
    switch (options.itemTextPosition) {
        case LEFT:
        case RIGHT:
            width = markerBBox.width + 7 + labelBBox.width;
            height = _max(markerBBox.height, labelBBox.height);
            break;
        case TOP:
        case BOTTOM:
            width = _max(markerBBox.width, labelBBox.width);
            height = markerBBox.height + 4 + labelBBox.height
    }
    return {
        width: width,
        height: height
    }
}

function calculateBBoxLabelAndMarker(markerBBox, labelBBox) {
    var bBox = {};
    bBox.left = _min(markerBBox.x, labelBBox.x);
    bBox.top = _min(markerBBox.y, labelBBox.y);
    bBox.right = _max(markerBBox.x + markerBBox.width, labelBBox.x + labelBBox.width);
    bBox.bottom = _max(markerBBox.y + markerBBox.height, labelBBox.y + labelBBox.height);
    return bBox
}

function applyMarkerState(id, idToIndexMap, items, stateName) {
    var item = idToIndexMap && items[idToIndexMap[id]];
    if (item) {
        item.renderMarker(item.states[stateName])
    }
}

function parseOptions(options, textField, allowInsidePosition) {
    if (!options) {
        return null
    }
    parseMargins(options);
    options.horizontalAlignment = parseHorizontalAlignment(options.horizontalAlignment, RIGHT);
    options.verticalAlignment = parseVerticalAlignment(options.verticalAlignment, options.horizontalAlignment === CENTER ? BOTTOM : TOP);
    options.orientation = parseOrientation(options.orientation, options.horizontalAlignment === CENTER ? HORIZONTAL : VERTICAL);
    options.itemTextPosition = parseItemTextPosition(options.itemTextPosition, options.orientation === HORIZONTAL ? BOTTOM : RIGHT);
    options.position = allowInsidePosition ? parsePosition(options.position, OUTSIDE) : OUTSIDE;
    options.itemsAlignment = parseItemsAlignment(options.itemsAlignment, null);
    options.hoverMode = _normalizeEnum(options.hoverMode);
    options.customizeText = _isFunction(options.customizeText) ? options.customizeText : function() {
        return this[textField]
    };
    options.customizeHint = _isFunction(options.customizeHint) ? options.customizeHint : noop;
    options._incidentOccurred = options._incidentOccurred || noop;
    return options
}

function createSquareMarker(renderer, size) {
    return renderer.rect(0, 0, size, size)
}

function createCircleMarker(renderer, size) {
    return renderer.circle(size / 2, size / 2, size / 2)
}

function isCircle(type) {
    return "circle" === _normalizeEnum(type)
}

function inRect(rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

function checkLinesSize(lines, layoutOptions, countItems, margins) {
    var position = {
        x: 0,
        y: 0
    };
    var maxMeasureLength = 0;
    var maxAltMeasureLength = 0;
    var margin = 0;
    if ("y" === layoutOptions.direction) {
        margin = margins.top + margins.bottom
    } else {
        margin = margins.left + margins.right
    }
    lines.forEach((function(line, i) {
        var firstItem = line[0];
        var lineLength = line.length;
        line.forEach((function(item, index) {
            var offset = item.offset || layoutOptions.spacing;
            position[layoutOptions.direction] += item[layoutOptions.measure] + (index !== lineLength - 1 ? offset : 0);
            maxMeasureLength = _max(maxMeasureLength, position[layoutOptions.direction])
        }));
        position[layoutOptions.direction] = 0;
        position[layoutOptions.altDirection] += firstItem[layoutOptions.altMeasure] + firstItem.altOffset || layoutOptions.altSpacing;
        maxAltMeasureLength = _max(maxAltMeasureLength, position[layoutOptions.altDirection])
    }));
    if (maxMeasureLength + margin > layoutOptions.length) {
        layoutOptions.countItem = decreaseItemCount(layoutOptions, countItems);
        return true
    }
}

function decreaseItemCount(layoutOptions, countItems) {
    layoutOptions.altCountItem++;
    return _ceil(countItems / layoutOptions.altCountItem)
}

function getLineLength(line, layoutOptions) {
    return line.reduce((lineLength, item) => {
        var offset = item.offset || layoutOptions.spacing;
        return lineLength + item[layoutOptions.measure] + offset
    }, 0)
}

function getMaxLineLength(lines, layoutOptions) {
    return lines.reduce((maxLineLength, line) => _max(maxLineLength, getLineLength(line, layoutOptions)), 0)
}

function getInitPositionForDirection(line, layoutOptions, maxLineLength) {
    var lineLength = getLineLength(line, layoutOptions);
    var initPosition;
    switch (layoutOptions.itemsAlignment) {
        case RIGHT:
            initPosition = maxLineLength - lineLength;
            break;
        case CENTER:
            initPosition = (maxLineLength - lineLength) / 2;
            break;
        default:
            initPosition = 0
    }
    return initPosition
}

function getPos(layoutOptions) {
    switch (layoutOptions.itemTextPosition) {
        case BOTTOM:
            return {
                horizontal: CENTER, vertical: TOP
            };
        case TOP:
            return {
                horizontal: CENTER, vertical: BOTTOM
            };
        case LEFT:
            return {
                horizontal: RIGHT, vertical: CENTER
            };
        case RIGHT:
            return {
                horizontal: LEFT, vertical: CENTER
            }
    }
}

function getLines(lines, layoutOptions, itemIndex) {
    var tableLine = {};
    if (itemIndex % layoutOptions.countItem === 0) {
        if (layoutOptions.markerOffset) {
            lines.push([], [])
        } else {
            lines.push([])
        }
    }
    if (layoutOptions.markerOffset) {
        tableLine.firstLine = lines[lines.length - 1];
        tableLine.secondLine = lines[lines.length - 2]
    } else {
        tableLine.firstLine = tableLine.secondLine = lines[lines.length - 1]
    }
    return tableLine
}

function setMaxInLine(line, measure) {
    var maxLineSize = line.reduce((maxLineSize, item) => {
        var itemMeasure = item ? item[measure] : maxLineSize;
        return _max(maxLineSize, itemMeasure)
    }, 0);
    line.forEach(item => {
        if (item) {
            item[measure] = maxLineSize
        }
    })
}

function transpose(array) {
    var width = array.length;
    var height = array[0].length;
    var i;
    var j;
    var transposeArray = [];
    for (i = 0; i < height; i++) {
        transposeArray[i] = [];
        for (j = 0; j < width; j++) {
            transposeArray[i][j] = array[j][i]
        }
    }
    return transposeArray
}

function getAlign(position) {
    switch (position) {
        case TOP:
        case BOTTOM:
            return CENTER;
        case LEFT:
            return RIGHT;
        case RIGHT:
            return LEFT
    }
}
var getMarkerCreator = function(type) {
    return isCircle(type) ? createCircleMarker : createSquareMarker
};

function getTitleHorizontalAlignment(options) {
    if (options.horizontalAlignment === CENTER) {
        return CENTER
    } else if (options.itemTextPosition === RIGHT) {
        return LEFT
    } else if (options.itemTextPosition === LEFT) {
        return RIGHT
    } else {
        return CENTER
    }
}
export var Legend = function(settings) {
    this._renderer = settings.renderer;
    this._legendGroup = settings.group;
    this._backgroundClass = settings.backgroundClass;
    this._itemGroupClass = settings.itemGroupClass;
    this._textField = settings.textField;
    this._getCustomizeObject = settings.getFormatObject;
    this._titleGroupClass = settings.titleGroupClass;
    this._allowInsidePosition = settings.allowInsidePosition;
    this._widget = settings.widget;
    this._updated = false
};
var _Legend = Legend;
var legendPrototype = _Legend.prototype = clone(LayoutElement.prototype);
extend(legendPrototype, {
    constructor: _Legend,
    getOptions: function() {
        return this._options
    },
    update: function() {
        var data = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        var options = arguments.length > 1 ? arguments[1] : void 0;
        var themeManagerTitleOptions = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        var that = this;
        options = that._options = parseOptions(options, that._textField, that._allowInsidePosition) || {};
        var initMarkerSize = options.markerSize;
        this._updated = true;
        this._data = data.map(dataItem => {
            dataItem.size = _Number(dataItem.size > 0 ? dataItem.size : initMarkerSize);
            dataItem.marker = getAttributes(dataItem, dataItem.states.normal);
            Object.defineProperty(dataItem.marker, "size", {
                get: () => dataItem.size,
                set(value) {
                    dataItem.size = value
                }
            });
            Object.defineProperty(dataItem.marker, "opacity", {
                get: () => dataItem.states.normal.opacity,
                set(value) {
                    dataItem.states.normal.opacity = dataItem.states.hover.opacity = dataItem.states.selection.opacity = value
                }
            });
            return dataItem
        });
        if (options.customizeItems) {
            that._data = options.customizeItems(data.slice()) || data
        }
        that._boundingRect = {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
        if (that.isVisible() && !that._title) {
            that._title = new Title({
                renderer: that._renderer,
                cssClass: that._titleGroupClass,
                root: that._legendGroup
            })
        }
        if (that._title) {
            var titleOptions = options.title;
            themeManagerTitleOptions.horizontalAlignment = getTitleHorizontalAlignment(options);
            that._title.update(themeManagerTitleOptions, titleOptions)
        }
        this.erase();
        return that
    },
    isVisible: function() {
        return this._options && this._options.visible
    },
    draw: function(width, height) {
        var items = this._getItemData();
        this.erase();
        if (!(this.isVisible() && items && items.length)) {
            return this
        }
        this._insideLegendGroup = this._renderer.g().enableLinks().append(this._legendGroup);
        this._title.changeLink(this._insideLegendGroup);
        this._createBackground();
        if (this._title.hasText()) {
            var horizontalPadding = this._background ? 2 * this._options.paddingLeftRight : 0;
            this._title.draw(width - horizontalPadding, height)
        }
        this._markersGroup = this._renderer.g().attr({
            class: this._itemGroupClass
        }).append(this._insideLegendGroup);
        this._createItems(items);
        this._updateElementsPosition(width, height);
        return this
    },
    _measureElements: function() {
        var options = this._options;
        var maxBBoxHeight = 0;
        this._items.forEach(item => {
            var labelBBox = item.label.getBBox();
            var markerBBox = item.marker.getBBox();
            item.markerBBox = markerBBox;
            item.markerSize = Math.max(markerBBox.width, markerBBox.height);
            var bBox = getSizeItem(options, markerBBox, labelBBox);
            item.labelBBox = labelBBox;
            item.bBox = bBox;
            maxBBoxHeight = _max(maxBBoxHeight, bBox.height)
        });
        if (options.equalRowHeight) {
            this._items.forEach(item => item.bBox.height = maxBBoxHeight)
        }
    },
    _updateElementsPosition: function(width, height) {
        var options = this._options;
        this._size = {
            width: width,
            height: height
        };
        this._measureElements();
        this._locateElements(options);
        this._finalUpdate(options);
        var size = this.getLayoutOptions();
        if (size.width > width || size.height > height) {
            this.freeSpace()
        }
    },
    _createItems: function(items) {
        var that = this;
        var options = that._options;
        var renderer = that._renderer;
        var createMarker = getMarkerCreator(options.markerShape);
        that._markersId = {};
        var templateFunction = !options.markerTemplate ? (dataItem, group) => {
            var attrs = dataItem.marker;
            createMarker(renderer, attrs.size).attr({
                fill: attrs.fill,
                opacity: attrs.opacity,
                filter: attrs.filter
            }).append({
                element: group
            })
        } : options.markerTemplate;
        var template = that._widget._getTemplate(templateFunction);
        var markersGroup = that._markersGroup;
        markersGroup.css(patchFontOptions(options.font));
        that._deferredItems = [];
        that._templatesGroups = [];
        that._items = (items || []).map((dataItem, i) => {
            var stateOfDataItem = dataItem.states;
            var normalState = stateOfDataItem.normal;
            var normalStateFill = normalState.fill;
            dataItem.size = dataItem.marker.size;
            var states = {
                normal: extend(normalState, {
                    fill: normalStateFill || options.markerColor || options.defaultColor,
                    state: "normal"
                }),
                hover: getState(stateOfDataItem.hover, normalStateFill, "hovered"),
                selection: getState(stateOfDataItem.selection, normalStateFill, "selected")
            };
            dataItem.states = states;
            var itemGroup = renderer.g().append(markersGroup);
            var markerGroup = renderer.g().attr({
                class: "dxl-marker"
            }).append(itemGroup);
            that._deferredItems[i] = new Deferred;
            that._templatesGroups.push(markerGroup);
            var item = {
                label: that._createLabel(dataItem, itemGroup),
                marker: markerGroup,
                renderer: renderer,
                group: itemGroup,
                tracker: {
                    id: dataItem.id,
                    argument: dataItem.argument,
                    argumentIndex: dataItem.argumentIndex
                },
                states: states,
                itemTextPosition: options.itemTextPosition,
                markerOffset: 0,
                bBoxes: [],
                renderMarker(state) {
                    dataItem.marker = getAttributes(item, state, dataItem.size);
                    markerGroup.clear();
                    template.render({
                        model: dataItem,
                        container: markerGroup.element,
                        onRendered: that._deferredItems[i].resolve
                    })
                }
            };
            item.renderMarker(states.normal);
            that._createHint(dataItem, itemGroup);
            if (void 0 !== dataItem.id) {
                that._markersId[dataItem.id] = i
            }
            return item
        })
    },
    getTemplatesGroups: function() {
        return this._templatesGroups || []
    },
    getTemplatesDef: function() {
        return this._deferredItems || []
    },
    _getItemData: function() {
        var items = this._data || [];
        var options = this._options || {};
        if (options.inverted) {
            items = items.slice().reverse()
        }
        return items.filter(i => i.visible)
    },
    _finalUpdate: function(options) {
        this._adjustBackgroundSettings(options);
        this._setBoundingRect(options.margin)
    },
    erase: function() {
        var insideLegendGroup = this._insideLegendGroup;
        insideLegendGroup && insideLegendGroup.dispose();
        this._insideLegendGroup = this._markersGroup = this._x1 = this._x2 = this._y2 = this._y2 = null;
        return this
    },
    _locateElements: function(locationOptions) {
        this._moveInInitialValues();
        this._locateRowsColumns(locationOptions)
    },
    _moveInInitialValues: function() {
        this._title.hasText() && this._title.move([0, 0]);
        this._legendGroup && this._legendGroup.move(0, 0);
        this._background && this._background.attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        })
    },
    applySelected: function(id) {
        applyMarkerState(id, this._markersId, this._items, "selection");
        return this
    },
    applyHover: function(id) {
        applyMarkerState(id, this._markersId, this._items, "hover");
        return this
    },
    resetItem: function(id) {
        applyMarkerState(id, this._markersId, this._items, "normal");
        return this
    },
    _createLabel: function(data, group) {
        var labelFormatObject = this._getCustomizeObject(data);
        var options = this._options;
        var align = getAlign(options.itemTextPosition);
        var text = options.customizeText.call(labelFormatObject, labelFormatObject);
        var fontStyle = _isDefined(data.textOpacity) ? {
            color: options.font.color,
            opacity: data.textOpacity
        } : {};
        return this._renderer.text(text, 0, 0).css(patchFontOptions(fontStyle)).attr({
            align: align,
            class: options.cssClass
        }).append(group)
    },
    _createHint: function(data, group) {
        var labelFormatObject = this._getCustomizeObject(data);
        var text = this._options.customizeHint.call(labelFormatObject, labelFormatObject);
        if (_isDefined(text) && "" !== text) {
            group.setTitle(text)
        }
    },
    _createBackground: function() {
        var isInside = this._options.position === INSIDE;
        var color = this._options.backgroundColor;
        var fill = color || (isInside ? this._options.containerBackgroundColor : NONE);
        if (this._options.border.visible || (isInside || color) && color !== NONE) {
            this._background = this._renderer.rect(0, 0, 0, 0).attr({
                fill: fill,
                class: this._backgroundClass
            }).append(this._insideLegendGroup)
        }
    },
    _locateRowsColumns: function(options) {
        var iteration = 0;
        var layoutOptions = this._getItemsLayoutOptions();
        var countItems = this._items.length;
        var lines;
        do {
            lines = [];
            this._createLines(lines, layoutOptions);
            this._alignLines(lines, layoutOptions);
            iteration++
        } while (checkLinesSize(lines, layoutOptions, countItems, options.margin) && iteration < countItems);
        this._applyItemPosition(lines, layoutOptions)
    },
    _createLines: function(lines, layoutOptions) {
        this._items.forEach((item, i) => {
            var tableLine = getLines(lines, layoutOptions, i);
            var labelBox = {
                width: item.labelBBox.width,
                height: item.labelBBox.height,
                element: item.label,
                bBox: item.labelBBox,
                pos: getPos(layoutOptions),
                itemIndex: i
            };
            var markerBox = {
                width: item.markerBBox.width,
                height: item.markerBBox.height,
                element: item.marker,
                pos: {
                    horizontal: CENTER,
                    vertical: CENTER
                },
                bBox: {
                    width: item.markerBBox.width,
                    height: item.markerBBox.height,
                    x: item.markerBBox.x,
                    y: item.markerBBox.y
                },
                itemIndex: i
            };
            var firstItem;
            var secondItem;
            var offsetDirection = layoutOptions.markerOffset ? "altOffset" : "offset";
            if (layoutOptions.inverseLabelPosition) {
                firstItem = labelBox;
                secondItem = markerBox
            } else {
                firstItem = markerBox;
                secondItem = labelBox
            }
            firstItem[offsetDirection] = layoutOptions.labelOffset;
            tableLine.secondLine.push(firstItem);
            tableLine.firstLine.push(secondItem)
        })
    },
    _alignLines: function(lines, layoutOptions) {
        var i;
        var measure = layoutOptions.altMeasure;
        lines.forEach(line => setMaxInLine(line, measure));
        measure = layoutOptions.measure;
        if (layoutOptions.itemsAlignment) {
            if (layoutOptions.markerOffset) {
                for (i = 0; i < lines.length;) {
                    transpose([lines[i++], lines[i++]]).forEach(processLine)
                }
            }
        } else {
            transpose(lines).forEach(processLine)
        }

        function processLine(line) {
            setMaxInLine(line, measure)
        }
    },
    _applyItemPosition: function(lines, layoutOptions) {
        var that = this;
        var position = {
            x: 0,
            y: 0
        };
        var maxLineLength = getMaxLineLength(lines, layoutOptions);
        lines.forEach(line => {
            var firstItem = line[0];
            var altOffset = firstItem.altOffset || layoutOptions.altSpacing;
            position[layoutOptions.direction] = getInitPositionForDirection(line, layoutOptions, maxLineLength);
            line.forEach(item => {
                var offset = item.offset || layoutOptions.spacing;
                var wrap = new WrapperLayoutElement(item.element, item.bBox);
                var itemBBoxOptions = {
                    x: position.x,
                    y: position.y,
                    width: item.width,
                    height: item.height
                };
                var itemBBox = new WrapperLayoutElement(null, itemBBoxOptions);
                var itemLegend = that._items[item.itemIndex];
                wrap.position({
                    of: itemBBox,
                    my: item.pos,
                    at: item.pos
                });
                itemLegend.bBoxes.push(itemBBox);
                position[layoutOptions.direction] += item[layoutOptions.measure] + offset
            });
            position[layoutOptions.altDirection] += firstItem[layoutOptions.altMeasure] + altOffset
        });
        this._items.forEach(item => {
            var itemBBox = calculateBBoxLabelAndMarker(item.bBoxes[0].getLayoutOptions(), item.bBoxes[1].getLayoutOptions());
            var horizontal = that._options.columnItemSpacing / 2;
            var vertical = that._options.rowItemSpacing / 2;
            item.tracker.left = itemBBox.left - horizontal;
            item.tracker.right = itemBBox.right + horizontal;
            item.tracker.top = itemBBox.top - vertical;
            item.tracker.bottom = itemBBox.bottom + vertical
        })
    },
    _getItemsLayoutOptions: function() {
        var options = this._options;
        var orientation = options.orientation;
        var layoutOptions = {
            itemsAlignment: options.itemsAlignment,
            orientation: options.orientation
        };
        var width = this._size.width - (this._background ? 2 * options.paddingLeftRight : 0);
        var height = this._size.height - (this._background ? 2 * options.paddingTopBottom : 0);
        if (orientation === HORIZONTAL) {
            layoutOptions.length = width;
            layoutOptions.spacing = options.columnItemSpacing;
            layoutOptions.direction = "x";
            layoutOptions.measure = WIDTH;
            layoutOptions.altMeasure = HEIGHT;
            layoutOptions.altDirection = "y";
            layoutOptions.altSpacing = options.rowItemSpacing;
            layoutOptions.countItem = options.columnCount;
            layoutOptions.altCountItem = options.rowCount;
            layoutOptions.marginTextLabel = 4;
            layoutOptions.labelOffset = 7;
            if (options.itemTextPosition === BOTTOM || options.itemTextPosition === TOP) {
                layoutOptions.labelOffset = 4;
                layoutOptions.markerOffset = true
            }
        } else {
            layoutOptions.length = height;
            layoutOptions.spacing = options.rowItemSpacing;
            layoutOptions.direction = "y";
            layoutOptions.measure = HEIGHT;
            layoutOptions.altMeasure = WIDTH;
            layoutOptions.altDirection = "x";
            layoutOptions.altSpacing = options.columnItemSpacing;
            layoutOptions.countItem = options.rowCount;
            layoutOptions.altCountItem = options.columnCount;
            layoutOptions.marginTextLabel = 7;
            layoutOptions.labelOffset = 4;
            if (options.itemTextPosition === RIGHT || options.itemTextPosition === LEFT) {
                layoutOptions.labelOffset = 7;
                layoutOptions.markerOffset = true
            }
        }
        if (!layoutOptions.countItem) {
            if (layoutOptions.altCountItem) {
                layoutOptions.countItem = _ceil(this._items.length / layoutOptions.altCountItem)
            } else {
                layoutOptions.countItem = this._items.length
            }
        }
        if (options.itemTextPosition === TOP || options.itemTextPosition === LEFT) {
            layoutOptions.inverseLabelPosition = true
        }
        layoutOptions.itemTextPosition = options.itemTextPosition;
        layoutOptions.altCountItem = layoutOptions.altCountItem || _ceil(this._items.length / layoutOptions.countItem);
        return layoutOptions
    },
    _adjustBackgroundSettings: function(locationOptions) {
        if (!this._background) {
            return
        }
        var border = locationOptions.border;
        var legendBox = this._calculateTotalBox();
        var backgroundSettings = {
            x: _round(legendBox.x - locationOptions.paddingLeftRight),
            y: _round(legendBox.y - locationOptions.paddingTopBottom),
            width: _round(legendBox.width) + 2 * locationOptions.paddingLeftRight,
            height: _round(legendBox.height),
            opacity: locationOptions.backgroundOpacity
        };
        if (border.visible && border.width && border.color && border.color !== NONE) {
            backgroundSettings["stroke-width"] = border.width;
            backgroundSettings.stroke = border.color;
            backgroundSettings["stroke-opacity"] = border.opacity;
            backgroundSettings.dashStyle = border.dashStyle;
            backgroundSettings.rx = border.cornerRadius || 0;
            backgroundSettings.ry = border.cornerRadius || 0
        }
        this._background.attr(backgroundSettings)
    },
    _setBoundingRect: function(margin) {
        if (!this._insideLegendGroup) {
            return
        }
        var box = this._calculateTotalBox();
        box.height += margin.top + margin.bottom;
        box.widthWithoutMargins = box.width;
        box.width += margin.left + margin.right;
        box.x -= margin.left;
        box.y -= margin.top;
        this._boundingRect = box
    },
    _calculateTotalBox: function() {
        var markerBox = this._markersGroup.getBBox();
        var titleBox = this._title.getCorrectedLayoutOptions();
        var box = this._insideLegendGroup.getBBox();
        var verticalPadding = this._background ? 2 * this._options.paddingTopBottom : 0;
        box.height = markerBox.height + titleBox.height + verticalPadding;
        titleBox.width > box.width && (box.width = titleBox.width);
        return box
    },
    getActionCallback: function(point) {
        var that = this;
        if (that._options.visible) {
            return function(act) {
                that[act](point.index)
            }
        } else {
            return noop
        }
    },
    getLayoutOptions: function() {
        var options = this._options;
        var boundingRect = this._insideLegendGroup ? this._boundingRect : {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
        if (options) {
            boundingRect.verticalAlignment = options.verticalAlignment;
            boundingRect.horizontalAlignment = options.horizontalAlignment;
            if (options.orientation === HORIZONTAL) {
                boundingRect.cutLayoutSide = options.verticalAlignment;
                boundingRect.cutSide = "vertical"
            } else if (options.horizontalAlignment === CENTER) {
                boundingRect.cutLayoutSide = options.verticalAlignment;
                boundingRect.cutSide = "vertical"
            } else {
                boundingRect.cutLayoutSide = options.horizontalAlignment;
                boundingRect.cutSide = "horizontal"
            }
            boundingRect.position = {
                horizontal: options.horizontalAlignment,
                vertical: options.verticalAlignment
            };
            return boundingRect
        }
        return null
    },
    shift: function(x, y) {
        var box = {};
        if (this._insideLegendGroup) {
            this._insideLegendGroup.attr({
                translateX: x - this._boundingRect.x,
                translateY: y - this._boundingRect.y
            })
        }
        this._title && this._shiftTitle(this._boundingRect.widthWithoutMargins);
        this._markersGroup && this._shiftMarkers();
        if (this._insideLegendGroup) {
            box = this._legendGroup.getBBox()
        }
        this._x1 = box.x;
        this._y1 = box.y;
        this._x2 = box.x + box.width;
        this._y2 = box.y + box.height;
        return this
    },
    _shiftTitle: function(boxWidth) {
        var title = this._title;
        var titleBox = title.getCorrectedLayoutOptions();
        if (!titleBox || !title.hasText()) {
            return
        }
        var width = boxWidth - (this._background ? 2 * this._options.paddingLeftRight : 0);
        var titleOptions = title.getOptions();
        var titleY = titleBox.y + titleOptions.margin.top;
        var titleX = 0;
        if (titleOptions.verticalAlignment === BOTTOM && this._markersGroup) {
            titleY += this._markersGroup.getBBox().height
        }
        if (titleOptions.horizontalAlignment === RIGHT) {
            titleX = width - titleBox.width
        } else if (titleOptions.horizontalAlignment === CENTER) {
            titleX = (width - titleBox.width) / 2
        }
        title.shift(titleX, titleY)
    },
    _shiftMarkers: function() {
        var titleBox = this._title.getLayoutOptions();
        var markerBox = this._markersGroup.getBBox();
        var titleOptions = this._title.getOptions() || {};
        var center = 0;
        var y = 0;
        if (titleBox.width > markerBox.width && this._options.horizontalAlignment === CENTER) {
            center = titleBox.width / 2 - markerBox.width / 2
        }
        if (titleOptions.verticalAlignment === TOP) {
            y = titleBox.height
        }
        if (0 !== center || 0 !== y) {
            this._markersGroup.attr({
                translateX: center,
                translateY: y
            });
            this._items.forEach(item => {
                item.tracker.left += center;
                item.tracker.right += center;
                item.tracker.top += y;
                item.tracker.bottom += y
            })
        }
    },
    getPosition: function() {
        return this._options.position
    },
    coordsIn: function(x, y) {
        return x >= this._x1 && x <= this._x2 && y >= this._y1 && y <= this._y2
    },
    getItemByCoord: function(x, y) {
        var items = this._items;
        var legendGroup = this._insideLegendGroup;
        x -= legendGroup.attr("translateX");
        y -= legendGroup.attr("translateY");
        for (var i = 0; i < items.length; i++) {
            if (inRect(items[i].tracker, x, y)) {
                return items[i].tracker
            }
        }
        return null
    },
    dispose: function() {
        this._title && this._title.dispose();
        this._legendGroup = this._insideLegendGroup = this._title = this._renderer = this._options = this._data = this._items = null;
        return this
    },
    layoutOptions: function() {
        if (!this.isVisible()) {
            return null
        }
        var pos = this.getLayoutOptions();
        return {
            horizontalAlignment: this._options.horizontalAlignment,
            verticalAlignment: this._options.verticalAlignment,
            side: pos.cutSide,
            priority: 1,
            position: this.getPosition()
        }
    },
    measure: function(size) {
        if (this._updated || !this._insideLegendGroup) {
            this.draw(size[0], size[1]);
            this._updated = false
        } else {
            this._items.forEach(item => {
                item.bBoxes = []
            });
            this._updateElementsPosition(size[0], size[1])
        }
        var rect = this.getLayoutOptions();
        return [rect.width, rect.height]
    },
    move: function(rect) {
        this.shift(rect[0], rect[1])
    },
    freeSpace: function() {
        this._options._incidentOccurred("W2104");
        this.erase()
    }
});
export var plugin = {
    name: "legend",
    init: function() {
        var group = this._renderer.g().attr({
            class: this._rootClassPrefix + "-legend"
        }).enableLinks().append(this._renderer.root);
        this._legend = new Legend({
            renderer: this._renderer,
            group: group,
            widget: this,
            itemGroupClass: this._rootClassPrefix + "-item",
            titleGroupClass: this._rootClassPrefix + "-title",
            textField: "text",
            getFormatObject: function(data) {
                return {
                    item: data.item,
                    text: data.text
                }
            }
        });
        this._layout.add(this._legend)
    },
    extenders: {
        _applyTilesAppearance: function() {
            var that = this;
            this._items.forEach((function(item) {
                that._applyLegendItemStyle(item.id, item.getState())
            }))
        },
        _buildNodes: function() {
            this._createLegendItems()
        }
    },
    members: {
        _applyLegendItemStyle: function(id, state) {
            var legend = this._legend;
            switch (state) {
                case "hover":
                    legend.applyHover(id);
                    break;
                case "selection":
                    legend.applySelected(id);
                    break;
                default:
                    legend.resetItem(id)
            }
        },
        _createLegendItems: function() {
            if (this._legend.update(this._getLegendData(), this._getOption("legend"), this._themeManager.theme("legend").title)) {
                this._requestChange(["LAYOUT"])
            }
        }
    },
    dispose: function() {
        this._legend.dispose()
    },
    customize: function(constructor) {
        constructor.prototype._proxyData.push((function(x, y) {
            if (this._legend.coordsIn(x, y)) {
                var item = this._legend.getItemByCoord(x, y);
                if (item) {
                    return {
                        id: item.id,
                        type: "legend"
                    }
                }
            }
        }));
        constructor.addChange({
            code: "LEGEND",
            handler: function() {
                this._createLegendItems()
            },
            isThemeDependent: true,
            option: "legend",
            isOptionChange: true
        })
    }
};
