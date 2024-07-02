﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_reportDesignerControlsHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export class ReportDesignerControlsHelper extends Disposable {
    constructor(helper) {
        super();
        this.getControls = (context) => helper() && helper().getControls(context);
        this.getControlByName = (name) => helper() && helper().getControlByName(name);
        this._disposables.push(this.allControls = ko.computed(() => helper() && helper().allControls() || []));
    }
}
