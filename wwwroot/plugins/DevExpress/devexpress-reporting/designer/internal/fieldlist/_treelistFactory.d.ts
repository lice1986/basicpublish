﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_treelistFactory.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CodeResolver } from '@devexpress/analytics-core/analytics-internal';
import { ITreeListOptions, TreeListItemViewModel, KoTreeListItemFactory } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare class FieldListItemFactory extends KoTreeListItemFactory {
    createItem(options: ITreeListOptions, path?: string[], onItemsVisibilityChanged?: () => undefined, rtl?: boolean, resolver?: CodeResolver): TreeListItemViewModel;
    renameInProgress: boolean;
}
