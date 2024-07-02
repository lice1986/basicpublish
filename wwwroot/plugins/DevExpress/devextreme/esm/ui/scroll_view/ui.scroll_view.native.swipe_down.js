/**
 * DevExtreme (esm/ui/scroll_view/ui.scroll_view.native.swipe_down.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getOuterHeight
} from "../../core/utils/size";
import $ from "../../core/renderer";
import Callbacks from "../../core/utils/callbacks";
import {
    move
} from "../../animation/translator";
import {
    eventData
} from "../../events/utils/index";
import NativeStrategy from "./ui.scrollable.native";
import LoadIndicator from "../load_indicator";
import {
    Deferred
} from "../../core/utils/deferred";
var SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS = "dx-scrollview-pull-down-loading";
var SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
var SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = "dx-scrollview-pull-down-refreshing";
var PULLDOWN_ICON_CLASS = "dx-icon-pulldown";
var STATE_RELEASED = 0;
var STATE_READY = 1;
var STATE_REFRESHING = 2;
var STATE_TOUCHED = 4;
var STATE_PULLED = 5;
var SwipeDownNativeScrollViewStrategy = NativeStrategy.inherit({
    _init: function(scrollView) {
        this.callBase(scrollView);
        this._$topPocket = scrollView._$topPocket;
        this._$pullDown = scrollView._$pullDown;
        this._$scrollViewContent = $(scrollView.content());
        this._$container = $(scrollView.container());
        this._initCallbacks();
        this._location = 0
    },
    _initCallbacks: function() {
        this.pullDownCallbacks = Callbacks();
        this.releaseCallbacks = Callbacks();
        this.reachBottomCallbacks = Callbacks()
    },
    render: function() {
        this.callBase();
        this._renderPullDown();
        this._releaseState()
    },
    _renderPullDown: function() {
        var $loadContainer = $("<div>").addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
        var $loadIndicator = new LoadIndicator($("<div>")).$element();
        this._$icon = $("<div>").addClass(PULLDOWN_ICON_CLASS);
        this._$pullDown.empty().append(this._$icon).append($loadContainer.append($loadIndicator))
    },
    _releaseState: function() {
        this._state = STATE_RELEASED;
        this._releasePullDown();
        this._updateDimensions()
    },
    _releasePullDown: function() {
        this._$pullDown.css({
            opacity: 0
        })
    },
    _updateDimensions: function() {
        this.callBase();
        this._topPocketSize = this._$topPocket.get(0).clientHeight;
        var contentEl = this._$scrollViewContent.get(0);
        var containerEl = this._$container.get(0);
        this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0)
    },
    _allowedDirections: function() {
        var allowedDirections = this.callBase();
        allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
        return allowedDirections
    },
    handleInit: function(e) {
        this.callBase(e);
        if (this._state === STATE_RELEASED && 0 === this._location) {
            this._startClientY = eventData(e.originalEvent).y;
            this._state = STATE_TOUCHED
        }
    },
    handleMove: function(e) {
        this.callBase(e);
        this._deltaY = eventData(e.originalEvent).y - this._startClientY;
        if (this._state === STATE_TOUCHED) {
            if (this._pullDownEnabled && this._deltaY > 0) {
                this._state = STATE_PULLED
            } else {
                this._complete()
            }
        }
        if (this._state === STATE_PULLED) {
            e.preventDefault();
            this._movePullDown()
        }
    },
    _movePullDown: function() {
        var pullDownHeight = this._getPullDownHeight();
        var top = Math.min(3 * pullDownHeight, this._deltaY + this._getPullDownStartPosition());
        var angle = 180 * top / pullDownHeight / 3;
        this._$pullDown.css({
            opacity: 1
        }).toggleClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS, top < pullDownHeight);
        move(this._$pullDown, {
            top: top
        });
        this._$icon.css({
            transform: "rotate(" + angle + "deg)"
        })
    },
    _isPullDown: function() {
        return this._pullDownEnabled && this._state === STATE_PULLED && this._deltaY >= this._getPullDownHeight() - this._getPullDownStartPosition()
    },
    _getPullDownHeight: function() {
        return Math.round(.05 * getOuterHeight(this._$element))
    },
    _getPullDownStartPosition: function() {
        return -Math.round(1.5 * getOuterHeight(this._$pullDown))
    },
    handleEnd: function() {
        if (this._isPullDown()) {
            this._pullDownRefreshing()
        }
        this._complete()
    },
    handleStop: function() {
        this._complete()
    },
    _complete: function() {
        if (this._state === STATE_TOUCHED || this._state === STATE_PULLED) {
            this._releaseState()
        }
    },
    handleScroll: function(e) {
        this.callBase(e);
        if (this._state === STATE_REFRESHING) {
            return
        }
        var currentLocation = this.location().top;
        var scrollDelta = this._location - currentLocation;
        this._location = currentLocation;
        if (scrollDelta > 0 && this._isReachBottom()) {
            this._reachBottom()
        } else {
            this._stateReleased()
        }
    },
    _isReachBottom: function() {
        return this._reachBottomEnabled && Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1
    },
    _reachBottom: function() {
        this.reachBottomCallbacks.fire()
    },
    _stateReleased: function() {
        if (this._state === STATE_RELEASED) {
            return
        }
        this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
        this._releaseState()
    },
    _pullDownRefreshing: function() {
        this._state = STATE_REFRESHING;
        this._pullDownRefreshHandler()
    },
    _pullDownRefreshHandler: function() {
        this._refreshPullDown();
        this.pullDownCallbacks.fire()
    },
    _refreshPullDown: function() {
        this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
        move(this._$pullDown, {
            top: this._getPullDownHeight()
        })
    },
    pullDownEnable: function(enabled) {
        this._$topPocket.toggle(enabled);
        this._pullDownEnabled = enabled
    },
    reachBottomEnable: function(enabled) {
        this._reachBottomEnabled = enabled
    },
    pendingRelease: function() {
        this._state = STATE_READY
    },
    release: function() {
        var deferred = new Deferred;
        this._updateDimensions();
        clearTimeout(this._releaseTimeout);
        this._releaseTimeout = setTimeout(function() {
            this._stateReleased();
            this.releaseCallbacks.fire();
            this._updateAction();
            deferred.resolve()
        }.bind(this), 800);
        return deferred.promise()
    },
    dispose: function() {
        clearTimeout(this._pullDownRefreshTimeout);
        clearTimeout(this._releaseTimeout);
        this.callBase()
    }
});
export default SwipeDownNativeScrollViewStrategy;