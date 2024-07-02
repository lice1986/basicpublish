﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\xrCrossTabCell.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindings } from '../../../dataObjects/metadata/dataBinding';
import { valuesArrayAsEnumWithLocalizationId } from '../../utils/_metaUtils';
import { allowMarkupText, angle, font, foreColor, keepTogether, nullValueText, text, textAlignment, textFitMode, textFormatString } from '../properties/metadata';
import { baseControlProperties, commonControlProperties, navigationGroup, sizeLocation } from '../properties/metadataGroups';
import { crossTabDataFieldInfoBase, crossTabFieldName, crossTabGroupFieldInfoBase } from './fields';
export const autoSizeMode = valuesArrayAsEnumWithLocalizationId(textFitMode, 'DevExpress.XtraReports.UI.AutoSizeMode.');
export const rowVisible = { propertyName: 'rowVisible', modelName: '@RowVisible', displayName: 'Row Visible', localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.RowVisible', editor: editorTemplates.getEditor('bool'), defaultVal: true, from: parseBool };
export const columnVisible = { propertyName: 'columnVisible', modelName: '@ColumnVisible', displayName: 'Column Visible', localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.ColumnVisible', editor: editorTemplates.getEditor('bool'), defaultVal: true, from: parseBool };
export const rowAutoHeightMode = { propertyName: 'rowAutoHeightMode', modelName: '@RowAutoHeightMode', displayName: 'Row Auto Height Mode', localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.RowAutoHeightMode', editor: editorTemplates.getEditor('combobox'), defaultVal: 'None', valuesArray: autoSizeMode };
export const columnAutoWidthMode = { propertyName: 'columnAutoWidthMode', modelName: '@ColumnAutoWidthMode', displayName: 'Column Auto Width Mode', localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.ColumnAutoWidthMode', editor: editorTemplates.getEditor('combobox'), defaultVal: 'None', valuesArray: autoSizeMode };
export const crossTabCellOptionsInfo = [
    crossTabFieldName,
    angle,
    columnAutoWidthMode,
    rowAutoHeightMode,
    columnVisible,
    rowVisible,
    keepTogether
].concat(crossTabDataFieldInfoBase, crossTabGroupFieldInfoBase);
export const columnIndex = { propertyName: '_columnIndex', modelName: '@ColumnIndex', displayName: 'Column Index', localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.ColumnIndex', defaultVal: 0, from: floatFromModel, alwaysSerialize: true, disabled: true, editor: editorTemplates.getEditor('numeric') };
export const rowIndex = { propertyName: '_rowIndex', modelName: '@RowIndex', displayName: 'Row Index', localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.RowIndex', defaultVal: 0, from: floatFromModel, alwaysSerialize: true, disabled: true, editor: editorTemplates.getEditor('numeric') };
export const cellserializtionInfoBase = [
    columnIndex,
    rowIndex,
    { propertyName: '_columnSpan', modelName: '@ColumnSpan', defaultVal: 1, from: floatFromModel },
    { propertyName: '_rowSpan', modelName: '@RowSpan', defaultVal: 1, from: floatFromModel }
];
export const cellserializtionInfo = cellserializtionInfoBase.concat(baseControlProperties, sizeLocation, navigationGroup, crossTabCellOptionsInfo, commonControlProperties, allowMarkupText, dataBindings(['Text', 'Tag']), nullValueText, text, textFormatString, textAlignment, font, foreColor);
export const popularPropertiesCrossTabCell = [
    'fieldName', 'sortOrder', 'crossTabGroupInterval', 'text', 'textFormatString',
    'columnAutoWidthMode', 'rowAutoHeightMode', 'columnVisible', 'rowVisible'
];
