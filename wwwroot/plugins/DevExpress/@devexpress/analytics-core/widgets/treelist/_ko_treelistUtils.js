﻿/**
* DevExpress Analytics (widgets\treelist\_ko_treelistUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DefaultTreeListItemFactory } from './_treelistItem';
import { PathRequest } from '../common/pathRequest';
function wrapWithComputed(callback, propertyGetter) {
    const observable = ko.observable();
    const subscription = observable.subscribe(value => callback(value));
    const computed = ko.computed(() => {
        const value = propertyGetter();
        observable(value);
    });
    return () => {
        computed.dispose();
        subscription.dispose();
    };
}
export function wrapTreeListOptionsWithKo(options) {
    var _a, _b, _c;
    if (((_a = options.treeListController) === null || _a === void 0 ? void 0 : _a.itemsFilter) && !options.treeListController.subscribeOnVisibleChanged) {
        options.treeListController.subscribeOnVisibleChanged = (item, callback) => {
            return wrapWithComputed(callback, () => item.data && !item.treeListController.itemsFilter(item.data, item.path, item));
        };
    }
    if (((_b = options.treeListController) === null || _b === void 0 ? void 0 : _b.getActions) && !options.treeListController.subscribeOnActionsChanged) {
        options.treeListController.subscribeOnActionsChanged = (item, callback) => {
            return wrapWithComputed(callback, () => item.treeListController.getActions(item));
        };
    }
    if (!options.subscribeOnDataPropertyChanged) {
        options.subscribeOnDataPropertyChanged = (item, propertyName, callback) => {
            return wrapWithComputed(callback, () => ko.unwrap(item.data && item.data[propertyName]));
        };
    }
    if (((_c = options.itemsProvider) === null || _c === void 0 ? void 0 : _c.getItems) && !options.itemsProvider.subscribeOnItemsChanged) {
        options.itemsProvider.subscribeOnItemsChanged = (item, callback) => {
            return wrapWithComputed(callback, () => options.itemsProvider.getItems(new PathRequest(item.path, item.pathParts)));
        };
    }
    return options;
}
export class KoTreeListItemFactory extends DefaultTreeListItemFactory {
    createRootItem(options, path, onItemsVisibilityChanged, rtl) {
        const pathArray = ko.computed(() => {
            const result = ko.unwrap(path);
            if (!Array.isArray(result)) {
                return !!result ? result.split('.') : [];
            }
            return result;
        });
        return super.createRootItem(wrapTreeListOptionsWithKo(options), pathArray, onItemsVisibilityChanged, rtl);
    }
    createItem(options, path, onItemsVisibilityChanged, rtl, resolver) {
        return super.createItem(wrapTreeListOptionsWithKo(options), path, onItemsVisibilityChanged, rtl, resolver);
    }
}
