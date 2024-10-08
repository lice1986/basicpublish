﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_qbFilterStringOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FilterStringOptions } from '../../../widgets/filtereditor/filtereditoroptions';
import { QBFilterEditorHelperDefault } from './_qbFilterEditorHelper';
import { ParametersMode } from '../../elements/parameterModelMeta';
import { OperandParameter } from '../../../widgets/criteria/operators/parameter';
export class QBFilterStringOptions extends FilterStringOptions {
    constructor(filterString, dataMember, disabled, title) {
        super(filterString, dataMember, disabled, title);
    }
    initializeFilterStringHelper(parameters, parametersMode, serializer) {
        const helper = new QBFilterEditorHelperDefault(parametersMode);
        helper.canChoiceParameters = parametersMode !== ParametersMode.Disabled;
        if (serializer) {
            helper.serializer = serializer;
        }
        if (parametersMode === ParametersMode.ReadWrite) {
            helper.parameters = ko.computed(() => [].concat(parameters(), helper.newParameters()));
            helper.onSave = (operandProperty) => {
                const newParameters = helper.newParameters();
                parameters.push.apply(parameters, newParameters);
                helper.newParameters([]);
            };
        }
        else {
            if (parametersMode === ParametersMode.Read)
                helper.parameters = parameters;
            const oldCheckRightPart = helper.criteriaTreeValidator._checkRightPart;
            helper.criteriaTreeValidator._checkRightPart = (criteriaOperator) => {
                if (!(criteriaOperator instanceof OperandParameter))
                    return oldCheckRightPart.apply(this, [criteriaOperator]);
                if (parametersMode === ParametersMode.Disabled) {
                    return false;
                }
                else if (parametersMode === ParametersMode.Read) {
                    const parameterName = criteriaOperator.parameterName;
                    return parameters.peek().filter(x => x.name() === parameterName).length !== 0;
                }
            };
        }
        this.helper = helper;
    }
}
