/**
 * DevExtreme (cjs/ui/gantt/gantt_importer.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getGanttViewCore = getGanttViewCore;
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _devexpressGantt = _interopRequireDefault(require("devexpress-gantt"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function getGanttViewCore() {
    if (!_devexpressGantt.default) {
        throw _ui.default.Error("E1041", "devexpress-gantt")
    }
    return _devexpressGantt.default
}
