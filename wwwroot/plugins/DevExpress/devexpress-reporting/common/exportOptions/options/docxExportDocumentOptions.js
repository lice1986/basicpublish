﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\docxExportDocumentOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { currentModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
export class DocxExportDocumentOptions {
    static from(model, serializer) {
        return new DocxExportDocumentOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, docxExportDocumentOptionsSerializationInfo, refs);
    }
    getInfo() {
        return docxExportDocumentOptionsSerializationInfo;
    }
    constructor(model, serializer) {
        serializer = serializer || currentModelSerializer();
        serializer.deserialize(this, model);
    }
}
export const docxExportDocumentOptionsSerializationInfo = [
    { propertyName: 'title', modelName: '@Title', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Title', displayName: 'Title', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'subject', modelName: '@Subject', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Subject', displayName: 'Subject', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'keywords', modelName: '@Keywords', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Keywords', displayName: 'Keywords', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'category', modelName: '@Category', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Category', displayName: 'Category', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'comments', modelName: '@Comments', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Comments', displayName: 'Comments', defaultVal: '', editor: editorTemplates.getEditor('text') },
    { propertyName: 'author', modelName: '@Author', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Author', displayName: 'Author', defaultVal: '', editor: editorTemplates.getEditor('text') },
];