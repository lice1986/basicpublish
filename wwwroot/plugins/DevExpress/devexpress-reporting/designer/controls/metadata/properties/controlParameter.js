﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\controlParameter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { dataBindingBaseSerializationInfo } from '../../../dataObjects/metadata/dataBindingInfo';
import { ReportFieldListEditor } from '../../../widgets/reportFieldListEditor';
import { name } from './metadata';
export const controlParameterInfos = dataBindingBaseSerializationInfo.concat([
    $.extend({}, name, { propertyName: 'parameterName' }),
    { propertyName: 'fakeBinding', displayName: 'Binding', localizationId: 'DevExpress.XtraReports.Design.DataBinding.Binding', link: true, editor: { header: 'dxrd-dataBinding', editorType: ReportFieldListEditor } }
]);
