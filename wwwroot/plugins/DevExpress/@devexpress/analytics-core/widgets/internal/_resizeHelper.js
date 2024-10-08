﻿/**
* DevExpress Analytics (widgets\internal\_resizeHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '../../serializer/_utils';
import * as ko from 'knockout';
import * as $ from 'jquery';
export class ResizeHelper {
    constructor(options = {}) {
        this.options = options;
        this._resize = (deltaWidth, deltaHeight, oldDelta, element) => {
            if (this.options.resultSize) {
                this.options.resultSize(this.options.resultSize() - (deltaWidth || deltaHeight) + oldDelta);
            }
            else {
                if (element) {
                    if (deltaWidth) {
                        const newWidth = element.offsetWidth - deltaWidth + oldDelta;
                        element.style.width = `${newWidth}px`;
                    }
                    else if (deltaHeight) {
                        const newHeight = element.offsetHeight + deltaHeight - oldDelta;
                        element.style.height = `${newHeight}px`;
                    }
                }
            }
            return deltaWidth || deltaHeight;
        };
    }
    resizable(resizeHandler, handles) {
        if (!resizeHandler)
            resizeHandler = { starting: () => { }, stopped: () => { } };
        let oldDelta = 0;
        return extend({}, resizeHandler, {
            handles: handles,
            $selectedNodes: $.fn.constructor(),
            stopped: () => { oldDelta = 0; },
            resize: (event, element, boundsDiff) => {
                oldDelta = this._resize(-boundsDiff.width, boundsDiff.height, oldDelta, element);
                this.options.onResize && this.options.onResize();
            },
            handleClassName: 'dxd-back-secondary',
            disabled: this.options.disabled || ko.observable(false)
        });
    }
}
