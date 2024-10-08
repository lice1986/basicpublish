﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\unaryOperandSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { GroupOperator } from '../../criteria/operators/group';
import { UnaryOperatorType } from '../../criteria/operators/options/unary';
import { GroupOperatorType } from '../../criteria/operators/options/group';
export class UnaryOperandSurface extends CriteriaOperatorSurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.contentTemplateName = 'dx-filtereditor-unary';
        this.operand = ko.observable(null);
        let operand = this.createChildSurface(operator.operand);
        if (operator.operatorType === UnaryOperatorType.Not) {
            this.templateName = 'dx-filtereditor-not';
            operand.reverse = true;
            this.specifics = operand.specifics;
        }
        else {
            operand.dispose();
            operand = this._createLeftPartProperty(operator.operand);
        }
        this.operand(operand);
    }
    get leftPart() {
        let leftPart = this.operand();
        if (this.operand() && this.operand().reverse && this.operand().leftPart) {
            leftPart = this.operand().leftPart;
        }
        return leftPart;
    }
    get rightPart() {
        return this.operand() && this.operand().reverse ? this.operand().rightPart : null;
    }
    createChildSurface(item, path, actions) {
        if (this.operatorType() === UnaryOperatorType.Not && !this.helper._getFilterEditorOperator(item, this.helper._allFilterEditorOperators, true)) {
            this.model.operand = new GroupOperator(GroupOperatorType.And, [item]);
        }
        return super.createChildSurface(this.model.operand, path, actions);
    }
    dispose() {
        this.operand().dispose();
        super.dispose();
    }
}
