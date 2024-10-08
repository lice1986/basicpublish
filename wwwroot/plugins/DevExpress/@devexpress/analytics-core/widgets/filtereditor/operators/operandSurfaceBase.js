﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\operandSurfaceBase.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { UnaryOperandSurface } from './unaryOperandSurface';
import { OperandValue } from '../../criteria/operators/value';
import { OperandProperty } from '../../criteria/operators/property';
import { OperandParameter } from '../../criteria/operators/parameter';
import { initDisplayText } from '../helpers/_helper';
export class OperandSurfaceBase extends CriteriaOperatorSurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.canChange = true;
        this.canRemove = false;
        this.changeValueType = (type) => {
            const parent = this.getRealParent(this.parent);
            const property = this.getRealProperty(this);
            const propertyLocation = this.getPropertyName(parent, property);
            const model = parent.model.changeValueType(type.instance, propertyLocation);
            if (propertyLocation.index !== null) {
                parent[propertyLocation.name]()[propertyLocation.index].dispose();
                parent[propertyLocation.name].splice(propertyLocation.index, 1, parent.createChildSurface(model));
            }
            else {
                parent[propertyLocation.name]().dispose();
                parent[propertyLocation.name](parent.createChildSurface(model));
            }
            this.helper.onChange();
        };
    }
    getRealParent(parent) {
        if (parent instanceof UnaryOperandSurface) {
            return this.getRealParent(parent.parent);
        }
        else {
            return parent;
        }
    }
    getRealProperty(property) {
        if (property.parent instanceof UnaryOperandSurface) {
            return this.getRealProperty(property.parent);
        }
        else {
            return property;
        }
    }
    getPropertyName(parent, searchProperty) {
        let position = null;
        let name = null;
        $.each(parent, (propertyName, property) => {
            if (Array.isArray(ko.unwrap(property)) && ko.isObservable(property)) {
                const index = ko.unwrap(property).indexOf(searchProperty);
                if (index > -1) {
                    position = index;
                    name = propertyName;
                    return;
                }
            }
            else if (searchProperty === ko.unwrap(property) && ko.isObservable(property)) {
                name = propertyName;
                return;
            }
        });
        return { index: position, name: name };
    }
    getConvertableParameters(destinationSpecifics) {
        if (!this.helper.parameters())
            return [];
        return this.helper.parameters().filter((item) => {
            const sourceSpecifics = item.specifics && item.specifics.toLowerCase();
            if (sourceSpecifics == null || destinationSpecifics == null)
                return false;
            if (sourceSpecifics === destinationSpecifics)
                return true;
            if (destinationSpecifics === 'default')
                return true;
            if (destinationSpecifics === 'string')
                return true;
            if (destinationSpecifics === 'float')
                return sourceSpecifics === 'integer';
            if (destinationSpecifics === 'enum')
                return sourceSpecifics === 'integer' || sourceSpecifics === 'string';
            return false;
        });
    }
    get changeTypeItems() {
        const items = [{ name: 'Value', instance: OperandValue, localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' }];
        if (this.helper.canChoiceProperty) {
            items.push({ name: 'Property', instance: OperandProperty, localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Property' });
        }
        if (this.helper.canChoiceParameters && (this.getConvertableParameters(this.parent.specifics()).length > 0 || this.helper.canCreateParameters)) {
            items.push({ name: 'Parameter', instance: OperandParameter, localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Parameter' });
        }
        items.forEach(initDisplayText);
        return items;
    }
}
