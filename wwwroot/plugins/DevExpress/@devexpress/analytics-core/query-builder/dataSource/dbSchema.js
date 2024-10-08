﻿/**
* DevExpress Analytics (query-builder\dataSource\dbSchema.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DBTable } from './dbTable';
import { DBStoredProcedure } from './dbStoredProcedure';
import { deserializeToCollection } from './_dbSchema';
export class DBSchema {
    constructor(model) {
        const tables = deserializeToCollection(model['Tables'], (tableModel) => new DBTable(tableModel));
        tables.sort((a, b) => { return a.name.localeCompare(b.name); });
        const views = deserializeToCollection(model['Views'], (tableModel) => new DBTable(tableModel));
        views.sort((a, b) => { return a.name.localeCompare(b.name); });
        this.tables = tables.concat(views);
        this.procedures = deserializeToCollection(model['StoredProcedures'], (procModel) => new DBStoredProcedure(procModel));
    }
    assignTablesAndViews(tables, views) {
        this.tables = tables.concat(views);
    }
}
