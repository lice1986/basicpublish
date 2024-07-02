/**
 * DevExtreme (cjs/renovation/component_wrapper/scheduler/date_table.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.DateTable = void 0;
var _component = _interopRequireDefault(require("../common/component"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
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
let DateTable = function(_Component) {
    _inheritsLoose(DateTable, _Component);

    function DateTable() {
        return _Component.apply(this, arguments) || this
    }
    var _proto = DateTable.prototype;
    _proto._setOptionsByReference = function() {
        _Component.prototype._setOptionsByReference.call(this);
        this._optionsByReference = _extends({}, this._optionsByReference, {
            dataCellTemplate: true
        })
    };
    return DateTable
}(_component.default);
exports.DateTable = DateTable;
