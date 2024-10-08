﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\groupOperandSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { initDisplayText } from '../helpers/_helper';
import { AggregateOperandSurface } from './aggregateOperandSurface';
import { OperandProperty } from '../../criteria/operators/property';
export class GroupOperandSurface extends CriteriaOperatorSurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.templateName = 'dx-filtereditor-group';
        this.operatorClass = 'criteria-operator-item-group dxd-filter-editor-group-back-color dxd-filter-editor-text-color';
        this.operands = ko.observableArray([]);
        this.createItems = null;
        this.createItems = [
            { name: 'Add group', value: true, localizationId: 'StringId.FilterMenuGroupAdd' },
            { name: 'Add condition', value: false, localizationId: 'StringId.FilterMenuConditionAdd' }
        ];
        this.createItems.forEach(initDisplayText);
        this.operands((operator.operands || []).map((operand) => {
            return this.createChildSurface(operand);
        }));
        this.specifics = ko.observable('group');
    }
    change(type, surface) {
        if (surface) {
            const specifics = surface.specifics() || 'integer';
            const operators = this.helper.filterEditorOperators[specifics] || this.helper.filterEditorOperators._common;
            if (!type) {
                const item = operators.filter((item) => {
                    return surface.operatorType() === item.value && surface.reverse === item.reverse && surface.model.enumType === item.type;
                })[0];
                if (item) {
                    type = item;
                }
                else {
                    type = operators[0];
                }
            }
            const newModel = this.model.change(type, surface.model, surface.leftPart instanceof AggregateOperandSurface && surface.leftPart.leftPart.specifics() !== 'list');
            const position = this.operands().indexOf(surface);
            const operand = this.createChildSurface(newModel);
            this.operands()[position].dispose();
            this.operands.splice(position, 1, operand);
        }
        else {
            super.change(type, surface);
        }
        this.helper.onChange();
    }
    remove(surface) {
        if (surface) {
            this.model.remove(surface.model);
            this.operands.remove(surface);
            surface.dispose();
        }
        else {
            this.parent.remove(this);
            this.dispose();
        }
        this.helper.onChange();
    }
    create(type) {
        const newModel = this.model.create(type.value, new OperandProperty());
        this.operands.push(this.createChildSurface(newModel));
        this.helper.onChange();
    }
    get rightPart() {
        return this.operands();
    }
    dispose() {
        this.operands().forEach(x => x.dispose());
        super.dispose();
    }
}
