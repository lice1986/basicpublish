/**
 * DevExtreme (cjs/ui/scroll_view/ui.scroll_view.simulated.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _iterator = require("../../core/utils/iterator");
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _uiScrollable = require("./ui.scrollable.simulated");
var _load_indicator = _interopRequireDefault(require("../load_indicator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const math = Math;
const SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = "dx-scrollview-pull-down-loading";
const SCROLLVIEW_PULLDOWN_READY_CLASS = "dx-scrollview-pull-down-ready";
const SCROLLVIEW_PULLDOWN_IMAGE_CLASS = "dx-scrollview-pull-down-image";
const SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
const SCROLLVIEW_PULLDOWN_TEXT_CLASS = "dx-scrollview-pull-down-text";
const SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = "dx-scrollview-pull-down-text-visible";
const STATE_RELEASED = 0;
const STATE_READY = 1;
const STATE_REFRESHING = 2;
const STATE_LOADING = 3;
const ScrollViewScroller = _uiScrollable.Scroller.inherit({
    ctor: function() {
        this._topPocketSize = 0;
        this._bottomPocketSize = 0;
        this.callBase.apply(this, arguments);
        this._initCallbacks();
        this._releaseState()
    },
    _releaseState: function() {
        this._state = 0;
        this._refreshPullDownText()
    },
    _refreshPullDownText: function() {
        const that = this;
        const pullDownTextItems = [{
            element: this._$pullingDownText,
            visibleState: 0
        }, {
            element: this._$pulledDownText,
            visibleState: 1
        }, {
            element: this._$refreshingText,
            visibleState: 2
        }];
        (0, _iterator.each)(pullDownTextItems, (function(_, item) {
            const action = that._state === item.visibleState ? "addClass" : "removeClass";
            item.element[action]("dx-scrollview-pull-down-text-visible")
        }))
    },
    _initCallbacks: function() {
        this.pullDownCallbacks = (0, _callbacks.default)();
        this.releaseCallbacks = (0, _callbacks.default)();
        this.reachBottomCallbacks = (0, _callbacks.default)()
    },
    _updateBounds: function() {
        const considerPockets = "horizontal" !== this._direction;
        if (considerPockets) {
            this._topPocketSize = this._$topPocket.get(0).clientHeight;
            this._bottomPocketSize = this._$bottomPocket.get(0).clientHeight;
            const containerEl = this._$container.get(0);
            const contentEl = this._$content.get(0);
            this._bottomBoundary = Math.max(contentEl.clientHeight - this._bottomPocketSize - containerEl.clientHeight, 0)
        }
        this.callBase()
    },
    _updateScrollbar: function() {
        this._scrollbar.option({
            containerSize: this._containerSize(),
            contentSize: this._contentSize() - this._topPocketSize - this._bottomPocketSize,
            scaleRatio: this._getScaleRatio()
        })
    },
    _moveContent: function() {
        this.callBase();
        if (this._isPullDown()) {
            this._pullDownReady()
        } else if (this._isReachBottom()) {
            this._reachBottomReady()
        } else if (0 !== this._state) {
            this._stateReleased()
        }
    },
    _moveScrollbar: function() {
        this._scrollbar.moveTo(this._topPocketSize + this._location)
    },
    _isPullDown: function() {
        return this._pullDownEnabled && this._location >= 0
    },
    _isReachBottom: function() {
        const containerEl = this._$container.get(0);
        return this._reachBottomEnabled && Math.round(this._bottomBoundary - Math.ceil(containerEl.scrollTop)) <= 1
    },
    _scrollComplete: function() {
        if (this._inBounds() && 1 === this._state) {
            this._pullDownRefreshing()
        } else if (this._inBounds() && 3 === this._state) {
            this._reachBottomLoading()
        } else {
            this.callBase()
        }
    },
    _reachBottomReady: function() {
        if (3 === this._state) {
            return
        }
        this._state = 3;
        this._minOffset = this._getMinOffset()
    },
    _getMaxOffset: function() {
        return -this._topPocketSize
    },
    _getMinOffset: function() {
        return math.min(this.callBase(), -this._topPocketSize)
    },
    _reachBottomLoading: function() {
        this.reachBottomCallbacks.fire()
    },
    _pullDownReady: function() {
        if (1 === this._state) {
            return
        }
        this._state = 1;
        this._maxOffset = 0;
        this._$pullDown.addClass("dx-scrollview-pull-down-ready");
        this._refreshPullDownText()
    },
    _stateReleased: function() {
        if (0 === this._state) {
            return
        }
        this._releaseState();
        this._updateBounds();
        this._$pullDown.removeClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
        this.releaseCallbacks.fire()
    },
    _pullDownRefreshing: function() {
        if (2 === this._state) {
            return
        }
        this._state = 2;
        this._$pullDown.addClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
        this._refreshPullDownText();
        this.pullDownCallbacks.fire()
    },
    _releaseHandler: function() {
        if (0 === this._state) {
            this._moveToBounds()
        }
        this._update();
        if (this._releaseTask) {
            this._releaseTask.abort()
        }
        this._releaseTask = (0, _common.executeAsync)(this._release.bind(this));
        return this._releaseTask.promise
    },
    _release: function() {
        this._stateReleased();
        this._scrollComplete()
    },
    _reachBottomEnablingHandler: function(enabled) {
        if (this._reachBottomEnabled === enabled) {
            return
        }
        this._reachBottomEnabled = enabled;
        this._updateBounds()
    },
    _pullDownEnablingHandler: function(enabled) {
        if (this._pullDownEnabled === enabled) {
            return
        }
        this._pullDownEnabled = enabled;
        this._considerTopPocketChange();
        this._updateHandler()
    },
    _considerTopPocketChange: function() {
        this._location -= (0, _size.getHeight)(this._$topPocket) || -this._topPocketSize;
        this._maxOffset = 0;
        this._move()
    },
    _pendingReleaseHandler: function() {
        this._state = 1
    },
    dispose: function() {
        if (this._releaseTask) {
            this._releaseTask.abort()
        }
        this.callBase()
    }
});
const SimulatedScrollViewStrategy = _uiScrollable.SimulatedStrategy.inherit({
    _init: function(scrollView) {
        this.callBase(scrollView);
        this._$pullDown = scrollView._$pullDown;
        this._$topPocket = scrollView._$topPocket;
        this._$bottomPocket = scrollView._$bottomPocket;
        this._initCallbacks()
    },
    _initCallbacks: function() {
        this.pullDownCallbacks = (0, _callbacks.default)();
        this.releaseCallbacks = (0, _callbacks.default)();
        this.reachBottomCallbacks = (0, _callbacks.default)()
    },
    render: function() {
        this._renderPullDown();
        this.callBase()
    },
    _renderPullDown: function() {
        const $image = (0, _renderer.default)("<div>").addClass("dx-scrollview-pull-down-image");
        const $loadContainer = (0, _renderer.default)("<div>").addClass("dx-scrollview-pull-down-indicator");
        const $loadIndicator = new _load_indicator.default((0, _renderer.default)("<div>")).$element();
        const $text = this._$pullDownText = (0, _renderer.default)("<div>").addClass("dx-scrollview-pull-down-text");
        this._$pullingDownText = (0, _renderer.default)("<div>").text(this.option("pullingDownText")).appendTo($text);
        this._$pulledDownText = (0, _renderer.default)("<div>").text(this.option("pulledDownText")).appendTo($text);
        this._$refreshingText = (0, _renderer.default)("<div>").text(this.option("refreshingText")).appendTo($text);
        this._$pullDown.empty().append($image).append($loadContainer.append($loadIndicator)).append($text)
    },
    pullDownEnable: function(enabled) {
        this._eventHandler("pullDownEnabling", enabled)
    },
    reachBottomEnable: function(enabled) {
        this._eventHandler("reachBottomEnabling", enabled)
    },
    _createScroller: function(direction) {
        const that = this;
        const scroller = that._scrollers[direction] = new ScrollViewScroller(that._scrollerOptions(direction));
        scroller.pullDownCallbacks.add((function() {
            that.pullDownCallbacks.fire()
        }));
        scroller.releaseCallbacks.add((function() {
            that.releaseCallbacks.fire()
        }));
        scroller.reachBottomCallbacks.add((function() {
            that.reachBottomCallbacks.fire()
        }))
    },
    _scrollerOptions: function(direction) {
        return (0, _extend.extend)(this.callBase(direction), {
            $topPocket: this._$topPocket,
            $bottomPocket: this._$bottomPocket,
            $pullDown: this._$pullDown,
            $pullDownText: this._$pullDownText,
            $pullingDownText: this._$pullingDownText,
            $pulledDownText: this._$pulledDownText,
            $refreshingText: this._$refreshingText
        })
    },
    pendingRelease: function() {
        this._eventHandler("pendingRelease")
    },
    release: function() {
        return this._eventHandler("release").done(this._updateAction)
    },
    location: function() {
        const location = this.callBase();
        location.top += (0, _size.getHeight)(this._$topPocket);
        return location
    },
    dispose: function() {
        (0, _iterator.each)(this._scrollers, (function() {
            this.dispose()
        }));
        this.callBase()
    }
});
var _default = SimulatedScrollViewStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
