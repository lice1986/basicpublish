﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_operandParameterQBSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandParameterSurface } from '../../../widgets/filtereditor/operators/operandParameterSurface';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { ParameterViewModel } from '../../elements/parameterModel';
export class OperandParameterQBSurface extends OperandParameterSurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.createParameter = () => {
            if (this.canCreateParameters) {
                this.model.parameterName = this.parameterName();
                this._createParameter(this.parameterName(), this._parameterType);
                this.helper.onChange();
            }
        };
        this._parameterName = ko.observable('');
        this.isEditable = ko.observable(false);
        this.defaultDisplay = OperandParameterQBSurface.defaultDisplay;
        this._parameterName(ko.unwrap(operator.parameterName));
        this.canCreateParameters = this.helper.canCreateParameters;
        this.fieldsOptions = parent.leftPart.fieldsOptions;
        this.parameterName = ko.pureComputed({
            read: () => {
                return this._parameterName() || (this.canCreateParameters && OperandParameterQBSurface.defaultDisplay() || '');
            },
            write: (newVal) => {
                if (newVal !== OperandParameterQBSurface.defaultDisplay() && newVal) {
                    this.model.parameterName = ko.unwrap(newVal);
                    this._parameterName(this.model.parameterName);
                }
            }
        });
        if (this.canCreateParameters && !this.isDefaultTextDisplayed() && !ko.unwrap(this.fieldListProvider).hasParameter(operator.parameterName)) {
            this.createParameter();
        }
    }
    get _parameterType() {
        return this.fieldsOptions() && this.fieldsOptions().selected() && this.fieldsOptions().selected()['dataType'] || 'System.String';
    }
    _createParameter(name, dataType) {
        if (name !== '' && name !== OperandParameterQBSurface.defaultDisplay() && this.helper.parameters().filter((parameter) => { return parameter.name() === name; }).length === 0) {
            const parameter = new ParameterViewModel({ '@Name': name, '@Type': dataType });
            this.helper.newParameters.push(parameter);
        }
    }
    isDefaultTextDisplayed() {
        return this.parameterName() === OperandParameterQBSurface.defaultDisplay();
    }
}
OperandParameterQBSurface.defaultDisplay = () => getLocalization('Create new parameter', 'AnalyticsCoreStringId.FilterEditor_Operand_CreateNewParameter');