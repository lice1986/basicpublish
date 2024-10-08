/**
 * DevExtreme (esm/viz/vector_map/tooltip_viewer.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var TOOLTIP_OFFSET = 12;
export function TooltipViewer(params) {
    this._subscribeToTracker(params.tracker, params.tooltip, params.layerCollection)
}
TooltipViewer.prototype = {
    constructor: TooltipViewer,
    dispose: function() {
        this._offTracker();
        this._offTracker = null
    },
    _subscribeToTracker: function(tracker, tooltip, layerCollection) {
        this._offTracker = tracker.on({
            "focus-on": function(arg) {
                var layer;
                var proxy;
                if (tooltip.isEnabled()) {
                    layer = layerCollection.byName(arg.data.name);
                    proxy = layer && layer.getProxy(arg.data.index);
                    var callback = result => {
                        result && arg.done(result)
                    };
                    proxy && callback(tooltip.show(proxy, {
                        x: arg.x,
                        y: arg.y,
                        offset: TOOLTIP_OFFSET
                    }, {
                        target: proxy
                    }, void 0, callback))
                }
            },
            "focus-move": function(arg) {
                tooltip.move(arg.x, arg.y, TOOLTIP_OFFSET)
            },
            "focus-off": function() {
                tooltip.hide()
            }
        })
    }
};
