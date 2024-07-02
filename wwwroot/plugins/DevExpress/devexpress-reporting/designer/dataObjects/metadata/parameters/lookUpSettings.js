﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\lookUpSettings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataAdapter, dataMember, dataSource, sortOrder } from '../../../controls/metadata/properties/metadata';
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
export const dynamicListLookUpSettingsInfoBase = [
    dataAdapter, dataSource, dataMember,
    { propertyName: 'valueMember', modelName: '@ValueMember', displayName: 'Value Member', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.ValueMember', defaultVal: '', editor: editorTemplates.getEditor('field') },
    { propertyName: 'displayMember', modelName: '@DisplayMember', displayName: 'Display Member', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.DisplayMember', defaultVal: '', editor: editorTemplates.getEditor('field') },
    { propertyName: 'sortMember', modelName: '@SortMember', displayName: 'Sort Member', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.SortMember', defaultVal: '', editor: editorTemplates.getEditor('field') },
    sortOrder
];
const staticListLookUpSettingsInfo = {
    propertyName: 'lookUpValues',
    displayName: 'Look-Up Values',
    localizationId: 'DevExpress.XtraReports.Parameters.StaticListLookUpSettings.LookUpValues',
    modelName: 'LookUpValues',
    array: true
};
export const editedStaticListLookUpSettingsInfo = Object.assign(Object.assign({}, staticListLookUpSettingsInfo), { editor: { custom: 'dxrd-lookUpValues-editing' } });
export const readonlyStaticListLookUpSettingsInfo = Object.assign(Object.assign({}, staticListLookUpSettingsInfo), { editor: designerEditorTemplates.getEditor('lookUpValues') });
