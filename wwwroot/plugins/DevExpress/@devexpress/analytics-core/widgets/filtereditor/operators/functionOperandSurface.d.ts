﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\functionOperandSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandSurfaceBase } from './operandSurfaceBase';
import { FunctionOperator } from '../../criteria/operators/function';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
export declare class FunctionOperandSurface extends OperandSurfaceBase<FunctionOperator> {
    constructor(operator: FunctionOperator, parent: CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: any, path: any);
    get leftPart(): CriteriaOperatorSurface<CriteriaOperator>;
    get rightPart(): any[];
    get displayType(): string;
    dispose(): void;
    canRemove: boolean;
    contentTemplateName: string;
    operands: ko.ObservableArray<any>;
}
