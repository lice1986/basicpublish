﻿/**
* DevExpress Analytics (widgets\criteria\operators\value.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class OperandValue extends CriteriaOperator {
    private _processStringValue;
    constructor(value?: any, isSomeType?: boolean);
    get displayType(): string;
    accept(visitor: ICriteriaOperatorVisitor): CriteriaOperator;
    value: any;
    type: keyof CriteriaProcessType;
    specifics: string;
}