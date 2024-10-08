﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\customSqlQuery.js)
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
import { customQuerySerializationsInfo } from './customSqlQueryMeta';
import { extend } from '../../../serializer/_utils';
export class CustomSqlQuery {
    constructor(model, parent, serializer) {
        this.parent = parent;
        (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'Query' }));
        this.type = ko.pureComputed(() => SqlQueryType.customSqlQuery);
        this.parameters = deserializeArray(model['Parameters'], (item) => {
            return new DataSourceParameter(item, serializer);
        });
    }
    getInfo() {
        return customQuerySerializationsInfo;
    }
    generateName() {
        return 'CustomSqlQuery';
    }
}
