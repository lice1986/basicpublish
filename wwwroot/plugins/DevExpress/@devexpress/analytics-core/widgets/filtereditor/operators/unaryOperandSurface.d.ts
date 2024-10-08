﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\unaryOperandSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { UnaryOperator } from '../../criteria/operators/unary';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
export declare class UnaryOperandSurface extends CriteriaOperatorSurface<UnaryOperator> {
    constructor(operator: UnaryOperator, parent: any, fieldListProvider?: any, path?: any);
    get leftPart(): any;
    get rightPart(): any;
    createChildSurface(item: CriteriaOperator, path?: any, actions?: any): CriteriaOperatorSurface<CriteriaOperator>;
    dispose(): void;
    contentTemplateName: string;
    operand: ko.Observable<any>;
}
