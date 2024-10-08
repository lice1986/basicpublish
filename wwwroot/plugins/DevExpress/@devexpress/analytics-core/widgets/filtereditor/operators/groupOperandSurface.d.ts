﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\groupOperandSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { GroupOperator } from '../../criteria/operators/group';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
export declare class GroupOperandSurface extends CriteriaOperatorSurface<GroupOperator> {
    constructor(operator: GroupOperator, parent: any, fieldListProvider: any, path: any);
    change(type: any, surface: any): void;
    remove(surface: CriteriaOperatorSurface<CriteriaOperator>): void;
    create(type: any): void;
    get rightPart(): CriteriaOperatorSurface<CriteriaOperator>[];
    dispose(): void;
    templateName: string;
    operatorClass: string;
    operands: ko.ObservableArray<CriteriaOperatorSurface<CriteriaOperator>>;
    createItems: any;
}
