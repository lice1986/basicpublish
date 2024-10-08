﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\emailMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { AdditionalRecipientModel } from './emailExportOptions';
export const nativeFormatOptionsSerializationInfo = [
    { propertyName: 'compressed', modelName: '@Compressed', displayName: 'Compressed', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.Compressed', descriptionLocalizationId: 'DevExpress.XtraPrinting.NativeFormatOptions.Compressed.Description', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool },
    { propertyName: 'showOptionsBeforeSave', modelName: '@ShowOptionsBeforeSave', displayName: 'Show Options Before Save', localizationId: 'DevExpress.XtraPrinting.NativeFormatOptions.ShowOptionsBeforeSave', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool }
];
export const additionalRecipients = { propertyName: 'additionalRecipients', modelName: 'AdditionalRecipients', displayName: 'Additional Recipients', localizationId: 'DevExpress.XtraPrinting.EmailOptions.AdditionalRecipients', array: true, editor: editorTemplates.getEditor('commonCollection'), addHandler: AdditionalRecipientModel.createNew, template: '#dxrd-commonCollectionItem' };
export const emailOptionsSerializationInfo = [
    { propertyName: 'recipientName', modelName: '@RecipientName', displayName: 'Recipient Name', localizationId: 'DevExpress.XtraPrinting.EmailOptions.RecipientName', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'recipientAddress', modelName: '@RecipientAddress', displayName: 'Recipient Address', localizationId: 'DevExpress.XtraPrinting.EmailOptions.RecipientAddress', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'recipientAddressPrefix', modelName: '@RecipientAddressPrefix', displayName: 'Recipient Address Prefix', localizationId: 'DevExpress.XtraPrinting.EmailOptions.RecipientAddressPrefix', defaultVal: 'SMTP:', editor: editorTemplates.getEditor('text') },
    { propertyName: 'subject', modelName: '@Subject', displayName: 'Subject', localizationId: 'DevExpress.XtraPrinting.EmailOptions.Subject', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'body', modelName: '@Body', displayName: 'Body', localizationId: 'DevExpress.XtraPrinting.EmailOptions.Body', defaultVal: '', editor: editorTemplates.getEditor('text') },
    additionalRecipients
];
