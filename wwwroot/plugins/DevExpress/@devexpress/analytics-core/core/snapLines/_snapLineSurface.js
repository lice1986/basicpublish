﻿/**
* DevExpress Analytics (core\snapLines\_snapLineSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export class SnapLineSurface {
    constructor() {
        this._position = ko.observable(SnapLineSurface._blankPosition);
    }
    transform() {
        const position = this._position();
        return 'matrix(' + position.width + ', 0, 0, ' + position.height + ', ' + position.left + ', ' + position.top + ')';
    }
    updatePosition(position) {
        this._position(position);
    }
    reset() {
        this.updatePosition(SnapLineSurface._blankPosition);
    }
}
SnapLineSurface._blankPosition = { top: 0, left: 0, width: 0, height: 0, };