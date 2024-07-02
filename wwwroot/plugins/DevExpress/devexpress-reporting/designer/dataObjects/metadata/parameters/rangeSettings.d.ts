﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\rangeSettings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { PropertyGridEditorFlat } from '@devexpress/analytics-core/analytics-widgets';
export declare const rangeEditor: {
    custom: string;
    editorType: typeof PropertyGridEditorFlat;
};
export declare const rangeBoundaryParameterInfos: (ISerializationInfo | {
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
})[];
export declare const rangeSettingsInfos: ISerializationInfo[];
