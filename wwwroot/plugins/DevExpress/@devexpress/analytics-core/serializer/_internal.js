﻿/**
* DevExpress Analytics (serializer\_internal.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { currentMultiPlatformEngine } from './native/multiplatformEngine';
export function _defineProperty(legacyObject, realObject, propertyName, newPropertyName) {
    delete legacyObject[propertyName];
    newPropertyName = newPropertyName || propertyName;
    Object.defineProperty(legacyObject, propertyName, {
        get: () => { return realObject[newPropertyName]; },
        set: (newVal) => { realObject[newPropertyName] = newVal; },
        configurable: true
    });
}
export function _definePropertyByString(rootObject, ...objectPathes) {
    const getAndCreateObject = (path, createNew = true) => {
        const pathParts = path.split('.');
        let foundedObject = rootObject;
        for (let i = 0; i < pathParts.length - 1; i++) {
            if (!foundedObject[pathParts[i]] && createNew) {
                foundedObject[pathParts[i]] = {};
            }
            foundedObject = foundedObject[pathParts[i]];
        }
        return {
            object: foundedObject,
            propertyName: pathParts[pathParts.length - 1]
        };
    };
    const realObjectPath = objectPathes[objectPathes.length - 1];
    const realObject = getAndCreateObject(objectPathes[objectPathes.length - 1]);
    for (let i = 0; i < objectPathes.length - 1; i++) {
        ((legacyObjectPath, legacyObject) => {
            Object.defineProperty(legacyObject.object, legacyObject.propertyName, {
                get: () => {
                    console.warn('DevExpress.' + legacyObjectPath + ' is now deprecated and will be removed in future versions. Use DevExpress.' + realObjectPath + ' instead.');
                    return realObject.object[realObject.propertyName];
                },
                set: (newVal) => {
                    console.warn('DevExpress.' + legacyObjectPath + ' is now deprecated and will be removed in future versions. Use DevExpress.' + realObjectPath + ' instead.');
                    realObject.object[realObject.propertyName] = newVal;
                },
                configurable: true
            });
        })(objectPathes[i], getAndCreateObject(objectPathes[i]));
    }
}
export function addDisposeCallback(element, callback) {
    let disposeCallback = () => {
        currentMultiPlatformEngine.removeDisposeCallback(element, disposeCallback);
        callback && callback();
        disposeCallback = null;
        callback = null;
    };
    currentMultiPlatformEngine.addDisposeCallback(element, disposeCallback);
}
export function createGlobalModuleVariableFunc(defaultVal, onValueChanged) {
    let currentValue = defaultVal;
    const subscribers = [];
    const updateFunc = (newVal) => {
        if (newVal !== undefined) {
            if (currentValue !== newVal) {
                currentValue = newVal;
                onValueChanged && onValueChanged(newVal);
                subscribers.forEach(x => x(newVal));
            }
        }
        return currentValue;
    };
    const subscribe = (callback) => {
        subscribers.push(callback);
        return () => subscribers.splice(subscribers.indexOf(callback), 1);
    };
    const notifySubscribers = (newVal) => {
        if (currentValue !== newVal) {
            currentValue = newVal;
            subscribers.forEach(x => x(newVal));
        }
    };
    return Object.assign(updateFunc, {
        subscribe,
        notifySubscribers
    });
}