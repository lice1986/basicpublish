/**
 * DevExtreme (esm/viz/vector_map/control_bar/control_bar.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var _math = Math;
var _min = _math.min;
var _max = _math.max;
var _round = _math.round;
var _floor = _math.floor;
var _sqrt = _math.sqrt;
import {
    parseScalar as _parseScalar,
    enumParser
} from "../../core/utils";
import {
    createTracker,
    createVisibilityGroup,
    toggleDisplay
} from "./utils";
var parseHorizontalAlignment = enumParser(["left", "center", "right"]);
var parseVerticalAlignment = enumParser(["top", "bottom"]);
var COMMAND_RESET = "command-reset";
var COMMAND_MOVE_UP = "command-move-up";
var COMMAND_MOVE_RIGHT = "command-move-right";
var COMMAND_MOVE_DOWN = "command-move-down";
var COMMAND_MOVE_LEFT = "command-move-left";
var COMMAND_ZOOM_IN = "command-zoom-in";
var COMMAND_ZOOM_OUT = "command-zoom-out";
var COMMAND_ZOOM_DRAG_LINE = "command-zoom-drag-line";
var COMMAND_ZOOM_DRAG = "command-zoom-drag";
var EVENT_TARGET_TYPE = "control-bar";
var FLAG_CENTERING = 1;
var FLAG_ZOOMING = 2;
var SIZE_OPTIONS = {
    bigCircleSize: 58,
    smallCircleSize: 28,
    buttonSize: 10,
    arrowButtonOffset: 20,
    incDecButtonSize: 11,
    incButtonOffset: 66,
    decButtonOffset: 227,
    sliderLineStartOffset: 88.5,
    sliderLineEndOffset: 205.5,
    sliderLength: 20,
    sliderWidth: 8,
    trackerGap: 4
};
var OFFSET_X = 30.5;
var OFFSET_Y = 30.5;
var TOTAL_WIDTH = 61;
var TOTAL_HEIGHT = 274;
var COMMAND_TO_TYPE_MAP = {};
COMMAND_TO_TYPE_MAP[COMMAND_RESET] = ResetCommand;
COMMAND_TO_TYPE_MAP[COMMAND_MOVE_UP] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_RIGHT] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_DOWN] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_LEFT] = MoveCommand;
COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_IN] = COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_OUT] = ZoomCommand;
COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_DRAG] = ZoomDragCommand;
export function ControlBar(parameters) {
    this._params = parameters;
    this._createElements(parameters.renderer, parameters.container, parameters.dataKey);
    parameters.layoutControl.addItem(this);
    this._subscribeToProjection(parameters.projection);
    this._subscribeToTracker(parameters.tracker);
    this._createCallbacks(parameters.projection)
}
ControlBar.prototype = {
    constructor: ControlBar,
    _flags: 0,
    dispose: function() {
        this._params.layoutControl.removeItem(this);
        this._root.linkRemove().linkOff();
        this._offProjection();
        this._offTracker();
        this._params = this._root = this._offProjection = this._offTracker = this._callbacks = null
    },
    _subscribeToProjection: function(projection) {
        var that = this;
        that._offProjection = projection.on({
            engine: function() {
                that._update()
            },
            zoom: updateZoom,
            "max-zoom": function() {
                that._zoomPartition = projection.getZoomScalePartition();
                that._sliderUnitLength = that._sliderLineLength / that._zoomPartition;
                updateZoom()
            }
        });

        function updateZoom() {
            that._adjustZoom(projection.getScaledZoom())
        }
    },
    _subscribeToTracker: function(tracker) {
        var that = this;
        var isActive = false;
        that._offTracker = tracker.on({
            start: function(arg) {
                isActive = arg.data.name === EVENT_TARGET_TYPE;
                if (isActive) {
                    that._processStart(arg.data.index, arg)
                }
            },
            move: function(arg) {
                if (isActive) {
                    that._processMove(arg.data.index, arg)
                }
            },
            end: function() {
                if (isActive) {
                    that._processEnd();
                    isActive = false
                }
            }
        })
    },
    _createCallbacks: function(projection) {
        this._callbacks = {
            reset: function(isCenter, isZoom) {
                if (isCenter) {
                    projection.setCenter(null)
                }
                if (isZoom) {
                    projection.setZoom(null)
                }
            },
            beginMove: function() {
                projection.beginMoveCenter()
            },
            endMove: function() {
                projection.endMoveCenter()
            },
            move: function(shift) {
                projection.moveCenter(shift)
            },
            zoom: function(_zoom) {
                projection.setScaledZoom(_zoom)
            }
        }
    },
    _createElements: function(renderer, container, dataKey) {
        this._root = renderer.g().attr({
            class: "dxm-control-bar"
        }).linkOn(container, "control-bar");
        var panControl = this._panControl = createVisibilityGroup(renderer, this._root, "dxm-pan-control");
        var zoomBar = this._zoomBar = createVisibilityGroup(renderer, this._root, "dxm-zoom-bar");
        var trackersPan = this._trackersPan = createTracker(renderer, this._root);
        var trackersZoom = this._trackersZoom = createTracker(renderer, this._root);
        this._createTrackersPan(renderer, dataKey, trackersPan);
        this._createTrackersZoom(renderer, dataKey, trackersZoom);
        this._createPanControl(renderer, dataKey, panControl);
        this._createZoomBar(renderer, dataKey, zoomBar)
    },
    _createPanControl: function(renderer, dataKey, group) {
        var options = SIZE_OPTIONS;
        var size = options.buttonSize / 2;
        var offset1 = options.arrowButtonOffset - size;
        var offset2 = options.arrowButtonOffset;
        var directionOptions = {
            "stroke-linecap": "square",
            fill: "none"
        };
        renderer.circle(0, 0, options.bigCircleSize / 2).append(group);
        renderer.circle(0, 0, size).attr({
            fill: "none"
        }).append(group);
        renderer.path([-size, -offset1, 0, -offset2, size, -offset1], "line").attr(directionOptions).append(group);
        renderer.path([offset1, -size, offset2, 0, offset1, size], "line").attr(directionOptions).append(group);
        renderer.path([size, offset1, 0, offset2, -size, offset1], "line").attr(directionOptions).append(group);
        renderer.path([-offset1, size, -offset2, 0, -offset1, -size], "line").attr(directionOptions).append(group)
    },
    _createZoomBar: function(renderer, dataKey, group) {
        var options = SIZE_OPTIONS;
        var incDecButtonSize = options.incDecButtonSize / 2;
        renderer.circle(0, options.incButtonOffset, options.smallCircleSize / 2).append(group);
        renderer.path([
            [-incDecButtonSize, options.incButtonOffset, incDecButtonSize, options.incButtonOffset],
            [0, options.incButtonOffset - incDecButtonSize, 0, options.incButtonOffset + incDecButtonSize]
        ], "area").append(group);
        renderer.circle(0, options.decButtonOffset, options.smallCircleSize / 2).append(group);
        renderer.path([-incDecButtonSize, options.decButtonOffset, incDecButtonSize, options.decButtonOffset], "area").append(group);
        this._zoomLine = renderer.path([], "line").append(group);
        this._zoomDrag = renderer.rect(_floor(-options.sliderLength / 2), _floor(options.sliderLineEndOffset - options.sliderWidth / 2), options.sliderLength, options.sliderWidth).append(group);
        this._sliderLineLength = options.sliderLineEndOffset - options.sliderLineStartOffset
    },
    _createTrackersPan: function(renderer, dataKey, group) {
        var options = SIZE_OPTIONS;
        var size = _round((options.arrowButtonOffset - options.trackerGap) / 2);
        var offset1 = options.arrowButtonOffset - size;
        var offset2 = _round(_sqrt(options.bigCircleSize * options.bigCircleSize / 4 - size * size));
        var size2 = offset2 - offset1;
        renderer.rect(-size, -size, 2 * size, 2 * size).data(dataKey, {
            index: COMMAND_RESET,
            name: EVENT_TARGET_TYPE
        }).append(group);
        renderer.rect(-size, -offset2, 2 * size, size2).data(dataKey, {
            index: COMMAND_MOVE_UP,
            name: EVENT_TARGET_TYPE
        }).append(group);
        renderer.rect(offset1, -size, size2, 2 * size).data(dataKey, {
            index: COMMAND_MOVE_RIGHT,
            name: EVENT_TARGET_TYPE
        }).append(group);
        renderer.rect(-size, offset1, 2 * size, size2).data(dataKey, {
            index: COMMAND_MOVE_DOWN,
            name: EVENT_TARGET_TYPE
        }).append(group);
        renderer.rect(-offset2, -size, size2, 2 * size).data(dataKey, {
            index: COMMAND_MOVE_LEFT,
            name: EVENT_TARGET_TYPE
        }).append(group)
    },
    _createTrackersZoom: function(renderer, dataKey, group) {
        var options = SIZE_OPTIONS;
        renderer.circle(0, options.incButtonOffset, options.smallCircleSize / 2).data(dataKey, {
            index: COMMAND_ZOOM_IN,
            name: EVENT_TARGET_TYPE
        }).append(group);
        renderer.circle(0, options.decButtonOffset, options.smallCircleSize / 2).data(dataKey, {
            index: COMMAND_ZOOM_OUT,
            name: EVENT_TARGET_TYPE
        }).append(group);
        renderer.rect(-2, options.sliderLineStartOffset - 2, 4, options.sliderLineEndOffset - options.sliderLineStartOffset + 4).css({
            cursor: "default"
        }).data(dataKey, {
            index: COMMAND_ZOOM_DRAG_LINE,
            name: EVENT_TARGET_TYPE
        }).append(group);
        this._zoomDragTracker = renderer.rect(-options.sliderLength / 2, options.sliderLineEndOffset - options.sliderWidth / 2, options.sliderLength, options.sliderWidth).data(dataKey, {
            index: COMMAND_ZOOM_DRAG,
            name: EVENT_TARGET_TYPE
        }).append(group)
    },
    resize: function(size) {
        if (this._isActive) {
            this._root.attr({
                visibility: null !== size ? null : "hidden"
            })
        }
    },
    getLayoutOptions: function() {
        return this._isActive ? this._layoutOptions : null
    },
    locate: function(x, y) {
        this._root.attr({
            translateX: x + this._margin + OFFSET_X,
            translateY: y + this._margin + OFFSET_Y
        })
    },
    _update: function() {
        this._isActive = this._isEnabled && this._flags && this._params.projection.isInvertible();
        var groupPan = [this._panControl, this._trackersPan];
        var groupZoom = [this._zoomBar, this._trackersZoom];
        if (this._isActive) {
            this._root.linkAppend();
            toggleDisplay(groupPan, this._isPanVisible);
            toggleDisplay(groupZoom, this._isZoomVisible)
        } else {
            this._root.linkRemove()
        }
        this._processEnd();
        this.updateLayout()
    },
    setInteraction: function(interaction) {
        if (_parseScalar(interaction.centeringEnabled, true)) {
            this._flags |= FLAG_CENTERING
        } else {
            this._flags &= ~FLAG_CENTERING
        }
        if (_parseScalar(interaction.zoomingEnabled, true)) {
            this._flags |= FLAG_ZOOMING
        } else {
            this._flags &= ~FLAG_ZOOMING
        }
        this._update()
    },
    setOptions: function(options) {
        var styleSvg = {
            "stroke-width": options.borderWidth,
            stroke: options.borderColor,
            fill: options.color,
            "fill-opacity": options.opacity
        };
        this._isEnabled = !!_parseScalar(options.enabled, true);
        this._margin = options.margin || 0;
        this._layoutOptions = {
            width: 2 * this._margin + TOTAL_WIDTH,
            height: 2 * this._margin + TOTAL_HEIGHT,
            horizontalAlignment: parseHorizontalAlignment(options.horizontalAlignment, "left"),
            verticalAlignment: parseVerticalAlignment(options.verticalAlignment, "top")
        };
        this._isPanVisible = !!_parseScalar(options.panVisible, true);
        this._isZoomVisible = !!_parseScalar(options.zoomVisible, true);
        this._panControl.attr(styleSvg);
        this._zoomBar.attr(styleSvg);
        this._update()
    },
    _adjustZoom: function(zoom) {
        var start = SIZE_OPTIONS.sliderLineStartOffset;
        var end = SIZE_OPTIONS.sliderLineEndOffset;
        var h = SIZE_OPTIONS.sliderWidth;
        this._zoomFactor = _max(_min(_round(zoom), this._zoomPartition), 0);
        var transform = {
            translateY: -_round(this._zoomFactor * this._sliderUnitLength)
        };
        var y = end - h / 2 + transform.translateY;
        this._zoomLine.attr({
            points: [
                [0, start, 0, _max(start, y)],
                [0, _min(end, y + h), 0, end]
            ]
        });
        this._zoomDrag.attr(transform);
        this._zoomDragTracker.attr(transform)
    },
    _applyZoom: function() {
        this._callbacks.zoom(this._zoomFactor)
    },
    _processStart: function(command, arg) {
        var commandType;
        if (this._isActive) {
            commandType = COMMAND_TO_TYPE_MAP[command];
            this._command = commandType && commandType.flags & this._flags ? new commandType(this, command, arg) : null
        }
    },
    _processMove: function(command, arg) {
        this._command && this._command.update(command, arg)
    },
    _processEnd: function() {
        this._command && this._command.finish();
        this._command = null
    }
};

function disposeCommand(command) {
    delete command._owner;
    command.update = function() {};
    command.finish = function() {}
}

function ResetCommand(owner, command) {
    this._owner = owner;
    this._command = command
}
ResetCommand.flags = FLAG_CENTERING | FLAG_ZOOMING;
ResetCommand.prototype.update = function(command) {
    command !== this._command && disposeCommand(this)
};
ResetCommand.prototype.finish = function() {
    var flags = this._owner._flags;
    this._owner._callbacks.reset(!!(flags & FLAG_CENTERING), !!(flags & FLAG_ZOOMING));
    disposeCommand(this)
};

function MoveCommand(owner, command, arg) {
    this._command = command;
    var timeout = null;
    var dx = 0;
    var dy = 0;
    switch (this._command) {
        case COMMAND_MOVE_UP:
            dy = -10;
            break;
        case COMMAND_MOVE_RIGHT:
            dx = 10;
            break;
        case COMMAND_MOVE_DOWN:
            dy = 10;
            break;
        case COMMAND_MOVE_LEFT:
            dx = -10
    }
    this._stop = function() {
        clearTimeout(timeout);
        owner._callbacks.endMove();
        this._stop = owner = null;
        return this
    };
    null;
    owner._callbacks.beginMove();
    ! function callback() {
        owner._callbacks.move([dx, dy]);
        timeout = setTimeout(callback, 100)
    }()
}
MoveCommand.flags = FLAG_CENTERING;
MoveCommand.prototype.update = function(command) {
    this._command !== command && this.finish()
};
MoveCommand.prototype.finish = function() {
    disposeCommand(this._stop())
};

function ZoomCommand(owner, command) {
    this._owner = owner;
    this._command = command;
    var timeout = null;
    var dZoom = this._command === COMMAND_ZOOM_IN ? 1 : -1;
    this._stop = function() {
        clearTimeout(timeout);
        this._stop = owner = null;
        return this
    };
    ! function callback() {
        owner._adjustZoom(owner._zoomFactor + dZoom);
        timeout = setTimeout(callback, 150)
    }()
}
ZoomCommand.flags = FLAG_ZOOMING;
ZoomCommand.prototype.update = function(command) {
    this._command !== command && this.finish()
};
ZoomCommand.prototype.finish = function() {
    this._owner._applyZoom();
    disposeCommand(this._stop())
};

function ZoomDragCommand(owner, command, arg) {
    this._owner = owner;
    this._zoomFactor = owner._zoomFactor;
    this._pos = arg.y
}
ZoomDragCommand.flags = FLAG_ZOOMING;
ZoomDragCommand.prototype.update = function(command, arg) {
    var owner = this._owner;
    owner._adjustZoom(this._zoomFactor + owner._zoomPartition * (this._pos - arg.y) / owner._sliderLineLength)
};
ZoomDragCommand.prototype.finish = function() {
    this._owner._applyZoom();
    disposeCommand(this)
};
