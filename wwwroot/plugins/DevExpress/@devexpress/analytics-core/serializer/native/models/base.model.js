﻿/**
* DevExpress Analytics (serializer\native\models\base.model.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EventPropertyManager } from '../../eventManager';
import { Disposable } from '../../disposable';
import { defaultPropertyDeserializatonEngine } from '../deserializationEngine';
import { currentModelSerializer, currentMultiPlatformEngine, nativeModelSerializer, nativeMultiPlatformEngine } from '../multiplatformEngine';
import { createViewModelGenerator } from '../viewModels/viewModelGenerator';
import { updateViewModel } from '../deserializationEngine.updateViewModel';
export class BaseModel extends Disposable {
    constructor(model = {}, serializer = currentModelSerializer()) {
        super();
        this.events = new EventPropertyManager();
        if (this._needInitializeModel()) {
            this.deserialize(model, serializer);
            if (this.__decorators)
                this.__decorators.forEach(x => x(this));
        }
    }
    deferredUpdateViewModel() { return true; }
    assignProperty(propertyName, value, options) {
        defaultPropertyDeserializatonEngine.generateProperty(this, propertyName, value, options);
    }
    assignArrayProperty(propertyName, value, options) {
        defaultPropertyDeserializatonEngine.generateArrayProperty(this, propertyName, value, options);
    }
    deserialize(model, serializer) {
        serializer.deserialize(this, model);
    }
    dispose() {
        super.dispose();
        this.events && this.events.dispose();
    }
    _needInitializeModel() {
        return true;
    }
    _initializeModel(model, serializer) {
        this.deserialize(model, serializer);
        if (this.__decorators)
            this.__decorators.forEach(x => x(this));
    }
}
export function mutable(defaultVal, options) {
    return (target, propertyKey) => {
        if (!target.__decorators)
            target.__decorators = [];
        target.__decorators.push((model) => {
            if (target.isPrototypeOf(model)) {
                const value = typeof defaultVal === 'function' ? defaultVal() : defaultVal;
                model.assignProperty(propertyKey, value, options);
            }
        });
    };
}
export function mutableArray(defaultVal, options) {
    return (target, propertyKey) => {
        if (!target.__decorators)
            target.__decorators = [];
        target.__decorators.push((model) => {
            if (target.isPrototypeOf(model)) {
                model.assignArrayProperty(propertyKey, [...defaultVal()], options);
            }
        });
    };
}
export class BaseEmptyModel extends BaseModel {
    onPropertyChanged(args) { }
}
export class BaseRenderingModel extends BaseModel {
    getViewModel() {
        if (!this.__viewModel)
            this.initializeViewModel();
        return this.__viewModel;
    }
    onPropertyChanged(args) {
        throw new Error('Method not implemented.');
    }
    initializeViewModel() {
        this.__viewModel = this.createViewModel();
    }
    updateViewModel(args) {
    }
    setProperty(propertyName, value) {
        this[propertyName] = value;
    }
    getProperty(propertyName) {
        return this[propertyName];
    }
    createViewModel() {
        return createViewModelGenerator()
            .createDefaultModel(this)
            .getViewModel();
    }
}
export class BaseRenderingMultiplatformModel extends BaseRenderingModel {
    constructor(model = {}, serializer, _engineType = 'multiplatform') {
        super(model, serializer);
        this._engineType = _engineType;
        this._propertiesSubscriptions = {};
        if (!serializer) {
            serializer = this._engineType === 'multiplatform' ? currentModelSerializer() : nativeModelSerializer();
        }
        this._engineType = serializer.engineType;
        this._initializeModel(model, serializer);
    }
    _needInitializeModel() { return false; }
    _getEngine() {
        return this._engineType === 'native' ? nativeMultiPlatformEngine : currentMultiPlatformEngine;
    }
    onPropertyChanged(args) { }
    subscribeOnChanges(viewModel, propertyNames) {
        propertyNames.forEach((propertyName) => {
            this._propertiesSubscriptions[propertyName] && this._propertiesSubscriptions[propertyName]();
            this._propertiesSubscriptions[propertyName] = this.subscribeProperty(propertyName, (newValue) => {
                if (!viewModel)
                    return;
                const oldValue = viewModel[propertyName];
                viewModel[propertyName] = newValue;
                updateViewModel(this, {
                    propertyName,
                    oldValue,
                    newValue: newValue
                });
            });
        });
    }
    _get(propertyName, unwrap = 'unwrap') {
        const value = this._getEngine().getPropertyValue(this, propertyName);
        if (unwrap === 'unwrap')
            return this.unwrap(value);
        if (unwrap === 'peek')
            return this.peek(value);
        return value;
    }
    _set(propertyName, value) {
        this._getEngine().setPropertyValue(this, propertyName, value);
    }
    assignProperty(propertyName, value, options) {
        this._getEngine().generateProperty(this, propertyName, value, options);
    }
    assignArrayProperty(propertyName, value, options) {
        this._getEngine().generateArrayProperty(this, propertyName, value, options);
    }
    createComputedProperty(propertyName, computedOptions, properties, options, pure = false) {
        return this._getEngine().createComputedProperty(this, propertyName, computedOptions, properties, options, pure);
    }
    subscribeProperty(propertyName, callback, onDispose) {
        return this._getEngine().subscribeOnPropertyChanged(this, propertyName, callback, onDispose);
    }
    unwrap(value) {
        return this._getEngine().unwrap(value);
    }
    peek(value) {
        return this._getEngine().peek(value);
    }
    destroyPropertySubscription(propertyName) {
        this._propertiesSubscriptions[propertyName] && this._propertiesSubscriptions[propertyName]();
        delete this._propertiesSubscriptions[propertyName];
    }
    dispose() {
        super.dispose();
        Object.keys(this._propertiesSubscriptions).forEach(x => {
            this._propertiesSubscriptions[x]();
        });
        this._propertiesSubscriptions = {};
    }
}
