﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\sqlDataSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SqlDataConnection } from './sqlDataConnection';
import { ResultSet } from '../resultSet';
import { deserializeArray } from '../../../serializer/utils';
import { Disposable } from '../../../serializer/disposable';
import { SqlQueryType } from '../utils';
import { CustomSqlQuery } from './customSqlQuery';
import { TableQuery } from './tableQuery';
import { StoredProcQuery } from './storedProcQuery';
import { ModelSerializer } from '../../../serializer/serializer';
import { RequestWrapper } from '../../utils/requestwrapper';
import { MasterDetailRelation } from './masterDetailRelation';
import { ConnectionOptions } from './connectionOptions';
import { DBSchemaProvider } from '../dbSchemaProvider';
import { extend } from '../../../serializer/_utils';
const sqlDataSourceSerializationInfo = [
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'connection', modelName: 'Connection', from: SqlDataConnection.from, toJsonObject: SqlDataConnection.toJson },
    { propertyName: 'queries', modelName: 'Queries', array: true },
    { propertyName: 'relations', modelName: 'Relations', array: true },
    { propertyName: 'resultSet', modelName: 'ResultSchema', from: ResultSet.from, toJsonObject: ResultSet.toJson },
    { propertyName: 'itemType', modelName: '@ItemType' }
];
export class SqlDataSource extends Disposable {
    constructor(model, serializer, requestWrapper = new RequestWrapper()) {
        super();
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, extend(model, { '@ItemType': 'SqlDataSource' }));
        const deprecateName = this['_model']['Name'];
        if (deprecateName) {
            if (!this.name()) {
                this.name(deprecateName);
            }
            delete this['_model']['Name'];
        }
        this.queries = deserializeArray(model['Queries'], (item) => this.createQuery(item, serializer));
        this.relations = deserializeArray(model['Relations'], (item) => {
            return new MasterDetailRelation(item, serializer);
        });
        if (this.connection && model['ConnectionOptions'])
            this.connection.options = new ConnectionOptions(model['ConnectionOptions'], serializer);
        this.dbSchemaProvider = new DBSchemaProvider(this.connection, requestWrapper);
        this._disposables.push(this.connection.name.subscribe(() => {
            this.queries([]);
            this.relations([]);
            this.resultSet = null;
        }));
    }
    getInfo() {
        return sqlDataSourceSerializationInfo;
    }
    createQuery(item, serializer) {
        if (item['@Type'] === SqlQueryType.customSqlQuery) {
            return new CustomSqlQuery(item, this, serializer);
        }
        else if (item['@Type'] === SqlQueryType.tableQuery) {
            return new TableQuery(item, this, serializer);
        }
        else if (item['@Type'] === SqlQueryType.storedProcQuery) {
            return new StoredProcQuery(item, this, serializer);
        }
        else {
            throw new Error('Unknown sql query type.');
        }
    }
}
