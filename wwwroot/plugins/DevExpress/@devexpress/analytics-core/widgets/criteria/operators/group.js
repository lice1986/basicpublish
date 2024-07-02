﻿/**
* DevExpress Analytics (widgets\criteria\operators\group.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
import { GroupOperatorType } from './options/group';
import { BinaryOperatorType } from './options/binary';
export class GroupOperator extends CriteriaOperator {
    constructor(operation, operands) {
        super();
        this.create = (isGroup, property, specifics) => {
            let operator = criteriaCreator.process('binary', {
                left: property,
                right: criteriaCreator.process('value', { value: '' }),
                operatorType: BinaryOperatorType.Equal
            });
            if (isGroup) {
                operator = criteriaCreator.process('group', { operation: GroupOperatorType.And, operands: [] });
            }
            else if (specifics && specifics === 'list') {
                operator = criteriaCreator.process('aggregate', {
                    aggregateType: 'Exisits',
                    property: property,
                    aggregatedExpression: null,
                    condition: criteriaCreator.process('group', {
                        operands: [],
                        operation: GroupOperatorType.And
                    })
                });
            }
            this.operands.push(operator);
            return this.operands[this.operands.indexOf(operator)];
        };
        this.change = (operationType, item, incorrectSpecificsForAggregate = false) => {
            const position = this.operands.indexOf(item);
            if (position !== -1) {
                const operator = criteriaCreator.changeByType(operationType);
                if (operationType.type !== operator.enumType && !Array.isArray(operator.leftPart)) {
                    operator.leftPart.assignFrom(item, incorrectSpecificsForAggregate, !operationType.emptyRightPart);
                }
                else {
                    operator.assignFrom(item, incorrectSpecificsForAggregate, !operationType.emptyRightPart);
                }
                this.operands[position] = operator;
            }
            else {
                throw Error('dont have this element in operands collection');
            }
            item = null;
            return this.operands[position];
        };
        this.remove = (operator) => {
            this.operands.splice(this.operands.indexOf(operator), 1);
        };
        this.assignLeftPart = (operator) => {
            this.operands = operator.operands;
        };
        this.operands = [];
        this.type = 'group';
        this.operatorType = operation;
        operands = operands || [criteriaCreator.process('default'), criteriaCreator.process('default')];
        operands.forEach(operand => this.operands.push(operand));
    }
    static combine(operation, operands) {
        const combinedOperands = [];
        (operands || []).forEach(operand => {
            if (operand.type === 'group' && operand.operatorType === operation) {
                combinedOperands.push.apply(combinedOperands, operand.operands);
            }
            else {
                combinedOperands.push(operand);
            }
        });
        if (combinedOperands.length === 1) {
            return combinedOperands[0];
        }
        return criteriaCreator.process('group', { operands: combinedOperands, operation: operation });
    }
    children() {
        return this.operands;
    }
    get displayType() {
        return GroupOperatorType[this.operatorType];
    }
    get enumType() {
        return GroupOperatorType;
    }
    accept(visitor) {
        return visitor.visitGroupOperator
            ? visitor.visitGroupOperator(this)
            : new GroupOperator(this.operatorType, this.operands && this.operands.map(op => op.accept(visitor)));
    }
}
criteriaCreator.register('group', (options) => {
    return new GroupOperator(options.operation, options.operands);
}, (operatorType) => criteriaCreator.process('group', {
    operation: operatorType.value,
    operands: []
}));
