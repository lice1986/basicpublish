﻿/**
* DevExpress Analytics (widgets\criteria\operators\between.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class BetweenOperator extends CriteriaOperator {
    constructor(property: CriteriaOperator, begin: CriteriaOperator, end: CriteriaOperator);
    property: CriteriaOperator;
    begin: CriteriaOperator;
    end: CriteriaOperator;
    get leftPart(): CriteriaOperator;
    get rightPart(): CriteriaOperator[];
    assignLeftPart: (criteriaOperator: CriteriaOperator) => void;
    assignRightPart: (criteriaOperator: CriteriaOperator) => void;
    get displayType(): string;
    operatorType: string;
    get enumType(): typeof BetweenOperator;
    type: keyof CriteriaProcessType;
    accept(visitor: ICriteriaOperatorVisitor): any;
}
