﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfPermissionsOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils-native';
import { currentModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
export class PdfPermissionsOptions {
    static from(model, serializer) {
        return new PdfPermissionsOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, pdfExportPermissionsOptionsSerializationInfo, refs);
    }
    getInfo() {
        return pdfExportPermissionsOptionsSerializationInfo;
    }
    constructor(model, serializer) {
        serializer = serializer || currentModelSerializer();
        serializer.deserialize(this, model);
    }
}
export const pdfExportPermissionsOptionsSerializationInfo = [
    {
        propertyName: 'printingPermissions', modelName: '@PrintingPermissions', displayName: 'Printing Permissions', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions.PrintingPermissions', defaultVal: 'None', editor: editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.PrintingPermissions.None' },
            { value: 'LowResolution', displayValue: 'LowResolution', localizationId: 'DevExpress.XtraPrinting.PrintingPermissions.LowResolution' },
            { value: 'HighResolution', displayValue: 'HighResolution', localizationId: 'DevExpress.XtraPrinting.PrintingPermissions.HighResolution' }
        ]
    },
    {
        propertyName: 'changingPermissions', modelName: '@ChangingPermissions', displayName: 'Changing Permissions', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions.ChangingPermissions', defaultVal: 'None', editor: editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.None' },
            { value: 'InsertingDeletingRotating', displayValue: 'InsertingDeletingRotating', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.InsertingDeletingRotating' },
            { value: 'FillingSigning', displayValue: 'FillingSigning', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.FillingSigning' },
            { value: 'CommentingFillingSigning', displayValue: 'CommentingFillingSigning', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.CommentingFillingSigning' },
            { value: 'AnyExceptExtractingPages', displayValue: 'AnyExceptExtractingPages', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.AnyExceptExtractingPages' }
        ]
    },
    { propertyName: 'enableCopying', modelName: '@EnableCopying', displayName: 'Enable Copying', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions.EnableCopying', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    { propertyName: 'enableScreenReaders', modelName: '@EnableScreenReaders', displayName: 'Enable Screen Readers', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions.EnableScreenReaders', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool }
];