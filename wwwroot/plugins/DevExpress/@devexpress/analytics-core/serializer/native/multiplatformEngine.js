﻿/**
* DevExpress Analytics (serializer\native\multiplatformEngine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { defaultPropertyDeserializatonEngine } from './deserializationEngine';
import { updateViewModel } from './deserializationEngine.updateViewModel';
import { NativeModelSerializer } from './serializer';
function isComplexProperty(currentProperty) {
    return typeof currentProperty === 'object' && 'subscribables' in currentProperty;
}
export function subscribableProperty(model, properties) {
    return { model, properties };
}
export class MultiplatformEngine {
    cleanNode(child) { }
    addDisposeCallback(element, disposeCallback) { }
    removeDisposeCallback(element, disposeCallback) { }
    peek(value) {
        return value;
    }
    getPropertyValue(model, propertyName) {
        return model[propertyName];
    }
    setPropertyValue(model, propertyName, value, currentValue) {
        model[propertyName] = value;
    }
    generateProperty(model, propertyName, value, options) {
        defaultPropertyDeserializatonEngine.generateProperty(model, propertyName, value, options);
    }
    generateArrayProperty(model, propertyName, value, options) {
        defaultPropertyDeserializatonEngine.generateArrayProperty(model, propertyName, value, options);
    }
    createComputedProperty(configurableModel, configurablePropertyName, comOptions, properties, options, pure = false) {
        const computedResults = {
            prevValue: void 0,
            value: void 0
        };
        const notifyChanges = () => {
            const newValue = configurableModel[configurablePropertyName];
            computedResults['prevValue'] = computedResults['value'];
            computedResults['value'] = newValue;
            if (typeof newValue !== 'object' && computedResults['prevValue'] === computedResults['value']) {
                return;
            }
            const args = {
                propertyName: configurablePropertyName,
                newValue
            };
            configurableModel['onPropertyChanged'] && configurableModel['onPropertyChanged'](args);
            updateViewModel(configurableModel, args);
            configurableModel['events'] && configurableModel['events'].call('propertyChanged', args);
        };
        if (typeof comOptions === 'function') {
            Object.defineProperty(configurableModel, configurablePropertyName, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return comOptions();
                }
            });
            comOptions();
        }
        else {
            Object.defineProperty(configurableModel, configurablePropertyName, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return comOptions.read();
                },
                set: (newVal) => comOptions.write(newVal)
            });
        }
        function subscribeProperty(model, properties) {
            var _a;
            const curreetModelSubscriptions = {};
            const currentSubscriptions = [];
            if (properties === '*') {
                currentSubscriptions.push((_a = model === null || model === void 0 ? void 0 : model.events) === null || _a === void 0 ? void 0 : _a.on('propertyChanged', () => {
                    notifyChanges();
                }));
            }
            else {
                properties.forEach(property => {
                    var _a, _b;
                    if (isComplexProperty(property)) {
                        const eventName = `${property.propertyName}Changed`;
                        currentSubscriptions.push((_a = model === null || model === void 0 ? void 0 : model.events) === null || _a === void 0 ? void 0 : _a.on(eventName, ({ propertyName }) => {
                            curreetModelSubscriptions[propertyName] && curreetModelSubscriptions[propertyName]();
                            if (Array.isArray(model[propertyName])) {
                                const arraySubscriptions = model[propertyName].map((value) => {
                                    return subscribeProperty(value, property.subscribables);
                                });
                                curreetModelSubscriptions[propertyName] = () => arraySubscriptions.forEach((sub) => sub());
                            }
                            else {
                                curreetModelSubscriptions[propertyName] = subscribeProperty(model[propertyName], property.subscribables);
                            }
                            notifyChanges();
                        }));
                    }
                    else if (typeof property === 'string') {
                        const eventName = `${property}Changed`;
                        currentSubscriptions.push((_b = model === null || model === void 0 ? void 0 : model.events) === null || _b === void 0 ? void 0 : _b.on(eventName, () => notifyChanges()));
                    }
                });
            }
            return () => {
                for (const name in curreetModelSubscriptions)
                    curreetModelSubscriptions[name]();
                currentSubscriptions.forEach(x => x && x());
            };
        }
        const subscriptions = properties.map(x => {
            if (x.model)
                return subscribeProperty(x.model, x.properties);
            return () => void 0;
        });
        return () => { subscriptions.forEach(x => x()); };
    }
    subscribeValue(value, callback) {
        return () => void 0;
    }
    subscribeOnPropertyChanged(model, subscribablePropertyName, callback, onDispose) {
        if (model && model.events) {
            const eventName = `${subscribablePropertyName}Changed`;
            const subscription = model.events.on(eventName, ({ newValue }) => {
                callback(newValue);
            });
            return () => {
                subscription();
                onDispose && onDispose();
            };
        }
        return () => void 0;
    }
    unwrap(value) {
        return value;
    }
    wrap(value) {
        return value;
    }
    applyBindings(value, element) { }
}
export const nativeMultiPlatformEngine = new MultiplatformEngine();
export const nativeModelSerializer = (options) => new NativeModelSerializer(options);
export let currentModelSerializer = nativeModelSerializer;
export let currentMultiPlatformEngine = nativeMultiPlatformEngine;
export function setCurrentMultiplatfromEngine(engine) {
    currentMultiPlatformEngine = engine;
}
export function setCurrentModelSerializer(serializerCallback) {
    currentModelSerializer = serializerCallback;
}