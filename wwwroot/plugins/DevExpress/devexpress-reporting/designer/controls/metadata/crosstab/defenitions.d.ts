﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\defenitions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel, ISerializationInfo, parseBool } from '@devexpress/analytics-core/analytics-utils';
export declare const crossTabCellWidth: {
    propertyName: string;
    modelName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
};
export declare const crossTabColumnDefinitionInfo: ({
    propertyName: string;
    modelName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
} | {
    propertyName: string;
    modelName: string;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
} | {
    propertyName: string;
    modelName: string;
    defaultVal: boolean;
    from: typeof parseBool;
})[];
export declare const crossTabCellHeight: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
};
export declare const crossTabRowDefinitionInfo: ({
    propertyName: string;
    modelName: string;
    defaultVal: boolean;
    from: typeof parseBool;
} | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
} | {
    propertyName: string;
    modelName: string;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
})[];
export declare const rowDefinitions: ISerializationInfo;
export declare const columnDefinitions: ISerializationInfo;
