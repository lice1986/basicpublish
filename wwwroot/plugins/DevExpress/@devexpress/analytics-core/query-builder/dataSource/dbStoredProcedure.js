﻿/**
* DevExpress Analytics (query-builder\dataSource\dbStoredProcedure.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { deserializeToCollection } from './_dbSchema';
export class DBStoredProcedure {
    constructor(model) {
        this.name = model['Name'];
        this.arguments = deserializeToCollection(model['arguments'], (argModel) => new DBStoredProcedureArgument(argModel));
    }
}
export var DBStoredProcedureArgumentDirection;
(function (DBStoredProcedureArgumentDirection) {
    DBStoredProcedureArgumentDirection[DBStoredProcedureArgumentDirection["In"] = 0] = "In";
    DBStoredProcedureArgumentDirection[DBStoredProcedureArgumentDirection["Out"] = 1] = "Out";
    DBStoredProcedureArgumentDirection[DBStoredProcedureArgumentDirection["InOut"] = 2] = "InOut";
})(DBStoredProcedureArgumentDirection || (DBStoredProcedureArgumentDirection = {}));
export class DBStoredProcedureArgument {
    constructor(model) {
        this.name = model['Name'];
        this.type = model['Type'];
        this.direction = model['Direction'];
    }
}
