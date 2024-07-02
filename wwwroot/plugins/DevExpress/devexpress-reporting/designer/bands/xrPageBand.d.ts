﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrPageBand.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportSurface } from '../controls/xrReport';
import { BandSurface } from './xrBand';
export declare class PageFooterSurface extends BandSurface {
    getBackgroundRect(): {
        top: number;
        bottom: any;
        height: number;
    };
    get parent(): ReportSurface;
}
