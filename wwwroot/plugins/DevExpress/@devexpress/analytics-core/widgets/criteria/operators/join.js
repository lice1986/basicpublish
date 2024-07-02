﻿/**
* DevExpress Analytics (widgets\criteria\operators\join.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class JoinOperand extends CriteriaOperator {
    constructor(joinTypeName, condition, type, aggregated) {
        super();
        this.type = 'join';
        this.joinTypeName = joinTypeName;
        this.condition = condition;
        this.operatorType = type;
        this.aggregatedExpression = aggregated;
    }
    static joinOrAggregate(collectionProperty, condition, type, aggregated) {
        if (collectionProperty === null || collectionProperty.propertyName.length < 2 || collectionProperty.propertyName[0] != '<' || collectionProperty.propertyName[collectionProperty.propertyName.length - 1] != '>') {
            return criteriaCreator.process('aggregate', {
                property: collectionProperty,
                aggregatedExpression: aggregated,
                aggregateType: type,
                condition: condition
            });
        }
        else {
            return criteriaCreator.process('join', {
                joinTypeName: collectionProperty.propertyName.substring(1, collectionProperty.propertyName.length - 2),
                condition: condition,
                type: type,
                aggregated: aggregated && aggregated[0] ? aggregated[0] : null
            });
        }
    }
    accept(visitor) {
        return visitor.visitJoinOperand
            ? visitor.visitJoinOperand(this)
            : new JoinOperand(this.joinTypeName, this.condition && this.condition.accept(visitor), this.operatorType, this.aggregatedExpression && this.aggregatedExpression.accept(visitor));
    }
}