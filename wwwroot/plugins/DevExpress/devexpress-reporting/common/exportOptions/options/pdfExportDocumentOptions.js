﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfExportDocumentOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { currentModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
export class PdfExportDocumentOptions {
    static from(model, serializer) {
        return new PdfExportDocumentOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, pdfExportDocumentOptionsSerializationInfo, refs);
    }
    getInfo() {
        return pdfExportDocumentOptionsSerializationInfo;
    }
    constructor(model, serializer) {
        serializer = serializer || currentModelSerializer();
        serializer.deserialize(this, model);
    }
}
export const author = { propertyName: 'author', modelName: '@Author', displayName: 'Author', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Author', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const application = { propertyName: 'application', modelName: '@Application', displayName: 'Application', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Application', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const title = { propertyName: 'title', modelName: '@Title', displayName: 'Title', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Title', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const subject = { propertyName: 'subject', modelName: '@Subject', displayName: 'Subject', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Subject', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const pdfExportDocumentOptionsSerializationInfo = [
    author, application, title, subject,
    { propertyName: 'keywords', modelName: '@Keywords', displayName: 'Keywords', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Keywords', defaultVal: '', editor: editorTemplates.getEditor('text') }
];
