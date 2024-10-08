﻿/**
* DevExpress Analytics (property-grid\widgets\editorsInfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '../../serializer/_utils';
export class EditorTemplates {
    constructor(_useDeferredRegistration = true) {
        this._useDeferredRegistration = _useDeferredRegistration;
        this._editorTemplates = {};
    }
    register(name, editorInfo) {
        if (!!this._editorTemplates[name] && !this._editorTemplates[name]._deferred) {
            throw Error(`Editor with name ${name} is already exists`);
        }
        else if (!this._editorTemplates[name]) {
            this._editorTemplates[name] = editorInfo;
        }
        else {
            delete this._editorTemplates[name]._deferred;
            extend(this._editorTemplates[name], editorInfo);
        }
    }
    unregister(name) {
        delete this._editorTemplates[name];
    }
    registerEditors(editors) {
        for (const name in editors)
            this.register(name, editors[name]);
    }
    getEditor(name) {
        if (!this._editorTemplates[name] && this._useDeferredRegistration) {
            this._editorTemplates[name] = { _deferred: true };
        }
        return this._editorTemplates[name];
    }
}
export const editorTemplates = new EditorTemplates();
