/**
 * DevExtreme (renovation/ui/scroll_view/common/animated_scrollbar_props.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.AnimatedScrollbarProps = void 0;
var _scrollbar_props = require("./scrollbar_props");

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
const AnimatedScrollbarProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_scrollbar_props.ScrollbarProps), Object.getOwnPropertyDescriptors({
    pulledDown: false,
    bottomPocketSize: 0,
    contentPaddingBottom: 0
})));
exports.AnimatedScrollbarProps = AnimatedScrollbarProps;
