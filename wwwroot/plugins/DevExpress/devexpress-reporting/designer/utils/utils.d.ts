﻿/**
* DevExpress HTML/JS Reporting (designer\utils\utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { BandViewModel } from '../bands/xrBand';
export declare function base64UTF16LEtobase64UTF8(base64UTF16: string, resultCallback: any): void;
export declare function _isReorderBand(dropTarget: ISelectionTarget, dragFrom: ElementViewModel): boolean;
export declare function _isMarginBand(band: BandViewModel): boolean;
export declare function _isPageBand(band: BandViewModel): boolean;
export declare const availableFonts: import("knockout").Observable<{
    [key: string]: string;
}>;
