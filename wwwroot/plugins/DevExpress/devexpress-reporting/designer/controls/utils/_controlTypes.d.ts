﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_controlTypes.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare type ReportBandsType = 'TopMarginBand' | 'ReportHeaderBand' | 'PageHeaderBand' | 'GroupHeaderBand' | 'DetailBand' | 'VerticalHeaderBand' | 'VerticalDetailBand' | 'VerticalTotalBand' | 'DetailReportBand' | 'GroupFooterBand' | 'ReportFooterBand' | 'PageFooterBand' | 'BottomMarginBand' | 'SubBand';
export declare type ControlType = ReportBandsType | 'Unknown' | 'XRLabel' | 'XRCheckBox' | 'XRRichText' | 'XRPictureBox' | 'XRPanel' | 'XRTable' | 'XRCharacterComb' | 'XRLine' | 'XRShape' | 'XRBarCode' | 'XRZipCode' | 'XRChart' | 'XRGauge' | 'XRSparkline' | 'XRPivotGrid' | 'XRCrossTab' | 'XRCrossTabCell' | 'XRSubreport' | 'XRPdfContent' | 'XRPdfSignature' | 'XRTableOfContents' | 'XRPageInfo' | 'XRPageBreak' | 'XRCrossBandLine' | 'XRCrossBandBox' | 'DevExpress.XtraReports.UI.XtraReport' | 'PivotGridField' | 'XRTableRow' | 'XRTableCell' | string;
export declare function isVerticalBand(type: ControlType | ReportBandsType): boolean;
export declare function isBand(type: ControlType): boolean;
