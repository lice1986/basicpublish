﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueryExpression.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../../serializer/serializer';
import { extend } from '../../../serializer/_utils';
import { alias, name } from '../../metadata';
export const expressionSerializationInfo = [
    { propertyName: 'table', modelName: '@NodeAlias' },
    name,
    alias,
    { propertyName: 'expressionType', modelName: '@ExpressionType' },
    { propertyName: 'columnExpression', modelName: '@ColumnExpression' }
];
export var FederatedQueryExpressionType;
(function (FederatedQueryExpressionType) {
    FederatedQueryExpressionType[FederatedQueryExpressionType["SelectColumnExpression"] = 0] = "SelectColumnExpression";
    FederatedQueryExpressionType[FederatedQueryExpressionType["SelectExpression"] = 1] = "SelectExpression";
    FederatedQueryExpressionType[FederatedQueryExpressionType["SelectAllColumnsExpression"] = 2] = "SelectAllColumnsExpression";
    FederatedQueryExpressionType[FederatedQueryExpressionType["SelectAllNodeColumnsExpression"] = 3] = "SelectAllNodeColumnsExpression";
    FederatedQueryExpressionType[FederatedQueryExpressionType["SelectRowCountExpression"] = 4] = "SelectRowCountExpression";
})(FederatedQueryExpressionType || (FederatedQueryExpressionType = {}));
export class FederatedQueryExpression {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, extend(model, { '@ItemType': 'Expression' }));
    }
    getInfo() {
        return expressionSerializationInfo;
    }
}
