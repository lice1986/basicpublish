﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrPageBand.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandSurface } from './xrBand';
export class PageFooterSurface extends BandSurface {
    getBackgroundRect() {
        const bottom = undefined, height = this._height(), top = this.parent.pageHeight() - this._totalHeight() - this.parent.margins.bottom();
        return { top, bottom, height };
    }
    get parent() {
        return this._getParent();
    }
}
