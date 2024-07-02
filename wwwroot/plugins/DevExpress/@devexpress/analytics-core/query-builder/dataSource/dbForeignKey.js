﻿/**
* DevExpress Analytics (query-builder\dataSource\dbForeignKey.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class DBForeignKey {
    constructor(model) {
        this.name = model['Name'];
        this.primaryKeyTable = model['PrimaryKeyTable'];
        this.columns = model['Columns'];
        this.primaryKeyColumns = model['PrimaryKeyTableKeyColumns'];
    }
}