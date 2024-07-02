﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\emailExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { fromEnum } from '@devexpress/analytics-core/analytics-utils-native';
import { currentModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
export class AdditionalRecipientModel {
    constructor(model, serializer) {
        serializer = serializer || currentModelSerializer();
        serializer.deserialize(this, model);
    }
    getInfo() {
        return additionalRecipientSerializationsInfo;
    }
}
AdditionalRecipientModel.createNew = () => {
    return new AdditionalRecipientModel({});
};
export const additionalRecipientSerializationsInfo = [
    { propertyName: 'ContactName', modelName: '@ContactName', displayName: 'ContactName', localizationId: 'DevExpress.XtraPrinting.Recipient.ContactName', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'Address', modelName: '@Address', displayName: 'Address', localizationId: 'DevExpress.XtraPrinting.Recipient.Address', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'Prefix', modelName: '@Prefix', displayName: 'Prefix', localizationId: 'DevExpress.XtraPrinting.Recipient.Prefix', defaultVal: 'SMTP:', editor: editorTemplates.getEditor('text') },
    {
        propertyName: 'fieldType', modelName: '@FieldType', displayName: 'Field Type', localizationId: 'DevExpress.XtraPrinting.Recipient.FieldType', defaultVal: 'TO', editor: editorTemplates.getEditor('combobox'), from: fromEnum,
        valuesArray: [
            { value: 'TO', displayValue: 'TO', localizationId: 'DevExpress.XtraPrinting.RecipientFieldType.TO' },
            { value: 'CC', displayValue: 'CC', localizationId: 'DevExpress.XtraPrinting.RecipientFieldType.CC' },
            { value: 'BCC', displayValue: 'BCC', localizationId: 'DevExpress.XtraPrinting.RecipientFieldType.BCC' }
        ]
    },
];
