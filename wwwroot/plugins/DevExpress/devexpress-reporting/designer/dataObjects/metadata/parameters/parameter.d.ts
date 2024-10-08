﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\parameter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare const valueSourceSettingsTypes: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const extendValueSourceSettingsTypes: any;
export declare const parameterValueSerializationInfo: ISerializationInfo;
export declare const parameterExpressionSerializationInfo: ISerializationInfo;
export declare const parameterLookUpSettingsSerializationInfo: ISerializationInfo;
export declare const valueSourceSettingsSerializationInfo: ISerializationInfo;
export declare const parameterNameSerializationInfo: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: string;
    validationRules: {
        type: string;
        validationCallback?: (options: any) => boolean;
        readonly message: string;
    }[];
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
};
export declare const parameterSerializationInfo: ISerializationInfoArray;
