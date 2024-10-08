﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandHolder.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportSurface } from '../controls/xrReport';
import { MultiColumnSurface } from './multiColumn';
import { BandSurface } from './xrBand';
import { VerticalBandsContainerSurface } from './_vericalBandContainer';
export interface IBandsHolder {
    bands: ko.ObservableArray<BandSurface>;
    verticalBandsContainer?: VerticalBandsContainerSurface;
}
export declare class BandsHolder extends Disposable implements IBandsHolder {
    private _container;
    dispose(): void;
    private _createBandsMapCollection;
    private _addHorizontalBand;
    private _addVerticalBand;
    initialize(bands: any): void;
    constructor(_container: ReportSurface | BandSurface);
    getHeight(): number;
    getTotalHeight(): number;
    getBandAbsolutePositionY(band: BandSurface): number;
    checkUnderCursor(): boolean;
    bands: ko.ObservableArray<BandSurface>;
    verticalBandsContainer: VerticalBandsContainerSurface;
    multiColumn: ko.Computed<MultiColumnSurface>;
}
