﻿/**
* DevExpress Analytics (widgets\criteria\operators\function.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { operatorTokens } from '../utils/operatorTokens';
import { FunctionOperatorType } from './options/function';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class FunctionOperator extends CriteriaOperator {
    constructor(operatorType, operands) {
        super();
        this.toString = (reverse) => {
            const result = (operatorTokens[this.displayType] || this.displayType) + '(' + this.operands.map((operand) => {
                return operand.toString();
            }).join(', ') + ')';
            return reverse ? 'Not ' + result : result;
        };
        this.assignLeftPart = (criteriaOperator) => {
            this.operands = [criteriaOperator.leftPart];
        };
        this.assignRightPart = (criteriaOperator) => {
            if (Array.isArray(criteriaOperator.rightPart)) {
                if (criteriaOperator.rightPart.length) {
                    this.operands.push(criteriaOperator.rightPart[0]);
                }
                else {
                    this.operands.push(criteriaCreator.process('value'));
                }
            }
            else {
                this.operands.push(criteriaOperator.rightPart);
            }
        };
        this.operands = [];
        this.type = 'function';
        this.operatorType = operatorType;
        operands = operands || [criteriaCreator.process('default')];
        operands.forEach(operand => this.operands.push(operand));
    }
    get leftPart() {
        return this.operands[0];
    }
    get rightPart() {
        return this.operands.filter((_, index) => { return index !== 0; });
    }
    get displayType() {
        return FunctionOperatorType[this.operatorType] || this.operatorType.toString();
    }
    get enumType() {
        return FunctionOperatorType;
    }
    accept(visitor) {
        return visitor.visitFunctionOperator
            ? visitor.visitFunctionOperator(this)
            : new FunctionOperator(this.operatorType, this.operands && this.operands.map(op => op.accept(visitor)));
    }
}
criteriaCreator.register('function', (options) => {
    return new FunctionOperator(options.operatorType, options.operands);
}, (operatorType) => new FunctionOperator(operatorType.value, [criteriaCreator.process('property')]));
