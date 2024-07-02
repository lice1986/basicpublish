﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\storedProcQuery.js)
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
import { IsDataAccessExpression } from '../../../core/internal/_editorTypeMapper';
import { storedProcParameterSerializationsInfo } from '../dataSourceParameterMeta';
import { storedProcQuerySerializationsInfo } from './storedProcQueryMeta';
import { extend } from '../../../serializer/_utils';
export class StoredProcQuery {
    constructor(model, parent, serializer) {
        this.parent = parent;
        (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'Query' }));
        this.type = ko.pureComputed(() => SqlQueryType.storedProcQuery);
        this.parameters = deserializeArray(model['Parameters'], item => {
            let parameterValueType = item['@Type'];
            if (IsDataAccessExpression(parameterValueType))
                parameterValueType = item['@ResultType'] || parameterValueType;
            return new DataSourceParameter(item, serializer, storedProcParameterSerializationsInfo(parameterValueType));
        });
    }
    getInfo() {
        return storedProcQuerySerializationsInfo;
    }
    generateName() {
        return this.procName() || 'Query';
    }
}