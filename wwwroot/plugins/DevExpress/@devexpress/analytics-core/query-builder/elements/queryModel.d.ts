﻿/**
* DevExpress Analytics (query-builder\elements\queryModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ElementViewModel } from '../../core/elements/elementViewModel';
import { Margins } from '../../core/elements/margins';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { ModelSerializer } from '../../serializer/serializer';
import { IDBSchemaProvider } from '../dataSource/dbSchemaProvider';
import { QBFilterStringOptions } from '../widgets/filterEditor/_qbFilterStringOptions';
import { ColumnExpression } from './columnExpression';
import { ColumnViewModel } from './columnModel';
import { JoinConditionViewModel } from './joinConditionModel';
import { ParameterViewModel } from './parameterModel';
import { QueryElementBaseViewModel } from './queryElementModel';
import { RelationViewModel } from './relationModel';
import { TableViewModel } from './tableModel';
export declare class QueryViewModelBase extends QueryElementBaseViewModel {
    private static pageMargin;
    protected topOffset: number;
    protected _initializeTable(table: TableViewModel): void;
    private _addColumnsToTable;
    constructor(querySource: any, dbSchemaProvider?: IDBSchemaProvider, parametersMode?: string, beforeSaveCallback?: (data: any) => void, serializer?: ModelSerializer);
    tables: ko.ObservableArray<TableViewModel>;
    columns: ko.ObservableArray<ColumnExpression>;
    isValid: ko.Computed<boolean>;
    editableName: ko.Observable<string> | ko.Computed<string>;
    pageWidth: ko.Observable<number> | ko.Computed<number>;
    pageHeight: ko.Observable<number> | ko.Computed<number>;
    margins: Margins;
    dbSchemaProvider: IDBSchemaProvider;
    allColumnsInTablesSelected: ko.Observable<boolean> | ko.Computed<boolean>;
    relations: ko.ObservableArray<RelationViewModel>;
    sorting: ko.ObservableArray<ColumnExpression>;
    grouping: ko.ObservableArray<ColumnExpression>;
    dispose(): void;
    addChild(control: ElementViewModel): void;
    removeChild(control: ElementViewModel): void;
    validateRelations(): boolean;
    private _validate;
    private _validateTable;
    createChild(info: any, tableViewModel?: TableViewModel, path?: string): ElementViewModel;
    init(): void;
    getTable(name: string): TableViewModel;
    canSave(showMessage?: boolean): boolean;
    save(): any;
    serialize(includeRootTag?: boolean): any;
    onSave: (data: any) => void;
    private _findTableInAncestors;
    private _findHead;
    private _isHead;
    private _findAncestorsRelations;
    private _reverseRelations;
    aggregatedColumnsCount: ko.Observable<number>;
    defaultPageHeight: number;
    defaultPageWidth: number;
    getAllColumns(): ColumnViewModel[];
    cerateJoinCondition(parentColumn: ColumnViewModel, nestedColumn: ColumnViewModel): JoinConditionViewModel;
    tryToCreateRelationsByFK(sourceTable: TableViewModel): void;
}
export declare class QueryViewModel extends QueryViewModelBase {
    private static emptyModel;
    constructor(querySource: any, dbSchemaProvider?: IDBSchemaProvider, parametersMode?: string, beforeSaveCallback?: (data: any) => void, serializer?: ModelSerializer);
    isPropertyDisabled(name: string): boolean;
    filterString: QBFilterStringOptions;
    _filterString: ko.Observable<string> | ko.Computed<string>;
    groupFilterString: QBFilterStringOptions;
    _groupFilterString: ko.Observable<string> | ko.Computed<string>;
    top: ko.Observable<number> | ko.Computed<number>;
    skip: ko.Observable<number> | ko.Computed<number>;
    filter: ko.Observable<string> | ko.Computed<string>;
    parameters: ko.ObservableArray<ParameterViewModel> | ko.Computed<ParameterViewModel[]>;
    getInfo(): ISerializationInfoArray;
    createChild(info: any): ElementViewModel;
    tryToCreateRelationsByFK(sourceTable: TableViewModel): void;
    controlType: string;
}