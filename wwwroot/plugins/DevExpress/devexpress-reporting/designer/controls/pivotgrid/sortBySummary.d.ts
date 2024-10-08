﻿/**
* DevExpress HTML/JS Reporting (designer\controls\pivotgrid\sortBySummary.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializableModel, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { PivotGridFieldViewModel } from './pivotgridfield';
export declare class SortBySummaryInfoCondition implements ISerializableModel {
    private _fieldsProvider;
    constructor(model: any, fieldsProvider: {
        fieldsAvailableForCondition: () => string[];
    }, serializer?: IModelSerializer);
    fieldComponentName: ko.Observable<string> | ko.Computed<string>;
    getInfo(): ISerializationInfoArray;
    static createNew(parent: SortBySummaryInfo, serializer?: IModelSerializer): SortBySummaryInfoCondition;
}
export declare class SortBySummaryInfo {
    private _field;
    private _pivotGridFields;
    constructor(model: any, field: PivotGridFieldViewModel, serializer?: IModelSerializer);
    conditions: ko.ObservableArray<SortBySummaryInfoCondition>;
    getInfo(): ISerializationInfoArray;
    fieldsAvailableForCondition(): string[];
    static from(model: any, serializer?: IModelSerializer): any;
    static toJSON(viewModel: SortBySummaryInfo, serializer?: IModelSerializer, refs?: any): any;
}
