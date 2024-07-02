﻿/**
* DevExpress Analytics (serializer\native\viewModels\viewModelGenerator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EventManager } from '../../eventManager';
import { arrayModificationMapper } from '../deserializationEngine';
export const ViewModelChangedEvent = 'viewModelChanged';
export const viewModelGeneratorSettings = {
    customValueStorageFactory: null,
    ensureChangesImmutable: false,
    addTestFlag: false,
};
export const createViewModelGenerator = function (_viewModel = {}) {
    const generator = {
        createDefaultModel: (model) => {
            _viewModel = {
                getModel() {
                    return model;
                }
            };
            return generator;
        },
        generateProperty(propertyName, value, suppressViewModelNotification = false) {
            if (viewModelGeneratorSettings.addTestFlag && !_viewModel['_____test']) {
                Object.defineProperty(_viewModel, '_____test', {
                    get: () => true,
                    enumerable: false
                });
            }
            const subscribableViewModel = _viewModel;
            !subscribableViewModel._viewModelEvents && _injectEventManager(subscribableViewModel);
            if (suppressViewModelNotification || typeof value === 'function') {
                subscribableViewModel[propertyName] = value;
                return this;
            }
            if (Array.isArray(value)) {
                generateViewModelArrayProperty(subscribableViewModel, propertyName, value);
                return this;
            }
            generateViewModelProperty(subscribableViewModel, propertyName, value);
            return this;
        },
        configureProperty(propertyName, configure) {
            if (propertyName in _viewModel)
                configure(_viewModel[propertyName]);
            return this;
        },
        getViewModel() {
            return _viewModel;
        }
    };
    return generator;
};
const _injectEventManager = (viewModel) => {
    const eventManager = new EventManager();
    Object.defineProperty(viewModel, '_viewModelEvents', { get: () => eventManager, enumerable: false });
};
const defaultValueStorageFactory = (initialValue) => {
    let value = initialValue;
    return {
        getValue: () => value,
        setValue: (newValue) => value = newValue,
        explicitNotifySubscribers: () => { }
    };
};
const generateViewModelPropertyCore = (viewModel, propertyName, initialValue, subscribeToChanges) => {
    const customValueStorageFactory = viewModelGeneratorSettings.customValueStorageFactory;
    const valueStorage = customValueStorageFactory ? customValueStorageFactory(initialValue) : defaultValueStorageFactory(initialValue);
    const silentUpdate = (value) => valueStorage.setValue(value);
    let disposeSubscription = subscribeToChanges(initialValue, silentUpdate);
    Object.defineProperty(viewModel, propertyName, {
        enumerable: true,
        configurable: true,
        get: () => {
            return valueStorage.getValue();
        },
        set: (newValue) => {
            if (valueStorage.getValue() === newValue)
                return;
            disposeSubscription && disposeSubscription();
            const eventArgs = { propertyName, oldValue: valueStorage.getValue(), newValue };
            valueStorage.setValue(newValue);
            disposeSubscription = subscribeToChanges(newValue, silentUpdate);
            viewModel._viewModelEvents.call(ViewModelChangedEvent, eventArgs);
        }
    });
    return () => valueStorage.explicitNotifySubscribers();
};
const generateViewModelProperty = (viewModel, propertyName, initialValue) => {
    const valueChangedHandler = (value, silentUpdate) => (args) => {
        if (viewModelGeneratorSettings.ensureChangesImmutable && value && typeof value === 'object' && value._viewModelEvents) {
            silentUpdate(Object.assign({}, value));
        }
        viewModel._viewModelEvents.call(ViewModelChangedEvent, Object.assign(Object.assign({}, args), { propertyName: `${propertyName}.${args.propertyName}` }));
    };
    const subscribeToChanges = (value, silentUpdate) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value._viewModelEvents) === null || _a === void 0 ? void 0 : _a.on(ViewModelChangedEvent, valueChangedHandler(value, silentUpdate)); };
    generateViewModelPropertyCore(viewModel, propertyName, initialValue, subscribeToChanges);
};
const generateViewModelArrayProperty = (viewModel, propertyName, initialValue) => {
    let explicitNotifySubscribersCallback = () => { };
    const subscribeToArrayChanges = (array, silentUpdate) => {
        var _a;
        const disposables = new Map();
        const subscribeToArrayElement = (elt) => {
            var _a;
            return (_a = elt === null || elt === void 0 ? void 0 : elt._viewModelEvents) === null || _a === void 0 ? void 0 : _a.on(ViewModelChangedEvent, (args) => {
                var _a;
                const eventArgs = Object.assign(Object.assign({}, args), { propertyName: `${array.findIndex(x => x === elt)}.${args.propertyName}` });
                (_a = array === null || array === void 0 ? void 0 : array._viewModelEvents) === null || _a === void 0 ? void 0 : _a.call(ViewModelChangedEvent, eventArgs);
            });
        };
        if (Array.isArray(array)) {
            !array._viewModelEvents && _injectEventManager(array);
            const eventArgs = { propertyName, newValue: array, oldValue: array };
            disposables.set('', (_a = array === null || array === void 0 ? void 0 : array._viewModelEvents) === null || _a === void 0 ? void 0 : _a.on(ViewModelChangedEvent, (args) => {
                viewModelGeneratorSettings.ensureChangesImmutable && silentUpdate([...array]);
                viewModel._viewModelEvents.call(ViewModelChangedEvent, Object.assign(Object.assign({}, args), { propertyName: `${propertyName}.${args.propertyName}` }));
            }));
            let isCalled = false;
            for (const name in arrayModificationMapper) {
                arrayModificationMapper[name](array, (changes) => {
                    if (!isCalled) {
                        isCalled = true;
                        explicitNotifySubscribersCallback();
                        isCalled = false;
                    }
                    switch (changes.operation) {
                        case 'push':
                            changes
                                .added
                                .filter(x => x.item && x.item._viewModelEvents)
                                .forEach(x => disposables.set(x.item, subscribeToArrayElement(x.item)));
                            break;
                        case 'splice':
                            changes
                                .added
                                .filter(x => x.item && x.item._viewModelEvents)
                                .forEach(x => disposables.set(x.item, subscribeToArrayElement(x.item)));
                            changes.removed.forEach(x => {
                                const disposeSubscription = x.item && disposables.get(x.item);
                                disposeSubscription && disposeSubscription();
                                disposables.delete(x.item);
                            });
                            break;
                        case 'pop':
                            changes.removed.forEach(x => {
                                const disposeSubscription = x.item && disposables.get(x.item);
                                disposeSubscription && disposeSubscription();
                                disposables.delete(x.item);
                            });
                            break;
                    }
                    viewModel._viewModelEvents.call(ViewModelChangedEvent, eventArgs);
                });
            }
            array.filter(x => x && x._viewModelEvents).forEach((elt) => disposables.set(elt, subscribeToArrayElement(elt)));
        }
        return () => disposables.forEach(dispose => dispose && dispose());
    };
    explicitNotifySubscribersCallback = generateViewModelPropertyCore(viewModel, propertyName, initialValue, subscribeToArrayChanges);
};
