﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrGroupBandMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { fromEnum, getLocalization, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { getSummaryFunctionValues, keepTogetherDefaultValueFalse } from '../../controls/metadata/properties/metadata';
import { groupBandScripts, groupHeaderBandScripts } from '../../controls/metadata/properties/scriptMetadata';
import { GroupFieldModel } from '../groupfield';
import { drillDownControl, drillDownDetailReportExpanded, level, pageBreak, printAcrossBands, printAtBottom, repeatEveryPage } from './bandsMetadata';
import { bandSerializationInfo } from './xrBandMetaData';
export const groupUnion = {
    propertyName: 'groupUnion',
    modelName: '@GroupUnion', displayName: 'Group Union', localizationId: 'DevExpress.XtraReports.UI.GroupHeaderBand.GroupUnion', editor: editorTemplates.getEditor('combobox'), defaultVal: 'None', from: fromEnum,
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.GroupUnion.None' },
        { value: 'WholePage', displayValue: 'Whole Page', localizationId: 'DevExpress.XtraReports.UI.GroupUnion.WholePage' },
        { value: 'WithFirstDetail', displayValue: 'With First Detail', localizationId: 'DevExpress.XtraReports.UI.GroupUnion.WithFirstDetail' }
    ]
};
export const groupFooterUnion = {
    propertyName: 'groupFooterUnion',
    modelName: '@GroupUnion', displayName: 'Group Union', localizationId: 'DevExpress.XtraReports.UI.GroupFooterBand.GroupUnion', editor: editorTemplates.getEditor('combobox'), defaultVal: 'None', from: fromEnum,
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.GroupFooterUnion.None' },
        { value: 'WithLastDetail', displayValue: 'With Last Detail', localizationId: 'DevExpress.XtraReports.UI.GroupFooterUnion.WithLastDetail' }
    ]
};
const groupBand = [keepTogetherDefaultValueFalse, level, pageBreak, repeatEveryPage].concat(bandSerializationInfo);
const sortingSummarySerializationsInfo = [
    { propertyName: 'enabled', modelName: '@Enabled', displayName: 'Enabled', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.Enabled', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') },
    {
        propertyName: 'Function', modelName: '@Function', displayName: 'Function', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.Function', defaultVal: 'Sum', editor: editorTemplates.getEditor('combobox'),
        get valuesArray() {
            return getSummaryFunctionValues();
        }
    },
    { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.FieldName', defaultVal: '', editor: editorTemplates.getEditor('field') },
    { propertyName: 'ignoreNullValues', modelName: '@IgnoreNullValues', displayName: 'Ignore Null Values', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.IgnoreNullValues', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') },
    {
        propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'SortOrder', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.SortOrder', defaultVal: 'Ascending', editor: editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'Ascending', displayValue: 'Ascending', localizationId: 'DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending' },
            { value: 'Descending', displayValue: 'Descending', localizationId: 'DevExpress.XtraReports.UI.XRColumnSortOrder.Descending' }
        ]
    },
];
export const groupFields = {
    propertyName: 'groupFields',
    modelName: 'GroupFields', displayName: 'Group Fields', localizationId: 'DevExpress.XtraReports.UI.GroupHeaderBand.GroupFields', array: true, editor: editorTemplates.getEditor('commonCollection'),
    addHandler: GroupFieldModel.createNew, template: '#dxrd-collection-item-group',
    getChildCaption: (index) => {
        if (index === 0)
            return getLocalization('Group By', 'DataAccessUIStringId.QueryBuilderColumns_GroupBy');
        return getLocalization('Then By', 'ASPxReportsStringId.ReportDesigner_SortFields_ThenBy');
    }
};
export const sortingSummary = { propertyName: 'sortingSummary', modelName: 'SortingSummary', displayName: 'Sorting Summary', localizationId: 'DevExpress.XtraReports.UI.GroupHeaderBand.SortingSummary', info: sortingSummarySerializationsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const groupHeaderBandSerializationInfo = [groupFields, groupUnion, sortingSummary, drillDownDetailReportExpanded,
    drillDownControl, groupHeaderBandScripts].concat(groupBand);
export const groupFooterBandSerializationInfo = [groupFooterUnion, printAtBottom, groupBandScripts].concat(groupBand);
export const popularPropertiesGroupFooter = ['groupFooterUnion', 'pageBreak', 'keepTogether', 'repeatEveryPage', 'printAtBottom'];
export const popularPropertiesGroupHeader = ['groupFields', 'groupUnion', 'level', 'pageBreak', 'keepTogether', printAcrossBands.propertyName, 'repeatEveryPage'];
