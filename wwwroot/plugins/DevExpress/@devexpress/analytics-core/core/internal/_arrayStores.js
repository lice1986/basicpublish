﻿/**
* DevExpress Analytics (core\internal\_arrayStores.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import * as $ from 'jquery';
import { koUtils } from '../utils/_koUtils';
export class CustomSortedArrayStore extends CustomStore {
    static _sortItems(items, sortPropertyName) {
        return items.sort((a, b) => {
            let propA = koUtils.unwrap(a[sortPropertyName]), propB = koUtils.unwrap(b[sortPropertyName]);
            if (propA && propB) {
                const diff = propA - propB;
                if (!isNaN(diff))
                    return diff;
                propA = propA.toLowerCase ? propA.toLowerCase() : propA;
                propB = propB.toLowerCase ? propB.toLowerCase() : propB;
                return (propA < propB) ? -1 : (propA > propB) ? 1 : 0;
            }
        });
    }
    static _createOptions(items, sortPropertyName) {
        items = this._sortItems(items, sortPropertyName);
        return {
            load: (options) => {
                let result = [].concat(items);
                if (options.take)
                    result = result.splice(options.skip, options.take);
                return $.Deferred().resolve(result).promise();
            },
            byKey: (key) => {
                if (items.some(x => x === key))
                    return key;
            }
        };
    }
    constructor(items, sortPropertyName = 'name') {
        super(CustomSortedArrayStore._createOptions(items, sortPropertyName));
    }
}
export class SortedArrayStore extends ArrayStore {
    constructor(options, sortPropertyName = 'name') {
        if (options instanceof Array) {
            CustomSortedArrayStore._sortItems(options, sortPropertyName);
        }
        super(options);
    }
}
