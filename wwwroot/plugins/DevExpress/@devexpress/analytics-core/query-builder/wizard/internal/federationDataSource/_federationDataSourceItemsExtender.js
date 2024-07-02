﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationDataSourceItemsExtender.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class FederationDataSourceItemsExtender {
    constructor(_rootItems) {
        this._rootItems = _rootItems;
    }
    afterItemsFilled(request, items) {
        items.forEach(x => {
            if (x.isListType === undefined) {
                x.isListType = x.specifics === 'List';
            }
        });
    }
    beforeItemsFilled(request, items) {
        if (!request.fullPath) {
            items.push(...this._rootItems().map(item => {
                return {
                    name: item.id || item.ref,
                    displayName: item.name,
                    isList: true,
                    specifics: item.specifics || 'ListSource',
                    isSupportQueries: item.isSupportQueries,
                    isListType: item.isListType
                };
            }));
            return true;
        }
        return false;
    }
}
