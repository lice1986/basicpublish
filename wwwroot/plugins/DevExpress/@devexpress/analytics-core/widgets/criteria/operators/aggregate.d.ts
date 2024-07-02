﻿/**
* DevExpress Analytics (widgets\criteria\operators\aggregate.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class AggregateOperand extends CriteriaOperator {
    constructor(property: CriteriaOperator, aggregatedExpression: CriteriaOperator[], aggregateType: string, condition: CriteriaOperator);
    get displayType(): string;
    get enumType(): typeof AggregateOperand;
    get leftPart(): CriteriaOperator;
    children(): CriteriaOperator[];
    change: (operationType: any, item: CriteriaOperator) => CriteriaOperator;
    assignLeftPart: (criteriaOperator: CriteriaOperator) => void;
    accept(visitor: ICriteriaOperatorVisitor): CriteriaOperator;
    property: CriteriaOperator;
    condition: CriteriaOperator;
    operatorType: string;
    aggregatedExpression: CriteriaOperator;
    customAggregatedExpression: CriteriaOperator[];
    type: keyof CriteriaProcessType;
}
