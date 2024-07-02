﻿/**
* DevExpress Analytics (serializer\serializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { NativeModelSerializer } from './native/serializer';
export class ModelSerializer extends NativeModelSerializer {
    constructor(options) {
        super(options);
        this.engineType = 'multiplatform';
    }
    wrapPropertyArrayValue(value) {
        return ko.observableArray(value);
    }
    wrapPropertyValue(value) {
        return ko.observable(value);
    }
    unwrapPropertyValue(value) {
        return ko.unwrap(value);
    }
    setLinkProperty(viewModel, propertyName, newVal) {
        viewModel[propertyName](newVal);
        return viewModel[propertyName]();
    }
    getLinkProperty(viewModel, propertyName) {
        return viewModel[propertyName]();
    }
    generateProperty(model, propertyName, value) {
        model[propertyName] = value;
    }
    generateArrayProperty(model, propertyName, value) {
        const currentArray = ko.observable(undefined);
        Object.defineProperty(model, propertyName, {
            get: () => {
                return currentArray();
            },
            set: (val) => {
                currentArray(val);
            },
            enumerable: true,
            configurable: true
        });
    }
}
