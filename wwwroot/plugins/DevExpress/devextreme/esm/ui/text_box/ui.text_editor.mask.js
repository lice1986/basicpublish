/**
 * DevExtreme (esm/ui/text_box/ui.text_editor.mask.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../core/renderer";
import caretUtils from "./utils.caret";
import {
    each
} from "../../core/utils/iterator";
import {
    addNamespace,
    createEvent,
    isCommandKeyPressed,
    normalizeKeyName
} from "../../events/utils/index";
import eventsEngine from "../../events/core/events_engine";
import {
    extend
} from "../../core/utils/extend";
import {
    focused
} from "../widget/selectors";
import {
    isDefined
} from "../../core/utils/type";
import messageLocalization from "../../localization/message";
import {
    noop
} from "../../core/utils/common";
import {
    isEmpty
} from "../../core/utils/string";
import {
    name as wheelEventName
} from "../../events/core/wheel";
import {
    EmptyMaskRule,
    StubMaskRule,
    MaskRule
} from "./ui.text_editor.mask.rule";
import TextEditorBase from "./ui.text_editor.base";
import MaskStrategy from "./ui.text_editor.mask.strategy";
var caret = caretUtils;
var EMPTY_CHAR = " ";
var ESCAPED_CHAR = "\\";
var TEXTEDITOR_MASKED_CLASS = "dx-texteditor-masked";
var FORWARD_DIRECTION = "forward";
var BACKWARD_DIRECTION = "backward";
var DROP_EVENT_NAME = "drop";
var buildInMaskRules = {
    0: /[0-9]/,
    9: /[0-9\s]/,
    "#": /[-+0-9\s]/,
    L: function(char) {
        return isLiteralChar(char)
    },
    l: function(char) {
        return isLiteralChar(char) || isSpaceChar(char)
    },
    C: /\S/,
    c: /./,
    A: function(char) {
        return isLiteralChar(char) || isNumericChar(char)
    },
    a: function(char) {
        return isLiteralChar(char) || isNumericChar(char) || isSpaceChar(char)
    }
};

function isNumericChar(char) {
    return /[0-9]/.test(char)
}

function isLiteralChar(char) {
    var code = char.charCodeAt();
    return 64 < code && code < 91 || 96 < code && code < 123 || code > 127
}

function isSpaceChar(char) {
    return " " === char
}
var TextEditorMask = TextEditorBase.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            mask: "",
            maskChar: "_",
            maskRules: {},
            maskInvalidMessage: messageLocalization.format("validation-mask"),
            useMaskedValue: false,
            showMaskMode: "always"
        })
    },
    _supportedKeys: function() {
        var that = this;
        var keyHandlerMap = {
            del: that._maskStrategy.getHandler("del"),
            enter: that._changeHandler
        };
        var result = that.callBase();
        each(keyHandlerMap, (function(key, callback) {
            var parentHandler = result[key];
            result[key] = function(e) {
                that.option("mask") && callback.call(that, e);
                parentHandler && parentHandler(e)
            }
        }));
        return result
    },
    _getSubmitElement: function() {
        return !this.option("mask") ? this.callBase() : this._$hiddenElement
    },
    _init: function() {
        this.callBase();
        this._initMaskStrategy()
    },
    _initMaskStrategy: function() {
        this._maskStrategy = new MaskStrategy(this)
    },
    _initMarkup: function() {
        this._renderHiddenElement();
        this.callBase()
    },
    _attachMouseWheelEventHandlers: function() {
        var hasMouseWheelHandler = this._onMouseWheel !== noop;
        if (!hasMouseWheelHandler) {
            return
        }
        var input = this._input();
        var eventName = addNamespace(wheelEventName, this.NAME);
        var mouseWheelAction = this._createAction(function(e) {
            var {
                event: event
            } = e;
            if (focused(input) && !isCommandKeyPressed(event)) {
                this._onMouseWheel(event);
                event.preventDefault();
                event.stopPropagation()
            }
        }.bind(this));
        eventsEngine.off(input, eventName);
        eventsEngine.on(input, eventName, (function(e) {
            mouseWheelAction({
                event: e
            })
        }))
    },
    _onMouseWheel: noop,
    _useMaskBehavior() {
        return Boolean(this.option("mask"))
    },
    _attachDropEventHandler() {
        var useMaskBehavior = this._useMaskBehavior();
        if (!useMaskBehavior) {
            return
        }
        var eventName = addNamespace(DROP_EVENT_NAME, this.NAME);
        var input = this._input();
        eventsEngine.off(input, eventName);
        eventsEngine.on(input, eventName, e => e.preventDefault())
    },
    _render() {
        this._renderMask();
        this.callBase();
        this._attachDropEventHandler();
        this._attachMouseWheelEventHandlers()
    },
    _renderHiddenElement: function() {
        if (this.option("mask")) {
            this._$hiddenElement = $("<input>").attr("type", "hidden").appendTo(this._inputWrapper())
        }
    },
    _removeHiddenElement: function() {
        this._$hiddenElement && this._$hiddenElement.remove()
    },
    _renderMask: function() {
        this.$element().removeClass(TEXTEDITOR_MASKED_CLASS);
        this._maskRulesChain = null;
        this._maskStrategy.detachEvents();
        if (!this.option("mask")) {
            return
        }
        this.$element().addClass(TEXTEDITOR_MASKED_CLASS);
        this._maskStrategy.attachEvents();
        this._parseMask();
        this._renderMaskedValue()
    },
    _changeHandler: function(e) {
        var $input = this._input();
        var inputValue = $input.val();
        if (inputValue === this._changedValue) {
            return
        }
        this._changedValue = inputValue;
        var changeEvent = createEvent(e, {
            type: "change"
        });
        eventsEngine.trigger($input, changeEvent)
    },
    _parseMask: function() {
        this._maskRules = extend({}, buildInMaskRules, this.option("maskRules"));
        this._maskRulesChain = this._parseMaskRule(0)
    },
    _parseMaskRule: function(index) {
        var mask = this.option("mask");
        if (index >= mask.length) {
            return new EmptyMaskRule
        }
        var currentMaskChar = mask[index];
        var isEscapedChar = currentMaskChar === ESCAPED_CHAR;
        var result = isEscapedChar ? new StubMaskRule({
            maskChar: mask[index + 1]
        }) : this._getMaskRule(currentMaskChar);
        result.next(this._parseMaskRule(index + 1 + isEscapedChar));
        return result
    },
    _getMaskRule: function(pattern) {
        var ruleConfig;
        each(this._maskRules, (function(rulePattern, allowedChars) {
            if (rulePattern === pattern) {
                ruleConfig = {
                    pattern: rulePattern,
                    allowedChars: allowedChars
                };
                return false
            }
        }));
        return isDefined(ruleConfig) ? new MaskRule(extend({
            maskChar: this.option("maskChar") || " "
        }, ruleConfig)) : new StubMaskRule({
            maskChar: pattern
        })
    },
    _renderMaskedValue: function() {
        if (!this._maskRulesChain) {
            return
        }
        var value = this.option("value") || "";
        this._maskRulesChain.clear(this._normalizeChainArguments());
        var chainArgs = {
            length: value.length
        };
        chainArgs[this._isMaskedValueMode() ? "text" : "value"] = value;
        this._handleChain(chainArgs);
        this._displayMask()
    },
    _replaceSelectedText: function(text, selection, char) {
        if (void 0 === char) {
            return text
        }
        var textBefore = text.slice(0, selection.start);
        var textAfter = text.slice(selection.end);
        var edited = textBefore + char + textAfter;
        return edited
    },
    _isMaskedValueMode: function() {
        return this.option("useMaskedValue")
    },
    _displayMask: function(caret) {
        caret = caret || this._caret();
        this._renderValue();
        this._caret(caret)
    },
    _isValueEmpty: function() {
        return isEmpty(this._value)
    },
    _shouldShowMask: function() {
        var showMaskMode = this.option("showMaskMode");
        if ("onFocus" === showMaskMode) {
            return focused(this._input()) || !this._isValueEmpty()
        }
        return true
    },
    _showMaskPlaceholder: function() {
        if (this._shouldShowMask()) {
            var text = this._maskRulesChain.text();
            this.option("text", text);
            if ("onFocus" === this.option("showMaskMode")) {
                this._renderDisplayText(text)
            }
        }
    },
    _renderValue: function() {
        if (this._maskRulesChain) {
            this._showMaskPlaceholder();
            if (this._$hiddenElement) {
                var value = this._maskRulesChain.value();
                var submitElementValue = !isEmpty(value) ? this._getPreparedValue() : "";
                this._$hiddenElement.val(submitElementValue)
            }
        }
        return this.callBase()
    },
    _getPreparedValue: function() {
        return this._convertToValue().replace(/\s+$/, "")
    },
    _valueChangeEventHandler: function(e) {
        if (!this._maskRulesChain) {
            this.callBase.apply(this, arguments);
            return
        }
        this._saveValueChangeEvent(e);
        this.option("value", this._getPreparedValue())
    },
    _isControlKeyFired: function(e) {
        return this._isControlKey(normalizeKeyName(e)) || isCommandKeyPressed(e)
    },
    _handleChain: function(args) {
        var handledCount = this._maskRulesChain.handle(this._normalizeChainArguments(args));
        this._updateMaskInfo();
        return handledCount
    },
    _normalizeChainArguments: function(args) {
        args = args || {};
        args.index = 0;
        args.fullText = this._maskRulesChain.text();
        return args
    },
    _convertToValue: function(text) {
        if (this._isMaskedValueMode()) {
            text = this._replaceMaskCharWithEmpty(text || this._textValue || "")
        } else {
            text = text || this._value || ""
        }
        return text
    },
    _replaceMaskCharWithEmpty: function(text) {
        return text.replace(new RegExp(this.option("maskChar"), "g"), EMPTY_CHAR)
    },
    _maskKeyHandler: function(e, keyHandler) {
        if (this.option("readOnly")) {
            return
        }
        this.setForwardDirection();
        e.preventDefault();
        this._handleSelection();
        var previousText = this._input().val();
        var raiseInputEvent = () => {
            if (previousText !== this._input().val()) {
                eventsEngine.trigger(this._input(), "input")
            }
        };
        var handled = keyHandler();
        if (handled) {
            handled.then(raiseInputEvent)
        } else {
            this.setForwardDirection();
            this._adjustCaret();
            this._displayMask();
            this._maskRulesChain.reset();
            raiseInputEvent()
        }
    },
    _handleKey: function(key, direction) {
        this._direction(direction || FORWARD_DIRECTION);
        this._adjustCaret(key);
        this._handleKeyChain(key);
        this._moveCaret()
    },
    _handleSelection: function() {
        if (!this._hasSelection()) {
            return
        }
        var caret = this._caret();
        var emptyChars = new Array(caret.end - caret.start + 1).join(EMPTY_CHAR);
        this._handleKeyChain(emptyChars)
    },
    _handleKeyChain: function(chars) {
        var caret = this._caret();
        var start = this.isForwardDirection() ? caret.start : caret.start - 1;
        var end = this.isForwardDirection() ? caret.end : caret.end - 1;
        var length = start === end ? 1 : end - start;
        this._handleChain({
            text: chars,
            start: start,
            length: length
        })
    },
    _tryMoveCaretBackward: function() {
        this.setBackwardDirection();
        var currentCaret = this._caret().start;
        this._adjustCaret();
        return !currentCaret || currentCaret !== this._caret().start
    },
    _adjustCaret: function(char) {
        var caretStart = this._caret().start;
        var isForwardDirection = this.isForwardDirection();
        var caret = this._maskRulesChain.adjustedCaret(caretStart, isForwardDirection, char);
        this._caret({
            start: caret,
            end: caret
        })
    },
    _moveCaret: function() {
        var currentCaret = this._caret().start;
        var maskRuleIndex = currentCaret + (this.isForwardDirection() ? 0 : -1);
        var caret = this._maskRulesChain.isAccepted(maskRuleIndex) ? currentCaret + (this.isForwardDirection() ? 1 : -1) : currentCaret;
        this._caret({
            start: caret,
            end: caret
        })
    },
    _caret: function(position, force) {
        var $input = this._input();
        if (!$input.length) {
            return
        }
        if (!arguments.length) {
            return caret($input)
        }
        caret($input, position, force)
    },
    _hasSelection: function() {
        var caret = this._caret();
        return caret.start !== caret.end
    },
    _direction: function(direction) {
        if (!arguments.length) {
            return this._typingDirection
        }
        this._typingDirection = direction
    },
    setForwardDirection: function() {
        this._direction(FORWARD_DIRECTION)
    },
    setBackwardDirection: function() {
        this._direction(BACKWARD_DIRECTION)
    },
    isForwardDirection: function() {
        return this._direction() === FORWARD_DIRECTION
    },
    _updateMaskInfo() {
        this._textValue = this._maskRulesChain.text();
        this._value = this._maskRulesChain.value()
    },
    _clean: function() {
        this._maskStrategy && this._maskStrategy.clean();
        this.callBase()
    },
    _validateMask: function() {
        if (!this._maskRulesChain) {
            return
        }
        var isValid = isEmpty(this.option("value")) || this._maskRulesChain.isValid(this._normalizeChainArguments());
        this.option({
            isValid: isValid,
            validationError: isValid ? null : {
                editorSpecific: true,
                message: this.option("maskInvalidMessage")
            }
        })
    },
    _updateHiddenElement: function() {
        this._removeHiddenElement();
        if (this.option("mask")) {
            this._input().removeAttr("name");
            this._renderHiddenElement()
        }
        this._setSubmitElementName(this.option("name"))
    },
    _updateMaskOption: function() {
        this._updateHiddenElement();
        this._renderMask();
        this._validateMask();
        this._refreshValueChangeEvent()
    },
    _processEmptyMask: function(mask) {
        if (mask) {
            return
        }
        var value = this.option("value");
        this.option({
            text: value,
            isValid: true,
            validationError: null
        });
        this.validationRequest.fire({
            value: value,
            editor: this
        });
        this._renderValue()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "mask":
                this._updateMaskOption();
                this._processEmptyMask(args.value);
                break;
            case "maskChar":
            case "maskRules":
            case "useMaskedValue":
                this._updateMaskOption();
                break;
            case "value":
                this._renderMaskedValue();
                this._validateMask();
                this.callBase(args);
                this._changedValue = this._input().val();
                break;
            case "maskInvalidMessage":
                break;
            case "showMaskMode":
                this.option("text", "");
                this._renderValue();
                break;
            default:
                this.callBase(args)
        }
    },
    clear: function() {
        var {
            value: defaultValue
        } = this._getDefaultOptions();
        if (this.option("value") === defaultValue) {
            this._renderMaskedValue()
        }
        this.callBase()
    }
});
export default TextEditorMask;
