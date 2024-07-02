﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_printAcrossBandsPlaceHolder.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { BandSurface } from './xrBand';
export declare class PrintAcrossBandsPlaceHolder extends Disposable {
    band: BandSurface;
    private findNextUntransparentSiblingBand;
    private findFirstNonAcrossBand;
    constructor(band: BandSurface);
    get bandModel(): import("./xrBand").BandViewModel;
    isVisible: ko.Computed<boolean>;
    absolutePositionY: ko.Computed<number>;
    height: ko.Computed<number>;
}
