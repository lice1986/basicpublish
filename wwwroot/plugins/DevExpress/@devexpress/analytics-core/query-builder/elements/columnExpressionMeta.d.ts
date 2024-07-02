﻿/**
* DevExpress Analytics (query-builder\elements\columnExpressionMeta.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare const ColumnType: {
    RecordsCount: string;
    Column: string;
    Expression: string;
    AllColumns: string;
    AllColumnsQuery: string;
};
export declare const columnExpressionSerializationsInfo: ({
    propertyName: string;
    modelName: string;
    defaultVal?: undefined;
} | {
    propertyName: string;
    modelName: string;
    defaultVal: string;
} | {
    propertyName: string;
    modelName: string;
    defaultVal: boolean;
})[];