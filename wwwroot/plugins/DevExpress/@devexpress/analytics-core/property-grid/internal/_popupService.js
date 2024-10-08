﻿/**
* DevExpress Analytics (property-grid\internal\_popupService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export class PopupService {
    constructor() {
        this.data = ko.observable();
        this.title = ko.observable();
        this.visible = ko.observable(false);
        this.disabled = ko.observable(false);
        this.actions = ko.observableArray([]);
        this.target = ko.observable();
    }
}
