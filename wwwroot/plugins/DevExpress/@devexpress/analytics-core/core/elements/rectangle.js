﻿/**
* DevExpress Analytics (core\elements\rectangle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export class Rectangle {
    constructor(left = 0, top = 0, width = 0, height = 0) {
        this.left = ko.observable(0);
        this.top = ko.observable(0);
        this.width = ko.observable(0);
        this.height = ko.observable(0);
        this.className = 'dxrd-drag-helper-item';
        this.left(left);
        this.top(top);
        this.width(width);
        this.height(height);
    }
}