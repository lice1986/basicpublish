﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\betweenOperandSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { BetweenOperator } from '../../criteria/operators/between';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
export declare class BetweenOperandSurface extends CriteriaOperatorSurface<BetweenOperator> {
    constructor(operator: BetweenOperator, parent: CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: any, path: any);
    get leftPart(): any;
    get rightPart(): any[];
    dispose(): void;
    property: ko.Observable<any>;
    end: ko.Observable<any>;
    begin: ko.Observable<any>;
    contentTemplateName: string;
}
