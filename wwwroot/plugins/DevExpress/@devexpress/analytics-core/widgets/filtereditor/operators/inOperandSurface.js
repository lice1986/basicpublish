﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\inOperandSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { OperandValue } from '../../criteria/operators/value';
export class InOperandSurface extends CriteriaOperatorSurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.contentTemplateName = 'dx-filtereditor-in';
        this.operands = ko.observableArray([]);
        this.criteriaOperator = ko.observable(null);
        this.criteriaOperator(this._createLeftPartProperty(operator.criteriaOperator));
        this.operands((operator.operands || []).map((operand) => {
            return this.createChildSurface(operand);
        }));
        this.addValue = () => {
            const value = new OperandValue(null);
            this.model.operands.push(value);
            this.operands.push(this.createChildSurface(value));
        };
    }
    get leftPart() {
        return this.criteriaOperator();
    }
    get rightPart() {
        return this.operands();
    }
    dispose() {
        this.criteriaOperator().dispose();
        this.operands().forEach(x => x.dispose());
        super.dispose();
    }
}