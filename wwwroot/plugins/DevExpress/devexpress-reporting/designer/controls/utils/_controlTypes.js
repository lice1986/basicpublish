﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_controlTypes.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function isVerticalBand(type) {
    return type === 'VerticalDetailBand' || type === 'VerticalHeaderBand' || type === 'VerticalTotalBand';
}
export function isBand(type) {
    return isVerticalBand(type)
        || type === 'BottomMarginBand'
        || type === 'SubBand'
        || type === 'DetailBand'
        || type === 'DetailReportBand'
        || type === 'GroupFooterBand'
        || type === 'GroupHeaderBand'
        || type === 'PageFooterBand'
        || type === 'PageHeaderBand'
        || type === 'ReportFooterBand'
        || type === 'ReportHeaderBand'
        || type === 'TopMarginBand';
}
