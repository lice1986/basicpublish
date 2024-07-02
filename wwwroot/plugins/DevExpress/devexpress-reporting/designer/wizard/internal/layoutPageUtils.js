﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\layoutPageUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
export var ReportLayout;
(function (ReportLayout) {
    ReportLayout[ReportLayout["stepped"] = 0] = "stepped";
    ReportLayout[ReportLayout["block"] = 1] = "block";
    ReportLayout[ReportLayout["outline1"] = 2] = "outline1";
    ReportLayout[ReportLayout["outline2"] = 3] = "outline2";
    ReportLayout[ReportLayout["alignLeft1"] = 4] = "alignLeft1";
    ReportLayout[ReportLayout["alignLeft2"] = 5] = "alignLeft2";
    ReportLayout[ReportLayout["columnar"] = 6] = "columnar";
    ReportLayout[ReportLayout["tabular"] = 7] = "tabular";
    ReportLayout[ReportLayout["justified"] = 8] = "justified";
})(ReportLayout || (ReportLayout = {}));
export class LayoutTypeItem {
    constructor(textValue, textID, layoutType, margin) {
        this.layoutType = layoutType;
        this.margin = margin;
        this.text = getLocalization(textValue, textID);
    }
    get imageClassName() {
        return 'dxrd-report-layout-type-image-' + ReportLayout[this.layoutType].toLowerCase();
    }
}
export var PageOrientation;
(function (PageOrientation) {
    PageOrientation[PageOrientation["Portrait"] = 0] = "Portrait";
    PageOrientation[PageOrientation["Landscape"] = 1] = "Landscape";
})(PageOrientation || (PageOrientation = {}));
export class PageOrientationItem {
    constructor(textValue, textID, orientation) {
        this.orientation = orientation;
        this.text = getLocalization(textValue, textID);
    }
}