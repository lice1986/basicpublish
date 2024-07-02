﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_addon.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PopupService } from '../../../property-grid/internal/_popupService';
import { CriteriaOperatorSurface } from '../operators/criteriaOperatorSurface';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
import { Disposable } from '../../../serializer/disposable';
export declare class FilterEditorAddOn extends Disposable {
    private _filterPlaceHolder;
    private _popupService;
    private _action;
    private _updateActions;
    constructor(criteria: CriteriaOperatorSurface<CriteriaOperator>, popupService: PopupService, action: string, propertyName: any, templateName?: any);
    showPopup: (_: any, element: any) => void;
    popupContentTemplate: string;
    propertyName: string;
    target: CriteriaOperatorSurface<CriteriaOperator>;
    filterString: ko.Observable<string>;
    isFiltered: ko.Observable<boolean>;
}