﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_printAcrossBandsPlaceHolder.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { isVerticalBand } from '../controls/utils/_controlTypes';
export class PrintAcrossBandsPlaceHolder extends Disposable {
    constructor(band) {
        super();
        this.band = band;
        this._disposables.push(this.isVisible = ko.computed(() => {
            return band.printAcrossBands() && !this.bandModel.parentModel().bands().filter(x => isVerticalBand(x.controlType)).length;
        }), this.absolutePositionY = ko.computed(() => {
            const subbandsWithoutPrintAcrossBands = band.bandsHolder.bands().filter(subband => !subband.printAcrossBands());
            if (subbandsWithoutPrintAcrossBands.length > 0) {
                return subbandsWithoutPrintAcrossBands[0].absolutePosition.y();
            }
            let nextUntransparentSiblingBand = this.findNextUntransparentSiblingBand(band);
            if (!nextUntransparentSiblingBand) {
                nextUntransparentSiblingBand = this.findNextUntransparentSiblingBand(band.parent);
            }
            return nextUntransparentSiblingBand && nextUntransparentSiblingBand.absolutePosition.y();
        }), this.height = ko.computed(() => {
            const firstBandWithoutAcross = this.findFirstNonAcrossBand();
            return firstBandWithoutAcross ? (firstBandWithoutAcross.absolutePosition.y() - this.absolutePositionY()) : 0;
        }));
    }
    findNextUntransparentSiblingBand(band) {
        const currentBandIndex = band.parent.bandsHolder.bands().indexOf(band);
        return band.parent.bandsHolder.bands().filter((band, index) => (!band.printAcrossBands || band.printAcrossBands && !band.printAcrossBands()) && index > currentBandIndex)[0];
    }
    findFirstNonAcrossBand() {
        const isSubband = this.bandModel.controlType === 'SubBand';
        const bandHolder = isSubband ? this.band.parent.parent['bandsHolder'] : this.band.parent.bandsHolder;
        let bandsWithoutAcross = [];
        if (this.bandModel.controlType === 'GroupHeaderBand' || (isSubband && this.bandModel.parentModel().controlType === 'GroupHeaderBand')) {
            const groupHeaderLevel = isSubband ? this.bandModel.parentModel()['level']() : this.bandModel.level();
            bandsWithoutAcross = bandHolder.bands().filter(_band => (_band.getControlModel().controlType === 'GroupFooterBand' && _band.getControlModel().level() > groupHeaderLevel)
                || _band.getControlModel().controlType === 'PageFooterBand'
                || _band.getControlModel().controlType === 'ReportFooterBand'
                || _band.getControlModel().controlType === 'BottomMarginBand');
        }
        else if (this.bandModel.controlType === 'PageHeaderBand' || (isSubband && this.bandModel.parentModel().controlType === 'PageHeaderBand')) {
            bandsWithoutAcross = bandHolder.bands().filter(_band => (_band.getControlModel().controlType === 'BottomMarginBand'));
        }
        if (bandsWithoutAcross.length > 0) {
            return bandsWithoutAcross[0];
        }
    }
    get bandModel() {
        return this.band.getControlModel();
    }
}
