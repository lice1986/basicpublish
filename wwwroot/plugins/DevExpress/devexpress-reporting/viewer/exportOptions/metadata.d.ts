﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\metadata.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils-native';
import { MultiPlatformObservable, IModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
export declare const rtfExportModeMergedPreview: ISerializationInfo;
export declare const docxExportModeMergedPreview: ISerializationInfo;
export declare const excludeModesForMergedDocuments = "SingleFilePageByPage";
export declare const exportModePreviewBase: {
    from: (val: string, serializer: IModelSerializer) => MultiPlatformObservable<string>;
};
export declare const htmlExportModePreviewBase: ISerializationInfo;
export declare const htmlExportModePreview: ISerializationInfo;
export declare const htmlExportModeMergedPreview: ISerializationInfo;
export declare const xlsExportModePreviewBase: ISerializationInfo;
export declare const xlsExportModePreview: ISerializationInfo;
export declare const xlsExportModeMergedPreview: ISerializationInfo;
export declare const imageExportModePreviewBase: ISerializationInfo;
export declare const imageExportModePreview: ISerializationInfo;
export declare const imageExportModeMergedPreview: ISerializationInfo;
export declare const xlsxExportModePreviewBase: ISerializationInfo;
export declare const xlsxExportModePreview: ISerializationInfo;
export declare const xlsxExportModeMergedPreview: ISerializationInfo;