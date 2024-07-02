﻿/**
* DevExpress Analytics (core\utils\_arrayutils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export function createObservableReverseArrayMapCollection(elementModels, target, createItem) {
    const array = target();
    elementModels.peek().forEach(item => {
        const surface = createItem(item);
        array.splice(0, 0, surface);
    });
    target.valueHasMutated();
    return elementModels.subscribe((args) => {
        const unwrapedTarget = target();
        let targetLength = unwrapedTarget.length;
        args.forEach((changeSet) => {
            if (changeSet.status === 'deleted') {
                unwrapedTarget.splice(unwrapedTarget.indexOf(changeSet.value.surface), 1);
                targetLength--;
            }
        });
        args.forEach((changeSet) => {
            if (changeSet.status === 'added') {
                unwrapedTarget.splice(targetLength - changeSet.index, 0, createItem(changeSet.value));
                targetLength++;
            }
        });
        target.valueHasMutated();
    }, null, 'arrayChange');
}
export function createObservableArrayMapCollection(elementModels, target, createItem) {
    const array = target();
    elementModels.peek().forEach(item => {
        const surface = createItem(item);
        array.push(surface);
    });
    target.valueHasMutated();
    return elementModels.subscribe((args) => {
        let startIndex = target().length, deleteCount = 0;
        const valuesToAdd = [];
        args.forEach((changeSet) => {
            if (changeSet.status === 'deleted') {
                deleteCount++;
                if (changeSet.index < startIndex) {
                    startIndex = changeSet.index;
                }
            }
        });
        args.forEach((changeSet) => {
            if (changeSet.status === 'added') {
                if (changeSet.index < startIndex) {
                    startIndex = changeSet.index;
                }
                valuesToAdd.push(createItem(changeSet.value));
            }
        });
        target.splice.apply(target, [startIndex, deleteCount].concat(valuesToAdd));
    }, null, 'arrayChange');
}
export function knockoutArrayWrapper(items, ...onChange) {
    const array = ko.observableArray(items);
    const notifySubscribers = array.notifySubscribers;
    array.notifySubscribers = (valueToNotify, event) => {
        if (onChange) {
            for (let i = 0, len = onChange.length; i < len; i++) {
                onChange[i](valueToNotify, event);
            }
        }
        return notifySubscribers.call(array, valueToNotify, event);
    };
    return array;
}
export function deserializeChildArray(model, parent, creator) {
    const result = Object.keys(model || {}).map(propertyName => creator(model[propertyName]));
    return knockoutArrayWrapper(result, (array, event) => {
        if (event === 'beforeChange') {
            return;
        }
        if (event === 'arrayChange') {
            for (let i = 0; i < array.length; i++) {
                parent !== array[i].value.parentModel() && array[i].value.parentModel(parent);
            }
        }
        else {
            for (let i = 0; i < array.length; i++) {
                parent !== array[i].parentModel() && array[i].parentModel(parent);
            }
        }
    });
}
export function getFirstItemByPropertyValue(array, propertyName, propertyValue, _fromIndex) {
    const fromIndex = _fromIndex || 0;
    for (let i = fromIndex; i < array.length; i++) {
        const value = ko.isObservable(array[i][propertyName]) ? array[i][propertyName].peek() : array[i][propertyName];
        if (value === propertyValue) {
            return array[i];
        }
    }
    return null;
}
export function findFirstItemMatchesCondition(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return array[i];
        }
    }
    return null;
}
export const find = findFirstItemMatchesCondition;
export function binaryIndexOf(ar, el, compare) {
    let m = 0;
    let n = ar.length - 1;
    while (m <= n) {
        const k = (n + m) >> 1;
        const cmp = compare(el, ar[k]);
        if (cmp > 0) {
            m = k + 1;
        }
        else if (cmp < 0) {
            n = k - 1;
        }
        else {
            return k;
        }
    }
    return ~m;
}
