﻿/**
* DevExpress Analytics (core\widgets\_dataMemberEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class DataMemberTreeListController {
    constructor() {
        this.selectedItem = null;
        this.suppressActions = true;
    }
    dispose() {
        this.selectedItem = null;
    }
    itemsFilter(item) {
        return item.specifics !== 'parameters' && (item.specifics === 'List' || item.specifics === 'ListSource' || item.isList === true || item.specifics === 'none');
    }
    hasItems(item) {
        return item.specifics !== 'none';
    }
    canSelect(value) {
        return (this.hasItems(value.data) && !!value.path && (value.data.specifics === 'List' || value.data.specifics === 'ListSource')) || value.data.specifics === 'none';
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
