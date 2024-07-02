﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrReport.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray, parseBool } from '@devexpress/analytics-core/analytics-utils';
export declare const paperKind: ISerializationInfo;
export declare const landscape: ISerializationInfo;
export declare const margins: ISerializationInfo;
export declare const pageColor: ISerializationInfo;
export declare const measureUnit: ISerializationInfo;
export declare const snapGridSize: ISerializationInfo;
export declare const drawWatermark: ISerializationInfo;
export declare const showPreviewMarginLines: ISerializationInfo;
export declare const verticalContentSplitting: ISerializationInfo;
export declare const reportExportOptionsSerializationInfo: ISerializationInfo;
export declare const watermarks: ISerializationInfo;
export declare const watermarkId: ISerializationInfo;
export declare const rollPaper: ISerializationInfo;
export declare const requestParameters: ISerializationInfo;
export declare const formattingRuleSheet: ISerializationInfo;
export declare const pageWidth: ISerializationInfo;
export declare const pageHeight: ISerializationInfo;
export declare const localizationItems: ISerializationInfo;
export declare const language: ISerializationInfo;
export declare const scriptLanguage: ISerializationInfo;
export declare const scriptReferencesString: ISerializationInfo;
export declare const calculatedFields: ISerializationInfo;
export declare const parametersInfo: ISerializationInfo;
export declare const bookmarkDuplicateSuppress: ISerializationInfo;
export declare const horizontalContentSplitting: ISerializationInfo;
export declare const rtlLayout: ISerializationInfo;
export declare const rtlReport: ISerializationInfo;
export declare const useLandscape: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: boolean;
    from: typeof parseBool;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
};
export declare const usePaperKind: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: boolean;
    from: typeof parseBool;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
};
export declare const defaultPrinterSettingsUsingInfo: ISerializationInfo;
export declare const reportSerializationInfo: ISerializationInfoArray;
export declare const popularPropertiesReport: string[];