﻿/**
* DevExpress Analytics (core\internal\_arrayStores.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
export declare class CustomSortedArrayStore extends CustomStore {
    static _sortItems(items: any[], sortPropertyName: string): any[];
    static _createOptions(items: any, sortPropertyName: any): {
        load: (options: any) => JQuery.Promise<any, any, any>;
        byKey: (key: any) => any;
    };
    constructor(items: any[], sortPropertyName?: string);
}
export declare class SortedArrayStore extends ArrayStore {
    constructor(options: any, sortPropertyName?: string);
}
