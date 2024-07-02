/**
 * DevExtreme (cjs/__internal/scheduler/workspaces/m_timeline_week.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _position = require("../../../core/utils/position");
var _m_constants = require("../m_constants");
var _m_timeline = _interopRequireDefault(require("./m_timeline"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return "symbol" === typeof key ? key : String(key)
}

function _toPrimitive(input, hint) {
    if ("object" !== typeof input || null === input) {
        return input
    }
    var prim = input[Symbol.toPrimitive];
    if (void 0 !== prim) {
        var res = prim.call(input, hint || "default");
        if ("object" !== typeof res) {
            return res
        }
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === hint ? String : Number)(input)
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
const TIMELINE_CLASS = "dx-scheduler-timeline-week";
let SchedulerTimelineWeek = function(_SchedulerTimeline) {
    _inheritsLoose(SchedulerTimelineWeek, _SchedulerTimeline);

    function SchedulerTimelineWeek() {
        return _SchedulerTimeline.apply(this, arguments) || this
    }
    var _proto = SchedulerTimelineWeek.prototype;
    _proto._getElementClass = function() {
        return TIMELINE_CLASS
    };
    _proto._getHeaderPanelCellWidth = function($headerRow) {
        return (0, _position.getBoundingRect)($headerRow.children().first().get(0)).width
    };
    _proto._needRenderWeekHeader = function() {
        return true
    };
    _proto._incrementDate = function(date) {
        date.setDate(date.getDate() + 1)
    };
    _createClass(SchedulerTimelineWeek, [{
        key: "type",
        get: function() {
            return _m_constants.VIEWS.TIMELINE_WEEK
        }
    }]);
    return SchedulerTimelineWeek
}(_m_timeline.default);
exports.default = SchedulerTimelineWeek;
(0, _component_registrator.default)("dxSchedulerTimelineWeek", SchedulerTimelineWeek);