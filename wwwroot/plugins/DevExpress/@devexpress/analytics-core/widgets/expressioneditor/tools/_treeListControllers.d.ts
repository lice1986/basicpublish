﻿/**
* DevExpress Analytics (widgets\expressioneditor\tools\_treeListControllers.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListController } from '../../treelist/_treelistController';
import { TreeListItemViewModel } from '../../treelist/_treelistItem';
import { IAction, IDataMemberInfo } from '../../utils';
export declare class ExpressionEditorTreeListController extends TreeListController {
    fieldName: ko.Computed<string> | string;
    putSelectionHandler: (item: TreeListItemViewModel, element: any) => void;
    selectionHandler?: (item: TreeListItemViewModel) => void;
    customFilter?: (path: string) => boolean;
    constructor(fieldName: ko.Computed<string> | string, putSelectionHandler: (item: TreeListItemViewModel, element: any) => void, selectionHandler?: (item: TreeListItemViewModel) => void, customFilter?: (path: string) => boolean);
    itemsFilter(item: IDataMemberInfo, path: string): boolean;
    select(value: TreeListItemViewModel): void;
    getActions(item: TreeListItemViewModel): IAction[];
    canSelect(value: TreeListItemViewModel): boolean;
}
export declare class ExpressionEditorParametersTreeListController extends TreeListController {
    customFilter: (item: IDataMemberInfo) => boolean;
    putSelectionHandler: (selectedItemPath: string, element: any) => void;
    selectionHandler?: (item: TreeListItemViewModel) => void;
    constructor(customFilter: (item: IDataMemberInfo) => boolean, putSelectionHandler: (selectedItemPath: string, element: any) => void, selectionHandler?: (item: TreeListItemViewModel) => void);
    itemsFilter(item: IDataMemberInfo): boolean;
    select(value: TreeListItemViewModel): void;
    getActions(item: TreeListItemViewModel): IAction[];
    canSelect(value: TreeListItemViewModel): boolean;
}
