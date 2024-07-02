﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapTreeListController.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class DocumentMapTreeListController {
    constructor() {
        this.clickHandler = (item) => void 0;
    }
    itemsFilter(item) {
        return true;
    }
    hasItems(item) {
        return item.isList === true;
    }
    canSelect(value) {
        return true;
    }
    select(value) {
        if (this.canSelect(value) && value !== this.selectedItem) {
            this.selectedItem && (this.selectedItem.isSelected = false);
            this.selectedItem = value;
            value.isSelected = true;
        }
    }
    showIconsForChildItems() {
        return false;
    }
}