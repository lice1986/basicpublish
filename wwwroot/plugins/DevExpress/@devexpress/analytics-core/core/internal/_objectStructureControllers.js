﻿/**
* DevExpress Analytics (core\internal\_objectStructureControllers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { Disposable } from '../../serializer/disposable';
export class ObjectStructureTreeListController extends Disposable {
    constructor(propertyNames, listPropertyNames) {
        super();
        this.selectedItem = null;
        this.itemsFilter = (item, path) => {
            const realPropertyName = item.name.split('.')[0];
            return propertyNames ? propertyNames.indexOf(realPropertyName) !== -1 || $.isNumeric(realPropertyName) : true;
        };
        this.hasItems = (item) => {
            const realPropertyName = item.name.split('.')[0];
            return item.isList || (listPropertyNames ? listPropertyNames.indexOf(realPropertyName) !== -1 : false);
        };
        this.getActions = (item) => {
            return item.data && item.data['innerActions'] || [];
        };
        this.select = (value) => {
            this.selectedItem && (this.selectedItem.isSelected = false);
            this.selectedItem = value;
            value.isSelected = true;
        };
        this.showIconsForChildItems = () => true;
    }
    dispose() {
        this.selectedItem = null;
    }
    canSelect(value) {
        return true;
    }
}
