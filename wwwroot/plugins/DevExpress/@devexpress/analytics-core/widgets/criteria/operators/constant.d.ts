﻿/**
* DevExpress Analytics (widgets\criteria\operators\constant.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { CriteriaOperator } from './criteriaOperator';
import { OperandValue } from './value';
export declare class ConstantValue extends OperandValue {
    constructor(value: any, specifics?: string);
    type: keyof CriteriaProcessType;
    accept(visitor: ICriteriaOperatorVisitor): CriteriaOperator;
}
