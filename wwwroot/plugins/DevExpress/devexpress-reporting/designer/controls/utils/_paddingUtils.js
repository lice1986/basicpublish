﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_paddingUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements';
import { subscribableProperty } from '@devexpress/analytics-core/analytics-serializer-native';
import { Locker } from '../../../common/utils/_locker';
export function createPaddingProperty(model, parent) {
    model.addDisposable(model.paddingObj = new PaddingModel());
    model.paddingObj.applyFromString(model['padding']());
    const lock = new Locker().lock;
    model._disposables.push(model.padding.subscribe((newVal) => {
        lock(() => model.paddingObj.applyFromString(newVal));
    }));
    ['left', 'right', 'top', 'bottom'].forEach(name => {
        model.addDisposable(model.paddingObj.subscribeProperty(name, (newVal) => {
            const root = parent === null || parent === void 0 ? void 0 : parent.root;
            if ((root === null || root === void 0 ? void 0 : root.isModelReady) && root.isModelReady() || !(root === null || root === void 0 ? void 0 : root.isModelReady))
                lock(() => model.padding(model.paddingObj.toString()));
        }));
    });
    if (parent) {
        model.dpi = parent.dpi;
        model.addDisposable(model.paddingObj.createComputedProperty('dpi', () => model.dpi && model.dpi(), [subscribableProperty(model, ['dpi'])]));
        model.addDisposable(model.paddingObj.subscribeProperty('dpi', newVal => lock(() => {
            const padding = model._padding || model.padding;
            if (padding())
                padding(model.paddingObj.toString());
        })));
    }
    model.paddingObj.resetValue = () => {
        lock(() => {
            ['left', 'right', 'top', 'bottom'].forEach(name => model.paddingObj[name](null));
            model.padding(model.paddingObj.toString());
            model.paddingObj.applyFromString(model.padding());
        });
    };
}
