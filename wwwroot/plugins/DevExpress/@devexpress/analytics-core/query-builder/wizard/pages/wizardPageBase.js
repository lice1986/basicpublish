﻿/**
* DevExpress Analytics (query-builder\wizard\pages\wizardPageBase.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../../serializer/disposable';
import * as $ from 'jquery';
export class WizardPageBase extends Disposable {
    constructor() {
        super(...arguments);
        this.changeAlways = false;
        this._onChange = () => void 0;
    }
    dispose() {
        super.dispose();
        this._onChange = () => void 0;
    }
    commit() {
        return $.Deferred().resolve().promise();
    }
    onChange(callback) {
        this._onChange = callback;
    }
    initialize(state, stateChanged) {
        return $.Deferred().resolve().promise();
    }
    canNext() {
        return true;
    }
    canFinish() {
        return false;
    }
}