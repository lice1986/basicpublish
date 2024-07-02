﻿/**
* DevExpress Analytics (widgets\criteria\operators\between.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class BetweenOperator extends CriteriaOperator {
    constructor(property, begin, end) {
        super();
        this.assignLeftPart = (criteriaOperator) => {
            this.property = criteriaOperator.leftPart;
        };
        this.assignRightPart = (criteriaOperator) => {
            if (Array.isArray(criteriaOperator.rightPart)) {
                if (criteriaOperator.rightPart.length) {
                    this.begin = criteriaOperator.rightPart[0];
                    this.end = criteriaOperator.rightPart.length > 1 ? criteriaOperator.rightPart[1] : criteriaCreator.process('value');
                }
                else {
                    this.begin = criteriaCreator.process('value');
                    this.end = criteriaCreator.process('value');
                }
            }
            else {
                this.begin = criteriaOperator.rightPart;
                this.end = criteriaCreator.process('value');
            }
        };
        this.operatorType = 'Between';
        this.type = 'between';
        this.property = property;
        this.begin = begin || criteriaCreator.process('value');
        this.end = end || criteriaCreator.process('value');
    }
    get leftPart() {
        return this.property;
    }
    get rightPart() {
        return [this.begin, this.end];
    }
    get displayType() {
        return 'Between';
    }
    get enumType() {
        return BetweenOperator;
    }
    accept(visitor) {
        return visitor.visitBetweenOperator
            ? visitor.visitBetweenOperator(this)
            : new BetweenOperator(this.property && this.property.accept(visitor), this.begin && this.begin.accept(visitor), this.end && this.end.accept(visitor));
    }
}
criteriaCreator.register('between', (options) => {
    return new BetweenOperator(options.property, options.begin, options.end);
}, (operatorType) => (criteriaCreator.process('between', {
    property: criteriaCreator.process('property'),
    begin: criteriaCreator.process('value'),
    end: criteriaCreator.process('value')
})));