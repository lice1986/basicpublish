﻿/**
* DevExpress Analytics (widgets\criteria\operators\unary.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { UnaryOperatorType } from './options/unary';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class UnaryOperator extends CriteriaOperator {
    constructor(operatorType, operand) {
        super();
        this.type = 'unary';
        this.operand = operand || criteriaCreator.process('default');
        this.operatorType = operatorType;
    }
    get leftPart() {
        return this.operand;
    }
    assignFrom(criteriaOperator) {
        if (this.operatorType === UnaryOperatorType.Not) {
            if (criteriaOperator instanceof UnaryOperator) {
                this.operand.assignFrom(criteriaOperator.operand);
            }
            else {
                this.operand.assignFrom(criteriaOperator);
            }
        }
        else {
            if (criteriaOperator instanceof UnaryOperator) {
                this.operand = criteriaOperator.operand.leftPart;
            }
            else {
                this.operand = (criteriaOperator.leftPart || criteriaOperator);
            }
        }
    }
    get displayType() {
        return UnaryOperatorType[this.operatorType];
    }
    get enumType() {
        return UnaryOperatorType;
    }
    accept(visitor) {
        return visitor.visitUnaryOperator
            ? visitor.visitUnaryOperator(this)
            : new UnaryOperator(this.operatorType, this.operand && this.operand.accept(visitor));
    }
}
criteriaCreator.register('unary', (options) => {
    return new UnaryOperator(options.operatorType, options.operator);
}, (operatorType) => criteriaCreator.process('unary', {
    operatorType: operatorType.value,
    operator: criteriaCreator.process('property')
}));
