﻿/**
* DevExpress Analytics (widgets\criteria\operators\criteriaOperator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { IPropertyLocation } from '../utils/propertyLocation';
export declare class CriteriaOperator {
    get displayType(): string;
    get enumType(): any;
    operatorType: any;
    type: keyof CriteriaProcessType | string;
    operands: any;
    create: (operatorType: any, field: CriteriaOperator) => CriteriaOperator;
    remove: (operand: CriteriaOperator) => void;
    change: (operandType: any, operand: CriteriaOperator, incorrectSpecificsForAggregate: boolean) => CriteriaOperator;
    changeValue: (operand: CriteriaOperator, reverse: boolean, location: IPropertyLocation) => CriteriaOperator;
    changeValueType: (type: any, location: IPropertyLocation) => CriteriaOperator;
    assignLeftPart: (criteriaOperator: CriteriaOperator | CriteriaOperator[]) => void;
    assignRightPart: (criteriaOperator: CriteriaOperator | CriteriaOperator[]) => void;
    assignType: (type: string) => void;
    get leftPart(): CriteriaOperator | CriteriaOperator[];
    get rightPart(): CriteriaOperator | CriteriaOperator[];
    assignFrom(criteriaOperator: CriteriaOperator, incorrectSpecificsForAggregate?: boolean, needAssignRightPart?: boolean): void;
    children(): CriteriaOperator[];
    accept(visitor: ICriteriaOperatorVisitor): CriteriaOperator;
}
