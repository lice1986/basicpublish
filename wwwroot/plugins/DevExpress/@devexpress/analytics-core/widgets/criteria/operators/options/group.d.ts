﻿/**
* DevExpress Analytics (widgets\criteria\operators\options\group.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from '../criteriaOperator';
export declare enum GroupOperatorType {
    And = 0,
    Or = 1
}
export interface IGroupOperatorOptions {
    operation: GroupOperatorType;
    operands: Array<CriteriaOperator>;
}
