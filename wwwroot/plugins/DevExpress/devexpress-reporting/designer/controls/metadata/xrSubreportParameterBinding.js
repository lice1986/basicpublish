﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrSubreportParameterBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates, FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindingBaseSerializationInfo } from '../../dataObjects/metadata/dataBindingInfo';
export const parameterBindingSerializationInfo = dataBindingBaseSerializationInfo.concat([
    { propertyName: 'parameterName', modelName: '@ParameterName', displayName: 'Parameter Name', localizationId: 'DevExpress.XtraReports.UI.ParameterBinding.ParameterName', editor: editorTemplates.getEditor('combobox') },
    { propertyName: 'fakeBinding', displayName: 'Binding', localizationId: 'DevExpress.XtraReports.Design.DataBinding.Binding', link: true, editor: { header: 'dxrd-dataBinding', editorType: FieldListEditor } }
]);
