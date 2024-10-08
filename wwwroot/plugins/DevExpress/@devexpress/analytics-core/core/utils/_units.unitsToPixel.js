﻿/**
* DevExpress Analytics (core\utils\_units.unitsToPixel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { roundingXDecimals } from './_units.roundingXDecimals';
export function unitsToPixel(val, measureUnit, zoom = 1) {
    let result;
    if (measureUnit === 'Pixels') {
        result = 1 * val;
    }
    else if (measureUnit === 'TenthsOfAMillimeter') {
        result = val * 3.78 / 10;
    }
    else {
        result = val * 96 / 100;
    }
    result = result * (zoom);
    return roundingXDecimals(result, true);
}
export function pixelToUnits(val, measureUnit, zoom) {
    let result;
    if (measureUnit === 'Pixels') {
        result = 1 * val;
    }
    else if (measureUnit === 'TenthsOfAMillimeter') {
        result = val / 3.78 * 10;
    }
    else {
        result = val / 96 * 100;
    }
    result = result / (zoom);
    return roundingXDecimals(result);
}
