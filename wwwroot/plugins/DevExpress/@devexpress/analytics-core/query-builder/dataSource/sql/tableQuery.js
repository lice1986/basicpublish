﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\tableQuery.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SqlQueryType } from '../utils';
import { ModelSerializer } from '../../../serializer/serializer';
import { deserializeArray } from '../../../serializer/utils';
import { DataSourceParameter } from '../dataSourceParameter';
import { tableQuerySerializationsInfo } from './tableQueryMeta';
import { extend } from '../../../serializer/_utils';
export class TableQuery {
    constructor(model, parent, serializer) {
        this.parent = parent;
        (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'Query' }));
        this.type = ko.pureComputed(() => { return SqlQueryType.tableQuery; });
        this.parameters = deserializeArray(model['Parameters'], item => new DataSourceParameter(item, serializer));
    }
    tables() {
        return this['_tablesObject']['tables']();
    }
    getInfo() {
        return tableQuerySerializationsInfo;
    }
    generateName() {
        return this.tables().length > 0 ? (this.tables()[0].alias() || this.tables()[0].name()) : 'SelectQuery';
    }
}
