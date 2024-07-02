﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\groupfieldMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { designerEditorTemplates } from '../../widgets/editorTemplates';
export const groupFieldSerializationInfo = [
    { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraReports.UI.GroupField.FieldName', editor: designerEditorTemplates.getEditor('dataBinding') },
    { propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'Sort Order', localizationId: 'DevExpress.XtraReports.UI.GroupField.SortOrder', defaultVal: 'Ascending' }
];