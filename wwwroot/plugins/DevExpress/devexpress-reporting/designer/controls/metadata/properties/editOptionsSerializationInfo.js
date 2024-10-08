﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\editOptionsSerializationInfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
export const editOptionsSerializationInfo = [
    { propertyName: 'enabled', modelName: '@Enabled', displayName: 'Enabled', localizationId: 'DevExpress.XtraReports.UI.EditOptions.Enabled', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('boolSelect') },
    { propertyName: 'id', modelName: '@ID', displayName: 'ID', localizationId: 'DevExpress.XtraReports.UI.EditOptions.ID', editor: editorTemplates.getEditor('text') },
    { propertyName: 'readOnly', modelName: '@ReadOnly', displayName: 'Read Only', localizationId: 'DevExpress.XtraReports.UI.EditOptions.ReadOnly', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('boolSelect') }
];
