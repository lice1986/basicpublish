﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\_dbSchemaFederationDataSourceProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { Disposable } from '../../../serializer/disposable';
import { PathRequest } from '../../../widgets/common/pathRequest';
import { DBTable } from '../dbTable';
export class DBSchemaFederationDataSourceProvider extends Disposable {
    constructor(itemsProvider) {
        super();
        this._rootItems = [];
        this.getItems = itemsProvider.getItems;
    }
    getDbSchema() {
        const deferred = $.Deferred();
        if (this._rootItems.length)
            deferred.resolve(this._rootItems);
        else {
            this.getItems(new PathRequest('')).done(rootItems => {
                deferred.resolve(rootItems);
            });
        }
        return deferred.promise();
    }
    getDbTable(tableName, path) {
        const $deferred = $.Deferred();
        this.getItems(new PathRequest(path)).done(items => {
            const columns = items.map(x => {
                return {
                    Name: x.name
                };
            });
            $deferred.resolve(new DBTable({ Name: tableName, columns: columns }));
        });
        return $deferred.promise();
    }
    dispose() {
        super.dispose();
        this.getItems = null;
    }
}
