﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportRenderingService.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRChartSurface } from '../controls/xrChart';
import { XRPdfContentViewModel } from '../controls/xrPdfContent';
import { XRRichSurface } from '../controls/xrRichTextSurface';
import { XRShapeControlSurface } from '../controls/xrShape';
export declare class ReportRenderingService {
    static getChartImage(surface: XRChartSurface): any;
    static getUnknownControlImage(model: any, scale: number): any;
    static getShapeImage(surface: XRShapeControlSurface): any;
    static getRichImage(surface: XRRichSurface, propertyName: any): any;
    static getPdfContentData(control: XRPdfContentViewModel): any;
}
