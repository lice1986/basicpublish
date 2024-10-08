﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\layoutPageUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare enum ReportLayout {
    stepped = 0,
    block = 1,
    outline1 = 2,
    outline2 = 3,
    alignLeft1 = 4,
    alignLeft2 = 5,
    columnar = 6,
    tabular = 7,
    justified = 8
}
export declare class LayoutTypeItem {
    layoutType: ReportLayout;
    margin: number;
    constructor(textValue: string, textID: string, layoutType: ReportLayout, margin: number);
    text: string;
    get imageClassName(): string;
}
export declare enum PageOrientation {
    Portrait = 0,
    Landscape = 1
}
export declare class PageOrientationItem {
    orientation: PageOrientation;
    constructor(textValue: string, textID: string, orientation: PageOrientation);
    text: string;
}
