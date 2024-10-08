﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\reportWizardState.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getPaperSize } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import { paperKind } from '../controls/metadata/xrReport';
export var ReportType;
(function (ReportType) {
    ReportType[ReportType["Empty"] = 3] = "Empty";
    ReportType[ReportType["Standard"] = 0] = "Standard";
    ReportType[ReportType["Vertical"] = 1] = "Vertical";
    ReportType[ReportType["Label"] = 2] = "Label";
    ReportType[ReportType["Template"] = 5] = "Template";
    ReportType[ReportType["CrossTab"] = 6] = "CrossTab";
})(ReportType || (ReportType = {}));
export var PivotSummaryType;
(function (PivotSummaryType) {
    PivotSummaryType[PivotSummaryType["Count"] = 0] = "Count";
    PivotSummaryType[PivotSummaryType["Sum"] = 1] = "Sum";
    PivotSummaryType[PivotSummaryType["Min"] = 2] = "Min";
    PivotSummaryType[PivotSummaryType["Max"] = 3] = "Max";
    PivotSummaryType[PivotSummaryType["Average"] = 4] = "Average";
    PivotSummaryType[PivotSummaryType["StdDev"] = 5] = "StdDev";
    PivotSummaryType[PivotSummaryType["StdDevp"] = 6] = "StdDevp";
    PivotSummaryType[PivotSummaryType["Var"] = 7] = "Var";
    PivotSummaryType[PivotSummaryType["Varp"] = 8] = "Varp";
    PivotSummaryType[PivotSummaryType["Custom"] = 9] = "Custom";
    PivotSummaryType[PivotSummaryType["CountDistinct"] = 10] = "CountDistinct";
    PivotSummaryType[PivotSummaryType["Median"] = 11] = "Median";
    PivotSummaryType[PivotSummaryType["Mode"] = 12] = "Mode";
})(PivotSummaryType || (PivotSummaryType = {}));
export var GraphicsUnit;
(function (GraphicsUnit) {
    GraphicsUnit[GraphicsUnit["World"] = 0] = "World";
    GraphicsUnit[GraphicsUnit["Display"] = 1] = "Display";
    GraphicsUnit[GraphicsUnit["Pixel"] = 2] = "Pixel";
    GraphicsUnit[GraphicsUnit["Point"] = 3] = "Point";
    GraphicsUnit[GraphicsUnit["Inch"] = 4] = "Inch";
    GraphicsUnit[GraphicsUnit["Document"] = 5] = "Document";
    GraphicsUnit[GraphicsUnit["Millimeter"] = 6] = "Millimeter";
})(GraphicsUnit || (GraphicsUnit = {}));
const defaultPageSize = getPaperSize(paperKind.defaultVal, 0);
export const defaultPageSetupState = {
    paperKind: paperKind.defaultVal,
    landscape: false,
    marginTop: 1,
    marginRight: 1,
    marginBottom: 1,
    marginLeft: 1,
    width: defaultPageSize.width / 100,
    height: defaultPageSize.height / 100,
    unit: GraphicsUnit.Inch
};
export const defaultReportWizardState = {
    masterDetailInfoCollection: [],
    pageSetup: $.extend(true, {}, defaultPageSetupState),
    colorScheme: {},
    ignoreNullValuesForSummary: false
};
