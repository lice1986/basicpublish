﻿/**
* DevExpress Analytics (core\widgets\bordereditor\_bordereditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
export class BordersModel extends Disposable {
    constructor(object) {
        super();
        this.left = ko.observable(false);
        this.right = ko.observable(false);
        this.top = ko.observable(false);
        this.bottom = ko.observable(false);
        this.disabled = object.disabled || ko.observable(false);
        this.value = object.value;
        this.updateModel(object.value());
        this._disposables.push(object.value.subscribe((newVal) => {
            this.updateModel(newVal);
        }));
    }
    _setAllValues(value) {
        this.left(value), this.bottom(value), this.right(value), this.top(value);
    }
    setValue(name) {
        if (this.disabled())
            return;
        this[name](!this[name]());
        this.updateValue();
    }
    setAll() {
        if (this.disabled())
            return;
        this._setAllValues(true);
        this.updateValue();
    }
    setNone() {
        if (this.disabled())
            return;
        this._setAllValues(false);
        this.updateValue();
    }
    updateModel(value) {
        const val = value || 'None';
        if (val.indexOf('All') !== -1) {
            this._setAllValues(true);
        }
        else if (val.indexOf('None') !== -1) {
            this._setAllValues(false);
        }
        else {
            this.left(val.indexOf('Left') !== -1);
            this.top(val.indexOf('Top') !== -1);
            this.right(val.indexOf('Right') !== -1);
            this.bottom(val.indexOf('Bottom') !== -1);
        }
    }
    updateValue() {
        const result = [];
        if (this.left() && this.right() && this.top() && this.bottom()) {
            result.push('All');
        }
        else if (!this.left() && !this.right() && !this.top() && !this.bottom()) {
            result.push('None');
        }
        else {
            this.left() ? result.push('Left') : null;
            this.right() ? result.push('Right') : null;
            this.top() ? result.push('Top') : null;
            this.bottom() ? result.push('Bottom') : null;
        }
        this.value(result.join(','));
    }
}
