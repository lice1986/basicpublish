﻿/**
* DevExpress Analytics (core\internal\_ko_integration.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { setDefautModelAccessor } from '../../serializer/native/models/modelAccessor';
import { viewModelGeneratorSettings } from '../../serializer/native/viewModels/viewModelGenerator';
import { KoTreeListItemFactory } from '../../widgets/treelist/_ko_treelistUtils';
import { setDefaultTreeListItemFactory } from '../../widgets/treelist/_treelistItem';
import { MultiplatformEngine, setCurrentModelSerializer, setCurrentMultiplatfromEngine } from '../../serializer/native/multiplatformEngine';
import { ModelSerializer } from '../../serializer/serializer';
import { updateViewModel } from '../../serializer/native/deserializationEngine.updateViewModel';
const modelAccessor = (element) => {
    return ko.dataFor(element);
};
const setKoValueStorageFactory = () => {
    const koValueStorageFactory = (initialValue) => {
        const value = ko.observable(initialValue);
        return {
            getValue: () => value(),
            setValue: (newValue) => value(newValue),
            explicitNotifySubscribers: () => value.valueHasMutated()
        };
    };
    viewModelGeneratorSettings.customValueStorageFactory = koValueStorageFactory;
};
export class KoEngine extends MultiplatformEngine {
    _notifyModel(model, propertyName) {
        const args = {
            propertyName: propertyName,
            newValue: model[propertyName]()
        };
        model['onPropertyChanged'] && model['onPropertyChanged'](args);
        updateViewModel(model, args);
        model['events'] && model['events'].call('propertyChanged', args);
    }
    addDisposeCallback(element, disposeCallback) {
        ko.utils.domNodeDisposal.addDisposeCallback(element, disposeCallback);
    }
    removeDisposeCallback(element, disposeCallback) {
        ko.utils.domNodeDisposal.removeDisposeCallback(element, disposeCallback);
    }
    peek(value) {
        return value.peek();
    }
    getPropertyValue(model, propertyName) {
        return model[propertyName];
    }
    setPropertyValue(model, propertyName, value, currentValue) {
        if (ko.isObservable(model[propertyName]))
            model[propertyName](value);
        else {
            model[propertyName] = value;
        }
    }
    generateProperty(model, propertyName, value, options) {
        model[propertyName] = ko.observable(value).extend(options);
        model.addDisposable(model[propertyName].subscribe((newVal) => {
            this._notifyModel(model, propertyName);
        }));
    }
    generateArrayProperty(model, propertyName, value, options) {
        model[propertyName] = ko.observableArray(value).extend(options);
        model.addDisposable(model[propertyName].subscribe((newVal) => {
            this._notifyModel(model, propertyName);
        }));
    }
    createComputedProperty(configurableModel, configurablePropertyName, comOptions, properties, options, pure = false) {
        const computedBody = typeof comOptions === 'function' ?
            () => comOptions() :
            {
                read: () => comOptions.read(),
                write: (newVal) => comOptions.write(newVal)
            };
        configurableModel[configurablePropertyName] = (pure ? ko.pureComputed : ko.computed)(computedBody).extend(options);
        return () => configurableModel[configurablePropertyName].dispose();
    }
    subscribeOnPropertyChanged(model, subscribablePropertyName, callback) {
        if (ko.isSubscribable(model[subscribablePropertyName])) {
            const subscription = model[subscribablePropertyName].subscribe((newVal) => callback(newVal));
            return () => subscription.dispose();
        }
        return () => void 0;
    }
    subscribeValue(value, callback) {
        if (ko.isSubscribable(value)) {
            const subscription = value.subscribe((newVal) => callback(newVal));
            return () => subscription.dispose();
        }
        return () => void 0;
    }
    unwrap(value) {
        return ko.unwrap(value);
    }
    wrap(value) {
        return ko.observable(value);
    }
    applyBindings(value, element) {
        ko.applyBindings(value, element);
    }
    cleanNode(element) {
        ko.cleanNode(element);
    }
}
export function useKoIntegration() {
    setKoValueStorageFactory();
    setDefautModelAccessor(modelAccessor);
    setDefaultTreeListItemFactory(KoTreeListItemFactory);
    setCurrentMultiplatfromEngine(new KoEngine());
    setCurrentModelSerializer((options) => new ModelSerializer(options));
}