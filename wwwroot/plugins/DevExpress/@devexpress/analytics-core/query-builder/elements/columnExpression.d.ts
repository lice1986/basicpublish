﻿/**
* DevExpress Analytics (query-builder\elements\columnExpression.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryViewModelBase } from './queryModel';
import { IModelSerializer } from '../../serializer/serializer';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export declare class ColumnExpression {
    private _criteria;
    private _dependedTables;
    private __table;
    private __column;
    private __expression;
    constructor(model: any, query: QueryViewModelBase, serializer?: IModelSerializer);
    table: ko.Observable<string> | ko.Computed<string>;
    column: ko.Observable<string> | ko.Computed<string>;
    expression: ko.Observable<string> | ko.Computed<string>;
    aggregate: ko.Observable<string> | ko.Computed<string>;
    alias: ko.Observable<string> | ko.Computed<string>;
    descending: ko.Observable<boolean> | ko.Computed<boolean>;
    itemType: ko.Observable<string> | ko.Computed<string>;
    isRemoved: ko.Observable<boolean>;
    actualName(): string;
    initialize(model: any, query: QueryViewModelBase, serializer?: IModelSerializer): void;
    toTable(): void;
    getInfo(): ISerializationInfoArray;
    isDepended(tableActualName: string): boolean;
}
