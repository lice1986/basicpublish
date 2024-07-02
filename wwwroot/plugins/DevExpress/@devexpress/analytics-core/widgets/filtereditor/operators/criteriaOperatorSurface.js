﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\criteriaOperatorSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { OperandProperty } from '../../criteria/operators/property';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { FunctionOperatorType } from '../../criteria/operators/options/function';
export class CriteriaOperatorSurface extends Disposable {
    constructor(operator, parent, fieldListProvider, path) {
        super();
        this.isUpdated = ko.observable(false);
        this.canRemove = true;
        this.operatorType = ko.observable(null);
        this.templateName = 'dx-filtereditor-common';
        this.isSelected = ko.observable(false);
        this.operatorClass = 'criteria-operator-item-operator dxd-filter-editor-operator-back-color dxd-filter-editor-text-color';
        this.popupService = parent.popupService || { visible: ko.observable(false) };
        this.model = operator;
        this.helper = parent.helper;
        this.fieldListProvider = fieldListProvider;
        this.path = path;
        this.parent = parent;
        this.operatorType(operator.operatorType);
        this._disposables.push(this.operatorType.subscribe((newVal) => {
            this.model.assignType(newVal);
        }));
    }
    _createLeftPartProperty(value) {
        let surface;
        if (value instanceof OperandProperty) {
            surface = this.createChildSurface(value);
        }
        else {
            surface = this.createChildSurface(value);
            const specifics = Object.keys(this.helper.filterEditorOperators).reduce((key, value) => {
                if (value !== '_common' && key === 'integer'
                    && !!this.helper._getFilterEditorOperator(this.model, this.helper.filterEditorOperators[value], this.reverse)) {
                    key = value;
                }
                return key;
            }, 'integer');
            surface.specifics = surface.specifics || ko.observable(specifics);
        }
        surface['canChange'] = false;
        surface.canRemove = false;
        if (surface && surface.model.type === 'aggregate') {
            this.specifics = ko.computed(() => {
                return surface['aggregatedExpression']() && surface['aggregatedExpression']().specifics() || 'integer';
            });
            this.dataType = ko.computed(() => {
                return surface['aggregatedExpression']() && surface['aggregatedExpression']().dataType() || 'integer';
            });
            this._disposables.push(this.specifics);
            this._disposables.push(this.dataType);
        }
        else {
            this.specifics = surface.specifics;
            this.dataType = surface.dataType;
        }
        this.isUpdated = surface.isUpdated;
        return surface;
    }
    createChildSurface(item, path, actions) {
        return new this.helper.mapper[item.type](item, this, this.fieldListProvider, path || this.path);
    }
    getDisplayType() {
        const type = this.operatorType && this.operatorType() || '';
        const item = this.helper._getFilterEditorOperator(this.model, this.items, this.reverse);
        return item && item.name && (item.displayText || getLocalization(item.name, item.localizationId)) || this.model.displayType || type;
    }
    get items() {
        return this.helper.filterEditorOperators[this.specifics()] || this.helper.filterEditorOperators._common;
    }
    get displayType() {
        return this.getDisplayType();
    }
    get leftPart() {
        return null;
    }
    get rightPart() {
        return null;
    }
    get css() {
        return this.operatorClass + (this.isSelected() ? ' selected' : '');
    }
    change(type, surface) {
        if (!surface && type && this.model.enumType === type.type && this.reverse === type.reverse && type.type !== FunctionOperatorType) {
            this.operatorType(type.value);
        }
        else {
            this.parent.change(type, this);
        }
        this.helper.onChange();
    }
    remove(surface) {
        this.parent.remove(this);
        this.helper.onChange();
    }
}
