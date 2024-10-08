﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationTablesExpressionFieldListProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { findFirstItemMatchesCondition } from '../../../../core/utils/_arrayutils';
import { PathRequest } from '../../../../widgets/common/pathRequest';
export class FederationTablesExpressionFieldListProvider {
    constructor(provider, tables) {
        this.provider = provider;
        this.tables = tables;
    }
    getItems(pathRequest) {
        const result = $.Deferred();
        if (pathRequest.path === '') {
            result.resolve(this.tables().map(table => {
                return { name: table.actualName(), displayName: table.actualName(), isList: true, specifics: 'List', dragData: { noDragable: false } };
            }));
        }
        else {
            const paths = pathRequest.fullPath.split('.');
            paths.shift();
            const table = findFirstItemMatchesCondition(this.tables(), table => table.actualName() === paths.join('.'));
            if (table) {
                this.provider.getItems(new PathRequest(table.path)).done(items => result.resolve(items));
            }
        }
        return result.promise();
    }
}
