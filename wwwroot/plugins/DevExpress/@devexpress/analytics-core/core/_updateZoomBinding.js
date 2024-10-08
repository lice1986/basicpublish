﻿/**
* DevExpress Analytics (core\_updateZoomBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { $dx } from './utils/_jqueryUtils';
export const cssTransform = ['-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform', 'transform'];
export function updateZoomBinding(element, value) {
    for (let i = 0; i < cssTransform.length; i++) {
        element.style[cssTransform[i]] = 'scale(' + (value) + ')';
    }
    $dx(element).addClass('dxrd-transform-origin-left-top');
}
