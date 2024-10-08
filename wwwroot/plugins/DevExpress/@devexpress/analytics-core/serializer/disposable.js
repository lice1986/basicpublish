﻿/**
* DevExpress Analytics (serializer\disposable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class Disposable {
    constructor() {
        this._disposables = [];
        this.isDisposing = false;
    }
    disposeObservableArray(array) {
        if (array) {
            array().forEach((item) => { item.dispose && item.dispose(); });
        }
    }
    resetObservableArray(array) {
        if (array)
            array([]);
    }
    disposeArray(array) {
        if (array) {
            array.forEach((item) => { item.dispose && item.dispose(); });
            array.splice(0, array.length);
        }
    }
    addDisposable(...disposables) {
        this._disposables.push(...disposables.map(x => {
            if (!x)
                return x;
            if ('dispose' in x)
                return x;
            else {
                return { dispose: x };
            }
        }));
    }
    dispose() {
        if (!this.isDisposing) {
            this.isDisposing = true;
            (this._disposables || []).reverse().forEach(x => x && x.dispose && x.dispose());
            this._disposables = [];
        }
    }
    removeProperties() {
        Object.keys(this).forEach((propertyName) => {
            delete this[propertyName];
        });
    }
}
