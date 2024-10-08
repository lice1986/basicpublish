﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\xrCrossTabCell.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel, ISerializationInfoArray, parseBool } from '@devexpress/analytics-core/analytics-utils';
export declare const autoSizeMode: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
export declare const rowVisible: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: boolean;
    from: typeof parseBool;
};
export declare const columnVisible: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: boolean;
    from: typeof parseBool;
};
export declare const rowAutoHeightMode: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
};
export declare const columnAutoWidthMode: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
};
export declare const crossTabCellOptionsInfo: (import("@devexpress/analytics-core/analytics-utils").ISerializationInfo | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
} | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: boolean;
    from: typeof parseBool;
})[];
export declare const columnIndex: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
    alwaysSerialize: boolean;
    disabled: boolean;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
};
export declare const rowIndex: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
    alwaysSerialize: boolean;
    disabled: boolean;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
};
export declare const cellserializtionInfoBase: ISerializationInfoArray;
export declare const cellserializtionInfo: ISerializationInfoArray;
export declare const popularPropertiesCrossTabCell: string[];
