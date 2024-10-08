﻿/**
* DevExpress Analytics (query-builder\dataSource\dbTable.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DBColumn } from './dbColumn';
import { DBForeignKey } from './dbForeignKey';
export declare class DBTable {
    name: string;
    columns: DBColumn[];
    isView: boolean;
    foreignKeys: DBForeignKey[];
    constructor(model: any);
}
