﻿/**
* DevExpress Analytics (widgets\criteria\operators\function.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { FunctionOperatorType } from './options/function';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class FunctionOperator extends CriteriaOperator {
    constructor(operatorType: FunctionOperatorType, operands: CriteriaOperator[]);
    toString: (reverse: boolean) => string;
    operatorType: FunctionOperatorType;
    assignLeftPart: (criteriaOperator: CriteriaOperator) => void;
    assignRightPart: (criteriaOperator: CriteriaOperator) => void;
    get leftPart(): CriteriaOperator;
    get rightPart(): CriteriaOperator[];
    get displayType(): string;
    get enumType(): typeof FunctionOperatorType;
    operands: any[];
    type: keyof CriteriaProcessType;
    accept(visitor: ICriteriaOperatorVisitor): any;
}
