﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_internal.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare const propertiesGridEditorsPaddingLeft: import("../../../serializer/_internal").IGlobalSubscribableValue<number>;
export declare const defaultFontSerialization: import("../../../serializer/_internal").IGlobalSubscribableValue<string>;
export declare function validateGuid(guid: any): boolean;
export declare function validateNullableGuid(guid: any): boolean;
export declare const guidValidationRules: {
    type: string;
    validationCallback: (options: any) => boolean;
    readonly message: any;
}[];
export declare const guidRequiredValidationRules: {
    type: string;
    readonly message: any;
}[];
export declare const requiredValidationRules: {
    type: string;
    readonly message: any;
}[];
