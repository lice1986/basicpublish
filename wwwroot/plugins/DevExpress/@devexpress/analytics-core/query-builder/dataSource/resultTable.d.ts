﻿/**
* DevExpress Analytics (query-builder\dataSource\resultTable.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { IModelSerializer } from '../../serializer/serializer';
export declare class ResultTable {
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    tableName: ko.Observable<string> | ko.Computed<string>;
    columns: ko.ObservableArray<{
        name: ko.Observable<string> | ko.Computed<string>;
        propertyType: ko.Observable<string>;
    }>;
}
