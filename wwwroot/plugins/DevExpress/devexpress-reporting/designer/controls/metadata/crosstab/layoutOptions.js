﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\layoutOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { CornerHeaderDisplayMode, DataFieldLayout, TotalHeaderPosition, TotalsPosition } from '../../crossTab/enums';
const headerPositions = [
    { displayValue: 'Inner', value: TotalHeaderPosition[TotalHeaderPosition.Inner], localizationId: 'DevExpress.XtraReports.UI.CrossTab.TotalHeaderPosition.Inner' },
    { displayValue: 'Outer', value: TotalHeaderPosition[TotalHeaderPosition.Outer], localizationId: 'DevExpress.XtraReports.UI.CrossTab.TotalHeaderPosition.Outer' }
];
const totalsPositions = [
    { displayValue: 'AfterData', value: TotalsPosition[TotalsPosition.AfterData], localizationId: 'DevExpress.XtraReports.UI.CrossTab.TotalsPosition.AfterData' },
    { displayValue: 'BeforeData', value: TotalsPosition[TotalsPosition.BeforeData], localizationId: 'DevExpress.XtraReports.UI.CrossTab.TotalsPosition.BeforeData' },
];
export const crossTabLayoutOptionsInfo = [
    {
        propertyName: 'cornerHeaderDisplayMode', modelName: '@CornerHeaderDisplayMode', displayName: 'Corner Header Display Mode', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.CornerHeaderDisplayMode', editor: editorTemplates.getEditor('combobox'), defaultVal: 'RowFieldNames', valuesArray: [
            { displayValue: 'None', value: CornerHeaderDisplayMode[CornerHeaderDisplayMode.None], localizationId: 'DevExpress.XtraReports.UI.CrossTab.CornerHeaderDisplayMode.None' },
            { displayValue: 'Row Field Names', value: CornerHeaderDisplayMode[CornerHeaderDisplayMode.RowFieldNames], localizationId: 'DevExpress.XtraReports.UI.CrossTab.CornerHeaderDisplayMode.RowFieldNames' },
            { displayValue: 'Column Field Names', value: CornerHeaderDisplayMode[CornerHeaderDisplayMode.ColumnFieldNames], localizationId: 'DevExpress.XtraReports.UI.CrossTab.CornerHeaderDisplayMode.ColumnFieldNames' },
        ]
    }, {
        propertyName: 'dataFieldLayout', modelName: '@DataFieldLayout', displayName: 'Data Field Layout', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.DataFieldLayout', editor: editorTemplates.getEditor('combobox'), defaultVal: 'InRow', valuesArray: [
            { displayValue: 'In Row', value: DataFieldLayout[DataFieldLayout.InRow], localizationId: 'DevExpress.XtraReports.UI.CrossTab.DataFieldLayout.InRow' },
            { displayValue: 'In Column', value: DataFieldLayout[DataFieldLayout.InColumn], localizationId: 'DevExpress.XtraReports.UI.CrossTab.DataFieldLayout.InColumn' },
        ]
    }, { propertyName: 'columnTotalsPosition', modelName: '@ColumnTotalsPosition', displayName: 'Column Totals Position', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.ColumnTotalsPosition', editor: editorTemplates.getEditor('combobox'), defaultVal: 'AfterData', valuesArray: totalsPositions },
    { propertyName: 'rowTotalsPosition', modelName: '@RowTotalsPosition', displayName: 'Row Totals Position', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.RowTotalsPosition', editor: editorTemplates.getEditor('combobox'), defaultVal: 'AfterData', valuesArray: totalsPositions },
    { propertyName: 'columnTotalHeaderPosition', modelName: '@ColumnTotalHeaderPosition', displayName: 'Column Total Header Position', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.ColumnTotalHeaderPosition', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Outer', valuesArray: headerPositions },
    { propertyName: 'rowTotalHeaderPosition', modelName: '@RowTotalHeaderPosition', displayName: 'Row Total Header Position', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.RowTotalHeaderPosition', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Outer', valuesArray: headerPositions },
    { propertyName: 'hierarchicalRowLayout', modelName: '@HierarchicalRowLayout', displayName: 'Hierarchical Row Layout', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.HierarchicalRowLayout', editor: editorTemplates.getEditor('bool'), defaultVal: false, from: parseBool }
];
export const crossTabLayoutOptions = { propertyName: 'layoutOptions', modelName: 'LayoutOptions', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.LayoutOptions', displayName: 'Layout Options', editor: editorTemplates.getEditor('objecteditor'), info: crossTabLayoutOptionsInfo };
