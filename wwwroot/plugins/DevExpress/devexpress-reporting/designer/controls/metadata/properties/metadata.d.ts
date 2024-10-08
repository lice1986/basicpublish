﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\metadata.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedValue, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export interface ISerializationInfoWithBindings extends ISerializationInfo {
    bindingName?: string;
}
export declare const textAlignmentValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const borderDashStyleValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const stylePrioritySerializationInfo: ISerializationInfoArray;
export declare const xlsxFormatString: ISerializationInfo;
export declare const name: ISerializationInfo;
export declare const displayName: ISerializationInfo;
export declare const text: ISerializationInfo;
export declare const textArea: ISerializationInfo;
export declare const textTrimmingValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const textTrimming: ISerializationInfo;
export declare const size: ISerializationInfo;
export declare const location: ISerializationInfo;
export declare const defaultBooleanValuesArray: Array<IDisplayedValue>;
export declare const tag: ISerializationInfo;
export declare const lockedInUserDesigner: ISerializationInfo;
export declare const visible: ISerializationInfo;
export declare const backColor: ISerializationInfo;
export declare const foreColor: ISerializationInfo;
export declare const font: ISerializationInfo;
export declare const expressionableFont: ISerializationInfo;
export declare const expressionableFontInfo: ISerializationInfoArray;
export declare const borderColor: ISerializationInfo;
export declare const borders: ISerializationInfo;
export declare const borderWidth: ISerializationInfo;
export declare const borderDashStyle: ISerializationInfo;
export declare const paddingString: ISerializationInfo;
export declare const padding: ISerializationInfo;
export declare const defaultTextPadding = "2,2,0,0,96";
export declare const textAlignment: ISerializationInfo;
export declare const textFitMode: ISerializationInfo;
export declare const angle: ISerializationInfo;
export declare const canGrow: ISerializationInfo;
export declare const canShrink: ISerializationInfo;
export declare const multiline: ISerializationInfo;
export declare const wordWrap: ISerializationInfo;
export declare const allowMarkupText: ISerializationInfo;
export declare const autoWidth: ISerializationInfo;
export declare const keepTogether: ISerializationInfo;
export declare const keepTogetherDefaultValueFalse: ISerializationInfo;
export declare const processDuplicatesTarget: ISerializationInfo;
export declare const processDuplicatesMode: ISerializationInfo;
export declare const processNullValues: ISerializationInfo;
export declare const reportPrintOptionsSerializationInfo: ISerializationInfoArray;
export declare const dataAdapter: ISerializationInfo;
export declare const dataSource: ISerializationInfo;
export declare const dataMember: ISerializationInfo;
export declare const filterString: ISerializationInfo;
export declare const filterStringEditable: ISerializationInfo;
export declare const bookmark: ISerializationInfo;
export declare const bookmarkParent: ISerializationInfo;
export declare const navigateUrl: ISerializationInfo;
export declare const target: ISerializationInfo;
export declare const nullValueText: ISerializationInfo;
export declare function getSummaryFunctionValues(): Array<IDisplayedValue>;
export declare const summaryFunctionValues: Array<IDisplayedValue>;
export declare const textFormatString: ISerializationInfo;
export declare function createSummarySerializationInfo(summaryFunctions?: any): ISerializationInfoArray;
export declare const summarySerializationInfo: ISerializationInfoArray;
export declare const summary: ISerializationInfo;
export declare const reportPrintOptions: ISerializationInfo;
export declare const lineWidth: ISerializationInfo;
export declare const lineStyle: ISerializationInfo;
export declare const dpi: ISerializationInfo;
export declare const canPublish: ISerializationInfo;
export declare const rtlValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const rtl: ISerializationInfo;
export declare const imageType: ISerializationInfo;
export declare const paddingGroup: ISerializationInfo[];
export declare const defaultAccessibleRole: {
    value: string;
    displayValue: string;
    localizationId: string;
};
export declare const accessibleRoleValues: IDisplayedValue[];
export declare const accessibleRole: ISerializationInfo;
export declare const accessibleDescription: ISerializationInfo;
export declare const cells: {
    propertyName: string;
    modelName: string;
    array: boolean;
};
export declare const sortOrder: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    valuesArray: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
};
