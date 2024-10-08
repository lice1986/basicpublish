﻿/**
* DevExpress Analytics (query-builder\dataSource\dbSchema.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DBTable } from './dbTable';
import { DBStoredProcedure } from './dbStoredProcedure';
export declare class DBSchema {
    tables: DBTable[];
    procedures: DBStoredProcedure[];
    constructor(model: any);
    assignTablesAndViews(tables: DBTable[], views: DBTable[]): void;
}
