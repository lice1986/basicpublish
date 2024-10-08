﻿/**
* DevExpress Analytics (query-builder\dataSource\_dbSchema.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function deserializeToCollection(model, createItem, _collection) {
    const collection = _collection || [];
    if (model) {
        model.forEach((value) => {
            collection.push(createItem(value));
        });
    }
    return collection;
}
