﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\operandPropertySurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandSurfaceBase } from './operandSurfaceBase';
import { OperandProperty } from '../../criteria/operators/property';
import { IDataMemberInfo } from '../../utils';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
export declare class OperandPropertySurface extends OperandSurfaceBase<OperandProperty> {
    private _displayName;
    _updateDisplayName(path: any, propertyName: any, displayName: any): void;
    _updateSpecifics(): void;
    constructor(operator: OperandProperty, parent: CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider?: any, path?: any);
    fieldsOptions: ko.Observable<any>;
    displayName: ko.Computed<string>;
    propertyName: ko.Observable<string>;
    specifics: ko.Observable<string>;
    dataType: ko.Observable<string>;
    get items(): any;
    get displayType(): any;
    valueType: ko.Observable<string>;
    changeProperty: (item: IDataMemberInfo) => void;
    templateName: string;
    operatorClass: string;
}