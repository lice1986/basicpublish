﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_styleHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DesignControlsHelper } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { StyleModel } from '../controls/properties/style';
import { ReportViewModel } from '../controls/xrReport';
import { XRReportElementViewModel } from '../controls/xrReportelement';
export declare const stylesProperties: string[];
export declare class StylesHelper extends Disposable {
    private _report;
    private _controlsHelper;
    static styleEqualityComparer(x: StyleModel, y: StyleModel): boolean;
    static generateStyle(element: XRReportElementViewModel | StyleModel, parent: XRReportElementViewModel): StyleModel;
    constructor(_report: ReportViewModel, _controlsHelper: DesignControlsHelper);
    removeUnusedStyle(styleName: string): StyleModel;
}
