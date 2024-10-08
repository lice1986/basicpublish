﻿/**
* DevExpress Analytics (accessibility\_treeListKeyboardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase } from './_controlElementBase';
import { ListKeyboardHelper } from './_listKeyboardHelper';
export class TreeListKeyboardHelper extends ListKeyboardHelper {
    constructor(_rootHolder) {
        super();
        this._rootHolder = _rootHolder;
        this.controlElementClassName = 'dx-accessibility-treelist-item';
    }
    _setFocusToParentNode(item, index) {
        let offset = 1;
        const parentItems = item.parent.items;
        const indexOfParent = parentItems.indexOf(item);
        const getChildCount = (item, _offset) => {
            if (item.hasItems && !item.collapsed) {
                item.items.forEach(element => {
                    _offset += getChildCount(element, 0);
                });
            }
            _offset += 1;
            return _offset;
        };
        for (let i = 0; i < indexOfParent; i++) {
            offset += getChildCount(parentItems[i], 0);
        }
        this.changeFocus(index - offset);
    }
    _toggleCollapsed(item, model) {
        this.startIndex = this.getIndexByElement(item);
        model.toggleCollapsed();
    }
    _toggleSelected(el) {
        this._getItemModel(el).toggleSelected();
    }
    _getItemModel(element) {
        return this._rootHolder.root.store.getItem(element.id);
    }
    createControlElement(element, index) {
        return new AccessibilityControlElementBase(element);
    }
    itemHandleLeftArrowKey(e, index) {
        const item = this._getItemModel(e.target);
        if (item.hasItems && !item.collapsed) {
            this._toggleCollapsed(e.target, item.getViewModel());
        }
        else {
            this._setFocusToParentNode(item, index);
        }
        return true;
    }
    itemHandleRightArrowKey(e, index) {
        const item = this._getItemModel(e.target);
        if (item.hasItems) {
            if (item.collapsed)
                this._toggleCollapsed(e.target, item.getViewModel());
            else
                this.changeFocus(index + 1, false);
        }
        return true;
    }
    itemHandleEnterKey(e, index) {
        this._toggleSelected(e.target);
        return true;
    }
    itemHandleSpaceKey(e, index) {
        this._toggleSelected(e.target);
        return true;
    }
    clickHandler(e, index) {
        super.clickHandler(e, index);
        this.startIndex = index;
    }
}
