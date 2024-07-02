﻿/**
* DevExpress Analytics (widgets\criteria\operators\property.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { CriteriaProcessType } from '../utils/criteriaProcessType';
import { ICriteriaOperatorVisitor } from '../utils/criteriaOperatorVisitor';
export declare class OperandProperty extends CriteriaOperator {
    constructor(propertyName?: string, startColumn?: number, startLine?: number, originalPropertyLength?: number, circumflex?: boolean);
    get displayType(): string;
    propertyName: string;
    originalPropertyLength: number;
    type: keyof CriteriaProcessType;
    circumflex: boolean;
    startPosition: {
        line: number;
        column: number;
    };
    accept(visitor: ICriteriaOperatorVisitor): CriteriaOperator;
}