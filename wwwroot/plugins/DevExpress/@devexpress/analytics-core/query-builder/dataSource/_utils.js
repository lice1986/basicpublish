﻿/**
* DevExpress Analytics (query-builder\dataSource\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition } from '../../core/utils/_arrayutils';
import { getUniqueNameForNamedObjectsArray } from '../../core/internal/_getNameHelpers';
export function generateQueryUniqueName(queries, query, nameProperty = 'name') {
    const name = (query[nameProperty]() || query.generateName()).replace('.', '_');
    return findFirstItemMatchesCondition(queries, item => item[nameProperty]() === name) ?
        getUniqueNameForNamedObjectsArray(queries, name + '_') : name;
}
