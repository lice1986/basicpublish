﻿/**
* DevExpress Analytics (undo-engine\_propertiesVisitor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export function propertiesVisitor(target, visitor, visited = [], skip = ['surface']) {
    if (target && target !== undefined) {
        const properties = [];
        Object.keys(target).forEach((propertyName) => {
            if (propertyName.indexOf('_') !== 0 && skip.indexOf(propertyName) === -1) {
                let realPropertyName = propertyName;
                if (ko.isComputed(target[propertyName]) && ko.isWritableObservable(target['_' + propertyName])) {
                    realPropertyName = '_' + realPropertyName;
                }
                if (visited.indexOf(target[realPropertyName]) === -1 && !ko.isComputed(target[realPropertyName])) {
                    properties.push(target[realPropertyName]);
                }
            }
        });
        visitor(properties);
        visited.push.apply(visited, properties);
        properties.forEach((property) => {
            property = ko.unwrap(property);
            if (typeof property === 'object') {
                propertiesVisitor(property, visitor, visited, skip);
            }
        });
    }
}