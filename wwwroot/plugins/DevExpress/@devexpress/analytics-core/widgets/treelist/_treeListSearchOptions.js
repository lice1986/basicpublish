﻿/**
* DevExpress Analytics (widgets\treelist\_treeListSearchOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SearchMode } from '../../property-grid/widgets/internal/_utils';
export class TreeListSearchOptions {
    constructor() {
        this.globalMatch = true;
        this.autoLoadItems = true;
        this.canUseRegex = false;
        this.caseSensitive = false;
        this.searchMode = SearchMode.contains;
        this.searchTimeout = 500;
        this.searchExpr = 'displayName';
        this.searchBoxTemplate = 'dx-treelist-searchbox';
    }
}
