﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_fieldListController.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler, IActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { IAction, IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListController, TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
export declare class FieldListController implements ITreeListController {
    private _actionProviders;
    private _fieldListActionWrapper;
    private _customizeFieldListActions;
    private _selectedItems;
    dispose(): void;
    constructor(actionProviders?: IActionsProvider[], fieldListActionWrapper?: (actions: IAction[]) => void, dragDropHandler?: DragDropHandler, customizeFieldListActions?: (item: IDataMemberInfo, actions: IAction[]) => void);
    itemsFilter(item: IDataMemberInfo): boolean;
    static isList(item: IDataMemberInfo): boolean;
    hasItems: typeof FieldListController.isList;
    select(item: TreeListItemViewModel): void;
    canSelect(item: TreeListItemViewModel): boolean;
    getActions(item: TreeListItemViewModel): IAction[];
    canMultiSelect(item: TreeListItemViewModel): any;
    multiSelect(item: TreeListItemViewModel, isShiftPressed?: boolean, isCtrlPressed?: boolean): void;
    isDraggable(item: TreeListItemViewModel): boolean;
    dragDropHandler: DragDropHandler;
    get selectedItem(): TreeListItemViewModel;
    set selectedItem(value: TreeListItemViewModel);
    selectedItems(): TreeListItemViewModel[];
    subscribeOnSelectedItemChange(callback: () => void): ko.Subscription;
}