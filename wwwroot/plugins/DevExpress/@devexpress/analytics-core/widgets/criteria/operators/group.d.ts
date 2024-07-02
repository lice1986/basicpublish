﻿/**
* DevExpress Analytics (widgets\criteria\operators\group.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { GroupOperatorType } from './options/group';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class GroupOperator extends CriteriaOperator {
    constructor(operation: GroupOperatorType, operands: Array<CriteriaOperator>);
    static combine(operation: GroupOperatorType, operands: Array<CriteriaOperator>): CriteriaOperator;
    create: (isGroup: boolean, property: CriteriaOperator, specifics?: string) => CriteriaOperator;
    change: (operationType: any, item: any, incorrectSpecificsForAggregate?: boolean) => CriteriaOperator;
    remove: (operator: CriteriaOperator) => void;
    operatorType: GroupOperatorType;
    assignLeftPart: (operator: CriteriaOperator) => void;
    children(): CriteriaOperator[];
    get displayType(): string;
    get enumType(): typeof GroupOperatorType;
    operands: any[];
    type: keyof CriteriaProcessType;
    accept(visitor: ICriteriaOperatorVisitor): CriteriaOperator | GroupOperator;
}