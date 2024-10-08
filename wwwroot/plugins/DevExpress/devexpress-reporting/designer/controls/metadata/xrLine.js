﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrLine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { foreColor, keepTogether, lineStyle, lineWidth } from './properties/metadata';
import { commonControlProperties, sizeLocation } from './properties/metadataGroups';
import { controlScripts } from './properties/scriptMetadata';
export const lineDirection = {
    propertyName: 'lineDirection',
    modelName: '@LineDirection',
    defaultVal: 'Horizontal',
    editor: editorTemplates.getEditor('combobox'),
    displayName: 'Line Direction', localizationId: 'DevExpress.XtraReports.UI.XRLine.LineDirection',
    valuesArray: [
        { value: 'Horizontal', displayValue: 'Horizontal', localizationId: 'DevExpress.XtraReports.UI.LineDirection.Horizontal' },
        { value: 'Vertical', displayValue: 'Vertical', localizationId: 'DevExpress.XtraReports.UI.LineDirection.Vertical' },
        { value: 'Slant', displayValue: 'Slant', localizationId: 'DevExpress.XtraReports.UI.LineDirection.Slant' },
        { value: 'BackSlant', displayValue: 'BackSlant', localizationId: 'DevExpress.XtraReports.UI.LineDirection.BackSlant' }
    ]
};
export const lineSerializationsInfo = [
    foreColor, keepTogether, anchorVertical, anchorHorizontal,
    lineWidth, lineDirection, lineStyle, controlScripts,
    dataBindings(['Tag'])
].concat(sizeLocation, commonControlProperties);
export const popularPropertiesLine = ['lineDirection', 'lineStyle', 'lineWidth', 'anchorVertical', 'anchorHorizontal'];
