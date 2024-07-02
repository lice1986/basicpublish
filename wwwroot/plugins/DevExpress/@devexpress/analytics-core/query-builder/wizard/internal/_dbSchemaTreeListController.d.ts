﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_dbSchemaTreeListController.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListController } from '../../../widgets/treelist/_treelistController';
import { IDataMemberInfo, IAction } from '../../../widgets/utils';
import { TreeListItemViewModel } from '../../../widgets/treelist/_treelistItem';
import { TreeListSearchOptions } from '../../../widgets/treelist/_treeListSearchOptions';
export declare class DBSchemaTreeListController extends TreeListController {
    private _customizeDBSchemaTreeListActions;
    searchOptions: TreeListSearchOptions;
    constructor(_customizeDBSchemaTreeListActions: (item: IDataMemberInfo, actions: IAction[]) => void, searchOptions?: TreeListSearchOptions);
    getActions(value: TreeListItemViewModel): IAction[];
    canSelect(value: TreeListItemViewModel): boolean;
}
