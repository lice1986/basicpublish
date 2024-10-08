﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\operandSurfaceBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { IPropertyLocation } from '../../criteria/utils/propertyLocation';
export declare class OperandSurfaceBase<T extends CriteriaOperator> extends CriteriaOperatorSurface<T> {
    getRealParent(parent: any): any;
    getRealProperty(property: any): any;
    getPropertyName(parent: any, searchProperty: any): IPropertyLocation;
    getConvertableParameters(destinationSpecifics: string): any[];
    constructor(operator: T, parent: CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: any, path: any);
    get changeTypeItems(): {
        name: string;
        instance: any;
        localizationId: string;
    }[];
    canChange: boolean;
    canRemove: boolean;
    changeValueType: (type: any) => void;
}
