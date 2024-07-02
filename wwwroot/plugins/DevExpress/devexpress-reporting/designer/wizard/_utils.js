﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { GraphicsUnit } from './reportWizardState';
export function getFormattedValueInUnits(value, unit) {
    const format = unit === GraphicsUnit.Inch ? 2 : 1;
    return value.toFixed(format);
}
export class ListViewModel {
    constructor(caption) {
        this.caption = caption;
        this._items = ko.observableArray([]).extend({ deferred: true });
        this._refreshActiveItem = (previousActivItemIndex = -1) => {
            if (this.isEmpty) {
                this.activeItemArray.removeAll();
            }
            else if (previousActivItemIndex < 0) {
                this.activeItemArray.splice(0, 1, this._items()[0]);
            }
            else {
                if (previousActivItemIndex >= this._items().length) {
                    previousActivItemIndex = this._items().length - 1;
                }
                this.activeItemArray.splice(0, 1, this._items()[previousActivItemIndex]);
            }
        };
        this.activeItemArray = ko.observableArray([]).extend({ deferred: true });
    }
    get items() {
        return this._items();
    }
    get activeItem() {
        return this.activeItemArray().length === 1 ? this.activeItemArray()[0] : null;
    }
    set activeItem(value) {
        if (this._items().indexOf(value) > -1) {
            this.activeItemArray.splice(0, 1, value);
        }
    }
    add(item) {
        this._items.push(item);
        this.activeItemArray.splice(0, 1, item);
    }
    addRange(items) {
        this.setItems(this._items().concat(items));
    }
    removeActiveItem() {
        const index = this._items.indexOf(this.activeItemArray()[0]);
        this._items.remove(this.activeItemArray()[0]);
        this._refreshActiveItem(index);
    }
    removeAll() {
        this._items.removeAll();
        this.activeItemArray.removeAll();
    }
    setItems(items) {
        this._items(items);
        this.activeItemArray([this._items()[0]]);
        this._refreshActiveItem();
    }
    moveUp() {
        if (this.isMoveUpEnabled()) {
            const index = this._items.indexOf(this.activeItem);
            this.activeItemArray.removeAll();
            this._items.splice(index - 1, 2, this._items()[index], this._items()[index - 1]);
            this.activeItemArray.splice(0, 1, this._items()[index - 1]);
        }
    }
    moveDown() {
        if (this.isMoveDownEnabled()) {
            const index = this._items.indexOf(this.activeItem);
            this.activeItemArray.removeAll();
            this._items.splice(index, 2, this._items()[index + 1], this._items()[index]);
            this.activeItemArray.splice(0, 1, this._items()[index + 1]);
        }
    }
    get isEmpty() {
        return this._items().length === 0;
    }
    isMoveUpEnabled() {
        return this._items.indexOf(this.activeItemArray()[0]) > 0;
    }
    isMoveDownEnabled() {
        const index = this._items.indexOf(this.activeItemArray()[0]);
        return index > -1 && index < this._items().length - 1;
    }
}