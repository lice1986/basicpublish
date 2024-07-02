﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\aggregateOperandSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { UnaryOperandSurface } from './unaryOperandSurface';
export class AggregateOperandSurface extends CriteriaOperatorSurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.contentTemplateName = 'dx-filtereditor-aggregate';
        this.property = ko.observable(null);
        this.aggregatedExpression = ko.observable(null);
        this.condition = ko.observable(null);
        this.property(this._createLeftPartProperty(operator.property));
        const childPath = ko.computed(() => {
            return this.path() + '.' + this.property().propertyName();
        });
        this._disposables.push(childPath);
        if (operator.aggregatedExpression) {
            this.aggregatedExpression(this.createChildSurface(operator.aggregatedExpression, childPath));
            this.templateName = 'dx-filtereditor-aggregate-common';
        }
        if (operator.operatorType === 'Count') {
            this.templateName = 'dx-filtereditor-aggregate-common';
        }
        const surface = this.createChildSurface(operator.condition, childPath);
        surface.canRemove = false;
        if (surface instanceof UnaryOperandSurface) {
            surface.operand().canRemove = false;
        }
        this.condition(surface);
        this.change = (type, surface) => {
            if (surface) {
                const newModel = this.model.change(type, surface.model);
                const condition = this.createChildSurface(newModel, childPath);
                condition.canRemove = false;
                if (condition instanceof UnaryOperandSurface) {
                    condition.operand().canRemove = false;
                }
                this.condition(condition);
            }
            else {
                if (this.operatorType() === 'Exists' || this.operatorType() === 'Count') {
                    this.parent.change(type, this);
                }
                else {
                    if (type && (type.value === 'Exists' || type.value === 'Count')) {
                        this.parent.change(type, this);
                    }
                    else {
                        super.change(type, surface);
                    }
                }
            }
            this.helper.onChange();
        };
    }
    get leftPart() {
        return this.property && this.property();
    }
    get rightPart() {
        return this.aggregatedExpression();
    }
    dispose() {
        this.property().dispose();
        this.condition().dispose();
        this.aggregatedExpression() && this.aggregatedExpression().dispose();
        super.dispose();
    }
}