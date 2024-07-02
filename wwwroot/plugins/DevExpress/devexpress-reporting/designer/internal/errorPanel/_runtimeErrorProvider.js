﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_runtimeErrorProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export class RuntimeErrorProvider {
    constructor() {
        this.errors = ko.observableArray();
    }
    collectErrors() { }
}
