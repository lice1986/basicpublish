﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\exportOptionsPreview.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ExportOptions } from '../../common/exportOptions/exportOptions';
import { PdfExportOptions } from '../../common/exportOptions/pdfExportOptions';
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import { ISignatureDisplayItem } from '../internal/_previewRequestWrapper';
export declare class ExportOptionsPreview extends ExportOptions {
    protected _signatures: ISignatureDisplayItem[];
    _generateFromFunction(exportType: any): (model: any, serializer: any) => any;
    constructor(_signatures: ISignatureDisplayItem[]);
    hasSensitiveData(): boolean;
    getInfo(): ISerializationInfoArray;
    pdf: PdfExportOptions;
}
export declare class ExportOptionsMergedPreview extends ExportOptionsPreview {
    getInfo(): ISerializationInfoArray;
}
