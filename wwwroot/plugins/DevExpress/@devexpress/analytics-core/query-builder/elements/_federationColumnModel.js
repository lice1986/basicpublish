﻿/**
* DevExpress Analytics (query-builder\elements\_federationColumnModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { expressionSerializationInfo } from '../dataSource/federation/federatedQueryExpression';
import { name } from '../metadata';
import { AllColumnsViewModel } from './allColumnsModel';
import { ColumnViewModel } from './columnModel';
export class FederationColumnViewModel extends ColumnViewModel {
    constructor(model, dbColumn, parent, serializer) {
        super(model, dbColumn, parent, serializer);
    }
    getInfo() {
        return expressionSerializationInfo;
    }
}
export class FederationAllColumnsViewModel extends AllColumnsViewModel {
    constructor(parent, serializer) {
        super(parent, serializer);
    }
    getInfo() {
        return [name];
    }
}