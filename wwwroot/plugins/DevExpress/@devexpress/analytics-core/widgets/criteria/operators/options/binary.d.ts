﻿/**
* DevExpress Analytics (widgets\criteria\operators\options\binary.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from '../criteriaOperator';
export declare enum BinaryOperatorType {
    Equal = 0,
    NotEqual = 1,
    Greater = 2,
    Less = 3,
    LessOrEqual = 4,
    GreaterOrEqual = 5,
    Like = 6,
    BitwiseAnd = 7,
    BitwiseOr = 8,
    BitwiseXor = 9,
    Divide = 10,
    Modulo = 11,
    Multiply = 12,
    Plus = 13,
    Minus = 14
}
export interface IBinaryOperatorOptions {
    left: CriteriaOperator;
    right: CriteriaOperator;
    operatorType: BinaryOperatorType;
}
