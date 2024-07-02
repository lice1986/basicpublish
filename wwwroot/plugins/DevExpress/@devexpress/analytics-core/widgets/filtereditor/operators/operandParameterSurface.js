﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\operandParameterSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandSurfaceBase } from './operandSurfaceBase';
export class OperandParameterSurface extends OperandSurfaceBase {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.changeParameter = (item) => {
            this.model.parameterName = item.name;
            this.parameterName(item.name);
            this.helper.onChange();
        };
        this.operatorClass = 'criteria-operator-item-parameter dxd-filter-editor-parameter-back-color dxd-filter-editor-text-color';
        this.parameterName = ko.observable('');
        this.templateName = 'dx-filtereditor-parameter';
        this.specifics = parent.specifics;
        this.parameterName(operator.parameterName);
        if (!this.parameterName() && this.items.length > 0) {
            this.changeParameter(this.items[0]);
        }
        this.specifics && this._disposables.push(this.specifics.subscribe((newVal) => {
            if (this.items.filter(x => ko.unwrap(x.name) == this.parameterName()).length == 0)
                this.items.length > 0 ? this.changeParameter(this.items[0]) : this.changeParameter({ name: '' });
        }));
    }
    get items() {
        return this.getConvertableParameters(this.specifics());
    }
    get displayType() {
        return null;
    }
}