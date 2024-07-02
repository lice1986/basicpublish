﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\anchoring.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
export const anchorVertical = {
    propertyName: 'anchorVertical',
    modelName: '@AnchorVertical', displayName: 'Anchor Vertically', localizationId: 'DevExpress.XtraReports.UI.XRControl.AnchorVertical', defaultVal: 'None',
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.VerticalAnchorStyles.None' },
        { value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.XtraReports.UI.VerticalAnchorStyles.Top' },
        { value: 'Bottom', displayValue: 'Bottom', localizationId: 'DevExpress.XtraReports.UI.VerticalAnchorStyles.Bottom' },
        { value: 'Both', displayValue: 'Both', localizationId: 'DevExpress.XtraReports.UI.VerticalAnchorStyles.Both' }
    ]
};
export const anchorHorizontal = {
    propertyName: 'anchorHorizontal',
    modelName: '@AnchorHorizontal', displayName: 'Anchor Horizontally', localizationId: 'DevExpress.XtraReports.UI.XRControl.AnchorHorizontal', defaultVal: 'None',
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.HorizontalAnchorStyles.None' },
        { value: 'Left', displayValue: 'Left', localizationId: 'DevExpress.XtraReports.UI.HorizontalAnchorStyles.Left' },
        { value: 'Right', displayValue: 'Right', localizationId: 'DevExpress.XtraReports.UI.HorizontalAnchorStyles.Right' },
        { value: 'Both', displayValue: 'Both', localizationId: 'DevExpress.XtraReports.UI.HorizontalAnchorStyles.Both' }
    ]
};