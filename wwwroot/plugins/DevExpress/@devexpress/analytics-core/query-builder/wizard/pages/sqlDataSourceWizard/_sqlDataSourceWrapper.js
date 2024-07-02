﻿/**
* DevExpress Analytics (query-builder\wizard\pages\sqlDataSourceWizard\_sqlDataSourceWrapper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SqlDataSource } from '../../../dataSource/sql/sqlDataSource';
import { ModelSerializer } from '../../../../serializer/serializer';
export class _SqlDataSourceWrapper {
    constructor(sqlDataSourceJSON, queryName, requestWrapper) {
        this.sqlDataSourceJSON = sqlDataSourceJSON;
        this.customQueries = [];
        this.sqlDataSource = new SqlDataSource(sqlDataSourceJSON ? JSON.parse(sqlDataSourceJSON) : {}, undefined, requestWrapper);
        if (queryName) {
            this.sqlDataSource.queries().some((value, index) => {
                if (value.name() === queryName) {
                    this._queryIndex = index;
                    return true;
                }
                return false;
            });
        }
        else {
            this._queryIndex = this.sqlDataSource.queries().length;
        }
    }
    get sqlQuery() {
        return this.sqlDataSource.queries()[this._queryIndex];
    }
    set sqlQuery(val) {
        if (val)
            val.parent = this.sqlDataSource;
        this.sqlDataSource.queries()[this._queryIndex] = val;
    }
    saveCustomQueries() {
        const serializer = new ModelSerializer();
        return this.customQueries.length > 0 && this.customQueries.map(x => JSON.stringify(serializer.serialize(x)));
    }
    save() {
        return JSON.stringify(new ModelSerializer().serialize(this.sqlDataSource));
    }
}