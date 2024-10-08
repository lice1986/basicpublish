﻿/**
* DevExpress HTML/JS Reporting (designer\internal\parameterLayout\_parametersLayoutTreeListController.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
import { IAction } from '@devexpress/analytics-core/analytics-utils';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { IParameterContainer, ParameterPanelLayoutItem } from '../../dataObjects/parameters/layoutItems';
export declare class ParametersLayoutTreeListController extends ObjectStructureTreeListController {
    private _report;
    private _selectedItemModel;
    private _innerSwap;
    private _outerSwap;
    private _siblingsSwap;
    private _checkIndex;
    constructor(_report: IParameterContainer, _selectedItemModel: ko.Observable<ParameterPanelLayoutItem>);
    addItem(item: ParameterPanelLayoutItem): void;
    move(goUp?: boolean): void;
    delete(item?: ParameterPanelLayoutItem): void;
    getActions: (item: TreeListItemViewModel) => IAction[];
}
