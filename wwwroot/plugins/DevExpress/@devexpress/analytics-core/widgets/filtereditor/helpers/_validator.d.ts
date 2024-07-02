﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_validator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UnaryOperator } from '../../criteria/operators/unary';
import { AggregateOperand } from '../../criteria/operators/aggregate';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
import { GroupOperator } from '../../criteria/operators/group';
export declare enum CriteriaSurfaceValidatorState {
    Left = 0,
    Right = 1,
    Unary = 2
}
export declare class CriteriaSurfaceValidator {
    customValidate(operator: any, from: CriteriaSurfaceValidatorState): boolean;
    checkLeftPart(leftPart: any): boolean;
    _checkRightPart(criteriaOperator: any): any;
    checkRightPart(rigthPart: any): any;
    aggregateIsValid(criteriaOperator: AggregateOperand): any;
    commonOperandValid(criteriaOperator: CriteriaOperator): any;
    groupIsValid(criteriaOperator: GroupOperator): boolean;
    unaryIsValid(criteriaOperator: UnaryOperator): any;
    validateModel(criteriaOperator: CriteriaOperator): any;
}
