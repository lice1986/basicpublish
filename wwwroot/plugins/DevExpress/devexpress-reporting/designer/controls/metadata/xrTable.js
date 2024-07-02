﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { accessibleDescription, accessibleRole, defaultAccessibleRole, expressionableFont, foreColor, keepTogetherDefaultValueFalse, rtl, textAlignment } from './properties/metadata';
import { bookmarkGroup, commonControlProperties, sizeLocation } from './properties/metadataGroups';
import { commonScripts } from './properties/scriptMetadata';
export const processHiddenCellMode = {
    propertyName: 'processHiddenCellMode',
    modelName: '@ProcessHiddenCellMode',
    displayName: 'Process Hidden Cell Mode',
    valuesArray: [
        { value: 'LeaveEmptySpace', displayValue: 'Leave Empty Space' },
        { value: 'ResizeCellsEqually', displayValue: 'Resize Cells Equally' },
        { value: 'ResizeCellsProportionally', displayValue: 'Resize Cells Proportionally' },
        { value: 'StretchPreviousCell', displayValue: 'Stretch Previous Cell' },
        { value: 'StretchNextCell', displayValue: 'Stretch Next Cell' },
        { value: 'DecreaseTableWidth', displayValue: 'Decrease Table Width' }
    ],
    defaultVal: 'LeaveEmptySpace',
    editor: editorTemplates.getEditor('combobox'),
    localizationId: 'DevExpress.XtraReports.UI.XRTable.ProcessHiddenCellMode'
};
const accessibleRoleTable = extend({}, accessibleRole, { valuesArray: [
        defaultAccessibleRole,
        { value: 'Table', displayValue: 'Table', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.Table' }
    ] });
export const tableSerializationsInfo = [
    accessibleRoleTable,
    expressionableFont, foreColor, keepTogetherDefaultValueFalse, anchorVertical, anchorHorizontal, commonScripts,
    { propertyName: 'rows', modelName: 'Rows', array: true },
    dataBindings(['Bookmark', 'Tag']),
    rtl,
    textAlignment,
    processHiddenCellMode,
].concat(sizeLocation, commonControlProperties, bookmarkGroup).filter(x => x != accessibleDescription);
export const popularPropertiesTable = ['bookmark', 'bookmarkParent'];