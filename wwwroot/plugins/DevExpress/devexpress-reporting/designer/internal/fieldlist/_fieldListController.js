﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_fieldListController.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
class ItemsInRangeEnumerator {
    constructor(start, end) {
        this._start = start;
        this._end = end;
    }
    _findCommonParent(current, last) {
        return current === last ? current :
            this._findCommonParent(current.parent || current, last.parent || last);
    }
    _selectItemsBetweenShiftSelection(parent) {
        const items = parent.items;
        for (let i = 0; i < items.length; i++) {
            if (this._isSelectedRangeEnded)
                return;
            const item = items[i];
            this._addToSelectedItems(item);
            if (item === this._start || item === this._end) {
                this._isSelectedRangeEnded = this._isInSelectedRage;
                this._isInSelectedRage = !this._isInSelectedRage;
                this._addToSelectedItems(item);
            }
            if (!this._isSelectedRangeEnded && !item.collapsed) {
                this._selectItemsBetweenShiftSelection(item);
            }
        }
    }
    _addToSelectedItems(item) {
        if (this._isInSelectedRage) {
            this._callBack(item);
        }
    }
    enumerate(callBack) {
        this._isInSelectedRage = false;
        this._isSelectedRangeEnded = false;
        this._callBack = callBack;
        this._selectItemsBetweenShiftSelection(this._findCommonParent(this._start.parent, this._end.parent));
    }
}
export class FieldListController {
    constructor(actionProviders = [], fieldListActionWrapper, dragDropHandler, customizeFieldListActions = null) {
        this._selectedItems = ko.observableArray([]);
        this.hasItems = FieldListController.isList;
        this._actionProviders = actionProviders;
        this._fieldListActionWrapper = fieldListActionWrapper;
        this.dragDropHandler = dragDropHandler;
        this._customizeFieldListActions = customizeFieldListActions;
    }
    dispose() {
        this._actionProviders.splice(0);
        this._selectedItems.splice(0);
    }
    itemsFilter(item) {
        return item['isCalculated'] === true || item.specifics !== 'none';
    }
    static isList(item) {
        if (!item)
            return false;
        return item['isCalculated'] ? false : item.specifics === 'List' || item.specifics === 'ListSource' || item.isList === true;
    }
    select(item) {
        this.selectedItem && (this.selectedItem.isSelected = false);
        this.selectedItem = item;
        item.isSelected = true;
    }
    canSelect(item) {
        return true;
    }
    getActions(item) {
        let result = [];
        (this._actionProviders || []).forEach(actionsProvider => {
            const actions = actionsProvider.getActions(item);
            if (this._fieldListActionWrapper) {
                this._fieldListActionWrapper(actions);
            }
            result.push.apply(result, actions);
        });
        const getActionPosition = (action) => {
            return action.position === undefined ? 1 : action.position;
        };
        result = $.extend(true, [], result.sort((x, y) => getActionPosition(x) - getActionPosition(y)));
        this._customizeFieldListActions && this._customizeFieldListActions(item.data, result);
        return result;
    }
    canMultiSelect(item) {
        const path = new PathRequest(item.path).path;
        const isSelectedItemCanMultiSelect = !this.selectedItem || this.selectedItem === item || this.canMultiSelect(this.selectedItem);
        return path.length !== 0 && isSelectedItemCanMultiSelect;
    }
    multiSelect(item, isShiftPressed = false, isCtrlPressed = false) {
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
            this.selectedItem.isMultiSelected = true;
        }
        if (isShiftPressed) {
            const lastSelectedItem = this.selectedItem;
            if (!isCtrlPressed) {
                this._selectedItems.peek().forEach(element => element.isMultiSelected = false);
                this._selectedItems([]);
            }
            new ItemsInRangeEnumerator(item, lastSelectedItem).enumerate(element => {
                if (!element.isMultiSelected) {
                    this._selectedItems.push(element);
                    element.isMultiSelected = true;
                }
            });
            if (this._selectedItems.peek()[0] === lastSelectedItem) {
                this._selectedItems.reverse();
            }
        }
        else if (this._selectedItems.peek().indexOf(item) > -1) {
            this._selectedItems.remove(item);
            item.isMultiSelected = false;
        }
        else {
            this._selectedItems.push(item);
            item.isMultiSelected = true;
        }
    }
    isDraggable(item) {
        return true;
    }
    get selectedItem() {
        return this._selectedItems()[this._selectedItems().length - 1];
    }
    set selectedItem(value) {
        this._selectedItems().forEach(item => item.isMultiSelected = false);
        this._selectedItems.splice(0);
        this._selectedItems.push(value);
    }
    selectedItems() {
        return this._selectedItems();
    }
    subscribeOnSelectedItemChange(callback) {
        return this._selectedItems.subscribe(() => callback());
    }
}