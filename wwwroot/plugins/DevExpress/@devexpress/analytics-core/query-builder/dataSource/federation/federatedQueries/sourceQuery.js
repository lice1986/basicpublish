﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\sourceQuery.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FederationQueryType } from '../../utils';
import { ModelSerializer } from '../../../../serializer/serializer';
import { alias, name } from '../../../metadata';
import { Disposable } from '../../../../serializer/disposable';
export const sourceQuerySerializationsInfo = [
    { propertyName: 'queryType', modelName: '@QueryType' },
    name,
    alias,
    { propertyName: 'sourceName', modelName: '@SourceName' },
];
export class SourceQuery extends Disposable {
    constructor(model, serializer, sourceName, _sourcePath) {
        super();
        this._sourcePath = _sourcePath;
        model['@SourceName'] = model['@SourceName'] || sourceName;
        (serializer || new ModelSerializer()).deserialize(this, model);
        this._disposables.push(this.queryType = ko.pureComputed(() => { return FederationQueryType[FederationQueryType.SourceNode]; }));
    }
    getInfo() {
        return sourceQuerySerializationsInfo;
    }
    getPath() {
        if (this._sourcePath)
            return this._sourcePath;
        if (this.name()) {
            if (this.name() === this.sourceName())
                return this.name();
            const dataSourceName = this.sourceName().slice(0, this.sourceName().indexOf(this.name()) - 1);
            return dataSourceName + '.' + this.name();
        }
    }
}
