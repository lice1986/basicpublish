﻿/**
* DevExpress Analytics (serializer\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
function isWindow(obj) {
    return obj != null && obj === obj.window;
}
const class2type = {};
const hasOwn = class2type.hasOwnProperty;
['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'].forEach(name => class2type['[object ' + name + ']'] = name.toLowerCase());
function type(obj) {
    if (obj == null) {
        return obj + '';
    }
    return typeof obj === 'object' || typeof obj === 'function' ?
        class2type[class2type.toString.call(obj)] || 'object' :
        typeof obj;
}
function isNumeric(obj) {
    return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
}
export function isPlainObject(obj) {
    if (type(obj) !== 'object' || obj.nodeType || isWindow(obj)) {
        return false;
    }
    return !(obj.constructor && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf'));
}
export function isEmptyObject(obj) {
    if ((typeof obj) === 'string') {
        return false;
    }
    return obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0;
}
export function isFunction(obj) {
    return type(obj) === 'function';
}
export function extend(_target, object1, ...objectN) {
    let options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, deep = false;
    const length = arguments.length;
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== 'object' && !isFunction(target)) {
        target = {};
    }
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[name] = extend(deep, clone, copy);
                }
                else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}
export function assignObj(obj, objectProps) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), objectProps || obj);
}