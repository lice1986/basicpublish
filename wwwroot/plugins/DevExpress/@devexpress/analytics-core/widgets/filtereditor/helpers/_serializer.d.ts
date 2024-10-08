﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_serializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GroupOperator } from '../../criteria/operators/group';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
import { AggregateOperand } from '../../criteria/operators/aggregate';
import { OperandProperty } from '../../criteria/operators/property';
import { OperandValue } from '../../criteria/operators/value';
import { OperandParameter } from '../../criteria/operators/parameter';
import { BetweenOperator } from '../../criteria/operators/between';
import { InOperator } from '../../criteria/operators/in';
import { BinaryOperator } from '../../criteria/operators/binary';
import { UnaryOperator } from '../../criteria/operators/unary';
import { FunctionOperator } from '../../criteria/operators/function';
export declare class FilterEditorSerializer {
    operatorTokens: {
        Plus: string;
        Minus: string;
        Equal: string;
        NotEqual: string;
        Greater: string;
        Less: string;
        LessOrEqual: string;
        GreaterOrEqual: string;
        Divide: string;
        BitwiseAnd: string;
        BitwiseOr: string;
        BitwiseXor: string;
        Modulo: string;
        Multiply: string;
    };
    custom?: (criteriaOperator: CriteriaOperator, reverse: boolean) => string;
    serializeGroupOperand(groupOperator: GroupOperator, reverse: boolean): any;
    serializeAggregateOperand(aggregateOperand: AggregateOperand, reverse: boolean): any;
    serializeOperandProperty(operandProperty: OperandProperty): string;
    serializeOperandValue(operandValue: OperandValue): any;
    serializeOperandParameter(operandParameter: OperandParameter): string;
    serializeBetweenOperator(betweenOperator: BetweenOperator, reverse: boolean): any;
    serializeInOperator(inOperator: InOperator, reverse: boolean): any;
    serializeBinaryOperator(binaryOperator: BinaryOperator, reverse: boolean): any;
    serializeUnaryOperator(unaryOperator: UnaryOperator, reverse: boolean): any;
    serializeFunctionOperator(functionOperator: FunctionOperator, reverse: boolean): any;
    constructor(operatorTokens?: {
        Plus: string;
        Minus: string;
        Equal: string;
        NotEqual: string;
        Greater: string;
        Less: string;
        LessOrEqual: string;
        GreaterOrEqual: string;
        Divide: string;
        BitwiseAnd: string;
        BitwiseOr: string;
        BitwiseXor: string;
        Modulo: string;
        Multiply: string;
    }, custom?: (criteriaOperator: CriteriaOperator, reverse: boolean) => string);
    serialize(criteriaOperator: CriteriaOperator, reverse?: boolean): any;
    deserialize(stringCriteria: string): CriteriaOperator;
    deserializeOperand(operand: CriteriaOperator): CriteriaOperator;
}
