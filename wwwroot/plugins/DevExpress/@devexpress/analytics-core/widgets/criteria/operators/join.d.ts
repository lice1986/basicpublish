﻿/**
* DevExpress Analytics (widgets\criteria\operators\join.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { OperandProperty } from './property';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class JoinOperand extends CriteriaOperator {
    constructor(joinTypeName: string, condition: CriteriaOperator, type: string, aggregated: CriteriaOperator);
    static joinOrAggregate(collectionProperty: OperandProperty, condition: CriteriaOperator, type: string, aggregated: CriteriaOperator[]): CriteriaOperator;
    joinTypeName: string;
    condition: CriteriaOperator;
    operatorType: string;
    aggregatedExpression: CriteriaOperator;
    type: keyof CriteriaProcessType;
    accept(visitor: ICriteriaOperatorVisitor): any;
}
