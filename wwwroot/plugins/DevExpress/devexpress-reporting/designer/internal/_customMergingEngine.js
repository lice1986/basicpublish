﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_customMergingEngine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CombinedObject } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
export class CustomMergingEngine {
    _customMergeForFormatString(propertyName, controls, undoEngine) {
        if (propertyName === 'formatString') {
            const result = ko.observable(controls.every((control) => { return controls[0][propertyName].peek() === control[propertyName].peek(); }) ? controls[0][propertyName].peek() : null);
            return {
                result,
                subscriptions: [
                    result.subscribe((newVal) => {
                        undoEngine && undoEngine().start();
                        controls.forEach(control => {
                            if (!control.disabled()) {
                                control[propertyName](newVal);
                            }
                        });
                        undoEngine && undoEngine().end();
                    })
                ]
            };
        }
    }
    customMerge(propertyName, controls, undoEngine) {
        if (propertyName === 'dataBindings') {
            const result = ko.observableArray();
            let subscriptions = [];
            const allBindings = [].concat.apply([], controls.map((x) => x[propertyName]()));
            controls[0][propertyName]().map(x => x.propertyName()).forEach((name) => {
                const availableBindings = allBindings.filter(binding => {
                    return binding.propertyName() === name;
                });
                if (availableBindings.length === controls.length) {
                    const combinedObj = CombinedObject._merge(availableBindings, undoEngine, (propertyName, controls, undoEngine) => this._customMergeForFormatString(propertyName, controls, undoEngine));
                    const binding = combinedObj.result;
                    binding['isEmpty'] = () => {
                        return !(binding['dataMember']() || binding['dataSource']() || binding['parameter']());
                    };
                    binding['visible'] = ko.observable(false);
                    binding['disabled'] = ko.computed(() => {
                        return availableBindings.every(x => x.disabled());
                    });
                    combinedObj.subscriptions.push(binding['disabled']);
                    result.push(binding);
                    subscriptions = [].concat.apply(subscriptions, combinedObj.subscriptions);
                }
            });
            return { result, subscriptions };
        }
    }
}
