﻿/**
* DevExpress Analytics (serializer\native\deserializationEngine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { updateViewModel } from './deserializationEngine.updateViewModel';
export function notifyPropertyChanged(model, args) {
    var _a;
    model.onPropertyChanged && model.onPropertyChanged(args);
    updateViewModel(model, args);
    (_a = model.events) === null || _a === void 0 ? void 0 : _a.call('propertyChanged', args);
}
export const arrayModificationMapper = {
    'push': (array, callback) => {
        Object.defineProperty(array, 'push', {
            enumerable: false,
            configurable: true,
            get: () => {
                return (...items) => {
                    const currentLength = array.length;
                    const result = Array.prototype.push.call(array, ...items);
                    callback({
                        operation: 'push',
                        added: items.map((x, index) => ({
                            item: x,
                            index: currentLength + index
                        })),
                        removed: [],
                        newValue: array
                    });
                    return result;
                };
            }
        });
    },
    'splice': (array, callback) => {
        Object.defineProperty(array, 'splice', {
            enumerable: false,
            configurable: true,
            get: () => {
                return (startIndex, deleteCount, ...items) => {
                    const result = Array.prototype.splice.call(array, startIndex, deleteCount, ...items);
                    callback({
                        operation: 'splice',
                        added: items.map((x, index) => ({
                            item: x,
                            index: startIndex + index
                        })),
                        removed: result && result.map((x, index) => ({
                            item: x,
                            index: startIndex + index
                        })),
                        newValue: array
                    });
                    return result;
                };
            }
        });
    },
    'pop': (array, callback) => {
        Object.defineProperty(array, 'pop', {
            enumerable: false,
            configurable: true,
            get: () => {
                return () => {
                    const currentLength = array.length;
                    const result = Array.prototype.pop.call(array);
                    callback({
                        operation: 'pop',
                        added: [],
                        removed: [{
                                item: result,
                                index: currentLength - 1
                            }],
                        newValue: array
                    });
                    return result;
                };
            }
        });
    }
};
export class PropertyDeserializationEngine {
    _defineProperty(model, propertyName, createCurrentValue, onValueChanged = () => void 0, options) {
        let currentValue = createCurrentValue();
        let notifyPromise = null;
        let notifyTimeout = null;
        onValueChanged && onValueChanged(currentValue);
        Object.defineProperty(model, propertyName, {
            configurable: true,
            enumerable: true,
            get: () => {
                return currentValue;
            },
            set: (newValue) => {
                const oldValue = currentValue;
                currentValue = newValue;
                const notifySubscribers = () => {
                    const disposabledModel = model;
                    if (!disposabledModel.isDisposing && (oldValue !== currentValue || (options === null || options === void 0 ? void 0 : options.notify) === 'always')) {
                        const args = {
                            propertyName,
                            oldValue,
                            newValue: currentValue
                        };
                        onValueChanged && onValueChanged(currentValue);
                        notifyPropertyChanged(model, args);
                    }
                };
                if (options === null || options === void 0 ? void 0 : options.deferred) {
                    if (!notifyPromise) {
                        notifyPromise = Promise.resolve().then(() => {
                            notifySubscribers();
                            notifyPromise = null;
                        });
                    }
                }
                else if (options === null || options === void 0 ? void 0 : options.rateLimit) {
                    if (options.rateLimit.method === 'notifyWhenChangesStop') {
                        if (notifyTimeout)
                            clearTimeout(notifyTimeout);
                    }
                    else {
                        if (notifyTimeout !== null)
                            return;
                    }
                    notifyTimeout = setTimeout(() => {
                        notifySubscribers();
                        notifyTimeout = null;
                    }, options.rateLimit.timeout);
                }
                else {
                    notifySubscribers();
                }
            },
        });
    }
    generateArrayProperty(model, propertyName, value, options) {
        this._defineProperty(model, propertyName, () => value, ((newVal) => {
            if (Array.isArray(newVal))
                for (const name in arrayModificationMapper) {
                    arrayModificationMapper[name](newVal, (changes) => {
                        const args = Object.assign({ propertyName }, changes);
                        notifyPropertyChanged(model, args);
                    });
                }
        }), options);
    }
    generateProperty(model, propertyName, value, options) {
        this._defineProperty(model, propertyName, () => value, null, options);
    }
}
export const defaultPropertyDeserializatonEngine = new PropertyDeserializationEngine();
