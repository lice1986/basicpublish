﻿/**
* DevExpress Analytics (query-builder\wizard\pages\__wrappedWizardPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { Disposable } from '../../../serializer/disposable';
import { __loadingStateFunctionName } from '../internal/_constants';
export class _WrappedWizardPage extends Disposable {
    constructor(pageId, page, template, description) {
        super();
        this.pageId = pageId;
        this.page = page;
        this.template = template;
        this.description = description;
        this._isInitialized = false;
        this._initDef = null;
        this.isChanged = true;
        if (page.onChange) {
            this.onChange = (callback) => page.onChange(callback);
        }
    }
    dispose() {
        this.onChange = null;
        this[__loadingStateFunctionName] = null;
        this.page.dispose();
        this._initDef && this._initDef.reject();
        this._initDef = null;
    }
    resetCommitedState() {
        this._lastCommitedState = null;
    }
    commit() {
        return this.page.commit().done((result) => {
            this.isChanged = JSON.stringify(this._lastCommitedState) !== JSON.stringify(result);
            this._lastCommitedState = result;
        });
    }
    initialize(state, force = false, stateChanged = false) {
        this._initDef && this._initDef.reject();
        this._initDef = $.Deferred();
        if (!this._isInitialized || force) {
            this._isInitialized = true;
            this.page.initialize(state, stateChanged).fail(() => {
                this._isInitialized = false;
                this._initDef && this._initDef.reject();
            }).done((result) => {
                this._initDef && this._initDef.resolve(result);
            });
        }
        else {
            this._initDef.resolve();
        }
        return this._initDef.promise();
    }
}
