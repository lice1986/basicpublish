﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\layoutOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
export declare const crossTabLayoutOptionsInfo: ({
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    valuesArray: {
        displayValue: string;
        value: string;
        localizationId: string;
    }[];
    from?: undefined;
} | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: boolean;
    from: typeof parseBool;
    valuesArray?: undefined;
})[];
export declare const crossTabLayoutOptions: {
    propertyName: string;
    modelName: string;
    localizationId: string;
    displayName: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    info: ({
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
        defaultVal: string;
        valuesArray: {
            displayValue: string;
            value: string;
            localizationId: string;
        }[];
        from?: undefined;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
        defaultVal: boolean;
        from: typeof parseBool;
        valuesArray?: undefined;
    })[];
};
