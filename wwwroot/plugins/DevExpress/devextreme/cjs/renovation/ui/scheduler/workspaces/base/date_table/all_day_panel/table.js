/**
 * DevExtreme (cjs/renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/table.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.AllDayTableProps = exports.AllDayTable = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _table = require("../../table");
var _table_body = require("./table_body");
var _layout_props = require("../../layout_props");
var _const = require("../../../const");
const _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "bottomVirtualRowHeight", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "viewData", "width"];

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) {
            continue
        }
        target[key] = source[key]
    }
    return target
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

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const viewFunction = _ref => {
    let {
        allDayPanelData: allDayPanelData,
        emptyTableHeight: emptyTableHeight,
        props: {
            dataCellTemplate: dataCellTemplate,
            tableRef: tableRef,
            viewData: viewData,
            width: width
        }
    } = _ref;
    return (0, _inferno.createComponentVNode)(2, _table.Table, {
        className: "dx-scheduler-all-day-table",
        height: emptyTableHeight,
        width: width,
        tableRef: tableRef,
        children: (0, _inferno.createComponentVNode)(2, _table_body.AllDayPanelTableBody, {
            viewData: allDayPanelData,
            leftVirtualCellWidth: viewData.leftVirtualCellWidth,
            rightVirtualCellWidth: viewData.rightVirtualCellWidth,
            leftVirtualCellCount: viewData.leftVirtualCellCount,
            rightVirtualCellCount: viewData.rightVirtualCellCount,
            dataCellTemplate: dataCellTemplate
        })
    })
};
exports.viewFunction = viewFunction;
const AllDayTableProps = _layout_props.LayoutProps;
exports.AllDayTableProps = AllDayTableProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let AllDayTable = function(_InfernoWrapperCompon) {
    _inheritsLoose(AllDayTable, _InfernoWrapperCompon);

    function AllDayTable(props) {
        var _this;
        _this = _InfernoWrapperCompon.call(this, props) || this;
        _this.state = {};
        _this.__getterCache = {};
        return _this
    }
    var _proto = AllDayTable.prototype;
    _proto.createEffects = function() {
        return [(0, _inferno2.createReRenderEffect)()]
    };
    _proto.componentWillUpdate = function(nextProps, nextState, context) {
        _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
        if (this.props.viewData !== nextProps.viewData) {
            this.__getterCache.allDayPanelData = void 0
        }
    };
    _proto.render = function() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                dataCellTemplate: (TemplateProp = props.dataCellTemplate, TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp))
            }),
            allDayPanelData: this.allDayPanelData,
            emptyTableHeight: this.emptyTableHeight,
            restAttributes: this.restAttributes
        });
        var TemplateProp
    };
    _createClass(AllDayTable, [{
        key: "allDayPanelData",
        get: function() {
            if (void 0 !== this.__getterCache.allDayPanelData) {
                return this.__getterCache.allDayPanelData
            }
            return this.__getterCache.allDayPanelData = (() => this.props.viewData.groupedData[0].allDayPanel)()
        }
    }, {
        key: "emptyTableHeight",
        get: function() {
            return this.allDayPanelData ? void 0 : _const.DefaultSizes.allDayPanelHeight
        }
    }, {
        key: "restAttributes",
        get: function() {
            const _this$props = this.props,
                restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
            return restProps
        }
    }]);
    return AllDayTable
}(_inferno2.InfernoWrapperComponent);
exports.AllDayTable = AllDayTable;
AllDayTable.defaultProps = AllDayTableProps;
