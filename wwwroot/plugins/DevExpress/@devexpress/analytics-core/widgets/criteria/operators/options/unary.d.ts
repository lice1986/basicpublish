﻿/**
* DevExpress Analytics (widgets\criteria\operators\options\unary.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from '../criteriaOperator';
export declare enum UnaryOperatorType {
    Minus = 0,
    Plus = 1,
    BitwiseNot = 2,
    Not = 3,
    IsNull = 4
}
export interface IUnaryOperatorOptions {
    operatorType: UnaryOperatorType;
    operator: CriteriaOperator;
}
