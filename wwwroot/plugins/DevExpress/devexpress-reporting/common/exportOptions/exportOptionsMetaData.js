﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\exportOptionsMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { CsvExportOptions } from './csvExportOptions';
import { DocxExportOptions } from './docxExportOptions';
import { emailOptionsSerializationInfo, nativeFormatOptionsSerializationInfo } from './emailMetaData';
import { HtmlExportOptions } from './htmlExportOptions';
import { ImageExportOptions } from './imageExportOptions';
import { MhtExportOptions } from './mhtExportOptions';
import { PdfExportOptions } from './pdfExportOptions';
import { PrintPreviewOptions } from './printPreviewOptions';
import { RtfExportOptions } from './rtfExportOptions';
import { TextExportOptions } from './textExportOptions';
import { XlsExportOptions } from './xlsExportOptions';
import { XlsxExportOptions } from './xlsxExportOptions';
export const exportOptionsSerializationInfo = [
    { propertyName: 'csv', modelName: 'Csv', displayName: 'CSV Export Options', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Csv.Description', from: CsvExportOptions.from, toJsonObject: CsvExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'email', modelName: 'Email', displayName: 'E-mail Options', localizationId: 'DevExpress.XtraPrinting.EmailOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Email.Description', editor: editorTemplates.getEditor('objecteditor'), info: emailOptionsSerializationInfo },
    { propertyName: 'html', modelName: 'Html', displayName: 'HTML Export Options', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Html.Description', from: HtmlExportOptions.from, toJsonObject: HtmlExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'image', modelName: 'Image', displayName: 'Image Export Options', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Image.Description', from: ImageExportOptions.from, toJsonObject: ImageExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'mailMessage', modelName: 'MailMessage', displayName: 'Mail Message Export Options', localizationId: 'DevExpress.XtraPrinting.MailMessageExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.MailMessage.Description', from: MhtExportOptions.from, toJsonObject: MhtExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'mht', modelName: 'Mht', displayName: 'MHT Export Options', localizationId: 'DevExpress.XtraPrinting.MhtExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Mht.Description', from: MhtExportOptions.from, toJsonObject: MhtExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'nativeFormat', modelName: 'NativeFormat', displayName: 'Native Format Options', localizationId: 'DevExpress.XtraPrinting.NativeFormatOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.NativeFormat.Description', editor: editorTemplates.getEditor('objecteditor'), info: nativeFormatOptionsSerializationInfo },
    { propertyName: 'pdf', modelName: 'Pdf', displayName: 'PDF Export Options', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Pdf.Description', from: PdfExportOptions.from, toJsonObject: PdfExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'printPreview', modelName: 'PrintPreview', displayName: 'Print Preview Options', localizationId: 'DevExpress.XtraPrinting.PrintPreviewOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.PrintPreview.Description', from: PrintPreviewOptions.from, toJsonObject: PrintPreviewOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'rtf', modelName: 'Rtf', displayName: 'RTF Export Options', localizationId: 'DevExpress.XtraPrinting.RtfExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Rtf.Description', from: RtfExportOptions.from, toJsonObject: RtfExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'textExportOptions', modelName: 'Text', displayName: 'Text Export Options', localizationId: 'DevExpress.XtraPrinting.TextExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Text.Description', from: TextExportOptions.from, toJsonObject: TextExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'xls', modelName: 'Xls', displayName: 'XLS Export Options', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Xls.Description', from: XlsExportOptions.from, toJsonObject: XlsExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'xlsx', modelName: 'Xlsx', displayName: 'XLSx Export Options', localizationId: 'DevExpress.XtraPrinting.XlsxExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Xlsx.Description', from: XlsxExportOptions.from, toJsonObject: XlsxExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') },
    { propertyName: 'docx', modelName: 'Docx', displayName: 'Docx Export Options', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions', descriptionLocalizationId: 'DevExpress.XtraPrinting.ExportOptions.Docx.Description', from: DocxExportOptions.from, toJsonObject: DocxExportOptions.toJson, editor: editorTemplates.getEditor('objecteditor') }
];
