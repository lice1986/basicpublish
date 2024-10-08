﻿/**
* DevExpress Analytics (widgets\treelist\_treelistController.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class TreeListController {
    constructor() {
        this.selectedItem = null;
    }
    dispose() {
        this.selectedItem = null;
    }
    itemsFilter(item, path) {
        return true;
    }
    hasItems(item) {
        return item.specifics !== 'none' && (item.specifics === 'List' || item.specifics === 'ListSource' || item.isList === true);
    }
    canSelect(value) {
        return !value.hasItems;
    }
    select(value) {
        if (this.canSelect(value)) {
            this.selectedItem && (this.selectedItem.isSelected = false);
            this.selectedItem = value;
            value.isSelected = true;
        }
    }
    isDraggable(item) {
        return false;
    }
}
