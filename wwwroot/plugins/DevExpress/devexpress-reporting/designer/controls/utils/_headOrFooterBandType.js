﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_headOrFooterBandType.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function isHeaderOrFooterBandType(band) {
    return ((band.controlType === 'ReportHeaderBand' || band.controlType === 'ReportFooterBand')
        && (band.parentModel().controlType === 'DevExpress.XtraReports.UI.XtraReport')) || (band.controlType === 'SubBand' && isHeaderOrFooterBandType(band.parentModel()));
}
