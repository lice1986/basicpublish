﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\aggregateOperandSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { AggregateOperand } from '../../criteria/operators/aggregate';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
export declare class AggregateOperandSurface extends CriteriaOperatorSurface<AggregateOperand> {
    constructor(operator: AggregateOperand, parent: CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: any, path: any);
    get leftPart(): any;
    get rightPart(): any;
    dispose(): void;
    contentTemplateName: string;
    property: ko.Observable<any>;
    aggregatedExpression: ko.Observable<any>;
    condition: ko.Observable<any>;
}