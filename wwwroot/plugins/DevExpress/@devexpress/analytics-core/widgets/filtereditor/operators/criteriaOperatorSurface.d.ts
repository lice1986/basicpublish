﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\criteriaOperatorSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
import { Disposable } from '../../../serializer/disposable';
import { FilterEditorHelper } from '../helpers/helper';
import { IItemsProvider } from '../../utils';
import { ICriteriaChangeOperator } from '../../criteria/utils/criteriaChangeOperator';
export declare class CriteriaOperatorSurface<T extends CriteriaOperator = CriteriaOperator> extends Disposable {
    _createLeftPartProperty(value: any): CriteriaOperatorSurface<CriteriaOperator>;
    createChildSurface(item: any, path?: any, actions?: any): CriteriaOperatorSurface<CriteriaOperator>;
    protected getDisplayType(): string;
    constructor(operator: T, parent: any, fieldListProvider: any, path: any);
    specifics: ko.Observable<string> | ko.Computed<string>;
    dataType: ko.Observable<string> | ko.Computed<string>;
    get items(): Array<ICriteriaChangeOperator>;
    get displayType(): string;
    get leftPart(): CriteriaOperatorSurface<CriteriaOperator>;
    get rightPart(): any;
    get css(): string;
    change(type: any, surface: any): void;
    remove(surface: any): void;
    isUpdated: ko.Observable<boolean>;
    popupService: any;
    canRemove: boolean;
    operatorType: ko.Observable<any>;
    parent: any;
    templateName: string;
    isSelected: ko.Observable<boolean> | ko.Computed<boolean>;
    operatorClass: string;
    helper: FilterEditorHelper;
    reverse: any;
    path: ko.Observable<string> | ko.Computed<string>;
    fieldListProvider: ko.Observable<IItemsProvider>;
    model: T;
}