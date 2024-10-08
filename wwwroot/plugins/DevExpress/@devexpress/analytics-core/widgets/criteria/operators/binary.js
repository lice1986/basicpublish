﻿/**
* DevExpress Analytics (widgets\criteria\operators\binary.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { operatorTokens } from '../utils/operatorTokens';
import { BinaryOperatorType } from './options/binary';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class BinaryOperator extends CriteriaOperator {
    constructor(left, right, operatorType) {
        super();
        this.assignLeftPart = (criteriaOperator) => {
            this.leftOperand = criteriaOperator.leftPart;
        };
        this.assignRightPart = (criteriaOperator) => {
            if (Array.isArray(criteriaOperator.rightPart)) {
                if (criteriaOperator.rightPart.length) {
                    this.rightOperand = criteriaOperator.rightPart[0];
                }
            }
            else {
                this.rightOperand = criteriaOperator.rightPart;
            }
        };
        this.type = 'binary';
        this.leftOperand = left || criteriaCreator.process('default');
        this.rightOperand = right || criteriaCreator.process('default');
        this.operatorType = operatorType;
    }
    get leftPart() {
        return this.leftOperand;
    }
    get rightPart() {
        return this.rightOperand;
    }
    get displayType() {
        return operatorTokens[BinaryOperatorType[this.operatorType]] || BinaryOperatorType[this.operatorType];
    }
    get enumType() {
        return BinaryOperatorType;
    }
    accept(visitor) {
        return visitor.visitBinaryOperator
            ? visitor.visitBinaryOperator(this)
            : new BinaryOperator(this.leftOperand && this.leftOperand.accept(visitor), this.rightOperand && this.rightOperand.accept(visitor), this.operatorType);
    }
}
criteriaCreator.register('binary', (options) => {
    return new BinaryOperator(options.left, options.right, options.operatorType);
}, (operatorType) => criteriaCreator.process('binary', {
    left: criteriaCreator.process('property'),
    right: criteriaCreator.process('value'),
    operatorType: operatorType.value
}));
