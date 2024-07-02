﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrMarginBands.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { BandSurface, BandViewModel } from './xrBand';
export class TopMarginBand extends BandViewModel {
    initHeight() {
        this.height = this.parentModel() && this.root.margins.top || ko.observable(0);
        super.initHeight();
    }
}
export class BottomMarginBand extends BandViewModel {
    initHeight() {
        this.height = this.parentModel() && this.root.margins.bottom || ko.observable(0);
        super.initHeight();
    }
}
export class BottomMarginSurface extends BandSurface {
    getBackgroundRect() {
        const top = this.parent.pageHeight() - this._height(), bottom = undefined, height = this._height();
        return { top, bottom, height };
    }
    get parent() {
        return this._getParent();
    }
}