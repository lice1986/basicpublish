﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_qbFilterEditorHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { FilterEditorHelper } from '../../../widgets/filtereditor/helpers/helper';
import { FilterEditorAddOn } from '../../../widgets/filtereditor/helpers/_addon';
import { OperandParameterQBSurface } from './_operandParameterQBSurface';
import { OperandPropertyQBSurface } from './_operandPropertyQBSurface';
import { ParametersMode } from '../../elements/parameterModelMeta';
import { OperandParameter } from '../../../widgets/criteria/operators/parameter';
import { criteriaForEach } from '../../../widgets/criteria/utils/criteriaEnumeration';
export class QBFilterEditorHelper extends FilterEditorHelper {
    constructor(parametersMode) {
        super();
        this.handlers.changeParameter = (criteria, popupService) => {
            return {
                data: new FilterEditorAddOn(criteria, popupService, 'changeParameter', 'items', 'dxqb-filtereditor-parameterspopup'),
                templateName: 'dxqb-filtereditor-changeparameter'
            };
        };
        this.mapper.parameter = OperandParameterQBSurface;
        this.mapper.property = OperandPropertyQBSurface;
        if (parametersMode === ParametersMode.ReadWrite) {
            this.canCreateParameters = true;
            this.newParameters = ko.observableArray([]);
            this.onEditorFocusOut = (criteria) => {
                if (!criteria)
                    return;
                const parameters = this.newParameters();
                const usesParameters = [];
                criteriaForEach(criteria, (child) => {
                    if (child instanceof OperandParameter) {
                        const parameter = parameters.filter(x => x.name() === child.parameterName)[0];
                        if (parameter)
                            usesParameters.push(parameter);
                    }
                });
                if (usesParameters.length === 0) {
                    this.newParameters.splice(0);
                    return;
                }
                const uselessParameters = parameters.filter(x => usesParameters.indexOf(x) === -1);
                for (let i = 0; i < uselessParameters.length; i++) {
                    const parameterIndex = parameters.indexOf(uselessParameters[i]);
                    if (parameterIndex !== -1)
                        parameters.splice(parameterIndex, 1);
                }
                this.newParameters.valueHasMutated();
            };
            this.onClosing = () => {
                this.newParameters([]);
            };
        }
        this.canSelectLists = false;
        this.getDisplayPropertyName = () => $.Deferred().resolve('').promise();
    }
}
export let QBFilterEditorHelperDefault = QBFilterEditorHelper;
export function _setQBFilterEditorHelperDefault(helperType) {
    QBFilterEditorHelperDefault = helperType;
}
