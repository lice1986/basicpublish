﻿/**
* DevExpress Analytics (query-builder\utils\_columnExpressionCollectionHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ColumnExpression } from '../elements/columnExpression';
import { QueryViewModelBase } from '../elements/queryModel';
export declare class ColumnExpressionCollectionHelper {
    private static columnCache;
    static addToColumnCache(collection: ColumnExpression[]): void;
    static clearCache(): void;
    static find(collection: ko.ObservableArray<ColumnExpression>, tableName: string, columnName: string): ColumnExpression;
    static findByName(collection: ko.ObservableArray<ColumnExpression>, actualName: string): ColumnExpression;
    static removeDependend(collection: ko.ObservableArray<ColumnExpression>, tableName: string): void;
    static toExpresson(column: ColumnExpression, columns: ko.ObservableArray<ColumnExpression>, value: any): void;
    static setUniqueAlias(collection: any, alias: any): string;
    static createNew(query: QueryViewModelBase, collection: ko.ObservableArray<ColumnExpression>, tableName: string, columnName: string): ColumnExpression;
    static addNew(query: QueryViewModelBase, collection: ko.ObservableArray<ColumnExpression>, table: string, column: string, lazy?: boolean): ColumnExpression;
    static remove(collection: ko.ObservableArray<ColumnExpression>, tableName: string, columnName: string, lazy?: boolean): void;
    static columnTypeToFederated(type: any): string;
    static federatedTypeToColumn(type: any): string;
}