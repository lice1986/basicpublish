﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wizardAction.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export class WizardAction {
    constructor(handler, text) {
        this.handler = handler;
        this.isVisible = ko.observable(true);
        this.isDisabled = ko.observable(false);
        this.text = text;
    }
}
