﻿/**
* DevExpress Analytics (widgets\criteria\operators\criteriaOperator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
import { UnaryOperatorType } from './options/unary';
export class CriteriaOperator {
    constructor() {
        this.type = 'default';
        this.operands = null;
        this.changeValue = (operand, reverse, location) => {
            const result = reverse ? criteriaCreator.process('unary', { operatorType: UnaryOperatorType.Minus, operator: operand }) : operand;
            if (location.index !== null) {
                this[location.name][location.index] = result;
            }
            else {
                this[location.name] = result;
            }
            return result;
        };
        this.changeValueType = (type, location) => {
            const result = new type();
            if (location.index !== null) {
                this[location.name][location.index] = result;
            }
            else {
                this[location.name] = result;
            }
            return result;
        };
        this.assignLeftPart = (operator) => void 0;
        this.assignRightPart = (operator) => void 0;
        this.assignType = (type) => {
            this.operatorType = type;
        };
    }
    get displayType() {
        return this.operatorType;
    }
    get enumType() {
        return null;
    }
    get leftPart() { return null; }
    get rightPart() { return null; }
    assignFrom(criteriaOperator, incorrectSpecificsForAggregate = false, needAssignRightPart = true) {
        let operator = criteriaOperator;
        if (criteriaOperator.type === 'unary' && !Array.isArray(criteriaOperator.leftPart) && criteriaOperator.leftPart.type != 'property') {
            operator = criteriaOperator.leftPart;
        }
        if (incorrectSpecificsForAggregate) {
            this.assignLeftPart(operator.leftPart);
        }
        else {
            this.assignLeftPart(operator);
        }
        if (operator.rightPart) {
            needAssignRightPart && this.assignRightPart(operator);
        }
    }
    children() {
        const operands = [];
        if (this.leftPart)
            operands.push.apply(operands, Array.isArray(this.leftPart) ? this.leftPart : [this.leftPart]);
        if (this.rightPart)
            operands.push.apply(operands, Array.isArray(this.rightPart) ? this.rightPart : [this.rightPart]);
        return operands;
    }
    accept(visitor) { throw 'Not implemented'; }
}
criteriaCreator.register('default', (options) => new CriteriaOperator());
