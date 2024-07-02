﻿/**
* DevExpress Analytics (core\utils\_visitors.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export function objectsVisitor(target, visitor, visited = [], skip = ['surface', 'reportSource']) {
    if (visited.indexOf(target) !== -1) {
        return;
    }
    if (target && target !== undefined) {
        const properties = [];
        Object.keys(target).forEach(propertyName => {
            if (visited.indexOf(target[propertyName]) === -1 && propertyName.indexOf('_') !== 0 && skip.indexOf(propertyName) === -1) {
                properties.push(target[propertyName]);
            }
        });
        visitor(target);
        visited.push(target);
        for (let i = 0; i < properties.length; i++) {
            properties[i] = ko.unwrap(properties[i]);
            if (typeof properties[i] === 'object') {
                objectsVisitor(properties[i], visitor, visited, skip);
            }
        }
    }
}
export function collectionsVisitor(target, visitor, collectionsToProcess = ['controls', 'bands', 'subBands', 'crossBandControls', 'rows', 'cells', 'fields'], visited = []) {
    if (target && target !== undefined) {
        visited.push(target);
        for (let i = 0, len = collectionsToProcess.length; i < len; i++) {
            if (target[collectionsToProcess[i]]) {
                visitor(target[collectionsToProcess[i]], target);
                (target[collectionsToProcess[i]]() || []).forEach((item) => collectionsVisitor(item, visitor, collectionsToProcess, visited));
            }
        }
    }
}