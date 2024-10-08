﻿/**
* DevExpress Analytics (query-builder\dataSource\dbStoredProcedure.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DBColumnType } from './dbColumn';
export declare class DBStoredProcedure {
    name: string;
    arguments: DBStoredProcedureArgument[];
    constructor(model: any);
}
export declare enum DBStoredProcedureArgumentDirection {
    In = 0,
    Out = 1,
    InOut = 2
}
export declare class DBStoredProcedureArgument {
    name: string;
    type: DBColumnType;
    direction: DBStoredProcedureArgumentDirection;
    constructor(model: any);
}
