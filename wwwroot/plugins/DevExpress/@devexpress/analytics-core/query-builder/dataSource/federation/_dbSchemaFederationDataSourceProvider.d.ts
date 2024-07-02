﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\_dbSchemaFederationDataSourceProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import { Disposable } from '../../../serializer/disposable';
import { IPathRequest } from '../../../widgets/common/pathRequest';
import { IDataMemberInfo, IItemsProvider } from '../../../widgets/utils';
import { IDBSchemaProvider } from '../dbSchemaProvider';
import { DBTable } from '../dbTable';
export declare class DBSchemaFederationDataSourceProvider extends Disposable implements IDBSchemaProvider {
    private _rootItems;
    getDbSchema(): JQuery.Promise<IDataMemberInfo[], any, any>;
    getItems: (path: IPathRequest) => JQueryPromise<IDataMemberInfo[]>;
    getDbTable(tableName: string, path: string): JQueryPromise<DBTable>;
    dispose(): void;
    constructor(itemsProvider: IItemsProvider);
}
