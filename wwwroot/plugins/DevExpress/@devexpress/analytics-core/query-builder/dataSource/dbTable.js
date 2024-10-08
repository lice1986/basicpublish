﻿/**
* DevExpress Analytics (query-builder\dataSource\dbTable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DBColumn } from './dbColumn';
import { DBForeignKey } from './dbForeignKey';
import { deserializeToCollection } from './_dbSchema';
export class DBTable {
    constructor(model) {
        this.name = model['Name'];
        this.isView = model['IsView'] === 'true' || model['IsView'] === true;
        this.columns = deserializeToCollection(model['columns'], (columnModel) => new DBColumn(columnModel));
        this.foreignKeys = deserializeToCollection(model['foreignKeys'], (columnModel) => new DBForeignKey(columnModel));
    }
}
