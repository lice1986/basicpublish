﻿/**
* DevExpress Analytics (query-builder\widgets\_rightPanelSwitcher.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
export class RightPanelSwitcher extends Disposable {
    constructor(collapsed, editableObj, visibleCondition = (_) => true, getDisplayName) {
        super();
        this.editableObj = editableObj;
        this.getDisplayName = getDisplayName;
        this._collapsed = collapsed;
        this._disposables.push(this.visible = ko.pureComputed(() => {
            return !this.disabled() && !this._collapsed();
        }));
        this._disposables.push(this.disabled = ko.pureComputed(() => {
            const disabled = !editableObj() || !visibleCondition(editableObj());
            if (disabled && !this._collapsed())
                this._collapsed(true);
            return disabled;
        }));
    }
    dispose() {
        super.dispose();
        this._collapsed = null;
    }
    toogle() {
        this._collapsed(!this._collapsed());
    }
    get title() {
        return this.getDisplayName(this.editableObj());
    }
}
