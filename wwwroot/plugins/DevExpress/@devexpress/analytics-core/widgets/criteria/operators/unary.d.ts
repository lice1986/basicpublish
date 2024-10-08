﻿/**
* DevExpress Analytics (widgets\criteria\operators\unary.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { UnaryOperatorType } from './options/unary';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class UnaryOperator extends CriteriaOperator {
    constructor(operatorType: UnaryOperatorType, operand: CriteriaOperator);
    get leftPart(): CriteriaOperator;
    operand: CriteriaOperator;
    operatorType: UnaryOperatorType;
    assignFrom(criteriaOperator: CriteriaOperator): void;
    get displayType(): string;
    get enumType(): typeof UnaryOperatorType;
    type: keyof CriteriaProcessType;
    accept(visitor: ICriteriaOperatorVisitor): any;
}
