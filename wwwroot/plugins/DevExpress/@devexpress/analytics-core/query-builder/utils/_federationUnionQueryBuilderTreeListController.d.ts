﻿/**
* DevExpress Analytics (query-builder\utils\_federationUnionQueryBuilderTreeListController.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { TreeListController } from '../../widgets/treelist/_treelistController';
import { TreeListItemViewModel } from '../../widgets/treelist/_treelistItem';
import { IDataMemberInfo } from '../../widgets/utils';
export declare class FederatedUnionQueryBuilderTreeListController extends TreeListController {
    dragDropHandler: DragDropHandler;
    dblClickHandler: (item: TreeListItemViewModel) => void;
    itemsFilter(item: IDataMemberInfo, path?: string, model?: TreeListItemViewModel): boolean;
    isDraggable(item: TreeListItemViewModel): boolean;
    constructor(dragDropHandler: DragDropHandler, dblClickHandler: (item: TreeListItemViewModel) => void);
}
export declare class FederatedTransformQueryBuilderTreeListController extends FederatedUnionQueryBuilderTreeListController {
    itemsFilter(item: IDataMemberInfo, path: string, model: TreeListItemViewModel): boolean;
    hasItems(item: IDataMemberInfo): boolean;
}