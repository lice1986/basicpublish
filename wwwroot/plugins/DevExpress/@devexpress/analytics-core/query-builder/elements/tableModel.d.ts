﻿/**
* DevExpress Analytics (query-builder\elements\tableModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryElementBaseViewModel } from './queryElementModel';
import { ColumnViewModel } from './columnModel';
import { QueryViewModelBase } from './queryModel';
import { ModelSerializer } from '../../serializer/serializer';
import { AllColumnsViewModel } from './allColumnsModel';
import { Size } from '../../core/elements/size';
import { Point, IPoint } from '../../core/elements/point';
import { DBColumn } from '../dataSource/dbColumn';
import { DBTable } from '../dataSource/dbTable';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export declare class TableViewModel extends QueryElementBaseViewModel {
    protected serializer?: ModelSerializer;
    static COLUMNS_OFFSET: number;
    static COLUMN_HEIGHT: number;
    static COLUMN_MARGIN: number;
    static TABLE_MIN_WIDTH: number;
    static TABLE_DEFAULT_HEIGHT: number;
    private _columnsConnectionPointLeftX;
    private _columnsConnectionPointRightX;
    protected _columns: ko.ObservableArray<ColumnViewModel>;
    protected _initialized: ko.Observable<boolean>;
    protected tableOffset: ko.Observable<number>;
    constructor(model: any, parent: QueryViewModelBase, serializer?: ModelSerializer);
    size: Size;
    location: Point;
    name: ko.Observable<string> | ko.Computed<string>;
    alias: ko.Observable<string> | ko.Computed<string>;
    actualName: ko.Observable<string> | ko.Computed<string>;
    isReady: ko.Observable<boolean>;
    columns(): ColumnViewModel[];
    asterisk: AllColumnsViewModel;
    allColumnsSelected: ko.Computed<boolean>;
    toggleSelectedColumns(): void;
    isInitialized: ko.PureComputed<boolean>;
    getColumnConnectionPoints(column: ColumnViewModel): {
        left: IPoint;
        right: IPoint;
    };
    getInfo(): ISerializationInfoArray;
    getInvalidColumns(): ColumnViewModel[];
    getColumn(name: string): ColumnViewModel;
    _initColumns(columns: DBColumn[], update?: boolean): void;
    createChildColumn(item: DBColumn): ColumnViewModel;
    createColumns(dbTable: DBTable): void;
    itemType: string;
}
