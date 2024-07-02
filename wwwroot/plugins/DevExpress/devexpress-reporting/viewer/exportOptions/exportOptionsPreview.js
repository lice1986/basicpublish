﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\exportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ExportOptions } from '../../common/exportOptions/exportOptions';
import { CsvExportOptionsPreview } from './csvExportOptionsPreview';
import { HtmlExportOptionsPreview, HtmlExportOptionsMergedPreview } from './htmlExportOptionsPreview';
import { ImageExportOptionsPreview, ImageExportOptionsMergedPreview } from './imageExportOptionsPreview';
import { MhtExportOptionsPreview, MhtExportOptionsMergedPreview } from './mhtExportOptionsPreview';
import { PdfExportOptions } from '../../common/exportOptions/pdfExportOptions';
import { RtfExportOptionsPreview, RtfExportOptionsMergedPreview } from './rtfExportOptionsPreview';
import { TextExportOptions } from '../../common/exportOptions/textExportOptions';
import { XlsExportOptionsPreview, XlsExportOptionsMergedPreview } from './xlsExportOptionsPreview';
import { XlsxExportOptionsPreview, XlsxExportOptionsMergedPreview } from './xlsxExportOptionsPreview';
import { DocxExportOptionsPreview, DocxExportOptionsMergedPreview } from './docxExportOptionsPreview';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { PdfExportOptionsPreview } from './pdfExportOptionsPreview';
export class ExportOptionsPreview extends ExportOptions {
    constructor(_signatures) {
        super();
        this._signatures = _signatures;
    }
    _generateFromFunction(exportType) {
        return (model, serializer) => {
            return new exportType(model || {}, serializer);
        };
    }
    hasSensitiveData() {
        return (this.xls && this.xls.hasSensitiveData())
            || (this.xlsx && this.xlsx.hasSensitiveData())
            || (this.pdf && this.pdf.hasSensitiveData());
    }
    getInfo() {
        return [
            { propertyName: 'csv', modelName: 'Csv', displayName: 'CSV Export Options', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Csv.Description', from: this._generateFromFunction(CsvExportOptionsPreview), toJsonObject: CsvExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'html', modelName: 'Html', displayName: 'HTML Export Options', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Html.Description', from: this._generateFromFunction(HtmlExportOptionsPreview), toJsonObject: HtmlExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'image', modelName: 'Image', displayName: 'Image Export Options', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Image.Description', from: this._generateFromFunction(ImageExportOptionsPreview), toJsonObject: ImageExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'mht', modelName: 'Mht', displayName: 'MHT Export Options', localizationId: 'DevExpress.XtraPrinting.MhtExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Mht.Description', from: this._generateFromFunction(MhtExportOptionsPreview), toJsonObject: MhtExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'pdf', modelName: 'Pdf', displayName: 'PDF Export Options', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Pdf.Description', from: (model, serializer) => new PdfExportOptionsPreview(model, serializer, this._signatures), toJsonObject: PdfExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'rtf', modelName: 'Rtf', displayName: 'RTF Export Options', localizationId: 'DevExpress.XtraPrinting.RtfExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Rtf.Description', from: this._generateFromFunction(RtfExportOptionsPreview), toJsonObject: RtfExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'textExportOptions', modelName: 'Text', displayName: 'Text Export Options', localizationId: 'DevExpress.XtraPrinting.TextExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Text.Description', from: this._generateFromFunction(TextExportOptions), toJsonObject: TextExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'xls', modelName: 'Xls', displayName: 'XLS Export Options', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Xls.Description', from: this._generateFromFunction(XlsExportOptionsPreview), toJsonObject: XlsExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'xlsx', modelName: 'Xlsx', displayName: 'XLSx Export Options', localizationId: 'DevExpress.XtraPrinting.XlsxExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Xlsx.Description', from: this._generateFromFunction(XlsxExportOptionsPreview), toJsonObject: XlsxExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'docx', modelName: 'Docx', displayName: 'Docx Export Options', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Docx.Description', from: this._generateFromFunction(DocxExportOptionsPreview), toJsonObject: DocxExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') }
        ];
    }
}
export class ExportOptionsMergedPreview extends ExportOptionsPreview {
    getInfo() {
        return [
            { propertyName: 'html', modelName: 'Html', displayName: 'HTML Export Options', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptions', from: this._generateFromFunction(HtmlExportOptionsMergedPreview), toJsonObject: HtmlExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'image', modelName: 'Image', displayName: 'Image Export Options', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions', from: this._generateFromFunction(ImageExportOptionsMergedPreview), toJsonObject: ImageExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'mht', modelName: 'Mht', displayName: 'MHT Export Options', localizationId: 'DevExpress.XtraPrinting.MhtExportOptions', from: this._generateFromFunction(MhtExportOptionsMergedPreview), toJsonObject: MhtExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'pdf', modelName: 'Pdf', displayName: 'PDF Export Options', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions', from: (model, serializer) => new PdfExportOptionsPreview(model, serializer, this._signatures), toJsonObject: PdfExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'rtf', modelName: 'Rtf', displayName: 'RTF Export Options', localizationId: 'DevExpress.XtraPrinting.RtfExportOptions', from: this._generateFromFunction(RtfExportOptionsMergedPreview), toJsonObject: RtfExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'xls', modelName: 'Xls', displayName: 'XLS Export Options', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions', from: this._generateFromFunction(XlsExportOptionsMergedPreview), toJsonObject: XlsExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'xlsx', modelName: 'Xlsx', displayName: 'XLSx Export Options', localizationId: 'DevExpress.XtraPrinting.XlsxExportOptions', from: this._generateFromFunction(XlsxExportOptionsMergedPreview), toJsonObject: XlsxExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'docx', modelName: 'Docx', displayName: 'Docx Export Options', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions', from: this._generateFromFunction(DocxExportOptionsMergedPreview), toJsonObject: DocxExportOptionsPreview.toJson, editor: editorTemplates.getEditor('objecteditor') }
        ];
    }
}