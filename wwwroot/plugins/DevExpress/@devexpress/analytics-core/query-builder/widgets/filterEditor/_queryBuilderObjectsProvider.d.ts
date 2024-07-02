﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_queryBuilderObjectsProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { TableViewModel } from '../../elements/tableModel';
import { ColumnViewModel } from '../../elements/columnModel';
import { IItemsProvider, IDataMemberInfo } from '../../../widgets/utils';
import { QueryViewModel } from '../../elements/queryModel';
export declare function isAggregatedExpression(object: {
    aggregate: ko.Observable<string> | ko.Computed<string>;
}): boolean;
export interface IQueryBuilderObjectProviderFilter {
    filterTables(tables: TableViewModel[]): TableViewModel[];
    filterColumns(columns: ColumnViewModel[]): ColumnViewModel[];
    getColumnName(column: ColumnViewModel): string;
    getSpecifics(column: ColumnViewModel): string;
    getDataType(column: ColumnViewModel): string;
}
export declare class QueryBuilderObjectsProvider implements IItemsProvider {
    constructor(query: ko.Observable<QueryViewModel>, objectFilter: IQueryBuilderObjectProviderFilter);
    hasParameter: (name: string) => boolean;
    createParameter: (name: any, dataType: any) => void;
    getItems: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    getColumnInfo: (propertyName: string) => IDataMemberInfo;
    private static _createTableInfo;
    private static _createColumnInfo;
    static whereClauseObjectsFilter: IQueryBuilderObjectProviderFilter;
    static groupByObjectsFilter: IQueryBuilderObjectProviderFilter;
}
