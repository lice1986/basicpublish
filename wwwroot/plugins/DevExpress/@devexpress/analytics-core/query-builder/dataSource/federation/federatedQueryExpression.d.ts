﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueryExpression.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer } from '../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
export declare const expressionSerializationInfo: ISerializationInfoArray;
export declare enum FederatedQueryExpressionType {
    SelectColumnExpression = 0,
    SelectExpression = 1,
    SelectAllColumnsExpression = 2,
    SelectAllNodeColumnsExpression = 3,
    SelectRowCountExpression = 4
}
export declare class FederatedQueryExpression {
    constructor(model: object, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    name: ko.Observable<string> | ko.Computed<string>;
    alias: ko.Observable<string> | ko.Computed<string>;
    table: ko.Observable<string> | ko.Computed<string>;
    propertyName: ko.Observable<string> | ko.Computed<string>;
}
