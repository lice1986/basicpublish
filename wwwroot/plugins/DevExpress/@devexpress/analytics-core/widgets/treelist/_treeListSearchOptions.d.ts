﻿/**
* DevExpress Analytics (widgets\treelist\_treeListSearchOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ITreeListSearchOptions } from './_treelistItem';
import { SearchMode } from '../../property-grid/widgets/internal/_utils';
export declare class TreeListSearchOptions implements ITreeListSearchOptions {
    globalMatch: boolean;
    autoLoadItems: boolean;
    canUseRegex: boolean;
    caseSensitive: boolean;
    searchMode: SearchMode;
    searchTimeout: number;
    searchExpr: string;
    searchBoxTemplate: string;
}