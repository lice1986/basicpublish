/**
 * DevExtreme (cjs/ui/html_editor/converters/markdown.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _turndown = _interopRequireDefault(require("turndown"));
var _devextremeShowdown = _interopRequireDefault(require("devextreme-showdown"));
var _window = require("../../../core/utils/window");
var _ui = _interopRequireDefault(require("../../widget/ui.errors"));
var _converterController = _interopRequireDefault(require("../converterController"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
let MarkdownConverter = function() {
    function MarkdownConverter() {
        var _this$_html2Markdown;
        const window = (0, _window.getWindow)();
        const turndown = window && window.TurndownService || _turndown.default;
        const showdown = window && window.showdown || _devextremeShowdown.default;
        if (!turndown) {
            throw _ui.default.Error("E1041", "Turndown")
        }
        if (!showdown) {
            throw _ui.default.Error("E1041", "DevExtreme-Showdown")
        }
        this._html2Markdown = new turndown;
        if (null !== (_this$_html2Markdown = this._html2Markdown) && void 0 !== _this$_html2Markdown && _this$_html2Markdown.addRule) {
            this._html2Markdown.addRule("emptyLine", {
                filter: element => "p" === element.nodeName.toLowerCase() && "<br>" === element.innerHTML,
                replacement: function() {
                    return "<br>"
                }
            });
            this._html2Markdown.keep(["table"])
        }
        this._markdown2Html = new showdown.Converter({
            simpleLineBreaks: true,
            strikethrough: true,
            tables: true
        })
    }
    var _proto = MarkdownConverter.prototype;
    _proto.toMarkdown = function(htmlMarkup) {
        return this._html2Markdown.turndown(htmlMarkup || "")
    };
    _proto.toHtml = function(markdownMarkup) {
        let markup = this._markdown2Html.makeHtml(markdownMarkup);
        if (markup) {
            markup = markup.replace(new RegExp("\\r?\\n", "g"), "")
        }
        return markup
    };
    return MarkdownConverter
}();
_converterController.default.addConverter("markdown", MarkdownConverter);
var _default = MarkdownConverter;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
