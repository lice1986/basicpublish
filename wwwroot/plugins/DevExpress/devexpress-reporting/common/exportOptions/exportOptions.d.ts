﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\exportOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { CsvExportOptions } from './csvExportOptions';
import { DocxExportOptions } from './docxExportOptions';
import { HtmlExportOptions } from './htmlExportOptions';
import { ImageExportOptions } from './imageExportOptions';
import { MhtExportOptions } from './mhtExportOptions';
import { PdfExportOptions } from './pdfExportOptions';
import { PrintPreviewOptions } from './printPreviewOptions';
import { RtfExportOptions } from './rtfExportOptions';
import { TextExportOptions } from './textExportOptions';
import { XlsExportOptions } from './xlsExportOptions';
import { XlsxExportOptions } from './xlsxExportOptions';
export declare class ExportOptions {
    static from(model: any, serializer?: IModelSerializer): ExportOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    deserialize(model: any, serializer?: IModelSerializer): this;
    csv: CsvExportOptions;
    html: HtmlExportOptions;
    image: ImageExportOptions;
    mht: MhtExportOptions;
    pdf: PdfExportOptions;
    printPreview: PrintPreviewOptions;
    rtf: RtfExportOptions;
    textExportOptions: TextExportOptions;
    xls: XlsExportOptions;
    xlsx: XlsxExportOptions;
    docx: DocxExportOptions;
}
