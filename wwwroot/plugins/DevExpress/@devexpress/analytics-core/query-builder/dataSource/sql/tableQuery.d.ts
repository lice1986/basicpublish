﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\tableQuery.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISqlQueryViewModel } from '../utils';
import { SqlDataSource } from './sqlDataSource';
import { IModelSerializer } from '../../../serializer/serializer';
import { DataSourceParameter } from '../dataSourceParameter';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
export declare class TableQuery implements ISqlQueryViewModel {
    parent: SqlDataSource;
    constructor(model: any, parent: SqlDataSource, serializer?: IModelSerializer);
    name: ko.Observable<string> | ko.Computed<string>;
    type: ko.Observable<string> | ko.Computed<string>;
    filterString: ko.Observable<string> | ko.Computed<string>;
    parameters: ko.ObservableArray<DataSourceParameter>;
    tables(): {
        name: ko.Observable<string> | ko.Computed<string>;
        alias: ko.Observable<string>;
    }[];
    getInfo(): ISerializationInfoArray;
    generateName(): string;
}
