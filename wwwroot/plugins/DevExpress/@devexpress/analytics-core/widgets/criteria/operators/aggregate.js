﻿/**
* DevExpress Analytics (widgets\criteria\operators\aggregate.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { UnaryOperator } from './unary';
import { BinaryOperatorType } from './options/binary';
import { UnaryOperatorType } from './options/unary';
import { GroupOperatorType } from './options/group';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class AggregateOperand extends CriteriaOperator {
    constructor(property, aggregatedExpression, aggregateType, condition) {
        super();
        this.change = (operationType, item) => {
            let operator = null;
            if (operationType.type === GroupOperatorType) {
                operator = criteriaCreator.changeByType(operationType);
                if (operationType.type !== operator.enumType) {
                    operator.leftPart.assignFrom(item);
                }
                else {
                    operator.assignFrom(item);
                }
                this.condition = operator;
            }
            return operator;
        };
        this.assignLeftPart = (criteriaOperator) => {
            if (criteriaOperator.leftPart instanceof AggregateOperand) {
                this.assignFrom(criteriaOperator.leftPart);
            }
            else {
                if (criteriaOperator instanceof AggregateOperand) {
                    this.property = criteriaOperator.property;
                    if (this.aggregatedExpression && criteriaOperator.aggregatedExpression) {
                        this.aggregatedExpression = criteriaOperator.aggregatedExpression;
                    }
                    this.condition = criteriaOperator.condition;
                }
                else {
                    this.property = criteriaOperator.leftPart;
                }
            }
        };
        this.type = 'aggregate';
        this.property = property;
        if (!!condition && condition.type === 'group') {
            this.condition = condition;
        }
        else {
            if (condition instanceof UnaryOperator && condition.operatorType === UnaryOperatorType.Not) {
                if (condition.operand.type === 'group') {
                    this.condition = criteriaCreator.process('unary', { operator: condition.operand, operatorType: UnaryOperatorType.Not });
                }
                else {
                    this.condition = criteriaCreator.process('unary', {
                        operator: criteriaCreator.process('group', {
                            operation: GroupOperatorType.And,
                            operands: condition.operand ? [condition.operand] : []
                        }),
                        operatorType: UnaryOperatorType.Not
                    });
                }
            }
            else {
                this.condition = criteriaCreator.process('group', {
                    operation: GroupOperatorType.And,
                    operands: condition ? [condition] : []
                });
            }
        }
        this.operatorType = aggregateType;
        if (aggregatedExpression) {
            if (aggregatedExpression.length > 1) {
                this.customAggregatedExpression = aggregatedExpression;
            }
            else {
                this.aggregatedExpression = aggregatedExpression[0] ? aggregatedExpression[0] : null;
            }
        }
    }
    get displayType() {
        return this.operatorType;
    }
    get enumType() {
        return AggregateOperand;
    }
    get leftPart() {
        return this.property;
    }
    children() {
        const operands = [];
        this.condition && operands.push(this.condition);
        if (this.aggregatedExpression) {
            operands.push(this.aggregatedExpression);
        }
        else if (this.customAggregatedExpression) {
            this.customAggregatedExpression.forEach(aggregated => operands.push(aggregated));
        }
        return operands;
    }
    accept(visitor) {
        if (visitor.visitAggregateOperand) {
            return visitor.visitAggregateOperand(this);
        }
        let aggregatedExpression = null;
        if (this.aggregatedExpression) {
            aggregatedExpression = [this.aggregatedExpression];
        }
        else if (this.customAggregatedExpression) {
            aggregatedExpression = this.customAggregatedExpression.map(aggregated => aggregated.accept(visitor));
        }
        return criteriaCreator.process('aggregate', {
            aggregateType: this.operatorType,
            aggregatedExpression,
            condition: this.condition && this.condition.accept(visitor),
            property: this.property && this.property.accept(visitor)
        });
    }
}
criteriaCreator.register('aggregate', (options) => {
    return new AggregateOperand(options.property, options.aggregatedExpression, options.aggregateType, options.condition);
}, (operatorType) => {
    const options = {
        property: criteriaCreator.process('property'),
        aggregateType: operatorType.value,
        aggregatedExpression: null,
        condition: criteriaCreator.process('group', { operation: GroupOperatorType.And, operands: [] })
    };
    if (operatorType.value === 'Exists') {
        return criteriaCreator.process('aggregate', options);
    }
    else {
        if (operatorType.value !== 'Count') {
            options.aggregatedExpression = [criteriaCreator.process('property')];
        }
        return criteriaCreator.process('binary', {
            left: criteriaCreator.process('aggregate', options),
            right: criteriaCreator.process('value', { value: undefined }),
            operatorType: BinaryOperatorType.Equal
        });
    }
});
