﻿/**
* DevExpress Analytics (query-builder\dataSource\resultSet.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { IModelSerializer } from '../../serializer/serializer';
import { ResultTable } from './resultTable';
export declare class ResultSet {
    getInfo(): ISerializationInfoArray;
    static from(model: any, serializer?: IModelSerializer): ResultSet;
    static toJson(value: any, serializer: any, refs: any): {
        DataSet: any;
    };
    constructor(model: any, serializer?: IModelSerializer);
    tables: ko.ObservableArray<ResultTable>;
}
