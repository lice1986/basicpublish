﻿/**
* DevExpress Analytics (property-grid\internal\_codeResolver.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { guid } from '../../undo-engine/_utils';
export class CodeResolver {
    constructor() {
        this._queue = [];
        this._queueObj = {};
        this._done = [];
        this._doneOnce = [];
    }
    clear() {
        this._queue = [];
        this._queueObj = {};
    }
    done(callback) {
        this._done.push(callback);
    }
    doneOnce(callback) {
        this._doneOnce.push(callback);
    }
    _executeNext(id = this._queue[0]) {
        delete this._queueObj[id];
        while (this._queue.length > 0 && !this._queueObj[this._queue[0]]) {
            this._queue.splice(0, 1);
        }
        if (this._queue.length !== 0) {
            this._queueObj[this._queue[0]]();
        }
        else {
            for (let i = 0; i < this._done.length; i++) {
                this._done[i]();
            }
            do {
                const doOnceCallback = this._doneOnce.pop();
                doOnceCallback && doOnceCallback();
            } while (this._doneOnce.length);
        }
    }
    execute(func, time = 0) {
        const id = guid();
        const $deferred = $.Deferred();
        if (time) {
            this._queue.push(id);
            this._queueObj[id] = () => {
                if (!this._queueObj[id])
                    return this._executeNext(id);
                setTimeout(() => {
                    this._queueObj[id] && $deferred.resolve(func());
                    this._executeNext(id);
                }, time);
            };
            if (this._queue.length === 1) {
                this._queueObj[this._queue[0]]();
            }
        }
        else {
            $deferred.resolve(func());
        }
        return {
            dispose: () => (delete this._queueObj[id], $deferred.reject()),
            force: () => (delete this._queueObj[id], $deferred.resolve(func())),
            doNext: () => (this._queue.splice(0, 0, id)),
            $promise: $deferred.promise()
        };
    }
}
export const globalResolver = new CodeResolver();
