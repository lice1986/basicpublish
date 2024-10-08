﻿/**
* DevExpress Analytics (query-builder\elements\relationModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryElementBaseViewModel } from './queryElementModel';
import { QueryViewModelBase } from './queryModel';
import { ModelSerializer } from '../../serializer/serializer';
import { JoinConditionViewModel } from './joinConditionModel';
import { TableViewModel } from './tableModel';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { IElementViewModel, ElementViewModel } from '../../core/elements/elementViewModel';
export declare class RelationViewModel extends QueryElementBaseViewModel {
    private _getConditionNumber;
    constructor(model: any, query: QueryViewModelBase, serializer?: ModelSerializer);
    parentTableName: ko.Observable<string> | ko.Computed<string>;
    nestedTableName: ko.Observable<string> | ko.Computed<string>;
    parentTable: ko.Observable<TableViewModel>;
    nestedTable: ko.Observable<TableViewModel>;
    joinType: ko.Observable<string> | ko.Computed<string>;
    conditions: ko.ObservableArray<JoinConditionViewModel>;
    getInfo(): ISerializationInfoArray;
    addChild(control: IElementViewModel): void;
    removeChild(control: ElementViewModel): void;
}
