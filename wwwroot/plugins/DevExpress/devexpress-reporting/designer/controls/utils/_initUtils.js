﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_initUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { roundingXDecimals } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
export function getUnitProperties(object) {
    const properties = object && object['constructor'] && object['constructor'].unitProperties;
    if (properties) {
        return {
            reCalculateObject: (coef) => {
                for (let i = 0; i < properties.length; i++) {
                    const propertyName = properties[i];
                    const property = object['_' + propertyName] || object[propertyName];
                    const innerProperties = getUnitProperties(property);
                    if (innerProperties) {
                        innerProperties.reCalculateObject(coef);
                    }
                    else {
                        !!ko.unwrap(property) && property(roundingXDecimals(ko.unwrap(property) * coef));
                    }
                }
            },
            calcProperty: (val, coef) => val && roundingXDecimals(val * coef),
            properties
        };
    }
}