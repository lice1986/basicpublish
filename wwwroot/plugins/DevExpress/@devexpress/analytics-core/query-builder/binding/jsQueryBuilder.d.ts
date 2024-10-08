﻿/**
* DevExpress Analytics (query-builder\binding\jsQueryBuilder.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IQueryBuilderModel } from '../_queryBuilderModel';
export declare class JSQueryBuilder {
    private _queryBuilderModel;
    get queryBuilderModel(): IQueryBuilderModel;
    set queryBuilderModel(newVal: IQueryBuilderModel);
    constructor(_queryBuilderModel: ko.Observable<IQueryBuilderModel>);
    UpdateLocalization(localization: any): void;
    GetQueryBuilderModel(): IQueryBuilderModel;
    GetJsonQueryModel(): {
        Query: any;
    };
    GetSaveQueryModel(): {
        queryLayout: string;
        connection: string;
    };
    SerializeDataConnection(): string;
    AdjustControlCore(): void;
    Save(): void;
    ShowPreview(): void;
    IsQueryValid(): any;
    OnCallback(result: any): void;
}
