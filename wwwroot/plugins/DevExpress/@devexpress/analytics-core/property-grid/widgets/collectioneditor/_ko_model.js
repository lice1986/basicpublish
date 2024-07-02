﻿/**
* DevExpress Analytics (property-grid\widgets\collectioneditor\_ko_model.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CollectionEditorViewModel } from './_editor';
export const wrapModelWithKo = (options, viewModel) => {
    const arrayForWorkComputed = ko.computed(() => ko.isObservableArray(options.values) ? options.values : ko.unwrap(options.values));
    const getOptionsInfoProperty = (propertyName) => !propertyName ? ko.unwrap(options.info)
        : ko.unwrap(options.info) && ko.unwrap(options.info)[propertyName];
    const currentHandler = options.addHandler;
    const addHandler = () => (currentHandler || getOptionsInfoProperty('addHandler')).call(this);
    options.addHandler = () => {
        return addHandler();
    };
    let isUpdate = false;
    const lock = (callback) => {
        if (!isUpdate) {
            isUpdate = true;
            callback();
            isUpdate = false;
        }
    };
    options.onValueChanged = (array, args) => {
        lock(() => {
            var _a, _b;
            (_a = args.added) === null || _a === void 0 ? void 0 : _a.forEach(change => arrayForWorkComputed().splice(change.index, 0, change.item));
            (_b = args.removed) === null || _b === void 0 ? void 0 : _b.sort((a, b) => b.index - a.index).forEach(change => arrayForWorkComputed().splice(change.index, 1));
        });
    };
    const collectionEditorModel = new CollectionEditorViewModel(Object.assign(Object.assign({}, options), { values: [...arrayForWorkComputed()()], undoEngine: ko.unwrap(options.undoEngine), info: ko.unwrap(options.info) }), ko.unwrap(viewModel === null || viewModel === void 0 ? void 0 : viewModel.disabled));
    if (ko.isSubscribable(viewModel === null || viewModel === void 0 ? void 0 : viewModel.disabled)) {
        collectionEditorModel._disposables.push(viewModel.disabled.subscribe((newVal) => {
            collectionEditorModel.disabled = newVal;
        }));
    }
    collectionEditorModel._disposables.push(arrayForWorkComputed);
    const createArraySubscription = () => arrayForWorkComputed().subscribe((changes) => {
        lock(() => {
            changes.forEach(change => {
                if (change.status === 'added') {
                    collectionEditorModel.values.splice(change.index, 0, change.value);
                }
                if (change.status === 'deleted') {
                    collectionEditorModel.values.splice(change.index, 1);
                }
            });
        });
    }, undefined, 'arrayChange');
    let currentArraySubscription = createArraySubscription();
    collectionEditorModel._disposables.push(currentArraySubscription);
    collectionEditorModel._disposables.push(arrayForWorkComputed.subscribe((newVal) => {
        lock(() => {
            currentArraySubscription.dispose();
            collectionEditorModel.values = [...ko.unwrap(newVal)];
            currentArraySubscription = createArraySubscription();
            collectionEditorModel._disposables.push(currentArraySubscription);
        });
    }));
    if (viewModel && ko.isSubscribable(viewModel.disabled)) {
        collectionEditorModel._disposables.push(viewModel.disabled.subscribe(newVal => {
            collectionEditorModel.disabled = ko.unwrap(viewModel.disabled);
        }));
    }
    return collectionEditorModel;
};
