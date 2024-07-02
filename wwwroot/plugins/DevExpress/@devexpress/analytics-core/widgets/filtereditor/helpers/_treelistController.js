﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_treelistController.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class FilterEditorTreeListController {
    constructor(selectedItem) {
        this.selectedItem = selectedItem;
    }
    itemsFilter(item) {
        return true;
    }
    hasItems(item) {
        return item.specifics !== 'none' && (item.specifics !== 'List' && item.isList === true);
    }
    canSelect(value) {
        return !value.data.isList || (value.data.isList === true && value.data.specifics === 'List');
    }
    select(value) {
        if (this.canSelect(value)) {
            this.selectedItem(value.data);
            value.isSelected = true;
        }
    }
    dispose() {
        this.selectedItem = null;
    }
    isDraggable(item) {
        return false;
    }
}