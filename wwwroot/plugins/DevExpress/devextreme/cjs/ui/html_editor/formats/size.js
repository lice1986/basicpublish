/**
 * DevExtreme (cjs/ui/html_editor/formats/size.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
let SizeStyle = {};
if (_devextremeQuill.default) {
    SizeStyle = _devextremeQuill.default.import("attributors/style/size");
    SizeStyle.whitelist = null
}
var _default = SizeStyle;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
