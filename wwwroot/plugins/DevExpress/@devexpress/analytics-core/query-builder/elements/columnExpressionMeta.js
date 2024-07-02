﻿/**
* DevExpress Analytics (query-builder\elements\columnExpressionMeta.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AggregationType } from './columnModelMeta';
export const ColumnType = {
    RecordsCount: 'RecordsCount',
    Column: 'Column',
    Expression: 'Expression',
    AllColumns: 'AllColumns',
    AllColumnsQuery: 'AllColumnsQuery'
};
export const columnExpressionSerializationsInfo = [
    { propertyName: 'expression', modelName: '#text' },
    { propertyName: 'table', modelName: '@Table' },
    { propertyName: 'column', modelName: '@Name' },
    { propertyName: 'aggregate', modelName: '@Aggregate', defaultVal: AggregationType.None },
    { propertyName: 'alias', modelName: '@Alias' },
    { propertyName: 'descending', modelName: '@Descending', defaultVal: false },
    { propertyName: 'itemType', modelName: '@ItemType' }
];