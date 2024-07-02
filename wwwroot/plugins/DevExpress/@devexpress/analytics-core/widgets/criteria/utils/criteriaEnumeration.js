﻿/**
* DevExpress Analytics (widgets\criteria\utils\criteriaEnumeration.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AggregateOperand } from '../operators/aggregate';
export function criteriaForEach(operator, callback, path = '') {
    callback(operator, path);
    if (operator instanceof AggregateOperand) {
        operator.leftPart && criteriaForEach(operator.leftPart, callback, path);
        if (operator.leftPart && operator.leftPart['propertyName']) {
            path = path ? [path, operator.leftPart['propertyName']].join('.') : operator.leftPart['propertyName'];
        }
    }
    operator.children().forEach(item => criteriaForEach(item, callback, path));
}
