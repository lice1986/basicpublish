﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\action.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates as analyticsEditorTemplates, editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
import { ParameterBinding } from '../../xrSubreportParameterBinding';
export const drillThroughReportSourceUrl = { propertyName: 'reportSourceUrl', modelName: '@ReportSourceUrl', defaultVal: '', editor: designerEditorTemplates.getEditor('reportSourceUrl'), displayName: 'Report Source Url', localizationId: 'DevExpress.XtraReports.Actions.NavigateToReport.ReportSourceUrl' };
export const drillThroughReportSource = { propertyName: 'reportSource', modelName: 'ReportSource', displayName: 'Report Source', localizationId: 'DevExpress.XtraReports.Actions.NavigateToReport.ReportSource' };
export const drillThroughParameterBindings = { propertyName: 'parameterBindings', modelName: 'ParameterBindings', displayName: 'Parameter Bindings', localizationId: 'DevExpress.XtraReports.Actions.NavigateToReport.ParameterBindings', array: true, editor: analyticsEditorTemplates.getEditor('commonCollection'), addHandler: ParameterBinding.createNew, template: '#dxrd-commonCollectionItem' };
export const ActionType = {
    None: 'None',
    NavigateToReport: 'NavigateToReport',
};
export const actionKind = {
    propertyName: 'name', modelName: '@Name',
    editor: editorTemplates.getEditor('combobox'), displayName: 'Action', localizationId: 'DevExpress.XtraReports.UI.XRControl.Action',
    valuesArray: [
        { value: ActionType.None, displayValue: 'None', localizationId: 'DevExpress.XtraReports.Actions.None' },
        { value: 'NavigateToReport', displayValue: 'Navigate to Report', localizationId: 'DevExpress.XtraReports.Actions.NavigateToReport' }
    ],
    defaultVal: ActionType.None,
};
export const actionSerializationInfo = [actionKind, drillThroughReportSource, drillThroughReportSourceUrl, drillThroughParameterBindings];
export const action = { propertyName: 'action', modelName: 'Action', editor: editorTemplates.getEditor('objecteditor'), displayName: 'Action', localizationId: 'DevExpress.XtraReports.UI.XRControl.Action' };
