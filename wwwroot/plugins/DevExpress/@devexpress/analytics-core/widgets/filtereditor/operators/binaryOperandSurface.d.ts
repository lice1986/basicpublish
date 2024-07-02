﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\binaryOperandSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { BinaryOperator } from '../../criteria/operators/binary';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
export declare class BinaryOperandSurface extends CriteriaOperatorSurface<BinaryOperator> {
    constructor(operator: BinaryOperator, parent: any, fieldListProvider: any, path: any);
    get leftPart(): CriteriaOperatorSurface<CriteriaOperator>;
    get rightPart(): any;
    dispose(): void;
    contentTemplateName: string;
    leftOperand: ko.Observable<any>;
    rightOperand: ko.Observable<any>;
}