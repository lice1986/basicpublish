﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\pdfMetaData.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { fromEnum, ISerializationInfoArray, parseBool } from '@devexpress/analytics-core/analytics-utils-native';
export declare const pdfACompatibilityValues: {
    None: string;
    PdfA1a: string;
    PdfA1b: string;
    PdfA2a: string;
    PdfA2b: string;
    PdfA3a: string;
    PdfA3b: string;
};
export declare const pdfACompatibility: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils-native").IEditorInfo;
    defaultVal: string;
    from: typeof fromEnum;
    valuesArray: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
};
export declare const pdfUACompatibilityValues: {
    None: string;
    PdfUA1: string;
};
export declare const pdfUACompatibility: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils-native").IEditorInfo;
    defaultVal: string;
    from: typeof fromEnum;
    valuesArray: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
};
export declare const showPrintDialogOnOpen: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: boolean;
    editor: import("@devexpress/analytics-core/analytics-utils-native").IEditorInfo;
    from: typeof parseBool;
};
export declare const pdfExportOptionsSerializationInfo: ISerializationInfoArray;