﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_serializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { GroupOperator } from '../../criteria/operators/group';
import { AggregateOperand } from '../../criteria/operators/aggregate';
import { OperandProperty } from '../../criteria/operators/property';
import { trimBrackets } from '../../common/_codeCompletor';
import { OperandValue } from '../../criteria/operators/value';
import { validateGuid } from '../../../property-grid/widgets/internal/_internal';
import { serializeDate } from '../../../serializer/_date.utiles';
import { OperandParameter } from '../../criteria/operators/parameter';
import { BetweenOperator } from '../../criteria/operators/between';
import { InOperator } from '../../criteria/operators/in';
import { BinaryOperator } from '../../criteria/operators/binary';
import { UnaryOperator } from '../../criteria/operators/unary';
import { FunctionOperator } from '../../criteria/operators/function';
import { operatorTokens as iOperatorTokens } from '../../criteria/utils/operatorTokens';
import { ConstantValue } from '../../criteria/operators/constant';
import { CriteriaOperatorStateMachine } from '../../criteria/utils/criteriaOperatorStateMachine';
import { BinaryOperatorType } from '../../criteria/operators/options/binary';
import { UnaryOperatorType } from '../../criteria/operators/options/unary';
import { GroupOperatorType } from '../../criteria/operators/options/group';
export class FilterEditorSerializer {
    constructor(operatorTokens = iOperatorTokens, custom) {
        this.operatorTokens = operatorTokens;
        this.custom = custom;
    }
    serializeGroupOperand(groupOperator, reverse) {
        const result = groupOperator.operands.map((operand) => {
            if (operand instanceof GroupOperator) {
                return '(' + this.serialize(operand) + ')';
            }
            else {
                return this.serialize(operand);
            }
        }).filter((serialize) => { return serialize !== '' && serialize !== '()'; }).join(' ' + (this.operatorTokens[groupOperator.displayType] || groupOperator.displayType) + ' ');
        return reverse && result ? 'Not(' + result + ')' : result;
    }
    serializeAggregateOperand(aggregateOperand, reverse) {
        const operatorTypeSuffix = aggregateOperand.operatorType === 'Exists' ? '' : '.' + aggregateOperand.operatorType;
        const condition = aggregateOperand.condition ? this.serialize(aggregateOperand.condition) : '';
        const propertyResult = this.serialize(aggregateOperand.property);
        const conditionResult = '[' + condition + ']';
        let aggregateSuffix = '';
        if (aggregateOperand.operatorType !== 'Exists') {
            let serializedExpression = '';
            if (aggregateOperand.aggregatedExpression) {
                serializedExpression = this.serialize(aggregateOperand.aggregatedExpression);
            }
            else if (aggregateOperand.customAggregatedExpression) {
                serializedExpression = aggregateOperand.customAggregatedExpression.map(operand => this.serialize(operand)).join(', ');
            }
            aggregateSuffix = `(${serializedExpression})`;
        }
        let result = propertyResult;
        if (!condition && !aggregateSuffix || condition) {
            result += conditionResult;
        }
        return result + operatorTypeSuffix + aggregateSuffix;
    }
    serializeOperandProperty(operandProperty) {
        if (!operandProperty.propertyName) {
            return operandProperty.circumflex ? '^' : '[]';
        }
        let value = operandProperty.displayType;
        if (value.length - trimBrackets(value).length === 2) {
            value = '[' + trimBrackets(value).replace(/\\/g, '\\\\').replace(/\]/g, '\\]') + ']';
        }
        return operandProperty.circumflex ? '^.' + value : value;
    }
    serializeOperandValue(operandValue) {
        let result = operandValue.value;
        if (result !== null && result !== undefined && ($.isNumeric(result) || String(result).toLowerCase() === 'true' || String(result).toLowerCase() === 'false')) {
            if (operandValue.specifics === 'string')
                return "'" + result + "'";
            if (operandValue.specifics === 'guid' && validateGuid(result))
                return '{' + result + '}';
            return result;
        }
        else if (result && operandValue.value instanceof Date) {
            return '#' + serializeDate(result, '-') + '#';
        }
        else if (operandValue.specifics === 'integer' || operandValue.specifics === 'integer') {
            return result || '?';
        }
        else if (operandValue.specifics === 'guid' && validateGuid(result)) {
            return '{' + result + '}';
        }
        else if (operandValue.specifics === 'string') {
            result = result.replace(/'/g, "''");
            return result ? "'" + result + "'" : '?';
        }
        return result ? result : '?';
    }
    serializeOperandParameter(operandParameter) {
        return operandParameter.displayType;
    }
    serializeBetweenOperator(betweenOperator, reverse) {
        const result = this.serialize(betweenOperator.property) + ' ' + betweenOperator.displayType +
            '(' + this.serialize(betweenOperator.begin) + ', ' + this.serialize(betweenOperator.end) + ')';
        return reverse ? 'Not ' + result : result;
    }
    serializeInOperator(inOperator, reverse) {
        const result = this.serialize(inOperator.criteriaOperator) + ' ' + inOperator.displayType + '(' +
            inOperator.operands.map((operand) => { return this.serialize(operand); }).join(', ') + ')';
        return reverse ? 'Not ' + result : result;
    }
    serializeBinaryOperator(binaryOperator, reverse) {
        if (binaryOperator.operatorType === BinaryOperatorType.Like) {
            const separator = reverse ? ' Not ' : ' ';
            return this.serialize(binaryOperator.leftOperand) + separator + (this.operatorTokens[binaryOperator.displayType] || binaryOperator.displayType) + ' ' + this.serialize(binaryOperator.rightOperand);
        }
        return (reverse ? 'Not ' : '') + this.serialize(binaryOperator.leftOperand) + ' ' + (this.operatorTokens[binaryOperator.displayType] || binaryOperator.displayType) + ' ' + this.serialize(binaryOperator.rightOperand);
    }
    serializeUnaryOperator(unaryOperator, reverse) {
        if (unaryOperator.operatorType === UnaryOperatorType.IsNull) {
            const separator = reverse ? ' Not ' : ' ';
            return this.serialize(unaryOperator.operand) + ' Is' + separator + 'Null';
        }
        else if (unaryOperator.operatorType === UnaryOperatorType.Not) {
            return this.serialize(unaryOperator.operand, true);
        }
        const result = (this.operatorTokens[unaryOperator.displayType] || unaryOperator.displayType) + this.serialize(unaryOperator.operand);
        return reverse ? 'Not ' + result : result;
    }
    serializeFunctionOperator(functionOperator, reverse) {
        const result = (this.operatorTokens[functionOperator.displayType] || functionOperator.displayType) + '(' + functionOperator.operands.map((operand) => {
            return this.serialize(operand);
        }).join(', ') + ')';
        return reverse ? 'Not ' + result : result;
    }
    serialize(criteriaOperator, reverse = false) {
        if (criteriaOperator instanceof AggregateOperand) {
            return this.serializeAggregateOperand(criteriaOperator, reverse);
        }
        if (criteriaOperator instanceof BetweenOperator) {
            return this.serializeBetweenOperator(criteriaOperator, reverse);
        }
        if (criteriaOperator instanceof BinaryOperator) {
            return this.serializeBinaryOperator(criteriaOperator, reverse);
        }
        if (criteriaOperator instanceof ConstantValue) {
            return this.serializeOperandValue(criteriaOperator);
        }
        if (criteriaOperator instanceof FunctionOperator) {
            return this.serializeFunctionOperator(criteriaOperator, reverse);
        }
        if (criteriaOperator instanceof GroupOperator) {
            return this.serializeGroupOperand(criteriaOperator, reverse);
        }
        if (criteriaOperator instanceof InOperator) {
            return this.serializeInOperator(criteriaOperator, reverse);
        }
        if (criteriaOperator instanceof OperandParameter) {
            return this.serializeOperandParameter(criteriaOperator);
        }
        if (criteriaOperator instanceof OperandProperty) {
            return this.serializeOperandProperty(criteriaOperator);
        }
        if (criteriaOperator instanceof OperandValue) {
            return this.serializeOperandValue(criteriaOperator);
        }
        if (criteriaOperator instanceof UnaryOperator) {
            return this.serializeUnaryOperator(criteriaOperator, reverse);
        }
        if (this.custom) {
            return this.custom(criteriaOperator, reverse);
        }
        throw Error('Undefined type criteria operator');
    }
    deserialize(stringCriteria) {
        return this.deserializeOperand(CriteriaOperatorStateMachine.parse(stringCriteria));
    }
    deserializeOperand(operand) {
        if (operand instanceof GroupOperator) {
            return operand;
        }
        else if (operand instanceof UnaryOperator && operand.operatorType === UnaryOperatorType.Not) {
            const child = operand['operand'];
            if (child instanceof GroupOperator || child instanceof FunctionOperator || child instanceof BetweenOperator || child instanceof InOperator) {
                return operand;
            }
            else if (child instanceof UnaryOperator && operand.operatorType === UnaryOperatorType.Not
                && !(child.operand instanceof OperandProperty)) {
                return this.deserializeOperand(child.operand);
            }
            return new UnaryOperator(UnaryOperatorType.Not, new GroupOperator(GroupOperatorType.And, child ? [child] : []));
        }
        return new GroupOperator(GroupOperatorType.And, operand ? [operand] : []);
    }
}
