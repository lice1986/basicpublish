﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\bandsMetadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel, fromEnum, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
export const drillDownDetailReportExpanded = { propertyName: 'drillDownDetailReportExpanded', modelName: '@DrillDownExpanded', displayName: 'Drill-Down Expanded', localizationId: 'DevExpress.XtraReports.UI.Band.DrillDownExpanded', editor: editorTemplates.getEditor('bool'), from: parseBool, defaultVal: true };
export const printAtBottom = { propertyName: 'printAtBottom', modelName: '@PrintAtBottom', defaultVal: false, from: parseBool, displayName: 'Print at Bottom', localizationId: 'DevExpress.XtraReports.UI.ReportFooterBand.PrintAtBottom', editor: editorTemplates.getEditor('bool') };
export const printAcrossBands = { propertyName: 'printAcrossBands', modelName: '@PrintAcrossBands', defaultVal: false, from: parseBool, displayName: 'Print Across Bands', localizationId: 'DevExpress.XtraReports.UI.Band.PrintAcrossBands', editor: editorTemplates.getEditor('bool') };
export const repeatEveryPage = { propertyName: 'repeatEveryPage', modelName: '@RepeatEveryPage', displayName: 'Repeat Every Page', localizationId: 'DevExpress.XtraReports.UI.GroupBand.RepeatEveryPage', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') };
export const pageBreakWithoutAfterValues = [
    { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.PageBreak.None' },
    { value: 'BeforeBand', displayValue: 'Before the Band', localizationId: 'DevExpress.XtraReports.UI.PageBreak.BeforeBand' },
    { value: 'BeforeBandExceptFirstEntry', displayValue: 'Before the Band, Except for the First Entry', localizationId: 'DevExpress.XtraReports.UI.PageBreak.BeforeBandExceptFirstEntry' },
];
export const pageBreakValues = [].concat(pageBreakWithoutAfterValues, [
    { value: 'AfterBand', displayValue: 'After the Band', localizationId: 'DevExpress.XtraReports.UI.PageBreak.AfterBand' },
    { value: 'AfterBandExceptLastEntry', displayValue: 'After the Band, Except for the Last Entry', localizationId: 'DevExpress.XtraReports.UI.PageBreak.AfterBandExceptLastEntry' }
]);
export const pageBreak = {
    propertyName: 'pageBreak',
    modelName: '@PageBreak', displayName: 'Page Break', localizationId: 'DevExpress.XtraReports.UI.Band.PageBreak', defaultVal: 'None', from: fromEnum,
    editor: designerEditorTemplates.getEditor('comboboxPageBreak'),
    valuesArray: pageBreakValues
};
export const keepTogetherWithDetailReports = { propertyName: 'keepTogetherWithDetailReports', modelName: '@KeepTogetherWithDetailReports', defaultVal: false, from: parseBool, displayName: 'Keep Together with Detail Reports', localizationId: 'DevExpress.XtraReports.UI.DetailBand.KeepTogetherWithDetailReports', editor: editorTemplates.getEditor('bool') };
export const height = { propertyName: 'height', modelName: '@HeightF', defaultVal: '100', displayName: 'Height', localizationId: 'DevExpress.XtraReports.UI.Band.Height', from: floatFromModel, localizable: true };
export const level = { propertyName: 'level', modelName: '@Level', displayName: 'Level', localizationId: 'DevExpress.XtraReports.UI.GroupBand.Level', defaultVal: 0, from: floatFromModel, editor: designerEditorTemplates.getEditor('bandLevel') };
export const drillDownControl = { propertyName: 'drillDownControl', modelName: '@DrillDownControl', displayName: 'Drill-Down Control', localizationId: 'DevExpress.XtraReports.UI.Band.DrillDownControl', link: true, defaultVal: null, editor: designerEditorTemplates.getEditor('drillDownControls') };
