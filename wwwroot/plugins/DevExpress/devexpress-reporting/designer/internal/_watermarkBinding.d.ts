﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_watermarkBinding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandSurface } from '../bands/xrBand';
import { ReportSurface } from '../controls/xrReport';
export interface WatermarkBindingOptions {
    band: BandSurface;
    reportSurface: ReportSurface;
    forLeftMargin: boolean;
    image: string;
    transparency: number;
    viewMode: string;
    align: string;
    tiling: boolean;
}
