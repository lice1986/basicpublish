/**
 * DevExtreme (esm/ui/validation_message.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    getOuterWidth
} from "../core/utils/size";
import $ from "../core/renderer";
import registerComponent from "../core/component_registrator";
import Overlay from "./overlay/ui.overlay";
import {
    extend
} from "../core/utils/extend";
import {
    encodeHtml
} from "../core/utils/string";
import {
    getDefaultAlignment
} from "../core/utils/position";
var INVALID_MESSAGE = "dx-invalid-message";
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var INVALID_MESSAGE_ALWAYS = "dx-invalid-message-always";
var INVALID_MESSAGE_CONTENT = "dx-invalid-message-content";
var VALIDATION_MESSAGE_MIN_WIDTH = 100;
var ValidationMessage = Overlay.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            integrationOptions: {},
            templatesRenderAsynchronously: false,
            shading: false,
            width: "auto",
            height: "auto",
            hideOnOutsideClick: false,
            animation: null,
            visible: true,
            propagateOutsideClick: true,
            _checkParentVisibility: false,
            rtlEnabled: false,
            contentTemplate: this._renderInnerHtml,
            maxWidth: "100%",
            container: this.$element(),
            target: void 0,
            mode: "auto",
            validationErrors: void 0,
            preventScrollEvents: false,
            positionSide: "top",
            boundary: void 0,
            offset: {
                h: 0,
                v: 0
            },
            contentId: void 0
        })
    },
    _init() {
        this.callBase();
        this.updateMaxWidth();
        this._updatePosition()
    },
    _initMarkup() {
        this.callBase();
        this._ensureMessageNotEmpty();
        this._updatePositionByTarget();
        this._toggleModeClass();
        this._updateContentId()
    },
    _updatePositionByTarget: function() {
        var {
            target: target
        } = this.option();
        this.option("position.of", target)
    },
    _ensureMessageNotEmpty: function() {
        this._textMarkup = this._getTextMarkup();
        var shouldShowMessage = this.option("visible") && this._textMarkup;
        this._toggleVisibilityClasses(shouldShowMessage)
    },
    _toggleVisibilityClasses: function(visible) {
        if (visible) {
            this.$element().addClass(INVALID_MESSAGE);
            this.$wrapper().addClass(INVALID_MESSAGE)
        } else {
            this.$element().removeClass(INVALID_MESSAGE);
            this.$wrapper().removeClass(INVALID_MESSAGE)
        }
    },
    _updateContentId() {
        var {
            container: container,
            contentId: contentId
        } = this.option();
        var id = null !== contentId && void 0 !== contentId ? contentId : $(container).attr("aria-describedby");
        this.$content().addClass(INVALID_MESSAGE_CONTENT).attr("id", id)
    },
    _renderInnerHtml(element) {
        var $element = element && $(element);
        null === $element || void 0 === $element ? void 0 : $element.html(this._textMarkup)
    },
    _getTextMarkup() {
        var _this$option;
        var validationErrors = null !== (_this$option = this.option("validationErrors")) && void 0 !== _this$option ? _this$option : [];
        var validationErrorMessage = "";
        validationErrors.forEach(err => {
            var _err$message;
            var separator = validationErrorMessage ? "<br />" : "";
            validationErrorMessage += separator + encodeHtml(null !== (_err$message = null === err || void 0 === err ? void 0 : err.message) && void 0 !== _err$message ? _err$message : "")
        });
        return validationErrorMessage
    },
    _toggleModeClass() {
        var mode = this.option("mode");
        this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, "auto" === mode).toggleClass(INVALID_MESSAGE_ALWAYS, "always" === mode)
    },
    updateMaxWidth() {
        var target = this.option("target");
        var targetWidth = getOuterWidth(target);
        var maxWidth = "100%";
        if (targetWidth) {
            maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH)
        }
        this.option({
            maxWidth: maxWidth
        })
    },
    _getPositionsArray: function(positionSide, rtlSide) {
        switch (positionSide) {
            case "top":
                return ["".concat(rtlSide, " bottom"), "".concat(rtlSide, " top")];
            case "left":
                return ["right", "left"];
            case "right":
                return ["left", "right"];
            default:
                return ["".concat(rtlSide, " top"), "".concat(rtlSide, " bottom")]
        }
    },
    _updatePosition: function() {
        var {
            positionSide: positionSide,
            rtlEnabled: rtlEnabled,
            offset: componentOffset,
            boundary: boundary
        } = this.option();
        var rtlSide = getDefaultAlignment(rtlEnabled);
        var positions = this._getPositionsArray(positionSide, rtlSide);
        var offset = _extends({}, componentOffset);
        this.$element().addClass("dx-invalid-message-".concat(positionSide));
        if (rtlEnabled && "left" !== positionSide && "right" !== positionSide) {
            offset.h = -offset.h
        }
        if ("top" === positionSide) {
            offset.v = -offset.v
        }
        if ("left" === positionSide) {
            offset.h = -offset.h
        }
        this.option("position", {
            offset: offset,
            boundary: boundary,
            my: positions[0],
            at: positions[1],
            collision: "none flip"
        })
    },
    _optionChanged(args) {
        var {
            name: name,
            value: value,
            previousValue: previousValue
        } = args;
        switch (name) {
            case "target":
                this._updatePositionByTarget();
                this.updateMaxWidth();
                this.callBase(args);
                break;
            case "boundary":
                this.option("position.boundary", value);
                break;
            case "mode":
                this._toggleModeClass(value);
                break;
            case "rtlEnabled":
            case "offset":
            case "positionSide":
                this.$element().removeClass("dx-invalid-message-".concat(previousValue));
                this._updatePosition();
                break;
            case "container":
                this._updateContentId();
                this.callBase(args);
                break;
            case "contentId":
                this._updateContentId();
                break;
            case "validationErrors":
                this._ensureMessageNotEmpty();
                this._renderInnerHtml(this.$content());
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxValidationMessage", ValidationMessage);
export default ValidationMessage;
