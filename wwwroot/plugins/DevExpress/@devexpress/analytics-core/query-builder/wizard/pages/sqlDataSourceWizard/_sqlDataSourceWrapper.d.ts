﻿/**
* DevExpress Analytics (query-builder\wizard\pages\sqlDataSourceWizard\_sqlDataSourceWrapper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SqlDataSource } from '../../../dataSource/sql/sqlDataSource';
import { ISqlQueryViewModel } from '../../../dataSource/utils';
import { RequestWrapper } from '../../../utils/requestwrapper';
export declare class _SqlDataSourceWrapper {
    sqlDataSourceJSON?: string;
    sqlDataSource: SqlDataSource;
    private _queryIndex;
    get sqlQuery(): ISqlQueryViewModel;
    set sqlQuery(val: ISqlQueryViewModel);
    saveCustomQueries(): any[];
    save(): string;
    customQueries: ISqlQueryViewModel[];
    constructor(sqlDataSourceJSON?: string, queryName?: string, requestWrapper?: RequestWrapper);
}
