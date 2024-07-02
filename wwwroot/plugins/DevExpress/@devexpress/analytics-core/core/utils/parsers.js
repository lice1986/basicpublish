﻿/**
* DevExpress Analytics (core\utils\parsers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getShortTypeName } from '../internal/_getNameHelpers';
import { currentMultiPlatformEngine, nativeMultiPlatformEngine } from '../../serializer/native/multiplatformEngine';
export function floatFromModel(val, serializer) {
    const engine = (serializer === null || serializer === void 0 ? void 0 : serializer.engineType) === 'native' ? nativeMultiPlatformEngine : currentMultiPlatformEngine;
    return engine.wrap(val === undefined || val === null ? null : parseFloat(val));
}
export function fromEnum(value, serializer) {
    const engine = (serializer === null || serializer === void 0 ? void 0 : serializer.engineType) === 'native' ? nativeMultiPlatformEngine : currentMultiPlatformEngine;
    const shotEnumValueKey = getShortTypeName(value);
    const valuesArrayItem = this.valuesArray && this.valuesArray.filter(item => item.value == shotEnumValueKey)[0];
    return engine.wrap((this.values && this.values[shotEnumValueKey] !== undefined || valuesArrayItem) ? shotEnumValueKey : value);
}
export function parseBool(val, serializer) {
    const engine = (serializer === null || serializer === void 0 ? void 0 : serializer.engineType) === 'native' ? nativeMultiPlatformEngine : currentMultiPlatformEngine;
    return engine.wrap(val !== void 0 ? String(val).toLowerCase() === 'true' : val);
}
export function colorFromString(val, serializer) {
    const engine = (serializer === null || serializer === void 0 ? void 0 : serializer.engineType) === 'native' ? nativeMultiPlatformEngine : currentMultiPlatformEngine;
    const color = (val || '').split(',');
    let result = engine.wrap(val);
    if (color.length === 3) {
        result = engine.wrap('rgb(' + color.join(', ') + ')');
    }
    else if (color.length === 4) {
        const alpha = Math.round(parseFloat(color[0]) / 255 * 100) / 100;
        color.shift();
        color.push(alpha.toString());
        result = engine.wrap('rgba(' + color.join(', ') + ')');
    }
    return result;
}
export function saveAsInt(val) {
    return Math.round(val).toString();
}
export function colorToInt(color) {
    const colorAsString = colorToString(color).split(',');
    return (parseInt(colorAsString[0]) << 24) + (parseInt(colorAsString[1]) << 16) + (parseInt(colorAsString[2]) << 8) + (parseInt(colorAsString[3]));
}
export function colorToString(val) {
    const color = (val || '').split(', ');
    let result = val;
    if (color.length === 3) {
        color[0] = color[0].split('(')[1];
        color[2] = color[2].split(')')[0];
        result = color.join(',');
    }
    else if (color.length === 4) {
        const alpha = Math.round(parseFloat(color[3]) * 255);
        color.pop();
        color[0] = color[0].split('(')[1];
        result = alpha.toString() + ',' + color.join(',');
    }
    return result;
}