﻿/**
* DevExpress Analytics (core\widgets\_dataMemberEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ITreeListController } from '../../widgets/treelist/_treelistController';
import { IDataMemberInfo } from '../../widgets/utils';
import { TreeListItemViewModel } from '../../widgets/treelist/_treelistItem';
export declare class DataMemberTreeListController implements ITreeListController {
    dispose(): void;
    itemsFilter(item: IDataMemberInfo): boolean;
    hasItems(item: IDataMemberInfo): boolean;
    canSelect(value: TreeListItemViewModel): boolean;
    select(value: TreeListItemViewModel): void;
    isDraggable(item: TreeListItemViewModel): boolean;
    selectedItem: TreeListItemViewModel;
    suppressActions: boolean;
}
