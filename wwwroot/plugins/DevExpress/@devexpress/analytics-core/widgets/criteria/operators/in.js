﻿/**
* DevExpress Analytics (widgets\criteria\operators\in.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class InOperator extends CriteriaOperator {
    constructor(criteriaOperator, operands) {
        super();
        this.assignLeftPart = (criteriaOperator) => {
            this.criteriaOperator = criteriaOperator.leftPart;
        };
        this.assignRightPart = (criteriaOperator) => {
            this.operands = [].concat(criteriaOperator.rightPart);
        };
        this.operatorType = 'In';
        this.type = 'in';
        this.operands = [];
        this.criteriaOperator = criteriaOperator || criteriaCreator.process('default');
        (operands || []).forEach(operand => this.operands.push(operand));
    }
    get leftPart() {
        return this.criteriaOperator;
    }
    get rightPart() {
        return this.operands;
    }
    get displayType() {
        return 'In';
    }
    get enumType() {
        return InOperator;
    }
    accept(visitor) {
        return visitor.visitInOperator
            ? visitor.visitInOperator(this)
            : new InOperator(this.criteriaOperator && this.criteriaOperator.accept(visitor), this.operands && this.operands.map(op => op.accept(visitor)));
    }
}
criteriaCreator.register('in', (options) => {
    return new InOperator(options.criteriaOperator, options.operands);
}, (operatorType) => criteriaCreator.process('in', {
    criteriaOperator: criteriaCreator.process('property'),
    operands: [criteriaCreator.process('value')]
}));