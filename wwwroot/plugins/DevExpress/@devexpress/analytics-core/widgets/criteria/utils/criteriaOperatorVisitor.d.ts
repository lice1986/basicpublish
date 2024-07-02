﻿/**
* DevExpress Analytics (widgets\criteria\utils\criteriaOperatorVisitor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AggregateOperand } from '../operators/aggregate';
import { BetweenOperator } from '../operators/between';
import { BinaryOperator } from '../operators/binary';
import { ConstantValue } from '../operators/constant';
import { CriteriaOperator } from '../operators/criteriaOperator';
import { FunctionOperator } from '../operators/function';
import { GroupOperator } from '../operators/group';
import { InOperator } from '../operators/in';
import { JoinOperand } from '../operators/join';
import { OperandParameter } from '../operators/parameter';
import { OperandProperty } from '../operators/property';
import { UnaryOperator } from '../operators/unary';
import { OperandValue } from '../operators/value';
export interface ICriteriaOperatorVisitor {
    visitGroupOperator?: (element: GroupOperator) => CriteriaOperator;
    visitOperandProperty?: (element: OperandProperty) => CriteriaOperator;
    visitConstantValue?: (element: ConstantValue) => CriteriaOperator;
    visitOperandParameter?: (element: OperandParameter) => CriteriaOperator;
    visitOperandValue?: (element: OperandValue) => CriteriaOperator;
    visitAggregateOperand?: (element: AggregateOperand) => CriteriaOperator;
    visitJoinOperand?: (element: JoinOperand) => CriteriaOperator;
    visitBetweenOperator?: (element: BetweenOperator) => CriteriaOperator;
    visitInOperator?: (element: InOperator) => CriteriaOperator;
    visitBinaryOperator?: (element: BinaryOperator) => CriteriaOperator;
    visitUnaryOperator?: (element: UnaryOperator) => CriteriaOperator;
    visitFunctionOperator?: (element: FunctionOperator) => CriteriaOperator;
}
