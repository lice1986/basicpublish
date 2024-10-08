﻿/**
* DevExpress Analytics (serializer\eventManager.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from './disposable';
export class EventManager extends Disposable {
    constructor() {
        super(...arguments);
        this._handlers = {};
    }
    dispose() {
        super.dispose();
        this._handlers = {};
    }
    call(type, args) {
        if (type in this._handlers) {
            const currentHandlers = [...this._handlers[type]];
            currentHandlers.forEach(x => x(args));
        }
    }
    addHandler(type, listener) {
        if (!(type in this._handlers)) {
            this._handlers[type] = [];
        }
        this._handlers[type].push(listener);
    }
    removeHandler(type, listener) {
        const index = this._handlers[type].indexOf(listener);
        if (index !== -1) {
            this._handlers[type].splice(index, 1);
        }
    }
    on(type, listener) {
        this.addHandler(type, listener);
        return () => {
            if (!this._handlers[type])
                return;
            this.removeHandler(type, listener);
        };
    }
}
export class EventPropertyManager extends EventManager {
    call(type, _args) {
        if (_args && type === 'propertyChanged' || type === `${_args === null || _args === void 0 ? void 0 : _args.propertyName}Changed`) {
            const args = _args;
            const eventName = `${args.propertyName}Changed`;
            super.call(eventName, args);
            super.call('propertyChanged', args);
        }
        else {
            super.call(type, _args);
        }
    }
}
