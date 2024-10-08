﻿/**
* DevExpress Analytics (query-builder\dataSource\dataSourceParameterMeta.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export declare function validateName(nameCandidate: string): boolean;
export declare const dsParameterNameValidationRules: Array<any>;
export declare const parameterValueSerializationsInfo: {
    propertyName: string;
    displayName: string;
    localizationId: string;
    editor: import("../../serializer/serializationInfo").IEditorInfo;
};
export declare const dsParameterSerializationInfo: ISerializationInfoArray;
export declare function storedProcParameterSerializationsInfo(type: string): any[];
