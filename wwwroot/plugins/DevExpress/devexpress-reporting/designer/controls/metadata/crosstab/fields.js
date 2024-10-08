﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\fields.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { valuesArrayAsEnumWithLocalizationId } from '../../utils/_metaUtils';
import { groupInterval, summaryDisplayType } from '../pivotgrid/pivotgridfield';
import { summaryType } from '../pivotgrid/sortBySummary';
import { sortOrder } from '../properties/metadata';
export const crossTabFieldName = { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabFieldBase.FieldName', editor: editorTemplates.getEditor('field'), defaultVal: '' };
const valuesGroupInterval = valuesArrayAsEnumWithLocalizationId(groupInterval, 'DevExpress.XtraReports.UI.CrossTab.GroupInterval.').filter(item => item.value !== 'Custom');
export const crossTabGroupInterval = { propertyName: 'crossTabGroupInterval', modelName: '@GroupInterval', displayName: 'Group Interval', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabGroupFieldBase.GroupInterval', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: valuesGroupInterval };
export const crossTabGroupIntervalNumericRange = { propertyName: 'crossTabGroupIntervalNumericRange', modelName: '@GroupIntervalNumericRange', displayName: 'Group Interval Numeric Range', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabGroupFieldBase.GroupIntervalNumericRange', editor: editorTemplates.getEditor('numeric'), defaultVal: 10 };
let valuesArraySummaryType = valuesArrayAsEnumWithLocalizationId(summaryType, 'DevExpress.XtraReports.UI.CrossTab.SummaryType.');
const summaryExtended = [
    { value: 'CountDistinct', displayValue: 'Count Distinct', localizationId: 'DevExpress.XtraReports.UI.CrossTab.SummaryType.CountDistinct' },
    { value: 'Median', displayValue: 'Median', localizationId: 'DevExpress.XtraReports.UI.CrossTab.SummaryType.Median' },
    { value: 'Mode', displayValue: 'Mode', localizationId: 'DevExpress.XtraReports.UI.CrossTab.SummaryType.Mode' }
];
valuesArraySummaryType.push(...summaryExtended);
valuesArraySummaryType = valuesArraySummaryType.filter(item => item.value !== 'Custom');
export const crossTabSummaryType = extend({}, summaryType, { localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabDataField.SummaryType', valuesArray: valuesArraySummaryType });
export const crossTabSortBySummaryInfo = { propertyName: 'crossTabSortBySummaryInfo', modelName: 'SortBySummaryInfo', displayName: 'Sort By Summary Info', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabGroupFieldBase.SortBySummaryInfo', editor: editorTemplates.getEditor('objecteditor'), info: [extend({}, crossTabFieldName, { localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabFieldSortBySummaryInfo.FieldName' }), crossTabSummaryType] };
const summaryDisplayTypeValuesArray = valuesArrayAsEnumWithLocalizationId(summaryDisplayType, 'DevExpress.XtraReports.UI.CrossTab.SummaryDisplayType.');
const crossTabSummaryDisplayType = { propertyName: 'summaryDisplayType', modelName: '@SummaryDisplayType', displayName: 'Summary Display Type', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabDataField.SummaryDisplayType', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: summaryDisplayTypeValuesArray };
const crossTabFieldExpression = { propertyName: 'fieldExpression', modelName: '@FieldExpression', displayName: 'Field Expression', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabDataField.FieldExpression', editor: editorTemplates.getEditor('text') };
export const crossTabDataFieldInfoBase = [crossTabSummaryType, crossTabSummaryDisplayType, crossTabFieldExpression];
export const crossTabDataFieldInfo = crossTabDataFieldInfoBase.concat([crossTabFieldName]);
export const sortOrderdefaultValAscending = extend({}, sortOrder, { defaultVal: 'Ascending' });
export const crossTabGroupFieldInfoBase = [sortOrderdefaultValAscending, crossTabGroupInterval, crossTabGroupIntervalNumericRange, crossTabSortBySummaryInfo];
export const crossTabGroupFieldInfo = crossTabGroupFieldInfoBase.concat([crossTabFieldName]);
export const rowFields = { propertyName: 'rowFields', modelName: 'RowFields', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.RowFields', displayName: 'Row Fields', array: true, editor: { custom: 'dx-commonCollection' }, template: '#dxrd-collectionItemWithAccordion', alwaysSerialize: true };
export const columnFields = { propertyName: 'columnFields', modelName: 'ColumnFields', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.ColumnFields', displayName: 'Column Fields', array: true, editor: { custom: 'dx-commonCollection' }, template: '#dxrd-collectionItemWithAccordion', alwaysSerialize: true };
export const dataFields = { propertyName: 'dataFields', modelName: 'DataFields', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.DataFields', displayName: 'Data Fields', array: true, editor: { custom: 'dx-commonCollection' }, template: '#dxrd-collectionItemWithAccordion', alwaysSerialize: true };
