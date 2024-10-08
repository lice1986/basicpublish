﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_treelistController.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ITreeListController } from '../../treelist/_treelistController';
import { IDataMemberInfo } from '../../utils';
import { TreeListItemViewModel } from '../../treelist/_treelistItem';
export declare class FilterEditorTreeListController implements ITreeListController {
    selectedItem: ko.Observable<IDataMemberInfo>;
    constructor(selectedItem: ko.Observable<IDataMemberInfo>);
    itemsFilter(item: IDataMemberInfo): boolean;
    hasItems(item: IDataMemberInfo): boolean;
    canSelect(value: TreeListItemViewModel): boolean;
    select(value: TreeListItemViewModel): void;
    dispose(): void;
    isDraggable(item: TreeListItemViewModel): boolean;
}
