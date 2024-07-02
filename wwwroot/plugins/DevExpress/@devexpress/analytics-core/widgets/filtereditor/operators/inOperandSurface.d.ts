﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\inOperandSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { InOperator } from '../../criteria/operators/in';
export declare class InOperandSurface extends CriteriaOperatorSurface<InOperator> {
    constructor(operator: InOperator, parent: any, fieldListProvider: any, path: any);
    get leftPart(): any;
    get rightPart(): any[];
    dispose(): void;
    addValue: () => void;
    contentTemplateName: string;
    operands: ko.ObservableArray<any>;
    criteriaOperator: ko.Observable<any>;
}