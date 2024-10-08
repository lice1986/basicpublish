﻿/**
* DevExpress Analytics (widgets\criteria\operators\binary.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { BinaryOperatorType } from './options/binary';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class BinaryOperator extends CriteriaOperator {
    constructor(left: CriteriaOperator, right: CriteriaOperator, operatorType: BinaryOperatorType);
    get leftPart(): CriteriaOperator;
    get rightPart(): CriteriaOperator;
    assignLeftPart: (criteriaOperator: CriteriaOperator) => void;
    assignRightPart: (criteriaOperator: CriteriaOperator) => void;
    leftOperand: CriteriaOperator;
    rightOperand: CriteriaOperator;
    operatorType: BinaryOperatorType;
    get displayType(): string;
    get enumType(): typeof BinaryOperatorType;
    type: keyof CriteriaProcessType;
    accept(visitor: ICriteriaOperatorVisitor): any;
}
