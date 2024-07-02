/**
 * DevExtreme (cjs/ui/grid_core/ui.grid_core.column_chooser.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _m_column_chooser = require("../../__internal/grids/grid_core/column_chooser/m_column_chooser");
Object.keys(_m_column_chooser).forEach((function(key) {
    if ("default" === key || "__esModule" === key) {
        return
    }
    if (key in exports && exports[key] === _m_column_chooser[key]) {
        return
    }
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _m_column_chooser[key]
        }
    })
}));