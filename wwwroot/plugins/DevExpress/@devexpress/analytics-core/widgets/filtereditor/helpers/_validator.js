﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_validator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { OperandProperty } from '../../criteria/operators/property';
import { OperandParameter } from '../../criteria/operators/parameter';
import { OperandValue } from '../../criteria/operators/value';
import { ConstantValue } from '../../criteria/operators/constant';
import { UnaryOperator } from '../../criteria/operators/unary';
import { AggregateOperand } from '../../criteria/operators/aggregate';
import { GroupOperator } from '../../criteria/operators/group';
export var CriteriaSurfaceValidatorState;
(function (CriteriaSurfaceValidatorState) {
    CriteriaSurfaceValidatorState[CriteriaSurfaceValidatorState["Left"] = 0] = "Left";
    CriteriaSurfaceValidatorState[CriteriaSurfaceValidatorState["Right"] = 1] = "Right";
    CriteriaSurfaceValidatorState[CriteriaSurfaceValidatorState["Unary"] = 2] = "Unary";
})(CriteriaSurfaceValidatorState || (CriteriaSurfaceValidatorState = {}));
export class CriteriaSurfaceValidator {
    customValidate(operator, from) {
        return false;
    }
    checkLeftPart(leftPart) {
        return leftPart instanceof OperandProperty || this.customValidate(leftPart, CriteriaSurfaceValidatorState.Left);
    }
    _checkRightPart(criteriaOperator) {
        return criteriaOperator instanceof OperandProperty
            || criteriaOperator instanceof OperandParameter
            || criteriaOperator instanceof OperandValue
            || criteriaOperator instanceof ConstantValue
            || (criteriaOperator instanceof UnaryOperator && this._checkRightPart(criteriaOperator.operand))
            || this.customValidate(criteriaOperator, CriteriaSurfaceValidatorState.Right);
    }
    checkRightPart(rigthPart) {
        if (Array.isArray(rigthPart)) {
            for (let i = 0; i < rigthPart.length; i++) {
                if (!this._checkRightPart(rigthPart[i])) {
                    return false;
                }
            }
            return true;
        }
        else {
            return this._checkRightPart(rigthPart);
        }
    }
    aggregateIsValid(criteriaOperator) {
        return this.checkLeftPart(criteriaOperator.leftPart)
            && this.validateModel(criteriaOperator.condition)
            && (!!criteriaOperator.aggregatedExpression ?
                (criteriaOperator.aggregatedExpression instanceof OperandProperty ||
                    this.validateModel(criteriaOperator.aggregatedExpression))
                : true);
    }
    commonOperandValid(criteriaOperator) {
        return criteriaOperator.leftPart instanceof AggregateOperand ?
            this.validateModel(criteriaOperator.leftPart) : this.checkLeftPart(criteriaOperator.leftPart)
            && this.checkRightPart(criteriaOperator.rightPart);
    }
    groupIsValid(criteriaOperator) {
        for (let i = 0; i < criteriaOperator.operands.length; i++) {
            if (!this.validateModel(criteriaOperator.operands[i])) {
                return false;
            }
        }
        return true;
    }
    unaryIsValid(criteriaOperator) {
        return criteriaOperator.operand instanceof OperandProperty || this.validateModel(criteriaOperator.operand) || this.customValidate(criteriaOperator.operand, CriteriaSurfaceValidatorState.Unary);
    }
    validateModel(criteriaOperator) {
        if (criteriaOperator instanceof AggregateOperand) {
            return this.aggregateIsValid(criteriaOperator);
        }
        else if (criteriaOperator instanceof GroupOperator) {
            return this.groupIsValid(criteriaOperator);
        }
        else if (criteriaOperator instanceof UnaryOperator) {
            return this.unaryIsValid(criteriaOperator);
        }
        else {
            return this.commonOperandValid(criteriaOperator);
        }
    }
}
