﻿/**
* DevExpress Analytics (widgets\treelist\_ko_treelistUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DefaultTreeListItemFactory, ITreeListItemFactory, ITreeListOptions, TreeListItemViewModel, TreeListRootItemViewModel } from './_treelistItem';
import { CodeResolver } from '../../property-grid/internal/_codeResolver';
export declare function wrapTreeListOptionsWithKo(options: ITreeListOptions): ITreeListOptions;
export declare class KoTreeListItemFactory extends DefaultTreeListItemFactory implements ITreeListItemFactory {
    createRootItem(options: ITreeListOptions, path?: ko.MaybeSubscribable<string | string[]>, onItemsVisibilityChanged?: () => void, rtl?: boolean): TreeListRootItemViewModel;
    createItem(options: ITreeListOptions, path?: string[], onItemsVisibilityChanged?: () => void, rtl?: boolean, resolver?: CodeResolver): TreeListItemViewModel;
}