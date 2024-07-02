/**
 * DevExtreme (esm/ui/scroll_view/ui.scrollable.device.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import devices from "../../core/devices";
import {
    nativeScrolling,
    touch
} from "../../core/utils/support";
export var deviceDependentOptions = function() {
    return [{
        device: function() {
            return !nativeScrolling
        },
        options: {
            useNative: false
        }
    }, {
        device: function(_device) {
            return !devices.isSimulator() && "desktop" === devices.real().deviceType && "generic" === _device.platform
        },
        options: {
            bounceEnabled: false,
            scrollByThumb: true,
            scrollByContent: touch,
            showScrollbar: "onHover"
        }
    }]
};
