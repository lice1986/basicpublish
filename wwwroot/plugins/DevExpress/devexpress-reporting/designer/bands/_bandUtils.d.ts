﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IArea } from '@devexpress/analytics-core/analytics-elements';
import { BandSurface, BandViewModel } from './xrBand';
import { VerticalBandSurface } from './xrVerticalBand';
import { IBandsHolder } from './_bandHolder';
export declare function sortBands(band1: any, band2: any): number;
export declare function setMarkerWidth(bandHolder: IBandsHolder, levelCount: any, currentLevel?: number): void;
export declare function getLevelCount(bandHolder: IBandsHolder): number;
export declare function insertBand(bands: ko.ObservableArray<BandViewModel>, newBand: BandViewModel): void;
export declare function initLevels(bands: BandViewModel[]): void;
export declare function generateArray(allbands: BandViewModel[], controlType: string, newLevel?: number): any[];
export declare function _getUnitAbsoluteRect(bandSurface: BandSurface | VerticalBandSurface, getPositionInParent: Function): IArea;
