/**
 * DevExtreme (cjs/ui/html_editor/formats/link.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _type = require("../../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
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
let ExtLink = {};
if (_devextremeQuill.default) {
    const Link = _devextremeQuill.default.import("formats/link");
    ExtLink = function(_Link) {
        _inheritsLoose(ExtLink, _Link);

        function ExtLink() {
            return _Link.apply(this, arguments) || this
        }
        ExtLink.create = function(data) {
            var _data$href;
            const HREF = null !== (_data$href = null === data || void 0 === data ? void 0 : data.href) && void 0 !== _data$href ? _data$href : data;
            const node = _Link.create.call(this, HREF);
            if ((0, _type.isObject)(data)) {
                if (data.text) {
                    node.innerText = data.text
                }
                if (!data.target) {
                    node.removeAttribute("target")
                }
            }
            return node
        };
        ExtLink.formats = function(domNode) {
            return {
                href: domNode.getAttribute("href"),
                target: domNode.getAttribute("target")
            }
        };
        var _proto = ExtLink.prototype;
        _proto.formats = function() {
            const formats = _Link.prototype.formats.call(this);
            const {
                href: href,
                target: target
            } = ExtLink.formats(this.domNode);
            formats.link = href;
            formats.target = target;
            return formats
        };
        _proto.format = function(name, value) {
            if ("link" === name && (0, _type.isObject)(value)) {
                if (value.text) {
                    this.domNode.innerText = value.text
                }
                if (value.target) {
                    this.domNode.setAttribute("target", "_blank")
                } else {
                    this.domNode.removeAttribute("target")
                }
                this.domNode.setAttribute("href", value.href)
            } else {
                _Link.prototype.format.call(this, name, value)
            }
        };
        ExtLink.value = function(domNode) {
            return {
                href: domNode.getAttribute("href"),
                text: domNode.innerText,
                target: !!domNode.getAttribute("target")
            }
        };
        return ExtLink
    }(Link)
}
var _default = ExtLink;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
