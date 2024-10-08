﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\pdfExportOptionsPreview.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { PdfExportOptions } from '../../common/exportOptions/pdfExportOptions';
import { ISignatureDisplayItem } from '../internal/_previewRequestWrapper';
import { MultiPlatformObservable } from '@devexpress/analytics-core/analytics-serializer-native';
export declare class PdfExportOptionsPreview extends PdfExportOptions {
    private _signatures;
    getInfo(): ISerializationInfoArray;
    isPropertyVisible(name: string): boolean;
    constructor(model: object, serializer: IModelSerializer, _signatures: ISignatureDisplayItem[]);
    signature: MultiPlatformObservable<string>;
}
