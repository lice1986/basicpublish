/**
 * DevExtreme (cjs/ui/form/ui.form.item_option_action.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _class = _interopRequireDefault(require("../../core/class"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
let ItemOptionAction = function() {
    function ItemOptionAction(options) {
        this._options = options;
        this._itemsRunTimeInfo = this._options.itemsRunTimeInfo
    }
    var _proto = ItemOptionAction.prototype;
    _proto.findInstance = function() {
        return this._itemsRunTimeInfo.findWidgetInstanceByItem(this._options.item)
    };
    _proto.findItemContainer = function() {
        return this._itemsRunTimeInfo.findItemContainerByItem(this._options.item)
    };
    _proto.findPreparedItem = function() {
        return this._itemsRunTimeInfo.findPreparedItemByItem(this._options.item)
    };
    _proto.tryExecute = function() {
        _class.default.abstract()
    };
    return ItemOptionAction
}();
exports.default = ItemOptionAction;
module.exports = exports.default;
module.exports.default = exports.default;
