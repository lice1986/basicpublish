﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapTreeListController.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListItemViewModel, ITreeListController, TreeListRootItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal-native';
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils-native';
export declare class DocumentMapTreeListController implements ITreeListController {
    itemsFilter(item: IDataMemberInfo): boolean;
    hasItems(item: IDataMemberInfo): boolean;
    canSelect(value: TreeListItemViewModel): boolean;
    select(value: TreeListItemViewModel): void;
    showIconsForChildItems(): boolean;
    selectedItem: TreeListItemViewModel;
    clickHandler: (item: TreeListItemViewModel) => void;
    root: TreeListRootItemViewModel;
}
