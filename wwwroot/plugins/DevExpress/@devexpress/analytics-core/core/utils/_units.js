﻿/**
* DevExpress Analytics (core\utils\_units.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { unitsToPixel, pixelToUnits } from './_units.unitsToPixel';
export function createUnitProperty(model, target, propertyName, property, measureUnit, zoom, afterCreation) {
    let lastVal = 0;
    target[propertyName] = ko.pureComputed({
        read: () => {
            const val = property(model)(), newVal = unitsToPixel(val, measureUnit.peek(), zoom());
            if (Math.abs(newVal - lastVal) > 0.2) {
                lastVal = newVal;
                return lastVal;
            }
            return lastVal;
        },
        write: (val) => {
            if (Math.abs(val - lastVal) <= 0.2)
                return;
            lastVal = val;
            const result = pixelToUnits(val, measureUnit.peek(), zoom());
            property(model)(result);
        }
    });
    afterCreation(target[propertyName]);
}
export function createUnitProperties(model, target, properties, measureUnit, zoom, afterCreation) {
    if (!properties)
        return;
    Object.keys(properties).forEach(propertyName => {
        createUnitProperty(model, target, propertyName, properties[propertyName], measureUnit, zoom, afterCreation);
    });
}
