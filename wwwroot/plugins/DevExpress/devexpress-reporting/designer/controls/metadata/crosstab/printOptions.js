﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\printOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
export const crossTabPrintOptionsInfo = [
    {
        propertyName: 'printLayout', modelName: '@PrintLayout', displayName: 'PrintLayout', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.PrintLayout', editor: editorTemplates.getEditor('combobox'), defaultVal: 'AcrossOnly', valuesArray: [
            { displayValue: 'AcrossOnly', value: 'AcrossOnly', localizationId: 'DevExpress.XtraReports.UI.PrintLayout.AcrossOnly' },
            { displayValue: 'AcrossThenDown', value: 'AcrossThenDown', localizationId: 'DevExpress.XtraReports.UI.PrintLayout.AcrossThenDown' },
        ]
    }, { propertyName: 'acrossThenDownOffset', modelName: '@AcrossThenDownOffset', displayName: 'Across Then Down Offset', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.AcrossThenDownOffset', editor: editorTemplates.getEditor('numeric'), defaultVal: 10 },
    { propertyName: 'repeatRowHeaders', modelName: '@RepeatRowHeaders', displayName: 'Repeat Row Headers', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.RepeatRowHeaders', editor: editorTemplates.getEditor('bool'), defaultVal: true, from: parseBool },
    { propertyName: 'repeatColumnHeaders', modelName: '@RepeatColumnHeaders', displayName: 'Repeat Column Headers', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.RepeatColumnHeaders', editor: editorTemplates.getEditor('bool'), defaultVal: true, from: parseBool },
    { propertyName: 'printTotalsForSingleValues', modelName: '@PrintTotalsForSingleValues', displayName: 'Print Totals For Single Values', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.PrintTotalsForSingleValues', editor: editorTemplates.getEditor('bool'), defaultVal: true, from: parseBool }
];
export const crossTabPrintOptions = { propertyName: 'printOptions', modelName: 'PrintOptions', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.PrintOptions', displayName: 'Print Options', editor: editorTemplates.getEditor('objecteditor'), info: crossTabPrintOptionsInfo };
