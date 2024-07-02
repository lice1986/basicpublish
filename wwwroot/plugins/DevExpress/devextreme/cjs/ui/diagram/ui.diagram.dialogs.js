/**
 * DevExtreme (cjs/ui/diagram/ui.diagram.dialogs.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui2 = _interopRequireDefault(require("../popup/ui.popup"));
var _extend = require("../../core/utils/extend");

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
let DiagramDialog = function(_Widget) {
    _inheritsLoose(DiagramDialog, _Widget);

    function DiagramDialog() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = DiagramDialog.prototype;
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        this._command = void 0;
        this._isShown = false;
        this._createOnGetContentOption();
        this._createOnHiddenOption()
    };
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this._command = this.option("command");
        this._$popupElement = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._popup = this._createComponent(this._$popupElement, _ui2.default, {
            title: this.option("title"),
            maxWidth: this.option("maxWidth"),
            height: this.option("height"),
            toolbarItems: this.option("toolbarItems"),
            onHidden: this._onHiddenAction
        })
    };
    _proto._clean = function() {
        delete this._popup;
        this._$popupElement && this._$popupElement.remove()
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            title: "",
            maxWidth: 500,
            height: "auto",
            toolbarItems: this._getToolbarItems()
        })
    };
    _proto._getToolbarItems = function() {
        return [this._getOkToolbarItem(), this._getCancelToolbarItem()]
    };
    _proto._getOkToolbarItem = function() {
        return {
            widget: "dxButton",
            location: "after",
            toolbar: "bottom",
            options: {
                text: _message.default.format("dxDiagram-dialogButtonOK"),
                onClick: function() {
                    this._command.execute(this._commandParameter);
                    this._hide()
                }.bind(this)
            }
        }
    };
    _proto._getCancelToolbarItem = function() {
        return {
            widget: "dxButton",
            location: "after",
            toolbar: "bottom",
            options: {
                text: _message.default.format("dxDiagram-dialogButtonCancel"),
                onClick: this._hide.bind(this)
            }
        }
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "title":
            case "maxWidth":
            case "height":
            case "toolbarItems":
                this._popup.option(args.name, args.value);
                break;
            case "command":
                this._command = args.value;
                break;
            case "onGetContent":
                this._createOnGetContentOption();
                break;
            case "onHidden":
                this._createOnHiddenOption();
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto._createOnGetContentOption = function() {
        this._onGetContentAction = this._createActionByOption("onGetContent")
    };
    _proto._createOnHiddenOption = function() {
        this._onHiddenAction = this._createActionByOption("onHidden")
    };
    _proto._hide = function() {
        this._popup.hide();
        this._isShown = false
    };
    _proto._show = function() {
        this._popup.$content().empty().append(this._onGetContentAction());
        this._popup.show();
        this._isShown = true
    };
    _proto.isVisible = function() {
        return this._isShown
    };
    return DiagramDialog
}(_ui.default);
var _default = DiagramDialog;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
