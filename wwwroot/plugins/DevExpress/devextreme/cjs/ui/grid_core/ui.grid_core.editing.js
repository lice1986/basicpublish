/**
 * DevExtreme (cjs/ui/grid_core/ui.grid_core.editing.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _m_editing = require("../../__internal/grids/grid_core/editing/m_editing");
Object.keys(_m_editing).forEach((function(key) {
    if ("default" === key || "__esModule" === key) {
        return
    }
    if (key in exports && exports[key] === _m_editing[key]) {
        return
    }
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _m_editing[key]
        }
    })
}));
