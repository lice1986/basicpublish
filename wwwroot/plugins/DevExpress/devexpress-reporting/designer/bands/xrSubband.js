﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrSubband.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { pageBreak, printAcrossBands } from './metadata/bandsMetadata';
import { BandSurface, BandViewModel } from './xrBand';
export class SubBandViewModel extends BandViewModel {
    constructor(band, parent, serializer) {
        super(band, parent, serializer);
    }
    isPropertyDisabled(name) {
        if (name === pageBreak.propertyName)
            return this.controlType === 'SubBand' && this[printAcrossBands.propertyName] && this[printAcrossBands.propertyName]();
        else
            return super.isPropertyDisabled(name);
    }
    isAllowedParent(target) {
        return target instanceof BandViewModel;
    }
}
export class SubBandSurface extends BandSurface {
    constructor() {
        super(...arguments);
        this.leftMarginTemplate = 'dxrd-sub-band-coordinate-grid';
    }
    getAbsolutePositionY() {
        const y = super.getAbsolutePositionY();
        if (this.parent.bandsHolder.bands().indexOf(this) === 0) {
            return y + (this.parent.heightWithoutSubBands());
        }
        return y;
    }
    getBackgroundRect() {
        let top = 0, height = this._height();
        const parent = this.parent;
        const parentBands = ko.unwrap(parent.bandsHolder.bands);
        const parentBackgroundRect = ko.unwrap(parent.backgroundRect);
        top += (parentBackgroundRect.top + parentBackgroundRect.height);
        const bottom = parentBackgroundRect.bottom;
        const bandIndex = parentBands.indexOf(this);
        for (let i = 0; i < bandIndex; i++) {
            top += parentBands[i]._totalHeight();
        }
        if (top > bottom)
            height = 0;
        else if (top + height > bottom)
            height = bottom - top;
        return { top, bottom, height };
    }
    _initMultiColumn() {
        this._disposables.push(this.multiColumn = ko.computed(() => {
            if (this.parent.multiColumn && this.parent.multiColumn() && this.parent.multiColumn().haveColumns()) {
                return this.parent.multiColumn();
            }
        }));
    }
    get parent() {
        return this._getParent();
    }
}
