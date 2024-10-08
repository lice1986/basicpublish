﻿/**
* DevExpress Analytics (widgets\criteria\operators\parameter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { OperandValue } from './value';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class OperandParameter extends OperandValue {
    constructor(parameterName?: string, value?: string);
    get displayType(): string;
    parameterName: string;
    type: keyof CriteriaProcessType;
    accept(visitor: ICriteriaOperatorVisitor): any;
}
