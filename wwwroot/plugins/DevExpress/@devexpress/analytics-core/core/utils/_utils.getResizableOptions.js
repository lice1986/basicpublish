﻿/**
* DevExpress Analytics (core\utils\_utils.getResizableOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { convertFromCssPixelUnits } from '../internal/_utils.unitsConvertation';
import { currentMultiPlatformEngine } from '../../serializer/native/multiplatformEngine';
import { koUtils } from './_koUtils';
export function getResizableOptions($element, panelOffset, minWidth, position, startPosition, width, disabled) {
    const disabledOption = currentMultiPlatformEngine.wrap(koUtils.unwrap(disabled));
    const minWidthOption = koUtils.unwrap(minWidth);
    if (koUtils.isSubscribable(disabled)) {
        disabled.subscribe((newVal) => {
            if (typeof disabledOption === 'function') {
                disabledOption(newVal);
            }
        });
    }
    return {
        starting: function (e) {
            $.fn.constructor($element).css(position === startPosition ? 'right' : 'left', '');
        },
        handles: currentMultiPlatformEngine.wrap(position === startPosition ? 'e' : 'w'),
        stopped: $.noop,
        stop: $.noop,
        resize: function (event, element) {
            const startResizePosition = convertFromCssPixelUnits(element.dataset.originalLeftMousePosition);
            const originalWidth = convertFromCssPixelUnits(element.dataset.originalWidth);
            const sizeDiff = event.x - startResizePosition;
            $.fn.constructor($element).css({ left: position === startPosition ? panelOffset + 'px' : '', right: position === startPosition ? '' : panelOffset + 'px' });
            const newWidth = Math.min(Math.max(minWidthOption, position === startPosition ? originalWidth + sizeDiff : originalWidth - sizeDiff), 1000);
            width && width(newWidth);
        },
        disabled: disabledOption,
        zoom: 1,
        minimumWidth: currentMultiPlatformEngine.wrap(koUtils.unwrap(disabledOption) ? 0 : minWidthOption),
        maximumWidth: 1000,
        $element: $element
    };
}