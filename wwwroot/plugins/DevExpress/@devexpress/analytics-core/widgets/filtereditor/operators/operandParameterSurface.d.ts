﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\operandParameterSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandSurfaceBase } from './operandSurfaceBase';
import { OperandParameter } from '../../criteria/operators/parameter';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
import { IDataMemberInfo } from '../../utils';
export declare class OperandParameterSurface extends OperandSurfaceBase<OperandParameter> {
    constructor(operator: OperandParameter, parent: CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider?: any, path?: any);
    changeParameter: (item: IDataMemberInfo) => void;
    get items(): any;
    get displayType(): any;
    operatorClass: string;
    parameterName: ko.Observable<string> | ko.Computed<string>;
    templateName: string;
}