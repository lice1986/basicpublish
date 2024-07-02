/**
 * DevExtreme (esm/ui/load_panel.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../core/renderer";
import {
    noop
} from "../core/utils/common";
import messageLocalization from "../localization/message";
import registerComponent from "../core/component_registrator";
import {
    extend
} from "../core/utils/extend";
import LoadIndicator from "./load_indicator";
import Overlay from "./overlay/ui.overlay";
import {
    Deferred
} from "../core/utils/deferred";
import {
    isMaterial,
    isMaterialBased,
    isFluent
} from "./themes";
var LOADPANEL_CLASS = "dx-loadpanel";
var LOADPANEL_WRAPPER_CLASS = "dx-loadpanel-wrapper";
var LOADPANEL_INDICATOR_CLASS = "dx-loadpanel-indicator";
var LOADPANEL_MESSAGE_CLASS = "dx-loadpanel-message";
var LOADPANEL_CONTENT_CLASS = "dx-loadpanel-content";
var LOADPANEL_CONTENT_WRAPPER_CLASS = "dx-loadpanel-content-wrapper";
var LOADPANEL_PANE_HIDDEN_CLASS = "dx-loadpanel-pane-hidden";
var LoadPanel = Overlay.inherit({
    _supportedKeys: function() {
        return extend(this.callBase(), {
            escape: noop
        })
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            message: messageLocalization.format("Loading"),
            width: 222,
            height: 90,
            animation: null,
            showIndicator: true,
            indicatorSrc: "",
            showPane: true,
            delay: 0,
            templatesRenderAsynchronously: false,
            hideTopOverlayHandler: null,
            focusStateEnabled: false,
            propagateOutsideClick: true,
            preventScrollEvents: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "generic"
            },
            options: {
                shadingColor: "transparent"
            }
        }, {
            device: function() {
                return isMaterial()
            },
            options: {
                message: "",
                width: 60,
                height: 60,
                maxHeight: 60,
                maxWidth: 60
            }
        }, {
            device: function() {
                return isFluent()
            },
            options: {
                width: "auto",
                height: "auto"
            }
        }])
    },
    _init: function() {
        this.callBase.apply(this, arguments)
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(LOADPANEL_CLASS);
        this.$wrapper().addClass(LOADPANEL_WRAPPER_CLASS);
        this._setWrapperAria()
    },
    _setWrapperAria() {
        var {
            message: message
        } = this.option();
        var defaultLabel = isMaterialBased() ? message : null;
        var label = message ? defaultLabel : messageLocalization.format("Loading");
        var aria = {
            role: "alert",
            label: label
        };
        this.setAria(aria, this.$wrapper())
    },
    _renderContentImpl: function() {
        this.callBase();
        this.$content().addClass(LOADPANEL_CONTENT_CLASS);
        this._$loadPanelContentWrapper = $("<div>").addClass(LOADPANEL_CONTENT_WRAPPER_CLASS);
        this._$loadPanelContentWrapper.appendTo(this.$content());
        this._togglePaneVisible();
        this._cleanPreviousContent();
        this._renderLoadIndicator();
        this._renderMessage()
    },
    _show: function() {
        var delay = this.option("delay");
        if (!delay) {
            return this.callBase()
        }
        var deferred = new Deferred;
        var callBase = this.callBase.bind(this);
        this._clearShowTimeout();
        this._showTimeout = setTimeout((function() {
            callBase().done((function() {
                deferred.resolve()
            }))
        }), delay);
        return deferred.promise()
    },
    _hide: function() {
        this._clearShowTimeout();
        return this.callBase()
    },
    _clearShowTimeout: function() {
        clearTimeout(this._showTimeout)
    },
    _renderMessage: function() {
        if (!this._$loadPanelContentWrapper) {
            return
        }
        var message = this.option("message");
        if (!message) {
            return
        }
        var $message = $("<div>").addClass(LOADPANEL_MESSAGE_CLASS).text(message);
        this._$loadPanelContentWrapper.append($message)
    },
    _renderLoadIndicator: function() {
        if (!this._$loadPanelContentWrapper || !this.option("showIndicator")) {
            return
        }
        if (!this._$indicator) {
            this._$indicator = $("<div>").addClass(LOADPANEL_INDICATOR_CLASS).appendTo(this._$loadPanelContentWrapper)
        }
        this._createComponent(this._$indicator, LoadIndicator, {
            indicatorSrc: this.option("indicatorSrc")
        })
    },
    _cleanPreviousContent: function() {
        this.$content().find("." + LOADPANEL_MESSAGE_CLASS).remove();
        this.$content().find("." + LOADPANEL_INDICATOR_CLASS).remove();
        delete this._$indicator
    },
    _togglePaneVisible: function() {
        this.$content().toggleClass(LOADPANEL_PANE_HIDDEN_CLASS, !this.option("showPane"))
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "delay":
                break;
            case "message":
            case "showIndicator":
                this._cleanPreviousContent();
                this._renderLoadIndicator();
                this._renderMessage();
                this._setWrapperAria();
                break;
            case "showPane":
                this._togglePaneVisible();
                break;
            case "indicatorSrc":
                this._renderLoadIndicator();
                break;
            default:
                this.callBase(args)
        }
    },
    _dispose: function() {
        this._clearShowTimeout();
        this.callBase()
    }
});
registerComponent("dxLoadPanel", LoadPanel);
export default LoadPanel;
