﻿/**
* DevExpress Analytics (widgets\treelist\_treelistController.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Computed, Observable } from 'knockout';
import { IDataMemberInfo, IAction } from '../utils';
import { TreeListItemViewModel, TreeListRootItemViewModel } from './_treelistItem';
import { TreeListSearchOptions } from './_treeListSearchOptions';
export interface ITreeListController {
    itemsFilter: (item: IDataMemberInfo, path?: string, model?: TreeListItemViewModel) => boolean;
    hasItems: (item: IDataMemberInfo) => boolean;
    canSelect: (value: TreeListItemViewModel) => boolean;
    select: (value: TreeListItemViewModel) => void;
    canMultiSelect?: (value: TreeListItemViewModel) => boolean;
    multiSelect?: (value: TreeListItemViewModel, isShiftPressed: boolean, isCtrlPressed: boolean) => void;
    getActions?: (item: TreeListItemViewModel) => IAction[];
    subscribeOnActionsChanged?: (item: TreeListItemViewModel, callback: (items: IAction[]) => void) => () => void;
    subscribeOnVisibleChanged?: (item: TreeListItemViewModel, callback: (isFiltred: boolean) => void) => () => void;
    isDraggable?: (item: TreeListItemViewModel) => boolean;
    dblClickHandler?: (item: TreeListItemViewModel) => void;
    clickHandler?: (item: TreeListItemViewModel) => void;
    dragDropHandler?: any;
    root?: Observable<TreeListRootItemViewModel> | TreeListRootItemViewModel;
    selectedItems?: () => TreeListItemViewModel[];
    showIconsForChildItems?: (item?: TreeListItemViewModel) => boolean;
    textToSearch?: Observable<string> | Computed<string>;
    searchEnabled?: boolean;
    searchOptions?: TreeListSearchOptions;
    dispose?: () => void;
}
export declare class TreeListController implements ITreeListController {
    dispose(): void;
    itemsFilter(item: IDataMemberInfo, path?: string): boolean;
    hasItems(item: IDataMemberInfo): boolean;
    canSelect(value: TreeListItemViewModel): boolean;
    select(value: TreeListItemViewModel): void;
    isDraggable(item: TreeListItemViewModel): boolean;
    selectedItem: TreeListItemViewModel;
}