/**
 * DevExtreme (cjs/ui/load_indicator.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../core/utils/size");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _window = require("../core/utils/window");
var _support = require("../core/utils/support");
var _themes = require("./themes");
var _extend = require("../core/utils/extend");
var _devices = _interopRequireDefault(require("../core/devices"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _ui = _interopRequireDefault(require("./widget/ui.widget"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const navigator = (0, _window.getNavigator)();
const LOADINDICATOR_CLASS = "dx-loadindicator";
const LOADINDICATOR_WRAPPER_CLASS = "dx-loadindicator-wrapper";
const LOADINDICATOR_CONTENT_CLASS = "dx-loadindicator-content";
const LOADINDICATOR_ICON_CLASS = "dx-loadindicator-icon";
const LOADINDICATOR_SEGMENT_CLASS = "dx-loadindicator-segment";
const LOADINDICATOR_SEGMENT_INNER_CLASS = "dx-loadindicator-segment-inner";
const LOADINDICATOR_IMAGE_CLASS = "dx-loadindicator-image";
const LoadIndicator = _ui.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            indicatorSrc: "",
            activeStateEnabled: false,
            hoverStateEnabled: false,
            _animatingSegmentCount: 1,
            _animatingSegmentInner: false
        })
    },
    _defaultOptionsRules: function() {
        const themeName = (0, _themes.current)();
        return this.callBase().concat([{
            device: function() {
                const realDevice = _devices.default.real();
                const obsoleteAndroid = "android" === realDevice.platform && !/chrome/i.test(navigator.userAgent);
                return obsoleteAndroid
            },
            options: {
                viaImage: true
            }
        }, {
            device: function() {
                return (0, _themes.isMaterialBased)(themeName)
            },
            options: {
                _animatingSegmentCount: 2,
                _animatingSegmentInner: true
            }
        }, {
            device: function() {
                return (0, _themes.isGeneric)(themeName)
            },
            options: {
                _animatingSegmentCount: 7
            }
        }])
    },
    _useTemplates: function() {
        return false
    },
    _init: function() {
        this.callBase();
        this.$element().addClass("dx-loadindicator")
    },
    _initMarkup: function() {
        this.callBase();
        this._renderWrapper();
        this._renderIndicatorContent();
        this._renderMarkup()
    },
    _renderWrapper: function() {
        this._$wrapper = (0, _renderer.default)("<div>").addClass("dx-loadindicator-wrapper");
        this.$element().append(this._$wrapper)
    },
    _renderIndicatorContent: function() {
        this._$content = (0, _renderer.default)("<div>").addClass("dx-loadindicator-content");
        this._$wrapper.append(this._$content)
    },
    _renderMarkup: function() {
        const {
            viaImage: viaImage,
            indicatorSrc: indicatorSrc
        } = this.option();
        if ((0, _support.animation)() && !viaImage && !indicatorSrc) {
            this._renderMarkupForAnimation()
        } else {
            this._renderMarkupForImage()
        }
    },
    _renderMarkupForAnimation: function() {
        const animatingSegmentInner = this.option("_animatingSegmentInner");
        this._$indicator = (0, _renderer.default)("<div>").addClass("dx-loadindicator-icon");
        this._$content.append(this._$indicator);
        for (let i = this.option("_animatingSegmentCount"); i >= 0; --i) {
            const $segment = (0, _renderer.default)("<div>").addClass("dx-loadindicator-segment").addClass("dx-loadindicator-segment" + i);
            if (animatingSegmentInner) {
                $segment.append((0, _renderer.default)("<div>").addClass("dx-loadindicator-segment-inner"))
            }
            this._$indicator.append($segment)
        }
    },
    _renderMarkupForImage: function() {
        const {
            indicatorSrc: indicatorSrc
        } = this.option();
        if (indicatorSrc) {
            this._$wrapper.addClass("dx-loadindicator-image");
            this._$wrapper.css("backgroundImage", "url(" + indicatorSrc + ")")
        } else if ((0, _support.animation)()) {
            this._renderMarkupForAnimation()
        }
    },
    _renderDimensions: function() {
        this.callBase();
        this._updateContentSizeForAnimation()
    },
    _updateContentSizeForAnimation: function() {
        if (!this._$indicator) {
            return
        }
        let width = this.option("width");
        let height = this.option("height");
        if (width || height) {
            width = (0, _size.getWidth)(this.$element());
            height = (0, _size.getHeight)(this.$element());
            const minDimension = Math.min(height, width);
            this._$wrapper.css({
                height: minDimension,
                width: minDimension,
                fontSize: minDimension
            })
        }
    },
    _clean: function() {
        this.callBase();
        this._removeMarkupForAnimation();
        this._removeMarkupForImage()
    },
    _removeMarkupForAnimation: function() {
        if (!this._$indicator) {
            return
        }
        this._$indicator.remove();
        delete this._$indicator
    },
    _removeMarkupForImage: function() {
        this._$wrapper.css("backgroundImage", "none")
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "_animatingSegmentCount":
            case "_animatingSegmentInner":
            case "indicatorSrc":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)("dxLoadIndicator", LoadIndicator);
var _default = LoadIndicator;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;